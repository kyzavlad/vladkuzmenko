import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsMarketPageV3 } from "@/components/pages/VisibilityOsMarketPageV3";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "visibilityos",
  "VisibilityOS — Visibility Map, Growth Queue и мониторинг сайта",
  "Постройте public Visibility Map, сохраните проект, выполняйте Growth Queue, проверяйте completed changes и держите visibility сайта под recurring monitoring."
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <VisibilityOsMarketPageV3 />
    </I18nProvider>
  );
}
