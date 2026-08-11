import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcaseCasePage } from "@/components/pages/PortfolioShowcaseCasePage";
import { pageMeta } from "@/lib/page-meta";
import { CURATED_CASE_SLUGS, getCuratedProject, curatedCaseJsonLd } from "@/lib/portfolio-curated";

export const dynamicParams = false;

export function generateStaticParams() {
  return CURATED_CASE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getCuratedProject(params.slug);
  if (!project) return {};
  const c = project.content.en;
  const shareImage = project.caseShots?.[0] ?? project.shots[0];
  return pageMeta("en", `work/${params.slug}`, `${c.name} — ${c.type} | Vlad Kuzmenko`, c.outcome, shareImage);
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getCuratedProject(params.slug);
  return (
    <I18nProvider lang="en">
      <PortfolioShowcaseCasePage slug={params.slug} />
      {project && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(curatedCaseJsonLd("en", project)) }} />}
    </I18nProvider>
  );
}
