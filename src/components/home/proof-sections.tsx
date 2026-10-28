import Image from "next/image";
import { publishableExamples, publishableTestimonials } from "@/data/testimonials";
import { getService } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * Real, anonymised examples of Pranav's work. Renders nothing until
 * consented examples are added in src/data/testimonials.ts.
 */
export function RealExamples() {
  const examples = publishableExamples();
  if (examples.length === 0) return null;
  return (
    <section aria-labelledby="examples-title" className="section-y">
      <div className="container-page">
        <SectionHeading id="examples-title" eyebrow="Real examples" title="Work, shared with permission" />
        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {examples.map((example) => (
            <li key={example.title} className="overflow-hidden border border-line-soft bg-paper">
              <Image
                src={example.image.src}
                alt={example.image.alt}
                width={example.image.width}
                height={example.image.height}
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="p-6">
                <p className="eyebrow">{getService(example.serviceId)?.title}</p>
                <h3 className="display-sm mt-2">{example.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{example.summary}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/**
 * Genuine client testimonials. Renders nothing until real, consented
 * testimonials are added in src/data/testimonials.ts.
 */
export function Testimonials() {
  const items = publishableTestimonials();
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="paper section-y bg-paper-2">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow="In their words" title="From people Pranav has consulted" align="center" />
        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <li key={t.quote} className="flex flex-col bg-paper p-8">
              <span aria-hidden="true" className="font-display text-[4rem] leading-none text-madder">
                “
              </span>
              <blockquote className="-mt-4 font-display text-[1.375rem] leading-snug text-ink">{t.quote}</blockquote>
              <p className="mt-auto pt-6 text-[0.875rem] text-muted">
                {t.attribution}
                {t.serviceId && <> · {getService(t.serviceId)?.shortTitle}</>}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
