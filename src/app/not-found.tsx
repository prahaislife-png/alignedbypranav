import type { Metadata } from "next";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LinkButton } from "@/components/ui/link-button";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="relative flex-1 overflow-hidden">
        <section aria-labelledby="nf-title" className="container-page relative py-24 md:py-36">
          <p className="eyebrow">
            <span aria-hidden="true">§ </span>error 404 · off the baseline
          </p>
          <h1 id="nf-title" className="display-xl baseline-ruled rule-written mt-6 max-w-[15ch]">
            This page is <em className="accent-italic">out of alignment.</em>
          </h1>
          <p className="lead mt-8 max-w-lg">
            The page you were looking for doesn’t exist or has moved. These links will take you somewhere useful.
          </p>
          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row">
            <LinkButton href="/" arrow>
              Return home
            </LinkButton>
            <LinkButton href="/services" variant="outline">
              View consultations
            </LinkButton>
          </div>
          <div className="mt-8">
            <WhatsAppCta placement="hero" variant="text" label="Or ask Pranav on WhatsApp" className="text-[0.9375rem]" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
