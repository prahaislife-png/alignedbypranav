import { cn } from "@/lib/cn";

/** Fine concentric rings – the brand's quiet background motif. */
export function ConcentricRings({
  className,
  rings = 5,
  tone = "gold",
}: {
  className?: string;
  rings?: number;
  tone?: "gold" | "light" | "sage";
}) {
  const color =
    tone === "gold" ? "var(--color-gold)" : tone === "sage" ? "var(--color-sage)" : "var(--color-gold-light)";
  return (
    <svg viewBox="0 0 400 400" fill="none" aria-hidden="true" className={cn("pointer-events-none", className)}>
      {Array.from({ length: rings }, (_, i) => (
        <circle
          key={i}
          cx="200"
          cy="200"
          r={196 - i * (150 / rings)}
          stroke={color}
          strokeWidth="0.75"
          opacity={0.55 - i * 0.06}
        />
      ))}
      <circle cx="200" cy="200" r="172" stroke={color} strokeWidth="0.75" strokeDasharray="1 7" opacity="0.8" />
      <circle cx="200" cy="28" r="2.5" fill={color} />
    </svg>
  );
}

/** A pen-stroke flourish used to close sections. */
export function Flourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 24" fill="none" aria-hidden="true" className={cn("h-6 w-60", className)}>
      <path
        d="M2 14c26-10 50-10 72-2s40 8 46-2c4-7-6-10-10-4-5 8 6 14 20 10 22-6 46-14 108-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path d="M120 2.5l3 3-3 3-3-3z" fill="currentColor" />
    </svg>
  );
}

/** Small rotated square – used as a list marker and divider point. */
export function Diamond({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block size-1.5 rotate-45 bg-gold", className)} />;
}

export function RuleOrnament({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("rule-ornament", className)}>
      <Diamond />
    </div>
  );
}
