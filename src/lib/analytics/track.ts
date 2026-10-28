"use client";

import { analyticsConfig } from "./config";
import { getConsent, type ConsentChoice } from "./consent-store";
import { loadGa4, loadMetaPixel } from "./loaders";

/**
 * EVENT TRACKING
 * ------------------------------------------------------------------
 * `track()` is the single entry point for analytics events. It sends an
 * event only to integrations that are configured, loaded and consented to.
 * Without consent nothing leaves the browser.
 *
 * Never pass names, phone numbers, message text, signatures, drawings or
 * any other personal or consultation content as event properties.
 *
 * Note: `whatsapp_click` means a visitor tapped a WhatsApp button. It does
 * NOT mean a message was sent, a conversation happened, or a lead or sale
 * occurred. See docs/CONVERSION_MEASUREMENT.md.
 */

export type AnalyticsEventName =
  | "service_view"
  | "landing_page_view"
  | "whatsapp_click"
  | "pricing_view"
  // Free tools: steps only. Never the photo, colours or answers.
  | "tool_start"
  | "tool_complete"
  | "tool_save";

export type CtaPlacement =
  | "header"
  | "mobile_menu"
  | "hero"
  | "services_unsure"
  | "featured"
  | "service_hero"
  | "pricing"
  | "final_cta"
  | "sticky_mobile"
  | "footer"
  | "contact_page"
  | "landing_hero"
  | "landing_details"
  | "landing_final"
  | "about"
  | "watch_check_first_look"
  | "watch_check_report"
  | "signature_check_first_look"
  | "signature_check_report";

export interface AnalyticsEventProps {
  service_id?: string;
  landing_page_id?: string;
  landing_variant?: string;
  cta_placement?: CtaPlacement;
  price_available?: boolean;
  tool?: "watch_check" | "signature_check";
  /** How a tool result was kept: the share sheet, a file download or printing. */
  save_method?: "share" | "download" | "print";
  /** Which file was kept, for tools that make more than one. */
  sheet?: "specimen" | "share_safe" | "practice";
  /** How the visitor gave their signature. */
  input_method?: "draw" | "photo";
}

type Gtag = (...args: unknown[]) => void;
type Fbq = ((...args: unknown[]) => void) & { queue?: unknown[] };

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>>;
const ATTRIBUTION_KEY = "abp-attribution";

let memoryAttribution: Attribution | null = null;

function readUtm(search: string): Attribution | null {
  const params = new URLSearchParams(search);
  const found: Attribution = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    // Keep campaign labels short and plain; ignore anything that looks like personal data.
    if (value && value.length <= 100 && !/@|\d{7,}/.test(value)) found[key] = value;
  }
  return Object.keys(found).length ? found : null;
}

/**
 * Campaign attribution (UTM parameters) for the current visit. Remembered in
 * sessionStorage only after the visitor has consented to optional tracking.
 */
export function captureAttribution() {
  const fromUrl = readUtm(window.location.search);
  if (fromUrl) memoryAttribution = fromUrl;
  persistAttributionIfConsented();
}

export function persistAttributionIfConsented() {
  const consent = getConsent();
  if (!memoryAttribution || !(consent?.analytics || consent?.marketing)) return;
  try {
    window.sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(memoryAttribution));
  } catch {
    /* storage unavailable */
  }
}

function currentAttribution(): Attribution {
  if (memoryAttribution) return memoryAttribution;
  try {
    const stored = window.sessionStorage.getItem(ATTRIBUTION_KEY);
    if (stored) return JSON.parse(stored) as Attribution;
  } catch {
    /* storage unavailable */
  }
  return {};
}

/** Loads consented integrations on demand, so no event is lost to load order. */
export function ensureIntegrations(consent: ConsentChoice | null) {
  if (consent?.analytics && analyticsConfig.ga4Id) loadGa4(analyticsConfig.ga4Id);
  if (consent?.marketing && analyticsConfig.metaPixelId) loadMetaPixel(analyticsConfig.metaPixelId);
}

/** Sends an event to consented integrations. Returns true if anything was sent. */
export function track(name: AnalyticsEventName, props: AnalyticsEventProps = {}): boolean {
  if (typeof window === "undefined") return false;
  const consent = getConsent();
  ensureIntegrations(consent);
  const allowAnalytics = Boolean(consent?.analytics && analyticsConfig.ga4Id && window.gtag);
  const allowMarketing = Boolean(consent?.marketing && analyticsConfig.metaPixelId && window.fbq);

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", name, props, { sentToGA4: allowAnalytics, sentToMeta: allowMarketing });
  }
  // Local-only signal for QA and automated tests. Not transmitted anywhere.
  window.dispatchEvent(
    new CustomEvent("abp:analytics", { detail: { name, props, sentToGA4: allowAnalytics, sentToMeta: allowMarketing } }),
  );

  if (!allowAnalytics && !allowMarketing) return false;
  const payload = { ...props, ...currentAttribution() };

  if (allowAnalytics) window.gtag!("event", name, payload);

  if (allowMarketing) {
    if (name === "whatsapp_click") {
      // Standard "Contact" event lets Meta optimise ads for WhatsApp taps.
      window.fbq!("track", "Contact", { content_category: props.service_id ?? "general" });
    }
    window.fbq!("trackCustom", name, payload);
  }
  return true;
}

/** Sends a page view. `only` limits it to newly granted integrations, avoiding duplicates. */
export function trackPageView(only: { analytics: boolean; marketing: boolean } = { analytics: true, marketing: true }) {
  const consent = getConsent();
  ensureIntegrations(consent);
  if (only.analytics && consent?.analytics && analyticsConfig.ga4Id && window.gtag) {
    window.gtag("event", "page_view", {
      page_location: window.location.origin + window.location.pathname + window.location.search,
      page_path: window.location.pathname,
      page_title: document.title,
    });
  }
  if (only.marketing && consent?.marketing && analyticsConfig.metaPixelId && window.fbq) {
    window.fbq("track", "PageView");
  }
}
