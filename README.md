# Aligned by Pranav

The website for **Aligned by Pranav**: personalised, expert-led consultations with Pranav Vibhute,
Graphologist and Alignment Consultant. The site exists to turn visitors, especially from Instagram and
Facebook ads, into WhatsApp enquiries.

- **Stack:** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4, Lucide icons
- **Hosting:** Vercel, deployed automatically from GitHub
- **No database, no forms, no logins.** All content lives in typed files in `src/data` and `src/config`.

---

## Contents

1. [Quick start](#1-quick-start)
2. [Editing content](#2-editing-content)
3. [Ad landing pages and campaign links](#3-ad-landing-pages-and-campaign-links)
4. [Analytics, consent and measurement](#4-analytics-consent-and-measurement)
5. [SEO and indexing](#5-seo-and-indexing)
6. [Deploying to GitHub and Vercel](#6-deploying-to-github-and-vercel)
7. [Project structure](#7-project-structure)
8. [Quality checks](#8-quality-checks)
9. [Further documents](#9-further-documents)

---

## 1. Quick start

Requirements: **Node.js 20.9 or newer** (22 recommended) and npm.

```bash
npm install                 # 1. install dependencies
cp .env.example .env.local  # 2. add local settings (optional, see below)
npm run dev                 # 3. run locally at http://localhost:3000
```

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Local development server with hot reload             |
| `npm test`          | Unit tests (WhatsApp links, pricing, content rules)  |
| `npm run lint`      | ESLint                                               |
| `npm run typecheck` | Generates route types, then runs TypeScript          |
| `npm run check`     | Typecheck + lint + tests in one go                   |
| `npm run build`     | Production build                                     |
| `npm start`         | Serves the production build locally (after `build`)  |

To try WhatsApp buttons locally, put a number in `.env.local`, e.g.
`NEXT_PUBLIC_WHATSAPP_NUMBER=+91 98765 43210`. Without one, the business number in `src/config/site.ts` is used; if that is
removed or invalid, every WhatsApp button safely points to `/contact`.

---

## 2. Editing content

You never need to edit components to change wording, prices or contact details. Edit the file below,
commit, push to GitHub, and Vercel redeploys automatically (about a minute).

| To change…                         | Edit                                     | Notes |
| ---------------------------------- | ---------------------------------------- | ----- |
| **WhatsApp number**                | `src/config/site.ts` → `WHATSAPP_NUMBER`   | International format. The Vercel env var `NEXT_PUBLIC_WHATSAPP_NUMBER` overrides it (redeploy after changing). |
| Contact email, Instagram, Facebook | Vercel env vars `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL` | Hidden on the site until set. |
| **Pranav’s photograph**            | `src/data/pranav.ts` → `portrait`        | Put the file in `public/images/portrait/`, then set `{ src, alt, width, height }`. Use a real, approved photo only. |
| **Biography**                      | `src/data/pranav.ts` → `shortBio`, `longBio`, `approach` | Set `bioApproved: true` once Pranav approves the wording. |
| **Service descriptions**           | `src/data/services.ts`                   | One object per service: intro, explores, process, FAQs, SEO text. |
| **Starting prices**                | `src/data/services.ts` → `pricing`       | `startingPriceINR`, `startingPriceEUR` (plain numbers, e.g. `2500`), plus `format`, `duration`, `deliverables`, `notes`. Leave `null` until confirmed; the site then shows “Starting price available on enquiry”. INR and EUR are never converted from each other. |
| Service images (optional)          | `src/data/services.ts` → `image`         | Approved photos in `public/images/services/`. Otherwise the original line illustration is used. |
| **Homepage headings and text**     | `src/data/home.ts`                       | Wrap words in `*asterisks*` to set them in italic gold. |
| Featured services on homepage      | `src/data/home.ts` → `featuredServiceIds` | Any two (or more) service ids. |
| General FAQ                        | `src/data/faqs.ts`                        | `homepageFaqCount` sets how many show on the homepage. |
| **Free Signature Specimen Check**  | `src/data/signature-check.ts`             | Questions, free and paid steps, practice-sheet wording and all copy. Measurements live in `src/lib/signature-check/` and only describe; never add interpretations. |
| **Free Watch Specimen Check**      | `src/data/watch-check.ts`                 | Questions (replace with Pranav’s own checklist), the free and paid steps, their prices (`null` → “Price shared on WhatsApp”) and all copy. The tool records only; never add interpretations here. |
| **Landing-page headings and CTAs** | `src/data/landing-pages.ts`               | `copy.headline`, `copy.description`, `copy.ctaLabel`, `copy.heroVisual`. |
| **CTA text elsewhere**             | `src/data/home.ts` (homepage), `src/data/landing-pages.ts` (ads). Prefilled WhatsApp messages: `src/lib/whatsapp.ts`. | |
| **Approved testimonials**          | `src/data/testimonials.ts` → `testimonials` | Real, consented quotes only. `consentRecorded: true` is required or the quote is never shown. The section is hidden while the list is empty. |
| Real examples of work              | `src/data/testimonials.ts` → `caseExamples` | Anonymised, consented examples with an image. Hidden while empty. |
| Legal entity, address, governing law | `src/config/site.ts` → `legal`          | Fills the highlighted placeholders on the legal pages. Set `lastUpdated` after legal review to remove the “Draft” notice. |
| Brand name, tagline, description   | `src/config/site.ts`                      | |
| **Logo / wordmark**                | `src/components/brand/wordmark.tsx`, favicon `src/app/icon.svg`, home-screen icon `src/app/apple-icon.tsx`, social image `src/lib/og.tsx` | “aligned” is a single pen stroke (EMS Allure) on a red-pen baseline, with “by pranav” in Fragment Mono. Handwritten words are generated by `node scripts/generate-handwriting.mjs` into `src/components/brand/handwriting-data.ts`. |
| **Colours**                        | `src/app/globals.css` → `@theme`           | Change a token once (e.g. `--color-plum`) and it updates everywhere. Keep the `-ink` tones for small text: they are tuned for accessible contrast. |
| Fonts                              | `src/app/layout.tsx`, files in `src/fonts` | BluuNext (display), Apfel Grotezk (text) and Fragment Mono (margin notes), all SIL Open Font License, self-hosted. Licences sit next to the files. |
| **Analytics settings**             | Vercel env vars `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_VERCEL_ANALYTICS` | See section 4. |
| **Domain**                         | Vercel domain settings + `NEXT_PUBLIC_SITE_URL` | See section 6. |

**Content rules (please keep):** describe what each consultation explores; never promise outcomes such as
success, wealth, luck, healing or personality prediction; never present graphology as scientific, medical or
psychological assessment; add only confirmed prices, credentials and testimonials. `npm test` includes a check
that flags common outcome-promising phrases if they are added by mistake.

---

## 3. Ad landing pages and campaign links

Every service has a lightweight landing page designed for mobile ad traffic, with minimal navigation:

| Service | Landing page |
| --- | --- |
| Signature & Handwriting Analysis | `/lp/signature-handwriting-analysis` |
| Business Logo Analysis & Design | `/lp/business-logo-analysis` |
| Wristwatch & Clock Alignment | `/lp/wristwatch-clock-alignment` |
| Business & Office Clock Alignment | `/lp/business-office-clock-alignment` |
| Phone Number Selection & Alignment | `/lp/phone-number-alignment` |
| Drawing Analysis | `/lp/drawing-analysis` |
| Vision Board Alignment | `/lp/vision-board-alignment` |

**Use UTM parameters on every ad link**, lowercase with underscores:

```
https://<your-domain>/lp/signature-handwriting-analysis?utm_source=instagram&utm_medium=paid_social&utm_campaign=signature_launch&utm_content=reel_a
https://<your-domain>/lp/business-logo-analysis?utm_source=facebook&utm_medium=paid_social&utm_campaign=logo_launch
```

UTM parameters never change the page or create duplicate search results (canonical URLs ignore them, and
landing pages are `noindex`).

**A/B tests (headline, CTA label, hero visual):** add a variant in `src/data/landing-pages.ts`:

```ts
variants: {
  b: { headline: "See Your Signature Through a Graphologist’s Eyes", ctaLabel: "Ask Pranav About Your Signature" },
},
```

…then point the second ad at `/lp/signature-handwriting-analysis/b`. Only the fields you set change. Variant
names are reported in analytics as `landing_variant`. Two example variants already exist (signature and logo).

---

## 4. Analytics, consent and measurement

- **Nothing optional loads without consent.** With no analytics IDs configured, the site sets no tracking at all
  and shows no cookie banner. Once an ID is configured, a banner offers equally prominent **Accept** and
  **Reject** buttons plus **Manage preferences**. Visitors can change their choice any time via
  **Cookie preferences** in the footer. Withdrawing consent disables GA4, revokes the Meta Pixel and deletes their cookies.
- Supported integrations (all optional, all via environment variables):
  - **Google Analytics 4**: `NEXT_PUBLIC_GA4_ID` (analytics category)
  - **Vercel Web Analytics**: enable it in Vercel, then set `NEXT_PUBLIC_VERCEL_ANALYTICS=true` (analytics category)
  - **Meta Pixel**: `NEXT_PUBLIC_META_PIXEL_ID` (advertising category)
- **Events:** `landing_page_view`, `service_view`, `pricing_view`, `whatsapp_click`, plus page views.
  Properties: `service_id`, `landing_page_id`, `landing_variant`, `cta_placement`, `price_available` and the visit’s
  UTM parameters. Names, phone numbers and message text are never sent. `whatsapp_click` is also sent to Meta as a
  standard **Contact** event so ad campaigns can optimise for it.
- **A WhatsApp click is not a lead.** Read [`docs/CONVERSION_MEASUREMENT.md`](docs/CONVERSION_MEASUREMENT.md)
  for what the site can and cannot measure, how to set up GA4 key events, and the manual lead-tracking sheet
  ([`docs/lead-tracking-template.csv`](docs/lead-tracking-template.csv)).

---

## 5. SEO and indexing

- Unique titles, descriptions and canonical URLs per page; Open Graph and social images (branded images are
  generated automatically, including one per service); XML sitemap at `/sitemap.xml`; `robots.txt`.
- Structured data: ProfessionalService, Person (Pranav), Service, BreadcrumbList and FAQPage, using factual fields only
  (no address, ratings or prices until real).
- **Only the Vercel production deployment is indexable.** Preview deployments and local builds send
  `noindex` (meta tag, `X-Robots-Tag` header and `robots.txt`), so previews never appear in Google.
- Ad landing pages (`/lp/*`) are `noindex, follow` and excluded from the sitemap. They stay crawlable so that ad
  platforms can review them.

---

## 6. Deploying to GitHub and Vercel

### Push to GitHub

The repository is `prahaislife-png/alignedbypranav`. For a fresh local copy:

```bash
git clone https://github.com/prahaislife-png/alignedbypranav.git
cd alignedbypranav
npm install
```

After editing: `git add -A && git commit -m "Describe the change" && git push`.
CI (GitHub Actions) runs typecheck, lint, tests and a production build on every push and pull request.

### Import into Vercel (one time)

1. Sign in at [vercel.com](https://vercel.com) with GitHub → **Add New… → Project** → import `alignedbypranav`.
2. Framework preset: **Next.js** (detected automatically). Leave build and output settings as default.
3. **Environment Variables** (Production and Preview):
   `NEXT_PUBLIC_SITE_URL`, and optionally `NEXT_PUBLIC_WHATSAPP_NUMBER` (overrides the number in `src/config/site.ts`),
   `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`,
   `NEXT_PUBLIC_GA4_ID`, `NEXT_PUBLIC_META_PIXEL_ID`, `NEXT_PUBLIC_VERCEL_ANALYTICS`.
4. **Deploy.** From then on, every push to `main` deploys to production and every other branch or pull
   request gets its own preview URL.

### Connect a custom domain

1. Vercel → Project → **Settings → Domains** → add e.g. `www.alignedbypranav.com` (and the bare domain,
   redirecting to `www`).
2. Add the DNS records Vercel shows at your domain registrar. HTTPS certificates are issued automatically.
3. Set `NEXT_PUBLIC_SITE_URL=https://www.alignedbypranav.com` and **redeploy**.

### Verify the deployment

- Open `/`, one `/services/...` page and one `/lp/...` page on your phone.
- Tap a WhatsApp button: WhatsApp should open with the service-specific message and the correct number.
- `/robots.txt` on the production domain should allow crawling and list the sitemap; on a preview URL it
  should disallow everything.
- `/sitemap.xml` should list your real domain.
- Share a page link in WhatsApp or paste it into the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to check the social image.
- If analytics is configured: accept cookies, then check GA4 **Realtime** and Meta **Events Manager → Test events**.

---

## 7. Project structure

```
src/
  app/                    Routes (App Router)
    (site)/               Main site: home, about, services, faq, contact, legal pages
    (landing)/lp/         Ad landing pages (+ /lp/<service>/<variant> for A/B tests)
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg apple-icon.tsx not-found.tsx
  components/
    analytics/            Consent banner, analytics loader, view trackers
    brand/                Wordmark and alignment mark
    home/ services/ landing/ layout/ legal/ ui/ whatsapp/ illustrations/
  config/                 env.ts (environment variables), site.ts (brand, contact, legal, navigation)
  data/                   All editable content (services, landing pages, home, FAQ, Pranav, testimonials)
  lib/                    whatsapp.ts, pricing.ts, seo.ts, og.tsx, analytics/
  types/                  Shared content types
  proxy.ts                Returns a proper 404 for unknown service/landing slugs
public/images/            Approved photographs (portrait/, services/)
docs/                     Measurement guide, lead-tracking template, prelaunch checklist
```

Server Components are the default; client-side JavaScript is limited to the consent banner, analytics, the
mobile menu, the services dropdown, the currency selector, the sticky WhatsApp bar and the free tools
(signature and watch checks, which process everything on the visitor’s device only). Motion is pure CSS, with
no animation library: handwriting is written on with `stroke-dashoffset` (a pen nib follows it via `offset-path`),
and illustrations, rules and headings ink in as they scroll into view using scroll-driven animations
(`animation-timeline: view()`; browsers without support simply show the finished state). All of it switches off
for visitors who prefer reduced motion.

---

## 8. Quality checks

Before pushing larger changes, run:

```bash
npm run check && npm run build
```

Security headers (CSP, HSTS, frame and referrer policies) are set in `next.config.ts`. If you add a new
third-party service, add its domain to the Content Security Policy there.

---

## 9. Further documents

- [`docs/PRELAUNCH_CHECKLIST.md`](docs/PRELAUNCH_CHECKLIST.md): everything to confirm before going live
- [`docs/CONVERSION_MEASUREMENT.md`](docs/CONVERSION_MEASUREMENT.md): funnel definitions, analytics setup, lead tracking
- [`docs/lead-tracking-template.csv`](docs/lead-tracking-template.csv): manual enquiry tracking sheet
- [`FUTURE_SUPABASE_PLAN.md`](FUTURE_SUPABASE_PLAN.md): when (and how) to add a database later
- [`marketing/instagram-ad-pack/`](marketing/instagram-ad-pack/README.md): Instagram/Facebook creatives, ad copy, campaign setup and organic plan
- `AGENTS.md`: notes for AI coding assistants working on this repository
