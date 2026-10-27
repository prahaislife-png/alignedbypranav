"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { analyticsConfig } from "@/lib/analytics/config";
import { useConsent } from "@/lib/analytics/consent-store";
import { revokeGa4, revokeMetaPixel } from "@/lib/analytics/loaders";
import { captureAttribution, ensureIntegrations, persistAttributionIfConsented, trackPageView } from "@/lib/analytics/track";

/**
 * Loads optional analytics only after consent, sends page views on route
 * changes, and switches integrations off again if consent is withdrawn.
 */
export function AnalyticsManager() {
  const { choice } = useConsent();
  const pathname = usePathname();
  const previous = useRef<typeof choice>(undefined);

  useEffect(() => {
    captureAttribution();
  }, []);

  // React to consent being given or withdrawn.
  useEffect(() => {
    if (choice === undefined) return;
    const before = previous.current;
    previous.current = choice;
    ensureIntegrations(choice);
    persistAttributionIfConsented();
    if (before) {
      if (before.analytics && !choice?.analytics && analyticsConfig.ga4Id) revokeGa4(analyticsConfig.ga4Id);
      if (before.marketing && !choice?.marketing) revokeMetaPixel();
    }
    // Count the current page once for each integration that has just been allowed
    // (stored consent found on load, or consent given or extended during the visit).
    const newlyGranted = {
      analytics: Boolean(choice?.analytics && !before?.analytics),
      marketing: Boolean(choice?.marketing && !before?.marketing),
    };
    if (newlyGranted.analytics || newlyGranted.marketing) trackPageView(newlyGranted);
  }, [choice]);

  // Page views on every client-side navigation.
  useEffect(() => {
    if (choice) trackPageView();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on path changes
  }, [pathname]);

  return analyticsConfig.vercelAnalytics && choice?.analytics ? <Analytics /> : null;
}
