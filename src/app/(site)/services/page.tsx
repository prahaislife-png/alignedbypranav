import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { PageIntro } from "@/components/ui/page-intro";
import { Specimen } from "@/components/ui/specimen";
import { ListMark } from "@/components/ui/ornaments";
import { HowItWorks } from "@/components/home/how-it-works";
import { FinalCta } from "@/components/home/final-cta";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { cn } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Consultations: Signature, Logo, Clock, Number, Drawing & Vision Board",
  description:
    "Seven personalised consultations with Pranav Vibhute: signature and handwriting analysis, business logo analysis, wristwatch and office clock alignment, phone number selection, drawing analysis and vision boards.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageIntro
        crumbs={[{ name: "Services", path: "/services" }]}
        eyebrow="Seven consultations"
        title="Explore your *alignment.*"
        intro="Each consultation is personal and led by Pranav Vibhute. Choose the one that feels relevant, or ask him which would suit you."
      >
        <div data-hero-cta className="mt-8">
          <WhatsAppCta placement="hero" label="Ask which would suit you" variant="outline" />
        </div>
      </PageIntro>

      <section aria-label="All consultations" className="border-b border-line">
        <ol className="container-page">
          {services.map((service, i) => {
            const flip = i % 2 === 1;
            return (
              <li key={service.id} className="border-b border-line last:border-b-0">
                <article className="group relative grid items-center gap-8 py-12 sm:grid-cols-[11rem_1fr] sm:gap-10 lg:grid-cols-12 lg:py-16">
                  <Specimen
                    visual={service.image ?? service.illustration}
                    fig={service.number}
                    caption={service.shortTitle}
                    sizes="(min-width: 1024px) 22vw, 11rem"
                    className={cn(
                      "aspect-[4/5] w-40 transition-transform duration-700 ease-[var(--ease-out)] sm:w-full lg:col-span-3",
                      flip ? "-rotate-1 group-hover:rotate-1 lg:order-2 lg:col-start-10" : "rotate-1 group-hover:-rotate-1",
                    )}
                  />
                  <div className={cn("lg:col-span-5", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-5")}>
                    <p className="font-mono text-[0.75rem] text-madder">consultation {service.number}</p>
                    <h2 className="display-md from-baseline mt-2">
                      <Link
                        href={`/services/${service.slug}`}
                        className="after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-madder"
                      >
                        {service.title}
                      </Link>
                    </h2>
                    <p className="mt-3 text-muted">{service.oneLiner}</p>
                    <span aria-hidden="true" className="mt-5 inline-flex items-center gap-1.5 font-mono text-[0.75rem] text-madder lowercase">
                      read the consultation <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                    </span>
                  </div>
                  <ul className={cn("grid content-start gap-2.5 border-t border-ink pt-5 sm:col-start-2 lg:col-span-3", flip ? "lg:order-1 lg:col-start-6" : "lg:col-start-10")}>
                    {service.explores.slice(0, 4).map((area) => (
                      <li key={area.title} className="flex items-center gap-3 text-[0.9375rem]">
                        <ListMark />
                        {area.title}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            );
          })}
        </ol>
      </section>

      <HowItWorks />
      <FinalCta />
    </>
  );
}
