import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPremiumPage } from "@/components/pages/VisibilityOsPremiumPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "visibilityos",
  "VisibilityOS — живий скан доказів сайту",
  "Проскануйте публічний сайт за видимими SEO, trust, technical і conversion-path сигналами, отримайте докази та пріоритети й запросіть ручну перевірку там, де потрібне судження."
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <VisibilityOsPremiumPage />
    </I18nProvider>
  );
}
