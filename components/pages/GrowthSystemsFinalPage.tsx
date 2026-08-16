"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
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
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { BusinessPortfolioSection } from "@/components/business/BusinessPortfolioSection";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
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

const ENGINE_STYLE: Record<EngineKey, {
  color: string;
  muted: string;
  border: string;
  glow: string;
  gradient: string;
}> = {
  traffic: {
    color: "text-amber-200",
    muted: "text-amber-300/65",
    border: "border-amber-300/18",
    glow: "rgba(245,190,52,.13)",
    gradient: "from-amber-300/55",
  },
  conversion: {
    color: "text-sky-200",
    muted: "text-sky-300/65",
    border: "border-sky-300/16",
    glow: "rgba(125,211,252,.11)",
    gradient: "from-sky-300/50",
  },
  growth: {
    color: "text-violet-200",
    muted: "text-violet-300/65",
    border: "border-violet-300/16",
    glow: "rgba(196,181,253,.11)",
    gradient: "from-violet-300/50",
  },
};

function SectionHeading({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mx-auto max-w-4xl text-center"
    >
      <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/70">{eyebrow}</span>
      <h2 className="section-title mt-4 text-[clamp(2.3rem,4vw,3.8rem)] leading-[1.02] text-zinc-100">{title}</h2>
      {desc ? <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{desc}</p> : null}
    </motion.div>
  );
}

function DotList({ items, color = "bg-amber-300/70" }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-400">
          <span className={cn("mt-2 h-1.5 w-1.5 shrink-0 rounded-full", color)} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function GrowthMap({ lang }: { lang: Lang }) {
  const reduced = useReducedMotion();
  const labels: Record<Lang, string[]> = {
    en: ["Attention", "Conversation", "Sale"],
    ua: ["Увага", "Розмова", "Продаж"],
    ru: ["Внимание", "Разговор", "Продажа"],
  };
  const helper: Record<Lang, string> = {
    en: "Find the leaking layer, fix it, then scale what survives.",
    ua: "Знайти шар, де втрачається попит, виправити його й масштабувати те, що працює.",
    ru: "Найти слой, где теряется спрос, исправить его и масштабировать то, что работает.",
  };

  return (
    <InteractiveSurface accent="gold" lift={false} className="relative overflow-hidden rounded-[32px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(245,190,52,.055),rgba(255,255,255,.012)_48%,rgba(0,0,0,.5))] p-6 sm:p-8">
      <div aria-hidden="true" className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:38px_38px] [mask-image:radial-gradient(ellipse_at_center,black_8%,transparent_76%)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-sm font-semibold text-zinc-100">Growth map</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">Traffic → Conversion → Growth</p></div>
          <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(245,190,52,.55)]" />
        </div>
        <div className="mt-9 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 sm:gap-4">
          {labels[lang].flatMap((text, index) => {
            const node = (
              <motion.div key={`node-${text}`} initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 + index * .1 }} className="rounded-2xl border border-white/[.08] bg-black/45 px-3 py-6 text-center">
                <span className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-amber-300/16 bg-amber-300/[.045] text-amber-200"><CheckCircle2 className="h-4 w-4" /></span>
                <span className="text-[10px] font-semibold uppercase tracking-[.08em] text-zinc-300">{text}</span>
              </motion.div>
            );
            if (index === 2) return [node];
            return [
              node,
              <div key={`line-${text}`} className="relative h-px min-w-5 overflow-hidden bg-white/[.08]">
                {!reduced ? <motion.span className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-amber-300 to-transparent" animate={{ x: ["-120%", "220%"] }} transition={{ repeat: Infinity, duration: 2.4, ease: "linear", delay: index * .35 }} /> : null}
              </div>,
            ];
          })}
        </div>
        <p className="mt-7 text-center text-xs leading-6 text-zinc-500">{helper[lang]}</p>
      </div>
    </InteractiveSurface>
  );
}

export function GrowthSystemsFinalPage() {
  const { lang } = useI18n();
  const locale: Lang = lang;
  const x = getGrowthCopy(locale);
  const base = langHref(locale);
  const localeBase = base === "/" ? "" : base;
  const route = growthRoute(locale);
  const pageHref = (slug: string) => `${localeBase}/${slug}`;

  const diagnosticDialog = (source: string, label: string, extra?: Record<string, string>) => ({
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
    <div className="min-h-screen overflow-x-hidden bg-[#020202] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden pb-20 pt-36 sm:pb-24 sm:pt-40">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute left-1/2 top-0 h-[720px] w-[110%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.16),rgba(212,175,55,.035)_35%,transparent_70%)]" />
            <div className="absolute left-1/2 top-[122px] h-px w-[min(920px,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/38 to-transparent shadow-[0_0_34px_rgba(212,175,55,.15)]" />
          </div>
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }}>
                <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/72">{x.hero.eyebrow}</span>
                <h1 className="section-title mt-5 max-w-4xl text-[clamp(2.9rem,5.1vw,5.15rem)] leading-[.97] text-zinc-100">{x.hero.title}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-200 sm:text-lg">{x.hero.lead}</p>
                <p className="section-lead mt-4 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base sm:leading-8">{x.hero.support}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <RequestDialog {...diagnosticDialog("growth_hero", x.hero.primaryCta)}><Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">{x.hero.primaryCta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog>
                  <a href="#systems" className="w-full sm:w-auto"><Button className="h-auto min-h-12 w-full border border-white/[.13] bg-white/[.03] px-7 py-3 text-white hover:bg-white/[.07] sm:w-auto">{x.hero.secondaryCta}<ArrowDown className="ml-2 h-4 w-4" /></Button></a>
                </div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 18, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .7, delay: .08 }}><GrowthMap lang={lang} /></motion.div>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-3">
              {ENGINE_ORDER.map((key, index) => {
                const Icon = ENGINE_ICON[key];
                const style = ENGINE_STYLE[key];
                return (
                  <a key={key} href={`#${engineAnchor(key)}`} className={cn("group rounded-[22px] border bg-white/[.018] p-5 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[.035]", style.border)}>
                    <div className="flex items-center gap-3"><span className={cn("flex h-10 w-10 items-center justify-center rounded-xl border bg-white/[.025]", style.border, style.color)}><Icon className="h-4 w-4" /></span><div><p className="text-sm font-semibold text-zinc-100">{ENGINE_LABEL[key]}</p><p className="mt-0.5 text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</p></div></div>
                    <p className="mt-4 text-sm leading-6 text-zinc-500">{x.engines.items[key].bottleneck}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="diagnostic" className="relative scroll-mt-24 overflow-hidden py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(245,190,52,.075),transparent_60%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow={x.diagnostic.eyebrow} title={x.diagnostic.title} desc={x.diagnostic.desc} />
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {x.diagnostic.paths.map((path, index) => {
                const style = ENGINE_STYLE[path.engine];
                return (
                  <motion.a key={path.value} href={`#${engineAnchor(path.engine)}`} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className={cn("group relative flex min-h-[270px] flex-col overflow-hidden rounded-[28px] border bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.01))] p-7 transition duration-300 hover:-translate-y-1", style.border)}>
                    <div aria-hidden="true" className="absolute -right-20 -top-24 h-60 w-60 rounded-full blur-[75px]" style={{ background: `radial-gradient(circle, ${style.glow}, transparent 68%)` }} />
                    <span className={cn("relative text-[10px] font-bold uppercase tracking-[.19em]", style.muted)}>{ENGINE_LABEL[path.engine]}</span>
                    <h3 className="relative mt-5 text-xl font-semibold leading-8 text-zinc-100">{path.situation}</h3>
                    <p className="relative mt-3 flex-1 text-sm leading-7 text-zinc-500">{path.detail}</p>
                    <span className={cn("relative mt-6 inline-flex items-center gap-2 text-sm font-semibold", style.color)}>{x.diagnostic.startWith} {ENGINE_LABEL[path.engine]}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>

        <section id="systems" className="relative scroll-mt-24 py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow={x.engines.eyebrow} title={x.engines.title} desc={x.engines.desc} />
            <div className="mt-12 space-y-7">
              {ENGINE_ORDER.map((key, index) => {
                const engine = x.engines.items[key];
                const Icon = ENGINE_ICON[key];
                const style = ENGINE_STYLE[key];
                const bullet = key === "traffic" ? "bg-amber-300/70" : key === "conversion" ? "bg-sky-300/70" : "bg-violet-300/70";
                return (
                  <motion.article key={key} id={engineAnchor(key)} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} className={cn("relative scroll-mt-24 overflow-hidden rounded-[34px] border bg-[linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.009))]", style.border)}>
                    <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-32 h-[420px] w-[420px] rounded-full blur-[100px]" style={{ background: `radial-gradient(circle, ${style.glow}, transparent 68%)` }} />
                    <div className="relative grid lg:grid-cols-[.42fr_.58fr]">
                      <div className="border-b border-white/[.07] p-7 sm:p-9 lg:border-b-0 lg:border-r">
                        <div className="flex items-center justify-between gap-4"><span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl border bg-white/[.025]", style.border, style.color)}><Icon className="h-5 w-5" /></span><span className="font-display text-2xl italic text-white/[.12]">0{index + 1}</span></div>
                        <h3 className="mt-7 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">{ENGINE_LABEL[key]}</h3>
                        <div className={cn("mt-4 h-px w-20 bg-gradient-to-r to-transparent", style.gradient)} />
                        <p className={cn("mt-6 text-lg font-semibold leading-8", style.color)}>{engine.bottleneck}</p>
                        <p className="mt-3 text-sm leading-7 text-zinc-400">{engine.outcome}</p>
                        <div className="mt-5 flex flex-wrap gap-2">{engine.chips.map((chip) => <span key={chip} className="rounded-full border border-white/[.08] bg-black/30 px-3 py-1.5 text-[11px] text-zinc-400">{chip}</span>)}</div>
                        <RequestDialog intent={ENGINE_INTENT[key]} title={engine.cta} description={x.engines.dialogDesc} buttonLabel={`Growth systems — ${ENGINE_LABEL[key]}`} showBuildType={false} helpLabel={x.engines.helpLabel} helpPlaceholder={x.engines.helpPlaceholder} successTitle={x.engines.successTitle} successMessage={x.engines.successMessage} context={{ offer: ENGINE_INTENT[key], source: "growth_engine_section", locale, route }}>
                          <Button className="premium-button mt-7 h-auto min-h-12 w-full px-7 py-3 sm:w-auto">{engine.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                        </RequestDialog>
                      </div>
                      <div className="grid gap-px bg-white/[.06] sm:grid-cols-2">
                        <div className="bg-[#050505] p-6 sm:p-7"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600"><Users className={cn("h-3.5 w-3.5", style.color)} />{x.engines.labels.whoFor}</p><p className="mt-4 text-sm leading-7 text-zinc-400">{engine.whoFor}</p></div>
                        <div className="bg-[#050505] p-6 sm:p-7"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600"><Compass className={cn("h-3.5 w-3.5", style.color)} />{x.engines.labels.when}</p><div className="mt-4"><DotList items={engine.when} color={bullet} /></div></div>
                        <div className="bg-[#050505] p-6 sm:p-7"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600"><Wrench className={cn("h-3.5 w-3.5", style.color)} />{x.engines.labels.build}</p><div className="mt-4"><DotList items={engine.build.slice(0, 6)} color={bullet} /></div></div>
                        <div className="bg-[#050505] p-6 sm:p-7"><p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600"><Target className={cn("h-3.5 w-3.5", style.color)} />{x.engines.labels.pilot}</p><p className="mt-4 text-sm leading-7 text-zinc-400">{engine.pilot}</p><p className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.17em] text-zinc-600"><Gauge className={cn("h-3.5 w-3.5", style.color)} />{x.engines.labels.measure}</p><div className="mt-4"><DotList items={engine.measure} color={bullet} /></div></div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="how-we-start" className="relative scroll-mt-24 overflow-hidden py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.06),transparent_62%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow={x.process.eyebrow} title={x.process.title} desc={x.process.desc} />
            <div className="relative mt-10 grid gap-4 md:grid-cols-4">
              {x.process.steps.map((step, index) => (
                <motion.div key={step.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="relative rounded-[24px] border border-white/[.08] bg-black/40 p-6">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-amber-300/20 bg-[#080704] text-[10px] font-bold text-amber-200">0{index + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-100">{step.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <BusinessPortfolioSection />

        <section className="relative overflow-hidden py-20 md:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(125,211,252,.045),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow={x.capabilities.eyebrow} title={x.capabilities.title} desc={x.capabilities.desc} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {x.capabilities.links.map((link, index) => (
                <motion.a key={link.slug} href={pageHref(link.slug)} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }} className="group flex min-h-[210px] flex-col rounded-[24px] border border-white/[.08] bg-black/40 p-6 transition duration-300 hover:-translate-y-1 hover:border-sky-300/16">
                  <span className="text-[9px] tracking-[.17em] text-zinc-700">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold text-zinc-100">{link.title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-zinc-500">{link.desc}</p><ArrowRight className="mt-5 h-4 w-4 text-sky-200/70 transition-transform group-hover:translate-x-1" />
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 py-20 md:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <SectionHeading eyebrow={x.faq.eyebrow} title={x.faq.title} />
            <div className="mx-auto mt-10 grid max-w-5xl gap-3 lg:grid-cols-2">{x.faq.items.map((item, index) => <motion.div key={item.q} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .035 }} className="rounded-[24px] border border-white/[.08] bg-white/[.018] p-6 sm:p-7"><h3 className="text-base font-semibold leading-7 text-zinc-100 sm:text-lg">{item.q}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.a}</p></motion.div>)}</div>
          </div>
        </section>

        <section className="pb-28 pt-8">
          <div className="container mx-auto max-w-5xl px-4">
            <InteractiveSurface accent="gold" lift={false} className="relative overflow-hidden rounded-[34px] border border-amber-300/[.14] bg-[linear-gradient(145deg,rgba(245,190,52,.075),rgba(255,255,255,.014)_48%,rgba(0,0,0,.46))] p-8 text-center sm:p-12">
              <div aria-hidden="true" className="absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(245,190,52,.12),transparent_68%)]" />
              <div className="relative"><span className="text-[10px] font-semibold uppercase tracking-[.22em] text-amber-300/70">{x.finalCta.eyebrow}</span><h2 className="section-title mx-auto mt-4 max-w-3xl text-[clamp(2.25rem,4.2vw,3.8rem)] leading-[1.03] text-white">{x.finalCta.title}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{x.finalCta.desc}</p><RequestDialog {...diagnosticDialog("growth_final_cta", x.finalCta.cta)}><Button className="premium-button mt-7 h-auto min-h-12 px-8 py-3">{x.finalCta.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog></div>
            </InteractiveSurface>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
