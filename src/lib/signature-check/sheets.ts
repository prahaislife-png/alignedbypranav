import { signatureCheck, type SignatureAnswers } from "@/data/signature-check";
import { answerRows } from "@/lib/tools/answers";
import { canvasToBlob } from "@/lib/watch-check/image";
import { C, INK_RGB, drawFooter, drawHeader, drawNotes, drawRows, loadFonts, sectionTitle, sheetDate, type Fonts } from "@/lib/tools/sheet-kit";
import { maskCanvas, type InkMask } from "./ink";
import { baselineLabel, measurementRows, robustBox, slantLabel, type Box, type Point, type SignatureMeasurements } from "./measure";

/** Instagram portrait size (4:5) for the specimen sheet; A4 at 150 dpi for practice. */
export const SPECIMEN = { width: 1080, height: 1350 } as const;
export const PRACTICE = { width: 1240, height: 1754 } as const;

export interface SignatureSpecimen {
  mask: InkMask;
  points: Point[];
  measurements: SignatureMeasurements;
}

/** Where the signature sits: its box and the baseline height at its centre (mask pixels). */
function geometry(s: SignatureSpecimen): { box: Box; baselineY: number } | null {
  const box = robustBox(s.points);
  if (!box) return null;
  const cx = box.left + box.width / 2;
  const b = s.measurements.baseline;
  const measured = b ? b.slope * cx + b.intercept : NaN;
  const baselineY = Number.isFinite(measured) && measured > box.top && measured <= box.bottom + 2 ? measured : box.top + box.height * 0.75;
  return { box, baselineY };
}

/** A blocky mosaic of the ink, so a shared sheet never shows a usable signature. */
function mosaic(ink: HTMLCanvasElement, cell: number): HTMLCanvasElement {
  const small = document.createElement("canvas");
  small.width = Math.max(1, Math.round(ink.width / cell));
  small.height = Math.max(1, Math.round(ink.height / cell));
  small.getContext("2d")?.drawImage(ink, 0, 0, small.width, small.height);
  const big = document.createElement("canvas");
  big.width = ink.width;
  big.height = ink.height;
  const ctx = big.getContext("2d");
  if (ctx) {
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, big.width, big.height);
  }
  return big;
}

/**
 * Draws the signature with its measured baseline on `baselineY`, as large as
 * fits `maxW` wide while staying between `topBound` and `bottomBound` (so tall
 * letters and long tails never cross into the next section).
 */
function placeSignature(
  ctx: CanvasRenderingContext2D,
  s: SignatureSpecimen,
  ink: HTMLCanvasElement,
  centreX: number,
  baselineY: number,
  maxW: number,
  topBound: number,
  bottomBound: number,
  alpha = 1,
): { scale: number; offsetX: number; offsetY: number } | null {
  const g = geometry(s);
  if (!g) return null;
  const above = Math.max(1, g.baselineY - g.box.top);
  const below = Math.max(1, g.box.bottom - g.baselineY);
  const scale = Math.min(maxW / g.box.width, (baselineY - topBound) / above, (bottomBound - baselineY) / below);
  const offsetX = centreX - (g.box.left + g.box.width / 2) * scale;
  const offsetY = baselineY - g.baselineY * scale;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.drawImage(ink, offsetX, offsetY, ink.width * scale, ink.height * scale);
  ctx.restore();
  return { scale, offsetX, offsetY };
}

function slantGuide(ctx: CanvasRenderingContext2D, x: number, yBottom: number, height: number, slant: number) {
  const lean = (90 - slant) * (Math.PI / 180);
  ctx.beginPath();
  ctx.moveTo(x, yBottom);
  ctx.lineTo(x + Math.tan(lean) * height, yBottom - height);
  ctx.stroke();
}

/**
 * The specimen sheet: the signature on a red-pen baseline with slant guides,
 * then the measurements and the details recorded. `safe` replaces the
 * signature with a mosaic and a stamp, for sharing publicly.
 */
export async function renderSignatureSheet(s: SignatureSpecimen, answers: SignatureAnswers, { safe = false, date = new Date() } = {}): Promise<Blob> {
  const fonts = await loadFonts();
  const { width: W, height: H } = SPECIMEN;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, W, H);
  const M = 72;
  const inner = W - M * 2;

  drawHeader(ctx, W, M, signatureCheck.sheet.kicker, fonts);

  // Specimen frame with caption.
  const fy = 160;
  const fh = 440;
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(M + 0.75, fy + 0.75, inner - 1.5, fh - 1.5);
  ctx.beginPath();
  ctx.moveTo(M, fy + 52);
  ctx.lineTo(M + inner, fy + 52);
  ctx.stroke();
  ctx.font = `400 21px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText(safe ? "fig. 01 — signature · share-safe" : "fig. 01 — signature", M + 22, fy + 34);
  ctx.fillStyle = C.muted;
  const dateText = sheetDate(date);
  ctx.fillText(dateText, M + inner - 22 - ctx.measureText(dateText).width, fy + 34);

  // Handwriting guide lines across the body; the red baseline is the measured one.
  const bodyTop = fy + 52;
  const baseY = bodyTop + 270;
  ctx.save();
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1;
  ctx.setLineDash([6, 8]);
  for (const y of [bodyTop + 60, baseY + 70]) {
    ctx.beginPath();
    ctx.moveTo(M + 20, y);
    ctx.lineTo(M + inner - 20, y);
    ctx.stroke();
  }
  ctx.restore();

  const ink = maskCanvas(s.mask, INK_RGB);
  const placed = placeSignature(ctx, s, safe ? mosaic(ink, 26) : ink, M + inner / 2, baseY, inner - 120, bodyTop + 52, fy + fh - 52, safe ? 0.5 : 1);

  ctx.save();
  ctx.strokeStyle = C.madder;
  ctx.lineWidth = 2;
  const b = s.measurements.baseline;
  if (placed && b) {
    // The measured baseline, drawn across the frame through the signature.
    const x0 = M + 20;
    const x1 = M + inner - 20;
    const toMask = (x: number) => (x - placed.offsetX) / placed.scale;
    const y = (x: number) => (b.slope * toMask(x) + b.intercept) * placed.scale + placed.offsetY;
    ctx.beginPath();
    ctx.moveTo(x0, y(x0));
    ctx.lineTo(x1, y(x1));
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(M + 20, baseY);
    ctx.lineTo(M + inner - 20, baseY);
    ctx.stroke();
  }
  if (s.measurements.slant !== null) {
    ctx.lineWidth = 1.5;
    ctx.setLineDash([7, 7]);
    for (const x of [M + 150, M + inner / 2, M + inner - 260]) slantGuide(ctx, x, baseY + 40, 230, s.measurements.slant);
    ctx.setLineDash([]);
  }
  ctx.restore();

  // Red-pen notes inside the frame.
  ctx.font = `400 20px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  if (s.measurements.slant !== null) {
    const t = `slant ${Math.round(s.measurements.slant)}° · ${slantLabel(s.measurements.slant)}`;
    ctx.fillText(t, M + inner - 24 - ctx.measureText(t).width, bodyTop + 36);
  }
  if (b) {
    const label = baselineLabel(b.angle);
    const t = `baseline · ${label === "level" ? "level" : `${label} ${Math.abs(Math.round(b.angle * 10) / 10)}°`}`;
    ctx.fillText(t, M + inner - 24 - ctx.measureText(t).width, fy + fh - 22);
  }

  if (safe) {
    // Stamp across the mosaic.
    ctx.save();
    ctx.translate(M + inner / 2, baseY - 70);
    ctx.rotate(-0.06);
    ctx.font = `400 30px ${fonts.mono}`;
    const stamp = "specimen · share-safe";
    const w = ctx.measureText(stamp).width + 48;
    ctx.fillStyle = "rgba(243, 241, 235, 0.9)";
    ctx.fillRect(-w / 2, -34, w, 60);
    ctx.strokeStyle = C.madder;
    ctx.lineWidth = 3;
    ctx.strokeRect(-w / 2, -34, w, 60);
    ctx.fillStyle = C.madder;
    ctx.fillText(stamp, -w / 2 + 24, 6);
    ctx.restore();
  }

  // Measurements and the record.
  let y = sectionTitle(ctx, M, fy + fh + 44, inner, "measurements", fonts);
  y = drawRows(ctx, measurementRows(s.measurements), M, y, inner, fonts, 44);
  const rows = answerRows(signatureCheck.questions, answers);
  if (rows.length) {
    y = sectionTitle(ctx, M, y + 44, inner, "specimen record", fonts);
    y = drawRows(ctx, rows, M, y, inner, fonts, 44);
  }
  drawNotes(ctx, M, inner, y + 56, H - 150, fonts);
  drawFooter(ctx, W, H, M, signatureCheck.sheet.footer, fonts);
  return canvasToBlob(canvas);
}

/** A quick on-page preview: the signature with its measured baseline and slant guides. */
export function drawSignaturePreview(canvas: HTMLCanvasElement, s: SignatureSpecimen) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const { width: W, height: H } = canvas;
  ctx.clearRect(0, 0, W, H);
  const baseY = H * 0.72;
  const placed = placeSignature(ctx, s, maskCanvas(s.mask, INK_RGB), W / 2, baseY, W * 0.86, H * 0.06, H * 0.96);
  ctx.save();
  ctx.strokeStyle = C.madder;
  ctx.lineWidth = Math.max(1.5, W / 450);
  const b = s.measurements.baseline;
  if (placed && b) {
    const y = (x: number) => (b.slope * ((x - placed.offsetX) / placed.scale) + b.intercept) * placed.scale + placed.offsetY;
    ctx.beginPath();
    ctx.moveTo(W * 0.03, y(W * 0.03));
    ctx.lineTo(W * 0.97, y(W * 0.97));
    ctx.stroke();
  }
  if (s.measurements.slant !== null) {
    ctx.setLineDash([6, 6]);
    for (const x of [W * 0.2, W * 0.5, W * 0.78]) slantGuide(ctx, x, baseY + H * 0.08, H * 0.62, s.measurements.slant);
  }
  ctx.restore();
}

/** Practice-row geometry, in pixels from the row's top. */
const ROW = { height: 180, ascender: 22, xHeight: 70, baseline: 118, descender: 152 } as const;

function guideRow(ctx: CanvasRenderingContext2D, x0: number, x1: number, top: number, slant: number | null) {
  const asc = top + ROW.ascender;
  const xh = top + ROW.xHeight;
  const base = top + ROW.baseline;
  const desc = top + ROW.descender;
  ctx.save();
  ctx.lineWidth = 1;
  ctx.strokeStyle = C.line;
  ctx.setLineDash([8, 8]);
  for (const y of [asc, desc]) {
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x1, y);
    ctx.stroke();
  }
  ctx.setLineDash([2, 6]);
  ctx.beginPath();
  ctx.moveTo(x0, xh);
  ctx.lineTo(x1, xh);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.strokeStyle = "rgba(163, 53, 43, 0.7)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x0, base);
  ctx.lineTo(x1, base);
  ctx.stroke();
  if (slant !== null) {
    ctx.beginPath();
    ctx.rect(x0, asc, x1 - x0, desc - asc);
    ctx.clip();
    ctx.strokeStyle = "rgba(207, 200, 186, 0.45)";
    ctx.lineWidth = 1;
    for (let x = x0 - 120; x < x1 + 120; x += 56) slantGuide(ctx, x, desc, desc - asc, slant);
  }
  ctx.restore();
  return { asc, base, desc };
}

/**
 * A personalised A4 practice sheet: the visitor's signature as the model,
 * faint copies to trace, then empty rows with slant guides at their own angle.
 */
export async function renderPracticeSheet(s: SignatureSpecimen, date = new Date()): Promise<Blob> {
  const fonts: Fonts = await loadFonts();
  const { width: W, height: H } = PRACTICE;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, W, H);
  const M = 80;
  const x0 = M;
  const x1 = W - M;

  drawHeader(ctx, W, M, signatureCheck.practice.kicker, fonts);
  ctx.fillStyle = C.muted;
  const instructions = signatureCheck.practice.instructions;
  let size = 21;
  do ctx.font = `400 ${size}px ${fonts.mono}`;
  while (ctx.measureText(instructions).width > x1 - x0 && --size > 14);
  ctx.fillText(instructions, M, 172);

  const ink = maskCanvas(s.mask, INK_RGB);
  const grey = maskCanvas(s.mask, [120, 116, 126]);
  const slant = s.measurements.slant;
  const first = 200;
  const rows = 8;
  for (let r = 0; r < rows; r++) {
    const top = first + r * ROW.height;
    const { asc, base, desc } = guideRow(ctx, x0, x1, top, r === 0 ? null : slant);
    if (r === 0) {
      ctx.font = `400 18px ${fonts.mono}`;
      ctx.fillStyle = C.madder;
      ctx.fillText("your signature", x0, top + 10);
      const dateText = sheetDate(date);
      ctx.fillStyle = C.muted;
      ctx.fillText(dateText, x1 - ctx.measureText(dateText).width, top + 10);
      placeSignature(ctx, s, ink, x0 + 300, base, 560, asc, desc + 14);
    } else if (r <= 3) {
      placeSignature(ctx, s, grey, x0 + 270, base, 470, asc, desc + 14, 0.24);
      placeSignature(ctx, s, grey, x0 + 810, base, 470, asc, desc + 14, 0.24);
    }
  }

  drawFooter(ctx, W, H, M, signatureCheck.practice.footer, fonts);
  return canvasToBlob(canvas);
}
