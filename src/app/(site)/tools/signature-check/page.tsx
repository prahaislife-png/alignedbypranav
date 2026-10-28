import type { Metadata } from "next";
import { signatureCheck } from "@/data/signature-check";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { SignatureCheck } from "@/components/tools/signature-check/signature-check";
import { ToolSteps, ToolTiers } from "@/components/tools/tool-sections";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: signatureCheck.seo.title,
  description: signatureCheck.seo.description,
  path: signatureCheck.path,
  ownSocialImage: true,
});

export default function SignatureCheckPage() {
  return (
    <>
      <PageIntro
        crumbs={[
          { name: "Free tools", path: "/tools" },
          { name: "Signature check", path: signatureCheck.path },
        ]}
        eyebrow={signatureCheck.intro.eyebrow}
        title={signatureCheck.intro.title}
        intro={signatureCheck.intro.lead}
      >
        <ToolSteps steps={signatureCheck.steps} />
      </PageIntro>

      <section aria-labelledby="tool-title" className="section-y border-b border-line bg-paper-2">
        <div className="container-page">
          <h2 id="tool-title" className="sr-only">
            {signatureCheck.name}
          </h2>
          <SignatureCheck />
          <noscript>
            <p className="mt-6 text-muted">The signature check needs JavaScript. You can still send a photo of your signature to Pranav on WhatsApp.</p>
          </noscript>
        </div>
      </section>

      <ToolTiers
        tiers={signatureCheck.tiers}
        intro="The specimen check measures what can be seen and timed. The first look and the consultation are where Pranav reads your signature personally."
        disclaimer={signatureCheck.disclaimer}
      />

      <FinalCta
        service={getService(signatureCheck.serviceId)}
        headline="Prefer to talk it through?"
        buttonLabel="Ask Pranav about your signature"
        description="Send Pranav a short message about your signature, or the new one you are working on, and he will explain how he can help."
      />
    </>
  );
}
