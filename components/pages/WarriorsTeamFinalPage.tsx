"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Rocket, Dumbbell, Car, Brain, Calendar, ArrowRight, Check, X, Shield, MessageSquareText, Network, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { DirectionPageHero } from "@/components/ui/direction-page-hero";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

const pillarIcons: LucideIcon[] = [Rocket, Dumbbell, Car, Brain];
const journeyIcons: LucideIcon[] = [Target, MessageSquareText, Network, Shield];

const JOURNEY: Record<Lang, { label: string; steps: { title: string; text: string }[] }> = {
  en: {
    label: "How access works",
    steps: [
      { title: "Apply", text: "Tell us what you are building and what kind of circle would be useful now." },
      { title: "Fit conversation", text: "A short conversation to see whether the format makes sense for both sides." },
      { title: "Enter the circle", text: "Meet people already moving and understand how the private network operates." },
      { title: "Execute", text: "Use the network for direct feedback, useful introductions and a higher standard of action." },
    ],
  },
  ua: {
    label: "Як працює доступ",
    steps: [
      { title: "Заявка", text: "Розкажіть, що ви будуєте і яке оточення було б корисним зараз." },
      { title: "Розмова", text: "Коротко перевіряємо, чи підходить формат обом сторонам." },
      { title: "Вхід у коло", text: "Знайомство з людьми, які вже рухаються, і правилами приватної мережі." },
      { title: "Виконання", text: "Прямий фідбек, корисні знайомства і вища планка дій у реальних задачах." },
    ],
  },
  ru: {
    label: "Как работает доступ",
    steps: [
      { title: "Заявка", text: "Расскажите, что вы строите и какое окружение было бы полезно сейчас." },
      { title: "Разговор", text: "Коротко проверяем, подходит ли формат обеим сторонам." },
      { title: "Вход в круг", text: "Знакомство с людьми, которые уже движутся, и правилами закрытой сети." },
      { title: "Исполнение", text: "Прямой фидбек, полезные знакомства и более высокая планка действий в реальных задачах." },
    ],
  },
};

function ApplyButton({ variant = "premium" }: { variant?: "premium" | "outline" }) {
  const { lang, t } = useI18n();
  const w = t.warriors;
  return (
    <RequestDialog
      intent="warriors_team_application"
      title={w.dialogTitle}
      description={w.dialogDesc}
      submitLabel={w.dialogSubmit}
      successTitle={w.dialogSuccessT}
      successMessage={w.dialogSuccessM}
      buttonLabel="Warriors Team page - Apply"
      showBuildType={false}
      helpLabel={w.helpLabel}
      helpPlaceholder={w.helpPh}
      context={{ source: "warriors_team_page", locale: lang }}
    >
      <Button
        size="lg"
        variant={variant === "outline" ? "outline" : "default"}
        className={variant === "premium" ? "premium-button h-auto min-h-12 px-8 py-3.5 text-base" : "h-auto min-h-12 border-violet-300/20 bg-violet-300/[.04] px-8 py-3.5 text-base text-white hover:bg-violet-300/[.08]"}
      >
        {w.apply}<ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </RequestDialog>
  );
}

export function WarriorsTeamFinalPage() {
  const { lang, t } = useI18n();
  const reduced = useReducedMotion();
  const w = t.warriors;
  const j = JOURNEY[lang];

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <DirectionPageHero accent="violet" eyebrow={w.eyebrow} titleA={w.titleA} titleB={w.titleB} lead={w.desc} support={w.note}>
          <ApplyButton />
          <a href={SITE.calcom} target="_blank" rel="noopener noreferrer">
            <Button className="h-auto min-h-12 border border-violet-300/20 bg-violet-300/[.04] px-8 py-3.5 text-white hover:bg-violet-300/[.08]"><Calendar className="mr-2 h-5 w-5" />{w.talkToVlad}</Button>
          </a>
        </DirectionPageHero>

        <section className="relative overflow-hidden border-b border-white/[.07] bg-[#030203] py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(167,139,250,.08),transparent_58%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-violet-200/70">Warriors standard</span><h2 className="section-title mt-4 text-[clamp(2.6rem,4.5vw,4.2rem)] text-zinc-100">{w.insideTitle}</h2></div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {w.pillars.map((pillar, index) => {
                const Icon = pillarIcons[index] ?? Rocket;
                return <motion.div key={pillar} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .05 }}><InteractiveSurface accent="violet" className="h-full rounded-[24px] border border-white/[.08] bg-white/[.018] p-6"><div className="flex items-center justify-between gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/18 bg-violet-300/[.05] text-violet-200"><Icon className="h-5 w-5" /></span><span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span></div><h3 className="mt-5 text-base font-semibold text-zinc-100">{pillar}</h3></InteractiveSurface></motion.div>;
              })}
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">{w.inside.map((item, index) => <div key={item} className="flex items-start gap-3 rounded-[22px] border border-white/[.07] bg-black/28 p-5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-200/75" /><span className="text-sm leading-6 text-zinc-400">{item}</span><span className="ml-auto text-[9px] tracking-[.14em] text-zinc-800">{String(index + 1).padStart(2, "0")}</span></div>)}</div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.07] bg-[#020202] py-20 sm:py-24">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/65">{j.label}</span><h2 className="section-title mt-4 text-[clamp(2.6rem,4.5vw,4.2rem)] text-zinc-100">{w.howTitle}</h2><p className="section-lead mt-4 text-sm leading-7 text-zinc-500 sm:text-base">{w.how}</p></div>
            <div className="relative mx-auto mt-10 max-w-4xl">
              <div className="grid gap-4 sm:grid-cols-4">
                {j.steps.map((step, index) => {
                  const Icon = journeyIcons[index] ?? Target;
                  return (
                    <motion.div key={step.title} initial={reduced ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .07 }} className="relative grid grid-cols-[48px_1fr] gap-4 rounded-[22px] border border-white/[.07] bg-[#070707] p-4 sm:block sm:min-h-[220px] sm:p-5 sm:text-center">
                      <span className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl border sm:mx-auto ${index === 0 ? "border-amber-300/22 bg-amber-300/[.06] text-amber-200" : "border-violet-300/18 bg-violet-300/[.045] text-violet-200/80"}`}><Icon className="h-4 w-4" /></span>
                      <div><p className="text-[9px] font-semibold uppercase tracking-[.17em] text-zinc-700 sm:mt-5">0{index + 1}</p><h3 className="mt-1.5 text-sm font-semibold text-zinc-200">{step.title}</h3><p className="mt-2 text-xs leading-5 text-zinc-500">{step.text}</p></div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-b border-white/[.07] bg-[#030303] py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4"><div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-[28px] border border-violet-300/[.13] bg-violet-300/[.025] p-7 sm:p-8"><h3 className="flex items-center gap-2 text-xl font-semibold"><Check className="h-5 w-5 text-violet-200" />{w.forYouTitle}</h3><ul className="mt-6 space-y-3">{w.forYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-400"><Check className="mt-1 h-4 w-4 shrink-0 text-violet-200/70" />{item}</li>)}</ul></div>
            <div className="rounded-[28px] border border-white/[.08] bg-white/[.015] p-7 sm:p-8"><h3 className="flex items-center gap-2 text-xl font-semibold"><X className="h-5 w-5 text-zinc-600" />{w.notForYouTitle}</h3><ul className="mt-6 space-y-3">{w.notForYou.map((item) => <li key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-500"><X className="mt-1 h-4 w-4 shrink-0 text-zinc-700" />{item}</li>)}</ul></div>
          </div></div>
        </section>

        <section className="relative overflow-hidden bg-black py-20 sm:py-24"><div className="container mx-auto max-w-4xl px-4"><div className="rounded-[30px] border border-violet-300/[.14] bg-[radial-gradient(circle_at_50%_0%,rgba(167,139,250,.10),transparent_50%),rgba(255,255,255,.018)] p-8 text-center sm:p-10"><h2 className="section-title text-4xl text-zinc-100 sm:text-5xl">{w.howTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-500">{w.how}</p><div className="mt-7 flex justify-center"><ApplyButton /></div></div></div></section>
      </main>
      <FooterSection />
    </div>
  );
}
