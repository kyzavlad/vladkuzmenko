"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle2, Dumbbell, PackageCheck, UtensilsCrossed } from "lucide-react";
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
    badge: "First product · Meal Sets",
    titleA: "Food that keeps up with ",
    titleB: "your pace.",
    desc: "For days where work, training and a packed schedule run back to back. Performance is about practical products that remove small daily decisions and make a demanding routine easier to hold.",
    product: "Performance Meal Sets",
    productDesc: "A ready-meal system for an active schedule: less time rebuilding the food plan, more consistency across work, training and the rest of the day. Menu, production and delivery format are being prepared before launch.",
    systemLabel: "Designed around a real day",
    moments: ["Work", "Training", "Ready meal", "Routine"],
    research: "Get launch updates",
    open: "Explore Performance",
  },
  ua: {
    eyebrow: "Performance",
    badge: "Перший продукт · Meal Sets",
    titleA: "Їжа, яка тримає ",
    titleB: "ваш темп.",
    desc: "Для днів, де робота, тренування та щільний графік ідуть підряд. Performance — це практичні продукти, які прибирають зайві щоденні рішення й допомагають легше тримати активний ритм.",
    product: "Performance Meal Sets",
    productDesc: "Система готових прийомів їжі для активного графіка: менше часу на постійне складання раціону, більше стабільності між роботою, тренуванням та рештою дня. Меню, виробництво й формат доставки готуються до запуску.",
    systemLabel: "Під реальний ритм дня",
    moments: ["Робота", "Тренування", "Готова їжа", "Режим"],
    research: "Дізнатися про запуск",
    open: "Відкрити Performance",
  },
  ru: {
    eyebrow: "Performance",
    badge: "Первый продукт · Meal Sets",
    titleA: "Еда, которая держит ",
    titleB: "ваш ритм.",
    desc: "Для дней, где работа, тренировки и плотный график идут подряд. Performance — это практичные продукты, которые убирают лишние ежедневные решения и помогают легче держать активный ритм.",
    product: "Performance Meal Sets",
    productDesc: "Система готовых приёмов пищи для активного графика: меньше времени на постоянную пересборку рациона, больше стабильности между работой, тренировкой и остальным днём. Меню, производство и формат доставки готовятся к запуску.",
    systemLabel: "Под реальный ритм дня",
    moments: ["Работа", "Тренировка", "Готовая еда", "Режим"],
    research: "Узнать о запуске",
    open: "Открыть Performance",
  },
};

const MOMENT_ICONS = [Briefcase, Dumbbell, UtensilsCrossed, CheckCircle2];

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
                  <p className="mt-1 text-[10px] uppercase tracking-[.15em] text-zinc-600">Performance 01</p>
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
                buttonLabel="Home - Performance launch interest"
                showBuildType={false}
                compact
                helpLabel={modal.helpLabel}
                helpPlaceholder={modal.helpPlaceholder}
                context={{ concept: "performance_meal_system", stage: "validation", source: "home_performance", locale: lang }}
              >
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("drop_interest_open", { source: "home_performance" })}>
                  {x.research}<ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
              <a href={href} className="w-full sm:w-auto" onClick={() => track("performance_open", { source: "home" })}>
                <Button className="h-auto min-h-12 w-full border border-emerald-300/18 bg-emerald-300/[.045] px-7 py-3 text-white hover:bg-emerald-300/[.085] sm:w-auto">{x.open}</Button>
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
            <InteractiveSurface accent="green" lift={false} className="relative overflow-hidden rounded-[32px] border border-emerald-200/[.12] bg-[linear-gradient(145deg,rgba(110,231,183,.055),rgba(255,255,255,.016)_48%,rgba(0,0,0,.5))] p-6 shadow-[0_42px_120px_-60px_rgba(16,185,129,.18)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-sm font-semibold text-zinc-100">{x.product}</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{x.systemLabel}</p></div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200"><UtensilsCrossed className="h-4 w-4" /></span>
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
