import { I18nProvider } from "@/components/i18n-provider";
import { HomeContent } from "@/components/home/HomeContent";
import { LangAutoRedirect } from "@/components/LangAutoRedirect";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";
import { localeHomeJsonLd } from "@/lib/ecosystem";

const d = getDict("en");

export const metadata = pageMeta("en", "", d.meta.title, d.meta.description);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <LangAutoRedirect />
      <HomeContent />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localeHomeJsonLd("en", d.meta.title, d.meta.description)),
        }}
      />
    </I18nProvider>
  );
}
