import { Fragment } from "react";

/**
 * Renders a headline where words wrapped in *asterisks* are set in the
 * italic accent style, e.g. "Find meaning in the *details.*"
 */
export function RichHeadline({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="accent-italic">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}
