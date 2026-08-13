import type { Metadata } from "next";
import { type Lang, langHref } from "@/lib/i18n";
import { SITE } from "@/lib/site";

/** Absolute production URL for a public asset (share cards must never resolve to a
 *  deployment preview host, so image URLs are written out in full). */
const asset = (path: string): string =>
  path.startsWith("http") ? path : `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

/** Build localized Metadata (canonical + hreflang + OG/Twitter) for a page.
 *  `slug` is "" for the homepage, or e.g. "visibilityos" for /visibilityos. */
export function pageMeta(
  lang: Lang,
  slug: string,
  title: string,
  description: string,
  /** Optional page-specific social image (absolute path under /public). */
  image?: string
): Metadata {
  const path = (l: Lang) => {
    const base = langHref(l); // "/" | "/ua" | "/ru"
    if (!slug) return base;
    return base === "/" ? `/${slug}` : `${base}/${slug}`;
  };
  const ogLocale = lang === "ua" ? "uk_UA" : lang === "ru" ? "ru_RU" : "en_US";
  const shareImage = asset(image ?? "/og-banner.png");
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path(lang),
      languages: {
        en: path("en"),
        uk: path("ua"),
        ru: path("ru"),
        "x-default": path("en"),
      },
    },
    openGraph: {
      title,
      description,
      locale: ogLocale,
      type: "website",
      siteName: SITE.name,
      url: `${SITE.url}${path(lang)}`,
      images: [shareImage],
    },
    // Twitter tags are declared per page as well: without them the card would fall
    // back to the root layout's English copy on every localized route.
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@vladkuzmenkosxy",
      images: [shareImage],
    },
  };
}
