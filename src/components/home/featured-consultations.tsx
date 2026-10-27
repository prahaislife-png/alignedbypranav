import { home } from "@/data/home";
import { getServiceOrThrow } from "@/data/services";
import { ArchVisual } from "@/components/ui/arch-visual";
import { ArrowLink } from "@/components/ui/link-button";
import { Diamond } from "@/components/ui/ornaments";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { cn } from "@/lib/cn";

export function FeaturedConsultations() {
  const featured = home.featuredServiceIds.map(getServiceOrThrow);
  return (
    <section aria-label="Featured consultations" className="paper section-y bg-parchment">
      <div className="container-page space-y-24 lg:space-y-32">
        {featured.map((service, i) => {
          const reversed = i % 2 === 1;
          return (
            <article key={service.id} className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
              <div
                className={cn(
                  "reveal relative mx-auto w-full max-w-[18rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none",
                  reversed ? "lg:order-2 lg:col-start-8" : "",
                )}
              >
                <ArchVisual visual={service.image ?? service.illustration} surface={reversed ? "sage" : "ivory"} className="aspect-[4/5]" />
              </div>
              <div className={cn("lg:col-span-6", reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                <p className="eyebrow flex items-center gap-3">
                  <span aria-hidden="true" className="h-px w-8 bg-gold" />
                  {home.featured.eyebrow} · No. {service.number}
                </p>
                <h2 className="display-lg mt-5">{service.title}</h2>
                <blockquote className="mt-6 border-l border-gold pl-5 font-display text-[1.375rem] leading-snug text-plum-soft italic">
                  {service.pullQuote}
                </blockquote>
                <p className="mt-6 text-muted">{service.intro}</p>
                <ul className="mt-7 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                  {service.explores.slice(0, 4).map((area) => (
                    <li key={area.title} className="flex items-center gap-3 text-[0.9375rem] text-charcoal">
                      <Diamond />
                      {area.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
                  <WhatsAppCta service={service} placement="featured" label={`Enquire about ${service.shortTitle}`} />
                  <ArrowLink href={`/services/${service.slug}`}>Explore the consultation</ArrowLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
