import type { Lang } from "@/lib/i18n";
import { CURATED_PORTFOLIO } from "@/lib/portfolio-curated";

const localePath = (lang: Lang) => (lang === "en" ? "" : `/${lang}`);

/**
 * Structured proof list for the portfolio embedded in the Growth Systems page.
 * Individual case pages remain the canonical CreativeWork URLs; this ItemList
 * only describes the visible collection and points crawlers to those cases.
 */
export function businessPortfolioJsonLd(lang: Lang) {
  const prefix = localePath(lang);
  const pageUrl = `https://vladkuzmenko.com${prefix}/growth-systems#portfolio`;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: lang === "ru" ? "Проекты Vlad Kuzmenko" : lang === "ua" ? "Проєкти Vlad Kuzmenko" : "Vlad Kuzmenko projects",
    url: pageUrl,
    numberOfItems: CURATED_PORTFOLIO.length,
    itemListElement: CURATED_PORTFOLIO.map((project, index) => {
      const c = project.content[lang];
      const caseUrl = `https://vladkuzmenko.com${prefix}/work/${project.caseSlug ?? project.key}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: c.name,
          description: c.outcome,
          url: caseUrl,
          ...(project.shots[0] ? { image: `https://vladkuzmenko.com${project.shots[0]}` } : {}),
          ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
          creator: {
            "@type": "Person",
            name: "Vlad Kuzmenko",
            url: "https://vladkuzmenko.com",
          },
        },
      };
    }),
  };
}
