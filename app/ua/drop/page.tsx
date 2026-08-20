import { I18nProvider } from "@/components/i18n-provider";
import { PerformancePage } from "@/components/pages/PerformancePage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd } from "@/lib/ecosystem";
import { PERFORMANCE_META, performanceWebPageJsonLd } from "@/lib/performance";

const meta = PERFORMANCE_META.ua;
export const metadata = {
  ...pageMeta("ua", "drop", meta.title, meta.description),
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <PerformancePage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(performanceWebPageJsonLd("ua")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("ua", "Performance", "drop")) }} />
    </I18nProvider>
  );
}
