import { I18nProvider } from "@/components/i18n-provider";
import { DropPage } from "@/components/pages/DropPage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd } from "@/lib/ecosystem";

export const metadata = pageMeta(
  "ua",
  "drop",
  "Performance Meal Sets та essentials | Vlad Kuzmenko",
  "Performance-харчування для тренувальних днів, роботи й дороги. Перший доступ до локальної лінійки після підтвердження реального меню та умов.",
);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <DropPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("ua", "Performance", "drop")) }}
      />
    </I18nProvider>
  );
}
