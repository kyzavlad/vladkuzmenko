/**
 * Shared brand marks for platforms lucide-react does not ship correctly.
 *
 * lucide's `Twitter` is the old bird and no longer represents X, and there is no
 * TikTok glyph at all. Two small inline paths avoid pulling in an icon package
 * and keep both surfaces (personal section + footer) visually identical.
 */

type IconProps = { className?: string };

/** X (formerly Twitter) wordmark glyph. */
export function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M17.53 3h3.02l-6.6 7.54L21.75 21h-5.9l-4.63-6.05L5.93 21H2.9l7.06-8.07L2.25 3h6.05l4.19 5.53L17.53 3zm-1.06 16.2h1.67L7.6 4.71H5.81l10.66 14.49z" />
    </svg>
  );
}

/** TikTok note glyph. */
export function TikTokIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 3.36-2.47v-3.2a5.8 5.8 0 0 0-.77-.05A5.79 5.79 0 0 0 4.07 15.4a5.79 5.79 0 0 0 5.79 5.79 5.79 5.79 0 0 0 5.79-5.79V9.01a7.35 7.35 0 0 0 4.29 1.37V7.29a4.29 4.29 0 0 1-3.34-1.47z" />
    </svg>
  );
}
