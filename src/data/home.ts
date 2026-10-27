import type { ServiceId } from "@/types/content";

/**
 * HOMEPAGE COPY
 * ------------------------------------------------------------------
 * Headings and short texts for each homepage section.
 */
export const home = {
  hero: {
    eyebrow: "Personal consultations with Pranav Vibhute",
    /** Words wrapped in *asterisks* are set in italic. */
    headline: "Find meaning in the *details.*",
    supportingLine:
      "Explore personalised consultations with Pranav Vibhute across signatures, handwriting, visual identity and meaningful everyday choices.",
    primaryCta: "Explore Services",
    secondaryCta: "Enquire on WhatsApp",
    trustDescriptors: ["One-to-one consultations", "Led personally by Pranav", "Enquiries for India & Europe"],
  },

  services: {
    eyebrow: "Seven consultations",
    title: "Explore Your Alignment",
    intro:
      "Each consultation starts with something specific to you: a signature, a logo, a watch, a number, a drawing or a vision board.",
    unsureTitle: "Not sure where to begin?",
    unsureText: "Send Pranav a short message about what you are curious about. He will suggest the consultation that fits.",
  },

  meet: {
    eyebrow: "Your consultant",
    title: "Meet Pranav",
  },

  philosophy: {
    eyebrow: "Our philosophy",
    statement:
      "Small, everyday details, such as how you sign your name, the symbols you choose and the objects you live with, can become starting points for reflection.",
    principles: [
      { title: "Awareness", text: "Noticing the details you usually pass by." },
      { title: "Expression", text: "Seeing how you present yourself to the world." },
      { title: "Reflection", text: "Taking time to consider what those details mean to you." },
      { title: "Intention", text: "Making future choices deliberately, not by habit." },
      { title: "Guidance", text: "A personal perspective from Pranav, never a fixed formula." },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "Three simple steps",
    steps: [
      {
        title: "Explore a Service",
        text: "Read about the seven consultations and choose the one that feels relevant to you.",
      },
      {
        title: "Connect on WhatsApp",
        text: "Send a short message. Ask about the process and starting price before you decide anything.",
      },
      {
        title: "Consult with Pranav",
        text: "Pranav explains how your consultation will work, then guides the conversation personally.",
      },
    ],
  },

  /** The two services featured in editorial detail. Change the ids to feature others. */
  featuredServiceIds: ["signature-handwriting-analysis", "business-logo-analysis"] as ServiceId[],
  featured: {
    eyebrow: "Featured consultations",
  },

  why: {
    eyebrow: "Why Pranav",
    title: "A consultation, not a calculator",
    intro:
      "There are no automated tools here. Each enquiry is read by Pranav and each consultation is shaped around the person he is speaking with.",
    points: [
      {
        title: "Direct expert consultation",
        text: "You speak with Pranav himself. There are no automated reports or chatbots.",
      },
      {
        title: "Personalised discussion",
        text: "The conversation follows your questions and what you would like to explore.",
      },
      {
        title: "Individual circumstances",
        text: "Recommendations take your situation into account rather than applying one rule to all.",
      },
      {
        title: "Thoughtful recommendations",
        text: "Observations are explained, so you understand the reasoning behind them.",
      },
      {
        title: "Transparent communication",
        text: "Ask about the process and the starting price before you commit to anything.",
      },
    ],
  },

  faq: {
    eyebrow: "Questions",
    title: "Before you enquire",
  },

  finalCta: {
    headline: "Begin with a conversation.",
    description: "Explore the consultation that feels relevant to you and connect directly with Pranav.",
    button: "Enquire on WhatsApp",
  },
} as const;
