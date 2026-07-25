import { I18nProvider } from "@/components/i18n-provider";
import { AiProductDevelopmentPage } from "@/components/pages/AiProductDevelopmentPage";
import { pageMeta } from "@/lib/page-meta";
import { APD_UI, apdJsonLd } from "@/lib/portfolio";

export const metadata = pageMeta("ru", "ai-product-development", APD_UI.ru.metaTitle, APD_UI.ru.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <AiProductDevelopmentPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(apdJsonLd("ru")) }} />
    </I18nProvider>
  );
}
