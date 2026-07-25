import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI, workJsonLd } from "@/lib/portfolio";

export const metadata = pageMeta("en", "work", PORTFOLIO_UI.en.metaTitle, PORTFOLIO_UI.en.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <PortfolioPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workJsonLd("en")) }}
      />
    </I18nProvider>
  );
}
