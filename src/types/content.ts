/**
 * Shared content types for Aligned by Pranav.
 *
 * Everything the website says about the business lives in typed data files
 * under `src/data` and `src/config`. Components only render what these files
 * contain, so business details are edited in one place.
 */

export type ServiceId =
  | "signature-handwriting-analysis"
  | "business-logo-analysis"
  | "wristwatch-clock-alignment"
  | "business-office-clock-alignment"
  | "phone-number-alignment"
  | "drawing-analysis"
  | "vision-board-alignment";

/** Keys for the original SVG line illustrations in `src/components/illustrations`. */
export type IllustrationKey =
  | "signature"
  | "logo"
  | "wristwatch"
  | "office-clock"
  | "phone-number"
  | "drawing"
  | "vision-board";

/** An approved photograph. Leave `image` as `null` until a licensed/owned photo exists. */
export interface ApprovedImage {
  /** Path inside /public, e.g. "/images/services/signature.jpg" */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  /**
   * `true` once Pranav has reviewed the wording. Unreviewed answers are written
   * conservatively from confirmed facts only, and are listed in the prelaunch
   * checklist. They are still displayed.
   */
  reviewedByPranav: boolean;
}

export interface ServicePricing {
  /** Confirmed starting price in Indian Rupees. `null` = not yet confirmed. */
  startingPriceINR: number | null;
  /** Confirmed starting price in Euro. `null` = not yet confirmed. Never auto-converted. */
  startingPriceEUR: number | null;
  /** e.g. "Online video consultation" – `null` until confirmed. */
  format: string | null;
  /** e.g. "Approximately 45 minutes" – `null` until confirmed. */
  duration: string | null;
  /** e.g. ["Written summary"] – `null` until confirmed. */
  deliverables: string[] | null;
  /** Any confirmed note shown under the price. */
  notes: string | null;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ExploreArea {
  title: string;
  description: string;
}

export interface Service {
  id: ServiceId;
  /** URL segment used for /services/<slug> and /lp/<slug> */
  slug: ServiceId;
  number: string;
  title: string;
  /** Short label for compact UI such as the mobile sticky bar. */
  shortTitle: string;
  /** One line used on cards. */
  oneLiner: string;
  /** Opening paragraph for the service page. */
  intro: string;
  /** A short editorial pull-statement on the service page. */
  pullQuote: string;
  whyChoose: string[];
  explores: ExploreArea[];
  relevantFor: string[];
  process: ProcessStep[];
  /** Confirmed preparation guidance. `null` hides the section. */
  preparation: string[] | null;
  pricing: ServicePricing;
  faqs: FaqItem[];
  related: ServiceId[];
  illustration: IllustrationKey;
  /** Optional approved photograph. Falls back to the illustration. */
  image: ApprovedImage | null;
  /** Optional page-specific note shown with care (e.g. drawing analysis safeguards). */
  careNote: string | null;
  seo: {
    title: string;
    description: string;
  };
}

/** Copy for one version of an advertising landing page. */
export interface LandingVariantCopy {
  headline: string;
  description: string;
  ctaLabel: string;
  /** Hero visual – an illustration key, or an approved photograph. */
  heroVisual: IllustrationKey | ApprovedImage;
}

export interface LandingPage {
  /** Stable id sent with analytics events as `landing_page_id`. */
  id: string;
  serviceId: ServiceId;
  /** The default copy served at /lp/<slug>. */
  copy: LandingVariantCopy;
  /** 3–5 short points: what the consultation explores. */
  explorePoints: string[];
  /**
   * Optional alternative versions for ad tests, served at /lp/<slug>/<variantKey>.
   * Only the fields you set are overridden.
   */
  variants: Record<string, Partial<LandingVariantCopy>>;
}

export interface Testimonial {
  quote: string;
  /** Display name exactly as the client consented to (e.g. "R. Mehta, Pune"). */
  attribution: string;
  serviceId: ServiceId | null;
  /** Must be true. Testimonials without recorded consent are never rendered. */
  consentRecorded: boolean;
  /** Where the consent record is kept (email, signed form…). Not displayed. */
  consentReference: string;
}

export interface CaseExample {
  title: string;
  summary: string;
  serviceId: ServiceId;
  image: ApprovedImage;
  /** Must be true – client agreed to anonymised publication. */
  consentRecorded: boolean;
}
