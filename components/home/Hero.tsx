"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignalFlow } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  primary: string;
  secondary: string;
  signal: string[];
  signalLabel: string;
  live: string;
}> = {
  en: {
    eyebrow: "GROWTH SYSTEMS · SOFTWARE · PERFORMANCE · MEDIA",
    titleA: "Turn attention into action. ",
    titleB: "Turn action into growth.",
    desc:
      "Choose what matters now: business growth, website visibility, a stronger circle, performance products or the media behind the work. Each direction has one clear next step.",
    primary: "Choose a direction",
    secondary: "See real work",
    signal: ["Attention", "Action", "Revenue"],
    signalLabel: "One connected path",
    live: "Live system",
  },
  ua: {
    eyebrow: "GROWTH-СИСТЕМИ · СОФТ · PERFORMANCE · МЕДІА",
    titleA: "Перетворюємо увагу на дію. ",
    titleB: "Дію - на зростання.",
    desc:
      "Оберіть, що важливо зараз: ріст бізнесу, видимість сайту, сильніше оточення, performance-продукти або медіа навколо роботи. У кожного напряму є один зрозумілий наступний крок.",
    primary: "Обрати напрям",
    secondary: "Подивитися реальні роботи",
    signal: ["Увага", "Дія", "Дохід"],
    signalLabel: "Один пов’язаний шлях",
    live: "Жива система",
  },
  ru: {
    eyebrow: "GROWTH-СИСТЕМЫ · СОФТ · PERFORMANCE · МЕДИА",
    titleA: "Превращаем внимание в действие. ",
    titleB: "Действие - в рост.",
    desc:
      "Выберите, что важно сейчас: рост бизнеса, видимость сайта, сильное окружение, performance-продукты или медиа вокруг работы. У каждого направления есть один понятный следующий шаг.",
    primary: "Выбрать направление",
    secondary: "Посмотреть реальные работы",
    signal: ["Внимание", "Действие", "Доход"],
    signalLabel: "Один связанный путь",
    live: "Живая система",
  },
};

const scrollTo = (id: string) => {
  if (typeof document === "undefined") return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export function Hero() {
  const { lang } = useI18n();
  const x = COPY[lang];

  return (
    <section id="top" className="relative flex min-h-[94vh] items-center overflow-hidden bg-black pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:68px_68px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_74%)]" />
        <motion.div
          animate={{ x: [0, 36, 0], y: [0, -18, 0], opacity: [.6, .95, .6] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[12%] top-[18%] h-[430px] w-[530px] rounded-full bg-amber-300/[.11] blur-[155px]"
        />
        <motion.div
          animate={{ x: [0, -28, 0], y: [0, 22, 0], opacity: [.22, .46, .22] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[7%] top-[28%] h-[370px] w-[440px] rounded-full bg-sky-400/[.075] blur-[165px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_44%,transparent_0%,rgba(0,0,0,.2)_42%,rgba(0,0,0,.94)_86%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-5 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
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

            <p className="mt-8 text-[10px] font-bold uppercase tracking-[.28em] text-zinc-500 sm:text-[11px]">
              {x.eyebrow}
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-black leading-[1.01] tracking-[-.05em] text-white sm:text-6xl lg:text-[72px]">
              {x.titleA}
              <span className="gradient-gold-text">{x.titleB}</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8 lg:max-w-xl">
              {x.desc}
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
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
                <div className="mb-8 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[.22em] text-amber-300/75">Vlad Kuzmenko</p>
                    <p className="mt-1 text-sm text-zinc-500">{x.signalLabel}</p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[.06] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.16em] text-emerald-300/80 sm:text-[10px]">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.7)]" />
                    {x.live}
                  </span>
                </div>

                <SignalFlow nodes={x.signal} accent="gold" />

                <div className="mt-8 grid grid-cols-3 gap-3">
                  {["Traffic", "Conversion", "Growth"].map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ y: -4, scale: 1.015 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="rounded-2xl border border-white/[.08] bg-black/30 p-4"
                    >
                      <p className="text-[10px] font-bold tracking-[.18em] text-zinc-600">0{index + 1}</p>
                      <p className="mt-5 text-[11px] font-semibold text-zinc-200 sm:text-sm">{item}</p>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${66 + index * 12}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: .8, delay: .25 + index * .1 }}
                        className="mt-3 h-px bg-gradient-to-r from-amber-300/80 to-amber-300/10"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
