import type { ServiceId } from "@/types/content";
import type { ToolAnswers, ToolQuestion, ToolTier } from "./tools";

/**
 * SIGNATURE SPECIMEN CHECK – free tool at /tools/signature-check
 * ------------------------------------------------------------------
 * The check MEASURES and RECORDS only: slant, baseline, proportions and, when
 * signed on screen, pen lifts, time, pace and stylus pressure. It never says
 * what a signature means; that is Pranav's, in the first look and the paid
 * consultation. It is not a forensic or authenticity check.
 *
 * Edit `questions` to match Pranav's own checklist. Keep option labels short:
 * they print on the specimen sheet and appear in the WhatsApp message.
 */

export const signatureCheck = {
  path: "/tools/signature-check",
  serviceId: "signature-handwriting-analysis" as ServiceId,
  name: "Signature Specimen Check",
  seo: {
    title: "Free Signature Specimen Check",
    description:
      "Sign on screen or photograph your signature on paper for a free graphologist’s specimen sheet: slant, baseline, proportions and rhythm, plus a personalised practice sheet. Your signature never leaves your device.",
  },
  intro: {
    eyebrow: "Free tool",
    title: "Your signature, on the *specimen sheet.*",
    lead: "A free, two-minute record of how you sign: its slant, baseline, proportions and rhythm, measured the way a graphologist would, with a personalised practice sheet to print. Then, if you like, send it to Pranav for a personal first look.",
    privacy: "Your signature is processed on your own device. It is never uploaded or stored by this website.",
    security:
      "Your signature is personal. Keep the full sheet and the practice sheet private, and share only the share-safe version.",
  },
  methods: {
    draw: {
      title: "Sign on screen",
      description: "Measures slant and baseline, and also pen lifts, time and pace. With a stylus, pressure too.",
    },
    photo: {
      title: "Photograph a signature on paper",
      description: "Closest to how you really sign. Use a dark pen on plain white paper.",
    },
  },
  paperTips: [
    "Sign with a dark pen on plain white paper, as you normally would",
    "Photograph from above, in good light, without shadows",
    "Line the signature up inside the red frame",
  ],
  steps: [
    { title: "Sign", description: "Sign on screen, or photograph your signature on paper." },
    { title: "Record", description: "See the measurements and answer a few quick questions." },
    { title: "Your sheets", description: "Save your specimen sheet and practice sheet, and send them to Pranav for a free first look." },
  ],
  questions: [
    {
      id: "purpose",
      prompt: "Which signature is this?",
      label: "Signature",
      options: [
        { value: "current", label: "The one I use now" },
        { value: "new-name", label: "For a new name" },
        { value: "new", label: "A new one I’m practising" },
        { value: "other", label: "Another one I use" },
      ],
    },
    {
      id: "script",
      prompt: "Which script do you sign in?",
      label: "Script",
      options: [
        { value: "latin", label: "English letters" },
        { value: "devanagari", label: "Devanagari" },
        { value: "other-indian", label: "Another Indian script" },
        { value: "other", label: "Another script" },
      ],
    },
    {
      id: "legibility",
      prompt: "Can your name be read in it?",
      label: "Readable",
      options: [
        { value: "full", label: "Fully" },
        { value: "partly", label: "Partly" },
        { value: "initials", label: "Initials only" },
        { value: "no", label: "Not really" },
      ],
    },
    {
      id: "lines",
      prompt: "Is there a line under or through it?",
      label: "Lines",
      options: [
        { value: "none", label: "No line" },
        { value: "under", label: "A line underneath" },
        { value: "through", label: "A line through it" },
        { value: "several", label: "More than one" },
      ],
    },
    {
      id: "ending",
      prompt: "How does it end?",
      label: "Ending",
      options: [
        { value: "letter", label: "With the last letter" },
        { value: "dot", label: "With a dot" },
        { value: "flourish", label: "With a flourish" },
        { value: "upstroke", label: "With an upward stroke" },
      ],
    },
    {
      id: "hand",
      prompt: "Which hand do you sign with?",
      label: "Hand",
      options: [
        { value: "right", label: "Right" },
        { value: "left", label: "Left" },
      ],
    },
    {
      id: "since",
      prompt: "How long have you signed this way?",
      label: "In use",
      options: [
        { value: "new", label: "Less than a year" },
        { value: "1-5", label: "1–5 years" },
        { value: "5-10", label: "5–10 years" },
        { value: "10+", label: "More than 10 years" },
      ],
    },
    {
      id: "versions",
      prompt: "Do you use more than one signature?",
      label: "Versions",
      options: [
        { value: "one", label: "Just this one" },
        { value: "two", label: "One formal, one everyday" },
        { value: "several", label: "Several" },
      ],
    },
    {
      id: "where",
      prompt: "Where do you sign most?",
      label: "Signs mostly",
      options: [
        { value: "documents", label: "Bank and official papers" },
        { value: "work", label: "Work approvals" },
        { value: "everyday", label: "Cards and everyday notes" },
        { value: "rarely", label: "Rarely" },
      ],
    },
  ] satisfies ToolQuestion[],
  tiers: [
    {
      id: "check",
      name: "Signature Specimen Check",
      free: true,
      priceINR: null,
      priceEUR: null,
      description: "Instant, on this page.",
      points: ["Slant, baseline and proportions, measured", "Pen lifts, time and pace when you sign on screen", "A specimen sheet and a share-safe version"],
    },
    {
      id: "practice",
      name: "Personalised practice sheet",
      free: true,
      priceINR: null,
      priceEUR: null,
      description: "Printable, made from your own signature.",
      points: ["Your signature traced on handwriting guide lines", "Slant guides at your own angle", "Print at A4 and practise"],
    },
    {
      id: "first-look",
      name: "First look from Pranav",
      free: true,
      priceINR: null,
      priceEUR: null,
      description: "Personal, on WhatsApp. A limited number each week, answered in order.",
      points: ["Send your specimen sheet on WhatsApp", "Pranav replies personally with three observations", "Ask him anything about a full consultation"],
    },
    {
      id: "analysis",
      name: "Signature & handwriting analysis",
      free: false,
      priceINR: null,
      priceEUR: null,
      description: "A personal consultation with Pranav.",
      points: ["His reading of your signature and handwriting", "What they may express, discussed with you", "Signature refinement, if you would like it"],
    },
  ] satisfies ToolTier[],
  disclaimer:
    "The specimen check measures what can be seen and timed. It does not assess personality or predict anything, and it is not a forensic or authenticity check. Pranav’s observations are interpretive and reflective, and every decision remains yours.",
  sheet: {
    kicker: "signature specimen check",
    footer: "observations recorded · interpretation by pranav vibhute",
  },
  practice: {
    kicker: "signature practice sheet",
    instructions: "trace the grey copies, then sign on the empty lines. keep your slant and baseline steady.",
    footer: "a refined signature, developed with you? ask pranav vibhute",
  },
  firstLookCta: "Send to Pranav for a free first look",
  reportCta: "Ask about signature analysis",
  teaser: {
    eyebrow: "Free tool",
    title: "Your signature, on the *specimen sheet.*",
    description:
      "Sign on screen or photograph your signature on paper and get a free specimen sheet of its slant, baseline and rhythm, plus a practice sheet to print. Then send it to Pranav for a personal first look.",
    cta: "Start the free signature check",
  },
};

export type SignatureAnswers = ToolAnswers;
