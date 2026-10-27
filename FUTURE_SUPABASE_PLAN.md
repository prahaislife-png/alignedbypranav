# Future Supabase plan

**Status: not implemented. Version 1 deliberately has no database.**

Version 1 is a content website whose only conversion is a WhatsApp enquiry handled personally by Pranav. It
needs no accounts, storage, forms or records, so adding a database would only add cost, maintenance and
privacy obligations. This document describes when that changes and how to add Supabase safely when it does.

## When Supabase would be justified

Introduce it only for a concrete requirement, typically one of:

| Need | Trigger that justifies it |
|------|---------------------------|
| 1. Lead management | The manual lead sheet becomes unmanageable (for example dozens of enquiries a week) or more people need shared access |
| 2. Consultation scheduling | Booking by WhatsApp messages wastes significant time and a self-service booking flow is wanted |
| 3. Client profiles | Repeat clients need history across several consultations |
| 4. Secure report uploads/downloads | Pranav starts delivering written reports or receiving samples and WhatsApp is no longer appropriate |
| 5. Private client dashboards | Clients need to log in to see their reports or bookings |
| 6. Payment records | Online payment is introduced and payments must be reconciled with consultations |
| 7. Administrative reporting | The cofounders need reporting that combines leads, consultations and revenue |

If none of these apply, keep using WhatsApp Business plus the spreadsheet in `docs/lead-tracking-template.csv`.

## How to add it safely

- **Follow Supabase’s current official Next.js guidance** (`@supabase/ssr`) at the time of implementation, using
  cookie-based sessions with Server Components, Server Actions and Route Handlers.
- **Keys:** only the public anon/publishable key may ever reach the browser. The service-role/secret key stays
  server-side (Vercel environment variable without the `NEXT_PUBLIC_` prefix) and is used only in server code
  that validates its input.
- **Row Level Security** enabled on every table from day one. Clients may read only their own rows;
  administrative access goes through a separate role checked server-side.
- **Storage:** confidential material (signatures, handwriting samples, drawings, especially children’s,
  reports) goes in **private** buckets, accessed via short-lived signed URLs. Never in public buckets.
- **Children’s drawings:** require verifiable parental consent, strip identifying details, and set an automatic
  deletion schedule.
- **Data minimisation and retention:** collect only what each feature needs; implement deletion and export
  requests (India DPDP Act, EU GDPR); choose a Supabase region suited to the user base (e.g. EU for European
  clients) and sign Supabase’s data processing agreement.
- **Consent:** keep analytics consent independent of any account data. Never send consultation content to
  analytics or advertising platforms.
- **Migrations** in version control (`supabase/migrations`), tested on a separate Supabase project for Preview
  deployments, never against production data.

## Suggested phasing

1. **Lead inbox:** a private admin-only table populated manually or by a WhatsApp Business API integration. No public forms.
2. **Scheduling:** consultation slots and bookings, still confirmed by Pranav.
3. **Client accounts and private reports:** authentication, RLS-protected profiles, private storage, signed URLs.
4. **Payments and reporting:** payment provider webhooks writing to server-only tables; admin reports.

Each phase should update the Privacy Policy, the cookie table and the prelaunch checklist before it goes live.

## Where it would plug into this codebase

- New server-only modules in `src/lib/supabase/` (server client, admin client).
- New routes under `src/app/(account)/` and `src/app/(admin)/` with their own layouts.
- Content (`src/data`) stays file-based. A CMS or database is not needed for marketing copy.
