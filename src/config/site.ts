import { env } from "./env";

/** Accepts only well-formed https:// URLs so a typo can never inject a bad link. */
function safeHttpsUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function safeEmail(value: string | null): string | null {
  if (!value) return null;
  return /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(value) ? value : null;
}

/**
 * BRAND & CONTACT CONFIGURATION
 * ------------------------------------------------------------------
 * Contact details come from environment variables (see .env.example)
 * so they are never copied from another business's website.
 */
/**
 * Pranav's WhatsApp Business number, used by every "Enquire" button.
 * NEXT_PUBLIC_WHATSAPP_NUMBER (e.g. in Vercel) overrides it without a code change.
 */
const WHATSAPP_NUMBER = "+49 1512 5937315";

export const site = {
  name: "Aligned by Pranav",
  tagline: "Clarity. Intention. Alignment.",
  description:
    "Personalised, expert-led consultations with Pranav Vibhute across signatures, handwriting, logos, watches and clocks, phone numbers, drawings and vision boards. Enquire on WhatsApp.",
  locale: "en",
  /** Regions served. Used in copy and structured data only – no office addresses are implied. */
  areaServed: ["India", "Europe"],

  contact: {
    /** International format, digits only once validated. See src/lib/whatsapp.ts. */
    whatsappNumber: env.whatsappNumber ?? WHATSAPP_NUMBER,
    email: safeEmail(env.contactEmail),
  },

  social: {
    instagram: safeHttpsUrl(env.instagramUrl),
    facebook: safeHttpsUrl(env.facebookUrl),
  },

  /**
   * LEGAL DETAILS – required before launch for the Privacy Policy and Terms.
   * `null` values are shown on the legal pages as clearly marked placeholders.
   */
  legal: {
    /** Registered business / partnership / individual name responsible for the site. */
    entityName: null as string | null,
    /** Postal address for legal notices (not shown elsewhere on the site). */
    postalAddress: null as string | null,
    /** Governing law and courts, e.g. "the laws of India; courts of Pune". */
    governingLaw: null as string | null,
    /** Email for privacy requests (India DPDP Act / EU GDPR). Falls back to the contact email. */
    privacyEmail: null as string | null,
    /** Date the legal drafts were last reviewed, e.g. "1 December 2026". */
    lastUpdated: null as string | null,
  },
} as const;

export const mainNavigation = [
  { label: "Services", href: "/services" },
  { label: "About Pranav", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Free watch check", href: "/tools/watch-check" },
] as const;

export const legalNavigation = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Consultation Disclaimer", href: "/disclaimer" },
] as const;
