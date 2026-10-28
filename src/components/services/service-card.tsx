import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types/content";
import { Specimen } from "@/components/ui/specimen";
import { cn } from "@/lib/cn";

/**
 * One line of the consultation index: figure number, title, one-liner and a
 * small specimen slip. The title link is stretched over the whole row.
 */
export function ServiceIndexRow({
  service,
  headingLevel: H = "h3",
  className,
}: {
  service: Service;
  headingLevel?: "h2" | "h3";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative grid grid-cols-[2.25rem_1fr_4.5rem] items-center gap-x-4 border-b border-line py-5 sm:grid-cols-[3rem_1fr_6.5rem] sm:gap-x-6 sm:py-6",
        className,
      )}
    >
      <span className="self-start pt-1.5 font-mono text-[0.8125rem] text-madder">{service.number}</span>
      <div className="min-w-0">
        <H className="font-display text-[1.375rem] leading-[1.1] transition-transform duration-500 ease-[var(--ease-out)] group-hover:translate-x-1.5 sm:text-[1.875rem]">
          <Link
            href={`/services/${service.slug}`}
            className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-madder"
          >
            {service.title}
          </Link>
        </H>
        <p className="mt-1.5 text-[0.9375rem] leading-snug text-muted sm:mt-2">{service.oneLiner}</p>
        <span aria-hidden="true" className="mt-3 hidden items-center gap-1.5 font-mono text-[0.75rem] text-madder lowercase sm:inline-flex">
          <span className="relative">
            read the consultation
            <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-madder transition-transform duration-500 group-hover:scale-x-100" />
          </span>
          <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
        </span>
      </div>
      <Specimen
        visual={service.image ?? service.illustration}
        compact
        sizes="7rem"
        className="aspect-[4/5] w-full rotate-[1.5deg] transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-[-2deg] group-hover:shadow-[4px_4px_0_0_var(--color-ink)]"
      />
    </article>
  );
}
