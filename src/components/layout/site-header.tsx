import Link from "next/link";
import { mainNavigation } from "@/config/site";
import { services } from "@/data/services";
import { Wordmark } from "@/components/brand/wordmark";
import { resolveWhatsApp } from "@/components/whatsapp/whatsapp-cta";
import { TrackedWhatsAppLink } from "@/components/whatsapp/tracked-whatsapp-link";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";
import { MobileMenu } from "./mobile-menu";
import { ServicesMenu } from "./services-menu";

export function SiteHeader() {
  const whatsapp = resolveWhatsApp();
  const serviceLinks = services.map((s) => ({ href: `/services/${s.slug}`, title: s.title, number: s.number, oneLiner: s.oneLiner }));

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft/80 bg-ivory/90 backdrop-blur-md supports-[backdrop-filter]:bg-ivory/80">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-plum focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="container-page flex h-[4.25rem] items-center justify-between gap-6 lg:h-[5rem]">
        <Link href="/" className="relative -my-2 py-2">
          <span className="lg:hidden">
            <Wordmark size="sm" />
          </span>
          <span className="hidden lg:block">
            <Wordmark size="md" />
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <ServicesMenu services={serviceLinks} />
          {mainNavigation.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-[0.9375rem] text-charcoal transition-colors hover:text-plum"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <TrackedWhatsAppLink
            href={whatsapp.href}
            external={whatsapp.external}
            eventProps={{ cta_placement: "header" }}
            className="btn btn-outline hidden min-h-11 px-5 text-[0.875rem] sm:inline-flex"
          >
            <WhatsAppIcon className="size-4" />
            <span>Enquire</span>
            {whatsapp.external && <span className="sr-only"> on WhatsApp (opens WhatsApp)</span>}
          </TrackedWhatsAppLink>
          <MobileMenu services={serviceLinks} whatsapp={whatsapp} />
        </div>
      </div>
    </header>
  );
}
