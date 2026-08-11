import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcasePage } from "@/components/pages/PortfolioShowcasePage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI } from "@/lib/portfolio";
import { showcaseWorkJsonLd } from "@/lib/portfolio-showcase";

export const metadata = pageMeta("en", "work", PORTFOLIO_UI.en.metaTitle, PORTFOLIO_UI.en.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <PortfolioShowcasePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseWorkJsonLd("en")) }} />
    </I18nProvider>
  );
}
