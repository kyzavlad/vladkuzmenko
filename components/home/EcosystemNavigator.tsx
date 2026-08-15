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
    eyebrow: "Choose your path",
    title: "Five ways into the ecosystem",
    desc: "Come for growth, software, a stronger circle, performance products or the media. Each direction has one clear job and its own next step.",
    paths: {
      business: { kicker: "For businesses", title: "Turn attention into enquiries, meetings and sales.", text: "Growth systems built around the actual bottleneck: qualified attention, conversion, follow-up and the operating layer behind it.", chips: ["Traffic", "Conversion", "Automation", "Sales operations"], cta: "Explore Growth Systems" },
      software: { kicker: "For website owners", title: "See what your website is losing before you redesign it.", text: "VisibilityOS brings conversion, trust, SEO and AI-search signals into one evidence-led website review.", chips: ["AI search", "AEO", "Conversion", "Evidence"], cta: "Open VisibilityOS" },
      warriors: { kicker: "For builders", title: "Build inside a circle that raises the standard.", text: "Warriors Team is a private network for people already building business, body, skill and reputation who want sharper peers and direct feedback.", chips: ["Business", "Training", "Accountability", "Network"], cta: "Explore Warriors Team" },
      performance: { kicker: "For active lives", title: "Food and essentials that make the routine easier to keep.", text: "The consumer line starts with practical performance food for training days and demanding schedules, then expands only into products that earn their place.", chips: ["Performance food", "Training days", "Essentials"], cta: "See the first line" },
      media: { kicker: "For the journey", title: "Business, training, cars, ideas and the work behind the scenes.", text: "Long-form thinking, short-form moments and real build proof across YouTube, Instagram, TikTok, X and Telegram.", chips: ["YouTube", "Instagram", "TikTok", "Telegram"], cta: "Open media & profile" },
    },
  },
  ua: {
    eyebrow: "Оберіть напрям",
    title: "П’ять входів в одну екосистему",
    desc: "Бізнес, software, сильне оточення, performance-продукти або контент. Кожен напрям має одну зрозумілу задачу і свій наступний крок.",
    paths: {
      business: { kicker: "Для бізнесу", title: "Перетворити увагу на звернення, зустрічі та продажі.", text: "Growth systems навколо реального вузького місця: якісна увага, конверсія, follow-up і операційний шар за ними.", chips: ["Traffic", "Conversion", "Automation", "Sales operations"], cta: "Відкрити Growth Systems" },
      software: { kicker: "Для власників сайтів", title: "Побачити, що втрачає сайт, до того як переробляти його навмання.", text: "VisibilityOS збирає conversion, trust, SEO та AI-search сигнали в один evidence-led розбір сайту.", chips: ["AI search", "AEO", "Conversion", "Evidence"], cta: "Відкрити VisibilityOS" },
      warriors: { kicker: "Для builders", title: "Будувати в колі, яке підвищує стандарт.", text: "Warriors Team — приватна мережа для тих, хто вже будує бізнес, тіло, навичку й репутацію та хоче сильніше оточення і прямий фідбек.", chips: ["Бізнес", "Тренування", "Accountability", "Network"], cta: "Відкрити Warriors Team" },
      performance: { kicker: "Для активного життя", title: "Їжа та базові речі, з якими режим легше тримати.", text: "Споживча лінійка починається з практичного performance-харчування для тренувальних днів і щільного графіка.", chips: ["Performance food", "Training days", "Essentials"], cta: "Подивитися першу лінійку" },
      media: { kicker: "Для тих, хто стежить за шляхом", title: "Бізнес, тренування, авто, думки та робота за кадром.", text: "Довгі відео, короткі моменти й реальні build proof у YouTube, Instagram, TikTok, X та Telegram.", chips: ["YouTube", "Instagram", "TikTok", "Telegram"], cta: "Відкрити медіа та профіль" },
    },
  },
  ru: {
    eyebrow: "Выберите направление",
    title: "Пять входов в одну экосистему",
    desc: "Бизнес, software, сильное окружение, performance-продукты или контент. У каждого направления одна понятная задача и свой следующий шаг.",
    paths: {
      business: { kicker: "Для бизнеса", title: "Превратить внимание в обращения, встречи и продажи.", text: "Growth systems вокруг реального узкого места: качественное внимание, конверсия, follow-up и операционный слой за ними.", chips: ["Traffic", "Conversion", "Automation", "Sales operations"], cta: "Открыть Growth Systems" },
      software: { kicker: "Для владельцев сайтов", title: "Увидеть, что теряет сайт, до того как переделывать его наугад.", text: "VisibilityOS собирает conversion, trust, SEO и AI-search сигналы в один evidence-led разбор сайта.", chips: ["AI search", "AEO", "Conversion", "Evidence"], cta: "Открыть VisibilityOS" },
      warriors: { kicker: "Для builders", title: "Строить в кругу, который повышает стандарт.", text: "Warriors Team — приватная сеть для тех, кто уже строит бизнес, тело, навык и репутацию и хочет сильнее окружение и прямой фидбек.", chips: ["Бизнес", "Тренировки", "Accountability", "Network"], cta: "Открыть Warriors Team" },
      performance: { kicker: "Для активной жизни", title: "Питание и базовые вещи, с которыми режим легче держать.", text: "Потребительская линейка начинается с практичного performance-питания для тренировочных дней и плотного графика.", chips: ["Performance food", "Training days", "Essentials"], cta: "Посмотреть первую линейку" },
      media: { kicker: "Для тех, кто следит за путём", title: "Бизнес, тренировки, машины, мысли и работа за кадром.", text: "Длинные видео, короткие моменты и реальные build proof в YouTube, Instagram, TikTok, X и Telegram.", chips: ["YouTube", "Instagram", "TikTok", "Telegram"], cta: "Открыть медиа и профиль" },
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
