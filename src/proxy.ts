import { NextResponse, type NextRequest } from "next/server";
import { services } from "@/data/services";
import { landingPages } from "@/data/landing-pages";

const serviceSlugs = new Set<string>(services.map((s) => s.slug));
const variantKeys = new Map<string, Set<string>>(
  landingPages.map((p) => [p.serviceId, new Set(Object.keys(p.variants))]),
);

/**
 * Returns a real 404 for unknown service and landing-page slugs before any
 * rendering happens. Without this, the first request to an unknown slug
 * would receive the prerendered shell with a 200 status (a "soft 404") and
 * random URLs could fill the page cache.
 */
export function proxy(request: NextRequest) {
  const [, section, slug, variant, ...rest] = request.nextUrl.pathname.split("/");
  const known =
    rest.length === 0 &&
    serviceSlugs.has(slug) &&
    (variant === undefined || (section === "lp" && variantKeys.get(slug)?.has(variant)));

  if (known) return NextResponse.next();
  return NextResponse.rewrite(new URL("/__not-found", request.url));
}

export const config = {
  matcher: ["/services/:slug", "/lp/:slug", "/lp/:slug/:variant"],
};
