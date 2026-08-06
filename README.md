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

## Deploy

Any static host works. On [Vercel](https://vercel.com), import the repo — the
Next.js framework preset needs no extra configuration.
