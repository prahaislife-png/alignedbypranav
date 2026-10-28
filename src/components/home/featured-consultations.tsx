import { home } from "@/data/home";
import { getServiceOrThrow } from "@/data/services";
import { Specimen } from "@/components/ui/specimen";
import { ArrowLink } from "@/components/ui/link-button";
import { ListMark } from "@/components/ui/ornaments";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { cn } from "@/lib/cn";

/** Editorial spreads for the featured consultations, specimen on one side, notes on the other. */
export function FeaturedConsultations() {
  const featured = home.featuredServiceIds.map(getServiceOrThrow);
  return (
    <section aria-label="Featured consultations" className="section-y border-b border-line bg-paper-2">
      <div className="container-page space-y-24 lg:space-y-36">
        {featured.map((service, i) => {
          const reversed = i % 2 === 1;
          return (
            <article key={service.id} className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
              <div className={cn("relative mx-auto w-full max-w-[20rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none", reversed && "lg:order-2 lg:col-start-8")}>
                <Specimen
                  visual={service.image ?? service.illustration}
                  fig={service.number}
                  caption={service.shortTitle}
                  className={cn("aspect-[4/5]", reversed ? "-rotate-1" : "rotate-1")}
                />
              </div>
              <div className={cn("lg:col-span-6", reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7")}>
                <p className="eyebrow">
                  <span aria-hidden="true">§ </span>
                  {home.featured.eyebrow} · {service.number}
                </p>
                <h2 className="display-lg from-baseline mt-4">{service.title}</h2>
                <blockquote className="mt-7 border-l-2 border-madder pl-5 font-display text-[1.375rem] leading-snug italic">
                  {service.pullQuote}
                </blockquote>
                <p className="mt-6 text-muted">{service.intro}</p>
                <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {service.explores.slice(0, 4).map((area) => (
                    <li key={area.title} className="flex items-center gap-3 text-[0.9375rem]">
                      <ListMark />
                      {area.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-8">
                  <WhatsAppCta service={service} placement="featured" label={`Enquire about ${service.shortTitle}`} />
                  <ArrowLink href={`/services/${service.slug}`}>Read the consultation</ArrowLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
