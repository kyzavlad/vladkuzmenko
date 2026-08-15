"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Flame, Network, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  note: string;
  pillars: { title: string; text: string }[];
  standards: string[];
  standardsTitle: string;
  apply: string;
  open: string;
}> = {
  en: {
    eyebrow: "Private network · Warriors Team",
    titleA: "A stronger circle changes ",
    titleB: "how fast you move.",
    desc: "Warriors Team is for people already building: a business, a body, a skill, a reputation. The point is not more motivation. It is access to peers, direct feedback and a culture where execution is normal.",
    note: "Selective by application. No follower counts, status games or passive audience layer.",
    pillars: [
      { title: "Build", text: "Businesses, projects, skills and decisions get discussed with people who are also in motion." },
      { title: "Train", text: "Physical discipline is part of the standard, not a separate motivational topic." },
      { title: "Connect", text: "Useful introductions, real collaboration and direct conversations instead of anonymous networking." },
    ],
    standardsTitle: "The standard",
    standards: ["Contribute, do not only consume", "Tell the truth even when it is inconvenient", "Execution is the proof", "Respect the room and the people in it"],
    apply: "Apply to Warriors Team",
    open: "See how it works",
  },
  ua: {
    eyebrow: "Private network · Warriors Team",
    titleA: "Сильніше оточення змінює ",
    titleB: "швидкість руху.",
    desc: "Warriors Team — для людей, які вже будують: бізнес, тіло, навичку, репутацію. Сенс не в мотивації, а в доступі до сильних peers, прямому фідбеку та культурі, де виконання — норма.",
    note: "Відбір за заявкою. Без гри в статус, пасивної аудиторії та випадкових людей.",
    pillars: [
      { title: "Build", text: "Бізнес, проєкти, навички й рішення обговорюються з людьми, які теж рухаються." },
      { title: "Train", text: "Фізична дисципліна — частина стандарту, а не окрема мотиваційна тема." },
      { title: "Connect", text: "Корисні знайомства, реальна співпраця й прямі розмови замість анонімного networking." },
    ],
    standardsTitle: "Стандарт",
    standards: ["Вносити вклад, а не лише споживати", "Говорити правду, навіть коли незручно", "Execution — єдиний доказ", "Поважати простір і людей у ньому"],
    apply: "Подати заявку в Warriors Team",
    open: "Подивитися, як це працює",
  },
  ru: {
    eyebrow: "Private network · Warriors Team",
    titleA: "Сильное окружение меняет ",
    titleB: "скорость движения.",
    desc: "Warriors Team — для людей, которые уже строят: бизнес, тело, навык, репутацию. Смысл не в мотивации, а в доступе к сильным peers, прямом фидбеке и культуре, где выполнение — норма.",
    note: "Отбор по заявке. Без игры в статус, пассивной аудитории и случайных людей.",
    pillars: [
      { title: "Build", text: "Бизнес, проекты, навыки и решения обсуждаются с людьми, которые тоже находятся в движении." },
      { title: "Train", text: "Физическая дисциплина — часть стандарта, а не отдельная мотивационная тема." },
      { title: "Connect", text: "Полезные знакомства, реальная совместная работа и прямые разговоры вместо анонимного networking." },
    ],
    standardsTitle: "Стандарт",
    standards: ["Вносить вклад, а не только потреблять", "Говорить правду, даже когда неудобно", "Execution — единственное доказательство", "Уважать пространство и людей внутри"],
    apply: "Подать заявку в Warriors Team",
    open: "Посмотреть, как это работает",
  },
};

const pillarIcons = [Target, Shield, Network];

export function WarriorsSection() {
  const { lang, t } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  return (
    <section id="warriors" className="relative scroll-mt-24 overflow-hidden border-t border-zinc-900 bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute right-[-18%] top-[-28%] h-[620px] w-[620px] rounded-full bg-amber-300/[.055] blur-[120px]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200">
              <Flame className="h-3.5 w-3.5" /> {x.eyebrow}
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-.05em] sm:text-5xl md:text-6xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h2>
            <p className="mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.desc}</p>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{x.note}</p>
          </motion.div>

          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {x.pillars.map((pillar, i) => {
              const Icon = pillarIcons[i];
              return (
                <motion.div key={pillar.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .05 }} className="rounded-[26px] border border-white/[.09] bg-[#080808] p-6 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-300/20 bg-amber-300/[.07] text-amber-300"><Icon className="h-5 w-5" /></span>
                    <span className="text-[10px] font-bold tracking-[.2em] text-zinc-700">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 text-2xl font-black tracking-[-.035em]">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">{pillar.text}</p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-5 grid overflow-hidden rounded-[28px] border border-white/[.09] bg-[#060606] lg:grid-cols-[.8fr_1.2fr]">
            <div className="border-b border-white/[.07] p-7 lg:border-b-0 lg:border-r lg:p-9">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300/70">{x.standardsTitle}</p>
              <div className="mt-5 space-y-3">
                {x.standards.map((item) => <div key={item} className="flex items-start gap-3 text-sm leading-6 text-zinc-300"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" /><span>{item}</span></div>)}
              </div>
            </div>
            <div className="flex flex-col justify-center p-7 lg:p-9">
              <h3 className="max-w-xl text-2xl font-black tracking-[-.035em] sm:text-3xl">Warriors Team</h3>
              <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">{lang === "ru" ? "Если вам нужен не ещё один канал с контентом, а среда, в которой есть отбор, вклад и прямой контакт, начните с заявки." : lang === "ua" ? "Якщо вам потрібен не ще один канал з контентом, а середовище з відбором, внеском і прямим контактом, почніть із заявки." : "If you need more than another content channel and want a curated environment with contribution and direct contact, start with the application."}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <RequestDialog intent="warriors_application" title={t.warriors.dialogTitle} description={t.warriors.dialogDesc} submitLabel={t.warriors.dialogSubmit} successTitle={t.warriors.dialogSuccessT} successMessage={t.warriors.dialogSuccessM} buttonLabel="Home — Warriors application" showBuildType={false} compact helpLabel={t.warriors.helpLabel} helpPlaceholder={t.warriors.helpPh} context={{ source: "home_warriors", locale: lang }}>
                  <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("warriors_application_open", { source: "home" })}>{x.apply}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </RequestDialog>
                <a href={`${prefix}/warriors-team`} className="w-full sm:w-auto"><Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.03] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">{x.open}</Button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
