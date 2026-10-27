import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { isIndexable, siteUrl } from "@/config/env";
import { site } from "@/config/site";
import { AnalyticsManager } from "@/components/analytics/analytics-manager";
import { ConsentBanner } from "@/components/analytics/consent-banner";
import { JsonLd } from "@/components/ui/json-ld";
import { organizationJsonLd, personJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  // Only the weights the design uses: 400 and 500, upright and italic (four files).
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
  themeColor: "#f8f5ee",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <ConsentBanner />
        <AnalyticsManager />
        <JsonLd data={[organizationJsonLd(), personJsonLd()]} />
      </body>
    </html>
  );
}
