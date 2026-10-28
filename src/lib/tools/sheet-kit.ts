import { handwriting } from "@/components/brand/handwriting-data";

/**
 * Shared drawing kit for the free tools' downloadable sheets (canvas), so
 * every sheet uses the site's colours, fonts, wordmark and measuring rule.
 */

export const C = {
  paper: "#f3f1eb",
  paper2: "#e7e3d8",
  ink: "#221b2b",
  muted: "#5a5460",
  madder: "#a3352b",
  line: "#cfc8ba",
} as const;

export const INK_RGB: [number, number, number] = [34, 27, 43];

export interface Fonts {
  display: string;
  text: string;
  mono: string;
}

/** The site's font stacks (set by next/font as CSS variables), loaded before drawing. */
export async function loadFonts(): Promise<Fonts> {
  const css = getComputedStyle(document.documentElement);
  const read = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback;
  const fonts = {
    display: read("--font-bluu", "Georgia, serif"),
    text: read("--font-apfel", "system-ui, sans-serif"),
    mono: read("--font-fragment", "ui-monospace, monospace"),
  };
  await Promise.all([
    document.fonts.load(`700 40px ${fonts.display}`),
    document.fonts.load(`400 24px ${fonts.text}`),
    document.fonts.load(`700 24px ${fonts.text}`),
    document.fonts.load(`400 20px ${fonts.mono}`),
  ]).catch(() => undefined);
  return fonts;
}

export const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Shortens text with an ellipsis so it fits `max` pixels. */
export function fit(ctx: CanvasRenderingContext2D, text: string, max: number): string {
  if (ctx.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > max) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

/** The handwritten "aligned" on a red-pen baseline, with "by pranav". */
export function wordmark(ctx: CanvasRenderingContext2D, x: number, baselineY: number, height: number, fonts: Fonts) {
  const { d, viewBox } = handwriting.aligned;
  const [vx, , vw, vh] = viewBox.split(" ").map(Number);
  const s = height / vh;
  ctx.save();
  ctx.strokeStyle = C.madder;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x - 6, baselineY + 1);
  ctx.lineTo(x + vw * s + 4, baselineY + 1);
  ctx.stroke();
  // Baseline of the handwriting is y = 0 in its own units.
  ctx.translate(x - vx * s, baselineY);
  ctx.scale(s, s);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2.6 / s;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke(new Path2D(d));
  ctx.restore();
  ctx.font = `400 20px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText("by pranav", x + vw * s + 16, baselineY);
}

/** A measuring rule with millimetre-style ticks. */
export function ruler(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, ticks = 60) {
  ctx.save();
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + width, y);
  for (let i = 0; i <= ticks; i++) {
    const tx = x + (width * i) / ticks;
    ctx.moveTo(tx, y);
    ctx.lineTo(tx, y + (i % 10 === 0 ? 16 : i % 5 === 0 ? 10 : 6));
  }
  ctx.stroke();
  ctx.restore();
}

/** Header: wordmark on the left, a red-pen margin note on the right. */
export function drawHeader(ctx: CanvasRenderingContext2D, width: number, margin: number, kicker: string, fonts: Fonts) {
  wordmark(ctx, margin, 112, 64, fonts);
  ctx.font = `400 21px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  const text = `§ ${kicker}`;
  ctx.fillText(text, width - margin - ctx.measureText(text).width, 108);
}

/** Footer: measuring rule, attribution and the site's address. */
export function drawFooter(ctx: CanvasRenderingContext2D, width: number, height: number, margin: number, text: string, fonts: Fonts) {
  ruler(ctx, margin, height - 112, width - margin * 2);
  ctx.font = `400 18px ${fonts.mono}`;
  ctx.fillStyle = C.muted;
  ctx.fillText(text, margin, height - 56);
  const host = window.location.host.replace(/^www\./, "");
  ctx.fillStyle = C.madder;
  ctx.fillText(host, width - margin - ctx.measureText(host).width, height - 56);
}

/** A "§ title" note with a strong rule beneath; returns the y of the rule. */
export function sectionTitle(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, title: string, fonts: Fonts): number {
  ctx.font = `400 19px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText(`§ ${title}`, x, y);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y + 18);
  ctx.lineTo(x + width, y + 18);
  ctx.stroke();
  return y + 18;
}

/** Label / value rows in two columns; returns the y below the last row. */
export function drawRows(
  ctx: CanvasRenderingContext2D,
  rows: { label: string; value: string }[],
  x: number,
  top: number,
  width: number,
  fonts: Fonts,
  rowH = 50,
): number {
  const colW = (width - 36) / 2;
  const perCol = Math.max(1, Math.ceil(rows.length / 2));
  rows.forEach((row, i) => {
    const col = Math.floor(i / perCol);
    const rx = x + col * (colW + 36);
    const y = top + (i % perCol) * rowH;
    ctx.font = `400 18px ${fonts.mono}`;
    ctx.fillStyle = C.muted;
    ctx.fillText(fit(ctx, row.label.toLowerCase(), 150), rx, y + 33);
    ctx.font = `400 23px ${fonts.text}`;
    ctx.fillStyle = C.ink;
    ctx.fillText(fit(ctx, row.value, colW - 170), rx + 166, y + 33);
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(rx, y + rowH);
    ctx.lineTo(rx + colW, y + rowH);
    ctx.stroke();
  });
  return top + perCol * rowH;
}

/** Ruled lines for Pranav's notes between `top` and `bottom`, if there is room. */
export function drawNotes(ctx: CanvasRenderingContext2D, x: number, width: number, top: number, bottom: number, fonts: Fonts) {
  if (bottom - top < 90) return;
  ctx.font = `400 19px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText("§ pranav’s notes", x, top);
  ctx.lineWidth = 1;
  ctx.strokeStyle = C.line;
  for (let y = top + 46; y <= bottom; y += 46) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();
  }
  // Exercise-book margin in red pen.
  ctx.strokeStyle = "rgba(163, 53, 43, 0.45)";
  ctx.beginPath();
  ctx.moveTo(x + 64, top + 16);
  ctx.lineTo(x + 64, bottom + 8);
  ctx.stroke();
}

/** Formats today's date for sheets, e.g. "28 october 2026". */
export function sheetDate(date: Date): string {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }).toLowerCase();
}
