import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamPage } from "@/components/pages/WarriorsTeamPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("ru");
export const metadata = pageMeta("ru", "warriors-team", d.meta.warriorsTitle, d.meta.warriorsDesc);

export default function Page() {
  return (
    <I18nProvider lang="ru">
      <WarriorsTeamPage />
    </I18nProvider>
  );
}
