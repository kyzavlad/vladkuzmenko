import { I18nProvider } from "@/components/i18n-provider";
import { HomeContent } from "@/components/home/HomeContent";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";
import { localeHomeJsonLd } from "@/lib/ecosystem";

const d = getDict("ru");

export const metadata = pageMeta("ru", "", d.meta.title, d.meta.description);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <HomeContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localeHomeJsonLd("ru", d.meta.title, d.meta.description)),
        }}
      />
    </I18nProvider>
  );
}
