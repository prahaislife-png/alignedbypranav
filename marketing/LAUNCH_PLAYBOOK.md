# Launch playbook: the first 90 days of Aligned by Pranav

A start-up style plan for turning the website and the Instagram pack into paying consultations, built on how
Y Combinator tells founders to launch, and on what is known about Meta ads, Instagram and WhatsApp today.
The creatives, ad copy and campaign setup it refers to are in [`instagram-ad-pack/`](instagram-ad-pack/README.md).

---

## 1. The YC mindset, applied to a consultation business

Y Combinator’s advice to new companies comes down to a few ideas. Each one translates directly to Pranav:

| YC idea | What it means here |
|---|---|
| **Do things that don’t scale.** Paul Graham’s essay of that name says the most common unscalable thing founders must do is recruit users manually, one by one, and then give those first users an unusually good experience. | The first 20–30 clients will not come from ads. They come from Pranav personally messaging people, and each of them should get a consultation they talk about afterwards. |
| **Talk to users.** | Every consultation is research. Write down the exact words people use, their questions and doubts. They become the next ads, FAQs and Reels. |
| **Pick one number and grow it weekly.** Graham’s essay *Startup = Growth* treats the weekly growth rate as the compass, with 5–7% a week described as a good rate during YC. | The one number is **consultations booked per week**. Everything else (followers, likes, clicks) is only useful if it moves that number. |
| **Start narrow.** Win a small group completely before going wide. | Lead with **one or two services**, not seven. Recommended: **Signature analysis** (anyone can relate to their own signature) and **Business logo analysis** (founders and shop owners, higher value). The other five ride along on the website. |
| **Launch early, then iterate.** | The site and pack are ready. Don’t wait for a perfect brand or a domain to start step 3 below. |

## 2. Know your numbers before you spend

Fill these in once Pranav has decided them (the website shows nothing until they are set in `src/data/services.ts`):

- **Price per consultation**, in INR and EUR, for the two lead services.
- **How many consultations Pranav can deliver per week** (capacity is the real limit of a personal service).
- **Maximum cost per booking you can afford.** A healthy starting rule: ad cost per booked consultation at most
  **30% of its price**. Example: a €100 consultation can afford up to €30 of ads per booking.

What the research says about the market:

- **Demand for paid personal consultations is real and large in India.** Astrotalk, the biggest consultation app,
  reported about ₹1,176 crore operating revenue in FY25, up roughly 80%, with a ₹10–200/minute pricing model
  ([Inc42](https://inc42.com/buzz/ipo-bound-astrotalk-finds-new-revenue-driver-in-ecommerce/),
  [Outlook Business](https://www.outlookbusiness.com/start-up/news/astrotalk-reports-85-revenue-growth-in-fy25-as-tier-i-cities-boost-platform-activity),
  [Yespress](https://yespress.io/astrotalk)). It also spent about a quarter of revenue on advertising
  ([Inc42](https://inc42.com/features/can-astrotalk-chart-a-future-beyond-astrology/)): attention is expensive, so
  word of mouth and repeat clients matter.
- **There is no reliable public price list for graphology consultations.** German sources quote €500–2,000 for
  formal handwriting *reports* (a different product), and private consultations are priced individually
  ([Kanzlei Herfurtner](https://kanzlei-herfurtner.de/graphologisches-gutachten-erbrecht/)). Pricing is Pranav’s call;
  ask 2–3 practitioners or look at their sites before deciding.
- **Ads cost very different amounts by country.** Meta CPMs (cost per 1,000 views) run roughly $2–3 in India and
  $10–15 in Germany ([Neal Schaffer](https://nealschaffer.com/facebook-ads-cost/),
  [superads.ai: Germany](https://www.superads.ai/facebook-ads-costs/cpm-cost-per-mille/germany),
  [superads.ai: India](https://www.superads.ai/facebook-ads-costs/cpm-cost-per-mille/india)).
  Click-to-WhatsApp conversations in India are reported between about ₹3 and ₹60 each depending on the offer
  ([Spur](https://www.spurnow.com/en/blogs/click-to-whatsapp-ads-benchmarks),
  [AI Chat Assist](https://blog.aichatassist.com/click-to-whatsapp-lead-qualification-cost-india/)). These are agency
  figures, not official benchmarks; your own first week of data replaces them.

**Which market first?** India gives cheap reach and familiarity with this kind of consultation. Europe has higher
ad costs but higher prices. Pranav’s WhatsApp number is German, so the warmest first audience is likely his own
network: Indians in Germany and Europe, plus contacts in India. Start there (section 3), then let the paid test
(section 5) show where a booking is cheapest.

## 3. Weeks 1–2: the first 20 clients, by hand

No ads yet. This is the “do things that don’t scale” phase.

1. **Write a list of 100 people** Pranav knows or is one step from: friends, family, colleagues, alumni groups,
   business owners, Indian associations and WhatsApp/Facebook community groups in his city.
2. **Message them personally**, one by one (not a broadcast). Example:
   > Hi ⟨name⟩, I’ve just launched my consultation practice as a graphologist: Aligned by Pranav. I’m taking
   > 20 founding clients this month for signature and logo consultations. Would you, or someone you know, like
   > one? Here’s the site: https://alignedbypranav.vercel.app
3. **Founding-client offer** (Pranav decides the terms): for example, the first 20 at an introductory price, in
   exchange for honest feedback and, *if they are happy and agree in writing*, a short testimonial.
4. **Over-deliver.** Reply fast, run the consultation carefully, send a short written summary afterwards.
5. **After every consultation**, ask three questions and write the answers in the lead sheet
   (`docs/lead-tracking-template.csv`):
   - What made you decide to book?
   - What almost stopped you?
   - Who else do you know who would want this?
6. **Collect testimonials properly.** Only real words, with recorded consent, added in
   `src/data/testimonials.ts` (`consentRecorded: true`). Never edit them into claims of results.

Goal for week 2: **10 consultations done, 5 consented testimonials, a list of the real questions people ask.**

## 4. Weeks 1–6: build the Instagram engine

**Set up once (day 1):**

- Professional account, name `Aligned by Pranav | Graphologist`, bio and link as in the
  [pack README §7](instagram-ad-pack/README.md#7-instagram-profile-setup).
- Profile picture: `07-highlight-covers/profile-picture.png` (Pranav’s face builds more trust than a logo).
- Post the **launch carousel**, pin it, then the signature and logo carousels.
- Highlights with the covers in `07-highlight-covers/`.

**How Instagram decides who sees a post.** Instagram’s head, Adam Mosseri, has named the main signals as
**watch time, likes per reach and sends per reach**, with sends (people forwarding a post in DMs) the most
important for reaching people who don’t follow you yet. Instagram also tests posts from small accounts on
non-followers first ([Buffer](https://buffer.com/resources/instagram-algorithms/),
[Dataslayer](https://www.dataslayer.ai/blog/instagram-algorithm-2025-complete-guide-for-marketers)). So:

- **Make posts people send to someone.** “Look at your signature: does it rise or fall?” gets forwarded.
  A plain “Book now” does not. The signature and logo carousels are built for this.
- **Reels with Pranav on camera, 20–40 seconds.** Hook in the first second, one idea, end with
  “Message me on WhatsApp”. Seven scripts are in [`ORGANIC_PLAN.md`](instagram-ad-pack/ORGANIC_PLAN.md).
- **Cadence:** 3 feed posts or Reels a week plus daily Stories (polls like “Which signature is yours?” and
  behind-the-scenes). Consistency beats volume.
- **Turn every client question into a post.** Section 3’s notes are the content calendar.
- **Collaborate.** Instagram “Collab” posts with a founder community, a calligraphy or stationery shop, or an Indian
  community page in your city put you in front of their audience for free.

## 5. Weeks 3–6: small, disciplined paid tests

Only start once the profile has at least 6–9 posts and Pranav can answer WhatsApp quickly.

- **Campaign:** Click-to-WhatsApp (Route A in the [pack README §4](instagram-ad-pack/README.md#4-campaign-setup-in-meta-ads-manager)).
  The ad opens a chat with a prefilled message, which suits a WhatsApp-first business.
- **Start with 2 services × 2 creatives (A illustration, B Pranav’s photo) × 1 market.**
- **Budget:** about **₹500–1,000/day in India** or **€10–20/day in Germany**, for 7 days, before judging.
- **Audience:** broad (age 25–55, the country or a few cities, interests off at first). Meta’s targeting does better
  with room to learn.
- **Judge on bookings, not clicks.** Track for each ad: cost per conversation started → % who reply to Pranav →
  % who book → **cost per booking**. Kill an ad that spends 3× your target cost per booking with no booking.
  Double the budget (by 20–30% every few days, not at once) on whatever books below target.
- **Then** add Route B (landing page → WhatsApp) for people who want to read before writing.

## 6. WhatsApp is the shop counter

Most enquiries are won or lost here, not in the ad.

- **WhatsApp Business app** (free): set the **greeting message** (sent on a first message), the **away message**
  (outside hours), **quick replies** (type “/” to insert saved answers) and **labels** to track each chat
  ([Trengo](https://trengo.com/blog/whatsapp-business-features), [Rasayel](https://learn.rasayel.io/en/blog/whatsapp-business-features/)).
  The app itself costs nothing; per-message fees only apply to the paid WhatsApp Business *API*.
- **Reply within 15 minutes during the day.** Speed matters most right after someone taps an ad.
- **Labels as a sales pipeline:** `New` → `Asked price` → `Sent details` → `Booked` → `Done` → `Review asked`.
- **Quick replies to save** (edit in Pranav’s voice):
  - `/process`: how a consultation works, what to send, how long it takes.
  - `/price`: the confirmed starting price, and what is included.
  - `/book`: available times and how to pay.
  - `/followup`: “Just checking whether you had any questions about the consultation?” (send once, after 2 days)
- **Never** ask for documents, IDs or children’s photos up front (see the Contact page notes).

## 7. Referrals and repeat clients

- After each consultation: thank-you message with a summary, then a week later a check-in.
- Offer **one other service** where relevant (a signature client who runs a business may want logo analysis).
- **Referral line:** “If someone you know would find this useful, you’re welcome to share my number.” Simple and
  free. Consider a thank-you for referrals once prices are set.

## 8. Weekly rhythm (30 minutes every Monday)

| Measure | Where it comes from |
|---|---|
| Consultations booked (the one number) | Lead sheet |
| WhatsApp conversations started | WhatsApp labels + Ads Manager |
| Reply → booking rate | Lead sheet |
| Ad spend and cost per booking | Ads Manager + lead sheet |
| Posts published, best post by sends | Instagram Insights |

Ask: *what one thing would raise bookings next week?* Do that thing. Aim for 5–7% more bookings week on week.

## 9. Stay on the right side of the rules

- **Meta “personal attributes” rule.** Ads must not assert or imply things about the viewer, such as their
  beliefs, finances, health or personality (“Struggling with money? Your signature shows…” would be rejected)
  ([Meta Transparency Center](https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/)).
  The pack’s ads are written to pass this; keep new copy to the same pattern.
- **No outcome promises anywhere**: no luck, wealth, success, healing or personality predictions. Graphology is
  presented as interpretive, never scientific or diagnostic (the site’s tests check common phrases).
- **India:** ASCI’s code bans misleading or unsubstantiated claims, and anything implying a cure falls under the
  Drugs and Magic Remedies Act ([Wikipedia](https://en.wikipedia.org/wiki/Drugs_and_Magic_Remedies_(Objectionable_Advertisements)_Act,_1954)).
- **Germany:** a business website **and** a business Instagram account need an **Impressum** under § 5 DDG (in force
  since May 2024). A link in the Instagram bio to the site’s Impressum is reported to be enough
  ([Händlerbund](https://www.haendlerbund.de/de/leistungen/rechtssicherheit/agb-service/impressum/impressum-social-media),
  [IHK](https://www.ihk.de/osnabrueck/recht-und-fair-play/recht/internetrecht/informationspflichten-im-internet-1085374)).
  **The site does not have an Impressum yet**: send the legal name and address and it can be added in minutes.
- **Google Business Profile** is only for businesses that meet customers in person; an online-only service isn’t
  eligible, so skip it unless Pranav sees clients at an address
  ([Google](https://support.google.com/business/answer/10514137?hl=en)).
- **Drawing analysis:** never use photos of real children in ads, and only use children’s drawings with a parent’s
  consent.

## 10. Milestones

| By | Milestone |
|---|---|
| Day 7 | Instagram set up, launch posts live, 100-person list written, first 30 messages sent |
| Day 14 | 10 consultations done, 5 consented testimonials, prices decided |
| Day 30 | First paid test finished; cost per booking known for one market; Impressum live |
| Day 60 | One ad set reliably books below target; 3 posts/week rhythm; testimonials on the site |
| Day 90 | Consultations per week growing 5–7% weekly; decide whether to add a third service or the second market |

## 11. What not to do yet

- Don’t pay an agency or big influencers before you know your cost per booking.
- Don’t advertise all seven services at once.
- Don’t buy followers or use engagement groups; they teach Instagram to show posts to the wrong people.
- Don’t discount permanently. A founding-client price has an end date.
- Don’t leave WhatsApp unanswered for hours while ads are running.

---

*Research sources are linked inline. Market figures from agencies and blogs are indicative, not official
benchmarks; Pranav’s own first weeks of data are the real benchmark. Paul Graham’s essays referenced:
“Do Things that Don’t Scale” (2013) and “Startup = Growth” (2012), at paulgraham.com.*
