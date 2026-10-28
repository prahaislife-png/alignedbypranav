import type { Service } from "@/types/content";
import type { CtaPlacement } from "@/lib/analytics/track";
import { home } from "@/data/home";
import { pranav } from "@/data/pranav";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";

/** Closing call to action on the night page, written on ruled baselines. */
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
    <section data-hide-sticky aria-labelledby="final-cta-title" className="on-dark relative overflow-hidden bg-plum text-paper">
      <div className="container-page relative py-20 md:py-28">
        <p className="eyebrow !text-gold-light">
          <span aria-hidden="true">§ </span>
          {pranav.name} · {pranav.title}
        </p>
        <h2
          id="final-cta-title"
          className="display-xl baseline-ruled from-baseline mt-8 max-w-[16ch] !text-paper [--rule-color:rgb(209_188_152/0.5)]"
        >
          {headline}
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-[1.125rem] leading-relaxed text-paper/75 md:col-span-7">{description}</p>
          <div className="md:col-span-5 md:justify-self-end">
            <WhatsAppCta
              service={service}
              label={buttonLabel}
              placement={placement}
              landingPageId={landingPageId}
              landingVariant={landingVariant}
              variant="light"
              className="min-h-14 px-7"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
