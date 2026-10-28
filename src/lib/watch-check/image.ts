import type { Rgb } from "./colour";

/** Longest side kept from the visitor's photo. Enough detail, small memory footprint. */
const MAX_SIDE = 1600;

export class UnsupportedImageError extends Error {}

/**
 * Loads a photo into a canvas, entirely in the browser. EXIF orientation is
 * applied by the browser when the image is drawn. Formats the browser cannot
 * decode (e.g. HEIC outside Safari) raise UnsupportedImageError.
 */
export async function loadPhoto(file: File): Promise<HTMLCanvasElement> {
  if (!file.type.startsWith("image/") && !/\.(heic|heif)$/i.test(file.name)) {
    throw new UnsupportedImageError("Not an image");
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = "async";
    img.src = url;
    try {
      await img.decode();
    } catch {
      throw new UnsupportedImageError("Could not decode image");
    }
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new UnsupportedImageError("Canvas unavailable");
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    return canvas;
  } finally {
    URL.revokeObjectURL(url);
  }
}

/**
 * How the photo sits in the square viewfinder: `zoom` 1 means the photo just
 * covers the square; `x`/`y` move the photo's centre, as fractions of the
 * square's side, relative to the square's centre.
 */
export interface Framing {
  zoom: number;
  x: number;
  y: number;
}

export const DEFAULT_FRAMING: Framing = { zoom: 1, x: 0, y: 0 };

/** The dial guide's radius as a fraction of the viewfinder's side. */
export const GUIDE_RADIUS = 0.4;

/** The signature guide: a wide frame, as fractions of the viewfinder's side. */
export const RECT_GUIDE = { width: 0.92, height: 0.46 } as const;

/** The part of a framed square inside the signature guide. */
export function cropToRectGuide(framed: HTMLCanvasElement): HTMLCanvasElement {
  const w = Math.round(framed.width * RECT_GUIDE.width);
  const h = Math.round(framed.height * RECT_GUIDE.height);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")?.drawImage(framed, (framed.width - w) / 2, (framed.height - h) / 2, w, h, 0, 0, w, h);
  return canvas;
}

/** Keeps the photo covering the viewfinder: no empty edges. */
export function clampFraming(photo: { width: number; height: number }, f: Framing): Framing {
  const zoom = Math.min(6, Math.max(1, f.zoom));
  const cover = Math.max(1 / photo.width, 1 / photo.height);
  const w = photo.width * cover * zoom;
  const h = photo.height * cover * zoom;
  const maxX = Math.max(0, (w - 1) / 2);
  const maxY = Math.max(0, (h - 1) / 2);
  return { zoom, x: Math.min(maxX, Math.max(-maxX, f.x)), y: Math.min(maxY, Math.max(-maxY, f.y)) };
}

/** Draws the framed photo into a square canvas of `size` pixels. */
export function drawFramed(ctx: CanvasRenderingContext2D, photo: HTMLCanvasElement, f: Framing, size: number) {
  const cover = Math.max(size / photo.width, size / photo.height) * f.zoom;
  const w = photo.width * cover;
  const h = photo.height * cover;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(photo, size / 2 - w / 2 + f.x * size, size / 2 - h / 2 + f.y * size, w, h);
}

export function framedCanvas(photo: HTMLCanvasElement, f: Framing, size = 900): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (ctx) drawFramed(ctx, photo, f, size);
  return canvas;
}

function pixelsWhere(canvas: HTMLCanvasElement, keep: (dx: number, dy: number) => boolean, step: number): Rgb[] {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const out: Rgb[] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (!keep(x - width / 2, y - height / 2)) continue;
      const i = (y * width + x) * 4;
      if (data[i + 3] < 200) continue;
      out.push([data[i], data[i + 1], data[i + 2]]);
    }
  }
  return out;
}

/**
 * Pixels from the middle of the dial: a ring between 15% and 62% of the
 * guide radius, which skips the centre pinion and the hour markers.
 */
export function dialPixels(framed: HTMLCanvasElement): Rgb[] {
  const r = framed.width * GUIDE_RADIUS;
  return pixelsWhere(
    framed,
    (dx, dy) => {
      const d = Math.hypot(dx, dy);
      return d > r * 0.15 && d < r * 0.62;
    },
    Math.max(2, Math.round(framed.width / 180)),
  );
}

/** The average colour of a small patch around a tapped point (canvas pixels), ignoring outliers. */
export function colourAt(canvas: HTMLCanvasElement, x: number, y: number, radius = 10): Rgb | null {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  const x0 = Math.max(0, Math.round(x - radius));
  const y0 = Math.max(0, Math.round(y - radius));
  const w = Math.min(canvas.width - x0, radius * 2);
  const h = Math.min(canvas.height - y0, radius * 2);
  if (w <= 0 || h <= 0) return null;
  const { data } = ctx.getImageData(x0, y0, w, h);
  const pixels: { rgb: Rgb; l: number }[] = [];
  for (let i = 0; i < data.length; i += 4) {
    const rgb: Rgb = [data[i], data[i + 1], data[i + 2]];
    pixels.push({ rgb, l: rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114 });
  }
  // Drop the brightest and darkest 20% (glare, stitching, shadows), average the rest.
  pixels.sort((a, b) => a.l - b.l);
  const trimmed = pixels.slice(Math.floor(pixels.length * 0.2), Math.ceil(pixels.length * 0.8));
  const use = trimmed.length ? trimmed : pixels;
  const sum = use.reduce((acc, p) => [acc[0] + p.rgb[0], acc[1] + p.rgb[1], acc[2] + p.rgb[2]], [0, 0, 0]);
  return [sum[0] / use.length, sum[1] / use.length, sum[2] / use.length];
}

export function canvasToBlob(canvas: HTMLCanvasElement, type = "image/png", quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("Could not create image"))), type, quality);
  });
}
