import { I18nProvider } from "@/components/i18n-provider";
import { FocusedServicePage } from "@/components/pages/FocusedServicePage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("ua", "warriors-team", "Warriors — Співпраця над проєктами | Vlad Kuzmenko", "Обговоримо навички, реальну задачу, відповідальність та оплату.");
export default function Page() { return <I18nProvider lang="ua"><FocusedServicePage kind="collaboration" /></I18nProvider>; }
