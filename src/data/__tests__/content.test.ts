import { describe, expect, it } from "vitest";
import { services } from "../services";
import { landingPages, landingVariantParams, resolveLandingCopy } from "../landing-pages";
import { caseExamples, testimonials } from "../testimonials";
import { generalFaqs } from "../faqs";
import { home } from "../home";
import { pranav } from "../pranav";
import sitemap from "@/app/sitemap";
import { watchCheck } from "../watch-check";

const REQUIRED_SLUGS = [
  "signature-handwriting-analysis",
  "business-logo-analysis",
  "wristwatch-clock-alignment",
  "business-office-clock-alignment",
  "phone-number-alignment",
  "drawing-analysis",
  "vision-board-alignment",
];

describe("services", () => {
  it("contains exactly the seven permitted services", () => {
    expect(services.map((s) => s.slug)).toEqual(REQUIRED_SLUGS);
  });

  it("has unique numbers and valid related services", () => {
    expect(new Set(services.map((s) => s.number)).size).toBe(7);
    for (const s of services) {
      expect(s.related.length).toBeGreaterThan(0);
      for (const id of s.related) {
        expect(id).not.toBe(s.id);
        expect(REQUIRED_SLUGS).toContain(id);
      }
    }
  });

  it("only uses positive numbers (or null) for prices", () => {
    for (const s of services) {
      for (const price of [s.pricing.startingPriceINR, s.pricing.startingPriceEUR]) {
        expect(price === null || (typeof price === "number" && price > 0)).toBe(true);
      }
    }
  });

  it("keeps SEO titles and descriptions within sensible lengths", () => {
    for (const s of services) {
      expect(s.seo.title.length).toBeLessThanOrEqual(65);
      expect(s.seo.description.length).toBeLessThanOrEqual(175);
    }
  });
});

describe("landing pages", () => {
  it("exists for every service with 3–5 explore points", () => {
    expect(landingPages.map((p) => p.serviceId).sort()).toEqual([...REQUIRED_SLUGS].sort());
    for (const p of landingPages) {
      expect(p.explorePoints.length).toBeGreaterThanOrEqual(3);
      expect(p.explorePoints.length).toBeLessThanOrEqual(5);
    }
    expect(new Set(landingPages.map((p) => p.id)).size).toBe(landingPages.length);
  });

  it("merges variant copy over the default copy", () => {
    const page = landingPages[0];
    const [variant] = Object.keys(page.variants);
    const copy = resolveLandingCopy(page, variant);
    expect(copy.description).toBe(page.copy.description);
    expect(landingVariantParams().every((p) => /^[a-z0-9-]+$/.test(p.variant))).toBe(true);
  });
});

describe("trust safeguards", () => {
  it("never publishes testimonials or examples without recorded consent", () => {
    expect(testimonials.every((t) => t.consentRecorded)).toBe(true);
    expect(caseExamples.every((e) => e.consentRecorded)).toBe(true);
  });

  it("contains no outcome-promising or pseudo-scientific claims", () => {
    const banned = [
      /guaranteed (results|success|outcome)/i,
      /\b(attracts?|brings?) (luck|wealth|success|prosperity)/i,
      /scientifically (proven|validated)/i,
      /clinically/i,
      /\b100%/,
      /\bcures?\b/i,
      /reveals? your (true )?personality/i,
      /predicts? your/i,
    ];
    // FAQ questions may voice a concern ("Will a watch bring luck?") in order to answer "No",
    // so they are excluded. Every answer and all other copy is checked.
    const strings: string[] = [];
    const collect = (value: unknown, key?: string) => {
      if (typeof value === "string" && key !== "question") strings.push(value);
      else if (Array.isArray(value)) value.forEach((v) => collect(v));
      else if (value && typeof value === "object") Object.entries(value).forEach(([k, v]) => collect(v, k));
    };
    collect({ services, landingPages, generalFaqs, home, pranav, watchCheck });
    for (const pattern of banned) {
      expect(strings.filter((text) => pattern.test(text))).toEqual([]);
    }
  });
});

describe("watch specimen check", () => {
  it("never uses another practitioner's trademarked method name", () => {
    expect(JSON.stringify(watchCheck)).not.toMatch(/wristwatch analysis/i);
  });

  it("never publishes an unconfirmed price for a paid tier", () => {
    for (const tier of watchCheck.tiers) {
      for (const price of [tier.priceINR, tier.priceEUR]) {
        expect(price === null || (Number.isFinite(price) && price > 0)).toBe(true);
      }
      if (tier.free) expect([tier.priceINR, tier.priceEUR]).toEqual([null, null]);
    }
  });

  it("has unique question ids and option values", () => {
    const ids = watchCheck.questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const q of watchCheck.questions) {
      const values = q.options.map((o) => o.value);
      expect(new Set(values).size).toBe(values.length);
    }
  });
});

describe("sitemap", () => {
  it("lists every service page and no advertising landing pages", () => {
    const urls = sitemap().map((entry) => new URL(entry.url).pathname);
    for (const slug of REQUIRED_SLUGS) expect(urls).toContain(`/services/${slug}`);
    expect(urls.some((u) => u.startsWith("/lp"))).toBe(false);
    expect(urls).toContain(watchCheck.path);
  });
});
