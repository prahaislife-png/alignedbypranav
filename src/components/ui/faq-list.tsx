import type { FaqItem } from "@/types/content";
import { cn } from "@/lib/cn";

/**
 * Accessible accordion built on native <details>/<summary>: keyboard and
 * screen-reader support without client-side JavaScript.
 */
export function FaqList({ items, className }: { items: FaqItem[]; className?: string }) {
  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item) => (
        <details key={item.question} className="group border-b border-line">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-6 text-left transition-colors hover:text-madder md:py-7">
            <span className="font-display text-[1.25rem] leading-snug text-ink md:text-[1.4rem]">
              {item.question}
            </span>
            <span
              aria-hidden="true"
              className="relative mt-1.5 size-6 shrink-0 border border-ink transition-[transform,background-color] duration-500 group-open:rotate-45 group-open:bg-ink"
            >
              <span className="absolute top-1/2 left-1/2 h-px w-2.5 -translate-1/2 bg-ink group-open:bg-paper" />
              <span className="absolute top-1/2 left-1/2 h-2.5 w-px -translate-1/2 bg-ink group-open:bg-paper" />
            </span>
          </summary>
          <p className="max-w-3xl pr-10 pb-7 text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
