import type { MetadataRoute } from "next";
import { isIndexable } from "@/config/env";
import { absoluteUrl } from "@/lib/seo";

/**
 * Production: crawlable, with a sitemap. Landing pages stay crawlable so ad
 * platforms can review them; they carry a `noindex` tag instead.
 * Previews and local builds: nothing is crawlable.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
