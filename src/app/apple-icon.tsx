import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the alignment mark on midnight plum. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#332b40" }}>
        <svg width="180" height="180" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="17" fill="none" stroke="#f8f5ee" strokeWidth="1.8" />
          <path d="M32 9v46" stroke="#f8f5ee" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M21.5 38.5a12 12 0 0 0 21 0" fill="none" stroke="#cdb693" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M32 28l4 4-4 4-4-4z" fill="#cdb693" />
        </svg>
      </div>
    ),
    size,
  );
}
