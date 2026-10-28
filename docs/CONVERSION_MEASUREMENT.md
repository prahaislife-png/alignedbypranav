# Conversion measurement

How to measure what the website and ad campaigns actually achieve, and the limits of what the website can see.

## 1. The funnel

| # | Stage | What it means | Who can observe it |
|---|-------|---------------|--------------------|
| 1 | **Ad click** | Someone taps an Instagram/Facebook ad | Meta Ads Manager |
| 2 | **Website visit** | The landing page loads | GA4 / Vercel Analytics / Meta Pixel, **only with the visitor’s consent** |
| 3 | **WhatsApp button click** (`whatsapp_click`) | The visitor tapped a WhatsApp button | Website analytics, **only with consent** |
| 4 | **WhatsApp conversation** | The visitor actually sent a message | Only you, in WhatsApp Business |
| 5 | **Qualified enquiry** | A genuine, relevant enquiry for a service | Only you (manual judgement) |
| 6 | **Confirmed consultation** | A consultation is agreed and scheduled | Only you |
| 7 | **Paid customer** | Payment received | Only you |

The website can measure only stages 2 and 3, and only for visitors who accept analytics. Expect the numbers in
analytics tools to be lower than real traffic.

The tool events never include the image, the measurements, the colours or the visitor's answers. The tools'
WhatsApp buttons use `cta_placement` `watch_check_first_look` / `signature_check_first_look` (free first look) and
`watch_check_report` / `signature_check_report` (paid consultation).

**A `whatsapp_click` is not a lead, a conversation, a booking or a sale.** Many people tap the button and never
send the message, or WhatsApp may not be installed on a desktop. Never report clicks as leads.

### Click-to-WhatsApp ads

If you run Meta ads that open WhatsApp directly (“Click to WhatsApp” objective), the visitor never reaches the
website. Website analytics cannot see those people at all. Measure them in Meta Ads Manager (“Messaging
conversations started”) and in the lead-tracking sheet below.

## 2. What the website records

| Event | When | Properties |
|-------|------|------------|
| page view | Each page, including client-side navigation | page path and title |
| `landing_page_view` | An ad landing page is viewed | `service_id`, `landing_page_id`, `landing_variant` |
| `service_view` | A service page is viewed | `service_id` |
| `pricing_view` | The consultation details / price panel scrolls into view | `service_id`, `landing_page_id`, `price_available` |
| `whatsapp_click` | Any WhatsApp button is tapped | `service_id`, `landing_page_id`, `landing_variant`, `cta_placement` |
| `tool_start` | A free tool is started (a photo opened, or the first stroke of a signature) | `tool`, `input_method` (signature: `draw` / `photo`) |
| `tool_complete` | A specimen sheet is created | `tool`, `service_id`, `input_method` |
| `tool_save` | A sheet is saved, shared or printed | `tool`, `save_method` (`share` / `download` / `print`), `sheet` (signature: `specimen` / `share_safe` / `practice`) |

All events also carry the visit’s UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`,
`utm_term`) when present. No names, numbers, message text, signatures or drawings are ever sent.

`cta_placement` values: `header`, `mobile_menu`, `hero`, `services_unsure`, `featured`, `service_hero`, `pricing`,
`final_cta`, `sticky_mobile`, `footer`, `contact_page`, `about`, `landing_hero`, `landing_details`, `landing_final`.

Meta Pixel receives `whatsapp_click` as the standard **Contact** event (plus a custom `whatsapp_click` event), and
`PageView` on every page.

## 3. Setting up the tools

### Google Analytics 4
1. Create a GA4 property and a Web data stream for the production domain. Copy the Measurement ID (`G-…`).
2. Set `NEXT_PUBLIC_GA4_ID` in Vercel and redeploy.
3. In GA4 → Admin → Custom definitions, register event-scoped dimensions for `service_id`, `landing_page_id`,
   `landing_variant` and `cta_placement`.
4. In GA4 → Admin → Events, mark **`whatsapp_click`** as a **key event**.
5. Check: accept cookies on the site, tap a WhatsApp button, and watch Reports → Realtime.

### Meta Pixel
1. In Meta Events Manager, create a Pixel (data source) and copy its ID.
2. Set `NEXT_PUBLIC_META_PIXEL_ID` in Vercel and redeploy.
3. Use **Test events** in Events Manager to confirm `PageView` and `Contact` arrive after accepting cookies.
4. In Ads Manager, optimise website-traffic campaigns for the **Contact** event.
5. Verify your domain in Meta Business Settings and configure Aggregated Event Measurement as Meta requires.

### Vercel Web Analytics (optional)
Enable it in the Vercel dashboard, set `NEXT_PUBLIC_VERCEL_ANALYTICS=true`, redeploy. It provides privacy-friendly
page-view totals (it also waits for analytics consent on this site).

### UTM naming convention
Lowercase, underscores, no personal data:
`utm_source=instagram|facebook`, `utm_medium=paid_social`, `utm_campaign=<service>_<purpose>` (e.g.
`signature_launch`), `utm_content=<creative>` (e.g. `reel_a`).

## 4. Manual lead tracking (no website collection)

Version 1 does not collect enquiries on the website. Track real conversations in a private spreadsheet, using
[`lead-tracking-template.csv`](lead-tracking-template.csv) (open it in Google Sheets or Excel).

| Column | Meaning | Allowed values / format |
|--------|---------|-------------------------|
| `date` | Date of first WhatsApp message | `YYYY-MM-DD` |
| `lead_ref` | Your own short reference (not the person’s name or number) | e.g. `L-2027-001` |
| `source_campaign` | Where they came from | UTM campaign if known, `click_to_whatsapp_ad`, `organic_instagram`, `referral`, `unknown` |
| `enquired_service` | Service id | one of the seven service ids, or `unsure` |
| `region` | Broad location | `india`, `europe`, `other`, `unknown` |
| `lead_status` | Quality of the enquiry | `new`, `qualified`, `not_qualified`, `no_response` |
| `consultation_status` | Progress | `none`, `scheduled`, `completed`, `cancelled` |
| `currency` | Currency of payment | `INR`, `EUR` |
| `revenue` | Amount paid, if paid | number, blank if unpaid |
| `notes` | Short, non-sensitive notes | Avoid health, family or other sensitive details |

Keep this sheet private, share it only with the two cofounders, and delete rows when they are no longer needed
(see the retention period in the Privacy Policy). Ask how people found you and record it in `source_campaign`.
Comparing this sheet with GA4 `whatsapp_click` counts per campaign shows how many taps become real conversations.
