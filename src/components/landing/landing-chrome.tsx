import Link from "next/link";
import { legalNavigation, site } from "@/config/site";
import { Wordmark } from "@/components/brand/wordmark";
import { CookiePreferencesButton } from "@/components/analytics/cookie-preferences-button";
import { CopyrightYear } from "@/components/layout/copyright-year";

/**
 * Minimal header for advertising landing pages: brand identity and a route
 * back to the main site, without the full navigation.
 */
export function LandingHeader() {
  return (
    <header className="border-b border-line-soft/80 bg-paper/90">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/">
          <Wordmark size="sm" />
        </Link>
        <Link href="/services" className="text-[0.875rem] text-muted transition-colors hover:text-ink">
          All consultations
        </Link>
      </div>
    </header>
  );
}

export function LandingFooter() {
  return (
    <footer data-hide-sticky className="on-dark bg-night text-paper/70">
      <div className="container-page flex flex-col gap-6 py-10 text-[0.8125rem] md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/">
            <Wordmark tone="dark" size="sm" />
          </Link>
          <p className="mt-3">
            © <CopyrightYear /> {site.name}
          </p>
        </div>
        <nav aria-label="Legal and site links">
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/" className="hover:text-paper">
                Main website
              </Link>
            </li>
            {legalNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-paper">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <CookiePreferencesButton className="hover:text-paper" />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
