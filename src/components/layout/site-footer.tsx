import Link from "next/link";
import { legalNavigation, mainNavigation, site } from "@/config/site";
import { services } from "@/data/services";
import { Wordmark } from "@/components/brand/wordmark";
import { AlignmentMark } from "@/components/brand/alignment-mark";
import { CookiePreferencesButton } from "@/components/analytics/cookie-preferences-button";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { InstagramIcon } from "./social-icons";
import { CopyrightYear } from "./copyright-year";

export function SiteFooter() {
  return (
    <footer data-hide-sticky className="on-dark relative overflow-hidden bg-plum-deep text-ivory/80">
      <div aria-hidden="true" className="absolute -top-40 -right-40 size-[34rem] rounded-full border border-gold-light/10" />
      <div aria-hidden="true" className="absolute -top-24 -right-24 size-[26rem] rounded-full border border-gold-light/10" />

      <div className="container-page relative grid gap-12 pt-20 pb-12 md:grid-cols-12 md:gap-8 lg:pt-24">
        <div className="md:col-span-4 lg:col-span-4">
          <Link href="/" className="inline-block">
            <Wordmark tone="dark" size="lg" />
          </Link>
          <p className="mt-6 font-display text-[1.375rem] text-gold-light italic">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-[0.9375rem] leading-relaxed">
            Personal consultations with Pranav Vibhute, Graphologist and Alignment Consultant.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <WhatsAppCta placement="footer" variant="light" label="Enquire on WhatsApp" className="min-h-12 px-6 text-[0.875rem]" />
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-12 items-center justify-center rounded-full border border-ivory/25 text-ivory transition-colors hover:border-ivory"
                aria-label="Aligned by Pranav on Instagram (opens in a new tab)"
              >
                <InstagramIcon className="size-5" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Consultations" className="md:col-span-4 lg:col-span-4">
          <p className="eyebrow !text-gold-light">Consultations</p>
          <ul className="mt-5 space-y-2.5">
            {services.map((s) => (
              <li key={s.id}>
                <Link href={`/services/${s.slug}`} className="text-[0.9375rem] transition-colors hover:text-ivory">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Explore" className="md:col-span-2">
          <p className="eyebrow !text-gold-light">Explore</p>
          <ul className="mt-5 space-y-2.5">
            <li>
              <Link href="/" className="text-[0.9375rem] transition-colors hover:text-ivory">
                Home
              </Link>
            </li>
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[0.9375rem] transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal" className="md:col-span-2">
          <p className="eyebrow !text-gold-light">Legal</p>
          <ul className="mt-5 space-y-2.5">
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[0.9375rem] transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton className="text-left text-[0.9375rem] transition-colors hover:text-ivory" />
            </li>
          </ul>
        </nav>
      </div>

      <div className="container-page relative">
        <div className="flex flex-col gap-5 border-t border-ivory/15 py-8 text-[0.8125rem] text-ivory/65 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-3">
            <AlignmentMark tone="dark" className="mt-0.5 size-6" />
            <p className="max-w-2xl leading-relaxed">
              Consultations are interpretive and reflective. They are not scientific, medical, psychological, legal or
              financial advice, and no particular outcome is promised.{" "}
              <Link href="/disclaimer" className="underline decoration-gold-light/50 underline-offset-4 hover:text-ivory">
                Read the disclaimer
              </Link>
              .
            </p>
          </div>
          <p className="shrink-0">
            © <CopyrightYear /> {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
