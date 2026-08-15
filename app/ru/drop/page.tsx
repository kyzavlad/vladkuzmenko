import { I18nProvider } from "@/components/i18n-provider";
import { DropPage } from "@/components/pages/DropPage";
import { pageMeta } from "@/lib/page-meta";
import { breadcrumbJsonLd, dropWebPageJsonLd, getEcosystemCopy } from "@/lib/ecosystem";

const x = getEcosystemCopy("ru");

export const metadata = pageMeta("ru", "drop", x.drop.metaTitle, x.drop.metaDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <DropPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dropWebPageJsonLd("ru")) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd("ru", x.drop.eyebrow, "drop")) }}
      />
    </I18nProvider>
  );
}
