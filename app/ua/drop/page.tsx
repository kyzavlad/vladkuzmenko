import { I18nProvider } from "@/components/i18n-provider";
import { DropPage } from "@/components/pages/DropPage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd, dropWebPageJsonLd, getEcosystemCopy } from "@/lib/ecosystem";

const x = getEcosystemCopy("ua");

export const metadata = pageMeta("ua", "drop", x.drop.metaTitle, x.drop.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <DropPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dropWebPageJsonLd("ua")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("ua", x.drop.eyebrow, "drop")) }}
      />
    </I18nProvider>
  );
}
