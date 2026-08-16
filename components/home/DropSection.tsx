"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Dumbbell, PackageCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { DROP_INTENT, directionRoute, getEcosystemCopy } from "@/lib/ecosystem";
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
    badge: "Concept in research",
    titleA: "Food that keeps up with ",
    titleB: "the training day.",
    desc: "The first Performance direction is simple: make structured food easier for people who train, work hard and do not want to rebuild the plan every day.",
    product: "Performance Meal Sets",
    productDesc: "A ready-to-eat meal system designed around a demanding routine. The exact menu, production model and delivery area are still being researched.",
    systemLabel: "The experience we are designing",
    moments: ["Training day", "Ready meal", "Recovery", "Repeatable routine"],
    research: "Join the research",
    open: "Explore Performance",
  },
  ua: {
    eyebrow: "Performance",
    badge: "Концепт у дослідженні",
    titleA: "Їжа, яка тримає темп ",
    titleB: "тренувального дня.",
    desc: "Перший напрям Performance простий: зробити структуроване харчування легшим для тих, хто тренується, багато працює і не хоче щодня збирати план заново.",
    product: "Performance Meal Sets",
    productDesc: "Система готових прийомів їжі під насичений ритм. Точне меню, виробнича модель і зона доставки ще досліджуються.",
    systemLabel: "Який досвід ми проєктуємо",
    moments: ["Тренувальний день", "Готова їжа", "Відновлення", "Стабільний режим"],
    research: "Долучитися до дослідження",
    open: "Відкрити Performance",
  },
  ru: {
    eyebrow: "Performance",
    badge: "Концепт в исследовании",
    titleA: "Еда, которая держит темп ",
    titleB: "тренировочного дня.",
    desc: "Первое направление Performance простое: сделать структурированное питание удобнее для тех, кто тренируется, много работает и не хочет каждый день собирать план заново.",
    product: "Performance Meal Sets",
    productDesc: "Система готовых приемов пищи под плотный ритм. Точное меню, производственная модель и зона доставки пока исследуются.",
    systemLabel: "Какой опыт мы проектируем",
    moments: ["Тренировочный день", "Готовая еда", "Восстановление", "Стабильный режим"],
    research: "Присоединиться к исследованию",
    open: "Открыть Performance",
  },
};

const MOMENT_ICONS = [Dumbbell, UtensilsCrossed, Sparkles, CheckCircle2];

export function DropSection() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const legacy = getEcosystemCopy(lang).drop;
  const x = COPY[lang];
  const href = directionRoute(lang, "drop");

  return (
    <section
      id="drop"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#020403] py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[620px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(110,231,183,.08),rgba(212,175,55,.035)_38%,transparent_68%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(760px,76vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/24 to-transparent shadow-[0_0_28px_rgba(110,231,183,.10)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/75">{x.eyebrow}</span>
              <span className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-zinc-500">{x.badge}</span>
            </div>

            <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">
              {x.titleA}
              <em className="bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
            </h2>
            <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.desc}</p>

            <div className="mt-7 rounded-[22px] border border-white/[.08] bg-white/[.018] p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200">
                  <PackageCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-lg font-semibold text-zinc-100">{x.product}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.15em] text-zinc-600">Performance concept 01</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-500">{x.productDesc}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDialog
                intent={DROP_INTENT}
                title={legacy.dialogTitle}
                description={legacy.dialogDesc}
                successTitle={legacy.successTitle}
                successMessage={legacy.successMessage}
                buttonLabel="Home - Performance research"
                showBuildType={false}
                compact
                helpLabel={legacy.helpLabel}
                helpPlaceholder={legacy.helpPlaceholder}
                context={{ concept: "performance_meal_system", stage: "research", source: "home_performance", locale: lang }}
              >
                <Button
                  className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto"
                  onClick={() => track("drop_interest_open", { source: "home_performance" })}
                >
                  {x.research}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </RequestDialog>
              <a href={href} className="w-full sm:w-auto" onClick={() => track("performance_open", { source: "home" })}>
                <Button className="h-auto min-h-12 w-full border border-emerald-300/18 bg-emerald-300/[.045] px-7 py-3 text-white hover:bg-emerald-300/[.085] sm:w-auto">
                  {x.open}
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: .985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}
          >
            <InteractiveSurface
              accent="green"
              lift={false}
              className="relative overflow-hidden rounded-[30px] border border-emerald-200/[.12] bg-[linear-gradient(145deg,rgba(110,231,183,.05),rgba(255,255,255,.016)_48%,rgba(0,0,0,.48))] p-6 shadow-[0_42px_120px_-60px_rgba(16,185,129,.17)] sm:p-8"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{x.product}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{x.systemLabel}</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200">
                  <UtensilsCrossed className="h-4 w-4" />
                </span>
              </div>

              <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
                <div aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-px w-[72%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-300/0 via-emerald-300/25 to-emerald-300/0 sm:block" />
                {x.moments.map((moment, index) => {
                  const Icon = MOMENT_ICONS[index] ?? CheckCircle2;
                  return (
                    <motion.div
                      key={moment}
                      whileHover={reduced ? undefined : { y: -4, scale: 1.01 }}
                      className="relative z-10 min-h-[126px] rounded-[20px] border border-white/[.07] bg-black/34 p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${index === 1 ? "border-amber-300/22 bg-amber-300/[.06] text-amber-200" : "border-emerald-300/17 bg-emerald-300/[.045] text-emerald-200/75"}`}>
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span>
                      </div>
                      <p className="mt-4 text-sm font-medium text-zinc-300">{moment}</p>
                      {!reduced && index === 1 ? (
                        <motion.span
                          aria-hidden="true"
                          className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-amber-300/60 to-transparent"
                          animate={{ opacity: [.2, .85, .2] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      ) : null}
                    </motion.div>
                  );
                })}
              </div>

              <p className="mt-6 border-t border-white/[.07] pt-5 text-xs leading-6 text-zinc-600">{legacy.disclaimer}</p>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
