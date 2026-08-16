import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";

const baseMetadata = pageMeta(
  "ru",
  "work",
  "Проекты — SaaS-платформы, AI-продукты, маркетплейсы и веб-приложения | Vlad Kuzmenko",
  "SaaS-платформы, маркетплейсы, AI-продукты, клиентские порталы и сайты — завершённые проекты, рабочие продукты и интерфейсные решения Vlad Kuzmenko.",
);

export const metadata = {
  ...baseMetadata,
  robots: { index: false, follow: true },
  alternates: {
    canonical: "https://vladkuzmenko.com/ru/growth-systems",
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
    <I18nProvider lang="ru">
      <PortfolioShowcasePage />
    </I18nProvider>
  );
}
