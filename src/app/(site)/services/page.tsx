import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ArchVisual } from "@/components/ui/arch-visual";
import { HowItWorks } from "@/components/home/how-it-works";
import { FinalCta } from "@/components/home/final-cta";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { ConcentricRings, Diamond } from "@/components/ui/ornaments";

export const metadata: Metadata = pageMetadata({
  title: "Consultations: Signature, Logo, Clock, Number, Drawing & Vision Board",
  description:
    "Seven personalised consultations with Pranav Vibhute: signature and handwriting analysis, business logo analysis, wristwatch and office clock alignment, phone number selection, drawing analysis and vision boards.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <section aria-labelledby="services-page-title" className="relative overflow-hidden">
        <ConcentricRings rings={5} className="absolute -top-64 -right-64 w-[44rem] opacity-60" />
        <div className="container-page relative pt-8 pb-16 lg:pt-12 lg:pb-20">
          <Breadcrumbs items={[{ name: "Services", path: "/services" }]} />
          <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-gold" />
                Seven consultations
              </p>
              <h1 id="services-page-title" className="display-xl mt-5 max-w-[14ch]">
                Explore your <em className="accent-italic">alignment</em>
              </h1>
            </div>
            <div className="lg:col-span-4">
              <p className="lead">
                Each consultation is personal and led by Pranav Vibhute. Choose the one that feels relevant, or ask him
                which would suit you.
              </p>
              <div data-hero-cta className="mt-6">
                <WhatsAppCta placement="hero" label="Ask which would suit you" variant="outline" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="All consultations" className="paper bg-parchment py-10 lg:py-16">
        <ol className="container-page">
          {services.map((service, i) => (
            <li key={service.id} className="reveal border-b border-line last:border-b-0">
              <article className="group relative grid gap-6 py-10 sm:grid-cols-[9rem_1fr] sm:gap-8 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12">
                <ArchVisual
                  visual={service.image ?? service.illustration}
                  surface={i % 2 ? "sage" : "ivory"}
                  outline={false}
                  sizes="(min-width: 1024px) 14vw, 9rem"
                  className="aspect-[4/5] w-28 transition-transform duration-700 ease-[var(--ease-gentle)] group-hover:-translate-y-1 sm:w-full lg:col-span-2"
                />
                <div className="lg:col-span-5">
                  <p className="font-display text-[1rem] text-gold-ink italic">No. {service.number}</p>
                  <h2 className="display-md mt-1.5">
                    <Link
                      href={`/services/${service.slug}`}
                      className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-gold-ink"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-muted">{service.oneLiner}</p>
                </div>
                <ul className="grid content-start gap-2 sm:col-start-2 lg:col-span-4 lg:col-start-8">
                  {service.explores.slice(0, 4).map((area) => (
                    <li key={area.title} className="flex items-center gap-3 text-[0.9375rem] text-charcoal">
                      <Diamond />
                      {area.title}
                    </li>
                  ))}
                </ul>
                <span
                  aria-hidden="true"
                  className="hidden size-12 items-center justify-center justify-self-end rounded-full border border-plum/25 text-plum transition-colors duration-500 group-hover:bg-plum group-hover:text-ivory lg:col-span-1 lg:flex"
                >
                  <ArrowRight className="size-5" strokeWidth={1.4} />
                </span>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <HowItWorks />
      <FinalCta />
    </>
  );
}
