"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, MessageSquareText, Network, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { getEcosystemCopy, directionRoute } from "@/lib/ecosystem";
import type { Lang } from "@/lib/i18n";

const JOURNEY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  steps: { title: string; text: string }[];
  pathLabel: string;
}> = {
  en: {
    eyebrow: "Private network",
    titleA: "The people around you ",
    titleB: "change the standard.",
    lead: "Warriors Team is built for people already moving. The value is the circle: direct feedback, useful introductions and people who expect execution.",
    pathLabel: "How access works",
    steps: [
      { title: "Apply", text: "Tell us what you are building and why this circle matters now." },
      { title: "Fit", text: "A short conversation to see whether the format works for both sides." },
      { title: "Circle", text: "Enter the private network and meet people operating at a similar pace." },
      { title: "Execute", text: "Use the network for feedback, introductions and a higher bar of action." },
    ],
  },
  ua: {
    eyebrow: "Приватна мережа",
    titleA: "Люди поруч ",
    titleB: "змінюють планку.",
    lead: "Warriors Team для тих, хто вже рухається. Цінність у колі: прямий фідбек, корисні знайомства і люди, які очікують дій.",
    pathLabel: "Як працює доступ",
    steps: [
      { title: "Заявка", text: "Розкажіть, що ви будуєте і навіщо вам це коло саме зараз." },
      { title: "Fit", text: "Коротка розмова, щоб зрозуміти, чи підходить формат обом сторонам." },
      { title: "Коло", text: "Вхід у приватну мережу і знайомство з людьми у схожому темпі." },
      { title: "Дія", text: "Фідбек, знайомства і вища планка виконання у реальних задачах." },
    ],
  },
  ru: {
    eyebrow: "Закрытая сеть",
    titleA: "Люди рядом ",
    titleB: "меняют планку.",
    lead: "Warriors Team для тех, кто уже движется. Ценность в круге: прямой фидбек, полезные знакомства и люди, которые ожидают действий.",
    pathLabel: "Как работает доступ",
    steps: [
      { title: "Заявка", text: "Расскажите, что вы строите и зачем вам такое окружение сейчас." },
      { title: "Fit", text: "Короткий разговор, чтобы понять, подходит ли формат обеим сторонам." },
      { title: "Круг", text: "Вход в закрытую сеть и знакомство с людьми в похожем темпе." },
      { title: "Действие", text: "Фидбек, знакомства и более высокая планка исполнения в реальных задачах." },
    ],
  },
};

const STEP_ICONS = [Target, MessageSquareText, Network, Shield];

export function WarriorsSection() {
  const { lang, t } = useI18n();
  const reduced = useReducedMotion();
  const x = getEcosystemCopy(lang).warriors;
  const w = t.warriors;
  const j = JOURNEY[lang];
  const href = directionRoute(lang, "warriors");

  return (
    <section id="warriors" className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#030203] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[600px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(196,181,253,.09),rgba(212,175,55,.025)_36%,transparent_67%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(760px,76vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-300/24 to-transparent shadow-[0_0_28px_rgba(196,181,253,.11)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
            <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-violet-200/75">{j.eyebrow}</span>
            <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">
              {j.titleA}<em className="bg-gradient-to-br from-violet-100 via-violet-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{j.titleB}</em>
            </h2>
            <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{j.lead}</p>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {x.principles.slice(0, 4).map((principle) => (
                <div key={principle} className="flex gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-xs leading-6 text-zinc-400">{principle}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <RequestDialog intent="warriors_application" title={w.dialogTitle} description={w.dialogDesc} submitLabel={w.dialogSubmit} successTitle={w.dialogSuccessT} successMessage={w.dialogSuccessM} buttonLabel="Home - Warriors application" showBuildType={false} compact helpLabel={w.helpLabel} helpPlaceholder={w.helpPh} context={{ source: "home_warriors", locale: lang }}>
                <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("warriors_application_open", { source: "home" })}>{x.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button>
              </RequestDialog>
              <a href={href} className="w-full sm:w-auto" onClick={() => track("warriors_open", { source: "home" })}><Button className="h-auto min-h-12 w-full border border-violet-300/20 bg-violet-300/[.05] px-7 py-3 text-white hover:bg-violet-300/[.09] sm:w-auto">{x.open}</Button></a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
            <InteractiveSurface accent="violet" lift={false} className="relative overflow-hidden rounded-[30px] border border-violet-200/[.12] bg-[linear-gradient(145deg,rgba(196,181,253,.055),rgba(255,255,255,.016)_48%,rgba(0,0,0,.48))] p-6 shadow-[0_42px_120px_-60px_rgba(139,92,246,.18)] sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div><p className="text-sm font-semibold text-zinc-100">Warriors Team</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{j.pathLabel}</p></div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><Network className="h-4 w-4" /></span>
              </div>

              <div className="relative mt-7">
                <div className="space-y-3">
                  {j.steps.map((step, index) => {
                    const Icon = STEP_ICONS[index] ?? Target;
                    return (
                      <motion.div key={step.title} initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="relative grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-white/[.07] bg-black/26 p-4">
                        <span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border ${index === 0 ? "border-amber-300/25 bg-amber-300/[.07] text-amber-200" : "border-violet-300/18 bg-violet-300/[.045] text-violet-200/80"}`}><Icon className="h-4 w-4" /></span>
                        <div><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-zinc-200">{step.title}</p><span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span></div><p className="mt-1.5 text-xs leading-5 text-zinc-500">{step.text}</p></div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <p className="mt-6 border-t border-white/[.07] pt-5 text-xs leading-6 text-zinc-500">{x.access}</p>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
