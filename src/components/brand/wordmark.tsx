import { Handwriting } from "./handwriting";
import { cn } from "@/lib/cn";

type WordmarkProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: { word: "h-[2.15rem]", by: "text-[0.625rem]" },
  md: { word: "h-[2.5rem]", by: "text-[0.6875rem]" },
  lg: { word: "h-[4.25rem]", by: "text-[0.8125rem]" },
};

/**
 * The wordmark is a signature: "aligned" written in one pen stroke, sitting
 * on a red baseline, signed "by pranav" in the margin-note typeface.
 */
export function Wordmark({ tone = "light", size = "md", className }: WordmarkProps) {
  const s = sizes[size];
  const dark = tone === "dark";
  return (
    <span className={cn("relative inline-flex items-end gap-2.5 select-none", className)}>
      <span className="relative">
        <Handwriting className={cn("block w-auto", s.word, dark ? "text-paper" : "text-ink")} strokeWidth={size === "lg" ? 2 : 1.6} />
        <span
          aria-hidden="true"
          className={cn("absolute right-[-0.35rem] bottom-[34%] left-[-0.35rem] h-px", dark ? "bg-gold" : "bg-madder/70")}
        />
      </span>
      <span
        aria-hidden="true"
        className={cn("mb-[0.38em] font-mono leading-none whitespace-nowrap lowercase", s.by, dark ? "text-gold-light" : "text-madder")}
      >
        by pranav
      </span>
      <span className="sr-only">Aligned by Pranav</span>
    </span>
  );
}
