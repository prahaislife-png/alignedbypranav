import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "src/assets/fonts");

/** Branded social sharing image (Open Graph / Twitter), rendered at build time. */
export async function renderOgImage({ kicker, title, subtitle }: { kicker: string; title: string; subtitle: string }) {
  const [regular, italic] = await Promise.all([
    readFile(join(fontDir, "cormorant-garamond-latin-500-normal.woff")),
    readFile(join(fontDir, "cormorant-garamond-latin-500-italic.woff")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f8f5ee",
          fontFamily: "Cormorant",
          position: "relative",
        }}
      >
        <svg width="760" height="760" viewBox="0 0 400 400" style={{ position: "absolute", right: -190, top: -65 }}>
          {[196, 160, 124, 88].map((r, i) => (
            <circle key={r} cx="200" cy="200" r={r} fill="none" stroke="#a88a62" strokeWidth="0.8" opacity={0.55 - i * 0.08} />
          ))}
          <path d="M200 0v400" stroke="#a88a62" strokeWidth="0.8" opacity="0.6" />
          <path d="M200 192l8 8-8 8-8-8z" fill="#a88a62" />
        </svg>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", width: 860 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 54, color: "#332b40", lineHeight: 1 }}>aligned</div>
            <div style={{ fontSize: 17, letterSpacing: 7, color: "#77603e", marginTop: 10 }}>BY PRANAV</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 22, letterSpacing: 5, color: "#77603e", textTransform: "uppercase" }}>{kicker}</div>
            <div style={{ fontSize: 78, color: "#332b40", lineHeight: 1.02, marginTop: 18 }}>{title}</div>
            <div style={{ fontSize: 34, color: "#77603e", fontStyle: "italic", marginTop: 22 }}>{subtitle}</div>
          </div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 14, background: "#332b40", display: "flex" }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Cormorant", data: regular, style: "normal", weight: 500 },
        { name: "Cormorant", data: italic, style: "italic", weight: 500 },
      ],
    },
  );
}
