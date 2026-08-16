import { I18nProvider } from "@/components/i18n-provider";
import { VisibilityOsPremiumPage } from "@/components/pages/VisibilityOsPremiumPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("ru");
export const metadata = pageMeta("ru", "visibilityos", d.meta.visibilityTitle, d.meta.visibilityDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <VisibilityOsPremiumPage />
    </I18nProvider>
  );
}
