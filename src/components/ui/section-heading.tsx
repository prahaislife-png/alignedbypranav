import { cn } from "@/lib/cn";
import { RichHeadline } from "./rich-text";

/**
 * Section heading: a red-pen margin note (`§ note`) above a BluuNext headline
 * that rises from its baseline as it scrolls into view.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  as: Tag = "h2",
  size = "lg",
  tone = "light",
  className,
  id,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md";
  tone?: "light" | "dark";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <p className={cn("eyebrow mb-4", tone === "dark" && "!text-gold-light")}>
          <span aria-hidden="true">§ </span>
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn(size === "lg" ? "display-lg" : "display-md", "from-baseline", tone === "dark" && "!text-paper")}>
        <RichHeadline text={title} />
      </Tag>
      {intro && (
        <p className={cn("lead mt-6", align === "center" && "mx-auto", "max-w-2xl", tone === "dark" && "!text-paper/75")}>
          {intro}
        </p>
      )}
    </div>
  );
}
