import type { Metadata } from "next";
import { watchCheck } from "@/data/watch-check";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { WatchCheck } from "@/components/tools/watch-check/watch-check";
import { ToolSteps, ToolTiers } from "@/components/tools/tool-sections";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: watchCheck.seo.title,
  description: watchCheck.seo.description,
  path: watchCheck.path,
  ownSocialImage: true,
});

export default function WatchCheckPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Free tools", path: "/tools" },
          { name: "Watch check", path: watchCheck.path },
        ]}
        eyebrow={watchCheck.intro.eyebrow}
        title={watchCheck.intro.title}
        intro={watchCheck.intro.lead}
      >
        <ToolSteps steps={watchCheck.steps} />
      </PageIntro>

      <section aria-labelledby="tool-title" className="section-y border-b border-line bg-paper-2">
        <div className="container-page">
          <h2 id="tool-title" className="sr-only">
            {watchCheck.name}
          </h2>
          <WatchCheck />
          <noscript>
            <p className="mt-6 text-muted">The watch check needs JavaScript. You can still send a photo of your watch to Pranav on WhatsApp.</p>
          </noscript>
        </div>
      </section>

      <ToolTiers
        tiers={watchCheck.tiers}
        intro="The specimen check records what can be seen. The first look and the report are where Pranav reads your watch personally."
        disclaimer={watchCheck.disclaimer}
      />

      <FinalCta
        service={getService(watchCheck.serviceId)}
        headline="Prefer to talk it through?"
        buttonLabel="Ask Pranav about watches"
        description="Send Pranav a short message about the watch you wear or the one you are considering, and he will explain how he can help."
      />
    </>
  );
}
