import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd } from "../lib/seo";

const PAGE_PATH = "/app-pinning";
const PAGE_TITLE = "Lock KidPad to One App with Android App Pinning";
const PAGE_DESCRIPTION =
  "A step-by-step parent's guide to Android's App pinning (screen pinning), so your child stays inside KidPad and can't reach the rest of your phone or tablet.";

const breadcrumb = breadcrumbJsonLd([
  { name: SITE_NAME, path: "" },
  { name: "App Pinning", path: PAGE_PATH },
]);

const GOOGLE_ARTICLE_URL = "https://support.google.com/android/answer/9455138";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "app pinning",
    "screen pinning",
    "lock Android to one app",
    "lock phone to one app",
    "app pinning KidPad",
    "kids single app mode Android",
    "stop child leaving app Android",
    "pin screen Android",
  ],
  openGraph: {
    title: `${PAGE_TITLE} · KidPad`,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    type: "article",
  },
};

/** Steps to turn on App pinning, used for both the visible list and HowTo JSON-LD. */
const ENABLE_STEPS = [
  {
    title: "Open the Settings app",
    body: "On your phone or tablet, tap the Settings icon (the cog).",
  },
  {
    title: "Tap Security (or Security & privacy)",
    body: "The exact name varies by brand — it may be Security, Security & privacy, or Privacy. On some phones you'll then tap More security settings.",
  },
  {
    title: "Find App pinning",
    body: "Tap App pinning. It's sometimes under an Advanced or More settings section on the Security screen.",
  },
  {
    title: "Turn App pinning on",
    body: "Switch the App pinning toggle on.",
  },
  {
    title: "Require your PIN to unpin",
    body: "Turn on “Ask for PIN before unpinning” (wording varies). This means KidPad can't be closed without your screen lock PIN, pattern or password — so set a screen lock first if you don't have one.",
  },
];

const PIN_STEPS = [
  {
    title: "Open KidPad",
    body: "Launch the KidPad app as normal.",
  },
  {
    title: "Open the Recent apps view",
    body: "With gesture navigation, swipe up from the bottom of the screen and hold. With 3-button navigation, tap the Overview (square) button.",
  },
  {
    title: "Tap the KidPad icon",
    body: "At the top of the KidPad card, tap the app's icon to open its menu.",
  },
  {
    title: "Tap Pin",
    body: "Choose Pin. If you're asked for your PIN, pattern or password, enter it. KidPad is now locked to the screen.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}${PAGE_PATH}`,
  totalTime: "PT2M",
  step: [...ENABLE_STEPS, ...PIN_STEPS].map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.body,
  })),
};

export default function AppPinningGuide() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />

      {/* header */}
      <div className="flex flex-col items-center pt-14 text-center sm:pt-20">
        <Link href="/" className="inline-flex flex-col items-center">
          <Image
            src="/icon.png"
            alt="KidPad app icon"
            width={72}
            height={72}
            className="h-16 w-16 rounded-[18px] shadow-[var(--shadow-soft)]"
          />
        </Link>
        <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-green-dark">
          Parent&apos;s guide · Android
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Lock your child into KidPad
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          Android&apos;s built-in <strong>App pinning</strong> (also called screen
          pinning) keeps your child inside KidPad — they can&apos;t reach the Home
          Screen, open other apps, or see your messages and photos until you
          unpin it. Here&apos;s how to set it up in a couple of minutes.
        </p>
      </div>

      {/* what you'll need */}
      <div className="mt-10 rounded-[var(--radius-lg)] bg-surface-alt/70 p-6 ring-1 ring-[rgba(58,46,42,0.06)] sm:p-7">
        <h2 className="font-display text-lg font-bold text-ink">
          Before you start
        </h2>
        <ul className="mt-3 space-y-2 text-ink-soft">
          <li className="flex gap-2">
            <span aria-hidden="true">✅</span>
            <span>An Android phone or tablet (App pinning is on Android 5.0 and later).</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">✅</span>
            <span>KidPad installed from Google Play.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">✅</span>
            <span>
              A screen lock (PIN, pattern or password) set on your device, so your
              child can&apos;t unpin without it.
            </span>
          </li>
        </ul>
      </div>

      {/* Part 1 — enable */}
      <StepSection
        label="Part 1"
        title="Turn on App pinning"
        intro="You only do this once. It switches the feature on and makes unpinning need your screen lock."
        steps={ENABLE_STEPS}
        accent="green"
      />

      {/* Part 2 — pin */}
      <StepSection
        label="Part 2"
        title="Pin KidPad to the screen"
        intro="Do this each time you hand the device to your child."
        steps={PIN_STEPS}
        accent="blue"
        startAt={ENABLE_STEPS.length}
      />

      {/* Part 3 — unpin */}
      <section className="mt-12 rounded-[var(--radius-xl)] bg-surface/80 p-7 shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)] sm:p-9">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-coral-dark">
          Part 3
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Unpinning to leave KidPad
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          When you want to unlock the device, the gesture depends on how your
          phone is set up:
        </p>
        <ol className="mt-4 space-y-3">
          <PlainStep n={1}>
            <strong>Gesture navigation:</strong> swipe up from the bottom of the
            screen and hold.
          </PlainStep>
          <PlainStep n={2}>
            <strong>3-button navigation:</strong> touch and hold the Back and
            Overview (square) buttons at the same time.
          </PlainStep>
          <PlainStep n={3}>
            <strong>2-button navigation:</strong> touch and hold the Back and Home
            buttons at the same time.
          </PlainStep>
          <PlainStep n={4}>
            Enter your <strong>PIN, pattern or password</strong> when prompted.
            You&apos;re back to normal — and your child can&apos;t do this
            themselves without it.
          </PlainStep>
        </ol>
      </section>

      {/* tip */}
      <div className="mt-8 rounded-[var(--radius-lg)] bg-yellow/15 p-6 ring-1 ring-[rgba(242,169,30,0.35)]">
        <p className="font-display font-bold text-ink">💡 Handy to know</p>
        <p className="mt-2 leading-relaxed text-ink-soft">
          Menu names differ between brands — on Samsung, App pinning is called{" "}
          <strong>Pin windows</strong>, under Settings › Security and privacy ›
          More security settings. If you can&apos;t find it, search your Settings
          app for <em>&ldquo;pinning&rdquo;</em>. And always turn on the option to
          ask for your PIN before unpinning — otherwise the pin can be removed
          without it.
        </p>
      </div>

      {/* source */}
      <p className="mt-8 text-center text-sm text-ink-soft">
        Based on Google&apos;s official guide:{" "}
        <a
          href={GOOGLE_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-dark underline decoration-2 underline-offset-2"
        >
          Pin &amp; unpin screens
        </a>
        . Exact wording and menu names can vary between Android versions and phone
        brands.
      </p>

      {/* cross-link to iOS */}
      <p className="mt-6 text-center text-sm text-ink-soft">
        On an iPhone or iPad instead?{" "}
        <Link
          href="/guided-access"
          className="font-semibold text-blue-dark hover:underline"
        >
          See the Guided Access guide
        </Link>
        .
      </p>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="font-display font-semibold text-blue-dark hover:underline"
        >
          ← Back to KidPad
        </Link>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Building blocks                                                    */
/* ------------------------------------------------------------------ */

const ACCENT = {
  blue: { badge: "bg-blue text-white", label: "text-blue-dark" },
  green: { badge: "bg-green text-white", label: "text-green-dark" },
} as const;

function StepSection({
  label,
  title,
  intro,
  steps,
  accent,
  startAt = 0,
}: {
  label: string;
  title: string;
  intro: string;
  steps: { title: string; body: string }[];
  accent: keyof typeof ACCENT;
  startAt?: number;
}) {
  const colors = ACCENT[accent];
  return (
    <section className="mt-12">
      <p
        className={`font-display text-sm font-bold uppercase tracking-wide ${colors.label}`}
      >
        {label}
      </p>
      <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
        {title}
      </h2>
      <p className="mt-2 leading-relaxed text-ink-soft">{intro}</p>

      <ol className="mt-6 space-y-4">
        {steps.map((step, i) => (
          <li
            key={step.title}
            className="flex gap-4 rounded-[var(--radius-lg)] bg-surface/80 p-5 shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)]"
          >
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-lg font-extrabold ${colors.badge}`}
              aria-hidden="true"
            >
              {startAt + i + 1}
            </span>
            <div>
              <h3 className="font-display text-lg font-bold text-ink">
                {step.title}
              </h3>
              <p className="mt-1 leading-relaxed text-ink-soft">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function PlainStep({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-coral font-display text-sm font-extrabold text-white"
        aria-hidden="true"
      >
        {n}
      </span>
      <span className="leading-relaxed text-ink-soft">{children}</span>
    </li>
  );
}
