import { I18nProvider } from "@/components/i18n-provider";
import { FocusedServicePage } from "@/components/pages/FocusedServicePage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("en", "warriors-team", "Warriors — Project collaboration | Vlad Kuzmenko", "Talk directly about contributing skills to a real project with agreed responsibilities and payment.");
export default function Page() { return <I18nProvider lang="en"><FocusedServicePage kind="collaboration" /></I18nProvider>; }
