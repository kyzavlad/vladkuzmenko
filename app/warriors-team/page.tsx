import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("en", "warriors-team", "Warriors — Private Skills & Execution Club | Vlad Kuzmenko", "A selective private club combining practical AI, client acquisition, content and business learning with weekly implementation and a stronger network.");
export default function Page() { return <I18nProvider lang="en"><WarriorsTeamFinalPage /></I18nProvider>; }
