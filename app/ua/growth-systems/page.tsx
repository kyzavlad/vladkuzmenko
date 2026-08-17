import { I18nProvider } from "@/components/i18n-provider";
import { GrowthSystemsFinalPage } from "@/components/pages/GrowthSystemsFinalPage";
import styles from "@/components/business/growth-business-page.module.css";
import { pageMeta } from "@/lib/page-meta";
import { businessPortfolioJsonLd } from "@/lib/portfolio-schema";
import { GROWTH_ROUTE, getGrowthCopy, growthFaqJsonLd, growthServiceJsonLd } from "@/lib/growth-systems";

const x = getGrowthCopy("ua");
export const metadata = pageMeta("ua", GROWTH_ROUTE, x.metaTitle, x.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <div className={styles.shell}><GrowthSystemsFinalPage /></div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(growthServiceJsonLd("ua")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(growthFaqJsonLd("ua")) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessPortfolioJsonLd("ua")) }} />
    </I18nProvider>
  );
}
