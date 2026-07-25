import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioPage } from "@/components/pages/PortfolioPage";
import { pageMeta } from "@/lib/page-meta";
import { PORTFOLIO_UI, workJsonLd } from "@/lib/portfolio";

// Explicit /en/ alias for direct sending. Canonical points to the root EN page
// (/work) via pageMeta so there is no duplicate-content signal.
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
