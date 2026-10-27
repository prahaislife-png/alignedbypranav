import type { Service } from "@/types/content";
import type { CtaPlacement } from "@/lib/analytics/track";
import { home } from "@/data/home";
import { pranav } from "@/data/pranav";
import { ConcentricRings, Flourish } from "@/components/ui/ornaments";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";

/** Closing midnight-plum call to action, reused across the site. */
export function FinalCta({
  headline = home.finalCta.headline,
  description = home.finalCta.description,
  buttonLabel = home.finalCta.button,
  service,
  placement = "final_cta",
  landingPageId,
  landingVariant,
}: {
  headline?: string;
  description?: string;
  buttonLabel?: string;
  service?: Service;
  placement?: CtaPlacement;
  landingPageId?: string;
  landingVariant?: string;
}) {
  return (
    <section data-hide-sticky aria-labelledby="final-cta-title" className="on-dark relative overflow-hidden bg-plum text-ivory">
      <ConcentricRings tone="light" rings={6} className="absolute top-1/2 left-1/2 w-[58rem] max-w-none -translate-1/2 opacity-40" />
      <div className="container-page relative py-24 text-center md:py-32">
        <p className="eyebrow !text-gold-light">{pranav.name} · {pranav.title}</p>
        <h2 id="final-cta-title" className="display-xl mx-auto mt-6 max-w-[14ch] !text-ivory">
          {headline}
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-[1.125rem] leading-relaxed text-ivory/75">{description}</p>
        <div className="mt-10 flex justify-center">
          <WhatsAppCta
            service={service}
            label={buttonLabel}
            placement={placement}
            landingPageId={landingPageId}
            landingVariant={landingVariant}
            variant="light"
            className="min-h-14 px-8"
          />
        </div>
        <Flourish className="mx-auto mt-14 text-gold-light/60" />
      </div>
    </section>
  );
}
