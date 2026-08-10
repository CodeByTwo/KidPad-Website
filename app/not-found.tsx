import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "Oops — that page has wandered off. Let's head back home.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-col items-center px-5 pb-20 pt-24 text-center sm:pt-32">
      <Link href="/" className="inline-flex flex-col items-center">
        <Image
          src="/icon.png"
          alt="KidPad app icon"
          width={112}
          height={112}
          priority
          className="h-24 w-24 rounded-[24px] shadow-[var(--shadow-lift)] sm:h-28 sm:w-28"
        />
      </Link>

      <p className="mt-8 font-display text-6xl font-extrabold tracking-tight text-ink sm:text-7xl">
        404
      </p>
      <h1 className="mt-4 font-display text-3xl font-bold text-ink sm:text-4xl">
        This page wandered off
      </h1>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-ink/85">
        We couldn&apos;t find the page you were looking for. It might have moved,
        or the link might be a little wonky.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-lg)] bg-ink px-6 py-3 font-display font-semibold text-surface shadow-[var(--shadow-soft)] transition-transform hover:scale-[1.03]"
      >
        Take me home
      </Link>
    </main>
  );
}
