import { I18nProvider } from "@/components/i18n-provider";
import { ProductsPage } from "@/components/pages/ProductsPage";
import { pageMeta } from "@/lib/page-meta";

export const metadata = pageMeta(
  "en",
  "products",
  "VisibilityOS Website Intelligence | Vlad Kuzmenko Software",
  "Evidence-led website intelligence for conversion, trust, SEO, AEO, technical health and AI-search readiness.",
);

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "VisibilityOS",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: "Evidence-led website intelligence for conversion, trust, technical health, SEO, AEO and AI-search readiness.",
  url: "https://vladkuzmenko.com/visibilityos",
  creator: { "@type": "Person", name: "Vlad Kuzmenko", url: "https://vladkuzmenko.com" },
};

export default function Page() {
  return <I18nProvider lang="en"><ProductsPage /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} /></I18nProvider>;
}
