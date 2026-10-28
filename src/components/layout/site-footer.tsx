import Link from "next/link";
import { legalNavigation, mainNavigation, site } from "@/config/site";
import { services } from "@/data/services";
import { Handwriting } from "@/components/brand/handwriting";
import { CookiePreferencesButton } from "@/components/analytics/cookie-preferences-button";
import { WhatsAppCta } from "@/components/whatsapp/whatsapp-cta";
import { InstagramIcon } from "./social-icons";
import { CopyrightYear } from "./copyright-year";

/** Footer on the night page, signed off with "aligned" written in gold ink as it scrolls into view. */
export function SiteFooter() {
  return (
    <footer data-hide-sticky className="on-dark relative overflow-hidden bg-night text-paper/80">
      <div className="container-page relative pt-16 lg:pt-20">
        <div className="flex flex-col gap-8 border-b border-gold/30 pb-10 md:flex-row md:items-end md:justify-between">
          <Link href="/" className="inline-block text-gold">
            <Handwriting word="aligned" scroll className="h-24 w-auto sm:h-32" strokeWidth={2} />
            <span className="sr-only">Aligned by Pranav – home</span>
          </Link>
          <div className="md:text-right">
            <p className="font-display text-[1.5rem] text-paper italic">{site.tagline}</p>
            <p className="mt-2 font-mono text-[0.75rem] text-gold-light lowercase">
              personal consultations with pranav vibhute
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 md:justify-end">
              <WhatsAppCta placement="footer" variant="light" label="Enquire on WhatsApp" />
              {site.social.instagram && (
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex size-[3.25rem] items-center justify-center border border-paper/40 text-paper transition-colors hover:border-paper"
                  aria-label="Aligned by Pranav on Instagram (opens in a new tab)"
                >
                  <InstagramIcon className="size-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 md:grid-cols-12 md:gap-8">
          <nav aria-label="Consultations" className="md:col-span-6">
            <p className="eyebrow !text-gold-light">§ consultations</p>
            <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {services.map((s) => (
                <li key={s.id} className="flex gap-3">
                  <span className="font-mono text-[0.6875rem] leading-6 text-gold-light/70">{s.number}</span>
                  <Link href={`/services/${s.slug}`} className="text-[0.9375rem] transition-colors hover:text-paper">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Explore" className="md:col-span-3">
            <p className="eyebrow !text-gold-light">§ explore</p>
            <ul className="mt-5 space-y-2.5">
              <li>
                <Link href="/" className="text-[0.9375rem] transition-colors hover:text-paper">
                  Home
                </Link>
              </li>
              {mainNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.9375rem] transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal" className="md:col-span-3">
            <p className="eyebrow !text-gold-light">§ legal</p>
            <ul className="mt-5 space-y-2.5">
              {legalNavigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[0.9375rem] transition-colors hover:text-paper">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesButton className="text-left text-[0.9375rem] transition-colors hover:text-paper" />
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-gold/30 py-8 font-mono text-[0.6875rem] leading-relaxed text-paper/60 md:flex-row md:justify-between">
          <p className="max-w-2xl">
            Consultations are interpretive and reflective. They are not scientific, medical, psychological, legal or
            financial advice, and no particular outcome is promised.{" "}
            <Link href="/disclaimer" className="text-gold-light underline underline-offset-4 hover:text-paper">
              Read the disclaimer
            </Link>
            .
          </p>
          <p className="shrink-0">
            © <CopyrightYear /> {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
