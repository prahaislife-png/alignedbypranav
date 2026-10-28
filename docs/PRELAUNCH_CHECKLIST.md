# Prelaunch checklist

Work through this list before pointing ads or the public domain at the site. Items marked **Business**
need information only Pranav or the cofounders can provide.

## 1. Business information (required)

- [x] **Business:** WhatsApp Business number set in `src/config/site.ts` (+49 1512 5937315). `NEXT_PUBLIC_WHATSAPP_NUMBER` in Vercel overrides it if ever needed.
- [ ] **Business:** Pranav’s approved portrait photograph → `public/images/portrait/` + `src/data/pranav.ts → portrait`.
      Until then an abstract “PV” monogram placeholder is shown.
- [ ] **Business:** Pranav approves the biography (`shortBio`, `longBio`, `approach` in `src/data/pranav.ts`), then set `bioApproved: true`.
      Add any verified credentials or experience only if Pranav wants them published.
- [ ] **Business:** Confirmed starting prices per service in INR and/or EUR (`src/data/services.ts → pricing`), or leave
      `null` to show “Starting price available on enquiry”.
- [ ] **Business:** Consultation format (online / in person), duration and deliverables per service, if they should be published.
- [ ] **Business:** Preparation guidance per service, if any (`preparation`, currently hidden).
- [ ] **Business:** Pranav reviews every FAQ answer (`src/data/faqs.ts` and each service’s `faqs`) and the service copy,
      then sets `reviewedByPranav: true` on each FAQ.
- [ ] **Business:** Contact email (optional) → `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] **Business:** Instagram / Facebook profile URLs (optional) → `NEXT_PUBLIC_INSTAGRAM_URL`, `NEXT_PUBLIC_FACEBOOK_URL`.
- [ ] **Business:** Domain name purchased and connected in Vercel → `NEXT_PUBLIC_SITE_URL`.
- [ ] **Business (optional):** Real, consented testimonials and anonymised examples → `src/data/testimonials.ts`.

## 2. Legal and privacy (required)

- [ ] **Business:** Legal entity name, postal address, governing law, privacy contact → `src/config/site.ts → legal`.
- [ ] **Business:** Retention period for WhatsApp enquiries and consultation material (Privacy Policy section 3).
- [ ] **Business:** Grievance contact for India’s DPDP Act (Privacy Policy section 8).
- [ ] **Business:** Payment methods, taxes, rescheduling / cancellation / refund policy, and ownership of design
      deliverables (Terms sections 4, 5 and 7).
- [ ] Have a qualified legal adviser review the Privacy Policy, Terms and Consultation Disclaimer for India and the EU.
      Then set `legal.lastUpdated` to remove the “Draft for review” notice.
- [ ] Decide internally how children’s drawings will be received, stored and deleted (parental consent, no identifying details).
- [ ] If GA4 is used for EU visitors: enable data retention limits and review Google’s data-processing terms; if the Meta
      Pixel is used, accept Meta’s Business Tools terms and complete domain verification.
- [ ] Confirm nothing copied from the Excellence Drive website (logo, text, testimonials, photos, address,
      certifications, statistics) appears on this site without explicit approval.

## 3. Analytics (optional)

- [ ] GA4 property created → `NEXT_PUBLIC_GA4_ID`; `whatsapp_click` marked as a key event; custom dimensions registered.
- [ ] Meta Pixel created → `NEXT_PUBLIC_META_PIXEL_ID`; Contact event verified in Test events.
- [ ] (Optional) Vercel Web Analytics enabled → `NEXT_PUBLIC_VERCEL_ANALYTICS=true`.
- [ ] Confirm the cookie banner appears once IDs are set, Reject keeps everything off, and Accept loads the tools.
- [ ] Lead-tracking spreadsheet created from `docs/lead-tracking-template.csv`.

## 4. Technical verification on the production domain

- [ ] Every WhatsApp button opens WhatsApp with the correct number and a service-specific message (test on iPhone,
      Android, and desktop WhatsApp / WhatsApp Web).
- [ ] Each `/lp/...` page tested from inside the Instagram app (in-app browser): layout, sticky bar, WhatsApp hand-off.
- [ ] `/robots.txt` allows crawling and lists `/sitemap.xml` with the real domain; a preview URL disallows crawling.
- [ ] Social preview checked in the Facebook Sharing Debugger and by sharing a link in WhatsApp.
- [ ] Google Search Console: verify the domain and submit `/sitemap.xml`.
- [ ] Run PageSpeed Insights (mobile) on `/`, one service page and one landing page; note the scores.
- [ ] Check the 404 page and that `/services/unknown` returns a 404.
- [ ] GitHub Actions CI is green on `main`.

## 5. Ads

- [ ] Ad URLs point to the `/lp/...` pages with UTM parameters (see README section 3).
- [ ] Ad copy uses the same careful, non-promissory wording as the site (Meta reviews claims about personal attributes
      and outcomes).
- [ ] A/B variants (if any) defined in `src/data/landing-pages.ts` and live at `/lp/<service>/<variant>`.
