import type { Metadata } from "next";
import Link from "next/link";
import { generalFaqs } from "@/data/faqs";
import { services } from "@/data/services";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { FaqList } from "@/components/ui/faq-list";
import { JsonLd } from "@/components/ui/json-ld";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "How consultations with Pranav Vibhute work, how to choose a service, how starting prices are shared, and what happens after you enquire on WhatsApp.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        eyebrow="Questions"
        title="Frequently asked *questions*"
        intro="Answers to common questions about consultations with Pranav. If yours isn’t here, ask on WhatsApp."
      />

      <section aria-labelledby="general-faq" className="paper section-y bg-paper-2">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <h2 id="general-faq" className="display-md lg:col-span-4">
            General
          </h2>
          <FaqList items={generalFaqs} className="lg:col-span-8" />
        </div>
      </section>

      <section aria-labelledby="service-faqs" className="section-y">
        <div className="container-page">
          <h2 id="service-faqs" className="display-md">
            By consultation
          </h2>
          <div className="mt-12 space-y-16">
            {services
              .filter((s) => s.faqs.length > 0)
              .map((service) => (
                <div key={service.id} className="grid gap-6 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-4">
                    <p className="font-mono text-[0.75rem] text-madder">No. {service.number}</p>
                    <h3 className="display-sm mt-1">
                      <Link href={`/services/${service.slug}`} className="link-line">
                        {service.title}
                      </Link>
                    </h3>
                  </div>
                  <FaqList items={service.faqs} className="lg:col-span-8" />
                </div>
              ))}
          </div>
        </div>
      </section>

      <FinalCta />
      <JsonLd data={faqJsonLd(generalFaqs)} />
    </>
  );
}
