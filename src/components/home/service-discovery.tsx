import { home } from "@/data/home";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/section-heading";
import { ArrowLink } from "@/components/ui/link-button";
import { ServiceIndexRow } from "@/components/services/service-card";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";

/** The seven consultations as an index, with a sticky note for the undecided. */
export function ServiceDiscovery() {
  const s = home.services;
  return (
    <section aria-labelledby="services-title" className="section-y border-b border-line">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="services-title" eyebrow={s.eyebrow} title={s.title} intro={s.intro} />
            <aside className="on-dark mt-10 bg-night p-6 text-paper sm:p-7" aria-labelledby="unsure-title">
              <p className="eyebrow !text-gold-light">§ a note</p>
              <p id="unsure-title" className="mt-3 font-display text-[1.625rem] leading-tight text-paper">
                {s.unsureTitle}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/75">{s.unsureText}</p>
              <WhatsAppCta placement="services_unsure" label="Ask Pranav" variant="light" className="mt-6" />
            </aside>
            <ArrowLink href="/services" className="mt-8 hidden lg:inline-flex">
              View all consultations
            </ArrowLink>
          </div>
        </div>
        <ol className="border-t border-ink lg:col-span-8">
          {services.map((service) => (
            <li key={service.id} className="reveal">
              <ServiceIndexRow service={service} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
