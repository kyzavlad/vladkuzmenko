import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { getDict } from "@/lib/i18n";
import { pageMeta } from "@/lib/page-meta";

const d = getDict("ua");
export const metadata = pageMeta("ua", "warriors-team", d.meta.warriorsTitle, d.meta.warriorsDesc);

export default function Page() {
  return <I18nProvider lang="ua"><WarriorsTeamFinalPage /></I18nProvider>;
}
