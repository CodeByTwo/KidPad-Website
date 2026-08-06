/* Official-style App Store / Google Play badges, self-contained as inline SVG
   so they stay crisp at any size and need no external assets. */

type BadgeProps = {
  href: string;
  className?: string;
};

const badgeBase =
  "inline-flex items-center gap-3 rounded-2xl bg-[#111] px-5 py-3 text-white " +
  "shadow-[var(--shadow-lift)] transition-transform duration-150 " +
  "hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue";

export function AppStoreBadge({ href, className = "" }: BadgeProps) {
  return (
    <a
      href={href}
      className={`${badgeBase} ${className}`}
      aria-label="Download KidPad on the Apple App Store"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="shrink-0"
      >
        <path d="M17.05 12.53c-.02-2.2 1.8-3.26 1.88-3.31-1.02-1.5-2.62-1.7-3.19-1.72-1.36-.14-2.65.8-3.34.8-.68 0-1.75-.78-2.87-.76-1.48.02-2.84.86-3.6 2.18-1.53 2.66-.39 6.6 1.1 8.76.72 1.06 1.58 2.25 2.71 2.21 1.09-.04 1.5-.7 2.82-.7 1.31 0 1.68.7 2.83.68 1.17-.02 1.91-1.08 2.62-2.14.83-1.23 1.17-2.42 1.19-2.48-.03-.01-2.28-.87-2.3-3.46zM14.9 5.98c.6-.73 1.01-1.74.9-2.75-.87.04-1.92.58-2.54 1.3-.56.64-1.05 1.67-.92 2.65.97.08 1.96-.49 2.56-1.2z" />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium tracking-wide opacity-90">
          Download on the
        </span>
        <span className="mt-0.5 block font-display text-[19px] font-semibold leading-tight">
          App Store
        </span>
      </span>
    </a>
  );
}

export function GooglePlayBadge({ href, className = "" }: BadgeProps) {
  return (
    <a
      href={href}
      className={`${badgeBase} ${className}`}
      aria-label="Get KidPad on Google Play"
    >
      <svg
        width="24"
        height="26"
        viewBox="0 0 512 512"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          fill="#00d3ff"
          d="M47 24c-4 2.6-6.5 7.4-6.5 13.6v436.8c0 6.2 2.5 11 6.5 13.6l1.7 1.6L293 260.3v-4.6L48.7 22.4 47 24z"
        />
        <path
          fill="#ffce00"
          d="M374.4 341.7L293 260.3v-4.6l81.5-81.4 1.8 1L473 230c27.7 15.7 27.7 41.4 0 57.2l-96.7 54.5-1.9 0z"
        />
        <path
          fill="#00f076"
          d="M376.3 340.7L293 258 47 504c9.1 9.7 24.2 10.9 41.2 1.2l288-164.5"
        />
        <path
          fill="#f63448"
          d="M376.3 175.3L88.2 10.8C71.2 1 56.1 2.3 47 12l246 246 83.3-82.7z"
        />
      </svg>
      <span className="text-left leading-none">
        <span className="block text-[10px] font-medium tracking-wide opacity-90">
          GET IT ON
        </span>
        <span className="mt-0.5 block font-display text-[19px] font-semibold leading-tight">
          Google Play
        </span>
      </span>
    </a>
  );
}
