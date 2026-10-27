import { describe, expect, it } from "vitest";
import type { ServicePricing } from "@/types/content";
import { availableCurrencies, formatStartingPrice, hasConfirmedDetails, startingPrice } from "../pricing";

const base: ServicePricing = {
  startingPriceINR: null,
  startingPriceEUR: null,
  format: null,
  duration: null,
  deliverables: null,
  notes: null,
};

describe("pricing", () => {
  it("shows no price when nothing is confirmed", () => {
    expect(availableCurrencies(base)).toEqual([]);
    expect(formatStartingPrice(base, "INR")).toBeNull();
    expect(hasConfirmedDetails(base)).toBe(false);
  });

  it("never converts between currencies", () => {
    const inrOnly = { ...base, startingPriceINR: 2500 };
    expect(availableCurrencies(inrOnly)).toEqual(["INR"]);
    expect(formatStartingPrice(inrOnly, "EUR")).toBeNull();
  });

  it("formats confirmed prices in each currency", () => {
    const both = { ...base, startingPriceINR: 2500, startingPriceEUR: 60 };
    expect(availableCurrencies(both)).toEqual(["INR", "EUR"]);
    expect(formatStartingPrice(both, "INR")).toBe("₹2,500");
    expect(formatStartingPrice(both, "EUR")).toBe("€60");
  });

  it("ignores zero, negative and non-finite values", () => {
    expect(startingPrice({ ...base, startingPriceINR: 0 }, "INR")).toBeNull();
    expect(startingPrice({ ...base, startingPriceINR: -5 }, "INR")).toBeNull();
    expect(startingPrice({ ...base, startingPriceEUR: Number.NaN }, "EUR")).toBeNull();
  });

  it("detects confirmed consultation details", () => {
    expect(hasConfirmedDetails({ ...base, duration: "45 minutes" })).toBe(true);
  });
});
