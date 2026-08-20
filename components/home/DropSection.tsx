"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle2, Dumbbell, PackageCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { DROP_INTENT, directionRoute } from "@/lib/ecosystem";
import { PERFORMANCE_DIALOG } from "@/lib/performance";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  eyebrow: string;
  badge: string;
  titleA: string;
  titleB: string;
  desc: string;
  product: string;
  productDesc: string;
  systemLabel: string;
  moments: string[];
  research: string;
  open: string;
}> = {
  en: {
    eyebrow: "Performance",
    badge: "Product 01 · Complete Meal",
    titleA: "One reliable meal for ",
    titleB: "busy days.",
    desc: "Performance is the product layer for demanding work, training and travel routines. We start with one narrow problem: the meal that disappears when the day gets busy.",
    product: "Performance Complete",
    productDesc: "A complete-meal powder concept: 17 servings per pouch, ~400 kcal and ~40 g plant protein as formulation targets, mixed with water in about a minute. Formula, flavour, manufacturing and final economics are in validation before paid launch.",
    systemLabel: "Built around the moment food usually breaks",
    moments: ["Deep work", "Training", "60-second meal", "Routine"],
    research: "Join the pilot",
    open: "Explore Performance Complete",
  },
  ua: {
    eyebrow: "Performance",
    badge: "Продукт 01 · Complete Meal",
    titleA: "Один надійний прийом їжі для ",
    titleB: "насичених днів.",
    desc: "Performance — продуктовий напрям для щільного ритму роботи, тренувань і поїздок. Починаємо з однієї вузької проблеми: прийому їжі, який зникає, коли день стає надто насиченим.",
    product: "Performance Complete",
    productDesc: "Концепт повноцінного порошкового прийому їжі: 17 порцій у пакеті, ~400 ккал і ~40 г рослинного білка як цілі формуляції, змішування з водою приблизно за хвилину. Формула, смак, виробництво й фінальна економіка проходять валідацію до paid launch.",
    systemLabel: "Під момент, де харчування зазвичай ламається",
    moments: ["Глибока робота", "Тренування", "1 хвилина", "Режим"],
    research: "Долучитися до пілоту",
    open: "Відкрити Performance Complete",
  },
  ru: {
    eyebrow: "Performance",
    badge: "Продукт 01 · Complete Meal",
    titleA: "Один надёжный приём пищи для ",
    titleB: "загруженных дней.",
    desc: "Performance — продуктовый слой для плотного ритма работы, тренировок и поездок. Начинаем с одной узкой проблемы: приёма пищи, который исчезает, когда день становится слишком загруженным.",
    product: "Performance Complete",
    productDesc: "Концепт полноценного порошкового приёма пищи: 17 порций в пакете, ~400 ккал и ~40 г растительного белка как цели формуляции, смешивание с водой примерно за минуту. Формула, вкус, производство и финальная экономика проходят валидацию до paid launch.",
    systemLabel: "Под момент, где питание обычно ломается",
    moments: ["Глубокая работа", "Тренировка", "1 минута", "Режим"],
    research: "Присоединиться к пилоту",
    open: "Открыть Performance Complete",
  },
};

const MOMENT_ICONS = [Briefcase, Dumbbell, Zap, CheckCircle2];

export function DropSection() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const x = COPY[lang];
  const modal = PERFORMANCE_DIALOG[lang];
  const href = directionRoute(lang, "drop");

  return (
    <section id="drop" className="relative scroll-mt-24 overflow-hidden bg-[#020403] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[640px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(110,231,183,.09),rgba(212,175,55,.035)_38%,transparent_70%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(800px,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/26 to-transparent shadow-[0_0_30px_rgba(110,231,183,.11)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/75">{x.eyebrow}</span>
              <span className="rounded-full border border-emerald-300/[.14] bg-emerald-300/[.035] px-3 py-1 text-[9px] uppercase tracking-[.13em] text-emerald-100/65">{x.badge}</span>
            </div>

            <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.9rem)] text-zinc-100">
              {x.titleA}
              <em className="bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
            </h2>
            <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.desc}</p>

            <div className="mt-7 rounded-[22px] border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200"><PackageCheck className="h-4 w-4" /></span>
                <div>
                  <p className="text-lg font-semibold text-zinc-100">{x.product}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.15em] text-zinc-600">Performance 01 · validation</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-500">{x.productDesc}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDialog
                intent={DROP_INTENT}
                title={modal.title}
                description={modal.description}
                successTitle={modal.successTitle}
                successMessage={modal.successMessage}
                buttonLabel="Home - Performance Complete pilot"
                showBuildType={false}
                compact
                helpLabel={modal.helpLabel}
                helpPlaceholder={modal.helpPlaceholder}
                context={{ concept: "performance_complete", stage: "formula_validation", source: "home_performance", locale: lang }}
              >
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("drop_interest_open", { source: "home_performance", product: "performance_complete" })}>
                  {x.research}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
              <a href={href} className="w-full sm:w-auto" onClick={() => track("performance_open", { source: "home", product: "performance_complete" })}>
                <Button className="h-auto min-h-12 w-full border border-emerald-300/18 bg-emerald-300/[.045] px-7 py-3 text-white hover:bg-emerald-300/[.085] sm:w-auto">{x.open}</Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
            <InteractiveSurface accent="green" lift={false} className="relative overflow-hidden rounded-[32px] border border-emerald-200/[.12] bg-[linear-gradient(145deg,rgba(110,231,183,.055),rgba(255,255,255,.016)_48%,rgba(0,0,0,.5))] p-6 shadow-[0_42px_120px_-60px_rgba(16,185,129,.18)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-sm font-semibold text-zinc-100">{x.product}</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{x.systemLabel}</p></div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200"><PackageCheck className="h-4 w-4" /></span>
              </div>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-4">
                <div aria-hidden="true" className="absolute left-8 right-8 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-emerald-300/0 via-emerald-300/26 to-emerald-300/0 sm:block" />
                {x.moments.map((moment, index) => {
                  const Icon = MOMENT_ICONS[index] ?? CheckCircle2;
                  return (
                    <motion.div key={moment} whileHover={reduced ? undefined : { y: -4 }} className="relative z-10 flex min-h-[160px] flex-col items-center justify-center rounded-[20px] border border-white/[.07] bg-black/48 p-4 text-center">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${index === 2 ? "border-amber-300/22 bg-amber-300/[.06] text-amber-200" : "border-emerald-300/17 bg-emerald-300/[.045] text-emerald-200/75"}`}><Icon className="h-4 w-4" /></span>
                      <p className="mt-4 text-xs font-medium leading-5 text-zinc-300">{moment}</p>
                      <span className="mt-3 text-[9px] tracking-[.15em] text-zinc-700">0{index + 1}</span>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/[.07] bg-black/28 px-5 py-4">
                <div className="flex items-center gap-3"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,.45)]" /><p className="text-xs leading-6 text-zinc-500">{x.productDesc}</p></div>
              </div>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
