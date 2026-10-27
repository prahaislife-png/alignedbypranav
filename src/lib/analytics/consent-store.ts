"use client";

import { useSyncExternalStore } from "react";
import { CONSENT_VERSION } from "./config";

/**
 * Consent state, stored in localStorage under a single key. Storing the
 * visitor's own choice is strictly necessary and needs no consent itself.
 */
export interface ConsentChoice {
  analytics: boolean;
  marketing: boolean;
  version: string;
  decidedAt: string;
}

interface ConsentSnapshot {
  /** `undefined` before hydration, `null` when the visitor has not decided. */
  choice: ConsentChoice | null | undefined;
  preferencesOpen: boolean;
}

const STORAGE_KEY = "abp-consent";
const listeners = new Set<() => void>();

let snapshot: ConsentSnapshot = { choice: undefined, preferencesOpen: false };
const serverSnapshot: ConsentSnapshot = { choice: undefined, preferencesOpen: false };

function readStored(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      analytics: parsed.analytics === true,
      marketing: parsed.marketing === true,
      version: CONSENT_VERSION,
      decidedAt: String(parsed.decidedAt ?? ""),
    };
  } catch {
    return null;
  }
}

function emit(next: Partial<ConsentSnapshot>) {
  snapshot = { ...snapshot, ...next };
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  if (snapshot.choice === undefined && typeof window !== "undefined") {
    snapshot = { ...snapshot, choice: readStored() };
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  if (snapshot.choice === undefined) snapshot = { ...snapshot, choice: readStored() };
  return snapshot.choice ?? null;
}

export function saveConsent(choice: { analytics: boolean; marketing: boolean }) {
  const value: ConsentChoice = { ...choice, version: CONSENT_VERSION, decidedAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode): the choice still applies for this visit.
  }
  emit({ choice: value, preferencesOpen: false });
}

export function openConsentPreferences() {
  emit({ preferencesOpen: true });
}

export function closeConsentPreferences() {
  emit({ preferencesOpen: false });
}

export function useConsent(): ConsentSnapshot {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => serverSnapshot,
  );
}
