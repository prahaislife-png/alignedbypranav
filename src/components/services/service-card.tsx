import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/types/content";
import { ArchVisual } from "@/components/ui/arch-visual";
import { cn } from "@/lib/cn";

/**
 * Editorial service card. The title link is stretched over the whole card.
 * Below 640px it becomes a compact row (thumbnail + text) to keep mobile
 * pages short; from `sm` up it is a full portrait card.
 */
export function ServiceCard({
  service,
  surface = "parchment",
  headingLevel: H = "h3",
  className,
}: {
  service: Service;
  surface?: "parchment" | "sage";
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative grid h-full grid-cols-[5.5rem_1fr] items-center gap-4 rounded-[1.25rem] border border-line-soft bg-ivory p-3 transition-[box-shadow,transform,border-color] duration-500 ease-[var(--ease-gentle)] hover:-translate-y-1 hover:border-gold/40 hover:shadow-[var(--shadow-lift)] sm:flex sm:flex-col sm:items-stretch sm:gap-0 sm:rounded-[1.5rem]",
        className,
      )}
    >
      <ArchVisual
        visual={service.image ?? service.illustration}
        surface={surface}
        outline={false}
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 6rem"
        className="aspect-[4/5] w-full sm:aspect-[6/5]"
      />
      <div className="flex flex-1 flex-col py-1 pr-1 sm:px-3 sm:pt-6 sm:pb-4">
        <p className="font-display text-[0.9375rem] text-gold-ink italic sm:text-[1rem]">No. {service.number}</p>
        <H className="mt-0.5 font-display text-[1.375rem] leading-[1.15] sm:display-sm sm:mt-1.5">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0 after:rounded-[1.25rem] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-gold-ink sm:after:rounded-[1.5rem]"
          >
            {service.title}
          </Link>
        </H>
        <p className="mt-1.5 text-[0.875rem] leading-snug text-muted sm:mt-3 sm:text-[0.9375rem] sm:leading-relaxed">
          {service.oneLiner}
        </p>
        <span aria-hidden="true" className="mt-auto hidden items-center gap-2 pt-6 text-[0.875rem] font-medium text-plum sm:inline-flex">
          <span className="relative">
            Explore
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-50 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
        </span>
      </div>
    </article>
  );
}
