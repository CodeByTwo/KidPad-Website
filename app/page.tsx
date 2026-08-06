import Image from "next/image";
import Link from "next/link";
import { AppStoreBadge, GooglePlayBadge } from "./components/StoreBadges";

/* Update these once the store listings are live. */
const APP_STORE_URL = "#";
const GOOGLE_PLAY_URL = "#";

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
  { src: "/screenshots/drawing.png", alt: "Finger-painting canvas in KidPad" },
  { src: "/screenshots/clock.png", alt: "Analogue learning clock in KidPad" },
  { src: "/screenshots/restaurant.png", alt: "Pretend restaurant menu in KidPad" },
  { src: "/screenshots/tickets.png", alt: "Printed travel tickets in KidPad" },
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
    title: "No ads or purchases",
    body: "Nothing to buy, no in-app purchases and nothing to delete by accident.",
    emoji: "✨",
    color: "var(--color-coral)",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 pb-20 text-center">
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
          A playful little world your child can explore on their own — a home
          screen of big, brightly coloured apps where every tap leads somewhere
          harmless. There&apos;s nothing to buy, no one to contact and no way out
          to the wider internet.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <AppStoreBadge href={APP_STORE_URL} />
          <GooglePlayBadge href={GOOGLE_PLAY_URL} />
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          For iPhone, iPad &amp; Android · Ages 2–6
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/*  Screenshots                                                     */}
      {/* ---------------------------------------------------------------- */}
      <section className="mt-16 w-full sm:mt-24">
        <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 lg:justify-center">
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
            <AppStoreBadge href={APP_STORE_URL} />
            <GooglePlayBadge href={GOOGLE_PLAY_URL} />
          </div>
        </div>
      </section>

      <footer className="mt-16 flex flex-col items-center gap-2 text-sm text-ink-soft">
        <Link href="/privacy" className="font-semibold hover:underline">
          Privacy Policy
        </Link>
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
