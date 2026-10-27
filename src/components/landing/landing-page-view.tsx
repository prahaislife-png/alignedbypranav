import type { LandingPage, Service } from "@/types/content";
import { pranav } from "@/data/pranav";
import { publishableExamples, publishableTestimonials } from "@/data/testimonials";
import { resolveLandingCopy } from "@/data/landing-pages";
import { ArchVisual } from "@/components/ui/arch-visual";
import { FaqList } from "@/components/ui/faq-list";
import { ArrowLink } from "@/components/ui/link-button";
import { Diamond } from "@/components/ui/ornaments";
import { Portrait } from "@/components/ui/portrait";
import { TrackOnView } from "@/components/analytics/trackers";
import { PricingPanel } from "@/components/services/pricing-panel";
import { FinalCta } from "@/components/home/final-cta";
import { StickyWhatsAppBar } from "@/components/whatsapp/sticky-whatsapp-bar";
import { WhatsAppCta, resolveWhatsApp } from "@/components/whatsapp/whatsapp-cta";

/**
 * Advertising landing page. One lightweight template, seven services.
 * Blocks: relevance → explores → consultant → process → details →
 * reassurance → final CTA.
 */
export function LandingPageView({ page, service, variantKey }: { page: LandingPage; service: Service; variantKey?: string }) {
  const copy = resolveLandingCopy(page, variantKey);
  const whatsapp = resolveWhatsApp(service);
  const tracking = { landingPageId: page.id, landingVariant: variantKey ?? "default" };
  const testimonials = publishableTestimonials().filter((t) => t.serviceId === service.id);
  const examples = publishableExamples().filter((e) => e.serviceId === service.id);

  return (
    <>
      {/* 1 · Immediate relevance */}
      <section aria-labelledby="lp-title" className="relative overflow-hidden">
        <div className="container-page grid items-center gap-12 pt-6 pb-14 sm:pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <ArchVisual visual={copy.heroVisual} outline={false} sizes="5rem" priority className="aspect-[4/5] w-[4.5rem] shrink-0 lg:hidden" />
              <p className="eyebrow">
                Consultation with
                <span className="mt-1 block font-display text-[1.25rem] tracking-normal text-plum normal-case">
                  {pranav.name}
                </span>
              </p>
            </div>
            <h1 id="lp-title" className="display-lg mt-6 max-w-[18ch] lg:mt-8">
              {copy.headline}
            </h1>
            <p className="lead mt-5 max-w-xl">
              {copy.description}
            </p>
            <div data-hero-cta className="mt-8">
              <WhatsAppCta
                service={service}
                label={copy.ctaLabel}
                placement="landing_hero"
                landingPageId={tracking.landingPageId}
                landingVariant={tracking.landingVariant}
                className="w-full sm:w-auto"
              />
              <p className="mt-3 text-[0.8125rem] text-muted">
                Ask about the process and starting price. No commitment.
              </p>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <ArchVisual visual={copy.heroVisual} animate priority className="fade-in aspect-[4/5]" />
          </div>
        </div>
      </section>

      {/* 2 · What the consultation explores */}
      <section aria-labelledby="lp-explores" className="paper bg-parchment py-16 lg:py-24">
        <div className="container-page">
          <p className="eyebrow">{service.title}</p>
          <h2 id="lp-explores" className="display-md mt-4">
            What the consultation explores
          </h2>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.explorePoints.map((point, i) => (
              <li key={point} className="flex gap-4 rounded-2xl border border-line-soft bg-ivory p-5 sm:flex-col sm:gap-6 sm:p-6">
                <span className="font-display text-[1.125rem] text-gold-ink italic">0{i + 1}</span>
                <span className="font-display text-[1.375rem] leading-snug text-plum">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 · Meet your consultant */}
      <section aria-labelledby="lp-consultant" className="py-16 lg:py-24">
        <div className="container-page grid items-center gap-8 sm:grid-cols-[10rem_1fr] sm:gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <Portrait compact sizes="14rem" className="w-32 sm:w-full" />
          <div>
            <p className="eyebrow">Meet your consultant</p>
            <h2 id="lp-consultant" className="display-md mt-3">
              {pranav.name}
            </h2>
            <p className="mt-1 font-display text-[1.25rem] text-gold-ink italic">{pranav.title}</p>
            <p className="mt-5 max-w-2xl text-muted">{pranav.shortBio}</p>
            <ArrowLink href="/about" className="mt-6">
              About Pranav
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* 4 · How it works */}
      <section aria-labelledby="lp-process" className="border-t border-line-soft py-16 lg:py-24">
        <div className="container-page">
          <h2 id="lp-process" className="display-md">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {service.process.map((step, i) => (
              <li key={step.title} className="border-t border-gold/50 pt-6">
                <p className="font-display text-[1.125rem] text-gold-ink italic">Step {i + 1}</p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-tight text-plum">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Consultation details */}
      <section aria-label="Consultation details" className="paper bg-parchment py-16 lg:py-24">
        <div className="container-page max-w-3xl">
          <PricingPanel
            service={service}
            placement="landing_details"
            landingPageId={tracking.landingPageId}
            landingVariant={tracking.landingVariant}
          />
        </div>
      </section>

      {/* 6 · Evidence and reassurance */}
      <section aria-labelledby="lp-reassurance" className="py-16 lg:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="lp-reassurance" className="display-md">
              {testimonials.length || examples.length ? "From Pranav’s work" : "Good to know"}
            </h2>
            {service.careNote && (
              <p className="mt-6 rounded-2xl border border-sage/30 bg-sage-mist p-5 text-[0.9375rem] leading-relaxed text-charcoal">
                {service.careNote}
              </p>
            )}
          </div>
          <div className="lg:col-span-8">
            {testimonials.length > 0 && (
              <ul className="mb-10 grid gap-5 md:grid-cols-2">
                {testimonials.map((t) => (
                  <li key={t.quote} className="rounded-2xl bg-parchment p-6">
                    <blockquote className="font-display text-[1.25rem] leading-snug text-plum">“{t.quote}”</blockquote>
                    <p className="mt-4 text-[0.875rem] text-muted">{t.attribution}</p>
                  </li>
                ))}
              </ul>
            )}
            {examples.length > 0 && (
              <ul className="mb-10 space-y-3">
                {examples.map((e) => (
                  <li key={e.title} className="flex gap-3 text-muted">
                    <Diamond className="mt-[0.6rem] shrink-0" />
                    <span>
                      <span className="text-plum">{e.title}.</span> {e.summary}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <FaqList items={service.faqs} />
          </div>
        </div>
      </section>

      {/* 7 · Final CTA */}
      <FinalCta
        service={service}
        headline="Begin with a conversation."
        description={`Message Pranav on WhatsApp about ${service.title.toLowerCase()}. He will explain the process and starting price.`}
        buttonLabel={copy.ctaLabel}
        placement="landing_final"
        landingPageId={tracking.landingPageId}
        landingVariant={tracking.landingVariant}
      />

      <StickyWhatsAppBar
        href={whatsapp.href}
        external={whatsapp.external}
        label="Enquire"
        context={service.shortTitle}
        eventProps={{ service_id: service.id, landing_page_id: page.id, landing_variant: tracking.landingVariant }}
      />
      <TrackOnView
        event="landing_page_view"
        props={{ service_id: service.id, landing_page_id: page.id, landing_variant: tracking.landingVariant }}
      />
    </>
  );
}
