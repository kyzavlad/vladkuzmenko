import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPremiumPage } from "@/components/pages/VisibilityOsPremiumPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("en");
export const metadata = pageMeta("en", "visibilityos", d.meta.visibilityTitle, d.meta.visibilityDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <VisibilityOsPremiumPage />
    </I18nProvider>
  );
}
