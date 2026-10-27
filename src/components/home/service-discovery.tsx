import { home } from "@/data/home";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowLink } from "@/components/ui/link-button";
import { ConcentricRings } from "@/components/ui/ornaments";
import { ServiceCard } from "@/components/services/service-card";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";

export function ServiceDiscovery() {
  const s = home.services;
  return (
    <section aria-labelledby="services-title" className="paper section-y bg-parchment">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="services-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
          <ArrowLink href="/services" className="shrink-0 md:mb-2">
            View all consultations
          </ArrowLink>
        </div>

        <ul className="mt-12 grid gap-3 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {services.map((service, i) => (
            <li key={service.id} className="reveal">
              <ServiceCard service={service} surface={i % 2 ? "sage" : "parchment"} />
            </li>
          ))}
          <li className="reveal">
            <div className="on-dark relative flex h-full flex-col justify-end overflow-hidden rounded-[1.25rem] bg-plum p-7 sm:min-h-[22rem] sm:rounded-[1.5rem] text-ivory">
              <ConcentricRings tone="light" rings={4} className="absolute -top-24 -right-24 w-[26rem] max-w-none opacity-50" />
              <p className="relative font-display text-[2rem] leading-[1.05] text-ivory">{s.unsureTitle}</p>
              <p className="relative mt-4 text-[0.9375rem] leading-relaxed text-ivory/75">{s.unsureText}</p>
              <WhatsAppCta
                placement="services_unsure"
                label="Ask Pranav"
                variant="light"
                className="relative mt-7 self-start"
              />
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
