import { I18nProvider } from "@/components/i18n-provider";
import { FocusedServicePage } from "@/components/pages/FocusedServicePage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("ru", "warriors-team", "Warriors — Сотрудничество над проектами | Vlad Kuzmenko", "Обсудим навыки, реальную задачу, ответственность и оплату.");
export default function Page() { return <I18nProvider lang="ru"><FocusedServicePage kind="collaboration" /></I18nProvider>; }
