import { I18nProvider } from "@/components/i18n-provider";
import { FocusedServicePage } from "@/components/pages/FocusedServicePage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("ru", "visibilityos", "Аудит сайта | Vlad Kuzmenko", "Проверка сайта с доказательствами, приоритетами и согласованным объёмом реализации.");
export default function Page() { return <I18nProvider lang="ru"><FocusedServicePage kind="audit" /></I18nProvider>; }
