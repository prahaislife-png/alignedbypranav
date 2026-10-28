import type { Service } from "@/types/content";
import { PRICE_ON_ENQUIRY, availableCurrencies, formatStartingPrice, hasConfirmedDetails } from "@/lib/pricing";
import type { CtaPlacement } from "@/lib/analytics/track";
import { TrackWhenVisible } from "@/components/analytics/trackers";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { Ruler } from "@/components/ui/ornaments";
import { CurrencyPrice } from "./currency-price";

/**
 * Consultation details and starting price. Only confirmed values from
 * src/data/services.ts are shown; otherwise "Starting price available on enquiry".
 */
export function PricingPanel({
  service,
  placement = "pricing",
  landingPageId,
  landingVariant,
  ctaLabel = "Ask about the starting price",
}: {
  service: Service;
  placement?: CtaPlacement;
  landingPageId?: string;
  landingVariant?: string;
  ctaLabel?: string;
}) {
  const { pricing } = service;
  const currencies = availableCurrencies(pricing);
  const prices = Object.fromEntries(currencies.map((c) => [c, formatStartingPrice(pricing, c)!]));
  const details = [
    { label: "Format", value: pricing.format },
    { label: "Duration", value: pricing.duration },
    { label: "Includes", value: pricing.deliverables?.join(", ") || null },
  ].filter((d): d is { label: string; value: string } => Boolean(d.value));

  return (
    <TrackWhenVisible
      event="pricing_view"
      props={{ service_id: service.id, landing_page_id: landingPageId, price_available: currencies.length > 0 }}
      className="relative border border-ink bg-paper p-7 shadow-[6px_6px_0_0_var(--color-ink)] sm:p-9"
    >
      <div className="relative">
        <p className="eyebrow flex justify-between"><span>§ consultation details</span><span className="text-muted">no. {service.number}</span></p>
        <h3 className="display-sm mt-3">{service.title}</h3>

        <div className="mt-7 border-t border-dashed border-ink pt-7">
          {currencies.length > 0 ? (
            <CurrencyPrice prices={prices} />
          ) : (
            <p className="font-display text-[1.75rem] leading-snug">{PRICE_ON_ENQUIRY}</p>
          )}
          {pricing.notes && <p className="mt-3 text-[0.875rem] text-muted">{pricing.notes}</p>}
        </div>

        {details.length > 0 && (
          <dl className="mt-7 grid gap-4 border-t border-dashed border-ink pt-7 sm:grid-cols-3">
            {details.map((d) => (
              <div key={d.label}>
                <dt className="font-mono text-[0.75rem] text-madder lowercase">{d.label}</dt>
                <dd className="mt-1 text-[0.9375rem] text-ink">{d.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {!hasConfirmedDetails(pricing) && (
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-muted">
            Consultation format and details vary. Pranav will share them, along with the starting price, when you enquire.
          </p>
        )}

        <WhatsAppCta
          service={service}
          placement={placement}
          landingPageId={landingPageId}
          landingVariant={landingVariant}
          label={ctaLabel}
          className="mt-8 w-full sm:w-auto"
        />
        <Ruler className="mt-8" ticks={50} />
      </div>
    </TrackWhenVisible>
  );
}
