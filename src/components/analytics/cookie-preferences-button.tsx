"use client";

import { openConsentPreferences } from "@/lib/analytics/consent-store";

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openConsentPreferences} className={className}>
      Cookie preferences
    </button>
  );
}
