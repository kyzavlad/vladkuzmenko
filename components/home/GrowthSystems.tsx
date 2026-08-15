"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Megaphone, Repeat, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { cn } from "@/lib/utils";
import { langHref, type Lang } from "@/lib/i18n";
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

const STYLE: Record<EngineKey, { border: string; glow: string; icon: string; label: string; button: string; dot: string }> = {
  traffic: { border: "border-amber-300/20 hover:border-amber-300/35", glow: "bg-amber-300/[.09]", icon: "border-amber-300/20 bg-amber-300/[.08] text-amber-300", label: "text-amber-300/80", button: "border-amber-300/20 bg-amber-300/[.06] text-amber-100 hover:bg-amber-300/[.10]", dot: "bg-amber-300" },
  conversion: { border: "border-sky-300/20 hover:border-sky-300/35", glow: "bg-sky-300/[.08]", icon: "border-sky-300/20 bg-sky-300/[.07] text-sky-200", label: "text-sky-200/80", button: "border-sky-300/20 bg-sky-300/[.055] text-sky-100 hover:bg-sky-300/[.10]", dot: "bg-sky-300" },
  growth: { border: "border-violet-300/20 hover:border-violet-300/35", glow: "bg-violet-300/[.08]", icon: "border-violet-300/20 bg-violet-300/[.07] text-violet-200", label: "text-violet-200/80", button: "border-violet-300/20 bg-violet-300/[.055] text-violet-100 hover:bg-violet-300/[.10]", dot: "bg-violet-300" },
};

const HOME_COPY: Record<Lang, { eyebrow: string; titleA: string; titleB: string; desc: string; choose: string; unsure: string }> = {
  en: { eyebrow: "FOR BUSINESS", titleA: "Where is growth ", titleB: "being lost right now?", desc: "You do not need to choose AI, a website, content or a CRM first. Start with the business problem. The system and tools come after that.", choose: "Choose the situation closest to yours", unsure: "Not sure which one fits?" },
  ua: { eyebrow: "ДЛЯ БІЗНЕСУ", titleA: "Де зараз ", titleB: "втрачається ріст?", desc: "Не потрібно спочатку обирати AI, сайт, контент чи CRM. Починаємо з бізнес-проблеми, а систему та інструменти підбираємо вже під неї.", choose: "Оберіть ситуацію, найближчу до вашої", unsure: "Не впевнені, що саме підходить?" },
  ru: { eyebrow: "ДЛЯ БИЗНЕСА", titleA: "Где сейчас ", titleB: "теряется рост?", desc: "Не нужно сначала выбирать AI, сайт, контент или CRM. Начинаем с бизнес-проблемы, а систему и инструменты подбираем уже под неё.", choose: "Выберите ситуацию, которая ближе к вашей", unsure: "Не уверены, что именно подходит?" },
};

export function GrowthSystems() {
  const { lang } = useI18n();
  const x = getGrowthCopy(lang);
  const h = HOME_COPY[lang];
  const base = langHref(lang);
  const page = growthRoute(lang);
  const [picked, setPicked] = useState<number | null>(null);
  const chosen = picked === null ? null : x.diagnostic.paths[picked];

  return (
    <section id="growth-systems" className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#030303] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(245,190,52,.08),transparent_60%)]" />
      <div className="pointer-events-none absolute left-0 top-[42%] h-[420px] w-[420px] rounded-full bg-sky-300/[.035] blur-[130px]" />
      <div className="pointer-events-none absolute right-0 top-[62%] h-[420px] w-[420px] rounded-full bg-violet-300/[.035] blur-[130px]" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-amber-300/15 bg-amber-300/[.045] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-amber-200/80">{h.eyebrow}</span>
          <h2 className="mt-5 text-4xl font-black leading-[1.04] tracking-[-.045em] sm:text-5xl md:text-6xl">{h.titleA}<span className="gradient-gold-text">{h.titleB}</span></h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">{h.desc}</p>
        </motion.div>

        <div className="mx-auto max-w-6xl space-y-4">
          {ENGINE_ORDER.map((key, i) => {
            const e = x.engines.items[key];
            const Icon = ENGINE_ICON[key];
            const s = STYLE[key];
            return (
              <motion.article key={key} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className={cn("group relative overflow-hidden rounded-[28px] border bg-[#080808] transition duration-300", s.border)}>
                <div className={cn("pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-[100px]", s.glow)} />
                <div className="relative grid lg:grid-cols-[1.08fr_.92fr]">
                  <div className="border-b border-white/[.07] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-9">
                    <div className="flex items-center justify-between gap-4">
                      <span className={cn("flex h-12 w-12 items-center justify-center rounded-2xl border", s.icon)}><Icon className="h-5 w-5" /></span>
                      <span className="text-[11px] font-bold tracking-[.2em] text-zinc-700">{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <p className={cn("mt-6 text-[10px] font-bold uppercase tracking-[.2em]", s.label)}>{ENGINE_LABEL[key]}</p>
                    <h3 className="mt-3 max-w-2xl text-2xl font-black leading-tight tracking-[-.035em] text-white sm:text-3xl">{e.bottleneck}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{e.outcome}</p>
                  </div>
                  <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-9">
                    <div className="flex flex-wrap gap-2">{e.chips.map((chip) => <span key={chip} className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-300">{chip}</span>)}</div>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                      <RequestDialog intent={ENGINE_INTENT[key]} title={e.cta} description={x.engines.dialogDesc} buttonLabel={`Home — ${ENGINE_LABEL[key]}`} showBuildType={false} helpLabel={x.engines.helpLabel} helpPlaceholder={x.engines.helpPlaceholder} successTitle={x.engines.successTitle} successMessage={x.engines.successMessage} context={{ offer: ENGINE_INTENT[key], source: "home_growth_systems", locale: lang, route: base }}>
                        <Button className={cn("h-auto min-h-11 w-full border px-5 py-2.5 text-sm font-semibold", s.button)}>{e.cta}<ArrowRight className="ml-2 h-4 w-4 shrink-0" /></Button>
                      </RequestDialog>
                      <a href={`${page}#${engineAnchor(key)}`} className="w-full"><Button className="h-auto min-h-11 w-full border border-white/[.10] bg-white/[.025] px-5 py-2.5 text-sm text-zinc-200 hover:bg-white/[.055]">{x.home.details}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mt-7 max-w-6xl overflow-hidden rounded-[28px] border border-white/[.09] bg-[#070707]">
          <div className="border-b border-white/[.07] p-6 sm:p-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div><p className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.2em] text-zinc-500"><Compass className="h-3.5 w-3.5 text-amber-300" />{h.unsure}</p><h3 className="mt-3 text-2xl font-black tracking-[-.035em] sm:text-3xl">{h.choose}</h3></div>
              <p className="max-w-md text-sm leading-6 text-zinc-500">{x.diagnostic.desc}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3">
            {x.diagnostic.paths.map((path, i) => {
              const active = picked === i;
              const s = STYLE[path.engine];
              return (
                <button key={path.value} type="button" onClick={() => setPicked(active ? null : i)} aria-pressed={active} className={cn("min-h-[190px] border-b border-white/[.07] p-6 text-left transition md:border-b-0 md:border-r md:last:border-r-0 sm:p-7", active ? "bg-white/[.055]" : "bg-transparent hover:bg-white/[.025]")}>
                  <div className="flex items-center justify-between gap-3"><span className={cn("text-[10px] font-bold uppercase tracking-[.18em]", s.label)}>{ENGINE_LABEL[path.engine]}</span><span className={cn("h-2 w-2 rounded-full transition", active ? s.dot : "bg-zinc-800")} /></div>
                  <p className="mt-4 text-base font-bold leading-6 text-zinc-100">{path.situation}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-500">{path.detail}</p>
                </button>
              );
            })}
          </div>

          {chosen && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="flex flex-col gap-5 border-t border-white/[.07] bg-white/[.018] p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl"><p className={cn("text-[10px] font-bold uppercase tracking-[.2em]", STYLE[chosen.engine].label)}>{x.home.recommended}</p><p className="mt-2 text-xl font-black tracking-tight">{ENGINE_LABEL[chosen.engine]}</p><p className="mt-2 text-sm leading-6 text-zinc-400">{x.engines.items[chosen.engine].outcome}</p></div>
              <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                <RequestDialog intent={DIAGNOSTIC_INTENT} title={x.diagnostic.dialogTitle} description={x.diagnostic.dialogDesc} buttonLabel={`Home — Diagnostic (${ENGINE_LABEL[chosen.engine]})`} showBuildType={false} helpLabel={x.diagnostic.helpLabel} helpPlaceholder={x.diagnostic.helpPlaceholder} successTitle={x.diagnostic.successTitle} successMessage={x.diagnostic.successMessage} context={{ offer: ENGINE_INTENT[chosen.engine], situation: chosen.value, source: "home_growth_diagnostic", locale: lang, route: base }}>
                  <Button className="premium-button h-auto min-h-11 w-full px-6 py-2.5 sm:w-auto">{x.diagnostic.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </RequestDialog>
                <a href={`${page}#${engineAnchor(chosen.engine)}`} className="w-full sm:w-auto"><Button className="h-auto min-h-11 w-full border border-white/15 bg-white/[.03] px-6 py-2.5 text-white hover:bg-white/[.07] sm:w-auto">{x.home.details}</Button></a>
              </div>
            </motion.div>
          )}
          <div className="border-t border-white/[.07] p-5 text-center"><a href={page} className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-300 transition-colors hover:text-amber-200">{x.home.seeAll}<ArrowRight className="h-4 w-4" /></a></div>
        </motion.div>
      </div>
    </section>
  );
}
