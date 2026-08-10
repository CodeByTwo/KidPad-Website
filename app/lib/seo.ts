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

/**
 * Build a schema.org BreadcrumbList for a sub-page, so search engines can show
 * a "KidPad › Privacy Policy" trail in results. Pass the trail root-first; each
 * `path` is joined to SITE_URL ("" for the home page).
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}
