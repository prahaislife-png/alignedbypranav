import type { ServiceId } from "@/types/content";
import type { ToolAnswers, ToolOption, ToolQuestion, ToolTier } from "./tools";

/**
 * WATCH SPECIMEN CHECK – free tool at /tools/watch-check
 * ------------------------------------------------------------------
 * The check only RECORDS what can be seen and what the visitor tells us:
 * colours, shape, details and how the watch is worn. It never interprets.
 * Interpretation is Pranav's, in the free first look and the paid report.
 *
 * To use Pranav's own checklist, edit `questions` below: every question is
 * rendered automatically and appears on the specimen sheet and in the
 * WhatsApp message. Keep option labels short (they print on the sheet).
 *
 * Do not call this tool "Wristwatch Analysis" (a trademark of another
 * practitioner) and never add interpretations or outcome claims here.
 */

export type WatchOption = ToolOption;
export type WatchQuestion = ToolQuestion;
export type WatchCheckTier = ToolTier & { id: "check" | "first-look" | "report" | "report-call" };

export const watchCheck = {
  path: "/tools/watch-check",
  serviceId: "wristwatch-clock-alignment" as ServiceId,
  name: "Watch Specimen Check",
  seo: {
    title: "Free Watch Specimen Check",
    description:
      "Put the watch you wear on a graphologist’s specimen sheet: dial and strap colours, shape and details, recorded in two minutes. Free, and your photo never leaves your phone.",
  },
  intro: {
    eyebrow: "Free tool",
    title: "Put your watch on the *specimen sheet.*",
    lead: "A free, two-minute record of the watch you wear: its colours, shape and details, set down the way a graphologist files a signature. Then, if you like, send it to Pranav for a personal first look.",
    privacy: "Your photo is processed on your own device. It is never uploaded or stored by this website.",
  },
  photoTips: [
    "Daylight, no flash, and as little glare on the glass as possible",
    "Dial facing the camera, flat on a table or on your wrist",
    "The whole dial in the picture, with a little of the strap",
  ],
  steps: [
    { title: "Photograph", description: "Take or choose a photo of your watch and line the dial up with the circle." },
    { title: "Record", description: "Tap the strap, confirm the colours and answer a few quick questions." },
    { title: "Your specimen sheet", description: "Save or share your sheet, and send it to Pranav for a free first look." },
  ],
  questions: [
    {
      id: "purpose",
      prompt: "Which watch is this?",
      label: "Watch",
      options: [
        { value: "current", label: "The watch I wear now" },
        { value: "considering", label: "A watch I’m considering" },
        { value: "other", label: "Another watch I own" },
      ],
    },
    {
      id: "shape",
      prompt: "What shape is the dial?",
      label: "Dial shape",
      options: [
        { value: "round", label: "Round" },
        { value: "square", label: "Square" },
        { value: "rectangular", label: "Rectangular" },
        { value: "tonneau", label: "Tonneau (barrel)" },
        { value: "oval", label: "Oval" },
        { value: "octagonal", label: "Octagonal" },
      ],
    },
    {
      id: "markers",
      prompt: "How are the hours marked?",
      label: "Hour markers",
      options: [
        { value: "arabic", label: "Arabic numerals (1, 2, 3)" },
        { value: "roman", label: "Roman numerals (I, II, III)" },
        { value: "indices", label: "Lines or batons" },
        { value: "dots", label: "Dots" },
        { value: "mixed", label: "A mix" },
        { value: "none", label: "No markers" },
        { value: "digital", label: "Digital display" },
      ],
    },
    {
      id: "case",
      prompt: "What colour is the case?",
      label: "Case",
      options: [
        { value: "steel", label: "Silver / steel" },
        { value: "gold", label: "Gold" },
        { value: "rose-gold", label: "Rose gold" },
        { value: "black", label: "Black" },
        { value: "two-tone", label: "Two-tone" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "strap",
      prompt: "What is the strap made of?",
      label: "Strap",
      options: [
        { value: "metal", label: "Metal bracelet" },
        { value: "leather", label: "Leather" },
        { value: "rubber", label: "Rubber / silicone" },
        { value: "fabric", label: "Fabric / NATO" },
        { value: "ceramic", label: "Ceramic" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "features",
      prompt: "Anything else on the dial?",
      label: "Details",
      multiple: true,
      hint: "Choose all that apply.",
      options: [
        { value: "date", label: "Date window" },
        { value: "day-date", label: "Day and date" },
        { value: "subdials", label: "Small sub-dials" },
        { value: "bezel", label: "Rotating bezel" },
        { value: "moonphase", label: "Moon phase" },
        { value: "open-heart", label: "Visible mechanism" },
        { value: "none", label: "None of these" },
      ],
    },
    {
      id: "movement",
      prompt: "How does it keep time?",
      label: "Movement",
      options: [
        { value: "automatic", label: "Automatic / hand-wound" },
        { value: "quartz", label: "Battery (quartz)" },
        { value: "smart", label: "Smartwatch" },
        { value: "unsure", label: "Not sure" },
      ],
    },
    {
      id: "time",
      prompt: "Is it set to the correct time?",
      label: "Time setting",
      options: [
        { value: "exact", label: "Exact" },
        { value: "ahead", label: "A few minutes ahead" },
        { value: "behind", label: "A few minutes behind" },
        { value: "stopped", label: "Stopped" },
      ],
    },
    {
      id: "wrist",
      prompt: "Which wrist do you wear it on?",
      label: "Wrist",
      options: [
        { value: "left", label: "Left" },
        { value: "right", label: "Right" },
        { value: "either", label: "Either" },
      ],
    },
    {
      id: "frequency",
      prompt: "How often do you wear it?",
      label: "Worn",
      options: [
        { value: "daily", label: "Every day" },
        { value: "most-days", label: "Most days" },
        { value: "occasionally", label: "Occasionally" },
        { value: "special", label: "Special occasions" },
      ],
    },
    {
      id: "since",
      prompt: "How long have you had it?",
      label: "Owned",
      options: [
        { value: "new", label: "Less than a year" },
        { value: "1-3", label: "1–3 years" },
        { value: "3-10", label: "3–10 years" },
        { value: "10+", label: "More than 10 years" },
      ],
    },
    {
      id: "origin",
      prompt: "How did it come to you?",
      label: "Came to you",
      options: [
        { value: "bought", label: "I bought it" },
        { value: "gift", label: "A gift" },
        { value: "inherited", label: "Inherited" },
      ],
    },
  ] satisfies WatchQuestion[],
  tiers: [
    {
      id: "check",
      name: "Watch Specimen Check",
      free: true,
      priceINR: null,
      priceEUR: null,
      description: "Instant, on this page.",
      points: ["Dial and strap colours, measured from your photo", "Shape, markers and details recorded", "A specimen sheet to save or share"],
    },
    {
      id: "first-look",
      name: "First look from Pranav",
      free: true,
      priceINR: null,
      priceEUR: null,
      description: "Personal, on WhatsApp. A limited number each week, answered in order.",
      points: ["Send your specimen sheet on WhatsApp", "Pranav replies personally with three observations", "Ask him anything about the full report"],
    },
    {
      id: "report",
      name: "Watch Alignment Report",
      free: false,
      priceINR: null,
      priceEUR: null,
      description: "Pranav’s full written review.",
      points: [
        "His reading of the watch you wear: dial, colours, shape, strap and how you wear it",
        "Considerations for choosing your next watch",
        "Individual recommendations, written for you",
      ],
    },
    {
      id: "report-call",
      name: "Report and consultation",
      free: false,
      priceINR: null,
      priceEUR: null,
      description: "The report, followed by a conversation with Pranav.",
      points: ["Everything in the report", "Talk it through with Pranav", "Bring watches you are considering buying"],
    },
  ] satisfies WatchCheckTier[],
  disclaimer:
    "The specimen check records what can be seen and what you tell us. It does not assess personality or predict anything. Pranav’s observations are interpretive and reflective, and every decision remains yours.",
  sheet: {
    kicker: "watch specimen check",
    footer: "observations recorded · interpretation by pranav vibhute",
  },
  firstLookCta: "Send to Pranav for a free first look",
  reportCta: "Ask about the full report",
  teaser: {
    eyebrow: "Free tool",
    title: "Put your watch on the *specimen sheet.*",
    description:
      "Photograph the watch you wear and get a free specimen sheet of its colours, shape and details in two minutes. Then send it to Pranav for a personal first look.",
    cta: "Start the free watch check",
  },
};

export type WatchAnswers = ToolAnswers;
