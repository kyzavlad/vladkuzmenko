import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n-provider";
import { PortfolioShowcaseCasePage } from "@/components/pages/PortfolioShowcaseCasePage";
import { pageMeta } from "@/lib/page-meta";
import { SHOWCASE_CASE_SLUGS, getShowcaseProject, showcaseCaseJsonLd } from "@/lib/portfolio-showcase";

export const dynamicParams = false;

export function generateStaticParams() {
  return SHOWCASE_CASE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getShowcaseProject(params.slug);
  if (!project) return {};
  const c = project.content.ru;
  return pageMeta("ru", `work/${params.slug}`, `${c.name} — кейс | Vlad Kuzmenko`, c.outcome, project.shots[0]);
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = getShowcaseProject(params.slug);
  return (
    <I18nProvider lang="ru">
      <PortfolioShowcaseCasePage slug={params.slug} />
      {project && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(showcaseCaseJsonLd("ru", project)) }} />}
    </I18nProvider>
  );
}
