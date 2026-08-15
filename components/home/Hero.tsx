"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";

type Stage = { name: string; text: string };

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  primary: string;
  secondary: string;
  panelTitle: string;
  panelNote: string;
  stages: [Stage, Stage, Stage];
}> = {
  en: {
    eyebrow: "ATTENTION · ACTION · GROWTH",
    titleA: "Turn attention into action. ",
    titleB: "Turn action into growth.",
    desc:
      "Growth is lost in one place: somewhere between the people who could buy from you and the moment they actually talk to you. We find that gap and build the system that closes it.",
    primary: "Find your bottleneck",
    secondary: "See real work",
    panelTitle: "How it connects",
    panelNote: "The path every customer takes",
    stages: [
      { name: "Attention", text: "The right people find you and stay long enough to care." },
      { name: "Action", text: "Interest becomes an enquiry instead of quietly disappearing." },
      { name: "Growth", text: "Enquiries reach a real conversation, and conversations reach a deal." },
    ],
  },
  ua: {
    eyebrow: "УВАГА · ДІЯ · ЗРОСТАННЯ",
    titleA: "Перетворюємо увагу на дію. ",
    titleB: "Дію — на зростання.",
    desc:
      "Зростання втрачається в одному місці: десь між людьми, які могли б у вас купити, і моментом, коли вони справді з вами говорять. Ми знаходимо цей розрив і збираємо систему, яка його закриває.",
    primary: "Знайти своє вузьке місце",
    secondary: "Подивитися реальні роботи",
    panelTitle: "Як це пов’язано",
    panelNote: "Шлях, який проходить кожен клієнт",
    stages: [
      { name: "Увага", text: "Потрібні люди вас знаходять і затримуються достатньо, щоб зацікавитись." },
      { name: "Дія", text: "Інтерес стає зверненням, а не зникає тихо." },
      { name: "Зростання", text: "Звернення доходять до розмови, а розмови — до угоди." },
    ],
  },
  ru: {
    eyebrow: "ВНИМАНИЕ · ДЕЙСТВИЕ · РОСТ",
    titleA: "Превращаем внимание в действие. ",
    titleB: "Действие — в рост.",
    desc:
      "Рост теряется в одном месте: где-то между людьми, которые могли бы у вас купить, и моментом, когда они действительно с вами говорят. Мы находим этот разрыв и собираем систему, которая его закрывает.",
    primary: "Найти своё узкое место",
    secondary: "Посмотреть реальные работы",
    panelTitle: "Как это связано",
    panelNote: "Путь, который проходит каждый клиент",
    stages: [
      { name: "Внимание", text: "Нужные люди вас находят и задерживаются достаточно, чтобы заинтересоваться." },
      { name: "Действие", text: "Интерес превращается в обращение, а не исчезает тихо." },
      { name: "Рост", text: "Обращения доходят до разговора, а разговоры — до сделки." },
    ],
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

/** Conceptual stage map — an interface diagram of the path, never live business data. */
function StagePath({ stages }: { stages: Stage[] }) {
  const reduced = useReducedMotion();

  return (
    <ol className="relative space-y-3">
      <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-white/[.08]">
        {!reduced && (
          <motion.div
            animate={{ y: ["-12%", "112%"] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="h-1/3 w-full bg-gradient-to-b from-transparent via-amber-300/70 to-transparent"
          />
        )}
      </div>

      {stages.map((stage, index) => (
        <motion.li
          key={stage.name}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 + index * 0.14, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ x: 4 }}
          className="relative flex gap-4 rounded-2xl border border-white/[.07] bg-black/25 p-4 transition-colors hover:border-amber-300/20"
        >
          <span className="relative z-10 mt-0.5 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border border-amber-300/25 bg-[#070707] text-[11px] font-bold text-amber-300/85">
            0{index + 1}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-bold tracking-[-.01em] text-white sm:text-base">{stage.name}</p>
            <p className="mt-1.5 text-[13px] leading-6 text-zinc-500">{stage.text}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export function Hero() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative flex min-h-[94vh] items-center overflow-hidden bg-black pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_74%)]" />
        <motion.div
          animate={reduced ? undefined : { x: [0, 36, 0], y: [0, -18, 0], opacity: [.6, .95, .6] }}
          transition={reduced ? undefined : { duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[12%] top-[18%] h-[430px] w-[530px] rounded-full bg-amber-300/[.11] blur-[155px] opacity-75"
        />
        <motion.div
          animate={reduced ? undefined : { x: [0, -28, 0], y: [0, 22, 0], opacity: [.22, .46, .22] }}
          transition={reduced ? undefined : { duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[7%] top-[28%] h-[370px] w-[440px] rounded-full bg-sky-400/[.075] blur-[165px] opacity-30"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,transparent_0%,rgba(0,0,0,.2)_42%,rgba(0,0,0,.94)_86%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-5 py-16 sm:px-6 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.12fr_.88fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .72, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/vlad-kuzmenko-logo-gold.png"
              alt="Vlad Kuzmenko"
              className="mx-auto h-auto w-[270px] select-none drop-shadow-[0_12px_50px_rgba(212,175,55,.18)] sm:w-[340px] lg:mx-0 lg:w-[390px]"
            />

            <p className="mt-7 text-[10px] font-bold uppercase tracking-[.28em] text-zinc-500 sm:text-[11px]">
              {x.eyebrow}
            </p>

            <h1 className="mt-4 max-w-5xl text-4xl font-black leading-[1.03] tracking-[-.05em] text-white sm:text-5xl lg:text-[56px] xl:text-[64px]">
              {x.titleA}
              <span className="gradient-gold-text">{x.titleB}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8 lg:max-w-xl">
              {x.desc}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                onClick={() => {
                  track("hero_primary", { target: "ecosystem" });
                  scrollTo("ecosystem");
                }}
                className="premium-button h-auto min-h-12 px-7 py-3 text-base"
              >
                {x.primary}
                <ArrowDown className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  track("hero_view_work", { target: "selected-work" });
                  scrollTo("selected-work");
                }}
                className="h-auto min-h-12 border-white/15 bg-white/[.025] px-7 py-3 text-base text-white hover:border-white/25 hover:bg-white/[.055]"
              >
                {x.secondary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: .94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: .9, delay: .12, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <div className="absolute -inset-10 rounded-full bg-amber-300/[.06] blur-[80px]" />
            <div className="relative overflow-hidden rounded-[32px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.012))] p-5 shadow-[0_40px_100px_-30px_rgba(0,0,0,.95)] backdrop-blur-xl sm:p-7">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(500px_circle_at_70%_12%,rgba(245,190,52,.11),transparent_48%)]" />
              <div className="relative">
                <div className="mb-7 border-b border-white/[.07] pb-5">
                  <p className="text-[10px] font-bold uppercase tracking-[.22em] text-amber-300/75">
                    {x.panelTitle}
                  </p>
                  <p className="mt-2 text-sm text-zinc-500">{x.panelNote}</p>
                </div>

                <StagePath stages={x.stages} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
