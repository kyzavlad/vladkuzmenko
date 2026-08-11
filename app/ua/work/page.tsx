import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI } from "@/lib/portfolio";
import { showcaseWorkJsonLd } from "@/lib/portfolio-showcase";

export const metadata = pageMeta("ua", "work", PORTFOLIO_UI.ua.metaTitle, PORTFOLIO_UI.ua.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <PortfolioShowcasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseWorkJsonLd("ua")) }} />
    </I18nProvider>
  );
}
