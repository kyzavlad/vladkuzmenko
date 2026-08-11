import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";
import { curatedWorkJsonLd } from "@/lib/portfolio-curated";

export const metadata = pageMeta(
  "ua",
  "work",
  "Проєкти — SaaS-платформи, AI-продукти, маркетплейси та вебзастосунки | Vlad Kuzmenko",
  "SaaS-платформи, маркетплейси, AI-продукти, клієнтські портали та сайти — завершені проєкти, робочі продукти й інтерфейсні рішення Vlad Kuzmenko.",
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <PortfolioShowcasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(curatedWorkJsonLd("ua")) }} />
    </I18nProvider>
  );
}
