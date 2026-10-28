import type { LandingPage, Service } from "@/types/content";
import { pranav } from "@/data/pranav";
import { publishableExamples, publishableTestimonials } from "@/data/testimonials";
import { resolveLandingCopy } from "@/data/landing-pages";
import { Specimen } from "@/components/ui/specimen";
import { FaqList } from "@/components/ui/faq-list";
import { ArrowLink } from "@/components/ui/link-button";
import { ListMark } from "@/components/ui/ornaments";
import { Portrait } from "@/components/ui/portrait";
import { TrackOnView } from "@/components/analytics/trackers";
import { PricingPanel } from "@/components/services/pricing-panel";
import { FinalCta } from "@/components/home/final-cta";
import { StickyWhatsAppBar } from "@/components/whatsapp/sticky-whatsapp-bar";
import { WhatsAppCta, resolveWhatsApp } from "@/components/whatsapp/whatsapp-cta";
import { WatchCheckTeaser } from "@/components/tools/watch-check/watch-check-teaser";
import { watchCheck } from "@/data/watch-check";

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
      <section aria-labelledby="lp-title" className="relative overflow-hidden border-b border-line">
        <div className="container-page grid items-center gap-12 pt-6 pb-14 sm:pt-10 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-4">
              <Specimen visual={copy.heroVisual} compact ink="load" sizes="5rem" priority className="aspect-[4/5] w-[4.25rem] shrink-0 rotate-[2deg] lg:hidden" />
              <p className="eyebrow">
                <span aria-hidden="true">§ </span>consultation with
                <span className="mt-1 block font-display text-[1.25rem] text-ink normal-case">{pranav.name}</span>
              </p>
            </div>
            <h1 id="lp-title" className="display-lg mt-6 max-w-[17ch] lg:mt-8">
              {copy.headline}
            </h1>
            <p className="lead mt-5 max-w-xl !text-ink">
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
              <p className="mt-4 font-mono text-[0.75rem] text-muted lowercase">
                Ask about the process and starting price. No commitment.
              </p>
            </div>
          </div>
          <div className="hidden lg:col-span-5 lg:block">
            <Specimen visual={copy.heroVisual} fig={service.number} caption={service.shortTitle} ink="load" priority className="aspect-[4/5] rotate-[1.5deg]" />
          </div>
        </div>
      </section>

      {/* 2 · What the consultation explores */}
      <section aria-labelledby="lp-explores" className="border-b border-line bg-paper-2 py-16 lg:py-24">
        <div className="container-page">
          <p className="eyebrow"><span aria-hidden="true">§ </span>{service.title}</p>
          <h2 id="lp-explores" className="display-md mt-4">
            What the consultation explores
          </h2>
          <ul className="mt-10 grid border-t border-ink sm:grid-cols-2 lg:grid-cols-4">
            {page.explorePoints.map((point, i) => (
              <li key={point} className="flex gap-4 border-b border-line py-5 sm:flex-col sm:gap-4 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
                <span className="pt-1 font-mono text-[0.75rem] text-madder">0{i + 1}</span>
                <span className="font-display text-[1.375rem] leading-snug">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Free tool, for the wristwatch campaign only */}
      {service.id === watchCheck.serviceId && <WatchCheckTeaser />}

      {/* 3 · Meet your consultant */}
      <section aria-labelledby="lp-consultant" className="border-b border-line py-16 lg:py-24">
        {/* Phones: photo beside the name, bio below. Wider: photo beside both. */}
        <div className="container-page grid grid-cols-[6.5rem_1fr] items-center gap-x-5 gap-y-6 sm:grid-cols-[10rem_1fr] sm:gap-x-10 sm:gap-y-5 lg:grid-cols-[14rem_1fr] lg:gap-x-16">
          <Portrait compact sizes="(min-width: 1024px) 14rem, (min-width: 640px) 10rem, 6.5rem" className="sm:row-span-2" />
          <div className="sm:self-end">
            <p className="eyebrow"><span aria-hidden="true">§ </span>meet your consultant</p>
            <h2 id="lp-consultant" className="display-md mt-3">
              {pranav.name}
            </h2>
            <p className="mt-2 font-mono text-[0.8125rem] text-madder lowercase">{pranav.title}</p>
          </div>
          <div className="col-span-2 sm:col-span-1 sm:col-start-2 sm:self-start">
            <p className="max-w-2xl text-muted">{pranav.shortBio}</p>
            <ArrowLink href="/about" className="mt-6">
              About Pranav
            </ArrowLink>
          </div>
        </div>
      </section>

      {/* 4 · How it works */}
      <section aria-labelledby="lp-process" className="border-b border-line py-16 lg:py-24">
        <div className="container-page">
          <h2 id="lp-process" className="display-md">
            How it works
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {service.process.map((step, i) => (
              <li key={step.title} className="border-t border-ink pt-6">
                <p className="font-mono text-[0.75rem] text-madder">step {i + 1}</p>
                <h3 className="mt-2 font-display text-[1.5rem] leading-tight">{step.title}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 5 · Consultation details */}
      <section aria-label="Consultation details" className="border-b border-line bg-paper-2 py-16 lg:py-24">
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
              <p className="mt-6 border-l-2 border-madder bg-paper-2 p-5 text-[0.9375rem] leading-relaxed text-ink">
                {service.careNote}
              </p>
            )}
          </div>
          <div className="lg:col-span-8">
            {testimonials.length > 0 && (
              <ul className="mb-10 grid gap-5 md:grid-cols-2">
                {testimonials.map((t) => (
                  <li key={t.quote} className="bg-paper-2 p-6">
                    <blockquote className="font-display text-[1.25rem] leading-snug text-ink">“{t.quote}”</blockquote>
                    <p className="mt-4 text-[0.875rem] text-muted">{t.attribution}</p>
                  </li>
                ))}
              </ul>
            )}
            {examples.length > 0 && (
              <ul className="mb-10 space-y-3">
                {examples.map((e) => (
                  <li key={e.title} className="flex gap-3 text-muted">
                    <ListMark className="mt-[0.6rem] shrink-0" />
                    <span>
                      <span className="text-ink">{e.title}.</span> {e.summary}
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
