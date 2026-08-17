import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsIntentBridge } from "@/components/pages/VisibilityOsIntentBridge";
import { VisibilityOsMarketPage } from "@/components/pages/VisibilityOsMarketPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "visibilityos",
  "VisibilityOS — карта видимости сайта, Local SEO и конверсии",
  "Просканируйте публичный сайт в контексте реальной услуги и географии. Проверьте crawl, SEO, local relevance, trust и conversion сигналы, сравните конкурентов и получите Growth Queue."
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <VisibilityOsIntentBridge />
      <VisibilityOsMarketPage />
    </I18nProvider>
  );
}
