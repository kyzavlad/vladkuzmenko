import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ua",
  "warriors-team",
  "Warriors — навчання + execution network | Vlad Kuzmenko",
  "Практичні AI systems, client acquisition, content і business tracks разом із weekly implementation та private execution community.",
);

export default function Page() {
  return <I18nProvider lang="ua"><WarriorsTeamFinalPage /></I18nProvider>;
}
