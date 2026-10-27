import { env } from "@/config/env";

/**
 * Optional tracking integrations. Each one stays completely inactive unless
 * (1) its environment variable is set AND (2) the visitor consents to its
 * category. No optional script is requested before consent.
 */
export const analyticsConfig = {
  /** Google Analytics 4 measurement id, e.g. G-XXXXXXXXXX. Category: analytics. */
  ga4Id: env.ga4Id && /^G-[A-Z0-9]{4,}$/i.test(env.ga4Id) ? env.ga4Id : null,
  /** Meta (Facebook/Instagram) Pixel id, digits only. Category: marketing. */
  metaPixelId: env.metaPixelId && /^\d{6,20}$/.test(env.metaPixelId) ? env.metaPixelId : null,
  /** Vercel Web Analytics. Category: analytics. */
  vercelAnalytics: env.vercelAnalytics,
} as const;

export type ConsentCategory = "analytics" | "marketing";

export const configuredCategories: ConsentCategory[] = [
  ...(analyticsConfig.ga4Id || analyticsConfig.vercelAnalytics ? (["analytics"] as const) : []),
  ...(analyticsConfig.metaPixelId ? (["marketing"] as const) : []),
];

/** True when at least one optional integration is configured, i.e. a consent choice is needed. */
export const hasOptionalTracking = configuredCategories.length > 0;

/**
 * Stored choices are tied to the set of configured integrations. Adding a
 * new integration changes this version, so visitors are asked again.
 */
export const CONSENT_VERSION = `2026-10:${[
  analyticsConfig.ga4Id ? "ga4" : "",
  analyticsConfig.vercelAnalytics ? "vercel" : "",
  analyticsConfig.metaPixelId ? "meta" : "",
]
  .filter(Boolean)
  .join("+")}`;
