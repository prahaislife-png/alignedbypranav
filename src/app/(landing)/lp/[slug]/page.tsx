import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPage, landingPages, resolveLandingCopy } from "@/data/landing-pages";
import { getService } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { LandingPageView } from "@/components/landing/landing-page-view";

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.serviceId }));
}

/**
 * Advertising landing pages are `noindex` so they never compete with the
 * service pages in search. UTM parameters never change the canonical URL.
 */
export async function generateMetadata({ params }: PageProps<"/lp/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  const copy = resolveLandingCopy(page);
  return pageMetadata({ title: copy.headline, description: copy.description, path: `/lp/${slug}`, noindex: true });
}

export default async function LandingPage({ params }: PageProps<"/lp/[slug]">) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  const service = getService(slug);
  if (!page || !service) notFound();
  return <LandingPageView page={page} service={service} />;
}
