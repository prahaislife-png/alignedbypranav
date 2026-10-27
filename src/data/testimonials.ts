import type { CaseExample, Testimonial } from "@/types/content";

/**
 * TESTIMONIALS
 * ------------------------------------------------------------------
 * Only add REAL testimonials from clients who have given written consent
 * to publication, in the exact words they approved. Never invent names,
 * reviews, star ratings or client counts.
 *
 * While this list is empty, the testimonials section is hidden.
 *
 * Example entry (do not uncomment – it is an illustration of the format):
 * {
 *   quote: "…client's approved words…",
 *   attribution: "R. M., Pune",
 *   serviceId: "signature-handwriting-analysis",
 *   consentRecorded: true,
 *   consentReference: "Email from client, 12 Jan 2027",
 * },
 */
export const testimonials: Testimonial[] = [];

/**
 * REAL EXAMPLES OF WORK
 * ------------------------------------------------------------------
 * Anonymised examples of Pranav's work (e.g. a signature refinement or a
 * logo improvement), with the client's consent. Never fabricate
 * before-and-after images. Remove any names, signatures or identifying
 * details unless the client explicitly approved them.
 *
 * While this list is empty, the examples section is hidden.
 */
export const caseExamples: CaseExample[] = [];

export const publishableTestimonials = (): Testimonial[] => testimonials.filter((t) => t.consentRecorded);
export const publishableExamples = (): CaseExample[] => caseExamples.filter((e) => e.consentRecorded);
