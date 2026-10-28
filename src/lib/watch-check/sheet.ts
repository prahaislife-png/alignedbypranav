import { watchCheck } from "@/data/watch-check";
import { C, capitalise, drawFooter, drawHeader, drawNotes, drawRows, fit, loadFonts, sectionTitle, sheetDate, type Fonts } from "@/lib/tools/sheet-kit";
import { GUIDE_RADIUS, canvasToBlob } from "./image";
import { recordRows, type WatchRecord } from "./record";

/** Instagram portrait size (4:5). */
export const SHEET = { width: 1080, height: 1350 } as const;

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

  drawHeader(ctx, SHEET.width, M, watchCheck.sheet.kicker, fonts);

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
  const dateText = sheetDate(date);
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
  const tableTop = sectionTitle(ctx, M, ty, inner, "specimen record", fonts);
  const tableBottom = drawRows(ctx, rows, M, tableTop, inner, fonts);
  if (rows.length === 0) {
    ctx.font = `400 23px ${fonts.text}`;
    ctx.fillStyle = C.muted;
    ctx.fillText("No details recorded.", M, ty + 60);
  }
  drawNotes(ctx, M, inner, tableBottom + 56, SHEET.height - 150, fonts);
  drawFooter(ctx, SHEET.width, SHEET.height, M, watchCheck.sheet.footer, fonts);

  return canvasToBlob(canvas);
}
