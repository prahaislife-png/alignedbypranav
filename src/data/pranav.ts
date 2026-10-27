import type { ApprovedImage } from "@/types/content";

/**
 * PRANAV VIBHUTE – PUBLIC PROFILE
 * ------------------------------------------------------------------
 * Pranav is the only public-facing expert. Only add facts he has approved:
 * no unverified qualifications, years of experience, client numbers or
 * employer associations.
 */
export const pranav = {
  name: "Pranav Vibhute",
  firstName: "Pranav",
  title: "Graphologist and Alignment Consultant",

  /**
   * Portrait photograph. Add the approved file to /public/images/portrait/
   * and fill in the object below, e.g.
   *   { src: "/images/portrait/pranav.jpg", alt: "Pranav Vibhute", width: 1200, height: 1500 }
   * Until then an abstract monogram placeholder is shown. Never use an
   * AI-generated likeness.
   */
  portrait: null as ApprovedImage | null,

  /** Short biography (homepage, landing pages). DRAFT – written only from confirmed facts. */
  shortBio:
    "Pranav Vibhute is a graphologist and alignment consultant. He works one to one with individuals, families and businesses, looking closely at signatures, handwriting, logos, everyday objects and personal choices, and talking through what he observes.",

  /** Longer biography (About page). DRAFT – please replace with Pranav’s approved wording. */
  longBio: [
    "Pranav Vibhute is a graphologist and alignment consultant, and the lead expert behind Aligned by Pranav.",
    "His consultations begin with something specific: a signature, a page of handwriting, a business logo, a wristwatch, a phone number, a drawing or a vision board. From there, Pranav shares his observations and interpretation, and the conversation turns to what feels relevant to you.",
    "Every consultation is personal. Pranav responds to the person in front of him and their circumstances, rather than applying a single formula to everyone.",
  ],

  /** How Pranav approaches a consultation. Keep descriptive, not promissory. */
  approach: [
    {
      title: "Specific",
      text: "Each conversation begins with something real and particular to you: your writing, your logo, your choices.",
    },
    {
      title: "Personal",
      text: "Pranav consults directly. You speak with him, not with an assistant or an automated tool.",
    },
    {
      title: "Reflective",
      text: "Observations are offered as perspectives to consider. Decisions always remain yours.",
    },
  ],

  /** Set to true once Pranav has approved the biography wording above. */
  bioApproved: false,
} as const;
