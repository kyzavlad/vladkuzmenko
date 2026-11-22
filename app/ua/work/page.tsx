import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";

const baseMetadata = pageMeta(
  "ua",
  "work",
  "Проєкти — SaaS-платформи, AI-продукти, маркетплейси та вебзастосунки | Vlad Kuzmenko",
  "Кейси Влада Кузьменка з full-stack розробки. SaaS, маркетплейси, інтернет-магазини й кабінети клієнтів із прикладами функцій та інтеграцій.",
);

export const metadata = {
  ...baseMetadata,
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://vladkuzmenko.com/ua/growth-systems",
    languages: {
      en: "https://vladkuzmenko.com/growth-systems",
      uk: "https://vladkuzmenko.com/ua/growth-systems",
      ru: "https://vladkuzmenko.com/ru/growth-systems",
      "x-default": "https://vladkuzmenko.com/growth-systems",
    },
  },
};

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <PortfolioShowcasePage />
    </I18nProvider>
  );
}
