import type { Lang } from "@/lib/i18n";

export const PERFORMANCE_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Performance Complete — Fast Complete Meal for Busy Days | Vlad Kuzmenko",
    description: "Performance Complete is a 17-meal powdered-food concept for busy work and training days. The public page validates positioning, price and demand before any compliant paid launch.",
  },
  ua: {
    title: "Performance Complete — швидкий повноцінний прийом їжі | Vlad Kuzmenko",
    description: "Performance Complete — концепт порошкового харчування на 17 прийомів їжі для щільного ритму роботи й тренувань. Сторінка перевіряє позиціонування, ціну та попит до будь-якого платного запуску.",
  },
  ru: {
    title: "Performance Complete — быстрый полноценный приём пищи | Vlad Kuzmenko",
    description: "Performance Complete — концепт порошкового питания на 17 приёмов пищи для плотного ритма работы и тренировок. Страница проверяет позиционирование, цену и спрос до любого платного запуска.",
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
    title: "Join the Performance Complete founding test",
    description: "This is demand validation, not a checkout. Tell us how often a fast complete meal would help, which flavour you would start with and how the target price feels.",
    helpLabel: "When would you actually use it?",
    helpPlaceholder: "Workday lunch, after training, travel, late day, or another recurring situation",
    successTitle: "Founding-test request received",
    successMessage: "Thanks. Your use case and price feedback are now part of the validation. I will only reach out when there is a concrete next step to test or buy.",
  },
  ua: {
    title: "Долучитися до першого тесту Performance Complete",
    description: "Це перевірка попиту, не оплата. Вкажіть, як часто вам був би корисний швидкий повноцінний прийом їжі, який смак обрали б першим і як сприймаєте цільову ціну.",
    helpLabel: "Коли ви реально використовували б продукт?",
    helpPlaceholder: "Обід під час роботи, після тренування, у дорозі, пізно ввечері або інший повторюваний момент",
    successTitle: "Запит на перший тест отримано",
    successMessage: "Дякую. Ваш сценарій використання та оцінка ціни увійшли у валідацію. Напишу лише тоді, коли буде конкретний наступний крок для тесту або покупки.",
  },
  ru: {
    title: "Присоединиться к первому тесту Performance Complete",
    description: "Это проверка спроса, не оплата. Укажите, как часто вам пригодился бы быстрый полноценный приём пищи, какой вкус выбрали бы первым и как воспринимаете целевую цену.",
    helpLabel: "Когда вы реально использовали бы продукт?",
    helpPlaceholder: "Обед во время работы, после тренировки, в дороге, поздно вечером или другой повторяющийся момент",
    successTitle: "Запрос на первый тест получен",
    successMessage: "Спасибо. Ваш сценарий использования и оценка цены вошли в валидацию. Напишу только тогда, когда появится конкретный следующий шаг для теста или покупки.",
  },
};

const SCHEMA_LANG: Record<Lang, string> = { en: "en", ua: "uk", ru: "ru" };
const localePath = (lang: Lang) => (lang === "en" ? "" : `/${lang}`);

export function performanceWebPageJsonLd(lang: Lang) {
  const meta = PERFORMANCE_META[lang];
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Performance Complete",
    description: meta.description,
    inLanguage: SCHEMA_LANG[lang],
    url: `https://vladkuzmenko.com${localePath(lang)}/drop`,
    about: {
      "@type": "Thing",
      name: "Performance Complete",
      description: meta.description,
    },
    isPartOf: { "@id": "https://vladkuzmenko.com/#website" },
  };
}
