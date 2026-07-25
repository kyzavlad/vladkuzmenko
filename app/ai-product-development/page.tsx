import { I18nProvider } from "@/components/i18n-provider";
import { AiProductDevelopmentPage } from "@/components/pages/AiProductDevelopmentPage";
import { pageMeta } from "@/lib/page-meta";
import { APD_UI, apdJsonLd } from "@/lib/portfolio";

export const metadata = pageMeta("en", "ai-product-development", APD_UI.en.metaTitle, APD_UI.en.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <AiProductDevelopmentPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apdJsonLd("en")) }} />
    </I18nProvider>
  );
}
