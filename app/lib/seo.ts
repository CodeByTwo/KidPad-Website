/**
 * Central SEO constants, shared across layout, page, sitemap and robots so the
 * canonical URL and site copy never drift between them.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kidpad.app"
).replace(/\/$/, "");

export const SITE_NAME = "KidPad";

export const TAGLINE = "Have Fun and Learn";

/** Keyword-rich <title> for the home page (brand-first, ~55 chars). */
export const HOME_TITLE = "KidPad — A Safe, Offline Learning App for Young Kids";

export const DESCRIPTION =
  "KidPad is a playful, offline learning app for young children (ages 2–6) — a screen of big, colourful pretend apps to explore, from a camera and phone to drawing, clocks, counting and more. No ads, no accounts, private and parent-protected. For iPhone, iPad & Android.";

export const PUBLISHER = "CodeByTwo";
export const PUBLISHER_URL = "https://codebytwo.com";
