import { I18nProvider } from "@/components/i18n-provider";
import { GrowthSystemsPremiumPage } from "@/components/pages/GrowthSystemsPremiumPage";
import { pageMeta } from "@/lib/page-meta";
import {
  GROWTH_ROUTE,
  getGrowthCopy,
  growthFaqJsonLd,
  growthServiceJsonLd,
} from "@/lib/growth-systems";

const x = getGrowthCopy("ua");

export const metadata = pageMeta("ua", GROWTH_ROUTE, x.metaTitle, x.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <GrowthSystemsPremiumPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthServiceJsonLd("ua")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthFaqJsonLd("ua")) }}
      />
    </I18nProvider>
  );
}
