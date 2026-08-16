"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, CheckCircle2, Clock3, Dumbbell, PackageCheck, ShieldCheck, UtensilsCrossed } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { DirectionPageHero } from "@/components/ui/direction-page-hero";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { DROP_INTENT, getEcosystemCopy } from "@/lib/ecosystem";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  support: string;
  badge: string;
  product: string;
  productLead: string;
  experience: string;
  moments: { title: string; text: string }[];
  clarityEyebrow: string;
  clarityTitle: string;
  clarity: string[];
  validationTitle: string;
  validationText: string;
  validationCta: string;
  note: string;
}> = {
  en: {
    eyebrow: "Performance",
    titleA: "Less friction. ",
    titleB: "More rhythm.",
    lead: "Practical products for people whose days move between work, training, travel and everything in between.",
    support: "The first product being validated is Performance Meal Sets: a simple ready-meal system for an active schedule. Nothing is sold before the product, production and delivery model are actually ready.",
    badge: "First product · Meal Sets",
    product: "Performance Meal Sets",
    productLead: "A ready-meal system designed to remove one recurring decision from a busy day without forcing the day to revolve around food.",
    experience: "Built around the real day",
    moments: [
      { title: "Work", text: "Food has to fit a schedule that is already full, not create another planning task." },
      { title: "Training", text: "The system should stay practical on days where work and training run back to back." },
      { title: "Ready meal", text: "A clear option when there is no time or desire to cook and rebuild the plan again." },
      { title: "Routine", text: "Simple enough to repeat, adjust and keep using instead of becoming a one-week novelty." },
    ],
    clarityEyebrow: "Before launch",
    clarityTitle: "What still has to be proven",
    clarity: ["Menu and portion structure", "Production partner and geography", "Packaging, shelf life and food-safety requirements", "Price, delivery model and realistic unit economics"],
    validationTitle: "Want to know when there is something real to try?",
    validationText: "Leave the context of your routine and what would make a meal system useful. This is product validation, not a pre-order, and nothing is charged here.",
    validationCta: "Get launch updates",
    note: "No price, delivery area or launch date is presented as final until it is actually confirmed.",
  },
  ua: {
    eyebrow: "Performance",
    titleA: "Менше тертя. ",
    titleB: "Більше ритму.",
    lead: "Практичні продукти для людей, чий день проходить між роботою, тренуваннями, дорогою та іншими справами.",
    support: "Перший продукт у валідації — Performance Meal Sets: проста система готового харчування для активного графіка. Нічого не продається, доки продукт, виробництво й доставка реально не готові.",
    badge: "Перший продукт · Meal Sets",
    product: "Performance Meal Sets",
    productLead: "Система готових прийомів їжі, яка прибирає одне повторюване рішення з насиченого дня й не змушує весь день крутитися навколо харчування.",
    experience: "Під реальний ритм дня",
    moments: [
      { title: "Робота", text: "Їжа має вписуватися у вже щільний графік, а не створювати ще одну задачу з планування." },
      { title: "Тренування", text: "Система має залишатися практичною в дні, коли робота й тренування йдуть підряд." },
      { title: "Готова їжа", text: "Зрозумілий варіант, коли немає часу чи бажання знову готувати й перебудовувати раціон." },
      { title: "Режим", text: "Достатньо проста, щоб повторювати, коригувати й користуватися довше одного тижня." },
    ],
    clarityEyebrow: "До запуску",
    clarityTitle: "Що ще потрібно підтвердити",
    clarity: ["Меню і структура порцій", "Виробничий партнер і географія", "Пакування, термін зберігання й вимоги безпеки", "Ціна, доставка та реальна юніт-економіка"],
    validationTitle: "Хочете дізнатися, коли з’явиться щось реальне для тесту?",
    validationText: "Опишіть свій режим і що зробило б таку систему корисною. Це валідація продукту, не передзамовлення, і тут нічого не оплачується.",
    validationCta: "Дізнатися про запуск",
    note: "Ціна, географія доставки та дата запуску не подаються як фінальні, доки вони реально не підтверджені.",
  },
  ru: {
    eyebrow: "Performance",
    titleA: "Меньше трения. ",
    titleB: "Больше ритма.",
    lead: "Практичные продукты для людей, чей день проходит между работой, тренировками, дорогой и остальными делами.",
    support: "Первый продукт в валидации — Performance Meal Sets: простая система готового питания для активного графика. Ничего не продаётся, пока продукт, производство и доставка реально не готовы.",
    badge: "Первый продукт · Meal Sets",
    product: "Performance Meal Sets",
    productLead: "Система готовых приёмов пищи, которая убирает одно повторяющееся решение из плотного дня и не заставляет весь день крутиться вокруг еды.",
    experience: "Под реальный ритм дня",
    moments: [
      { title: "Работа", text: "Еда должна вписываться в уже плотный график, а не создавать ещё одну задачу по планированию." },
      { title: "Тренировка", text: "Система должна оставаться практичной в дни, когда работа и тренировка идут подряд." },
      { title: "Готовая еда", text: "Понятный вариант, когда нет времени или желания снова готовить и пересобирать рацион." },
      { title: "Режим", text: "Достаточно простая, чтобы повторять, корректировать и пользоваться дольше одной недели." },
    ],
    clarityEyebrow: "До запуска",
    clarityTitle: "Что ещё нужно подтвердить",
    clarity: ["Меню и структура порций", "Производственный партнёр и география", "Упаковка, срок хранения и требования безопасности", "Цена, доставка и реальная юнит-экономика"],
    validationTitle: "Хотите узнать, когда появится что-то реальное для теста?",
    validationText: "Опишите свой режим и что сделало бы такую систему полезной. Это валидация продукта, не предзаказ, и здесь ничего не оплачивается.",
    validationCta: "Узнать о запуске",
    note: "Цена, география доставки и дата запуска не подаются как финальные, пока они реально не подтверждены.",
  },
};

const ICONS = [Briefcase, Dumbbell, UtensilsCrossed, Clock3];

export function PerformancePage() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const legacy = getEcosystemCopy(lang).drop;
  const x = COPY[lang];
  const route = `${lang === "en" ? "" : `/${lang}`}/drop`;

  const dialog = (source: string) => ({
    intent: DROP_INTENT,
    title: legacy.dialogTitle,
    description: legacy.dialogDesc,
    successTitle: legacy.successTitle,
    successMessage: legacy.successMessage,
    buttonLabel: `Performance - ${source}`,
    showBuildType: false,
    compact: true,
    helpLabel: legacy.helpLabel,
    helpPlaceholder: legacy.helpPlaceholder,
    context: { concept: "performance_meal_system", stage: "validation", source, locale: lang, route },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020302] text-white">
      <Header />
      <main>
        <DirectionPageHero accent="green" eyebrow={x.eyebrow} titleA={x.titleA} titleB={x.titleB} lead={x.lead} support={x.support}>
          <RequestDialog {...dialog("hero")}><Button className="premium-button h-auto min-h-12 px-8 py-3.5" onClick={() => track("drop_interest_open", { source: "performance_hero" })}>{x.validationCta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog>
          <a href="#meal-sets"><Button className="h-auto min-h-12 border border-emerald-300/18 bg-emerald-300/[.045] px-8 py-3.5 text-white hover:bg-emerald-300/[.085]">{x.product}<UtensilsCrossed className="ml-2 h-4 w-4" /></Button></a>
        </DirectionPageHero>

        <section id="meal-sets" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(52,211,153,.09),rgba(212,175,55,.025)_42%,transparent_68%)]" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex flex-wrap items-center gap-3"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/75">Performance 01</span><span className="rounded-full border border-emerald-300/[.13] bg-emerald-300/[.035] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-emerald-100/65">{x.badge}</span></div>
                <h2 className="section-title mt-5 text-[clamp(2.8rem,5vw,4.7rem)] text-zinc-100">{x.product}</h2>
                <p className="section-lead mt-5 max-w-xl text-base leading-8 text-zinc-400">{x.productLead}</p>
                <div className="mt-7 rounded-[22px] border border-white/[.08] bg-white/[.018] p-5"><div className="flex items-center gap-3"><PackageCheck className="h-4 w-4 text-emerald-200" /><p className="text-xs leading-6 text-zinc-500">{x.note}</p></div></div>
              </motion.div>

              <InteractiveSurface accent="green" lift={false} className="rounded-[32px] border border-emerald-200/[.12] bg-[linear-gradient(145deg,rgba(110,231,183,.055),rgba(255,255,255,.014),rgba(0,0,0,.45))] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-zinc-100">{x.product}</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{x.experience}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200"><PackageCheck className="h-4 w-4" /></span></div>
                <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
                  {x.moments.map((moment, index) => {
                    const Icon = ICONS[index] ?? CheckCircle2;
                    return <motion.div key={moment.title} whileHover={reduced ? undefined : { y: -4 }} className="relative min-h-[165px] rounded-[22px] border border-white/[.07] bg-black/34 p-5"><div className="flex items-center justify-between gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${index === 2 ? "border-amber-300/22 bg-amber-300/[.06] text-amber-200" : "border-emerald-300/17 bg-emerald-300/[.045] text-emerald-200/75"}`}><Icon className="h-4 w-4" /></span><span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span></div><h3 className="mt-4 text-sm font-semibold text-zinc-200">{moment.title}</h3><p className="mt-2 text-xs leading-5 text-zinc-500">{moment.text}</p></motion.div>;
                  })}
                </div>
              </InteractiveSurface>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
              <div className="rounded-[30px] border border-white/[.08] bg-white/[.018] p-7 sm:p-9">
                <span className="text-[10px] font-semibold uppercase tracking-[.22em] text-emerald-200/65">{x.clarityEyebrow}</span><div className="mt-4 flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/18 bg-emerald-300/[.05] text-emerald-200"><ShieldCheck className="h-4 w-4" /></span><h2 className="text-2xl font-semibold text-zinc-100">{x.clarityTitle}</h2></div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">{x.clarity.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/[.07] bg-black/28 p-4"><span className="mt-0.5 text-[9px] tracking-[.15em] text-zinc-700">0{index + 1}</span><span className="text-sm leading-6 text-zinc-400">{item}</span></div>)}</div>
              </div>

              <InteractiveSurface accent="gold" lift={false} className="rounded-[30px] border border-amber-300/[.12] bg-[radial-gradient(circle_at_30%_0%,rgba(212,175,55,.08),transparent_48%),rgba(255,255,255,.015)] p-7 sm:p-9">
                <h2 className="section-title text-3xl text-zinc-100 sm:text-4xl">{x.validationTitle}</h2><p className="mt-4 text-sm leading-7 text-zinc-500">{x.validationText}</p><RequestDialog {...dialog("validation")}><Button className="premium-button mt-7 h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("drop_interest_open", { source: "performance_validation" })}>{x.validationCta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog>
              </InteractiveSurface>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
