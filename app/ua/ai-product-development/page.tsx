import { I18nProvider } from "@/components/i18n-provider";
import { AiProductDevelopmentPage } from "@/components/pages/AiProductDevelopmentPage";
import { pageMeta } from "@/lib/page-meta";
import { APD_UI, apdJsonLd } from "@/lib/portfolio";

export const metadata = pageMeta("ua", "ai-product-development", APD_UI.ua.metaTitle, APD_UI.ua.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <AiProductDevelopmentPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apdJsonLd("ua")) }} />
    </I18nProvider>
  );
}
