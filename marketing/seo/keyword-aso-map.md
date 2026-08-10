# KidPad — Keyword & ASO Map

**Goal:** drive install *volume* for the paid (£2.99, one-off) iOS + Android app.
**Reality check:** for a new app, most installs come from **store search (ASO)**, not
web search. So this map is split into two halves — **ASO** (App Store + Google Play,
where the volume is) and **Web SEO** (the landing page, which supports and closes).

> ⚠️ **Volumes are not in this doc.** The keyword *choices* below are intent- and
> competition-reasoned, but real search-volume numbers need a tool:
> - **Apple:** App Store Connect → *App Analytics → Search terms*, plus the in-app
>   "search popularity" hint when you type keywords in App Store Connect.
> - **Google:** Play Console → *Acquisition reports*, plus Google Keyword Planner.
> - **Third-party:** AppTweak, Sensor Tower, Mobile Action, Ahrefs.
> Validate the picks below against those before locking your listing.

---

## Part 1 — App Store Optimization (the priority)

### The character limits you're working inside

| Field | Apple App Store | Google Play | Indexed for search? |
|---|---|---|---|
| Title / name | 30 chars | 30 chars | **Yes — highest weight** |
| Subtitle (Apple) | 30 chars | — | **Yes — high weight** |
| Keyword field (Apple) | 100 chars | — | **Yes** (hidden field) |
| Short description | — | 80 chars | Google: **yes, high weight** |
| Full description | (not indexed) | 4000 chars | Apple: **no** · Google: **yes** |
| Promo text (Apple) | 170 chars | — | No (not indexed) |

**Key difference:** Apple does **not** index the long description — its search reads
Title + Subtitle + Keyword field only. Google **does** index the full description, so
keyword coverage there matters. Write for each engine accordingly.

**Apple keyword-field rules:** comma-separated, **no spaces after commas** (wastes
characters), **don't repeat** words already in your Title/Subtitle (Apple already
indexes those), don't repeat your category or the word "app", singular ≈ plural so
pick one, and Apple auto-combines words across fields into phrases.

---

### Recommended listing copy

#### Apple App Store

- **App name (30):** `KidPad: Toddler Play & Learn` *(28)*
  - Rationale: a brand-new brand has ~0 search volume, so spend the name field —
    Apple's heaviest-weighted — on your best keywords ("toddler", "play", "learn").
  - Purist alt if you want brand-only: `KidPad` (leaves discovery to subtitle/keywords).
- **Subtitle (30):** `Learning games for ages 2–6` *(27)*
  - Alt: `Safe, offline games for toddlers` *(32 — trim to)* `Offline games for toddlers` *(26)*
- **Keyword field (100), no spaces after commas:**
  `toddler,preschool,kids,educational,pretend play,offline,counting,clock,ABC,drawing,phone,safe` *(~99)*
  - Note: deliberately omits "learning" and "games" (already in Subtitle) and
    "KidPad"/"app" (never index those). Swap any term once App Store Connect shows
    you its popularity score.
- **Promotional text (170, not indexed — use for freshness/hooks):**
  `Pay once. No ads, no subscriptions, no in-app purchases. Nine playful pretend apps your little one can explore safely — even offline on a plane or in the car.`

#### Google Play

- **Title (30):** `KidPad: Toddler Play & Learn` *(28)*
- **Short description (80, indexed — high weight):**
  `Safe, offline learning games for toddlers. No ads, pay once. Ages 2–6.` *(~69)*
- **Full description (4000, indexed):** write ~200–300 words that naturally repeat the
  core terms **2–3 times each** (toddler, preschool, learning, offline, safe, ages 2–6)
  and name all nine activities. Starter draft below — expand, don't keyword-stuff:

  > **KidPad is a safe, offline learning app for young children aged 2 to 6.** It's a
  > little world of big, colourful pretend apps for your toddler or preschooler to
  > explore — with no ads, no accounts and no way onto the internet.
  >
  > **Nine playful activities to learn and pretend with:**
  > 🎨 Drawing · 📷 Camera · 🍎 Restaurant · 🚆 Trains & Buses · 🚑 Rescue ·
  > 📞 Phone · 🕓 Clock · ⏱️ Timer · 🔢 Calculator
  >
  > Each one is pretend-play that quietly teaches — from telling the time on the
  > learning clock, to counting on the first calculator, to role-play in the
  > restaurant. It all works **completely offline**, so it's perfect for a plane, the
  > car, or anywhere with no signal.
  >
  > **Made for parents' peace of mind:** no ads, no in-app purchases, no data
  > collection, and a PIN-locked settings screen. Pay once (£2.99, shown in your local
  > currency) — there are no subscriptions and nothing to buy inside the app.
  >
  > KidPad works on iPhone, iPad and Android phones and tablets.

---

### ASO checklist (do these in order)

1. [ ] **Screenshots** — your single biggest *conversion* lever. First 2 must sell at a
       glance (they show in search results). Add a short caption to each ("Learn the
       clock", "Safe offline camera"). You already have great source shots in `public/`.
2. [ ] **App preview video** (optional but lifts conversion) — 15–30s of real play.
3. [ ] **Category:** Education (primary). Consider a secondary of "Kids" / "Family".
4. [ ] **Age rating:** set 4+ (Apple) / "Designed for Families" + Ages 5 & under
       (Google) — required for a kids app and a trust signal.
5. [ ] **Ratings & reviews** — the biggest ranking + CTR multiplier. Add an in-app
       review prompt (see Part 3) *before* launch traffic arrives.
6. [ ] **Localised store listings** — you're global. Even just localising the Title +
       Subtitle + keywords for your top non-English markets (e.g. German, French,
       Spanish) unlocks whole new search pools cheaply. Start with the 2–3 markets you
       see traffic from.
7. [ ] **Iterate** — change *one* field at a time and watch the search-term report;
       ASO is a measure-and-adjust loop, not a one-shot.

---

## Part 2 — Web SEO keyword map (the landing page)

The site's job: win brand queries, catch high-intent long-tails, and feed rich
snippets. Map each cluster to where it already lives on the page.

### Tier 1 — Primary (target on the homepage `<title>` / H1 / hero)

| Keyword cluster | Intent | On-page home |
|---|---|---|
| toddler learning app / app for toddlers | High | Title, hero |
| offline kids app / offline toddler app | High, low competition | Title, FAQ, promises |
| safe app for kids / ad-free kids app | High trust intent | Promises, FAQ |
| educational app for 2–6 year olds | High | Hero subtext, schema |

### Tier 2 — Secondary (H2s / body / FAQ)

| Keyword cluster | Home section |
|---|---|
| app for 2 / 3 / 4 year olds | Hero "Ages 2–6", FAQ "What age…" |
| pretend play app | "Nine things to play with" intro |
| kids app no ads / no in-app purchases | Promises, "How much…" FAQ |
| learning games for kids | Activities section |
| kids app for iPad / tablet | "Made for tablets too" |

### Tier 3 — Long-tail (the activity blurbs — already added)

Each activity now carries its own intent phrase. These are low-volume individually but
convert well and are low-competition:

| Activity | Long-tail query it targets |
|---|---|
| Clock | "app to help kids tell the time", "learning clock app" |
| Calculator | "counting app for toddlers", "first numbers app" |
| Phone | "pretend phone app for kids", "toy phone app" |
| Camera | "safe camera app for kids" |
| Restaurant | "pretend play restaurant app" |
| Trains & Buses | "travel game for kids", "pretend tickets" |
| Rescue | "emergency vehicles game for kids" |
| Drawing | "drawing / finger-painting app for toddlers" |
| Timer | "visual timer for kids" |

**Gap / opportunity:** these long-tails currently live as *sections of one page*. If you
later want to rank harder for any single one (e.g. "learning clock app"), give it its
own URL (`/activities/clock`) with a screenshot, a paragraph, and its own title/meta.
Only worth it once the homepage is ranking and you see which activities pull traffic.

---

## Part 3 — Supporting moves

- **Reviews plan:** trigger an in-app rating prompt after a few positive sessions (e.g.
  3rd–5th open), never on first launch. iOS: `SKStoreReviewController`. Android: Play
  In-App Review API. Ratings drive both store ranking and (later) rich-snippet stars on
  the website — but never fake an `aggregateRating` in the site schema; add it only when
  real store ratings exist.
- **Backlinks / referral:** get listed in parenting-app roundups and kids-app
  directories (Common Sense Media, parenting blogs, "best offline apps for toddlers"
  listicles). These are the realistic web-authority wins for this niche.
- **Instagram → site → store:** you already funnel via `@kidpad.app`. Make sure every
  bio/story link lands on the homepage (not a dead store link) until the apps are live.
- **Measure what matters:** the real KPI is **store-badge click-through**, not pageviews.
  This is **already wired** — each badge fires its own GA4 event (`app_store_click` /
  `google_play_click`, with `location` + `link_url`) via `app/components/StoreBadges.tsx`.
  Just confirm the events land in GA4 once the real store URLs replace the `"#"`
  placeholders.

---

## Immediate next actions

1. Drop the recommended **Title / Subtitle / keyword field / short description** into
   App Store Connect and Play Console when you submit (or update, since they're in review).
2. Validate the keyword picks against the real popularity scores in each console.
3. Prep **screenshots with captions** — highest conversion lever.
4. Wire an **in-app review prompt** before launch traffic arrives.
5. Confirm the **store-badge GA events** land in GA4 once the real store URLs are live
   (tracking is already implemented in `StoreBadges.tsx`).
