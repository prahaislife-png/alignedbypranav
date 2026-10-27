import type { Service } from "@/types/content";
import { pranav } from "@/data/pranav";
import { getRelatedServices } from "@/data/services";
import { ArchVisual } from "@/components/ui/arch-visual";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { FaqList } from "@/components/ui/faq-list";
import { ArrowLink } from "@/components/ui/link-button";
import { Diamond } from "@/components/ui/ornaments";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { ServiceCard } from "./service-card";
import { PricingPanel } from "./pricing-panel";

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section aria-labelledby="service-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-14 pt-8 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-12 lg:pb-28">
        <div className="lg:col-span-7">
          <Breadcrumbs items={[{ name: "Services", path: "/services" }, { name: service.title, path: `/services/${service.slug}` }]} />
          <p className="eyebrow mt-10 flex items-center gap-3 lg:mt-14">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            Consultation No. {service.number}
          </p>
          <h1 id="service-title" className="display-lg mt-5 max-w-[16ch]">
            {service.title}
          </h1>
          <p className="lead mt-6 max-w-xl">
            {service.oneLiner}
          </p>
          <p className="mt-4 text-[0.9375rem] text-muted">
            With <span className="text-plum">{pranav.name}</span>, {pranav.title}
          </p>
          <div
            data-hero-cta
            className="mt-9 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <WhatsAppCta service={service} placement="service_hero" label={`Enquire about ${service.shortTitle}`} />
            <ArrowLink href="#pricing">Consultation details</ArrowLink>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[20rem] sm:max-w-[24rem] lg:col-span-5 lg:max-w-none">
          <ArchVisual visual={service.image ?? service.illustration} priority animate className="fade-in aspect-[4/5]" />
        </div>
      </div>
    </section>
  );
}

export function ServiceIntro({ service }: { service: Service }) {
  return (
    <section aria-labelledby="why-choose-title" className="border-t border-line-soft section-y">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-10">
        <figure className="lg:col-span-5">
          <span aria-hidden="true" className="block font-display text-[5rem] leading-[0.6] text-gold">
            “
          </span>
          <blockquote className="mt-4 font-display text-[clamp(1.75rem,1.5vw+1.2rem,2.5rem)] leading-[1.18] text-plum italic">
            {service.pullQuote}
          </blockquote>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="lead !text-charcoal">{service.intro}</p>
          <h2 id="why-choose-title" className="display-sm mt-12">
            Why someone may choose this consultation
          </h2>
          <ul className="mt-6 space-y-4">
            {service.whyChoose.map((reason) => (
              <li key={reason} className="flex gap-4 text-muted">
                <Diamond className="mt-[0.6rem] shrink-0" />
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
    <section aria-labelledby="explores-title" className="paper section-y bg-parchment">
      <div className="container-page">
        <SectionHeading id="explores-title" eyebrow="Areas of consultation" title={`What ${pranav.firstName} explores`} />
        <ol className="mt-14 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {service.explores.map((area, i) => (
            <li key={area.title} className="reveal border-b border-line py-8 sm:pr-8 lg:[&:nth-last-child(-n+3)]:border-b-0">
              <p className="font-display text-[1rem] text-gold-ink italic">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-[1.625rem] leading-tight text-plum">{area.title}</h3>
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
    <section aria-label="Who it is for and how it works" className="section-y">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow="Who it may suit" title="Who it may be relevant for" size="md" />
          <ul className="mt-8 flex flex-wrap gap-2.5">
            {service.relevantFor.map((item) => (
              <li key={item} className="rounded-full border border-gold/35 bg-ivory px-4 py-2 text-[0.9375rem] text-charcoal">
                {item}
              </li>
            ))}
          </ul>
          {service.careNote && (
            <aside aria-label="Please note" className="mt-10 rounded-2xl border border-sage/30 bg-sage-mist p-6">
              <p className="eyebrow !text-sage-ink">Please note</p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-charcoal">{service.careNote}</p>
            </aside>
          )}
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <SectionHeading eyebrow="The process" title="How the consultation works" size="md" />
          <div className="relative mt-10">
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[1.15rem] w-px bg-gold/40" />
            <ol className="space-y-10 pl-14">
            {service.process.map((step, i) => (
              <li key={step.title} className="relative">
                <span className="absolute top-0 -left-14 flex size-10 items-center justify-center rounded-full border border-gold/50 bg-ivory font-display text-[1.125rem] text-plum italic">
                  {i + 1}
                </span>
                <h3 className="font-display text-[1.5rem] leading-tight text-plum">{step.title}</h3>
                <p className="mt-2 text-muted">{step.description}</p>
              </li>
            ))}
            </ol>
          </div>
          {service.preparation && (
            <div className="mt-12 rounded-2xl bg-parchment p-6">
              <h3 className="font-display text-[1.375rem] text-plum">How to prepare</h3>
              <ul className="mt-3 space-y-2">
                {service.preparation.map((item) => (
                  <li key={item} className="flex gap-3 text-[0.9375rem] text-muted">
                    <Diamond className="mt-[0.55rem] shrink-0" />
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
    <section id="pricing" aria-labelledby="pricing-title" className="paper section-y bg-parchment">
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
    <section aria-labelledby="service-faq-title" className="section-y">
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
    <section aria-labelledby="related-title" className="border-t border-line-soft section-y">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="related-title" eyebrow="You may also consider" title="Related consultations" size="md" />
          <ArrowLink href="/services" className="shrink-0 md:mb-1">
            All consultations
          </ArrowLink>
        </div>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {related.map((s, i) => (
            <li key={s.id}>
              <ServiceCard service={s} surface={i % 2 ? "sage" : "parchment"} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
