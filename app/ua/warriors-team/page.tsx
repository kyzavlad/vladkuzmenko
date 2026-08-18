import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "warriors-team",
  "Warriors Founding Circle — приватне коло виконання",
  "Відібране приватне коло для builders, які вже виконують: weekly Commit + Proof, дві фокусні live-сесії щомісяця, direct feedback і корисні introductions.",
);

export default function Page() {
  return <I18nProvider lang="ua"><WarriorsTeamFinalPage /></I18nProvider>;
}
