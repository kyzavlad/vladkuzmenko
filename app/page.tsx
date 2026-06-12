import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n-provider";
import { HomeContent } from "@/components/home/HomeContent";
import { LangAutoRedirect } from "@/components/LangAutoRedirect";
import { getDict } from "@/lib/i18n";

const d = getDict("en");
const languages = { en: "/", uk: "/ua", ru: "/ru", "x-default": "/" };

export const metadata: Metadata = {
  title: { absolute: d.meta.title },
  description: d.meta.description,
  alternates: { canonical: "/", languages },
  openGraph: { title: d.meta.title, description: d.meta.description, locale: "en_US", images: ["/og-banner.png"] },
};

export default function Page() {
  return (
    <I18nProvider lang="en">
      <LangAutoRedirect />
      <HomeContent />
    </I18nProvider>
  );
}
