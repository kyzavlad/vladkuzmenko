import { I18nProvider } from "@/components/i18n-provider";
import { HomeContent } from "@/components/home/HomeContent";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";
import { ecosystemItemListJsonLd } from "@/lib/ecosystem";

const d = getDict("ua");

export const metadata = pageMeta("ua", "", d.meta.title, d.meta.description);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <HomeContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ecosystemItemListJsonLd("ua")) }}
      />
    </I18nProvider>
  );
}
