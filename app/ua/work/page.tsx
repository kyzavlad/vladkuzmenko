import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI, workJsonLd } from "@/lib/portfolio";

export const metadata = pageMeta("ua", "work", PORTFOLIO_UI.ua.metaTitle, PORTFOLIO_UI.ua.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <PortfolioPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd("ua")) }} />
    </I18nProvider>
  );
}
