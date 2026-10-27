import { cn } from "@/lib/cn";

type WordmarkProps = {
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  // Byline margins clear the descender of the "g".
  sm: { word: "text-[1.625rem]", by: "text-[0.5rem] tracking-[0.44em] mt-[0.5rem]" },
  md: { word: "text-[1.9rem]", by: "text-[0.55rem] tracking-[0.46em] mt-[0.58rem]" },
  lg: { word: "text-[2.75rem]", by: "text-[0.7rem] tracking-[0.5em] mt-[0.8rem]" },
};

/**
 * The "aligned / BY PRANAV" wordmark. Set in Cormorant Garamond with the
 * tittle of the "i" replaced by a small gold diamond – the brand's single
 * point of alignment. Rendered as live text so it stays crisp and light.
 */
export function Wordmark({ tone = "light", size = "md", className }: WordmarkProps) {
  const s = sizes[size];
  return (
    <span className={cn("inline-flex flex-col items-start leading-none select-none", className)}>
      <span
        aria-hidden="true"
        className={cn(
          "font-display font-medium lowercase leading-[0.8] tracking-[-0.01em]",
          s.word,
          tone === "light" ? "text-plum" : "text-ivory",
        )}
      >
        al
        <span className="relative inline-block">
          {"ı"}
          <span
            className={cn(
              "absolute left-1/2 top-[-0.02em] size-[0.15em] -translate-x-1/2 rotate-45",
              tone === "light" ? "bg-gold" : "bg-gold-light",
            )}
          />
        </span>
        gned
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "font-sans font-medium uppercase pl-[0.08em]",
          s.by,
          tone === "light" ? "text-gold-ink" : "text-gold-light",
        )}
      >
        By Pranav
      </span>
      <span className="sr-only">Aligned by Pranav</span>
    </span>
  );
}
