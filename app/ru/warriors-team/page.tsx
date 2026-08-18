import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "warriors-team",
  "Warriors Founding Circle — закрытый круг исполнения",
  "Отобранный закрытый круг для builders, которые уже исполняют: weekly Commit + Proof, две фокусные live-сессии каждый месяц, direct feedback и полезные introductions.",
);

export default function Page() {
  return <I18nProvider lang="ru"><WarriorsTeamFinalPage /></I18nProvider>;
}
