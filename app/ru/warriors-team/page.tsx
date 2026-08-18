import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "warriors-team",
  "Warriors — обучение + execution network | Vlad Kuzmenko",
  "Практические AI systems, client acquisition, content и business tracks вместе с weekly implementation и private execution community.",
);

export default function Page() {
  return <I18nProvider lang="ru"><WarriorsTeamFinalPage /></I18nProvider>;
}
