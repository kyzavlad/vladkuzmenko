import type { Lang } from "@/lib/i18n";

export const PERFORMANCE_PRODUCT = {
  name: "Performance Complete",
  servings: 17,
  targetServingGrams: 90,
  targetCalories: 400,
  targetProteinGrams: 40,
  oneTimePriceEur: 39.9,
  subscriptionPriceEur: 33.9,
  targetFlavours: ["Vanilla", "Chocolate"],
} as const;

export const PERFORMANCE_META: Record<Lang, { title: string; description: string }> = {
  en: {
    title: "Performance Complete — Complete Meal Powder for Busy Days | Vlad Kuzmenko",
    description: "Performance Complete is a complete-meal powder concept for demanding work, training and travel days. Join the pilot while the formula, flavour, manufacturing and final economics are being validated.",
  },
  ua: {
    title: "Performance Complete — повноцінний порошковий прийом їжі | Vlad Kuzmenko",
    description: "Performance Complete — концепт повноцінного порошкового прийому їжі для щільного ритму роботи, тренувань і подорожей. Формула, смак, виробництво та фінальна економіка проходять валідацію.",
  },
  ru: {
    title: "Performance Complete — полноценный порошковый приём пищи | Vlad Kuzmenko",
    description: "Performance Complete — концепт полноценного порошкового приёма пищи для плотного ритма работы, тренировок и поездок. Формула, вкус, производство и финальная экономика проходят валидацию.",
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
    title: "Join the Performance Complete pilot",
    description: "This is product validation, not a preorder. Tell us when a one-minute complete meal would be useful, which flavour you would choose and how the target price feels. Nothing is charged here.",
    helpLabel: "What would make this worth buying repeatedly?",
    helpPlaceholder: "Your routine, what you use now, what usually goes wrong and what the product would need to do better",
    successTitle: "Pilot application received",
    successMessage: "Thanks. Your use case and price feedback are now part of the validation. We will only contact you when there is a concrete sample, pilot or launch step to confirm.",
  },
  ua: {
    title: "Долучитися до пілоту Performance Complete",
    description: "Це валідація продукту, а не передзамовлення. Розкажіть, коли вам був би корисний повноцінний прийом їжі за хвилину, який смак ви обрали б і як сприймається цільова ціна. Оплати тут немає.",
    helpLabel: "Що зробило б цей продукт вартим регулярної покупки?",
    helpPlaceholder: "Ваш режим, що використовуєте зараз, де харчування зривається і що цей продукт має робити краще",
    successTitle: "Заявку на пілот отримано",
    successMessage: "Дякую. Ваш сценарій і ціновий фідбек увійшли у валідацію. Напишемо лише коли буде конкретний зразок, пілот або етап запуску.",
  },
  ru: {
    title: "Присоединиться к пилоту Performance Complete",
    description: "Это валидация продукта, а не предзаказ. Расскажите, когда вам был бы полезен полноценный приём пищи за минуту, какой вкус вы выбрали бы и как воспринимается целевая цена. Здесь ничего не оплачивается.",
    helpLabel: "Что сделало бы этот продукт достойным регулярной покупки?",
    helpPlaceholder: "Ваш режим, что используете сейчас, где питание срывается и что этот продукт должен делать лучше",
    successTitle: "Заявка на пилот получена",
    successMessage: "Спасибо. Ваш сценарий и ценовой фидбек вошли в валидацию. Напишем только когда будет конкретный образец, пилот или этап запуска.",
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
