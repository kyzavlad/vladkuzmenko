import { I18nProvider } from "@/components/i18n-provider";
import { GrowthSystemsPremiumPage } from "@/components/pages/GrowthSystemsPremiumPage";
import { pageMeta } from "@/lib/page-meta";
import {
  GROWTH_ROUTE,
  getGrowthCopy,
  growthFaqJsonLd,
  growthServiceJsonLd,
} from "@/lib/growth-systems";

const x = getGrowthCopy("en");

export const metadata = pageMeta("en", GROWTH_ROUTE, x.metaTitle, x.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <GrowthSystemsPremiumPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthServiceJsonLd("en")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(growthFaqJsonLd("en")) }}
      />
    </I18nProvider>
  );
}
