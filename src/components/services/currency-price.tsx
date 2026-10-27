"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/cn";
import type { Currency } from "@/lib/pricing";

/**
 * Shows a confirmed starting price with an INR / EUR selector. Prices are
 * entered separately for each currency – nothing is ever converted.
 */
export function CurrencyPrice({ prices }: { prices: Partial<Record<Currency, string>> }) {
  const currencies = (Object.keys(prices) as Currency[]).filter((c) => prices[c]);
  const [currency, setCurrency] = useState<Currency>(currencies[0]);
  const labelId = useId();

  return (
    <div>
      {currencies.length > 1 && (
        <div role="radiogroup" aria-labelledby={labelId} className="inline-flex rounded-full border border-line bg-ivory p-1">
          <span id={labelId} className="sr-only">
            Currency
          </span>
          {currencies.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={currency === c}
              onClick={() => setCurrency(c)}
              className={cn(
                "min-h-9 rounded-full px-4 text-[0.8125rem] font-medium tracking-wide transition-colors",
                currency === c ? "bg-plum text-ivory" : "text-muted hover:text-plum",
              )}
            >
              {c === "INR" ? "₹ INR" : "€ EUR"}
            </button>
          ))}
        </div>
      )}
      <p className="mt-5 text-[0.8125rem] tracking-wide text-muted uppercase">Starting from</p>
      <p className="font-display text-[3.25rem] leading-none text-plum" aria-live="polite">
        {prices[currency]}
      </p>
    </div>
  );
}
