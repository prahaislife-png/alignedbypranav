import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { handwriting } from "@/components/brand/handwriting-data";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/fonts");

/** Branded social sharing image (Open Graph / Twitter), rendered at build time. */
export async function renderOgImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  const [display, mono] = await Promise.all([
    readFile(join(fontDir, "bluu-next-latin-700-normal.woff")),
    readFile(join(fontDir, "fragment-mono-latin-400-normal.woff")),
  ]);
  const word = handwriting.aligned;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f3f1eb", padding: "56px 72px", position: "relative" }}>
        {/* exercise-book margin */}
        <div style={{ position: "absolute", top: 0, bottom: 0, left: 48, width: 2, background: "#a3352b", opacity: 0.55, display: "flex" }} />
        <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
          <svg width="250" height="93" viewBox={word.viewBox}>
            <path d={word.d} fill="none" stroke="#221b2b" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div style={{ fontFamily: "Fragment", fontSize: 22, color: "#a3352b", marginBottom: 22 }}>by pranav</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "auto" }}>
          <div style={{ fontFamily: "Fragment", fontSize: 24, color: "#a3352b", display: "flex" }}>{`§ ${kicker}`}</div>
          <div style={{ fontFamily: "Bluu", fontSize: 92, color: "#221b2b", lineHeight: 0.95, letterSpacing: -2, marginTop: 18, maxWidth: 1000 }}>{title}</div>
          <div style={{ display: "flex", height: 2, background: "#a3352b", marginTop: 26, width: 1056 }} />
          <div style={{ fontFamily: "Fragment", fontSize: 24, color: "#5a5460", marginTop: 18 }}>{subtitle}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bluu", data: display, style: "normal", weight: 700 },
        { name: "Fragment", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}
