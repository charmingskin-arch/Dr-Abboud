# Oak Brook Hair Transplant Clinic — Facebook & Instagram Ad Campaign

**Positioning:** *Illinois' best price on hair transplants. Natural results with no compromises, close to home.*
**The enemy:** the Chicago price tag ($8k–$14k for a typical procedure) and the trip overseas.
**The ask:** Book a free consultation.

---

## Part 1: The 5 strongest hair transplant ads I found (and what we take from each)

| # | Ad / campaign | Why it works | What we're borrowing |
|---|---|---|---|
| 1 | **Bosley: "One Visit. One Day." (national TV + digital, Nov 2025).** Three spots built around a simple promise, with 0% financing from about $99/mo, more than 500k procedures and 40k 5-star reviews claimed, and a clear contrast with cheap overseas clinics. | One short, repeatable promise, plus proof in numbers and a named enemy. | The "named enemy" contrast (overseas trip / downtown price) and the short tagline structure. |
| 2 | **Hair of Istanbul: time-lapse result ad.** One patient filmed from day 23 to day 198, split-screen before vs. now. | Seeing beats being told. It answers "will it work?" visually and sets realistic expectations. | Our **growth-timeline story** (creative 03) and the real before/after carousel card. |
| 3 | **Smile Hair Clinic: "Welcome to the New You."** A reunion film where old classmates don't recognize a man with a full head of hair. | Story and emotion. The viewer feels the payoff before the clinic is ever mentioned. | Video version 2 (see the shot list below): a patient testimonial story. |
| 4 | **Elithair: "Turkish Hairlines" airport billboard + Tottenham Hotspur "father's confidence" film.** | A witty, context-aware stunt, plus a confidence story that never shames anyone. | A confident, positive tone ("A lifetime of hair") instead of fear about baldness. |
| 5 | **Mike Majlak × Smile Hair Clinic: influencer documentary** (reported 700k views on day 1 and 2M in two days). | A real person's vlog-style journey is the most trusted format for this purchase. | Phase 2: invite a local Chicagoland creator or real patient to film their journey (UGC). |

Sources: [Bosley campaign release](https://www.barchart.com/story/news/36389555/bosley-unveils-bold-new-brand-direction-and-national-tv-digital-campaigns-ahead-of-self-improvement-season) · [Bosley on iSpot.tv](https://www.ispot.tv/ad/7k7f/bosley-permanent-solution) · [Hair of Istanbul ad (Motion library)](https://motionapp.com/library/hair-of-i-stanbul) · [Smile Hair Clinic "Welcome to the New You"](https://smilehairclinic.com/en/welcome-to-the-new-you) · [Elithair "Turkish Hairlines"](https://jaisonthomas.substack.com/p/you-have-to-see-what-this-hair-clinic) · [Elithair × Tottenham](https://www.tottenhamhotspur.com/news/1009580/tottenham-hotspur-announces-partnership-with-elithair) · [Mike Majlak video coverage](https://www.klove.com/news/tech-science/well-known-youtuber-shares-his-hair-transplant-35529)

These are the most-covered, best-documented campaigns. No public source ranks hair transplant ads by conversions. To see what competitors are running right now, search "hair transplant" with location set to the US in the free [Meta Ad Library](https://www.facebook.com/ads/library/). Ads that have been running for 90+ days are usually the profitable ones.

---

## Part 2: Creatives (in `ads/output/`)

| File | Format | Placement | Angle |
|---|---|---|---|
| `01-feed-square-best-price.png` | 1080×1080 | Feed (FB/IG) | Price hook: "Illinois' Best Price. Zero compromise." |
| `02-feed-portrait-comparison.png` | 1080×1350 | Feed (best-performing size) | Competitive: Chicago clinic vs. overseas vs. us |
| `03-story-growth-timeline.png` | 1080×1920 | Stories / Reels | Honest day 1 → month 12 timeline |
| `04-carousel-1…5.png` | 1080×1080 ×5 | Feed carousel | Q&A: cost, natural look, who does it, real results |
| `05-reel-15s-vertical.mp4` | 1080×1920, 15s | Reels / Stories / feed video | Problem → enemy → "better way" → price → CTA |

**To edit:** change `ads/config.json` (price detail, phone, website, technique, doctor name) and run `node ads/build.js`. All images and the video are regenerated in about 30 seconds.

**Before launch:**
1. **Carousel card 5:** put in your real before/after photos (same angle, same lighting, signed patient consent). Never use stock photos or AI-generated "results". It's misleading, and Meta and the FTC take action on it.
2. **Add music to the Reel** inside Ads Manager (Meta's free licensed audio library). Upbeat and confident works best.
3. **If you can, add a price number** (`priceDetail`, e.g. "From $X/graft"). A concrete price beats "best price" every time and backs up the claim.

### Video #2: shoot it on a phone (highest expected performer)
Real faces outperform graphics for this procedure. Film 20–30s vertical:
1. **0–3s hook:** the doctor looks at the camera and says: *"Most people in Chicagoland are quoted eight to fourteen thousand dollars for a hair transplant. Here's why ours costs less."*
2. **3–12s:** clinic walkthrough, the doctor marking a hairline on a consenting patient, the FUE tools.
3. **12–22s:** a patient testimonial at 12 months, in their own words (with consent), e.g. *"I almost flew to Turkey. Glad I didn't."*
4. **22–30s:** the doctor on camera: *"Illinois' best price, right here in Oak Brook. Book your free consultation below."* Add captions (most people watch on mute).

---

## Part 3: Ad copy (ready to paste into Ads Manager)

### Primary text: Version A (price/competitive, pairs with 01 and 02)
> Why pay downtown Chicago prices for a hair transplant? 💈
>
> At Oak Brook Hair Transplant Clinic you get natural-looking FUE results from Dr. Abboud at **Illinois' best price**. No flights overseas, no hidden fees, and your follow-up care is right here in Oak Brook.
>
> ✅ Free, no-pressure consultation
> ✅ Transparent pricing, quoted in writing
> ✅ Natural hairline design
>
> 👉 Tap "Book Now" to claim your free consultation. Spots fill up fast.

### Primary text: Version B (story/timeline, pairs with 03 and the Reel)
> One day in the chair. A lifetime of hair.
>
> Here's the honest timeline: same-day procedure, most patients back to work within 1–2 weeks, new growth around month 3–4, and a full, natural result at about 12 months.
>
> The best part? You'll pay Illinois' best price, right here in Oak Brook.
>
> Book your free consultation today 👇

### Primary text: Version C (short, for Reels/Stories)
> Hair transplant in Chicagoland? Don't pay $8k–$14k or fly overseas. Illinois' best price is in Oak Brook. Free consultation 👇

### Headlines (40 characters max, test all)
- Illinois' Best Price on Hair Transplants
- Free Hair Transplant Consultation
- Natural FUE Results in Oak Brook
- Skip the Flight. Keep the Savings.
- Why Pay Chicago Prices?

### Descriptions
- Free consultation · Oak Brook, IL
- Transparent per-graft pricing
- Local follow-up care

**CTA button:** `Book Now` (or `Get Quote` for the lead form)

---

## Part 4: Campaign setup in Meta Ads Manager

**Campaign objective:** **Leads**, using an **Instant Form** (people book without leaving Facebook; usually 2–3× cheaper per lead than a website for local clinics). Once you have a booking page with the Meta Pixel installed, add a second campaign optimized for website conversions.

**Structure:** 1 campaign → 3 ad sets → 3–4 ads each

| Ad set | Audience | Ads |
|---|---|---|
| **1. Broad local** | 25–30 mile radius around Oak Brook (covers Chicago, Naperville, Schaumburg, Joliet, Aurora). Ages 28–65, all genders. No interests; let Meta's algorithm find buyers. | 01, 02, Reel, Copy A |
| **2. Interest stack** | Same geography plus interests such as hair loss, Minoxidil, Rogaine, Propecia, Keeps, Hims, Bosley, men's grooming, Hair Club. | Carousel, 03, Copy B |
| **3. Retargeting** (start after about 2 weeks) | Watched 50%+ of the Reel, engaged with the Page/IG, opened the form but didn't submit. Exclude existing leads. | 02, carousel, Copy C + "Spots this month are limited" |

**Budget (suggested starting point):** about $40–$60/day total ($20 broad, $20 interest, $10 retargeting) for 14 days, then shift money to the winning ad set. Expect Chicagoland cosmetic-procedure leads to land roughly in the $25–$80 range. Judge success by **consultations booked**, not clicks.

**Placements:** Advantage+ (automatic). Upload the square, 4:5 and 9:16 versions so every placement gets a native-sized creative.

### Instant Form (lead form)
- Form type: **Higher intent** (adds a review screen and filters out accidental leads)
- Intro: *"Get your free hair transplant consultation at Illinois' best price."*
- Questions: Full name · Phone · Email · *"What best describes your goal?"* (Receding hairline / Crown / Overall thinning / Beard or eyebrows / Not sure) · *"When would you like to start?"* (ASAP / 1–3 months / Just researching)
- Thank-you screen: *"We'll call you within 1 business day."* plus a **Call now** button
- **Call every lead within 5 minutes during business hours.** Speed-to-lead matters more than any ad tweak.

### What to test (one variable at a time)
1. Price angle (01/02) vs. timeline angle (03) vs. phone video with the doctor on camera
2. "Illinois' Best Price" vs. an actual number ("From $X/graft")
3. Instant Form vs. booking page

**Benchmarks:** CTR above 1.5% means the hook works. A high CTR with few leads means the form or offer is the problem. Kill any ad that has spent 3× your target cost per lead with no leads.

---

## Part 5: Compliance (keeps the ads approved)

- **Age 18+ targeting is mandatory** for cosmetic procedure ads on Meta ([Meta Health & Wellness policy](https://transparency.meta.com/policies/ad-standards/restricted-goods-services/health-wellness)).
- **Don't call out the viewer's appearance.** Avoid "Are YOU going bald?", "Tired of your thinning hair?" and similar lines. Meta rejects personal-attribute and body-shaming language. All copy above is written to pass.
- **Before/after photos:** real patients only, with signed consent, same angle and lighting, and an "individual results vary" note. Meta's rules here have been changing ([2026 overview](https://www.auditsocials.com/blog/meta-beauty-cosmetics-ads-2026-before-after-photos-appearance-claims-policy)), so if a photo ad is rejected, request a review or swap in the timeline creative.
- **"Illinois' Best Price"** is a comparative claim. Keep records (competitor quotes, your per-graft price) that show it's true, or switch it to a price-match promise. FTC and Illinois consumer-protection rules require you to be able to back up advertised claims.
- The $8k–$14k Chicago range comes from a published 2026 pricing guide ([withcherry.com](https://withcherry.com/blog/hair-transplant-cost)) and is footnoted on the creatives.

---

## Launch checklist
- [ ] Fill in `ads/config.json` (phone, website, price detail; confirm FUE, Dr. Abboud and the free consultation) and run `node ads/build.js`
- [ ] Add real before/after photos to carousel card 5
- [ ] Facebook Page + Instagram connected in Business Manager; Meta Pixel on the website
- [ ] Create the Leads campaign, 3 ad sets and the Instant Form as above
- [ ] Set up lead notifications (email/SMS or a CRM) and call leads within 5 minutes
- [ ] Review at day 3, 7 and 14; move budget to the winners
