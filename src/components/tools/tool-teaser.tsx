import type { FreeTool } from "@/data/free-tools";
import { freeTools } from "@/data/free-tools";
import { LinkButton } from "@/components/ui/link-button";
import { SectionHeading } from "@/components/ui/section-heading";
import { Specimen } from "@/components/ui/specimen";
import { cn } from "@/lib/cn";

/** Invitation to one free tool, used on its service page and ad landing page. */
export function ToolTeaser({ tool, className }: { tool: FreeTool; className?: string }) {
  const { teaser } = tool;
  const id = `teaser-${tool.id}`;
  return (
    <section aria-labelledby={id} className={cn("section-y border-b border-line", className)}>
      <div className="container-page grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <SectionHeading id={id} eyebrow={teaser.eyebrow} title={teaser.title} intro={teaser.description} />
          <div className="mt-8 flex flex-col items-start gap-3">
            <LinkButton href={tool.path} arrow>
              {teaser.cta}
            </LinkButton>
            <p className="note">two minutes · free · nothing is uploaded</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[19rem] sm:max-w-[22rem] lg:col-span-4 lg:col-start-8 lg:max-w-none">
          <Specimen visual={tool.illustration} fig={tool.fig} caption={tool.caption} className="aspect-[4/5] -rotate-[1.5deg]" />
        </div>
      </div>
    </section>
  );
}

/** All free tools side by side, for the homepage. */
export function ToolsTeaser({ className }: { className?: string }) {
  return (
    <section aria-labelledby="free-tools-title" className={cn("section-y border-b border-line", className)}>
      <div className="container-page">
        <SectionHeading
          id="free-tools-title"
          eyebrow="Free tools"
          title="Start with a *specimen sheet.*"
          intro="Two-minute checks that record your signature or your watch the way a graphologist would. Free, and nothing leaves your device."
        />
        <ul className="mt-12 grid gap-10 md:grid-cols-2 md:gap-8">
          {freeTools.map((tool, i) => (
            <li key={tool.id} className="grid grid-cols-[7rem_1fr] items-start gap-6 sm:grid-cols-[9rem_1fr]">
              <Specimen visual={tool.illustration} fig={tool.fig} compact className={cn("aspect-[4/5]", i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]")} />
              <div>
                <p className="font-mono text-[0.75rem] text-madder">{String(i + 1).padStart(2, "0")} · free</p>
                <h3 className="mt-1 font-display text-[1.6rem] leading-tight">{tool.name}</h3>
                <p className="mt-2 text-[0.9375rem] text-muted">{tool.teaser.description}</p>
                <LinkButton href={tool.path} variant="outline" arrow className="mt-5">
                  {tool.teaser.cta}
                </LinkButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
