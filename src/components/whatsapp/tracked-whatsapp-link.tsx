"use client";

import { track, type AnalyticsEventProps } from "@/lib/analytics/track";

/**
 * The <a> behind every WhatsApp button. Records a `whatsapp_click` event
 * (consent permitting) and opens WhatsApp. When no valid number is
 * configured, `external` is false and the link points to the contact page.
 */
export function TrackedWhatsAppLink({
  href,
  external,
  eventProps,
  className,
  children,
  ariaLabel,
}: {
  href: string;
  external: boolean;
  eventProps: AnalyticsEventProps;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      data-whatsapp-cta={eventProps.cta_placement}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onClick={() => {
        if (external) track("whatsapp_click", eventProps);
      }}
    >
      {children}
    </a>
  );
}
