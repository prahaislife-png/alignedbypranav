import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/hero";
import { ServiceDiscovery } from "@/components/home/service-discovery";
import { MeetPranav } from "@/components/home/meet-pranav";
import { Philosophy } from "@/components/home/philosophy";
import { HowItWorks } from "@/components/home/how-it-works";
import { FeaturedConsultations } from "@/components/home/featured-consultations";
import { WhyPranav } from "@/components/home/why-pranav";
import { RealExamples, Testimonials } from "@/components/home/proof-sections";
import { FaqPreview } from "@/components/home/faq-preview";
import { FinalCta } from "@/components/home/final-cta";
import { WatchCheckTeaser } from "@/components/tools/watch-check/watch-check-teaser";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} · Signature, Handwriting & Alignment Consultations`,
  absoluteTitle: true,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <ServiceDiscovery />
      <WatchCheckTeaser className="bg-paper-2" />
      <MeetPranav />
      <Philosophy />
      <HowItWorks />
      <FeaturedConsultations />
      <WhyPranav />
      <RealExamples />
      <Testimonials />
      <FaqPreview />
      <FinalCta />
    </>
  );
}
