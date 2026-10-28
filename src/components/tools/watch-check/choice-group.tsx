import type { WatchQuestion } from "@/data/watch-check";
import { cn } from "@/lib/cn";

/** One question as a group of tappable choices (native radio buttons or checkboxes). */
export function ChoiceGroup({
  question,
  value,
  onChange,
}: {
  question: WatchQuestion;
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const type = question.multiple ? "checkbox" : "radio";
  const toggle = (option: string, checked: boolean) => {
    if (!question.multiple) return onChange([option]);
    if (option === "none") return onChange(checked ? ["none"] : []);
    const rest = value.filter((v) => v !== "none" && v !== option);
    onChange(checked ? [...rest, option] : rest);
  };

  return (
    <fieldset className="border-t border-line pt-5">
      <legend className="float-left w-full font-display text-[1.25rem] leading-snug">{question.prompt}</legend>
      {question.hint && <p className="clear-left pt-1 text-[0.875rem] text-muted">{question.hint}</p>}
      <div className="clear-left flex flex-wrap gap-2 pt-3">
        {question.options.map((option) => {
          const checked = value.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "relative inline-flex min-h-11 cursor-pointer items-center border px-3.5 py-2 text-[0.9375rem] leading-tight transition-colors",
                "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-madder",
                checked ? "border-ink bg-ink text-paper" : "border-line bg-paper text-ink hover:border-ink",
              )}
            >
              <input
                type={type}
                name={question.id}
                value={option.value}
                checked={checked}
                onChange={(e) => toggle(option.value, e.target.checked)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
