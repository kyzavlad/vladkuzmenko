import type { Lang } from "@/lib/i18n";

export const PERFORMANCE_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Performance — Meal Sets for an Active Schedule | Vlad Kuzmenko",
    description: "Performance is a consumer-product direction built around active work-and-training schedules. The first product being validated is Performance Meal Sets. Nothing is sold before the product and delivery model are ready.",
  },
  ua: {
    title: "Performance — Meal Sets для активного графіка | Vlad Kuzmenko",
    description: "Performance — напрям практичних продуктів для активного ритму роботи, тренувань і життя. Перший продукт у валідації — Performance Meal Sets. Продажів немає, доки продукт і модель доставки не готові.",
  },
  ru: {
    title: "Performance — Meal Sets для активного графика | Vlad Kuzmenko",
    description: "Performance — направление практичных продуктов для активного ритма работы, тренировок и жизни. Первый продукт в валидации — Performance Meal Sets. Продаж нет, пока продукт и модель доставки не готовы.",
  },
};

const SCHEMA_LANG: Record<Lang, string> = { en: "en", ua: "uk", ru: "ru" };
const localePath = (lang: Lang) => (lang === "en" ? "" : `/${lang}`);

export function performanceWebPageJsonLd(lang: Lang) {
  const meta = PERFORMANCE_META[lang];
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Performance",
    description: meta.description,
    inLanguage: SCHEMA_LANG[lang],
    url: `https://vladkuzmenko.com${localePath(lang)}/drop`,
    about: {
      "@type": "Thing",
      name: "Performance Meal Sets",
      description: meta.description,
    },
    isPartOf: { "@id": "https://vladkuzmenko.com/#website" },
  };
}
