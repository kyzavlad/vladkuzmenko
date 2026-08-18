import { I18nProvider } from "@/components/i18n-provider";
import { WarriorsTeamFinalPage } from "@/components/pages/WarriorsTeamFinalPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("ru", "warriors-team", "Warriors — закрытый клуб навыков и реализации | Vlad Kuzmenko", "Отобранный закрытый клуб: практические ИИ-системы, привлечение клиентов, контент и бизнес вместе с еженедельной реализацией и более сильным окружением.");
export default function Page() { return <I18nProvider lang="ru"><WarriorsTeamFinalPage /></I18nProvider>; }
