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

export const PERFORMANCE_DIALOG: Record<Lang, {
  title: string;
  description: string;
  helpLabel: string;
  helpPlaceholder: string;
  successTitle: string;
  successMessage: string;
}> = {
  en: {
    title: "Get Performance launch updates",
    description: "This is product validation, not a pre-order. Tell me what your normal work-and-training schedule looks like and what would make a ready-meal system genuinely useful. Nothing is charged here.",
    helpLabel: "Your schedule and what would make this useful",
    helpPlaceholder: "How your day usually works, where food becomes inconvenient, what you would actually want from a meal system",
    successTitle: "You are on the update list",
    successMessage: "Thanks. This goes directly to me. I will reach out when there is something concrete to test or show.",
  },
  ua: {
    title: "Дізнатися про запуск Performance",
    description: "Це валідація продукту, не передзамовлення. Розкажіть, як виглядає ваш звичайний графік роботи й тренувань та що зробило б систему готового харчування справді корисною. Тут нічого не оплачується.",
    helpLabel: "Ваш графік і що зробило б це корисним",
    helpPlaceholder: "Як зазвичай проходить день, де харчування створює незручності, чого ви реально очікували б від такої системи",
    successTitle: "Ви у списку оновлень",
    successMessage: "Дякую. Це потрапляє напряму до мене. Напишу, коли буде щось конкретне для тесту або показу.",
  },
  ru: {
    title: "Узнать о запуске Performance",
    description: "Это валидация продукта, не предзаказ. Расскажите, как выглядит ваш обычный график работы и тренировок и что сделало бы систему готового питания действительно полезной. Здесь ничего не оплачивается.",
    helpLabel: "Ваш график и что сделало бы это полезным",
    helpPlaceholder: "Как обычно проходит день, где питание создаёт неудобства, чего вы реально ждали бы от такой системы",
    successTitle: "Вы в списке обновлений",
    successMessage: "Спасибо. Это попадает напрямую ко мне. Напишу, когда будет что-то конкретное для теста или показа.",
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
