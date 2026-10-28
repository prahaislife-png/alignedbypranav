import { watchCheck, type WatchAnswers, type WatchQuestion } from "@/data/watch-check";
import type { ColourReading } from "./colour";

/** Everything the Watch Specimen Check records. Never sent to analytics. */
export interface WatchRecord {
  dial: ColourReading | null;
  strap: ColourReading | null;
  answers: WatchAnswers;
}

const questions: WatchQuestion[] = watchCheck.questions;

/** The labels of the chosen options for one question, joined for display. */
export function answerText(questionId: string, answers: WatchAnswers): string | null {
  const question = questions.find((q) => q.id === questionId);
  const chosen = answers[questionId];
  if (!question || !chosen?.length) return null;
  const labels = chosen
    .map((value) => question.options.find((o) => o.value === value)?.label)
    .filter((label): label is string => Boolean(label));
  return labels.length ? labels.join(", ") : null;
}

/** Rows for the specimen sheet and the WhatsApp message, in question order. */
export function recordRows(record: WatchRecord): { label: string; value: string }[] {
  const rows: { label: string; value: string }[] = [];
  if (record.dial) rows.push({ label: "Dial colour", value: record.dial.name });
  if (record.strap) rows.push({ label: "Strap colour", value: record.strap.name });
  for (const q of questions) {
    const value = answerText(q.id, record.answers);
    if (value) rows.push({ label: q.label, value });
  }
  return rows;
}

/** Questions still unanswered (every question is optional, this only guides the visitor). */
export function unanswered(answers: WatchAnswers): WatchQuestion[] {
  return questions.filter((q) => !answers[q.id]?.length);
}

/** The prefilled WhatsApp message asking Pranav for a free first look. */
export function firstLookMessage(record: WatchRecord): string {
  const lines = recordRows(record).map((row) => `${row.label}: ${row.value}`);
  return [
    "Hello Pranav, I did the Watch Specimen Check on your website and would like a free first look at my watch.",
    "",
    ...lines,
    "",
    "I’ll attach my specimen sheet.",
  ].join("\n");
}

/** The prefilled WhatsApp message for the paid report. */
export function reportMessage(): string {
  return "Hello Pranav, I did the Watch Specimen Check on your website and would like to know more about the Watch Alignment Report: what it includes, how it works and the price.";
}
