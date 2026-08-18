import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "warriors-team",
  "Warriors Founding Circle — Private Execution Circle",
  "A curated private circle for builders already executing: weekly Commit + Proof, two focused live sessions each month, direct feedback and useful introductions.",
);

export default function Page() {
  return <I18nProvider lang="en"><WarriorsTeamFinalPage /></I18nProvider>;
}
