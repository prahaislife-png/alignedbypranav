"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { mainNavigation } from "@/config/site";
import { Wordmark } from "@/components/brand/wordmark";
import { TrackedWhatsAppLink } from "@/components/whatsapp/tracked-whatsapp-link";
import { WhatsAppIcon } from "@/components/whatsapp/whatsapp-icon";

type ServiceLink = { href: string; title: string; number: string };

/**
 * Full-screen mobile navigation built on the native <dialog> element, which
 * provides focus trapping, Escape-to-close and an inert background.
 */
export function MobileMenu({
  services,
  whatsapp,
}: {
  services: ServiceLink[];
  whatsapp: { href: string; external: boolean };
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    dialog.current?.close();
  }, [pathname]);

  const open = () => {
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="-mr-2 inline-flex size-12 items-center justify-center rounded-full text-plum transition-colors hover:bg-parchment lg:hidden"
        aria-label="Open menu"
        aria-haspopup="dialog"
      >
        <Menu aria-hidden="true" className="size-6" strokeWidth={1.4} />
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        onClose={() => {
          document.documentElement.style.overflow = "";
        }}
        className="paper m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-ivory p-0 text-charcoal backdrop:bg-transparent open:flex open:flex-col lg:hidden"
      >
        <div className="container-page flex h-[4.25rem] shrink-0 items-center justify-between border-b border-line-soft">
          <Link href="/" onClick={close}>
            <Wordmark size="sm" />
          </Link>
          <button
            type="button"
            onClick={close}
            className="-mr-2 inline-flex size-12 items-center justify-center rounded-full text-plum hover:bg-parchment"
            aria-label="Close menu"
          >
            <X aria-hidden="true" className="size-6" strokeWidth={1.4} />
          </button>
        </div>

        <nav aria-label="Mobile" className="container-page flex-1 pt-8 pb-6">
          <p className="eyebrow">Consultations</p>
          <ul className="mt-3 border-t border-line">
            {services.map((s) => (
              <li key={s.href} className="border-b border-line">
                <Link href={s.href} onClick={close} className="flex items-baseline gap-4 py-3.5">
                  <span className="w-6 font-display text-[0.9375rem] text-gold-ink italic">{s.number}</span>
                  <span className="font-display text-[1.375rem] leading-tight text-plum">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-1">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} onClick={close} className="block py-2.5 text-[1.0625rem] text-charcoal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-page shrink-0 border-t border-line-soft bg-parchment/60 pt-5 pb-safe">
          <TrackedWhatsAppLink
            href={whatsapp.href}
            external={whatsapp.external}
            eventProps={{ cta_placement: "mobile_menu" }}
            className="btn btn-primary w-full"
          >
            <WhatsAppIcon className="size-5" />
            <span>Enquire on WhatsApp</span>
            {whatsapp.external && <span className="sr-only"> (opens WhatsApp)</span>}
          </TrackedWhatsAppLink>
          <p className="mt-3 pb-1 text-center text-[0.8125rem] text-muted">Consultations led personally by Pranav Vibhute</p>
        </div>
      </dialog>
    </>
  );
}
