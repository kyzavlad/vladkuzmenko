import type { Lang } from "@/lib/i18n";

export const PERFORMANCE_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Performance — Ready Meal Sets for Active Days | Vlad Kuzmenko",
    description: "Performance is a ready-meal brand for busy work, training and life schedules. The first Core Set pilot is being validated before production, delivery and paid orders open.",
  },
  ua: {
    title: "Performance — готові набори їжі для активних днів | Vlad Kuzmenko",
    description: "Performance — бренд готових страв для щільного ритму роботи, тренувань і життя. Перший пілот Core Set проходить валідацію до відкриття виробництва, доставки й оплати.",
  },
  ru: {
    title: "Performance — готовые наборы еды для активных дней | Vlad Kuzmenko",
    description: "Performance — бренд готовых блюд для плотного ритма работы, тренировок и жизни. Первый пилот Core Set проходит валидацию до открытия производства, доставки и оплаты.",
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
    title: "Request a Performance pilot invite",
    description: "This is demand validation, not a pre-order. Share your city, routine, useful meal frequency and price comfort. Nothing is charged here.",
    helpLabel: "Where food breaks down in your week",
    helpPlaceholder: "What usually happens and what would make the set genuinely useful",
    successTitle: "Pilot request received",
    successMessage: "Thanks. Your routine and preferences are now part of the validation. I will only reach out when there is something concrete to test or confirm.",
  },
  ua: {
    title: "Запросити участь у пілоті Performance",
    description: "Це перевірка попиту, не передзамовлення. Вкажіть місто, свій режим, потрібну кількість готових страв і комфортну ціну. Тут нічого не оплачується.",
    helpLabel: "Де харчування найчастіше ламається у вашому тижні",
    helpPlaceholder: "Що зазвичай відбувається і що зробило б набір справді корисним",
    successTitle: "Запит на пілот отримано",
    successMessage: "Дякую. Ваш режим і побажання увійшли у валідацію. Напишу лише тоді, коли буде конкретний продукт для тесту або підтвердження.",
  },
  ru: {
    title: "Запросить участие в пилоте Performance",
    description: "Это проверка спроса, не предзаказ. Укажите город, свой режим, нужное количество готовых блюд и комфортную цену. Здесь ничего не оплачивается.",
    helpLabel: "Где питание чаще всего ломается в вашей неделе",
    helpPlaceholder: "Что обычно происходит и что сделало бы набор действительно полезным",
    successTitle: "Запрос на пилот получен",
    successMessage: "Спасибо. Ваш режим и пожелания вошли в валидацию. Напишу только тогда, когда будет конкретный продукт для теста или подтверждения.",
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
      name: "Performance Core Set",
      description: meta.description,
    },
    isPartOf: { "@id": "https://vladkuzmenko.com/#website" },
  };
}
