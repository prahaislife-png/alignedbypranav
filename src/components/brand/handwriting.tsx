import { handwriting } from "./handwriting-data";
import { cn } from "@/lib/cn";

type Word = keyof typeof handwriting;

/**
 * A word written in a single continuous pen stroke (EMS Allure).
 *
 * - `write`: the ink is laid down on load, with a pen nib following the stroke.
 * - `scroll`: the ink is laid down as the word scrolls through the viewport.
 * - neither: drawn, static.
 * Reduced-motion users always see the finished word.
 */
export function Handwriting({
  word = "aligned",
  className,
  strokeWidth = 1.6,
  write = false,
  scroll = false,
  nib = false,
  duration = 2.4,
  delay = 0.2,
  title,
}: {
  word?: Word;
  className?: string;
  /** Stroke width in CSS pixels, constant at any size. */
  strokeWidth?: number;
  write?: boolean;
  scroll?: boolean;
  nib?: boolean;
  duration?: number;
  delay?: number;
  /** Accessible name; omit for decorative use. */
  title?: string;
}) {
  const { d, viewBox } = handwriting[word];
  const timing = { ["--write-duration" as string]: `${duration}s`, ["--write-delay" as string]: `${delay}s` };
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      className={cn("overflow-visible", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <path
        d={d}
        pathLength={1}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className={write ? "write-on" : scroll ? "scroll-ink" : undefined}
        style={timing}
      />
      {write && nib && (
        <g className="pen-nib" style={{ ...timing, offsetPath: `path("${d}")`, opacity: 0 }}>
          <PenNib />
        </g>
      )}
    </svg>
  );
}

/** A fountain-pen nib drawn with its tip at (0, 0), pointing down-left, in font units. */
function PenNib() {
  return (
    <g transform="rotate(-35)">
      <path d="M0 0 L-46 -150 Q0 -205 46 -150 Z" fill="var(--color-gold)" stroke="var(--color-ink)" strokeWidth="10" />
      <path d="M0 -8 L0 -120" stroke="var(--color-ink)" strokeWidth="9" strokeLinecap="round" />
      <circle cx="0" cy="-128" r="11" fill="var(--color-ink)" />
      <rect x="-60" y="-330" width="120" height="175" rx="20" fill="var(--color-ink)" />
    </g>
  );
}
