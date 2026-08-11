import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";
import { curatedWorkJsonLd } from "@/lib/portfolio-curated";

export const metadata = pageMeta(
  "ru",
  "work",
  "Проекты — SaaS-платформы, AI-продукты, маркетплейсы и веб-приложения | Vlad Kuzmenko",
  "SaaS-платформы, маркетплейсы, AI-продукты, клиентские порталы и сайты — завершённые проекты, рабочие продукты и интерфейсные решения Vlad Kuzmenko.",
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <PortfolioShowcasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(curatedWorkJsonLd("ru")) }} />
    </I18nProvider>
  );
}
