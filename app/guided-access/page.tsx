import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE_NAME, SITE_URL, breadcrumbJsonLd } from "../lib/seo";

const PAGE_PATH = "/guided-access";
const PAGE_TITLE = "Lock KidPad to One App with iOS Guided Access";
const PAGE_DESCRIPTION =
  "A step-by-step parent's guide to turning on Apple's Guided Access, so your child stays inside KidPad and can't reach the rest of your iPhone or iPad.";

const breadcrumb = breadcrumbJsonLd([
  { name: SITE_NAME, path: "" },
  { name: "Guided Access", path: PAGE_PATH },
]);

const APPLE_ARTICLE_URL = "https://support.apple.com/en-us/111795";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  keywords: [
    "Guided Access",
    "lock iPhone to one app",
    "lock iPad to one app",
    "Guided Access KidPad",
    "kids single app mode iPhone",
    "stop child leaving app",
    "iOS Guided Access setup",
  ],
  openGraph: {
    title: `${PAGE_TITLE} · KidPad`,
    description: PAGE_DESCRIPTION,
    url: PAGE_PATH,
    type: "article",
  },
};

/** Steps to enable Guided Access, used for both the visible list and HowTo JSON-LD. */
const ENABLE_STEPS = [
  {
    title: "Open the Settings app",
    body: "On your iPhone or iPad, tap the grey Settings icon on the Home Screen.",
  },
  {
    title: "Go to Accessibility",
    body: "Scroll down and tap Accessibility.",
  },
  {
    title: "Tap Guided Access",
    body: "It's near the bottom, under the General heading.",
  },
  {
    title: "Turn Guided Access on",
    body: "Toggle the Guided Access switch so it turns green.",
  },
  {
    title: "Set a passcode",
    body: "Tap Passcode Settings, then Set Guided Access Passcode, and choose a passcode. This is the code that unlocks the phone from KidPad — pick one your child doesn't know.",
  },
  {
    title: "Optional: allow Face ID or Touch ID",
    body: "On the same Passcode Settings screen you can switch on Face ID or Touch ID as a faster way for you to end a session later.",
  },
];

const START_STEPS = [
  {
    title: "Open KidPad",
    body: "Launch the KidPad app as normal, so it's the app on screen.",
  },
  {
    title: "Triple-click the side button",
    body: "Quickly press the side button three times (the top button on some iPads, or the Home button on older devices). The Guided Access setup screen appears.",
  },
  {
    title: "Tap Start",
    body: "Tap Start in the top-right corner. If this is your first time you'll be asked to set a passcode now. KidPad is now locked to the screen.",
  },
];

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: `${SITE_URL}${PAGE_PATH}`,
  totalTime: "PT2M",
  step: [...ENABLE_STEPS, ...START_STEPS].map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.body,
  })),
};

export default function GuidedAccessGuide() {
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
        <p className="mt-6 font-display text-sm font-bold uppercase tracking-wide text-blue-dark">
          Parent&apos;s guide
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Lock your child into KidPad
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-soft">
          Apple&apos;s built-in <strong>Guided Access</strong> keeps your child
          inside KidPad — they can&apos;t swipe to the Home Screen, open other
          apps, or reach your messages and photos until you unlock it. Here&apos;s
          how to set it up in a couple of minutes.
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
            <span>An iPhone or iPad running a recent version of iOS or iPadOS.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">✅</span>
            <span>KidPad installed from the App Store.</span>
          </li>
          <li className="flex gap-2">
            <span aria-hidden="true">✅</span>
            <span>
              About two minutes. You only need to do the setup once — after that,
              starting a session takes a single triple-click.
            </span>
          </li>
        </ul>
      </div>

      {/* Part 1 — enable */}
      <StepSection
        label="Part 1"
        title="Turn on Guided Access"
        intro="You only do this once. It switches the feature on and sets the passcode that unlocks the phone."
        steps={ENABLE_STEPS}
        accent="blue"
      />

      {/* Part 2 — start */}
      <StepSection
        label="Part 2"
        title="Start a session in KidPad"
        intro="Do this each time you hand the device to your child."
        steps={START_STEPS}
        accent="green"
        startAt={ENABLE_STEPS.length}
      />

      {/* Part 3 — options */}
      <section className="mt-12">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-purple">
          Part 3
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Fine-tune what&apos;s allowed (optional)
        </h2>
        <p className="mt-2 leading-relaxed text-ink-soft">
          On the Guided Access setup screen (before you tap Start), you can lock
          things down even further:
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <OptionCard title="Disable an area of the screen">
            Draw a circle around any part of the screen with your finger to switch
            off touches there.
          </OptionCard>
          <OptionCard title="Hardware buttons">
            Tap <strong>Options</strong> to turn the volume buttons, side/top
            button and motion (rotation and shake) on or off.
          </OptionCard>
          <OptionCard title="Touch">
            Turn <strong>Touch</strong> off entirely if you just want your child to
            watch the screen without tapping.
          </OptionCard>
          <OptionCard title="Time limit">
            Set a <strong>Time Limit</strong> so the session ends itself after,
            say, 20 minutes of KidPad.
          </OptionCard>
        </div>
      </section>

      {/* Part 4 — end */}
      <section className="mt-12 rounded-[var(--radius-xl)] bg-surface/80 p-7 shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)] sm:p-9">
        <p className="font-display text-sm font-bold uppercase tracking-wide text-coral-dark">
          Part 4
        </p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink sm:text-3xl">
          Ending a session
        </h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          When you want to unlock the device:
        </p>
        <ol className="mt-4 space-y-3">
          <PlainStep n={1}>
            <strong>Triple-click the side button</strong> again (top button on
            some iPads, Home button on older devices).
          </PlainStep>
          <PlainStep n={2}>
            Enter your <strong>Guided Access passcode</strong>, or use Face ID /
            Touch ID if you turned it on.
          </PlainStep>
          <PlainStep n={3}>
            Tap <strong>End</strong> in the top-left corner. You&apos;re back to
            normal, and your child can&apos;t do this themselves without the
            passcode.
          </PlainStep>
        </ol>
      </section>

      {/* tip */}
      <div className="mt-8 rounded-[var(--radius-lg)] bg-yellow/15 p-6 ring-1 ring-[rgba(242,169,30,0.35)]">
        <p className="font-display font-bold text-ink">💡 Handy to know</p>
        <p className="mt-2 leading-relaxed text-ink-soft">
          If you forget your Guided Access passcode, you can end a session by
          restarting the device (hold the side and volume buttons). And if you
          triple-click but nothing happens, check that Guided Access is still
          switched on under Settings <Arrow /> Accessibility.
        </p>
      </div>

      {/* source */}
      <p className="mt-8 text-center text-sm text-ink-soft">
        Based on Apple&apos;s official guide:{" "}
        <a
          href={APPLE_ARTICLE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-dark underline decoration-2 underline-offset-2"
        >
          Use Guided Access on iPhone or iPad
        </a>
        . Exact wording and menu names can vary slightly between iOS versions.
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

function OptionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[var(--radius-lg)] bg-surface/80 p-5 shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)]">
      <h3 className="font-display font-bold text-ink">{title}</h3>
      <p className="mt-1 text-sm leading-relaxed text-ink-soft">{children}</p>
    </div>
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

function Arrow() {
  return (
    <span aria-hidden="true" className="text-ink-soft">
      ›
    </span>
  );
}
