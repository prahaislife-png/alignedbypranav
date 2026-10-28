import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { isIndexable, siteUrl } from "@/config/env";
import { site } from "@/config/site";
import { AnalyticsManager } from "@/components/analytics/analytics-manager";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { organizationJsonLd, personJsonLd } from "@/lib/seo";
import "./globals.css";

/* Typefaces (all SIL Open Font License, files and licences in src/fonts):
   BluuNext by Jean-Baptiste Morizot / Velvetyne – display
   Apfel Grotezk by Collletttivo – text
   Fragment Mono by Wei Huang – margin notes and annotations */
const bluu = localFont({
  variable: "--font-bluu",
  display: "swap",
  src: [
    { path: "../fonts/bluu-next-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/bluu-next-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

const apfel = localFont({
  variable: "--font-apfel",
  display: "swap",
  src: [
    { path: "../fonts/apfel-grotezk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/apfel-grotezk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

const fragment = localFont({
  variable: "--font-fragment",
  display: "swap",
  preload: false,
  src: [{ path: "../fonts/fragment-mono-latin-400-normal.woff2", weight: "400", style: "normal" }],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} · Signature, Handwriting & Alignment Consultations`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: "Pranav Vibhute" }],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en",
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f3f1eb",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bluu.variable} ${apfel.variable} ${fragment.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <ConsentBanner />
        <AnalyticsManager />
        <JsonLd data={[organizationJsonLd(), personJsonLd()]} />
      </body>
    </html>
  );
}
