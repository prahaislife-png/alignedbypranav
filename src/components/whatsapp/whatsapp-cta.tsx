import type { CtaPlacement } from "@/lib/analytics/track";
import type { Service } from "@/types/content";
import {
  WHATSAPP_FALLBACK_HREF,
  generalEnquiryMessage,
  serviceEnquiryMessage,
  whatsappHref,
} from "@/lib/whatsapp";
import { buttonClasses, type ButtonVariant } from "@/components/ui/link-button";
import { cn } from "@/lib/cn";
import { TrackedWhatsAppLink } from "./tracked-whatsapp-link";
import { WhatsAppIcon } from "./whatsapp-icon";

export interface WhatsAppTarget {
  href: string;
  external: boolean;
}

/** Resolves the WhatsApp destination for a service (or a general enquiry). */
export function resolveWhatsApp(service?: Pick<Service, "title"> | null): WhatsAppTarget {
  const href = whatsappHref(service ? serviceEnquiryMessage(service.title) : generalEnquiryMessage());
  return href ? { href, external: true } : { href: WHATSAPP_FALLBACK_HREF, external: false };
}

/**
 * WhatsApp call-to-action button. Use `service` for a service-specific
 * prefilled message; omit it for a general enquiry.
 */
export function WhatsAppCta({
  label = "Enquire on WhatsApp",
  service,
  placement,
  landingPageId,
  landingVariant,
  variant = "primary",
  className,
  icon = true,
  srContext,
}: {
  label?: string;
  service?: Service | null;
  placement: CtaPlacement;
  landingPageId?: string;
  landingVariant?: string;
  variant?: ButtonVariant | "text";
  className?: string;
  icon?: boolean;
  /** Extra words for screen readers when several buttons share one label. */
  srContext?: string;
}) {
  const target = resolveWhatsApp(service);
  return (
    <TrackedWhatsAppLink
      href={target.href}
      external={target.external}
      className={cn(variant === "text" ? "group inline-flex items-center gap-2 font-medium text-ink" : buttonClasses[variant], className)}
      eventProps={{
        cta_placement: placement,
        service_id: service?.id,
        landing_page_id: landingPageId,
        landing_variant: landingVariant,
      }}
    >
      {icon && <WhatsAppIcon className="size-[1.15em] shrink-0" />}
      <span className={variant === "text" ? "link-line" : undefined}>
        {label}
        {srContext && <span className="sr-only"> {srContext}</span>}
      </span>
      {target.external && <span className="sr-only"> (opens WhatsApp)</span>}
    </TrackedWhatsAppLink>
  );
}
