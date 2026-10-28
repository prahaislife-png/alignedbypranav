import type { Metadata } from "next";
import Link from "next/link";
import { pranav } from "@/data/pranav";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Portrait } from "@/components/ui/portrait";
import { ListMark } from "@/components/ui/ornaments";
import { SectionHeading } from "@/components/ui/section-heading";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = pageMetadata({
  title: "About Pranav Vibhute, Graphologist and Alignment Consultant",
  description:
    "Meet Pranav Vibhute, the graphologist and alignment consultant behind Aligned by Pranav, and learn how his personal consultations work.",
  path: "/about",
});

const isList = [
  "A personal conversation led by Pranav",
  "Grounded in something specific to you",
  "Interpretive and reflective",
  "Open to your questions",
];

const isNotList = [
  "A scientific or psychometric test",
  "A medical or psychological diagnosis",
  "A prediction or a guarantee of any outcome",
  "A replacement for qualified professional advice",
];

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="page-title" className="relative overflow-hidden">
        <div className="container-page grid gap-14 pt-8 pb-20 lg:grid-cols-12 lg:gap-10 lg:pt-12 lg:pb-28">
          <div className="lg:col-span-12">
            <Breadcrumbs items={[{ name: "About Pranav", path: "/about" }]} />
          </div>
          <div className="mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
            <Portrait priority />
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-8">
            <p className="eyebrow">
              <span aria-hidden="true">§ </span>about
            </p>
            <h1 id="page-title" className="display-xl mt-5">
              {pranav.name}
            </h1>
            <p className="mt-4 font-mono text-[0.8125rem] text-madder lowercase">{pranav.title}</p>
            <div className="mt-8 space-y-5">
              {pranav.longBio.map((paragraph, i) => (
                <p key={i} className={i === 0 ? "lead !text-ink" : "text-muted"}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div data-hero-cta className="mt-10">
              <WhatsAppCta placement="about" label="Enquire with Pranav" />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="paper section-y bg-paper-2">
        <div className="container-page">
          <SectionHeading id="approach-title" eyebrow="The approach" title="How Pranav works" />
          <ol className="mt-12 grid border-t border-ink md:grid-cols-3">
            {pranav.approach.map((item, i) => (
              <li key={item.title} className="reveal border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
                <p className="font-mono text-[0.75rem] text-madder">0{i + 1}</p>
                <h3 className="display-sm mt-3">{item.title}</h3>
                <p className="mt-3 text-muted">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="nature-title" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="nature-title"
            eyebrow="Clarity first"
            title="What a consultation is, and isn’t"
            intro="Pranav’s consultations draw on graphology and symbolic interpretation. It matters to us that you know exactly what to expect."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            <div className="bg-paper-2 p-8">
              <h3 className="display-sm">It is</h3>
              <ul className="mt-5 space-y-3">
                {isList.map((item) => (
                  <li key={item} className="flex gap-3">
                    <ListMark className="mt-[0.75rem]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-line p-8">
              <h3 className="display-sm">It isn’t</h3>
              <ul className="mt-5 space-y-3">
                {isNotList.map((item) => (
                  <li key={item} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-[0.75rem] h-px w-3 shrink-0 bg-muted" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/disclaimer" className="link-line mt-6 inline-block text-[0.9375rem] text-ink">
                Read the consultation disclaimer
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="about-services-title" className="border-t border-line-soft section-y">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="about-services-title" eyebrow="Consultations" title="Seven ways to begin" size="md" />
          </div>
          <ul className="border-t border-line lg:col-span-8">
            {services.map((s) => (
              <li key={s.id} className="border-b border-line">
                <Link href={`/services/${s.slug}`} className="group flex items-baseline gap-5 py-5">
                  <span className="w-8 font-mono text-[0.75rem] text-madder">{s.number}</span>
                  <span className="flex-1 font-display text-[1.5rem] leading-tight text-ink">{s.title}</span>
                  <span aria-hidden="true" className="text-gold transition-transform duration-500 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
