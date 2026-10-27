import type { LandingPage, LandingVariantCopy, ServiceId } from "@/types/content";

/**
 * INSTAGRAM & FACEBOOK AD LANDING PAGES
 * ------------------------------------------------------------------
 * Each service has a lightweight landing page at /lp/<service-slug>.
 *
 * A/B TESTS: add an entry to `variants` (e.g. `b: { headline: "…" }`) and
 * point the ad at /lp/<service-slug>/b. Only the fields you set change; the
 * rest comes from `copy`. Variant keys: lowercase letters, numbers, hyphens.
 * Pushing the edit to GitHub redeploys automatically; no component changes.
 *
 * Ad URLs should carry UTM parameters, e.g.
 *   /lp/signature-handwriting-analysis?utm_source=instagram&utm_medium=paid_social&utm_campaign=signature_launch
 */
export const landingPages: LandingPage[] = [
  {
    id: "lp-signature",
    serviceId: "signature-handwriting-analysis",
    copy: {
      headline: "Explore Your Signature Through a Personalised Consultation",
      description:
        "Discover Pranav Vibhute’s approach to signature review, handwriting analysis and individual signature refinement.",
      ctaLabel: "Enquire About Signature Analysis",
      heroVisual: "signature",
    },
    explorePoints: [
      "The form, flow and direction of your signature",
      "Characteristics of your everyday handwriting",
      "Personal expression through writing",
      "Signature refinement, if you would like it",
    ],
    variants: {
      b: {
        headline: "See Your Signature Through a Graphologist’s Eyes",
        ctaLabel: "Ask Pranav About Your Signature",
      },
    },
  },
  {
    id: "lp-logo",
    serviceId: "business-logo-analysis",
    copy: {
      headline: "Take a Closer Look at Your Business Logo",
      description:
        "Explore your logo’s visual elements, composition and symbolic meaning through a personalised consultation with Pranav.",
      ctaLabel: "Enquire About Logo Analysis",
      heroVisual: "logo",
    },
    explorePoints: [
      "Colour and composition",
      "Shapes, symbols and their associations",
      "Visual balance and proportion",
      "Corrective design and refinement options",
    ],
    variants: {
      b: {
        headline: "Is Your Logo in Balance? Get a Considered Second Look",
      },
    },
  },
  {
    id: "lp-wristwatch",
    serviceId: "wristwatch-clock-alignment",
    copy: {
      headline: "Choose Your Next Wristwatch With Intention",
      description:
        "Personal recommendations from Pranav Vibhute on wristwatch selection, watch characteristics and everyday clock preferences.",
      ctaLabel: "Enquire About Watch Alignment",
      heroVisual: "wristwatch",
    },
    explorePoints: [
      "Selecting a wristwatch that suits you",
      "Shape, dial, colour and strap characteristics",
      "Your everyday clock preferences",
      "Individual, personal recommendations",
    ],
    variants: {},
  },
  {
    id: "lp-office-clock",
    serviceId: "business-office-clock-alignment",
    copy: {
      headline: "Give Your Office Clocks a Second Thought",
      description:
        "A consultation with Pranav Vibhute on selecting and positioning clocks within your workplace, through a symbolic alignment approach.",
      ctaLabel: "Enquire About Office Clocks",
      heroVisual: "office-clock",
    },
    explorePoints: [
      "Which clocks suit your workplace",
      "Where clocks are positioned",
      "Your workspace as a whole",
      "Symbolic alignment of the office environment",
    ],
    variants: {},
  },
  {
    id: "lp-phone-number",
    serviceId: "phone-number-alignment",
    copy: {
      headline: "Choosing a New Number? Consider It Carefully First",
      description:
        "Pranav Vibhute reviews personal and business phone numbers, their patterns, and the options available to you.",
      ctaLabel: "Enquire About Number Alignment",
      heroVisual: "phone-number",
    },
    explorePoints: [
      "Personal mobile and business numbers",
      "A review of a number you already use",
      "Patterns within each number",
      "A personalised recommendation",
    ],
    variants: {},
  },
  {
    id: "lp-drawing",
    serviceId: "drawing-analysis",
    copy: {
      headline: "Start a New Conversation About Your Child’s Drawings",
      description:
        "A gentle, reflective consultation with Pranav Vibhute on drawings by individuals and families, including children.",
      ctaLabel: "Enquire About Drawing Analysis",
      heroVisual: "drawing",
    },
    explorePoints: [
      "Children’s and family drawings",
      "Creative expression on the page",
      "Visual patterns Pranav observes",
      "Ideas for parent–child discussion",
    ],
    variants: {},
  },
  {
    id: "lp-vision-board",
    serviceId: "vision-board-alignment",
    copy: {
      headline: "Create a Vision Board That Reflects What Matters to You",
      description:
        "Build a new vision board or revisit an existing one with Pranav Vibhute, guided by your goals, priorities and intentions.",
      ctaLabel: "Enquire About Vision Boards",
      heroVisual: "vision-board",
    },
    explorePoints: [
      "Creating a new vision board",
      "Reviewing a board you already have",
      "Clarifying goals and personal priorities",
      "Guided, symbolic reflection",
    ],
    variants: {},
  },
];

export function getLandingPage(serviceId: string): LandingPage | undefined {
  return landingPages.find((page) => page.serviceId === serviceId);
}

export function resolveLandingCopy(page: LandingPage, variantKey?: string): LandingVariantCopy {
  if (!variantKey) return page.copy;
  return { ...page.copy, ...page.variants[variantKey] };
}

export function landingVariantParams(): { slug: ServiceId; variant: string }[] {
  return landingPages.flatMap((page) =>
    Object.keys(page.variants).map((variant) => ({ slug: page.serviceId, variant })),
  );
}
