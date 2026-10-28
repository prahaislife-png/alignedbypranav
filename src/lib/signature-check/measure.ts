/**
 * Measurements for the Signature Specimen Check. Pure functions, no DOM.
 *
 * Everything here describes what can be seen or timed. Nothing interprets it:
 * what a slant or baseline may express is Pranav's to discuss, not the site's.
 *
 * Coordinates are screen-style: x to the right, y downwards.
 */

export interface Point {
  x: number;
  y: number;
}

/** A point captured while signing on screen. `t` in ms, `p` pen pressure 0–1. */
export interface StrokePoint extends Point {
  t: number;
  p: number;
}

export type Stroke = StrokePoint[];

const DEG = 180 / Math.PI;

function percentile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const i = Math.min(sorted.length - 1, Math.max(0, Math.round(q * (sorted.length - 1))));
  return sorted[i];
}

export interface Box {
  left: number;
  right: number;
  top: number;
  bottom: number;
  width: number;
  height: number;
}

/** Bounding box ignoring the outer 1% on each side (stray dots, specks). */
export function robustBox(points: readonly Point[]): Box | null {
  if (points.length < 2) return null;
  const xs = points.map((p) => p.x).sort((a, b) => a - b);
  const ys = points.map((p) => p.y).sort((a, b) => a - b);
  const left = percentile(xs, 0.01);
  const right = percentile(xs, 0.99);
  const top = percentile(ys, 0.01);
  const bottom = percentile(ys, 0.99);
  return { left, right, top, bottom, width: Math.max(1, right - left), height: Math.max(1, bottom - top) };
}

/**
 * Dominant slant of the writing, in degrees measured from the baseline on the
 * right-hand side: 90° is upright, less than 90° leans right, more leans left.
 *
 * Method: shear the ink horizontally at each candidate angle and keep the angle
 * at which the vertical strokes line up best (sharpest column histogram), a
 * standard projection-profile technique for handwriting slant.
 */
export function estimateSlant(points: readonly Point[]): number | null {
  const box = robustBox(points);
  if (!box || points.length < 30) return null;
  const yc = (box.top + box.bottom) / 2;
  // Scale so the histogram resolution does not depend on the image size.
  const unit = box.height / 60;
  let best = 0;
  let bestScore = -Infinity;
  const score = (deg: number) => {
    const t = Math.tan(deg / DEG);
    const bins = new Map<number, number>();
    for (const p of points) {
      const key = Math.round((p.x + (p.y - yc) * t) / unit);
      bins.set(key, (bins.get(key) ?? 0) + 1);
    }
    let s = 0;
    for (const c of bins.values()) s += c * c;
    return s;
  };
  for (let deg = -50; deg <= 50; deg += 1) {
    const s = score(deg);
    if (s > bestScore) {
      bestScore = s;
      best = deg;
    }
  }
  // Refine to half a degree around the best whole-degree angle.
  for (const deg of [best - 0.5, best + 0.5]) {
    const s = score(deg);
    if (s > bestScore) {
      bestScore = s;
      best = deg;
    }
  }
  // `best` is the lean from vertical (positive = top to the right).
  return 90 - best;
}

export interface Baseline {
  /** Degrees: positive rises to the right, negative falls. */
  angle: number;
  slope: number;
  intercept: number;
}

/**
 * Direction of the line the signature sits on, from the lower edge of the
 * writing: in 12 columns, the 80th-percentile depth of the ink, fitted with
 * a Theil–Sen line (median of pairwise slopes), which ignores the odd
 * descender or flourish.
 */
export function estimateBaseline(points: readonly Point[]): Baseline | null {
  const box = robustBox(points);
  if (!box || points.length < 30) return null;
  const columns = 12;
  const buckets: number[][] = Array.from({ length: columns }, () => []);
  for (const p of points) {
    const i = Math.floor(((p.x - box.left) / box.width) * columns);
    if (i >= 0 && i < columns) buckets[i].push(p.y);
  }
  const minCount = Math.max(3, points.length / (columns * 8));
  const samples: Point[] = [];
  buckets.forEach((ys, i) => {
    if (ys.length < minCount) return;
    ys.sort((a, b) => a - b);
    samples.push({ x: box.left + ((i + 0.5) / columns) * box.width, y: percentile(ys, 0.8) });
  });
  if (samples.length < 3) return null;
  const slopes: number[] = [];
  for (let i = 0; i < samples.length; i++) {
    for (let j = i + 1; j < samples.length; j++) {
      const dx = samples[j].x - samples[i].x;
      if (dx !== 0) slopes.push((samples[j].y - samples[i].y) / dx);
    }
  }
  slopes.sort((a, b) => a - b);
  const slope = percentile(slopes, 0.5);
  const intercepts = samples.map((s) => s.y - slope * s.x).sort((a, b) => a - b);
  const intercept = percentile(intercepts, 0.5);
  // y grows downwards, so a negative slope means the line rises.
  return { angle: -Math.atan(slope) * DEG, slope, intercept };
}

/** Width divided by height of the signature. */
export function proportions(points: readonly Point[]): number | null {
  const box = robustBox(points);
  return box ? box.width / box.height : null;
}

export interface StrokeStats {
  strokes: number;
  penLifts: number;
  /** From first touch to last lift, in seconds. */
  duration: number;
  /** Signature heights travelled per second of pen-down time. */
  pace: number | null;
  /** Mean pen pressure and its variation (0–1), only from a stylus. */
  pressure: { mean: number; variation: number } | null;
}

/** Timing, pen lifts and pressure from a signature drawn on screen. */
export function strokeStats(strokes: readonly Stroke[], fromStylus: boolean): StrokeStats | null {
  const used = strokes.filter((s) => s.length > 0);
  if (used.length === 0) return null;
  const all = used.flat();
  const box = robustBox(all);
  const first = used[0][0].t;
  const last = used[used.length - 1][used[used.length - 1].length - 1].t;
  let penDown = 0;
  let length = 0;
  for (const s of used) {
    penDown += s[s.length - 1].t - s[0].t;
    for (let i = 1; i < s.length; i++) length += Math.hypot(s[i].x - s[i - 1].x, s[i].y - s[i - 1].y);
  }
  let pressure: StrokeStats["pressure"] = null;
  if (fromStylus) {
    const ps = all.map((p) => p.p).filter((p) => p > 0);
    if (ps.length > 10) {
      const mean = ps.reduce((a, b) => a + b, 0) / ps.length;
      const sd = Math.sqrt(ps.reduce((a, b) => a + (b - mean) ** 2, 0) / ps.length);
      pressure = { mean, variation: mean > 0 ? sd / mean : 0 };
    }
  }
  return {
    strokes: used.length,
    penLifts: used.length - 1,
    duration: Math.max(0, (last - first) / 1000),
    pace: box && penDown > 0 ? length / box.height / (penDown / 1000) : null,
    pressure,
  };
}

/**
 * Index of a stroke that looks like an underline: long, flat and below the
 * middle of the rest of the signature. -1 when there is none.
 */
export function findUnderline(strokes: readonly Stroke[]): number {
  const all = strokes.flat();
  const box = robustBox(all);
  if (!box || strokes.length < 2) return -1;
  for (let i = strokes.length - 1; i >= 0; i--) {
    const s = strokes[i];
    if (s.length < 2) continue;
    const xs = s.map((p) => p.x);
    const ys = s.map((p) => p.y);
    const w = Math.max(...xs) - Math.min(...xs);
    const h = Math.max(...ys) - Math.min(...ys);
    const meanY = ys.reduce((a, b) => a + b, 0) / ys.length;
    if (w >= box.width * 0.45 && h <= w * 0.25 && meanY > box.top + box.height * 0.55) return i;
  }
  return -1;
}

export type SlantLabel = "leans strongly right" | "leans right" | "upright" | "leans left" | "leans strongly left";

export function slantLabel(deg: number): SlantLabel {
  if (deg < 60) return "leans strongly right";
  if (deg < 85) return "leans right";
  if (deg <= 95) return "upright";
  if (deg <= 120) return "leans left";
  return "leans strongly left";
}

export function baselineLabel(deg: number): "rising" | "level" | "falling" {
  if (deg > 2) return "rising";
  if (deg < -2) return "falling";
  return "level";
}

export interface SignatureMeasurements {
  slant: number | null;
  baseline: Baseline | null;
  proportions: number | null;
  strokes: StrokeStats | null;
  /** Whether an underline stroke was found (on-screen signatures only). */
  underline: boolean | null;
}

/** Everything the check measures, from the ink and (when drawn) the strokes. */
export function measureSignature(ink: readonly Point[], strokes?: readonly Stroke[], fromStylus = false): SignatureMeasurements {
  const underlineIndex = strokes ? findUnderline(strokes) : -1;
  // The baseline is read from the letters, not from an underline beneath them.
  const letters = strokes && underlineIndex >= 0 ? strokes.filter((_, i) => i !== underlineIndex).flat() : null;
  return {
    slant: estimateSlant(ink),
    baseline: estimateBaseline(letters && letters.length > 30 ? letters : ink),
    proportions: proportions(ink),
    strokes: strokes ? strokeStats(strokes, fromStylus) : null,
    underline: strokes ? underlineIndex >= 0 : null,
  };
}

const round = (n: number, d = 0) => {
  const f = 10 ** d;
  return Math.round(n * f) / f;
};

/** Human-readable rows for the sheet, the preview and the WhatsApp message. */
export function measurementRows(m: SignatureMeasurements): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  if (m.slant !== null) rows.push({ label: "Slant", value: `${round(m.slant)}° · ${slantLabel(m.slant)}` });
  if (m.baseline) {
    const a = round(Math.abs(m.baseline.angle), 1);
    const label = baselineLabel(m.baseline.angle);
    rows.push({ label: "Baseline", value: label === "level" ? "level" : `${label} ${a}°` });
  }
  if (m.proportions !== null) rows.push({ label: "Proportions", value: `${round(m.proportions, 1)} : 1 (width : height)` });
  if (m.strokes) {
    rows.push({ label: "Pen lifts", value: String(m.strokes.penLifts) });
    rows.push({ label: "Time", value: `${round(m.strokes.duration, 1)} s` });
    if (m.strokes.pace !== null) rows.push({ label: "Pace", value: `${round(m.strokes.pace, 1)} heights per second` });
    if (m.strokes.pressure) {
      const v = m.strokes.pressure.variation;
      rows.push({ label: "Pressure", value: `${Math.round(m.strokes.pressure.mean * 100)}% · ${v < 0.12 ? "even" : v < 0.25 ? "varied" : "very varied"}` });
    }
  }
  return rows;
}
