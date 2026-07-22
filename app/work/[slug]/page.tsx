import type { Metadata } from "next";
import { I18nProvider } from "@/components/i18n-provider";
import { CaseStudyPage } from "@/components/pages/CaseStudyPage";
import { pageMeta } from "@/lib/page-meta";
import { CASE_STUDY_SLUGS, getCaseStudy } from "@/lib/case-studies";

export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const study = getCaseStudy(params.slug);
  if (!study) return {};
  const c = study.content.en;
  return pageMeta("en", `work/${params.slug}`, `${c.title} — Case study | Vlad Kuzmenko`, c.tagline);
}

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <I18nProvider lang="en">
      <CaseStudyPage slug={params.slug} />
    </I18nProvider>
  );
}
