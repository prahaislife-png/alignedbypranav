/**
 * Environment configuration.
 *
 * All values are optional so the site always builds. Missing values are
 * handled safely: WhatsApp buttons fall back to the contact page, analytics
 * stays switched off, and non-production deployments are not indexed.
 *
 * NEXT_PUBLIC_* values are inlined at build time. After changing one in
 * Vercel, redeploy for it to take effect.
 */

function clean(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

function withProtocol(host: string | null): string | null {
  if (!host) return null;
  return host.startsWith("http") ? host : `https://${host}`;
}

const vercelEnv = clean(process.env.VERCEL_ENV); // "production" | "preview" | "development" | null

/**
 * Canonical site origin, without a trailing slash.
 * Order: NEXT_PUBLIC_SITE_URL → Vercel production domain → Vercel deployment URL → localhost (dev only).
 */
export const siteUrl: string = (
  clean(process.env.NEXT_PUBLIC_SITE_URL) ??
  withProtocol(clean(process.env.VERCEL_PROJECT_PRODUCTION_URL)) ??
  withProtocol(clean(process.env.VERCEL_URL)) ??
  "http://localhost:3000"
).replace(/\/+$/, "");

/**
 * Search engines may index the site only on the Vercel production deployment.
 * Preview deployments and local builds are always `noindex`.
 */
export const isIndexable: boolean = vercelEnv === "production";

export const env = {
  whatsappNumber: clean(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER),
  contactEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  instagramUrl: clean(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  facebookUrl: clean(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  ga4Id: clean(process.env.NEXT_PUBLIC_GA4_ID),
  metaPixelId: clean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  vercelAnalytics: clean(process.env.NEXT_PUBLIC_VERCEL_ANALYTICS) === "true",
} as const;
