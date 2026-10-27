import { cn } from "@/lib/cn";

/**
 * The alignment symbol: a circle, a vertical line passing through it and a
 * single gold point at the centre. Used sparingly as the brand's emblem.
 */
export function AlignmentMark({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const stroke = tone === "light" ? "var(--color-plum)" : "var(--color-ivory)";
  const accent = tone === "light" ? "var(--color-gold)" : "var(--color-gold-light)";
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" className={cn("shrink-0", className)}>
      <circle cx="24" cy="24" r="17" stroke={stroke} strokeWidth="1.25" />
      <path d="M24 2.5v43" stroke={stroke} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M13.5 30.5a12 12 0 0 0 21 0" stroke={accent} strokeWidth="1.25" strokeLinecap="round" />
      <path d="M24 20.5l3.5 3.5-3.5 3.5-3.5-3.5z" fill={accent} />
    </svg>
  );
}
