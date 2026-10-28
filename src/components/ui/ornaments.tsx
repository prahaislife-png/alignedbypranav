import { cn } from "@/lib/cn";

/**
 * Handwriting practice guides: ascender, x-height, baseline and descender.
 * The site's recurring background motif, taken from the paper graphology starts with.
 */
export function GuideLines({
  className,
  tone = "light",
  xHeight = true,
}: {
  className?: string;
  tone?: "light" | "dark";
  /** The x-height line runs through capitals; drop it behind initials. */
  xHeight?: boolean;
}) {
  const color = tone === "light" ? "var(--color-line)" : "rgb(209 188 152 / 0.28)";
  const red = tone === "light" ? "var(--color-madder)" : "var(--color-gold)";
  return (
    <svg aria-hidden="true" className={cn("pointer-events-none", className)} preserveAspectRatio="none" viewBox="0 0 100 100">
      <line x1="0" x2="100" y1="12" y2="12" stroke={color} strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
      {xHeight && <line x1="0" x2="100" y1="44" y2="44" stroke={color} strokeDasharray="0.4 1" vectorEffect="non-scaling-stroke" />}
      <line x1="0" x2="100" y1="72" y2="72" stroke={red} strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
      <line x1="0" x2="100" y1="96" y2="96" stroke={color} strokeDasharray="1.2 1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** A measuring rule with millimetre-style ticks. */
export function Ruler({ className, ticks = 40, tone = "light" }: { className?: string; ticks?: number; tone?: "light" | "dark" }) {
  const color = tone === "light" ? "var(--color-ink)" : "var(--color-gold-light)";
  return (
    <svg aria-hidden="true" viewBox={`0 0 ${ticks * 10} 14`} preserveAspectRatio="none" className={cn("h-3.5 w-full", className)}>
      <line x1="0" x2={ticks * 10} y1="0.5" y2="0.5" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {Array.from({ length: ticks + 1 }, (_, i) => (
        <line
          key={i}
          x1={i * 10}
          x2={i * 10}
          y1="0"
          y2={i % 10 === 0 ? 14 : i % 5 === 0 ? 9 : 5}
          stroke={color}
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

/** List marker: a short red-pen stroke. */
export function ListMark({ className }: { className?: string }) {
  return <span aria-hidden="true" className={cn("inline-block h-[1.5px] w-3 shrink-0 bg-madder", className)} />;
}

/** A margin note in the graphologist's red pen, e.g. "fig. 02 — logo". */
export function MarginNote({ children, className, tone = "light" }: { children: React.ReactNode; className?: string; tone?: "light" | "dark" }) {
  return <p className={cn("eyebrow", tone === "dark" && "!text-gold-light", className)}>{children}</p>;
}
