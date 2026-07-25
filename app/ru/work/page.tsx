import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI, workJsonLd } from "@/lib/portfolio";

export const metadata = pageMeta("ru", "work", PORTFOLIO_UI.ru.metaTitle, PORTFOLIO_UI.ru.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <PortfolioPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd("ru")) }}
      />
    </I18nProvider>
  );
}
