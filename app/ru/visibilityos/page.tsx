import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPremiumPage } from "@/components/pages/VisibilityOsPremiumPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "visibilityos",
  "VisibilityOS — живой скан доказательств сайта",
  "Просканируйте публичный сайт по наблюдаемым SEO, trust, technical и conversion-path сигналам, получите доказательства и приоритеты и запросите ручную проверку там, где нужно суждение."
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <VisibilityOsPremiumPage />
    </I18nProvider>
  );
}
