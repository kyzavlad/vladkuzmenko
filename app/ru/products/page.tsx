import { I18nProvider } from "@/components/i18n-provider";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "ru",
  "products",
  "VisibilityOS: Website Intelligence | Vlad Kuzmenko Software",
  "Evidence-led разбор сайта: conversion, trust, SEO, AEO, technical health и готовность к AI-search.",
);

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VisibilityOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Evidence-led website intelligence для conversion, trust, technical health, SEO, AEO и AI-search readiness.",
  url: "https://vladkuzmenko.com/ru/visibilityos",
  creator: { "@type": "Person", name: "Vlad Kuzmenko", url: "https://vladkuzmenko.com" },
};

export default function Page() {
  return <I18nProvider lang="ru"><ProductsPage /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} /></I18nProvider>;
}
