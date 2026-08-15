"use client";

import { motion } from "framer-motion";
import { ArrowRight, Briefcase, ScanSearch, Shield, ShoppingBag, PlayCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

type PathKey = "business" | "software" | "warriors" | "performance" | "media";
type PathCopy = { kicker: string; title: string; text: string; chips: string[]; cta: string };
type SectionCopy = { eyebrow: string; title: string; desc: string; paths: Record<PathKey, PathCopy> };

const COPY: Record<Lang, SectionCopy> = {
  en: {
    eyebrow: "Choose what you need",
    title: "What do you want to strengthen right now?",
    desc: "Business growth, your website, your circle, your daily routine or the media. Pick one direction and go straight to the relevant next step.",
    paths: {
      business: { kicker: "Business", title: "More qualified enquiries, meetings and sales.", text: "If the bottleneck is attention, conversion or follow-up, start with the loss and build the system around it.", chips: ["Traffic", "Conversion", "Automation", "Sales"], cta: "Explore Growth Systems" },
      software: { kicker: "Website & visibility", title: "Understand why your website is not turning traffic into action.", text: "VisibilityOS shows where trust, conversion and visibility are being lost across search and AI answers.", chips: ["Conversion", "Trust", "SEO", "AI visibility"], cta: "Open VisibilityOS" },
      warriors: { kicker: "Circle", title: "Stronger people around you. A higher standard of decisions.", text: "Warriors Team is a selective private network for people already building and willing to contribute, execute and be challenged.", chips: ["Business", "Training", "Feedback", "Network"], cta: "Explore Warriors Team" },
      performance: { kicker: "Routine", title: "Make food and everyday discipline easier to keep consistent.", text: "The first consumer line focuses on practical meal sets for training days and demanding schedules.", chips: ["Meal sets", "Training days", "Essentials"], cta: "See the first line" },
      media: { kicker: "Media", title: "Follow the projects, training, cars and ideas behind the work.", text: "Long-form depth and short-form moments across YouTube, Instagram, TikTok, X and Telegram.", chips: ["YouTube", "Instagram", "TikTok", "Telegram"], cta: "Open media & profile" },
    },
  },
  ua: {
    eyebrow: "Оберіть, що вам потрібно",
    title: "Що ви хочете посилити зараз?",
    desc: "Ріст бізнесу, сайт, оточення, щоденний режим або медіа. Оберіть один напрям і одразу переходьте до релевантного наступного кроку.",
    paths: {
      business: { kicker: "Бізнес", title: "Більше якісних звернень, зустрічей і продажів.", text: "Якщо вузьке місце у трафіку, конверсії або follow-up, починаємо з втрати й будуємо систему навколо неї.", chips: ["Traffic", "Conversion", "Automation", "Sales"], cta: "Відкрити Growth Systems" },
      software: { kicker: "Сайт і видимість", title: "Зрозуміти, чому сайт не перетворює трафік на дію.", text: "VisibilityOS показує, де втрачаються довіра, конверсія та видимість у пошуку й AI-відповідях.", chips: ["Конверсія", "Довіра", "SEO", "AI-видимість"], cta: "Відкрити VisibilityOS" },
      warriors: { kicker: "Оточення", title: "Сильніші люди поруч. Вищий стандарт рішень.", text: "Warriors Team — вибіркова приватна мережа для тих, хто вже будує, готовий робити внесок, виконувати й приймати прямий фідбек.", chips: ["Бізнес", "Тренування", "Фідбек", "Нетворк"], cta: "Відкрити Warriors Team" },
      performance: { kicker: "Режим", title: "Спростити харчування і щоденну дисципліну.", text: "Перша споживча лінійка фокусується на практичних наборах їжі для тренувальних днів і щільного графіка.", chips: ["Набори їжі", "Тренувальні дні", "Essentials"], cta: "Подивитися першу лінійку" },
      media: { kicker: "Медіа", title: "Стежити за проєктами, тренуваннями, авто та ідеями за роботою.", text: "Глибші відео й короткі моменти в YouTube, Instagram, TikTok, X та Telegram.", chips: ["YouTube", "Instagram", "TikTok", "Telegram"], cta: "Відкрити медіа та профіль" },
    },
  },
  ru: {
    eyebrow: "Выберите, что вам нужно",
    title: "Что вы хотите усилить сейчас?",
    desc: "Рост бизнеса, сайт, окружение, ежедневный режим или медиа. Выберите одно направление и сразу переходите к релевантному следующему шагу.",
    paths: {
      business: { kicker: "Бизнес", title: "Больше качественных обращений, встреч и продаж.", text: "Если узкое место в трафике, конверсии или follow-up, начинаем с потери и строим систему вокруг неё.", chips: ["Traffic", "Conversion", "Automation", "Sales"], cta: "Открыть Growth Systems" },
      software: { kicker: "Сайт и видимость", title: "Понять, почему сайт не превращает трафик в действие.", text: "VisibilityOS показывает, где теряются доверие, конверсия и видимость в поиске и AI-ответах.", chips: ["Конверсия", "Доверие", "SEO", "AI-видимость"], cta: "Открыть VisibilityOS" },
      warriors: { kicker: "Окружение", title: "Сильнее люди вокруг. Выше стандарт решений.", text: "Warriors Team — отборная закрытая сеть для тех, кто уже строит, готов вносить вклад, исполнять и принимать прямой фидбек.", chips: ["Бизнес", "Тренировки", "Фидбек", "Нетворк"], cta: "Открыть Warriors Team" },
      performance: { kicker: "Режим", title: "Упростить питание и ежедневную дисциплину.", text: "Первая потребительская линейка фокусируется на практичных наборах еды для тренировочных дней и плотного графика.", chips: ["Наборы еды", "Тренировочные дни", "Essentials"], cta: "Посмотреть первую линейку" },
      media: { kicker: "Медиа", title: "Следить за проектами, тренировками, машинами и идеями за работой.", text: "Более глубокие видео и короткие моменты в YouTube, Instagram, TikTok, X и Telegram.", chips: ["YouTube", "Instagram", "TikTok", "Telegram"], cta: "Открыть медиа и профиль" },
    },
  },
};

const ORDER: PathKey[] = ["business", "software", "warriors", "performance", "media"];
const ICONS: Record<PathKey, LucideIcon> = { business: Briefcase, software: ScanSearch, warriors: Shield, performance: ShoppingBag, media: PlayCircle };

export function EcosystemNavigator() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;
  const hrefs: Record<PathKey, string> = { business: `${prefix}/growth-systems`, software: `${prefix}/visibilityos`, warriors: `${prefix}/warriors-team`, performance: `${prefix}/drop`, media: "#content" };

  return (
    <section id="ecosystem" className="relative scroll-mt-24 border-t border-zinc-900 bg-black py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,52,.08),transparent_34%)]" />
      <div className="container relative mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-12 max-w-4xl text-center">
          <span className="eyebrow">{x.eyebrow}</span>
          <h2 className="mt-4 text-4xl font-black tracking-[-.045em] sm:text-5xl md:text-6xl">{x.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg">{x.desc}</p>
        </motion.div>
        <div className="mx-auto max-w-6xl space-y-3 sm:space-y-4">
          {ORDER.map((key, index) => {
            const item = x.paths[key];
            const Icon = ICONS[key];
            return (
              <motion.a key={key} href={hrefs[key]} onClick={() => track("ecosystem_path_open", { direction: key })} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.04 }} className="group grid overflow-hidden rounded-[26px] border border-white/[.09] bg-[#080808] transition duration-300 hover:border-amber-300/30 hover:bg-[#0b0b0b] lg:grid-cols-[110px_1fr_1fr_48px]">
                <div className="flex items-center gap-4 border-b border-white/[.07] p-5 lg:flex-col lg:items-start lg:justify-between lg:border-b-0 lg:border-r lg:p-6"><span className="text-xs font-bold tracking-[.22em] text-zinc-600">{String(index + 1).padStart(2, "0")}</span><span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[.07] text-amber-200"><Icon className="h-5 w-5" /></span></div>
                <div className="p-6 sm:p-7 lg:border-r lg:border-white/[.07] lg:p-8"><p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/70">{item.kicker}</p><h3 className="mt-3 max-w-xl text-2xl font-black tracking-[-.035em] sm:text-3xl">{item.title}</h3></div>
                <div className="border-t border-white/[.07] p-6 sm:p-7 lg:border-t-0 lg:p-8"><p className="text-sm leading-6 text-zinc-400 sm:text-base sm:leading-7">{item.text}</p><div className="mt-4 flex flex-wrap gap-2">{item.chips.map((chip) => <span key={chip} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-400">{chip}</span>)}</div><div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-300">{item.cta}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></div></div>
                <div className="hidden items-center justify-center text-zinc-700 transition-colors group-hover:text-amber-300 lg:flex"><ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" /></div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
