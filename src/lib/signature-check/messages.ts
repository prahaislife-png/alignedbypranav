import { signatureCheck, type SignatureAnswers } from "@/data/signature-check";
import { answerRows } from "@/lib/tools/answers";
import { measurementRows, type SignatureMeasurements } from "./measure";

/** The prefilled WhatsApp message asking Pranav for a free first look. */
export function signatureFirstLookMessage(m: SignatureMeasurements, answers: SignatureAnswers): string {
  const lines = [...measurementRows(m), ...answerRows(signatureCheck.questions, answers)].map((r) => `${r.label}: ${r.value}`);
  return [
    "Hello Pranav, I did the Signature Specimen Check on your website and would like a free first look at my signature.",
    "",
    ...lines,
    "",
    "I’ll attach my specimen sheet.",
  ].join("\n");
}

/** The prefilled WhatsApp message about the paid consultation. */
export function signatureAnalysisMessage(): string {
  return "Hello Pranav, I did the Signature Specimen Check on your website and would like to know more about Signature & Handwriting Analysis: how it works and the price.";
}
