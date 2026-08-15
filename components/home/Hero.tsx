"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openAssistant } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  primary: string;
  work: string;
  hint: string;
}> = {
  en: {
    eyebrow: "GROWTH SYSTEMS · DIGITAL PRODUCTS · PERSONAL BRAND",
    titleA: "More qualified attention. More enquiries. ",
    titleB: "Less manual work.",
    desc: "If demand is too low, leads are leaking or too much depends on someone remembering the next step, we start with that bottleneck and build the system around it.",
    primary: "Find the bottleneck",
    work: "See real work",
    hint: "Start with the business problem",
  },
  ua: {
    eyebrow: "GROWTH SYSTEMS · DIGITAL PRODUCTS · PERSONAL BRAND",
    titleA: "Більше якісної уваги. Більше звернень. ",
    titleB: "Менше ручної роботи.",
    desc: "Якщо попиту замало, заявки губляться або занадто багато тримається на тому, що хтось має вчасно згадати про наступний крок, починаємо саме з цього вузького місця й будуємо систему навколо нього.",
    primary: "Знайти вузьке місце",
    work: "Подивитися реальні роботи",
    hint: "Почніть з бізнес-проблеми",
  },
  ru: {
    eyebrow: "GROWTH SYSTEMS · DIGITAL PRODUCTS · PERSONAL BRAND",
    titleA: "Больше качественного внимания. Больше заявок. ",
    titleB: "Меньше ручной работы.",
    desc: "Если спроса мало, заявки теряются или слишком многое держится на том, что кто-то должен вовремя вспомнить о следующем шаге, начинаем именно с этого узкого места и строим систему вокруг него.",
    primary: "Найти узкое место",
    work: "Посмотреть реальные работы",
    hint: "Начните с бизнес-проблемы",
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const { lang, t } = useI18n();
  const x = COPY[lang];

  return (
    <section id="top" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black py-0">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-18%] top-[12%] h-[620px] w-[620px] rounded-full bg-amber-300/[.09] blur-[150px]" />
        <div className="absolute right-[-16%] top-[20%] h-[560px] w-[560px] rounded-full bg-sky-400/[.07] blur-[155px]" />
        <div className="absolute left-1/2 top-[56%] h-px w-[82%] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-200/25 to-transparent" />
        <div className="absolute inset-0 opacity-[.035]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "linear-gradient(to bottom, black, transparent 82%)" }} />
        <div className="absolute inset-0 bg-[radial-gradient(100%_78%_at_50%_26%,transparent_30%,rgba(0,0,0,.88))]" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center px-5 pb-14 pt-28 text-center sm:px-6">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex w-full max-w-6xl flex-col items-center">
          <h1 className="sr-only">Vlad Kuzmenko — {x.titleA}{x.titleB}</h1>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/vlad-kuzmenko-logo-gold.png" alt="Vlad Kuzmenko" className="h-auto w-[245px] select-none drop-shadow-[0_12px_42px_rgba(212,175,55,.18)] sm:w-[310px] md:w-[350px]" />

          <p className="mt-7 text-[10px] font-bold uppercase tracking-[.22em] text-zinc-500 sm:text-[11px]">{x.eyebrow}</p>
          <div className="mt-6 h-px w-28 bg-gradient-to-r from-transparent via-amber-300/60 to-transparent" />

          <p className="mt-7 max-w-5xl text-4xl font-black leading-[1.02] tracking-[-.045em] text-white sm:text-6xl lg:text-7xl">
            {x.titleA}<span className="gradient-gold-text">{x.titleB}</span>
          </p>
          <p className="mt-7 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.desc}</p>

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button size="lg" onClick={() => { track("hero_find_bottleneck"); scrollTo("growth-systems"); }} className="premium-button h-auto min-h-12 w-full px-7 py-3 text-base sm:w-auto">
              {x.primary}<ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => { track("hero_view_work"); scrollTo("selected-work"); }} className="h-auto min-h-12 w-full border-white/15 bg-white/[.025] px-7 py-3 text-base text-white hover:border-white/25 hover:bg-white/[.055] sm:w-auto">
              {x.work}
            </Button>
            <button type="button" onClick={() => { track("hero_open_assistant"); openAssistant(); }} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-sky-300/15 bg-sky-300/[.04] px-5 text-sm font-semibold text-sky-100/80 transition hover:border-sky-300/30 hover:bg-sky-300/[.08] sm:w-auto">
              <Bot className="h-4 w-4" />{t.cta.askAI}
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[11px] text-zinc-500">
            <span className="rounded-full border border-amber-300/[.12] bg-amber-300/[.025] px-3 py-1.5">Traffic</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span className="rounded-full border border-sky-300/[.12] bg-sky-300/[.025] px-3 py-1.5">Conversion</span>
            <span className="h-1 w-1 rounded-full bg-zinc-700" />
            <span className="rounded-full border border-violet-300/[.12] bg-violet-300/[.025] px-3 py-1.5">Automation</span>
          </div>

          <div className="mt-12 flex items-center gap-3">
            <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-zinc-600">{x.hint}</span>
            <button type="button" onClick={() => scrollTo("growth-systems")} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/[.08] text-zinc-500 transition hover:border-amber-300/25 hover:text-amber-300" aria-label={x.primary}>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
