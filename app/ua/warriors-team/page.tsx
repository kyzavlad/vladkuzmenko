import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("ua", "warriors-team", "Warriors — закритий клуб навичок і реалізації | Vlad Kuzmenko", "Відібраний закритий клуб: практичні ШІ-системи, залучення клієнтів, контент і бізнес разом із щотижневою реалізацією та сильнішим оточенням.");
export default function Page() { return <I18nProvider lang="ua"><WarriorsTeamFinalPage /></I18nProvider>; }
