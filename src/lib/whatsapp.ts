import { site } from "@/config/site";

/**
 * WhatsApp click-to-chat links: https://wa.me/<NUMBER>?text=<ENCODED_MESSAGE>
 *
 * The number comes from NEXT_PUBLIC_WHATSAPP_NUMBER (international format,
 * country code first, e.g. +91 98xxx xxxxx). When it is missing or invalid,
 * every helper returns `null` and buttons fall back to the contact page, so
 * a broken wa.me link is never published.
 */

/** Strips spaces, dashes, dots, brackets and a leading + or 00. */
export function normalizeWhatsAppNumber(raw: string | null | undefined): string | null {
  if (!raw) return null;
  let digits = raw.trim().replace(/[\s\-().]/g, "");
  if (digits.startsWith("+")) digits = digits.slice(1);
  else if (digits.startsWith("00")) digits = digits.slice(2);
  // E.164: country code (never starting with 0) + subscriber number, 8–15 digits total.
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
}

export function buildWhatsAppUrl(number: string | null | undefined, message?: string): string | null {
  const normalized = normalizeWhatsAppNumber(number);
  if (!normalized) return null;
  const base = `https://wa.me/${normalized}`;
  const text = message?.trim();
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

const GREETING = "Hello Pranav, I visited Aligned by Pranav";

/** The prefilled enquiry message for a specific service. */
export function serviceEnquiryMessage(serviceTitle: string): string {
  return `${GREETING} and would like to enquire about ${serviceTitle}. Could you please share the consultation process and starting price?`;
}

/** The prefilled message for general enquiries. */
export function generalEnquiryMessage(): string {
  return `${GREETING} and would like to know more about your consultations. Could you please help me choose the right service and share the starting price?`;
}

/** Configured WhatsApp link for a message, or `null` if no valid number is configured. */
export function whatsappHref(message: string): string | null {
  return buildWhatsAppUrl(site.contact.whatsappNumber, message);
}

export const isWhatsAppConfigured = (): boolean => normalizeWhatsAppNumber(site.contact.whatsappNumber) !== null;

/** Where a WhatsApp button points when no valid number is configured. */
export const WHATSAPP_FALLBACK_HREF = "/contact";
