# KidPad — Holding Page

A simple, mobile-first landing page for **KidPad**, a children's learning app.
Built to be shared from social media: quick context about the app, screenshots,
and prominent App Store / Google Play download buttons. Built with Next.js 16
(App Router) and Tailwind CSS v4, and deploys as a fully static site.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build

```bash
npm run build    # static output; all routes prerendered
npm run start
```

## Things to update before going live

- **Store links** — in `app/page.tsx`, set `APP_STORE_URL` and `GOOGLE_PLAY_URL`
  to the real listing URLs (currently `"#"` placeholders).
- **Canonical URL** — set the `NEXT_PUBLIC_SITE_URL` env var to the production
  domain (defaults to `https://kidpad.app`). Used for Open Graph / social
  metadata in `app/layout.tsx`.

## Assets

- `app/icon.png` — app icon, auto-served as the favicon by Next.js.
- `public/icon.png` — app icon used in the hero and the social share image.
- `public/screenshots/*.png` — device screenshots (720px wide) shown in the
  phone mockups. Sourced from the app's App Store screenshots.
- `app/opengraph-image.tsx` — generates the 1200×630 social share card.

## Design

Colours, fonts (Baloo 2 + Nunito), rounding and shadows mirror the app's own
theme. Tokens live in `app/globals.css`.

## Feedback form

`/feedback` is a page with a client-side form (`app/feedback/`). It POSTs to the
Route Handler at `app/api/feedback/route.ts`, which on Cloudflare Pages is
compiled into a Worker by the Next.js adapter. The handler:

1. verifies a **Cloudflare Turnstile** token to block spam, then
2. emails the message to the site owner via the **Resend** API.

The handler uses the default **Node.js runtime** (the edge runtime is deprecated
in Next 16), which matches Cloudflare's current `@opennextjs/cloudflare` adapter.

### One-time setup

1. **Turnstile** — create a widget at Cloudflare Dashboard → Turnstile. Note the
   **site key** (public) and **secret key**.
2. **Resend** — create an API key at <https://resend.com/api-keys>, and verify
   the sending domain **`mail.kidpad.app`** in Resend (add the DNS records it
   provides). The form sends from `feedback@mail.kidpad.app` by default; override
   with `FEEDBACK_FROM_EMAIL` if needed.
3. In the **Cloudflare Pages** project → Settings → Environment variables, add:

   | Variable | Type | Notes |
   | --- | --- | --- |
   | `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Plaintext (**Build**) | Public site key — inlined at `next build` |
   | `TURNSTILE_SECRET_KEY` | Secret | Turnstile secret key |
   | `RESEND_API_KEY` | Secret | Resend API key |
   | `FEEDBACK_TO_EMAIL` | Plaintext | Optional; defaults to `admin@codebytwo.com` |
   | `FEEDBACK_FROM_EMAIL` | Plaintext | Optional; defaults to `feedback@mail.kidpad.app` (domain must be verified in Resend) |

### Local testing

Copy `.env.example` → `.env.local` (the defaults use Cloudflare's "always
passes" test Turnstile keys) and run `npm run dev`. `next dev` runs the Route
Handler in-process, so you can submit the form end-to-end once `RESEND_API_KEY`
is set.

## Deploy

Deploys on **Cloudflare Pages** via the Next.js adapter (the Pages "Next.js"
framework preset). The feedback Route Handler ships as a Worker automatically —
see [Feedback form](#feedback-form) for the required env vars.

> If you instead switch the site to a **static export** (`output: 'export'`),
> Route Handlers that read the request are unsupported — move the handler to a
> Cloudflare Pages Function at `functions/api/feedback.ts` (export
> `onRequestPost`, read secrets from `context.env`).
