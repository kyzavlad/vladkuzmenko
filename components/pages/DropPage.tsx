"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, Dumbbell, PackageCheck, ShieldCheck, Sparkles, UtensilsCrossed } from "lucide-react";
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
  clarityTitle: string;
  clarity: string[];
  researchTitle: string;
  researchText: string;
}> = {
  en: {
    eyebrow: "Performance",
    titleA: "Fuel the day. ",
    titleB: "Keep the rhythm.",
    lead: "Performance is a consumer-product direction for people who train, work hard and want fewer decisions between the plan and the day.",
    support: "The first concept is Performance Meal Sets. The product is in research, so there is no invented price, menu or delivery promise here.",
    badge: "Concept in research",
    product: "Performance Meal Sets",
    productLead: "A ready-to-eat meal system built around the reality of training days and a demanding schedule.",
    experience: "The experience we are building toward",
    moments: [
      { title: "Training day", text: "Food should support the schedule instead of forcing the schedule to revolve around food." },
      { title: "Ready when needed", text: "Less friction between a busy day and a structured meal." },
      { title: "Simple choice", text: "A small, understandable system instead of a catalogue that creates more decisions." },
      { title: "Repeatable routine", text: "Something practical enough to use again, not a one-off novelty." },
    ],
    clarityTitle: "What is not fixed yet",
    clarity: ["Exact menu and portions", "Production partner and geography", "Packaging and shelf-life model", "Price and delivery model"],
    researchTitle: "Help shape the first version",
    researchText: "If this would solve a real problem in your routine, tell us what matters. That input decides what deserves to exist first.",
  },
  ua: {
    eyebrow: "Performance",
    titleA: "Підживлюйте день. ",
    titleB: "Тримайте ритм.",
    lead: "Performance це напрям споживчих продуктів для тих, хто тренується, багато працює і хоче менше рішень між планом та реальним днем.",
    support: "Перший концепт це Performance Meal Sets. Продукт ще досліджується, тому тут немає вигаданої ціни, меню чи обіцянок доставки.",
    badge: "Концепт у дослідженні",
    product: "Performance Meal Sets",
    productLead: "Система готових прийомів їжі, побудована навколо реальності тренувального дня і насиченого графіка.",
    experience: "До якого досвіду ми йдемо",
    moments: [
      { title: "Тренувальний день", text: "Їжа має підтримувати графік, а не змушувати весь день крутитися навколо їжі." },
      { title: "Готово в потрібний момент", text: "Менше тертя між насиченим днем і структурованим прийомом їжі." },
      { title: "Простий вибір", text: "Невелика зрозуміла система замість каталогу, який створює ще більше рішень." },
      { title: "Повторюваний режим", text: "Практичний продукт, яким хочеться користуватися знову, а не одноразова новинка." },
    ],
    clarityTitle: "Що ще не зафіксовано",
    clarity: ["Точне меню і порції", "Виробничий партнер і географія", "Пакування і термін зберігання", "Ціна і модель доставки"],
    researchTitle: "Допоможіть сформувати першу версію",
    researchText: "Якщо це вирішує реальну проблему вашого режиму, розкажіть, що для вас важливо. Саме це визначить, що варто запускати першим.",
  },
  ru: {
    eyebrow: "Performance",
    titleA: "Поддерживайте день. ",
    titleB: "Держите ритм.",
    lead: "Performance это направление потребительских продуктов для тех, кто тренируется, много работает и хочет меньше решений между планом и реальным днем.",
    support: "Первый концепт это Performance Meal Sets. Продукт пока исследуется, поэтому здесь нет придуманной цены, меню или обещаний доставки.",
    badge: "Концепт в исследовании",
    product: "Performance Meal Sets",
    productLead: "Система готовых приемов пищи, построенная вокруг реальности тренировочного дня и плотного графика.",
    experience: "К какому опыту мы идем",
    moments: [
      { title: "Тренировочный день", text: "Еда должна поддерживать график, а не заставлять весь день крутиться вокруг еды." },
      { title: "Готово в нужный момент", text: "Меньше трения между плотным днем и структурированным приемом пищи." },
      { title: "Простой выбор", text: "Небольшая понятная система вместо каталога, который создает еще больше решений." },
      { title: "Повторяемый режим", text: "Практичный продукт, которым хочется пользоваться снова, а не одноразовая новинка." },
    ],
    clarityTitle: "Что еще не зафиксировано",
    clarity: ["Точное меню и порции", "Производственный партнер и география", "Упаковка и срок хранения", "Цена и модель доставки"],
    researchTitle: "Помогите сформировать первую версию",
    researchText: "Если это решает реальную проблему вашего режима, расскажите, что для вас важно. Именно это определит, что стоит запускать первым.",
  },
};

const ICONS = [Dumbbell, UtensilsCrossed, Sparkles, CheckCircle2];

export function DropPage() {
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
    context: { concept: "performance_meal_system", stage: "research", source, locale: lang, route },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <DirectionPageHero
          accent="green"
          eyebrow={x.eyebrow}
          titleA={x.titleA}
          titleB={x.titleB}
          lead={x.lead}
          support={x.support}
        >
          <RequestDialog {...dialog("hero")}>
            <Button className="premium-button h-auto min-h-12 px-8 py-3.5" onClick={() => track("drop_interest_open", { source: "drop_hero" })}>
              {legacy.cta}<ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </RequestDialog>
          <a href="#concept">
            <Button className="h-auto min-h-12 border border-emerald-300/18 bg-emerald-300/[.045] px-8 py-3.5 text-white hover:bg-emerald-300/[.085]">
              {x.product}<UtensilsCrossed className="ml-2 h-4 w-4" />
            </Button>
          </a>
        </DirectionPageHero>

        <section id="concept" className="relative scroll-mt-24 overflow-hidden border-b border-white/[.07] bg-[#020403] py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(52,211,153,.08),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="grid gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-center">
              <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/75">Performance 01</span>
                  <span className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1 text-[9px] uppercase tracking-[.14em] text-zinc-500">{x.badge}</span>
                </div>
                <h2 className="section-title mt-5 text-[clamp(2.8rem,5vw,4.6rem)] text-zinc-100">{x.product}</h2>
                <p className="section-lead mt-5 max-w-xl text-base leading-8 text-zinc-400">{x.productLead}</p>
              </motion.div>

              <InteractiveSurface accent="green" lift={false} className="rounded-[30px] border border-emerald-200/[.12] bg-[linear-gradient(145deg,rgba(110,231,183,.05),rgba(255,255,255,.014),rgba(0,0,0,.45))] p-6 sm:p-8">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-zinc-100">{x.product}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{x.experience}</p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/20 bg-emerald-300/[.055] text-emerald-200"><PackageCheck className="h-4 w-4" /></span>
                </div>

                <div className="relative mt-7 grid gap-3 sm:grid-cols-2">
                  <div aria-hidden="true" className="absolute left-1/2 top-1/2 hidden h-px w-[72%] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-amber-300/0 via-emerald-300/25 to-emerald-300/0 sm:block" />
                  {x.moments.map((moment, index) => {
                    const Icon = ICONS[index] ?? CheckCircle2;
                    return (
                      <motion.div key={moment.title} whileHover={reduced ? undefined : { y: -4 }} className="relative z-10 min-h-[150px] rounded-[22px] border border-white/[.07] bg-black/34 p-5">
                        <div className="flex items-center justify-between gap-3">
                          <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${index === 1 ? "border-amber-300/22 bg-amber-300/[.06] text-amber-200" : "border-emerald-300/17 bg-emerald-300/[.045] text-emerald-200/75"}`}><Icon className="h-4 w-4" /></span>
                          <span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span>
                        </div>
                        <h3 className="mt-4 text-sm font-semibold text-zinc-200">{moment.title}</h3>
                        <p className="mt-2 text-xs leading-5 text-zinc-500">{moment.text}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </InteractiveSurface>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] bg-[#020202] py-20 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-5 lg:grid-cols-[1.08fr_.92fr]">
              <div className="rounded-[30px] border border-white/[.08] bg-white/[.018] p-7 sm:p-9">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-300/18 bg-emerald-300/[.05] text-emerald-200"><ShieldCheck className="h-4 w-4" /></span>
                  <h2 className="text-2xl font-semibold text-zinc-100">{x.clarityTitle}</h2>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {x.clarity.map((item, index) => (
                    <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/[.07] bg-black/28 p-4">
                      <span className="text-[9px] tracking-[.15em] text-zinc-700">0{index + 1}</span>
                      <span className="text-sm text-zinc-400">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-xs leading-6 text-zinc-600">{legacy.disclaimer}</p>
              </div>

              <div className="rounded-[30px] border border-amber-300/[.12] bg-[radial-gradient(circle_at_30%_0%,rgba(212,175,55,.08),transparent_48%),rgba(255,255,255,.015)] p-7 sm:p-9">
                <h2 className="section-title text-3xl text-zinc-100 sm:text-4xl">{x.researchTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-zinc-500">{x.researchText}</p>
                <div className="mt-7">
                  <RequestDialog {...dialog("research") }>
                    <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("drop_interest_open", { source: "drop_research" })}>
                      {legacy.cta}<ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </RequestDialog>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
