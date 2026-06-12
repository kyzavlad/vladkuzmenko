import type { Metadata } from "next";
import { type Lang, langHref } from "@/lib/i18n";

/** Build localized Metadata (canonical + hreflang + OG locale) for a sub-page.
 *  `slug` is "" for the homepage, or e.g. "visibilityos" for /visibilityos. */
export function pageMeta(
  lang: Lang,
  slug: string,
  title: string,
  description: string
): Metadata {
  const path = (l: Lang) => {
    const base = langHref(l); // "/" | "/ua" | "/ru"
    if (!slug) return base;
    return base === "/" ? `/${slug}` : `${base}/${slug}`;
  };
  const ogLocale = lang === "ua" ? "uk_UA" : lang === "ru" ? "ru_RU" : "en_US";
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
    openGraph: { title, description, locale: ogLocale, type: "website", images: ["/og-banner.png"] },
  };
}
