import { cn } from "@/lib/cn";
import { RichHeadline } from "./rich-text";

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
        <p className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center", tone === "dark" && "!text-gold-light")}>
          <span aria-hidden="true" className={cn("h-px w-8", tone === "dark" ? "bg-gold-light/60" : "bg-gold")} />
          {eyebrow}
        </p>
      )}
      <Tag id={id} className={cn(size === "lg" ? "display-lg" : "display-md", tone === "dark" && "!text-ivory")}>
        <RichHeadline text={title} />
      </Tag>
      {intro && (
        <p className={cn("lead mt-6", align === "center" && "mx-auto", "max-w-2xl", tone === "dark" && "!text-ivory/75")}>
          {intro}
        </p>
      )}
    </div>
  );
}
