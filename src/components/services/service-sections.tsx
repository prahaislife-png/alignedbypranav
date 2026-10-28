import type { Service } from "@/types/content";
import { pranav } from "@/data/pranav";
import { getRelatedServices } from "@/data/services";
import { Specimen } from "@/components/ui/specimen";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqList } from "@/components/ui/faq-list";
import { ArrowLink } from "@/components/ui/link-button";
import { ListMark } from "@/components/ui/ornaments";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { ServiceIndexRow } from "./service-card";
import { PricingPanel } from "./pricing-panel";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section aria-labelledby="service-title" className="relative overflow-hidden border-b border-line">
      <div className="container-page grid items-end gap-12 pt-8 pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-12 lg:pb-24">
        <div className="lg:col-span-7">
          <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]} />
          <p className="eyebrow mt-10 lg:mt-16">
            <span aria-hidden="true">§ </span>
            consultation {service.number}
          </p>
          <h1 id="service-title" className="display-xl mt-4 max-w-[13ch]">
            {service.title}
          </h1>
          <p className="lead mt-6 max-w-xl !text-ink">{service.oneLiner}</p>
          <p className="mt-3 font-mono text-[0.75rem] text-muted lowercase">
            with {pranav.name} · {pranav.title}
          </p>
          <div data-hero-cta className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
            <WhatsAppCta service={service} placement="service_hero" label={`Enquire about ${service.shortTitle}`} />
            <ArrowLink href="#pricing">Consultation details</ArrowLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[19rem] sm:max-w-[23rem] lg:col-span-4 lg:col-start-9 lg:max-w-none">
          <Specimen
            visual={service.image ?? service.illustration}
            fig={service.number}
            caption={service.shortTitle}
            priority
            ink="load"
            className="aspect-[4/5] rotate-[1.5deg]"
          />
        </div>
      </div>
    </section>
  );
}

export function ServiceIntro({ service }: { service: Service }) {
  return (
    <section aria-labelledby="why-choose-title" className="section-y border-b border-line">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-5">
          <p className="eyebrow">
            <span aria-hidden="true">§ </span>a note on {service.shortTitle}
          </p>
          <blockquote className="from-baseline mt-5 font-display text-[clamp(1.75rem,1.6vw+1.2rem,2.75rem)] leading-[1.1] italic">
            {service.pullQuote}
          </blockquote>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="lead !text-ink">{service.intro}</p>
          <h2 id="why-choose-title" className="display-sm mt-12">
            Why someone may choose this consultation
          </h2>
          <ul className="mt-6 border-t border-line">
            {service.whyChoose.map((reason) => (
              <li key={reason} className="flex gap-4 border-b border-line py-3.5 text-muted">
                <ListMark className="mt-[0.75rem]" />
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function ServiceExplores({ service }: { service: Service }) {
  return (
    <section aria-labelledby="explores-title" className="section-y border-b border-line bg-paper-2">
      <div className="container-page">
        <SectionHeading id="explores-title" eyebrow="Areas of consultation" title={`What ${pranav.firstName} explores`} />
        <ol className="mt-12 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-3">
          {service.explores.map((area, i) => (
            <li key={area.title} className="reveal border-b border-line py-7 sm:pr-8">
              <p className="font-mono text-[0.75rem] text-madder">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-[1.5rem] leading-tight">{area.title}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{area.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function ServiceAudienceAndProcess({ service }: { service: Service }) {
  return (
    <section aria-label="Who it is for and how it works" className="section-y border-b border-line">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Who it may suit" title="Who it may be relevant for" size="md" />
          <ul className="mt-8 flex flex-wrap gap-2">
            {service.relevantFor.map((item) => (
              <li key={item} className="border border-ink px-3.5 py-1.5 text-[0.9375rem]">
                {item}
              </li>
            ))}
          </ul>
          {service.careNote && (
            <aside aria-label="Please note" className="mt-10 border-l-2 border-madder bg-paper-2 p-6">
              <p className="eyebrow">§ please note</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">{service.careNote}</p>
            </aside>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow="The process" title="How the consultation works" size="md" />
          <div className="relative mt-10">
            {/* A red pen line drawn down the steps as the reader scrolls. */}
            <svg aria-hidden="true" viewBox="0 0 2 100" preserveAspectRatio="none" className="absolute top-3 bottom-3 left-[1.2rem] h-[calc(100%-1.5rem)] w-0.5">
              <line x1="1" x2="1" y1="0" y2="100" stroke="var(--color-madder)" strokeWidth="1.5" pathLength={1} vectorEffect="non-scaling-stroke" className="scroll-ink" />
            </svg>
            <ol className="space-y-10 pl-16">
              {service.process.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="absolute top-0 -left-16 flex size-10 items-center justify-center border border-ink bg-paper font-display text-[1.25rem]">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-[1.4rem] leading-tight">{step.title}</h3>
                  <p className="mt-2 text-muted">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
          {service.preparation && (
            <div className="mt-12 border border-line bg-paper-2 p-6">
              <h3 className="font-display text-[1.375rem]">How to prepare</h3>
              <ul className="mt-3 space-y-2">
                {service.preparation.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-muted">
                    <ListMark className="mt-[0.7rem]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ServicePricing({ service }: { service: Service }) {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y border-b border-line bg-paper-2">
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading
            id="pricing-title"
            eyebrow="Starting price"
            title="Clear before you commit"
            intro="Ask Pranav about the consultation process and starting price on WhatsApp. Nothing is booked until you decide to go ahead."
            size="md"
          />
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <PricingPanel service={service} />
        </div>
      </div>
    </section>
  );
}

export function ServiceFaqs({ service }: { service: Service }) {
  if (service.faqs.length === 0) return null;
  return (
    <section aria-labelledby="service-faq-title" className="section-y border-b border-line">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="service-faq-title" eyebrow="Questions" title="Good to know" size="md" />
          <ArrowLink href="/faq" className="mt-8">
            All questions
          </ArrowLink>
        </div>
        <FaqList items={service.faqs} className="lg:col-span-7 lg:col-start-6" />
      </div>
    </section>
  );
}

export function RelatedServices({ service }: { service: Service }) {
  const related = getRelatedServices(service);
  return (
    <section aria-labelledby="related-title" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="related-title" eyebrow="You may also consider" title="Related consultations" size="md" />
          <ArrowLink href="/services" className="mt-8">
            All consultations
          </ArrowLink>
        </div>
        <ul className="border-t border-ink lg:col-span-8">
          {related.map((s) => (
            <li key={s.id}>
              <ServiceIndexRow service={s} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
