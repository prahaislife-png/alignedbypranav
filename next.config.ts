import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";
const isProductionDeployment = process.env.VERCEL_ENV === "production";

/**
 * Content Security Policy. Only the analytics hosts that load after consent
 * are allowed. 'unsafe-inline' is required for Next.js inline bootstrap
 * scripts on statically generated pages (nonces would force every page to
 * render dynamically).
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://connect.facebook.net`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://www.facebook.com",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://www.facebook.com https://connect.facebook.net",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

// The WhatsApp number defaults to the one in src/config/site.ts. An invalid
// override in the environment would send every button to the Contact page.
const whatsappOverride = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
const whatsappDigits = (whatsappOverride ?? "").replace(/[\s\-().+]/g, "").replace(/^00/, "");
if (isProductionDeployment && whatsappOverride && !/^[1-9]\d{7,14}$/.test(whatsappDigits)) {
  console.warn("\n⚠ NEXT_PUBLIC_WHATSAPP_NUMBER is invalid – WhatsApp buttons will link to /contact.\n");
}

if (!isProductionDeployment) {
  // Preview deployments and local builds are never indexed.
  securityHeaders.push({ key: "X-Robots-Tag", value: "noindex, nofollow" });
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
