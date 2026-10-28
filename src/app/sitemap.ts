import type { MetadataRoute } from "next";
import { services } from "@/data/services";
import { absoluteUrl } from "@/lib/seo";

/**
 * Indexable pages only. Advertising landing pages (/lp/*) are deliberately
 * excluded – they are `noindex` and canonicalise without UTM parameters.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    ...services.map((s) => ({ path: `/services/${s.slug}`, priority: 0.8 })),
    { path: "/tools", priority: 0.8 },
    { path: "/tools/signature-check", priority: 0.8 },
    { path: "/tools/watch-check", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/faq", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
    { path: "/disclaimer", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({ url: absoluteUrl(path), priority }));
}
