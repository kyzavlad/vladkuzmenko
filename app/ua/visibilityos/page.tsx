import { I18nProvider } from "@/components/i18n-provider";
import { FocusedServicePage } from "@/components/pages/FocusedServicePage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("ua", "visibilityos", "Аудит сайту | Vlad Kuzmenko", "Перевірка сайту з доказами, пріоритетами й погодженим обсягом реалізації.");
export default function Page() { return <I18nProvider lang="ua"><FocusedServicePage kind="audit" /></I18nProvider>; }
