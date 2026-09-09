import { I18nProvider } from "@/components/i18n-provider";
import { FocusedServicePage } from "@/components/pages/FocusedServicePage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta("en", "visibilityos", "Website audit | Vlad Kuzmenko", "An evidence-based website review with priorities and an agreed implementation scope.");
export default function Page() { return <I18nProvider lang="en"><FocusedServicePage kind="audit" /></I18nProvider>; }
