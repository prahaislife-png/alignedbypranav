import { home } from "@/data/home";
import { generalFaqs, homepageFaqCount } from "@/data/faqs";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqList } from "@/components/ui/faq-list";
import { ArrowLink } from "@/components/ui/link-button";

export function FaqPreview() {
  return (
    <section aria-labelledby="faq-title" className="section-y border-b border-line">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={home.faq.eyebrow} title={home.faq.title} />
          <ArrowLink href="/faq" className="mt-8">
            All questions
          </ArrowLink>
        </div>
        <FaqList items={generalFaqs.slice(0, homepageFaqCount)} className="lg:col-span-7 lg:col-start-6" />
      </div>
    </section>
  );
}
