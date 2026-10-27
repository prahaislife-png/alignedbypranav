import { home } from "@/data/home";
import { ArchVisual } from "@/components/ui/arch-visual";
import { LinkButton } from "@/components/ui/link-button";
import { ConcentricRings, Diamond } from "@/components/ui/ornaments";
import { RichHeadline } from "@/components/ui/rich-text";
import { ServiceIllustration } from "@/components/illustrations/service-illustrations";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { pranav } from "@/data/pranav";

export function HomeHero() {
  const { hero } = home;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div className="container-page grid items-center gap-14 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-28">
        <div className="lg:col-span-7 lg:pr-6">
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="display-xl mt-6 max-w-[11ch]">
            <RichHeadline text={hero.headline} />
          </h1>
          <p className="lead mt-7 max-w-[34rem]">
            {hero.supportingLine}
          </p>
          <div
            data-hero-cta
            className="mt-9 flex flex-col gap-3 xs:flex-row xs:flex-wrap"
          >
            <LinkButton href="/services" arrow>
              {hero.primaryCta}
            </LinkButton>
            <WhatsAppCta label={hero.secondaryCta} placement="hero" variant="outline" />
          </div>
          <ul
            className="fade-in mt-10 flex flex-wrap gap-x-6 gap-y-2.5 text-[0.875rem] text-muted"
            aria-label="About these consultations"
          >
            {hero.trustDescriptors.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Diamond />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <HeroComposition />
        </div>
      </div>
    </section>
  );
}

/** An editorial collage: a tall arch with the signature drawing, a sage medallion and a caption. */
function HeroComposition() {
  return (
    <div className="fade-in relative mx-auto aspect-[4/5] w-full max-w-[21rem] sm:max-w-[25rem] lg:max-w-none">
      <ConcentricRings className="absolute top-[46%] left-1/2 w-[150%] max-w-none -translate-1/2 opacity-70" rings={4} />
      <div aria-hidden="true" className="absolute -top-24 bottom-[48%] left-1/2 w-px bg-gradient-to-b from-transparent to-gold/70" />
      <div className="absolute inset-0">
        <ArchVisual visual="signature" animate priority className="h-full" />
      </div>
      <div className="absolute -bottom-6 -left-4 size-32 overflow-hidden rounded-full border-[6px] border-ivory bg-sage-mist shadow-[var(--shadow-soft)] sm:-left-10 sm:size-40">
        <div className="absolute inset-[-8%]">
          <ServiceIllustration name="logo" />
        </div>
      </div>
      <figure className="absolute top-[14%] -right-3 rounded-2xl border border-gold/25 bg-ivory/95 px-4 py-3 shadow-[var(--shadow-soft)] sm:-right-8">
        <p className="eyebrow !text-[0.625rem]">With</p>
        <p className="font-display text-[1.25rem] leading-tight text-plum">{pranav.name}</p>
        <p className="text-[0.75rem] text-muted">{pranav.title}</p>
      </figure>
    </div>
  );
}
