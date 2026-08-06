import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "KidPad's privacy policy. Everything stays on the device — no accounts, no tracking, and nothing is sent to any server.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy · KidPad",
    description:
      "KidPad's privacy policy. Everything stays on the device — no accounts, no tracking, and nothing is sent to any server.",
    url: "/privacy",
    type: "article",
  },
};

const CONTACT_EMAIL = "admin@codebytwo.com";
const LAST_UPDATED = "6 August 2026";

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-20">
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
        <h1 className="mt-6 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-ink-soft">Last updated {LAST_UPDATED}</p>
      </div>

      {/* body */}
      <div className="mt-10 rounded-[var(--radius-xl)] bg-surface/80 p-7 shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)] sm:p-9">
        <p className="text-lg leading-relaxed text-ink">
          KidPad is made for young children, so we keep privacy about as simple
          as it gets: <strong>everything stays on your device.</strong> KidPad
          has no accounts, collects no personal information, and sends nothing to
          any server.
        </p>

        <Section title="What we collect">
          Nothing. There is no sign-up, no account and no login. We do not ask
          for your name, email, phone number or any other personal details, and
          we do not track how you use the app.
        </Section>

        <Section title="What stays on your device">
          Anything created inside KidPad — drawings, photos taken in the app,
          the grown-ups&apos; PIN, the names in the pretend phone book, and your
          settings — is stored only on the device the app is installed on. It is
          never uploaded, shared or synced anywhere.
        </Section>

        <Section title="Camera &amp; photos">
          If your child takes a photo in KidPad, it is saved inside the app&apos;s
          own private gallery — not your device&apos;s photo library — and it
          never leaves the device. KidPad does not access photos taken outside
          the app.
        </Section>

        <Section title="No network, no third parties">
          KidPad works fully offline. There is no advertising, no analytics, no
          tracking and no third-party services. Because nothing is sent to the
          internet, there is nothing for anyone else to see or collect.
        </Section>

        <Section title="Children's privacy">
          KidPad is designed for children and is built to be safe for them to use
          on their own. Since we collect no personal information from anyone,
          including children, there is no personal data to store, share or sell.
        </Section>

        <Section title="Deleting your data">
          Because everything lives on the device, you are always in control.
          Deleting a drawing or photo in the app removes it, and uninstalling
          KidPad permanently removes everything the app has stored.
        </Section>

        <Section title="Changes to this policy">
          If this policy ever changes, we will update the date at the top of this
          page. As the app stays on-device and account-free, we don&apos;t expect
          the essentials to change.
        </Section>

        <Section title="Contact">
          Questions about privacy in KidPad? Email us at{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-blue-dark underline decoration-2 underline-offset-2"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </Section>
      </div>

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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="font-display text-xl font-bold text-ink">{title}</h2>
      <p className="mt-2 leading-relaxed text-ink-soft">{children}</p>
    </section>
  );
}
