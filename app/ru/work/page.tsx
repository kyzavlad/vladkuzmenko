import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI } from "@/lib/portfolio";
import { curatedWorkJsonLd } from "@/lib/portfolio-curated";

export const metadata = pageMeta("ru", "work", PORTFOLIO_UI.ru.metaTitle, PORTFOLIO_UI.ru.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <PortfolioShowcasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(curatedWorkJsonLd("ru")) }} />
    </I18nProvider>
  );
}
