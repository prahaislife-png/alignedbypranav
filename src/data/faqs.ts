import type { FaqItem } from "@/types/content";

/**
 * GENERAL FAQ
 * ------------------------------------------------------------------
 * Shown on the homepage (first items) and on /faq. Answers are written
 * only from confirmed facts. Set `reviewedByPranav: true` once approved,
 * and update answers when formats, prices or availability are confirmed.
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "How does the consultation work?",
    answer:
      "Every consultation is personal and led by Pranav. You begin by sending a WhatsApp message about the service you are interested in. Pranav then explains how that particular consultation works, what he needs from you and the next steps. The process differs from one service to another.",
    reviewedByPranav: false,
  },
  {
    question: "Are consultations available online?",
    answer:
      "How a consultation is delivered varies by service. Ask Pranav on WhatsApp which formats are available for the consultation you are interested in and for where you are based.",
    reviewedByPranav: false,
  },
  {
    question: "How do I choose the right service?",
    answer:
      "Start with what you are curious about: your signature, your business logo, a watch or clocks, a phone number, a drawing or a vision board. If you are unsure, describe it in a short WhatsApp message and Pranav will suggest the most relevant consultation.",
    reviewedByPranav: false,
  },
  {
    question: "How are prices determined?",
    answer:
      "Each service has its own starting price, which depends on the consultation. Where a starting price has been confirmed it is shown on the service page; otherwise it is available on enquiry. Ask Pranav for the price that applies to you before you decide.",
    reviewedByPranav: false,
  },
  {
    question: "What happens after I contact Pranav?",
    answer:
      "Pranav reads your message personally and replies on WhatsApp. He will explain the consultation process and starting price. Nothing is booked or charged until you have agreed to go ahead.",
    reviewedByPranav: false,
  },
  {
    question: "Is this a scientific, medical or psychological assessment?",
    answer:
      "No. Consultations are interpretive and reflective in nature. They are not scientific tests, medical or psychological assessments, or predictions, and they do not replace advice from qualified medical, psychological, legal or financial professionals.",
    reviewedByPranav: false,
  },
  {
    question: "What should I avoid sending in my first message?",
    answer:
      "Please don’t send signed documents, ID or bank details, or children’s drawings in your first message. Pranav will explain what he needs, and how it will be used, before you share any material.",
    reviewedByPranav: false,
  },
];

/** How many general FAQs appear on the homepage. */
export const homepageFaqCount = 5;
