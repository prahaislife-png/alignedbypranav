import { ImageResponse } from "next/og";
import { handwriting } from "@/components/brand/handwriting-data";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: a handwritten "a" on a red baseline, on the night page. */
export default function AppleIcon() {
  const { d, viewBox } = handwriting.a;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#211b29", position: "relative" }}>
        <div style={{ position: "absolute", left: 22, right: 22, top: 104, height: 4, background: "#a3352b", display: "flex" }} />
        <svg width="132" height="87" viewBox={viewBox} style={{ marginTop: -12 }}>
          <path d={d} fill="none" stroke="#f3f1eb" strokeWidth="44" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    ),
    size,
  );
}
