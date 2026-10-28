import { describe, expect, it } from "vitest";
import { dominantColour, hexToRgb, kMeans, nameColour, readingFromName, rgbToHex, rgbToLab, type Rgb } from "../watch-check/colour";
import { clampFraming } from "../watch-check/image";
import { answerText, firstLookMessage, recordRows, unanswered } from "../watch-check/record";
import { watchCheck } from "@/data/watch-check";

describe("colour naming", () => {
  it.each([
    ["#101014", "black"],
    ["#1b2a52", "navy blue"],
    ["#f4f4f1", "white"],
    ["#c0c3c7", "silver"],
    ["#6b4029", "brown"],
    ["#c9a34c", "gold"],
    ["#1f4b33", "dark green"],
    ["#b3262f", "red"],
  ])("names %s as %s", (hex, name) => {
    expect(nameColour(hexToRgb(hex))).toBe(name);
  });

  it("round-trips hex and computes Lab for white", () => {
    expect(rgbToHex(hexToRgb("#a3352b"))).toBe("#a3352b");
    const [l, a, b] = rgbToLab([255, 255, 255]);
    expect(l).toBeCloseTo(100, 0);
    expect(Math.abs(a)).toBeLessThan(0.5);
    expect(Math.abs(b)).toBeLessThan(0.5);
  });

  it("only accepts palette names when a colour is chosen", () => {
    expect(readingFromName("navy blue")).toMatchObject({ name: "navy blue", source: "chosen" });
    expect(readingFromName("not a colour")).toBeNull();
  });
});

describe("dial colour measurement", () => {
  const fill = (rgb: Rgb, n: number) => Array.from({ length: n }, () => rgb);

  it("finds the dial colour behind hands and markers", () => {
    const pixels = [...fill([28, 42, 80], 700), ...fill([240, 240, 236], 200), ...fill([179, 38, 47], 100)];
    const dial = dominantColour(pixels);
    expect(dial && nameColour(dial)).toBe("navy blue");
  });

  it("is deterministic and returns shares that sum to 1", () => {
    const pixels = [...fill([10, 10, 10], 50), ...fill([200, 200, 200], 150)];
    const a = kMeans(pixels, 3);
    const b = kMeans(pixels, 3);
    expect(a).toEqual(b);
    expect(a.reduce((sum, c) => sum + c.share, 0)).toBeCloseTo(1, 5);
  });

  it("handles an empty sample", () => {
    expect(dominantColour([])).toBeNull();
  });
});

describe("framing", () => {
  it("keeps the photo covering the viewfinder", () => {
    const f = clampFraming({ width: 1200, height: 800 }, { zoom: 1, x: 5, y: 5 });
    expect(f.zoom).toBe(1);
    expect(f.x).toBeCloseTo(0.25, 5); // (1.5 − 1) / 2
    expect(f.y).toBe(0);
    expect(clampFraming({ width: 100, height: 100 }, { zoom: 0.2, x: 0, y: 0 }).zoom).toBe(1);
    expect(clampFraming({ width: 100, height: 100 }, { zoom: 40, x: 0, y: 0 }).zoom).toBe(6);
  });
});

describe("record and WhatsApp message", () => {
  const record = {
    dial: { hex: "#1c2a4f", name: "navy blue", source: "photo" as const },
    strap: null,
    answers: { shape: ["round"], features: ["date", "subdials"], wrist: ["left"], bogus: ["x"] },
  };

  it("uses the option labels from the data file", () => {
    expect(answerText("features", record.answers)).toBe("Date window, Small sub-dials");
    expect(answerText("shape", { shape: ["not-an-option"] })).toBeNull();
  });

  it("lists only recorded details, in question order", () => {
    expect(recordRows(record).map((r) => r.label)).toEqual(["Dial colour", "Dial shape", "Details", "Wrist"]);
  });

  it("writes a clear first-look request without empty or unknown fields", () => {
    const message = firstLookMessage(record);
    expect(message).toContain("Watch Specimen Check");
    expect(message).toContain("Dial colour: navy blue");
    expect(message).toContain("Dial shape: Round");
    expect(message).not.toMatch(/undefined|null|bogus/);
    expect(message).not.toContain("Strap colour");
  });

  it("counts unanswered questions", () => {
    expect(unanswered({}).length).toBe(watchCheck.questions.length);
    expect(unanswered(record.answers).length).toBe(watchCheck.questions.length - 3);
  });
});
