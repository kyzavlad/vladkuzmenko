"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Dumbbell, Instagram, Laptop2, Send, Sparkles, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { TikTokIcon, XIcon } from "@/components/ui/social-icons";
import type { Lang } from "@/lib/i18n";

type ChannelKey = "youtube" | "instagram" | "tiktok" | "x" | "telegram";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  p1: string;
  p2: string;
  lanes: { title: string; text: string }[];
  network: string;
  channels: Record<ChannelKey, string>;
}> = {
  en: {
    eyebrow: "Vlad Kuzmenko",
    titleA: "Work, training, machines. ",
    titleB: "Life beyond the projects.",
    p1: "I build AI systems, websites and digital products for real businesses while developing my own products and operating systems around them.",
    p2: "This is the wider life around that work: training, machines, decisions, ideas, mistakes and the parts that do not belong in a polished portfolio.",
    lanes: [
      { title: "Build", text: "AI systems, products, websites and the business decisions behind them." },
      { title: "Train", text: "Combat sports, strength and the discipline that carries into the work." },
      { title: "Live", text: "Machines, movement, ideas and the moments outside the portfolio." },
    ],
    network: "Choose the channel you actually want to follow",
    channels: {
      youtube: "Long-form ideas, projects and the thinking behind the work.",
      instagram: "Daily life, training, machines and selected project moments.",
      tiktok: "Short-form moments, ideas and experiments.",
      x: "Short thoughts, observations and useful notes.",
      telegram: "Direct updates and things that do not fit the other platforms.",
    },
  },
  ua: {
    eyebrow: "Vlad Kuzmenko",
    titleA: "Робота, тренування, машини. ",
    titleB: "Життя поза проєктами.",
    p1: "Я будую AI-системи, сайти та цифрові продукти для реального бізнесу й паралельно розвиваю власні продукти та операційні системи навколо них.",
    p2: "А тут ширше життя навколо цієї роботи: тренування, машини, рішення, ідеї, помилки й те, що зазвичай лишається за межами портфоліо.",
    lanes: [
      { title: "Будую", text: "AI-системи, продукти, сайти й бізнес-рішення, які стоять за ними." },
      { title: "Тренуюсь", text: "Єдиноборства, сила й дисципліна, яку переношу в роботу." },
      { title: "Живу", text: "Машини, рух, ідеї та моменти поза портфоліо." },
    ],
    network: "Оберіть канал, який справді хочете дивитися",
    channels: {
      youtube: "Довгі відео про ідеї, проєкти й логіку рішень.",
      instagram: "Життя, тренування, машини й вибрані моменти з проєктів.",
      tiktok: "Короткі відео, ідеї та експерименти.",
      x: "Короткі думки, спостереження й корисні нотатки.",
      telegram: "Прямі оновлення й те, що не підходить іншим платформам.",
    },
  },
  ru: {
    eyebrow: "Vlad Kuzmenko",
    titleA: "Работа, тренировки, машины. ",
    titleB: "Жизнь за пределами проектов.",
    p1: "Я строю AI-системы, сайты и цифровые продукты для реального бизнеса и параллельно развиваю собственные продукты и операционные системы вокруг них.",
    p2: "А здесь больше жизни вокруг этой работы: тренировки, машины, решения, идеи, ошибки и то, что обычно остаётся за пределами портфолио.",
    lanes: [
      { title: "Строю", text: "AI-системы, продукты, сайты и бизнес-решения, которые стоят за ними." },
      { title: "Тренируюсь", text: "Единоборства, сила и дисциплина, которую переношу в работу." },
      { title: "Живу", text: "Машины, движение, идеи и моменты за пределами портфолио." },
    ],
    network: "Выберите канал, который действительно хотите смотреть",
    channels: {
      youtube: "Длинные видео про идеи, проекты и логику решений.",
      instagram: "Жизнь, тренировки, машины и выбранные моменты из проектов.",
      tiktok: "Короткие видео, идеи и эксперименты.",
      x: "Короткие мысли, наблюдения и полезные заметки.",
      telegram: "Прямые обновления и то, что не подходит другим платформам.",
    },
  },
};

const LANE_ICONS = [Laptop2, Dumbbell, Sparkles];

const CHANNELS: {
  key: ChannelKey;
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon | ((props: { className?: string }) => JSX.Element);
  accent: string;
}[] = [
  { key: "youtube", label: "YouTube", handle: "@VladKuzmenkoSpeech", href: SITE.socials.youtube, icon: Youtube, accent: "rgba(239,68,68,.22)" },
  { key: "instagram", label: "Instagram", handle: "@VladKuzmenkoSXY", href: SITE.socials.instagram, icon: Instagram, accent: "rgba(217,70,239,.18)" },
  { key: "tiktok", label: "TikTok", handle: "@VladKuzmenkoSXY", href: SITE.socials.tiktok, icon: TikTokIcon, accent: "rgba(34,211,238,.17)" },
  { key: "x", label: "X", handle: "@VladKuzmenkoSXY", href: SITE.socials.x, icon: XIcon, accent: "rgba(255,255,255,.13)" },
  { key: "telegram", label: "Telegram", handle: "@VladKuzmenkoSXY", href: SITE.socials.telegram, icon: Send, accent: "rgba(56,189,248,.18)" },
];

export function PersonalBrand() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const x = COPY[lang];

  return (
    <section id="about" className="relative scroll-mt-24 overflow-hidden bg-[#020202] py-24 md:py-32">
      <span id="content" className="absolute top-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[660px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.08),rgba(255,255,255,.014)_38%,transparent_70%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(800px,78vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent shadow-[0_0_28px_rgba(212,175,55,.11)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
            <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/70">{x.eyebrow}</span>
            <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">{x.titleA}<em className="gradient-gold-text font-normal italic">{x.titleB}</em></h2>
            <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base sm:leading-8">{x.p1}</p>
            <p className="section-lead mt-3 max-w-xl text-sm leading-7 text-zinc-500 sm:leading-8">{x.p2}</p>

            <div className="mt-7 divide-y divide-white/[.07] border-y border-white/[.07]">
              {x.lanes.map((lane, index) => {
                const Icon = LANE_ICONS[index] ?? Sparkles;
                return (
                  <div key={lane.title} className="grid grid-cols-[42px_1fr] gap-4 py-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-300/[.14] bg-amber-300/[.035] text-amber-200/75"><Icon className="h-4 w-4" /></span>
                    <div><p className="text-sm font-semibold text-zinc-200">{lane.title}</p><p className="mt-1 text-xs leading-5 text-zinc-500">{lane.text}</p></div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-[32px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.012))] p-5 shadow-[0_42px_110px_-64px_rgba(0,0,0,.95)] sm:p-6">
            <div className="flex items-center justify-between gap-4 border-b border-white/[.07] pb-5">
              <div><p className="text-sm font-semibold text-zinc-100">{x.network}</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">Vlad Kuzmenko network</p></div>
              <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_18px_rgba(212,175,55,.55)]" />
            </div>

            <div className="mt-4 space-y-2.5">
              {CHANNELS.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <motion.a key={channel.key} href={channel.href} target="_blank" rel="noopener noreferrer" onClick={() => track("social_outbound", { platform: channel.key })} whileHover={reduced ? undefined : { x: 4 }} className="group relative grid grid-cols-[42px_1fr_auto] items-center gap-3 overflow-hidden rounded-2xl border border-white/[.07] bg-black/30 p-3.5 transition-colors hover:border-white/[.14]">
                    <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 w-36 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at left, ${channel.accent}, transparent 72%)` }} />
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[.09] bg-white/[.025] text-zinc-300 group-hover:text-white"><Icon className="h-4 w-4" /></span>
                    <div className="relative min-w-0">
                      <div className="flex items-center gap-2"><p className="text-sm font-semibold text-zinc-200">{channel.label}</p><span className="text-[9px] tracking-[.15em] text-zinc-700">0{index + 1}</span></div>
                      <p className="mt-0.5 text-xs text-amber-300/70">{channel.handle}</p>
                      <p className="mt-1 line-clamp-1 text-[11px] text-zinc-600 sm:text-xs">{x.channels[channel.key]}</p>
                    </div>
                    <ArrowUpRight className="relative h-4 w-4 text-zinc-700 transition-colors group-hover:text-amber-300" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
