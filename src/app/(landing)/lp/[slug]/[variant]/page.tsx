import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPage, landingVariantParams, resolveLandingCopy } from "@/data/landing-pages";
import { getService, services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { LandingPageView } from "@/components/landing/landing-page-view";

/** A/B test variants defined in src/data/landing-pages.ts, served at /lp/<slug>/<variant>. */
export function generateStaticParams() {
  const params = landingVariantParams();
  // At least one param is required at build time; this placeholder renders a 404.
  return params.length ? params : [{ slug: services[0].slug, variant: "none" }];
}

export async function generateMetadata({ params }: PageProps<"/lp/[slug]/[variant]">): Promise<Metadata> {
  const { slug, variant } = await params;
  const page = getLandingPage(slug);
  if (!page || !page.variants[variant]) return {};
  const copy = resolveLandingCopy(page, variant);
  return pageMetadata({ title: copy.headline, description: copy.description, path: `/lp/${slug}`, noindex: true });
}

export default async function LandingVariantPage({ params }: PageProps<"/lp/[slug]/[variant]">) {
  const { slug, variant } = await params;
  const page = getLandingPage(slug);
  const service = getService(slug);
  if (!page || !service || !page.variants[variant]) notFound();
  return <LandingPageView page={page} service={service} variantKey={variant} />;
}
