import { handwriting } from "@/components/brand/handwriting-data";
import { watchCheck } from "@/data/watch-check";
import { GUIDE_RADIUS, canvasToBlob } from "./image";
import { recordRows, type WatchRecord } from "./record";

/** Instagram portrait size (4:5). */
export const SHEET = { width: 1080, height: 1350 } as const;

const C = {
  paper: "#f3f1eb",
  paper2: "#e7e3d8",
  ink: "#221b2b",
  muted: "#5a5460",
  madder: "#a3352b",
  line: "#cfc8ba",
};

interface Fonts {
  display: string;
  text: string;
  mono: string;
}

/** The site's font stacks (set by next/font as CSS variables), loaded before drawing. */
async function loadFonts(): Promise<Fonts> {
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

const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

/** Shortens text with an ellipsis so it fits `max` pixels. */
function fit(ctx: CanvasRenderingContext2D, text: string, max: number): string {
  if (ctx.measureText(text).width <= max) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(`${t}…`).width > max) t = t.slice(0, -1);
  return `${t.trimEnd()}…`;
}

function wordmark(ctx: CanvasRenderingContext2D, x: number, baselineY: number, height: number, fonts: Fonts) {
  const { d, viewBox } = handwriting.aligned;
  const [vx, , vw, vh] = viewBox.split(" ").map(Number);
  const s = height / vh;
  ctx.save();
  // Red-pen baseline under the word.
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

function ruler(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, ticks = 60) {
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

function swatch(ctx: CanvasRenderingContext2D, x: number, y: number, label: string, hex: string | null, name: string, fonts: Fonts) {
  ctx.fillStyle = hex ?? C.paper2;
  ctx.fillRect(x, y, 76, 76);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(x + 0.75, y + 0.75, 74.5, 74.5);
  if (!hex) {
    ctx.beginPath();
    ctx.moveTo(x + 8, y + 68);
    ctx.lineTo(x + 68, y + 8);
    ctx.stroke();
  }
  ctx.fillStyle = C.madder;
  ctx.font = `400 19px ${fonts.mono}`;
  ctx.fillText(label, x + 96, y + 24);
  ctx.fillStyle = C.ink;
  ctx.font = `700 36px ${fonts.display}`;
  ctx.fillText(fit(ctx, capitalise(name), 250), x + 96, y + 66);
}

/**
 * Renders the visitor's specimen sheet: the framed photo with the dial guide
 * in red pen, colour swatches and the recorded details. Returns a PNG blob.
 */
export async function renderSpecimenSheet(framed: HTMLCanvasElement, record: WatchRecord, date = new Date()): Promise<Blob> {
  const fonts = await loadFonts();
  const canvas = document.createElement("canvas");
  canvas.width = SHEET.width;
  canvas.height = SHEET.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = C.paper;
  ctx.fillRect(0, 0, SHEET.width, SHEET.height);

  const M = 72;
  const inner = SHEET.width - M * 2;

  // Header: wordmark and margin note.
  wordmark(ctx, M, 112, 64, fonts);
  ctx.font = `400 21px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  const kicker = `§ ${watchCheck.sheet.kicker}`;
  ctx.fillText(kicker, SHEET.width - M - ctx.measureText(kicker).width, 108);

  // Specimen frame.
  const fy = 160;
  const fh = 640;
  ctx.fillStyle = C.paper;
  ctx.fillRect(M, fy, inner, fh);
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(M + 0.75, fy + 0.75, inner - 1.5, fh - 1.5);
  // Caption bar.
  ctx.beginPath();
  ctx.moveTo(M, fy + 52);
  ctx.lineTo(M + inner, fy + 52);
  ctx.stroke();
  ctx.font = `400 21px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText("fig. 03 — wristwatch", M + 22, fy + 34);
  ctx.fillStyle = C.muted;
  const dateText = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }).toLowerCase();
  ctx.fillText(dateText, M + inner - 22 - ctx.measureText(dateText).width, fy + 34);

  // Ruled paper behind the right-hand notes.
  const px = M + 24;
  const py = fy + 76;
  const ps = 540;
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 1;
  for (let ly = fy + 52 + 46; ly < fy + fh - 10; ly += 46) {
    ctx.beginPath();
    ctx.moveTo(px + ps + 20, ly);
    ctx.lineTo(M + inner - 1, ly);
    ctx.stroke();
  }

  // The framed photo.
  ctx.drawImage(framed, px, py, ps, ps);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 1.5;
  ctx.strokeRect(px + 0.75, py + 0.75, ps - 1.5, ps - 1.5);

  // Red-pen dial guide, crosshair and a leader to the dial note.
  const cx = px + ps / 2;
  const cy = py + ps / 2;
  const r = ps * GUIDE_RADIUS;
  ctx.save();
  ctx.strokeStyle = C.madder;
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 8]);
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx - 14, cy);
  ctx.lineTo(cx + 14, cy);
  ctx.moveTo(cx, cy - 14);
  ctx.lineTo(cx, cy + 14);
  const lx = cx + r * Math.cos(-Math.PI / 5);
  const ly = cy + r * Math.sin(-Math.PI / 5);
  ctx.moveTo(lx, ly);
  ctx.lineTo(px + ps + 36, py + 46);
  ctx.stroke();
  ctx.restore();

  // Colour notes.
  const nx = px + ps + 44;
  swatch(ctx, nx, py + 8, "dial", record.dial?.hex ?? null, record.dial?.name ?? "not recorded", fonts);
  swatch(ctx, nx, py + 124, "strap", record.strap?.hex ?? null, record.strap?.name ?? "not recorded", fonts);
  const shape = record.answers.shape?.[0];
  const caseColour = record.answers.case?.[0];
  const shapeLabel = shape ? watchCheck.questions.find((q) => q.id === "shape")?.options.find((o) => o.value === shape)?.label : null;
  const caseLabel = caseColour ? watchCheck.questions.find((q) => q.id === "case")?.options.find((o) => o.value === caseColour)?.label : null;
  ctx.font = `400 19px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText("shape", nx, py + 268);
  ctx.fillText("case", nx, py + 360);
  ctx.fillStyle = C.ink;
  ctx.font = `700 34px ${fonts.display}`;
  ctx.fillText(fit(ctx, shapeLabel ?? "—", 300), nx, py + 308);
  ctx.fillText(fit(ctx, caseLabel ?? "—", 300), nx, py + 400);

  // Record: two columns of label / value rows.
  const rows = recordRows(record).filter((row) => !["Dial colour", "Strap colour", "Dial shape", "Case"].includes(row.label));
  const ty = fy + fh + 44;
  ctx.font = `400 19px ${fonts.mono}`;
  ctx.fillStyle = C.madder;
  ctx.fillText("§ specimen record", M, ty);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(M, ty + 18);
  ctx.lineTo(M + inner, ty + 18);
  ctx.stroke();
  const colW = (inner - 36) / 2;
  const rowH = 50;
  const perCol = Math.ceil(rows.length / 2);
  rows.forEach((row, i) => {
    const col = Math.floor(i / perCol);
    const x = M + col * (colW + 36);
    const y = ty + 18 + (i % perCol) * rowH;
    ctx.font = `400 18px ${fonts.mono}`;
    ctx.fillStyle = C.muted;
    ctx.fillText(row.label.toLowerCase(), x, y + 33);
    ctx.font = `400 23px ${fonts.text}`;
    ctx.fillStyle = C.ink;
    ctx.fillText(fit(ctx, row.value, colW - 170), x + 166, y + 33);
    ctx.strokeStyle = C.line;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y + rowH);
    ctx.lineTo(x + colW, y + rowH);
    ctx.stroke();
  });
  if (rows.length === 0) {
    ctx.font = `400 23px ${fonts.text}`;
    ctx.fillStyle = C.muted;
    ctx.fillText("No details recorded.", M, ty + 60);
  }

  // Ruled lines for Pranav's notes in whatever space is left above the rule.
  const notesTop = ty + 18 + Math.max(1, perCol) * rowH + 56;
  const notesBottom = SHEET.height - 150;
  if (notesBottom - notesTop >= 90) {
    ctx.font = `400 19px ${fonts.mono}`;
    ctx.fillStyle = C.madder;
    ctx.fillText("§ pranav’s notes", M, notesTop);
    ctx.lineWidth = 1;
    for (let y = notesTop + 46; y <= notesBottom; y += 46) {
      ctx.strokeStyle = C.line;
      ctx.beginPath();
      ctx.moveTo(M, y);
      ctx.lineTo(M + inner, y);
      ctx.stroke();
    }
    // Exercise-book margin in red pen.
    ctx.strokeStyle = "rgba(163, 53, 43, 0.45)";
    ctx.beginPath();
    ctx.moveTo(M + 64, notesTop + 16);
    ctx.lineTo(M + 64, notesBottom + 8);
    ctx.stroke();
  }

  // Footer: measuring rule and attribution.
  ruler(ctx, M, SHEET.height - 112, inner);
  ctx.font = `400 18px ${fonts.mono}`;
  ctx.fillStyle = C.muted;
  ctx.fillText(watchCheck.sheet.footer, M, SHEET.height - 56);
  const host = window.location.host.replace(/^www\./, "");
  ctx.fillStyle = C.madder;
  ctx.fillText(host, SHEET.width - M - ctx.measureText(host).width, SHEET.height - 56);

  return canvasToBlob(canvas);
}
