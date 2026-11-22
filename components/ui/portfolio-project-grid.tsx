"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { StableProjectImage } from "@/components/ui/stable-project-image";
import { langHref, type Lang } from "@/lib/i18n";
import type { CuratedProject } from "@/lib/portfolio-curated";
import { cn } from "@/lib/utils";

const scope = {
  en: { design: "Product design", site: "Design and Framer implementation" },
  ua: { design: "Дизайн продукту", site: "Дизайн і реалізація у Framer" },
  ru: { design: "Дизайн продукта", site: "Дизайн и реализация во Framer" },
};

export function projectScope(project: CuratedProject, lang: Lang) {
  return project.gallery ? scope[lang][project.gallery.scope] : null;
}

export function PortfolioProjectGrid({
  projects,
  lang,
  featured = false,
}: {
  projects: CuratedProject[];
  lang: Lang;
  featured?: boolean;
}) {
  const prefix = lang === "en" ? "" : langHref(lang);

  return (
    <div className="grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-6">
      {projects.map((project, index) => {
        const copy = project.content[lang];
        const lead = featured && index < 2;
        return (
          <article key={project.key} className={cn("min-w-0", lead ? "lg:col-span-3" : "lg:col-span-2")}>
            <Link
              href={`${prefix}/work/${project.caseSlug}`}
              prefetch={false}
              className="group block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#111113] transition hover:border-amber-300/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#17171b]">
                {project.shots[0] && (
                  <StableProjectImage
                    src={project.shots[0]}
                    alt=""
                    priority={lead}
                    sizes={lead ? "(max-width: 640px) 100vw, 560px" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 370px"}
                    className="!object-center motion-safe:group-hover:scale-[1.03]"
                  />
                )}
              </div>
              <div className="border-t border-white/10 p-5 sm:p-6">
                <p className="mb-2 text-sm font-medium text-amber-200/90">{copy.type}</p>
                <div className="flex items-start justify-between gap-3">
                  <h3 className={cn("font-semibold tracking-tight text-white", lead ? "text-3xl" : "text-xl")}>{copy.name}</h3>
                  <ArrowUpRight aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-zinc-400 transition group-hover:text-amber-200" />
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{copy.outcome}</p>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
