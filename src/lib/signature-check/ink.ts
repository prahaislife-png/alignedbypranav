import type { Point, Stroke } from "./measure";

/** A black-and-white ink mask: 1 where there is ink. */
export interface InkMask {
  width: number;
  height: number;
  data: Uint8Array;
}

export class NoInkError extends Error {}

/** Longest side the mask is computed at: enough for measuring, quick on phones. */
const MASK_SIDE = 1000;

function grayscale(ctx: CanvasRenderingContext2D, w: number, h: number): Float32Array {
  const { data } = ctx.getImageData(0, 0, w, h);
  const out = new Float32Array(w * h);
  for (let i = 0; i < out.length; i++) out[i] = data[i * 4] * 0.299 + data[i * 4 + 1] * 0.587 + data[i * 4 + 2] * 0.114;
  return out;
}

/** Box blur using an integral image: estimates the paper's brightness under shadows. */
function boxBlur(src: Float32Array, w: number, h: number, r: number): Float32Array {
  const integral = new Float64Array((w + 1) * (h + 1));
  for (let y = 0; y < h; y++) {
    let row = 0;
    for (let x = 0; x < w; x++) {
      row += src[y * w + x];
      integral[(y + 1) * (w + 1) + x + 1] = integral[y * (w + 1) + x + 1] + row;
    }
  }
  const out = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    const y0 = Math.max(0, y - r);
    const y1 = Math.min(h, y + r + 1);
    for (let x = 0; x < w; x++) {
      const x0 = Math.max(0, x - r);
      const x1 = Math.min(w, x + r + 1);
      const sum = integral[y1 * (w + 1) + x1] - integral[y0 * (w + 1) + x1] - integral[y1 * (w + 1) + x0] + integral[y0 * (w + 1) + x0];
      out[y * w + x] = sum / ((x1 - x0) * (y1 - y0));
    }
  }
  return out;
}

/** Otsu's threshold for values in 0–1. */
function otsu(values: Float32Array): number {
  const bins = 256;
  const hist = new Array<number>(bins).fill(0);
  for (const v of values) hist[Math.min(bins - 1, Math.max(0, Math.floor(v * (bins - 1))))]++;
  const total = values.length;
  let sum = 0;
  for (let i = 0; i < bins; i++) sum += i * hist[i];
  let sumB = 0;
  let wB = 0;
  let best = 0;
  let bestVar = -1;
  for (let i = 0; i < bins; i++) {
    wB += hist[i];
    if (wB === 0) continue;
    const wF = total - wB;
    if (wF === 0) break;
    sumB += i * hist[i];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) ** 2;
    if (between > bestVar) {
      bestVar = between;
      best = i;
    }
  }
  return best / (bins - 1);
}

/** Removes connected specks smaller than `minSize` pixels (8-connected). */
function removeSpecks(mask: InkMask, minSize: number) {
  const { width: w, height: h, data } = mask;
  const seen = new Uint8Array(w * h);
  const stack: number[] = [];
  const component: number[] = [];
  for (let start = 0; start < data.length; start++) {
    if (!data[start] || seen[start]) continue;
    component.length = 0;
    stack.push(start);
    seen[start] = 1;
    while (stack.length) {
      const i = stack.pop()!;
      component.push(i);
      const x = i % w;
      const y = (i - x) / w;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
          const j = ny * w + nx;
          if (data[j] && !seen[j]) {
            seen[j] = 1;
            stack.push(j);
          }
        }
      }
    }
    if (component.length < minSize) for (const i of component) data[i] = 0;
  }
}

/**
 * Finds the ink in a photo of a signature on paper (dark ink on light paper).
 * Lighting is evened out first, so phone shadows do not count as ink.
 */
export function inkFromPhoto(source: HTMLCanvasElement): InkMask {
  const scale = Math.min(1, MASK_SIDE / Math.max(source.width, source.height));
  const w = Math.max(1, Math.round(source.width * scale));
  const h = Math.max(1, Math.round(source.height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new NoInkError("Canvas unavailable");
  ctx.drawImage(source, 0, 0, w, h);
  const gray = grayscale(ctx, w, h);
  const paper = boxBlur(gray, w, h, Math.max(8, Math.round(Math.min(w, h) / 10)));
  const ratio = new Float32Array(w * h);
  for (let i = 0; i < ratio.length; i++) ratio[i] = Math.min(1, gray[i] / Math.max(1, paper[i]));
  const threshold = Math.min(0.85, otsu(ratio));
  const data = new Uint8Array(w * h);
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    // Darker than the paper around it by a clear margin.
    if (ratio[i] < threshold && paper[i] - gray[i] > 22) {
      data[i] = 1;
      count++;
    }
  }
  const mask = { width: w, height: h, data };
  removeSpecks(mask, Math.max(6, Math.round((w * h) / 40000)));
  count = data.reduce((a, b) => a + b, 0);
  const share = count / data.length;
  if (count < 150 || share > 0.3) throw new NoInkError("No clear signature found");
  return mask;
}

/**
 * Renders strokes drawn on screen into a mask, scaled to fit with a margin.
 * Also returns the strokes in the mask's coordinates, so measurements taken
 * from either line up on the sheets.
 */
export function inkFromStrokes(strokes: readonly Stroke[]): { mask: InkMask; strokes: Stroke[] } {
  const pts = strokes.flat();
  if (pts.length < 2) throw new NoInkError("Nothing drawn");
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const bw = Math.max(1, Math.max(...xs) - minX);
  const bh = Math.max(1, Math.max(...ys) - minY);
  const s = Math.min((MASK_SIDE * 0.9) / bw, (MASK_SIDE * 0.45) / bh);
  const pad = 40;
  const w = Math.round(bw * s + pad * 2);
  const h = Math.round(bh * s + pad * 2);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new NoInkError("Canvas unavailable");
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(3, Math.min(w, h) * 0.018);
  for (const stroke of strokes) {
    if (!stroke.length) continue;
    ctx.beginPath();
    ctx.moveTo((stroke[0].x - minX) * s + pad, (stroke[0].y - minY) * s + pad);
    for (const p of stroke.slice(1)) ctx.lineTo((p.x - minX) * s + pad, (p.y - minY) * s + pad);
    if (stroke.length === 1) ctx.lineTo((stroke[0].x - minX) * s + pad + 0.1, (stroke[0].y - minY) * s + pad);
    ctx.stroke();
  }
  const { data: rgba } = ctx.getImageData(0, 0, w, h);
  const data = new Uint8Array(w * h);
  for (let i = 0; i < data.length; i++) data[i] = rgba[i * 4 + 3] > 96 ? 1 : 0;
  const mapped = strokes.map((stroke) => stroke.map((p) => ({ ...p, x: (p.x - minX) * s + pad, y: (p.y - minY) * s + pad })));
  return { mask: { width: w, height: h, data }, strokes: mapped };
}

/** Ink pixels as points (thinned to at most `max` points for speed). */
export function inkPoints(mask: InkMask, max = 40000): Point[] {
  let count = 0;
  for (const v of mask.data) count += v;
  const step = Math.max(1, Math.ceil(count / max));
  const out: Point[] = [];
  let k = 0;
  for (let i = 0; i < mask.data.length; i++) {
    if (!mask.data[i]) continue;
    if (k++ % step) continue;
    out.push({ x: i % mask.width, y: Math.floor(i / mask.width) });
  }
  return out;
}

/** Trims the mask to the ink plus a margin, so drawings sit tight on the sheets. */
export function cropMask(mask: InkMask, margin = 12): InkMask {
  let minX = mask.width;
  let minY = mask.height;
  let maxX = -1;
  let maxY = -1;
  for (let i = 0; i < mask.data.length; i++) {
    if (!mask.data[i]) continue;
    const x = i % mask.width;
    const y = (i - x) / mask.width;
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  if (maxX < 0) return mask;
  const x0 = Math.max(0, minX - margin);
  const y0 = Math.max(0, minY - margin);
  const w = Math.min(mask.width, maxX + margin + 1) - x0;
  const h = Math.min(mask.height, maxY + margin + 1) - y0;
  const data = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) data.set(mask.data.subarray((y + y0) * mask.width + x0, (y + y0) * mask.width + x0 + w), y * w);
  return { width: w, height: h, data };
}

/** The mask as a canvas: ink in `colour`, transparent paper. */
export function maskCanvas(mask: InkMask, colour: [number, number, number]): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = mask.width;
  canvas.height = mask.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  const img = ctx.createImageData(mask.width, mask.height);
  for (let i = 0; i < mask.data.length; i++) {
    if (!mask.data[i]) continue;
    img.data[i * 4] = colour[0];
    img.data[i * 4 + 1] = colour[1];
    img.data[i * 4 + 2] = colour[2];
    img.data[i * 4 + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}
