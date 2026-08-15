import { I18nProvider } from "@/components/i18n-provider";
import { DropPage } from "@/components/pages/DropPage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd, dropWebPageJsonLd, getEcosystemCopy } from "@/lib/ecosystem";

const x = getEcosystemCopy("en");

export const metadata = pageMeta("en", "drop", x.drop.metaTitle, x.drop.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <DropPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dropWebPageJsonLd("en")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("en", x.drop.eyebrow, "drop")) }}
      />
    </I18nProvider>
  );
}
