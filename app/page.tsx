import Image from "next/image";
import Link from "next/link";
import { AppStoreBadge, GooglePlayBadge } from "./components/StoreBadges";
import {
  DESCRIPTION,
  PUBLISHER,
  PUBLISHER_URL,
  SITE_NAME,
  SITE_URL,
} from "./lib/seo";

/* Update these once the store listings are live. */
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

const SUPPORT_EMAIL = "support@kidpad.app";

const activities = [
  { name: "Drawing", emoji: "🎨", color: "var(--color-purple)" },
  { name: "Camera", emoji: "📷", color: "var(--color-blue)" },
  { name: "Restaurant", emoji: "🍎", color: "var(--color-orange)" },
  { name: "Trains & Buses", emoji: "🚆", color: "var(--color-blue-dark)" },
  { name: "Rescue", emoji: "🚑", color: "var(--color-coral)" },
  { name: "Phone", emoji: "📞", color: "var(--color-teal)" },
  { name: "Clock", emoji: "🕓", color: "var(--color-pink)" },
  { name: "Timer", emoji: "⏱️", color: "var(--color-teal)" },
  { name: "Calculator", emoji: "🔢", color: "var(--color-green)" },
];

const screenshots = [
  { src: "/screenshots/home.png", alt: "KidPad home screen with big colourful app icons" },
  { src: "/screenshots/camera.png", alt: "In-app camera viewfinder in KidPad" },
  { src: "/screenshots/phone.png", alt: "Pretend phone call in KidPad" },
  { src: "/screenshots/clock.png", alt: "Analogue learning clock in KidPad" },
  { src: "/screenshots/calculator.png", alt: "Colourful calculator in KidPad" },
  { src: "/screenshots/timer.png", alt: "Pick-a-timer screen in KidPad" },
  { src: "/screenshots/drawing.png", alt: "Finger-painting canvas in KidPad" },
  { src: "/screenshots/rescue.png", alt: "Rescue callout in KidPad" },
  { src: "/screenshots/restaurant.png", alt: "Pretend restaurant menu in KidPad" },
  { src: "/screenshots/tickets.png", alt: "Printed travel tickets in KidPad" },
];

const tabletShots = [
  { src: "/screenshots/tablet/home.png", alt: "KidPad home screen on an iPad, filling the wider tablet display" },
  { src: "/screenshots/tablet/restaurant.png", alt: "Pretend restaurant in KidPad on a tablet, with the menu and order side by side" },
  { src: "/screenshots/tablet/clock.png", alt: "Learning clock in KidPad on a tablet, clock face and digital time shown together" },
  { src: "/screenshots/tablet/drawing.png", alt: "Finger-painting canvas in KidPad using the full width of a tablet" },
];

const promises = [
  {
    title: "Private & offline",
    body: "No accounts, no internet, no way out to the web. Drawings and photos stay on the device.",
    emoji: "🔒",
    color: "var(--color-green)",
  },
  {
    title: "Parent-protected",
    body: "A PIN-locked settings screen lets you choose which activities show and mute all sound.",
    emoji: "🛡️",
    color: "var(--color-blue)",
  },
  {
    title: "No ads or in-app buys",
    body: "No advertising and no in-app purchases — and nothing to delete by accident.",
    emoji: "✨",
    color: "var(--color-coral)",
  },
];

/*
 * FAQ copy. The visible answers below MUST stay identical to the text sent to
 * search engines in the FAQPage schema, or Google will drop the rich result —
 * both read from this one array, so keep it that way.
 */
const faqs = [
  {
    question: "What age is KidPad for?",
    answer:
      "KidPad is designed for young children aged roughly 2 to 6. The big, colourful buttons and simple pretend-play activities suit toddlers and preschoolers who are still learning to tap, swipe and explore on their own.",
  },
  {
    question: "Is KidPad safe for kids?",
    answer:
      "Yes. KidPad has no ads, no in-app purchases, no accounts and no links out to the web, so there is nothing for a child to stumble into. A PIN-locked settings screen lets you choose which activities appear and mute all sound.",
  },
  {
    question: "Does KidPad work offline?",
    answer:
      "Completely. KidPad runs fully offline and never connects to the internet, so you can hand it over on a plane, in the car or anywhere with no signal — and know nothing is being sent anywhere.",
  },
  {
    question: "Does KidPad collect any personal data?",
    answer:
      "No. KidPad collects no personal information and has no analytics or tracking. Anything created in the app — drawings, photos and settings — stays on the device and is never uploaded. You can read the full details on our privacy page.",
  },
  {
    question: "How much does KidPad cost?",
    answer:
      "KidPad is a one-off purchase of £2.99 — shown in your local currency outside the UK. There are no subscriptions, no advertising and no in-app purchases, so you pay once and there is nothing more to buy inside the app and no way for a child to spend money by accident.",
  },
  {
    question: "What devices does KidPad run on?",
    answer:
      "KidPad is available for iPhone and iPad on the App Store, and for Android phones and tablets on Google Play.",
  },
  {
    question: "What can children do in KidPad?",
    answer:
      "KidPad has nine self-contained activities: drawing, a pretend camera and phone, a restaurant, trains and buses, a rescue game, a learning clock, a timer and a calculator. Each one is playful pretend-play that quietly teaches along the way.",
  },
  {
    question: "How do I suggest a feature or report a problem?",
    answer:
      `We'd love to hear from you. Use the feedback form on our website to send a feature request, report a bug, or just say hello — every message reaches the KidPad team directly. You can also email us at ${SUPPORT_EMAIL}.`,
  },
];

/**
 * Structured data (schema.org) so search engines can render a rich result for
 * the app. No aggregateRating is included — inventing review counts violates
 * Google's structured-data guidelines. Add it once real store ratings exist.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MobileApplication",
      "@id": `${SITE_URL}/#app`,
      name: SITE_NAME,
      description: DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/icon.png`,
      applicationCategory: "EducationalApplication",
      operatingSystem: "iOS, iPadOS, Android",
      inLanguage: "en-GB",
      offers: {
        "@type": "Offer",
        price: "2.99",
        priceCurrency: "GBP",
        availability: "https://schema.org/InStock",
      },
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: 2,
        suggestedMaxAge: 6,
      },
      screenshot: [...screenshots, ...tabletShots].map(
        (s) => `${SITE_URL}${s.src}`,
      ),
      sameAs: ["https://instagram.com/kidpad.app"],
      publisher: { "@id": `${PUBLISHER_URL}/#org` },
    },
    {
      "@type": "Organization",
      "@id": `${PUBLISHER_URL}/#org`,
      name: PUBLISHER,
      url: PUBLISHER_URL,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "en-GB",
      publisher: { "@id": `${PUBLISHER_URL}/#org` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      inLanguage: "en-GB",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.answer,
        },
      })),
    },
  ],
};

/*
 * Render a FAQ answer, turning the support email into a mailto link. The raw
 * `answer` string above stays the source of truth for the FAQPage schema — the
 * anchor's text is the same email, so the visible and structured text still
 * match (Google compares text content, not markup).
 */
function renderAnswer(answer: string) {
  const parts = answer.split(SUPPORT_EMAIL);
  if (parts.length === 1) return answer;

  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a
            key={i}
            href={`mailto:${SUPPORT_EMAIL}`}
            className="font-semibold text-ink hover:underline"
          >
            {SUPPORT_EMAIL}
          </a>,
          part,
        ],
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full px-5 pb-20 text-center">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ---------------------------------------------------------------- */}
      {/*  Hero                                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="flex flex-col items-center pt-16 sm:pt-24">
        <Image
          src="/icon.png"
          alt="KidPad app icon"
          width={128}
          height={128}
          priority
          className="h-28 w-28 rounded-[28px] shadow-[var(--shadow-lift)] sm:h-32 sm:w-32"
        />

        <h1 className="mt-6 font-display text-5xl font-extrabold tracking-tight text-ink sm:text-6xl">
          KidPad
        </h1>
        <p className="mt-2 font-display text-xl font-semibold text-ink-soft sm:text-2xl">
          Have Fun and Learn
        </p>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85 sm:text-xl">
          A little world of big, colourful pretend apps for your child to
          explore. Completely safe — no ads, no accounts and no way onto the
          internet.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <AppStoreBadge href={APP_STORE_URL} location="hero" />
          <GooglePlayBadge href={GOOGLE_PLAY_URL} location="hero" />
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          For iPhone, iPad &amp; Android · Ages 2–6
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Screenshots                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 -mx-5 sm:mt-24">
        <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
          {screenshots.map((shot) => (
            <div
              key={shot.src}
              className="phone w-[190px] shrink-0 snap-center sm:w-[210px]"
            >
              <div className="phone-screen">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={720}
                  height={1565}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Great on tablets too                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 w-full sm:mt-24">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Made for tablets too
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          KidPad isn&apos;t just for phones. On an iPad or Android tablet every
          activity stretches to fill the bigger screen — perfect for little
          hands to explore.
        </p>

        <div className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:px-8">
          {tabletShots.map((shot) => (
            <div
              key={shot.src}
              className="tablet w-[300px] shrink-0 snap-center sm:w-[420px]"
            >
              <div className="tablet-screen">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={2360}
                  height={1640}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Nine things to play with                                        */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 w-full sm:mt-24">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Nine things to play with
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">
          Each icon opens a self-contained activity — pretend play that quietly
          teaches along the way.
        </p>

        <ul className="mx-auto mt-8 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-3">
          {activities.map((a) => (
            <li
              key={a.name}
              className="flex items-center gap-3 rounded-[var(--radius-lg)] bg-surface/80 p-3 text-left shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)]"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-md)] text-xl"
                style={{ backgroundColor: a.color }}
                aria-hidden="true"
              >
                {a.emoji}
              </span>
              <span className="font-display font-semibold text-ink">
                {a.name}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Reassurance for grown-ups                                       */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 w-full sm:mt-24">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Made for peace of mind
        </h2>
        <div className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-3">
          {promises.map((p) => (
            <div
              key={p.title}
              className="rounded-[var(--radius-xl)] bg-surface/80 p-6 text-left shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)]"
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] text-2xl"
                style={{ backgroundColor: p.color }}
                aria-hidden="true"
              >
                {p.emoji}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-ink">
                {p.title}
              </h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Frequently asked questions                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 w-full sm:mt-24">
        <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mx-auto mt-8 grid max-w-2xl gap-3">
          {faqs.map((f) => (
            <details
              key={f.question}
              className="group rounded-[var(--radius-lg)] bg-surface/80 p-5 text-left shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-display font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {f.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-soft transition-transform duration-200 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-soft">
                {renderAnswer(f.answer)}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Final call to action                                            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 w-full sm:mt-24">
        <div className="mx-auto max-w-2xl rounded-[var(--radius-xl)] bg-gradient-to-b from-[#fffdf8] to-[#fff3dc] p-8 shadow-[var(--shadow-lift)] ring-1 ring-[rgba(58,46,42,0.06)] sm:p-10">
          <h2 className="font-display text-3xl font-extrabold text-ink sm:text-4xl">
            Ready to explore?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">
            Download KidPad and hand it over with confidence.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AppStoreBadge href={APP_STORE_URL} location="cta" />
            <GooglePlayBadge href={GOOGLE_PLAY_URL} location="cta" />
          </div>
          <p className="mt-6 text-[15px] text-ink-soft">
            Not ready yet?{" "}
            <a
              href="https://instagram.com/kidpad.app"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink hover:underline"
            >
              Follow along on Instagram
            </a>
          </p>
          <p className="mt-2 text-[15px] text-ink-soft">
            Got an idea or spotted a bug?{" "}
            <Link
              href="/feedback"
              className="font-semibold text-ink hover:underline"
            >
              Send us your feedback
            </Link>
          </p>
        </div>
      </section>

      <footer className="mt-16 flex flex-col items-center gap-2 text-sm text-ink-soft">
        <div className="flex items-center gap-3">
          <Link href="/privacy" className="font-semibold hover:underline">
            Privacy Policy
          </Link>
          <span aria-hidden="true">·</span>
          <Link href="/feedback" className="font-semibold hover:underline">
            Feedback
          </Link>
          <span aria-hidden="true">·</span>
          <a
            href="https://instagram.com/kidpad.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="KidPad on Instagram"
            className="inline-flex items-center gap-2 text-base font-semibold hover:underline"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Instagram
          </a>
        </div>
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://codebytwo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:underline"
          >
            CodeByTwo
          </a>{" "}
          · Made with care for little hands
        </p>
      </footer>
    </main>
  );
}
