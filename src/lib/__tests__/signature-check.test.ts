import { describe, expect, it } from "vitest";
import {
  baselineLabel,
  estimateBaseline,
  estimateSlant,
  findUnderline,
  measureSignature,
  measurementRows,
  slantLabel,
  strokeStats,
  type Point,
  type Stroke,
} from "../signature-check/measure";

/**
 * A synthetic signature: tall and short downstrokes joined by connectors,
 * like cursive letters, with an exact lean (degrees from vertical, positive
 * to the right) and an exact baseline angle (degrees, positive rising).
 */
function syntheticSignature({ lean, rise, underline = false }: { lean: number; rise: number; underline?: boolean }): Stroke[] {
  const t = Math.tan((lean * Math.PI) / 180);
  const a = (-rise * Math.PI) / 180; // screen y points down
  const transform = (x: number, y: number, time: number): Stroke[number] => {
    const sx = x + (100 - y) * t; // baseline at y = 100
    return { x: sx * Math.cos(a) - (y - 100) * Math.sin(a), y: 100 + sx * Math.sin(a) + (y - 100) * Math.cos(a), t: time, p: 0.5 };
  };
  const line = (x0: number, y0: number, x1: number, y1: number, start: number) => {
    const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) * 2));
    return Array.from({ length: n + 1 }, (_, i) => transform(x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n, start + i * 4));
  };
  const strokes: Stroke[] = [];
  let time = 0;
  let x = 0;
  for (let letter = 0; letter < 9; letter++) {
    const top = letter % 3 === 0 ? 20 : 60; // ascenders and x-height letters
    const s = [...line(x, 100, x, top, time), ...line(x, top, x + 8, 100, time + 200), ...line(x + 8, 100, x + 22, 100, time + 300)];
    if (letter === 4) {
      strokes.push(s);
      time += 600; // a pen lift halfway
    } else if (strokes.length) strokes[strokes.length - 1].push(...s);
    else strokes.push(s);
    time += 400;
    x += 22;
  }
  if (underline) strokes.push(line(-5, 118, x + 5, 118, time + 300));
  return strokes;
}

const ink = (strokes: Stroke[]): Point[] => strokes.flat();

describe("slant", () => {
  it.each([
    [20, 70],
    [0, 90],
    [-15, 105],
    [35, 55],
  ])("a lean of %s° from vertical measures as %s° from the baseline", (lean, expected) => {
    const slant = estimateSlant(ink(syntheticSignature({ lean, rise: 0 })));
    expect(slant).not.toBeNull();
    expect(Math.abs(slant! - expected)).toBeLessThanOrEqual(3);
  });

  it("is unaffected by a rising baseline", () => {
    const slant = estimateSlant(ink(syntheticSignature({ lean: 20, rise: 5 })));
    expect(Math.abs(slant! - 70)).toBeLessThanOrEqual(6);
  });

  it("labels slant in plain words", () => {
    expect(slantLabel(70)).toBe("leans right");
    expect(slantLabel(90)).toBe("upright");
    expect(slantLabel(105)).toBe("leans left");
    expect(slantLabel(50)).toBe("leans strongly right");
  });
});

describe("baseline", () => {
  it.each([4, 0, -6])("measures a baseline of %s°", (rise) => {
    const b = estimateBaseline(ink(syntheticSignature({ lean: 15, rise })));
    expect(b).not.toBeNull();
    expect(Math.abs(b!.angle - rise)).toBeLessThanOrEqual(1.5);
    expect(baselineLabel(b!.angle)).toBe(rise > 2 ? "rising" : rise < -2 ? "falling" : "level");
  });

  it("reads the baseline from the letters, not from an underline", () => {
    const strokes = syntheticSignature({ lean: 15, rise: 5, underline: true });
    expect(findUnderline(strokes)).toBe(strokes.length - 1);
    const m = measureSignature(ink(strokes), strokes, false);
    expect(m.underline).toBe(true);
    expect(Math.abs(m.baseline!.angle - 5)).toBeLessThanOrEqual(1.5);
  });
});

describe("strokes", () => {
  it("counts pen lifts and timing, and only reports pressure from a stylus", () => {
    const strokes = syntheticSignature({ lean: 10, rise: 0 });
    const touch = strokeStats(strokes, false)!;
    expect(touch.penLifts).toBe(strokes.length - 1);
    expect(touch.duration).toBeGreaterThan(0);
    expect(touch.pace).toBeGreaterThan(0);
    expect(touch.pressure).toBeNull();
    expect(strokeStats(strokes, true)!.pressure).toMatchObject({ mean: 0.5, variation: 0 });
  });

  it("finds no underline in a plain signature", () => {
    expect(findUnderline(syntheticSignature({ lean: 10, rise: 0 }))).toBe(-1);
  });
});

describe("measurement rows", () => {
  it("describes measurements in plain words and never interprets them", () => {
    const strokes = syntheticSignature({ lean: 20, rise: 4 });
    const rows = measurementRows(measureSignature(ink(strokes), strokes, false));
    const text = rows.map((r) => `${r.label}: ${r.value}`).join("\n");
    expect(text).toMatch(/Slant: \d+° · leans right/);
    expect(text).toMatch(/Baseline: rising \d/);
    expect(text).toContain("Pen lifts: ");
    expect(text).not.toMatch(/personality|confiden|optimis|ambiti|luck/i);
  });

  it("handles an empty or tiny sample", () => {
    expect(estimateSlant([])).toBeNull();
    expect(estimateBaseline([{ x: 0, y: 0 }])).toBeNull();
    expect(measurementRows(measureSignature([]))).toEqual([]);
  });
});
