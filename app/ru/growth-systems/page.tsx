import { I18nProvider } from "@/components/i18n-provider";
import { GrowthSystemsPage } from "@/components/pages/GrowthSystemsPage";
import { pageMeta } from "@/lib/page-meta";
import {
  GROWTH_ROUTE,
  getGrowthCopy,
  growthFaqJsonLd,
  growthServiceJsonLd,
} from "@/lib/growth-systems";

const x = getGrowthCopy("ru");

export const metadata = pageMeta("ru", GROWTH_ROUTE, x.metaTitle, x.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <GrowthSystemsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthServiceJsonLd("ru")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthFaqJsonLd("ru")) }}
      />
    </I18nProvider>
  );
}
