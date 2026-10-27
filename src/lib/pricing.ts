import type { ServicePricing } from "@/types/content";

export type Currency = "INR" | "EUR";

export const PRICE_ON_ENQUIRY = "Starting price available on enquiry";

const formatters: Record<Currency, Intl.NumberFormat> = {
  INR: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
  EUR: new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }),
};

/** A confirmed starting price in the requested currency. Never converts between currencies. */
export function startingPrice(pricing: ServicePricing, currency: Currency): number | null {
  const value = currency === "INR" ? pricing.startingPriceINR : pricing.startingPriceEUR;
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}

export function formatStartingPrice(pricing: ServicePricing, currency: Currency): string | null {
  const value = startingPrice(pricing, currency);
  return value === null ? null : formatters[currency].format(value);
}

/** Currencies that have a confirmed price, in display order. */
export function availableCurrencies(pricing: ServicePricing): Currency[] {
  return (["INR", "EUR"] as const).filter((c) => startingPrice(pricing, c) !== null);
}

export function hasConfirmedDetails(pricing: ServicePricing): boolean {
  return Boolean(pricing.format || pricing.duration || pricing.deliverables?.length || pricing.notes);
}
