/**
 * Colour measurement for the Watch Specimen Check. Pure functions, no DOM.
 *
 * Colours are compared in CIE Lab (perceptually closer than RGB) and named
 * from a palette of terms used for watch dials and straps. Clustering is a
 * small, deterministic k-means, so the same photo always gives the same answer.
 */

export type Rgb = readonly [number, number, number];
export type Lab = readonly [number, number, number];

export interface ColourReading {
  hex: string;
  name: string;
  /** Measured from the photo, or chosen by the visitor. */
  source: "photo" | "chosen";
}

/** Watch-relevant colour names. Order matters only for ties. */
export const COLOUR_PALETTE: { name: string; hex: string }[] = [
  { name: "black", hex: "#16161a" },
  { name: "anthracite", hex: "#3b3e43" },
  { name: "grey", hex: "#85888d" },
  { name: "silver", hex: "#c3c6ca" },
  { name: "white", hex: "#f1f1ed" },
  { name: "cream", hex: "#ebe1c9" },
  { name: "champagne", hex: "#d6c49a" },
  { name: "gold", hex: "#c8a24a" },
  { name: "rose gold", hex: "#c98f76" },
  { name: "copper", hex: "#b06a44" },
  { name: "beige", hex: "#d5c1a0" },
  { name: "tan", hex: "#b07e4d" },
  { name: "cognac", hex: "#94552a" },
  { name: "brown", hex: "#6a4129" },
  { name: "dark brown", hex: "#3e2a1f" },
  { name: "navy blue", hex: "#1c2a4f" },
  { name: "blue", hex: "#2e5da8" },
  { name: "light blue", hex: "#8fb3d9" },
  { name: "teal", hex: "#1e6e73" },
  { name: "turquoise", hex: "#3eb0ae" },
  { name: "dark green", hex: "#1e4a33" },
  { name: "green", hex: "#3d7d49" },
  { name: "olive", hex: "#6a6a39" },
  { name: "mint", hex: "#a5d3b7" },
  { name: "burgundy", hex: "#6a1f2c" },
  { name: "red", hex: "#b3262f" },
  { name: "orange", hex: "#d8692b" },
  { name: "yellow", hex: "#e2c03b" },
  { name: "purple", hex: "#5a3a7a" },
  { name: "lavender", hex: "#b6a5d6" },
  { name: "pink", hex: "#e2a3b5" },
  { name: "salmon", hex: "#e4997f" },
];

export function hexToRgb(hex: string): Rgb {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex([r, g, b]: Rgb): string {
  return `#${[r, g, b].map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("")}`;
}

/** sRGB (0–255) → CIE Lab, D65 white point. */
export function rgbToLab([r, g, b]: Rgb): Lab {
  const lin = (v: number) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  const [lr, lg, lb] = [lin(r), lin(g), lin(b)];
  const x = (lr * 0.4124 + lg * 0.3576 + lb * 0.1805) / 0.95047;
  const y = lr * 0.2126 + lg * 0.7152 + lb * 0.0722;
  const z = (lr * 0.0193 + lg * 0.1192 + lb * 0.9505) / 1.08883;
  const f = (t: number) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116);
  const [fx, fy, fz] = [f(x), f(y), f(z)];
  return [116 * fy - 16, 500 * (fx - fy), 200 * (fy - fz)];
}

/** CIE94 colour difference (graphic arts weights): better than plain Euclidean Lab for naming. */
export function deltaE94(a: Lab, b: Lab): number {
  const dL = a[0] - b[0];
  const c1 = Math.hypot(a[1], a[2]);
  const c2 = Math.hypot(b[1], b[2]);
  const dC = c1 - c2;
  const dH2 = Math.max(0, (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2 - dC ** 2);
  const sC = 1 + 0.045 * c1;
  const sH = 1 + 0.015 * c1;
  return Math.sqrt(dL ** 2 + (dC / sC) ** 2 + dH2 / sH ** 2);
}

const PALETTE_LAB = COLOUR_PALETTE.map((p) => ({ ...p, lab: rgbToLab(hexToRgb(p.hex)) }));

/** The nearest palette name for a colour. */
export function nameColour(rgb: Rgb): string {
  const lab = rgbToLab(rgb);
  let best = PALETTE_LAB[0];
  let bestD = Infinity;
  for (const p of PALETTE_LAB) {
    const d = deltaE94(lab, p.lab);
    if (d < bestD) {
      bestD = d;
      best = p;
    }
  }
  return best.name;
}

export function readingFromRgb(rgb: Rgb, source: ColourReading["source"] = "photo"): ColourReading {
  return { hex: rgbToHex(rgb), name: nameColour(rgb), source };
}

export function readingFromName(name: string): ColourReading | null {
  const p = COLOUR_PALETTE.find((c) => c.name === name);
  return p ? { hex: p.hex, name: p.name, source: "chosen" } : null;
}

export function averageRgb(pixels: readonly Rgb[]): Rgb {
  if (pixels.length === 0) return [0, 0, 0];
  let r = 0;
  let g = 0;
  let b = 0;
  for (const p of pixels) {
    r += p[0];
    g += p[1];
    b += p[2];
  }
  return [r / pixels.length, g / pixels.length, b / pixels.length];
}

export interface Cluster {
  rgb: Rgb;
  /** Share of the sampled pixels in this cluster, 0–1. */
  share: number;
}

/**
 * Deterministic k-means in Lab space. Centres start at evenly spaced
 * lightness quantiles, so results are stable for the same input.
 */
export function kMeans(pixels: readonly Rgb[], k = 4, iterations = 12): Cluster[] {
  if (pixels.length === 0) return [];
  const labs = pixels.map(rgbToLab);
  const order = labs.map((_, i) => i).sort((i, j) => labs[i][0] - labs[j][0]);
  const n = Math.min(k, pixels.length);
  let centres: Lab[] = Array.from({ length: n }, (_, c) => labs[order[Math.floor(((c + 0.5) / n) * order.length)]]);
  const assign = new Array<number>(labs.length).fill(0);

  for (let it = 0; it < iterations; it++) {
    let moved = false;
    for (let i = 0; i < labs.length; i++) {
      let best = 0;
      let bestD = Infinity;
      for (let c = 0; c < centres.length; c++) {
        const d = (labs[i][0] - centres[c][0]) ** 2 + (labs[i][1] - centres[c][1]) ** 2 + (labs[i][2] - centres[c][2]) ** 2;
        if (d < bestD) {
          bestD = d;
          best = c;
        }
      }
      if (assign[i] !== best) moved = true;
      assign[i] = best;
    }
    centres = centres.map((centre, c) => {
      let sl = 0;
      let sa = 0;
      let sb = 0;
      let count = 0;
      for (let i = 0; i < labs.length; i++) {
        if (assign[i] !== c) continue;
        sl += labs[i][0];
        sa += labs[i][1];
        sb += labs[i][2];
        count++;
      }
      return count ? ([sl / count, sa / count, sb / count] as Lab) : centre;
    });
    if (!moved && it > 0) break;
  }

  return centres
    .map((_, c) => {
      const members = pixels.filter((_, i) => assign[i] === c);
      return { rgb: averageRgb(members), share: members.length / pixels.length };
    })
    .filter((cl) => cl.share > 0)
    .sort((a, b) => b.share - a.share);
}

/**
 * The dial's background colour: the largest colour cluster in the centre of
 * the dial. Hands, markers and logos are thin, so they form smaller clusters.
 */
export function dominantColour(pixels: readonly Rgb[]): Rgb | null {
  const clusters = kMeans(pixels, 4);
  return clusters[0]?.rgb ?? null;
}
