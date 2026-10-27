"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

type ServiceLink = { href: string; title: string; number: string; oneLiner: string };

/** Desktop "Services" disclosure menu. Opens on click or keyboard, closes on Escape / outside click. */
export function ServicesMenu({ services }: { services: ServiceLink[] }) {
  const pathname = usePathname();
  // The menu belongs to the page it was opened on, so it closes itself after navigation.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((was: boolean) => boolean)) =>
    setOpenOn((current) => {
      const was = current === pathname;
      return (typeof next === "function" ? next(was) : next) ? pathname : null;
    });
  const panelId = useId();
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        button.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpenOn(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[0.9375rem] text-charcoal transition-colors hover:text-plum"
      >
        Services
        <ChevronDown aria-hidden="true" strokeWidth={1.5} className={cn("size-4 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 mt-3 w-[46rem] -translate-x-1/2 rounded-2xl border border-gold/25 bg-ivory p-3 shadow-[var(--shadow-lift)]"
      >
        <ul className="grid grid-cols-2 gap-1">
          {services.map((s) => (
            <li key={s.href}>
              <Link href={s.href} className="group flex gap-4 rounded-xl px-4 py-3.5 transition-colors hover:bg-parchment/70">
                <span className="pt-1 font-display text-[0.9375rem] text-gold-ink italic">{s.number}</span>
                <span>
                  <span className="block font-display text-[1.25rem] leading-tight text-plum">{s.title}</span>
                  <span className="mt-1 block text-[0.8125rem] leading-snug text-muted">{s.oneLiner}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link href="/services" className="flex h-full items-center gap-3 rounded-xl bg-parchment/60 px-4 py-3.5 text-[0.9375rem] font-medium text-plum transition-colors hover:bg-parchment">
              <span className="link-line">View all consultations</span>
              <span aria-hidden="true">→</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
