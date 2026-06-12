import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPage } from "@/components/pages/VisibilityOsPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("ua");
export const metadata = pageMeta("ua", "visibilityos", d.meta.visibilityTitle, d.meta.visibilityDesc);

export default function Page() {
  return (
    <I18nProvider lang="ua">
      <VisibilityOsPage />
    </I18nProvider>
  );
}
