"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Compass,
  Gauge,
  Megaphone,
  Repeat,
  Target,
  Users,
  Wrench,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { STATUS_TONE, statusText } from "@/lib/portfolio";
import { getCuratedProject } from "@/lib/portfolio-curated";
import { cn } from "@/lib/utils";
import {
  DIAGNOSTIC_INTENT,
  ENGINE_INTENT,
  ENGINE_LABEL,
  ENGINE_ORDER,
  engineAnchor,
  getGrowthCopy,
  growthRoute,
  type EngineKey,
} from "@/lib/growth-systems";

const ENGINE_ICON: Record<EngineKey, LucideIcon> = {
  traffic: Megaphone,
  conversion: Workflow,
  growth: Repeat,
};

/** Cases that illustrate the systems described on this page. */
const PROOF_KEYS = ["status-auto", "dating-crm", "ikorka", "tutorivo"] as const;

function SectionHead({
  eyebrow,
  title,
  desc,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
  icon?: LucideIcon;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-3xl"
    >
      <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-amber-300/80">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {eyebrow}
      </p>
      <h2 className="mt-4 text-3xl font-black tracking-[-.03em] sm:text-4xl lg:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-base leading-7 text-zinc-400 sm:text-lg">{desc}</p>}
    </motion.div>
  );
}

function DetailBlock({
  label,
  icon: Icon,
  children,
  className,
}: {
  label: string;
  icon: LucideIcon;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/[.08] bg-white/[.018] p-5 sm:p-6", className)}>
      <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-zinc-500">
        <Icon className="h-3.5 w-3.5 text-amber-300/70" />
        {label}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export function GrowthSystemsPage() {
  const { lang } = useI18n();
  const locale: Lang = lang;
  const x = getGrowthCopy(locale);
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const route = growthRoute(locale);
  const pageHref = (slug: string) => `${localeBase}/${slug}`;

  const proof = PROOF_KEYS.map((key) => getCuratedProject(key)).filter(
    (project): project is NonNullable<typeof project> => Boolean(project),
  );

  const diagnosticDialog = (
    source: string,
    label: string,
    extra?: Record<string, string>,
  ) => ({
    intent: DIAGNOSTIC_INTENT,
    title: x.diagnostic.dialogTitle,
    description: x.diagnostic.dialogDesc,
    buttonLabel: label,
    showBuildType: false,
    helpLabel: x.diagnostic.helpLabel,
    helpPlaceholder: x.diagnostic.helpPlaceholder,
    successTitle: x.diagnostic.successTitle,
    successMessage: x.diagnostic.successMessage,
    context: { source, locale, route, ...(extra ?? {}) },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-white/[.07] pb-16 pt-36 sm:pb-24 sm:pt-40">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(245,190,52,.14),transparent_36%),radial-gradient(circle_at_85%_18%,rgba(109,40,217,.09),transparent_30%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-semibold uppercase tracking-[.18em] text-amber-200">
              <Compass className="h-3.5 w-3.5" />
              {x.hero.eyebrow}
            </span>
            <h1 className="mt-5 max-w-5xl text-4xl font-black tracking-[-.045em] sm:text-6xl lg:text-7xl">
              {x.hero.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-200 sm:text-xl">{x.hero.lead}</p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-400">{x.hero.support}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <RequestDialog {...diagnosticDialog("growth_hero", x.hero.primaryCta)}>
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">
                  {x.hero.primaryCta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
              <a href="#systems" className="w-full sm:w-auto">
                <Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.035] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">
                  {x.hero.secondaryCta}
                  <ArrowDown className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>

            {/* Engine summary strip */}
            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {ENGINE_ORDER.map((key) => {
                const Icon = ENGINE_ICON[key];
                return (
                  <a
                    key={key}
                    href={`#${engineAnchor(key)}`}
                    className="group rounded-2xl border border-white/[.08] bg-white/[.02] p-5 transition duration-300 hover:border-amber-300/25 hover:bg-white/[.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="text-base font-bold tracking-tight">{ENGINE_LABEL[key]}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-400">{x.engines.items[key].bottleneck}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        {/* Diagnostic overview */}
        <section id="diagnostic" className="scroll-mt-24 border-b border-white/[.07] bg-[#050505] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead
              eyebrow={x.diagnostic.eyebrow}
              title={x.diagnostic.title}
              desc={x.diagnostic.desc}
              icon={Compass}
            />

            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {x.diagnostic.paths.map((path, i) => (
                <motion.div
                  key={path.value}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex flex-col rounded-[24px] border border-white/[.09] bg-[#080808] p-6 sm:p-7"
                >
                  <span className="text-[10px] font-bold uppercase tracking-[.2em] text-zinc-700">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-4 text-lg font-semibold leading-7 text-white">{path.situation}</p>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{path.detail}</p>
                  <a
                    href={`#${engineAnchor(path.engine)}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-xl border border-amber-300/20 bg-amber-300/[.06] px-4 py-3 text-sm font-semibold text-amber-100 transition-colors hover:bg-amber-300/[.12]"
                  >
                    {x.diagnostic.startWith} {ENGINE_LABEL[path.engine]}
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* The three engines */}
        <section id="systems" className="scroll-mt-24 border-b border-white/[.07] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead eyebrow={x.engines.eyebrow} title={x.engines.title} desc={x.engines.desc} icon={Target} />

            <div className="mt-12 space-y-8 sm:space-y-10">
              {ENGINE_ORDER.map((key, i) => {
                const e = x.engines.items[key];
                const Icon = ENGINE_ICON[key];
                return (
                  <motion.article
                    key={key}
                    id={engineAnchor(key)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    className="scroll-mt-24 overflow-hidden rounded-[28px] border border-white/[.09] bg-[#080808] shadow-[0_24px_80px_rgba(0,0,0,.3)]"
                  >
                    <div className="border-b border-white/[.07] bg-[radial-gradient(circle_at_12%_0%,rgba(245,190,52,.10),transparent_45%)] p-6 sm:p-9">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/25 bg-amber-300/10 text-amber-200">
                          <Icon className="h-5 w-5" />
                        </span>
                        <h3 className="text-3xl font-black tracking-[-.035em] sm:text-4xl">{ENGINE_LABEL[key]}</h3>
                        <span className="ml-auto hidden text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-700 sm:block">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="mt-5 text-lg font-semibold leading-8 text-amber-100/90 sm:text-xl">
                        {e.bottleneck}
                      </p>
                      <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-300">{e.outcome}</p>
                    </div>

                    <div className="p-6 sm:p-9">
                      <div className="grid gap-4 lg:grid-cols-2">
                        <DetailBlock label={x.engines.labels.whoFor} icon={Users}>
                          <p className="text-sm leading-6 text-zinc-300">{e.whoFor}</p>
                        </DetailBlock>

                        <DetailBlock label={x.engines.labels.when} icon={Compass}>
                          <ul className="space-y-2.5">
                            {e.when.map((line) => (
                              <li key={line} className="flex gap-2.5 text-sm leading-6 text-zinc-400">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </DetailBlock>

                        <DetailBlock label={x.engines.labels.build} icon={Wrench} className="lg:col-span-2">
                          <ul className="grid gap-2.5 sm:grid-cols-2">
                            {e.build.map((line) => (
                              <li key={line} className="flex gap-2.5 text-sm leading-6 text-zinc-300">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </DetailBlock>

                        <DetailBlock label={x.engines.labels.pilot} icon={Target}>
                          <p className="text-sm leading-6 text-zinc-300">{e.pilot}</p>
                        </DetailBlock>

                        <DetailBlock label={x.engines.labels.measure} icon={Gauge}>
                          <ul className="space-y-2.5">
                            {e.measure.map((line) => (
                              <li key={line} className="flex gap-2.5 text-sm leading-6 text-zinc-400">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-300/70" />
                                {line}
                              </li>
                            ))}
                          </ul>
                        </DetailBlock>
                      </div>

                      <p className="mt-5 text-sm leading-6 text-zinc-500">{e.note}</p>

                      <div className="mt-7 border-t border-white/[.07] pt-6">
                        <RequestDialog
                          intent={ENGINE_INTENT[key]}
                          title={e.cta}
                          description={x.engines.dialogDesc}
                          buttonLabel={`Growth systems — ${ENGINE_LABEL[key]}`}
                          showBuildType={false}
                          helpLabel={x.engines.helpLabel}
                          helpPlaceholder={x.engines.helpPlaceholder}
                          successTitle={x.engines.successTitle}
                          successMessage={x.engines.successMessage}
                          context={{ offer: ENGINE_INTENT[key], source: "growth_engine_section", locale, route }}
                        >
                          <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">
                            {e.cta}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </RequestDialog>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        {/* How we start */}
        <section id="how-we-start" className="scroll-mt-24 border-b border-white/[.07] bg-[#050505] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead eyebrow={x.process.eyebrow} title={x.process.title} desc={x.process.desc} icon={Compass} />

            <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {x.process.steps.map((step, i) => (
                <motion.li
                  key={step.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="relative rounded-[24px] border border-white/[.09] bg-[#080808] p-6"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[.2em] text-amber-300/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{step.desc}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </section>

        {/* Proof */}
        <section className="border-b border-white/[.07] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead eyebrow={x.proof.eyebrow} title={x.proof.title} desc={x.proof.desc} icon={Target} />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {proof.map((project, i) => {
                const c = project.content[locale];
                const href = `${localeBase}/work/${project.caseSlug ?? project.key}`;
                const green = STATUS_TONE[project.status] === "green";
                return (
                  <motion.a
                    key={project.key}
                    href={href}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex flex-col rounded-[24px] border border-white/[.09] bg-[#080808] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/22 sm:p-7"
                  >
                    <span
                      className={cn(
                        "inline-flex w-fit items-center gap-2 rounded-full border bg-white/[.035] px-3 py-1.5 text-[11px] font-semibold text-zinc-200",
                        green ? "border-emerald-300/20" : "border-amber-300/20",
                      )}
                    >
                      <span
                        className={cn(
                          "h-1.5 w-1.5 shrink-0 rounded-full",
                          green ? "bg-emerald-300" : "bg-amber-300",
                        )}
                      />
                      {statusText(locale, project.status, project.statusLabel)}
                    </span>
                    <h3 className="mt-5 text-2xl font-black tracking-[-.03em]">{c.name}</h3>
                    <p className="mt-2 text-sm text-zinc-500">{c.type}</p>
                    <p className="mt-4 flex-1 text-sm leading-6 text-zinc-300">{c.outcome}</p>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition-colors group-hover:text-amber-200">
                      {x.proof.open}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-8">
              <a href={pageHref("work")}>
                <Button className="h-auto min-h-11 border border-white/15 bg-white/[.035] px-6 py-2.5 text-white hover:bg-white/[.08]">
                  {x.proof.all}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Capability pages */}
        <section className="border-b border-white/[.07] bg-[#050505] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead eyebrow={x.capabilities.eyebrow} title={x.capabilities.title} desc={x.capabilities.desc} icon={Wrench} />

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {x.capabilities.links.map((link, i) => (
                <motion.a
                  key={link.slug}
                  href={pageHref(link.slug)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col rounded-[24px] border border-white/[.09] bg-[#080808] p-6 transition duration-300 hover:-translate-y-0.5 hover:border-amber-300/22"
                >
                  <h3 className="text-lg font-bold tracking-tight">{link.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">{link.desc}</p>
                  <ArrowRight className="mt-5 h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-24 border-b border-white/[.07] py-16 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHead eyebrow={x.faq.eyebrow} title={x.faq.title} />

            <div className="mt-10 grid gap-4 lg:grid-cols-2">
              {x.faq.items.map((item, i) => (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-[24px] border border-white/[.09] bg-[#080808] p-6 sm:p-7"
                >
                  <h3 className="text-base font-semibold leading-7 text-white sm:text-lg">{item.q}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{item.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[28px] border border-amber-300/15 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_38%),#080808] p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[.2em] text-amber-300/75">{x.finalCta.eyebrow}</p>
              <h2 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-4xl">{x.finalCta.title}</h2>
              <p className="mt-4 max-w-2xl text-zinc-400">{x.finalCta.desc}</p>
              <div className="mt-7">
                <RequestDialog {...diagnosticDialog("growth_final_cta", x.finalCta.cta)}>
                  <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">
                    {x.finalCta.cta}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </RequestDialog>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
