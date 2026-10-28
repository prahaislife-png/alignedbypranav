import type { Metadata } from "next";
import { freeTools, toolsHub } from "@/data/free-tools";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { Specimen } from "@/components/ui/specimen";
import { LinkButton } from "@/components/ui/link-button";

export const metadata: Metadata = pageMetadata({
  title: toolsHub.seo.title,
  description: toolsHub.seo.description,
  path: toolsHub.path,
});

export default function ToolsPage() {
  return (
    <>
      <PageIntro crumbs={[{ name: "Free tools", path: toolsHub.path }]} eyebrow={toolsHub.eyebrow} title={toolsHub.title} intro={toolsHub.lead} />
      <section aria-label="Free tools" className="section-y bg-paper-2">
        <ul className="container-page grid gap-12 md:grid-cols-2 md:gap-10">
          {freeTools.map((tool, i) => (
            <li key={tool.id} className="flex flex-col border border-ink bg-paper p-6 shadow-[8px_8px_0_0_var(--color-ink)] sm:p-8">
              <Specimen visual={tool.illustration} fig={tool.fig} caption={tool.caption} className={`aspect-[5/4] ${i % 2 ? "rotate-[1deg]" : "-rotate-[1deg]"}`} />
              <p className="mt-8 font-mono text-[0.75rem] text-madder">{String(i + 1).padStart(2, "0")} · free · two minutes</p>
              <h2 className="mt-2 display-sm">{tool.name}</h2>
              <p className="mt-3 text-muted">{tool.teaser.description}</p>
              <LinkButton href={tool.path} arrow className="mt-8 self-start">
                {tool.teaser.cta}
              </LinkButton>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
