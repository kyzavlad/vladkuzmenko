import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";

const baseMetadata = pageMeta(
  "ua",
  "work",
  "Проєкти — SaaS-платформи, AI-продукти, маркетплейси та вебзастосунки | Vlad Kuzmenko",
  "SaaS-платформи, маркетплейси, AI-продукти, клієнтські портали та сайти — завершені проєкти, робочі продукти й інтерфейсні рішення Vlad Kuzmenko.",
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
