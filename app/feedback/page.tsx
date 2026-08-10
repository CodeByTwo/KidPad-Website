import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FeedbackForm from "./FeedbackForm";
import { SITE_NAME, breadcrumbJsonLd } from "../lib/seo";

const DESCRIPTION =
  "Share a feature request, report a bug, or send the KidPad team a note. Every message reaches us directly.";

const breadcrumb = breadcrumbJsonLd([
  { name: SITE_NAME, path: "" },
  { name: "Feedback", path: "/feedback" },
]);

export const metadata: Metadata = {
  title: "Feedback",
  description: DESCRIPTION,
  alternates: {
    canonical: "/feedback",
  },
  openGraph: {
    title: "Feedback · KidPad",
    description: DESCRIPTION,
    url: "/feedback",
    type: "article",
  },
};

export default function FeedbackPage() {
  return (
    <main className="mx-auto w-full max-w-2xl px-5 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
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
        <h1 className="mt-6 font-display text-4xl font-extrabold text-ink sm:text-5xl">
          Got feedback?
        </h1>
        <p className="mt-3 max-w-md text-ink-soft">
          We&apos;d love to hear from you. Suggest a feature, report a bug, or
          just say hello — every message reaches us directly.
        </p>
      </div>

      <div className="mt-10">
        <FeedbackForm />
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
