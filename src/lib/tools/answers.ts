import type { ToolAnswers, ToolQuestion } from "@/data/tools";

/** The labels of the chosen options for one question, joined for display. */
export function answerLabel(questions: readonly ToolQuestion[], questionId: string, answers: ToolAnswers): string | null {
  const question = questions.find((q) => q.id === questionId);
  const chosen = answers[questionId];
  if (!question || !chosen?.length) return null;
  const labels = chosen
    .map((value) => question.options.find((o) => o.value === value)?.label)
    .filter((label): label is string => Boolean(label));
  return labels.length ? labels.join(", ") : null;
}

/** Label / value rows for every answered question, in question order. */
export function answerRows(questions: readonly ToolQuestion[], answers: ToolAnswers): { label: string; value: string }[] {
  return questions.flatMap((q) => {
    const value = answerLabel(questions, q.id, answers);
    return value ? [{ label: q.label, value }] : [];
  });
}
