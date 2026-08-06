"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

/**
 * Public Turnstile site key. It's inlined at build time, so it MUST be set as a
 * Cloudflare Pages *Build* variable (NEXT_PUBLIC_ vars are baked in during
 * `next build`; a runtime variable is read too late and has no effect).
 *
 * In development it falls back to Cloudflare's "always passes" test key so local
 * dev works out of the box. In a production build we deliberately do NOT fall
 * back: if the key is missing the widget fails to render (and the form can't be
 * submitted) rather than silently showing the "For testing only" test widget,
 * which would wave spam straight through.
 */
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV === "production" ? "" : "1x00000000000000000000AA");
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

type Status = "idle" | "submitting" | "success" | "error";

type TurnstileOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
};

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: TurnstileOptions) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const feedbackTypes = [
  { value: "feature", label: "💡 Feature request" },
  { value: "bug", label: "🐞 Bug report" },
  { value: "other", label: "💬 Something else" },
];

const fieldClasses =
  "mt-2 w-full rounded-[var(--radius-md)] bg-cream/60 px-4 py-3 font-body " +
  "text-ink ring-1 ring-[rgba(58,46,42,0.12)] transition-shadow " +
  "placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-blue";

export default function FeedbackForm() {
  const [type, setType] = useState("feature");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const widgetHost = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);

  // Load the Turnstile script (once) and render the widget into our host div.
  useEffect(() => {
    let poll: ReturnType<typeof setInterval> | undefined;

    function render() {
      if (!widgetHost.current || !window.turnstile || widgetId.current) return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: SITE_KEY,
        theme: "light",
        callback: (t) => setToken(t),
        "error-callback": () => setToken(""),
        "expired-callback": () => setToken(""),
      });
    }

    if (window.turnstile) {
      render();
    } else {
      if (!document.querySelector(`script[src="${SCRIPT_SRC}"]`)) {
        const s = document.createElement("script");
        s.src = SCRIPT_SRC;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
      // Script loads asynchronously; poll until the global is ready.
      poll = setInterval(() => {
        if (window.turnstile) {
          clearInterval(poll);
          render();
        }
      }, 150);
    }

    return () => {
      if (poll) clearInterval(poll);
    };
  }, []);

  function resetWidget() {
    setToken("");
    if (window.turnstile && widgetId.current) {
      window.turnstile.reset(widgetId.current);
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (!message.trim()) {
      setError("Please add a little detail before sending.");
      return;
    }
    if (!token) {
      setError("Please complete the anti-spam check below.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type, message, email, token }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      resetWidget();
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-xl)] bg-surface/80 p-8 text-center shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)] sm:p-10">
        <span
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-[var(--radius-md)] bg-green text-3xl"
          aria-hidden="true"
        >
          🎉
        </span>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink">
          Thank you!
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-ink-soft">
          Your feedback is on its way to us. We read every message — thank you
          for helping make KidPad better.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block font-display font-semibold text-blue-dark hover:underline"
        >
          ← Back to KidPad
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-[var(--radius-xl)] bg-surface/80 p-7 text-left shadow-[var(--shadow-soft)] ring-1 ring-[rgba(58,46,42,0.06)] sm:p-9"
    >
      <label className="block">
        <span className="font-display font-semibold text-ink">
          What&apos;s this about?
        </span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={fieldClasses}
        >
          {feedbackTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block">
        <span className="font-display font-semibold text-ink">Your message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          maxLength={4000}
          required
          placeholder="Tell us what you'd love to see, or what went wrong…"
          className={`${fieldClasses} resize-y`}
        />
      </label>

      <label className="mt-5 block">
        <span className="font-display font-semibold text-ink">
          Your email{" "}
          <span className="font-body font-normal text-ink-soft">(optional)</span>
        </span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={254}
          placeholder="you@example.com"
          autoComplete="email"
          className={fieldClasses}
        />
        <span className="mt-1.5 block text-sm text-ink-soft">
          Only if you&apos;d like a reply.
        </span>
      </label>

      {/* Cloudflare Turnstile renders here */}
      <div ref={widgetHost} className="mt-6 min-h-[65px]" />

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-[var(--radius-md)] bg-coral/15 px-4 py-3 text-sm font-semibold text-coral-dark"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 w-full rounded-[var(--radius-lg)] bg-blue px-6 py-4 font-display text-lg font-bold text-white shadow-[var(--shadow-lift)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send feedback"}
      </button>
    </form>
  );
}
