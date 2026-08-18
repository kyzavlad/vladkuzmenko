import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "warriors-team",
  "Warriors — Learning + Execution Network | Vlad Kuzmenko",
  "Practical AI systems, client acquisition, content and business tracks combined with weekly implementation and a private execution community.",
);

export default function Page() {
  return <I18nProvider lang="en"><WarriorsTeamFinalPage /></I18nProvider>;
}
