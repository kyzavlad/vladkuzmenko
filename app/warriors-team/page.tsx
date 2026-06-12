import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamPage } from "@/components/pages/WarriorsTeamPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("en");
export const metadata = pageMeta("en", "warriors-team", d.meta.warriorsTitle, d.meta.warriorsDesc);

export default function Page() {
  return (
    <I18nProvider lang="en">
      <WarriorsTeamPage />
    </I18nProvider>
  );
}
