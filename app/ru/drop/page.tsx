import { I18nProvider } from "@/components/i18n-provider";
import { PerformancePage } from "@/components/pages/PerformancePage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd } from "@/lib/ecosystem";
import { PERFORMANCE_META, performanceWebPageJsonLd } from "@/lib/performance";

const meta = PERFORMANCE_META.ru;
export const metadata = pageMeta("ru", "drop", meta.title, meta.description);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <PerformancePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(performanceWebPageJsonLd("ru")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("ru", "Performance", "drop")) }} />
    </I18nProvider>
  );
}
