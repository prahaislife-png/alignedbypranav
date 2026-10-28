"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import { configuredCategories, hasOptionalTracking, type ConsentCategory } from "@/lib/analytics/config";
import { closeConsentPreferences, saveConsent, useConsent } from "@/lib/analytics/consent-store";

const categoryCopy: Record<ConsentCategory, { title: string; text: string }> = {
  analytics: {
    title: "Analytics",
    text: "Helps us understand which pages are useful, using aggregated statistics (Google Analytics and/or Vercel Web Analytics).",
  },
  marketing: {
    title: "Advertising measurement",
    text: "Lets us measure whether our Instagram and Facebook ads lead people to this site (Meta Pixel). Meta may use this data as described in its own policies.",
  },
};

/**
 * Consent banner + preferences dialog.
 *
 * - Shown only when an optional integration is configured.
 * - "Accept" and "Reject" are equally prominent; nothing optional loads
 *   until the visitor accepts.
 * - Can be reopened at any time from "Cookie preferences" in the footer.
 */
export function ConsentBanner() {
  const { choice, preferencesOpen } = useConsent();
  const showBanner = hasOptionalTracking && choice === null && !preferencesOpen;

  return (
    <>
      {showBanner && <Banner />}
      {preferencesOpen && <PreferencesDialog current={choice ?? null} />}
    </>
  );
}

function Banner() {
  const [managing, setManaging] = useState(false);
  if (managing) return <PreferencesDialog current={null} onClose={() => setManaging(false)} />;
  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 border border-ink bg-paper p-5 shadow-[6px_6px_0_0_var(--color-ink)] sm:inset-x-auto sm:left-6 sm:bottom-6 sm:max-w-[26rem] sm:p-6"
    >
      <p className="font-display text-[1.375rem] leading-tight text-ink">Your privacy, your choice</p>
      <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">
        With your permission we would like to use optional analytics
        {configuredCategories.includes("marketing") ? " and advertising measurement" : ""} to understand how visitors
        find and use this site. Nothing optional runs unless you accept.{" "}
        <Link href="/privacy#cookies" className="link-line text-ink">
          Privacy Policy
        </Link>
      </p>
      <div className="mt-5 grid grid-cols-2 gap-2.5">
        <button type="button" className="btn btn-outline min-h-11 px-4 text-[0.875rem]" onClick={() => saveConsent({ analytics: false, marketing: false })}>
          Reject optional
        </button>
        <button type="button" className="btn btn-primary min-h-11 px-4 text-[0.875rem]" onClick={() => saveConsent({ analytics: true, marketing: true })}>
          Accept optional
        </button>
      </div>
      <button
        type="button"
        onClick={() => setManaging(true)}
        className="mt-3 w-full py-1.5 text-center text-[0.8125rem] font-medium text-ink underline decoration-gold underline-offset-4 hover:decoration-plum"
      >
        Manage preferences
      </button>
    </section>
  );
}

function PreferencesDialog({ current, onClose }: { current: { analytics: boolean; marketing: boolean } | null; onClose?: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [values, setValues] = useState({
    analytics: current?.analytics ?? false,
    marketing: current?.marketing ?? false,
  });

  const close = () => {
    ref.current?.close();
    onClose?.();
    closeConsentPreferences();
  };

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const save = (next: { analytics: boolean; marketing: boolean }) => {
    saveConsent(next);
    ref.current?.close();
    onClose?.();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-lg border border-ink bg-paper p-0 text-ink shadow-[6px_6px_0_0_var(--color-ink)] backdrop:bg-night/60"
    >
      <div className="p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="display-sm">
            Cookie preferences
          </h2>
          <button type="button" onClick={close} className="-mt-1 -mr-2 p-2 text-ink hover:text-madder" aria-label="Close preferences">
            <X className="size-5" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-6 divide-y divide-line border-y border-line">
          <li className="py-4">
            <div className="flex items-center justify-between gap-4">
              <p className="font-medium text-ink">Strictly necessary</p>
              <span className="text-[0.8125rem] text-muted">Always on</span>
            </div>
            <p className="mt-1 text-[0.875rem] text-muted">
              Remembers your privacy choice in your browser. No tracking.
            </p>
          </li>
          {configuredCategories.map((category) => (
            <li key={category} className="py-4">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <span className="font-medium text-ink">{categoryCopy[category].title}</span>
                <input
                  type="checkbox"
                  role="switch"
                  checked={values[category]}
                  onChange={(e) => setValues((v) => ({ ...v, [category]: e.target.checked }))}
                  className="peer sr-only"
                />
                <span
                  aria-hidden="true"
                  className="relative h-6 w-11 shrink-0 rounded-full bg-line transition-colors peer-checked:bg-plum peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-madder after:absolute after:top-1 after:left-1 after:size-4 after:rounded-full after:bg-paper after:transition-transform peer-checked:after:translate-x-5"
                />
              </label>
              <p className="mt-1 pr-14 text-[0.875rem] text-muted">{categoryCopy[category].text}</p>
            </li>
          ))}
        </ul>

        {!hasOptionalTracking && (
          <p className="mt-5 rounded-xl bg-paper-2 px-4 py-3 text-[0.875rem] text-muted">
            This site currently uses no optional analytics or advertising cookies.
          </p>
        )}

        <div className="mt-6 flex flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
          {hasOptionalTracking ? (
            <>
              <button type="button" className="btn btn-outline min-h-11 px-5 text-[0.875rem]" onClick={() => save({ analytics: false, marketing: false })}>
                Reject optional
              </button>
              <button type="button" className="btn btn-outline min-h-11 px-5 text-[0.875rem]" onClick={() => save(values)}>
                Save choices
              </button>
              <button type="button" className="btn btn-primary min-h-11 px-5 text-[0.875rem]" onClick={() => save({ analytics: true, marketing: true })}>
                Accept optional
              </button>
            </>
          ) : (
            <button type="button" className="btn btn-primary min-h-11 px-5 text-[0.875rem]" onClick={close}>
              Close
            </button>
          )}
        </div>
        <p className="mt-5 text-[0.8125rem] text-muted">
          Read more in our{" "}
          <Link href="/privacy#cookies" className="link-line text-ink" onClick={close}>
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </dialog>
  );
}
