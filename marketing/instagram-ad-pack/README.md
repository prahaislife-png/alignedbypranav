# Instagram & Facebook ad pack: how to run it

Everything needed to launch Aligned by Pranav on Instagram and Facebook: ready-to-upload creatives, ad copy,
an organic posting plan, and the campaign setup that turns ad spend into **real WhatsApp conversations with Pranav**.

| File / folder | What it is |
|---|---|
| `00-preview/` | Contact sheets of all creatives (feed, stories, carousels, highlights), for a quick look |
| `01-feed-ads/` | 14 feed ads, 1080×1350 (4:5): two versions per service. **A = light** (the service as a specimen sheet), **B = dark** (Pranav’s photo + the service) |
| `02-story-reel-ads/` | 7 Stories/Reels ads, 1080×1920 (9:16), bottom area kept clear for Instagram’s button |
| `03-carousel-launch/` | 6-slide “Introducing Aligned by Pranav” carousel (first post, also usable as an ad) |
| `04-carousel-signature/` | 6-slide educational carousel: what a graphologist looks at in a signature |
| `05-carousel-logo/` | 6-slide educational carousel: four ways to look again at your logo |
| `06-quote-posts/` | 3 quote posts |
| `07-highlight-covers/` | 8 Story Highlight covers (“about” uses Pranav’s photo) + two profile pictures: `profile-picture.png` (Pranav’s photo, recommended) and `profile-picture-mark.png` (handwritten “a” logo) |
| `_generator/` | The script that renders every image from the website’s fonts, illustrations and photo |
| [`AD_COPY.md`](AD_COPY.md) | Primary text, headlines, CTAs, WhatsApp messages and links for every ad |
| [`ORGANIC_PLAN.md`](ORGANIC_PLAN.md) | 4-week posting calendar, captions, hashtags, Stories and 7 Reel scripts |

---

## 1. What “converting” means here

The goal is not likes or clicks. It is **WhatsApp conversations that become consultations**:

```
Ad seen → tap → WhatsApp chat opened → message sent → Pranav replies fast → process + price explained → consultation booked
```

Most lost conversions happen in the last three steps, inside WhatsApp, not in the ad. Section 6 matters as
much as the creatives.

## 2. Why these ads should work

- **One service per ad.** “Signature analysis” is clear enough to stop the scroll; “seven alignment services” is too vague to act on.
- **Message match.** Each ad’s headline repeats on its landing page, and the WhatsApp message names the service, so nobody has to explain why they’re writing.
- **Low-risk ask.** Every CTA invites a question (“ask about the process and starting price”), never a purchase. That is the lowest-friction first step for a new, premium service.
- **A real person.** Pranav’s name is on every creative and his photo is on every B ad. People buy a consultation from a person, not a logo. Video of him (Reels, section 7) is the next upgrade.
- **Premium, distinctive design.** The same graphologist’s-worksheet look as the website: key words written by pen, specimen sheets, red-pen notes. Most of the feed shouts; these don’t. The two versions (illustration vs. face) let Meta find out which stops more people.
- **Policy-safe by design.** No outcome promises, no “you are…” statements, no fake urgency. That avoids ad rejections and account restrictions, which kill campaigns faster than weak creative.

## 3. Before you spend anything (one-time setup)

- [x] Website live (https://alignedbypranav.vercel.app, WhatsApp +49 1512 5937315 connected). Move to your own domain when ready.
- [ ] Instagram is a **Professional (Business) account**, linked to a **Facebook Page**.
- [ ] **WhatsApp Business app** installed on the number Pranav will answer from, and linked to the Page
      (Meta Business Suite → Settings → WhatsApp accounts). Required for click-to-WhatsApp ads.
- [ ] WhatsApp Business profile complete: name “Aligned by Pranav”, profile picture
      (`07-highlight-covers/profile-picture.png`, Pranav’s photo), description, website link.
- [ ] Greeting and away messages switched on (wording in section 6).
- [ ] **Meta Pixel** created and `NEXT_PUBLIC_META_PIXEL_ID` set; **domain verified** in Business Settings.
- [ ] Instagram bio and highlights set up (section 7).
- [ ] Post the **launch carousel** and 2–3 more posts before ads start. People check the profile before messaging.
- [ ] Lead sheet ready (`docs/lead-tracking-template.csv`).

## 4. Campaign setup in Meta Ads Manager

Run **two routes side by side** for the first two weeks, then keep whichever gives cheaper *qualified* enquiries.

### Route A: Click-to-WhatsApp (most conversations)

The ad opens a WhatsApp chat directly, with the message already typed.

- **Objective:** Engagement → **Conversion location: Messaging apps → WhatsApp**
  (or *Leads → Messaging apps*, if your account offers it). Performance goal: maximise conversations.
- **Message template:** use the “Prefilled message (CTWA)” text for each service in `AD_COPY.md`.
- **CTA button:** *Send WhatsApp message*.
- Measured in Ads Manager as **“Messaging conversations started”**. The website cannot see these, which is fine.

### Route B: Landing page → WhatsApp (better-informed enquiries)

The ad opens the matching `/lp/...` page, which explains the service and hands over to WhatsApp.

- **Objective:** Leads (or Sales) → **Conversion location: Website** → conversion event **Contact**
  (sent when a visitor taps a WhatsApp button and has accepted cookies).
  Until the Pixel has recorded some Contact events, start with **Traffic → Landing page views**, then switch.
- **Website URL:** the landing-page URL for the creative (`AD_COPY.md`). A and B feed creatives link to
  different page versions, so the headline matches what was tapped.
- **URL parameters** (Ads Manager → Tracking → Build a URL parameter), paste once:
  `utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign={{campaign.name}}&utm_content={{ad.name}}`
- **CTA button:** *Learn more*.

### Structure and naming

```
Campaign   ABP | CTWA | IN            (Route A, India)
  Ad set   Signature | IN | 25-60
    Ads    sig-feedA · sig-feedB · sig-story
  Ad set   Logo | IN | 25-60
    Ads    logo-feedA · logo-feedB · logo-story

Campaign   ABP | LP | IN              (Route B, India): same ad sets and ads
```

- **Start with Signature and Logo only.** They are the most concrete and the featured services. Add one new service
  every 1–2 weeks once the first two are running well.
- **Location:** start in **India** (English). Add **Europe** as separate campaigns with euro budgets once Pranav
  is comfortable handling the chats; choose countries by where consultations can actually be delivered and by time zone.
- **Audience:** age 25–60, **Advantage+ audience** with these suggestions, kept broad:
  - Signature: handwriting, calligraphy, fountain pens, stationery, graphology, self-improvement
  - Logo / Office clock / Phone number: small business, entrepreneurship, branding, startups, business owners
  - Wristwatch: watches, luxury goods, watch collecting
  - Drawing: parenting, children’s art, early education
  - Vision board: goal setting, journaling, mindfulness, personal development
- **Placements:** Advantage+ placements, or manually Instagram Feed, Stories, Reels and Explore plus Facebook Feed.
  Upload the 4:5 image for feeds and the 9:16 image for Stories/Reels in the same ad (“placement asset customisation”).
- **Turn off “Advantage+ creative enhancements”** (auto text, music, image changes). They can change wording in
  ways that break the careful, compliant copy.
- **Budget:** a sensible starting point is about **₹500–1,000 per ad set per day** in India, or **€10–20** in Europe.
  These are starting suggestions to adjust to your own budget, not benchmarks. Use ad-set budgets while testing.

## 5. Testing schedule and decision rules

| When | What to do |
|---|---|
| Week 0 | Setup (section 3). Post launch carousel + 2 posts. |
| Days 1–7 | Run Signature + Logo on Routes A and B. **Don’t edit anything for 7 days** (learning phase). |
| Days 8–14 | Pause clear losers (rules below). Move budget to the winning route and creative. |
| Week 3 | Add the next service (suggested order: Vision Board → Wristwatch → Phone number → Office clock → Drawing). |
| Monthly | Refresh creatives on the winners (new headline from the variants in `AD_COPY.md`, or a Pranav Reel). |

**Set your own target first:**
`target cost per conversation = average consultation price × share of conversations that book`.
Example: if a consultation is ₹3,000 and 1 in 5 conversations books, don’t pay more than about ₹600 per
conversation. The real numbers come from your lead sheet.

**Rules**
1. An ad that has spent **3× your target** without a single conversation or Contact → pause it.
2. Between A (illustration) and B (Pranav’s photo), keep whichever has the **lower cost per conversation** after ~7 days, not the higher click-through rate.
3. Judge routes by **cost per qualified enquiry** from the lead sheet, not by Ads Manager alone.
4. If people tap but rarely message: shorten the prefilled message and check the WhatsApp number on mobile.
5. If they message but rarely book: the problem is in the chat (speed, clarity of price/process), not the ad.
6. Frequency above ~3 per week in one audience means people are tired of the ad: refresh the creative.

## 6. Turning WhatsApp chats into consultations

This is where conversion happens.

- **Reply fast.** Aim for minutes during working hours. Ad-driven chats go cold quickly.
- **Use labels** (WhatsApp Business → Labels): `New`, `Qualified`, `Price sent`, `Booked`, `Paid`, `Not now`.
- **Ask where they found you** (“Did you see us on Instagram or Facebook?”) and log it in the lead sheet.
- **Follow up once** after 24–48 hours if someone goes quiet. Then stop.
- **Privacy:** ask people not to send signed documents or children’s drawings until you’ve explained how they’ll be used.

**Drafts for WhatsApp Business quick replies.** Pranav should edit these into his own voice; fill in the blanks
with confirmed details only.

> **Greeting (automatic):** Hello, and thank you for contacting Aligned by Pranav. Pranav reads every message
> personally and will reply soon. Which consultation are you interested in?

> **Away message:** Thank you for your message. Pranav is away right now and will reply as soon as he is back,
> usually within ____.

> **/process:** Thank you for your interest in ______. Here is how it works: ______. The consultation is
> available ______ (online / in person) and takes about ______.

> **/price:** The starting price for ______ is ₹____ / €____. The exact fee depends on ______. Would you like to go ahead?

> **/samples:** Before you send anything: please don’t share signed documents, ID or bank details. I will tell
> you exactly what I need and how it will be used.

> **/booking:** Wonderful. I have these times available: ______. Which suits you best? Payment details: ______.

> **/followup:** Hello again. I just wanted to check whether you had any questions about the ______ consultation.
> No pressure at all.

## 7. Instagram profile setup

- **Name field:** `Aligned by Pranav | Graphologist`. The name field is searchable, so include the keyword.
- **Bio** (example):
  ```
  Personal consultations with Pranav Vibhute
  Signatures · handwriting · logos · watches · numbers · drawings · vision boards
  India & Europe · Enquire on WhatsApp ↓
  ```
- **Link:** the website home page (or `/services`). Add the WhatsApp button via *Edit profile → Contact options*.
- **Highlights:** use the covers in `07-highlight-covers/`, one per service plus “About”. Fill each with 3–5 Stories
  that reuse the carousel slides and story ads.
- **Pin** the launch carousel and the signature carousel to the top of the grid.

## 8. Rules for every ad (Meta and ASCI)

- ✅ Describe what is explored. ❌ Never promise success, wealth, luck, healing or personality insight.
- ❌ No statements that assert personal attributes (“Are you struggling with…”, “You are anxious…”).
  Questions about an *object* (“When did you last look at your signature?”) are fine.
- ❌ No invented testimonials, results, before/after images, discounts, “limited slots” or countdowns unless they are true.
- ❌ Never call graphology scientific, psychological or diagnostic. Drawing ads always say “not diagnostic”.
- ❌ No photos of real children in drawing ads, and no children’s drawings without parental consent.
- ✅ Prices in ads only once confirmed, and in the right currency for the audience.

## 9. Editing or adding creatives

- **Canva:** create at 1080×1350 (feed) or 1080×1920 (stories). Upload the website fonts from `src/fonts/`
  (Canva → Brand → Fonts): **BluuNext Bold** for headlines, **Apfel Grotezk** for small text, **Fragment Mono** for
  lowercase notes like “§ consultation 01”. Colours: paper `#F3F1EB`, ink `#221B2B`, red pen `#A3352B`,
  night `#211B29`, plum `#332B40`, gold `#A88A62` / light gold `#D1BC98`, rule lines `#CFC8BA`.
  Keep headlines to 10 words or fewer and one CTA per image.
- **Regenerating this pack:** every image is rendered by `_generator/generate.js` from the website’s own fonts,
  illustrations and Pranav’s photo (`node marketing/instagram-ad-pack/_generator/generate.js . marketing/instagram-ad-pack`,
  needs Playwright). Ask Claude to change headlines, add prices once confirmed, or add new formats.
