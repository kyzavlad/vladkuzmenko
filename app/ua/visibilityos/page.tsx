import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsIntentBridge } from "@/components/pages/VisibilityOsIntentBridge";
import { VisibilityOsMarketPage } from "@/components/pages/VisibilityOsMarketPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "visibilityos",
  "VisibilityOS — карта видимості сайту, Local SEO та конверсії",
  "Проскануйте публічний сайт у контексті реальної послуги й географії. Перевірте crawl, SEO, local relevance, trust і conversion сигнали, порівняйте конкурентів та отримайте Growth Queue."
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <VisibilityOsIntentBridge />
      <VisibilityOsMarketPage />
    </I18nProvider>
  );
}
