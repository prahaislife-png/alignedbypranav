"use client";

import { useEffect, useState } from "react";
import { useConsent } from "@/lib/analytics/consent-store";
import { hasOptionalTracking } from "@/lib/analytics/config";
import type { AnalyticsEventProps } from "@/lib/analytics/track";
import { TrackedWhatsAppLink } from "./tracked-whatsapp-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { cn } from "@/lib/cn";

/**
 * Mobile-only bottom WhatsApp bar for service and landing pages.
 *
 * - Appears once the hero CTA (`[data-hero-cta]`) has scrolled out of view,
 *   so the two never compete.
 * - Hides whenever a closing CTA or the footer (`[data-hide-sticky]`) is visible.
 * - Hides while the cookie banner or preferences are open, so it never covers them.
 * - Respects the device safe area.
 */
export function StickyWhatsAppBar({
  href,
  external,
  label,
  context,
  eventProps,
}: {
  href: string;
  external: boolean;
  label: string;
  context: string;
  eventProps: AnalyticsEventProps;
}) {
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const { choice, preferencesOpen } = useConsent();
  const bannerVisible = preferencesOpen || (hasOptionalTracking && choice === null);

  useEffect(() => {
    const hero = document.querySelector("[data-hero-cta]");
    const enders = Array.from(document.querySelectorAll("[data-hide-sticky]"));
    const visibleEnders = new Set<Element>();

    // Without a hero CTA on the page, the bar may show straight away.
    const heroObserver = new IntersectionObserver(([entry]) => {
      setPastHero(hero ? !entry.isIntersecting && entry.boundingClientRect.top < 0 : true);
    });
    const endObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => (entry.isIntersecting ? visibleEnders.add(entry.target) : visibleEnders.delete(entry.target)));
      setNearEnd(visibleEnders.size > 0);
    });

    heroObserver.observe(hero ?? document.body);
    enders.forEach((el) => endObserver.observe(el));
    return () => {
      heroObserver.disconnect();
      endObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !nearEnd && !bannerVisible;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pt-3 pb-safe md:hidden",
        "transition-[transform,opacity] duration-500 ease-[var(--ease-out)]",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
      inert={!visible}
    >
      <div className="flex items-center gap-3 border border-ink bg-paper py-1.5 pr-1.5 pl-4 shadow-[4px_4px_0_0_var(--color-ink)]">
        <p className="min-w-0 flex-1 truncate text-[0.8125rem] leading-tight text-muted">
          <span className="block truncate font-display text-[1.0625rem] text-ink">{context}</span>
          with Pranav Vibhute
        </p>
        <TrackedWhatsAppLink
          href={href}
          external={external}
          eventProps={{ ...eventProps, cta_placement: "sticky_mobile" }}
          className="btn shrink-0 min-h-11 bg-ink px-4 text-[0.875rem] text-paper"
        >
          <WhatsAppIcon className="size-4" />
          <span>{label}</span>
          {external && <span className="sr-only"> (opens WhatsApp)</span>}
        </TrackedWhatsAppLink>
      </div>
    </div>
  );
}
