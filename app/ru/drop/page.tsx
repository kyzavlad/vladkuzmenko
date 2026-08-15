import { I18nProvider } from "@/components/i18n-provider";
import { DropPage } from "@/components/pages/DropPage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd } from "@/lib/ecosystem";

export const metadata = pageMeta(
  "ru",
  "drop",
  "Performance Meal Sets и essentials | Vlad Kuzmenko",
  "Performance-питание для тренировочных дней, работы и дороги. Первый доступ к локальной линейке после подтверждения реального меню и условий.",
);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <DropPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("ru", "Performance", "drop")) }}
      />
    </I18nProvider>
  );
}
