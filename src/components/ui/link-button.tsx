import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "outline" | "light" | "ghost-light";

export const buttonClasses: Record<ButtonVariant, string> = {
  primary: "btn btn-primary",
  outline: "btn btn-outline",
  light: "btn btn-light",
  "ghost-light": "btn btn-ghost-light",
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  className,
  arrow = false,
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
}) {
  return (
    <Link href={href} className={cn(buttonClasses[variant], "group", className)}>
      {children}
      {arrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-500 ease-[var(--ease-gentle)] group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      )}
    </Link>
  );
}

/** Understated text link with an arrow, e.g. "Explore". */
export function ArrowLink({
  href,
  children,
  className,
  tone = "plum",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  tone?: "plum" | "light";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 text-[0.9375rem] font-medium",
        tone === "plum" ? "text-plum" : "text-ivory",
        className,
      )}
    >
      <span className="link-line">{children}</span>
      <ArrowRight
        aria-hidden="true"
        strokeWidth={1.5}
        className="size-4 transition-transform duration-500 ease-[var(--ease-gentle)] group-hover:translate-x-1"
      />
    </Link>
  );
}
