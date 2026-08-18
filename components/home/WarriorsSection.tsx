"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleDollarSign, MessageSquareText, Network, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { directionRoute } from "@/lib/ecosystem";
import type { Lang } from "@/lib/i18n";

type Copy = { eyebrow: string; titleA: string; titleB: string; lead: string; status: string; price: string; annual: string; tracks: string; live: string; principles: string[]; pathLabel: string; steps: { title: string; text: string }[]; open: string; apply: string; dialogTitle: string; dialogDesc: string; dialogSubmit: string; dialogSuccessT: string; dialogSuccessM: string; fields: RequestField[]; };

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Private skills + execution club", titleA: "Build the skill. ", titleB: "Raise the room around you.", lead: "Warriors combines four practical learning paths, weekly working sessions and a selective private network in one membership.", status: "Applications open", price: "$290/month", annual: "$2,900/year", tracks: "4 learning paths", live: "weekly working session",
    principles: ["AI Systems + Client Acquisition + Content + Business", "Private member hub + Telegram", "Implementation over passive learning", "Application required"], pathLabel: "How it works",
    steps: [{ title: "Learn", text: "Choose the path closest to the current bottleneck." }, { title: "Build", text: "Turn each lesson into a real implementation step." }, { title: "Review", text: "Bring the work to the private community and weekly session." }, { title: "Compound", text: "Build skills, proof and relationships over time." }],
    open: "Explore Warriors", apply: "Apply", dialogTitle: "Apply to Warriors", dialogDesc: "Tell us what you are building, what you want to strengthen and what you can contribute to the club.", dialogSubmit: "Submit application", dialogSuccessT: "Application received", dialogSuccessM: "If the fit is strong, Vlad will reach out with the next step and membership options.",
    fields: [{ id: "name", label: "Your name", required: true }, { id: "email", label: "Email", type: "email", required: true }, { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true }, { id: "track", label: "First area to strengthen", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] }, { id: "goal30", label: "30-day goal", type: "textarea", required: true }],
  },
  ua: {
    eyebrow: "Закритий клуб навичок і реалізації", titleA: "Розвивайте навички. ", titleB: "Посилюйте оточення.", lead: "Warriors поєднує чотири практичні напрями навчання, щотижневі робочі сесії та відібрану приватну мережу в одній участі.", status: "Заявки відкриті", price: "$290/місяць", annual: "$2,900/рік", tracks: "4 напрями", live: "щотижнева робоча сесія",
    principles: ["ШІ-системи + клієнти + контент + бізнес", "Закритий кабінет + Telegram", "Реалізація замість пасивного навчання", "Доступ лише за заявкою"], pathLabel: "Як це працює",
    steps: [{ title: "Навчання", text: "Оберіть напрям, найближчий до поточного вузького місця." }, { title: "Реалізація", text: "Перетворюйте кожен урок на реальну дію." }, { title: "Розбір", text: "Приносьте роботу у закриту спільноту та на щотижневу сесію." }, { title: "Накопичення", text: "Нарощуйте навички, результати та зв'язки з часом." }],
    open: "Відкрити Warriors", apply: "Подати заявку", dialogTitle: "Заявка у Warriors", dialogDesc: "Розкажіть, що будуєте, що хочете посилити та що можете додати до клубу.", dialogSubmit: "Надіслати заявку", dialogSuccessT: "Заявку отримано", dialogSuccessM: "Якщо відповідність сильна, Vlad напише з наступним кроком і варіантами участі.",
    fields: [{ id: "name", label: "Ваше ім'я", required: true }, { id: "email", label: "Email", type: "email", required: true }, { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true }, { id: "track", label: "Перший напрям для посилення", type: "select", required: true, options: ["ШІ-системи", "Залучення клієнтів", "Контент-система", "Управління бізнесом"] }, { id: "goal30", label: "Ціль на 30 днів", type: "textarea", required: true }],
  },
  ru: {
    eyebrow: "Закрытый клуб навыков и реализации", titleA: "Развивайте навыки. ", titleB: "Усиливайте окружение.", lead: "Warriors объединяет четыре практических направления обучения, еженедельные рабочие сессии и отобранную закрытую сеть в одном участии.", status: "Заявки открыты", price: "$290/месяц", annual: "$2,900/год", tracks: "4 направления", live: "еженедельная рабочая сессия",
    principles: ["ИИ-системы + клиенты + контент + бизнес", "Закрытый кабинет + Telegram", "Реализация вместо пассивного обучения", "Доступ только по заявке"], pathLabel: "Как это работает",
    steps: [{ title: "Обучение", text: "Выберите направление, ближайшее к текущему узкому месту." }, { title: "Реализация", text: "Превращайте каждый урок в реальное действие." }, { title: "Разбор", text: "Приносите работу в закрытое сообщество и на еженедельную сессию." }, { title: "Накопление", text: "Наращивайте навыки, результаты и связи со временем." }],
    open: "Открыть Warriors", apply: "Подать заявку", dialogTitle: "Заявка в Warriors", dialogDesc: "Расскажите, что строите, что хотите усилить и что можете добавить в клуб.", dialogSubmit: "Отправить заявку", dialogSuccessT: "Заявка получена", dialogSuccessM: "Если соответствие сильное, Vlad напишет с следующим шагом и вариантами участия.",
    fields: [{ id: "name", label: "Ваше имя", required: true }, { id: "email", label: "Электронная почта", type: "email", required: true }, { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true }, { id: "track", label: "Первое направление для усиления", type: "select", required: true, options: ["ИИ-системы", "Привлечение клиентов", "Контент-система", "Управление бизнесом"] }, { id: "goal30", label: "Цель на 30 дней", type: "textarea", required: true }],
  },
};

const STEP_ICONS = [Target, CircleDollarSign, MessageSquareText, Network];

export function WarriorsSection() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const c = COPY[lang];
  const href = directionRoute(lang, "warriors");
  return (
    <section id="warriors" className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#030203] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0"><div className="absolute left-1/2 top-0 h-[620px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(196,181,253,.11),rgba(212,175,55,.025)_36%,transparent_68%)]" /></div>
      <div className="container relative z-10 mx-auto px-4"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
        <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.22em] text-violet-200/75">{c.eyebrow}</span><span className="rounded-full border border-emerald-300/14 bg-emerald-300/[.035] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.14em] text-emerald-200">{c.status}</span></div>
          <h2 className="section-title mt-4 text-[clamp(2.7rem,4.8vw,4.6rem)] text-zinc-100">{c.titleA}<em className="bg-gradient-to-br from-violet-100 via-violet-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{c.titleB}</em></h2>
          <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{c.lead}</p>
          <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-violet-300/14 bg-violet-300/[.035] px-3 py-1.5 text-xs text-violet-100">{c.price}</span><span className="rounded-full border border-amber-200/14 bg-amber-200/[.03] px-3 py-1.5 text-xs text-amber-100/75">{c.annual}</span><span className="rounded-full border border-white/[.08] bg-white/[.02] px-3 py-1.5 text-xs text-zinc-500"><Users className="mr-1.5 inline h-3.5 w-3.5" />{c.tracks}</span></div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">{c.principles.map((principle) => <div key={principle} className="flex gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] p-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><Check className="h-3.5 w-3.5" /></span><span className="text-xs leading-6 text-zinc-400">{principle}</span></div>)}</div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={href} className="w-full sm:w-auto" onClick={() => track("warriors_open", { source: "home" })}><Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">{c.open}<ArrowRight className="ml-2 h-4 w-4" /></Button></a><RequestDialog intent="warriors_team_application" title={c.dialogTitle} description={c.dialogDesc} submitLabel={c.dialogSubmit} successTitle={c.dialogSuccessT} successMessage={c.dialogSuccessM} buttonLabel="Home - Warriors application" fields={c.fields} context={{ source: "home_warriors", locale: lang, offer: "warriors_private_club_v1", monthly_price_usd: 290, annual_price_usd: 2900 }}><Button className="h-auto min-h-12 w-full border border-violet-300/20 bg-violet-300/[.05] px-7 py-3 text-white hover:bg-violet-300/[.09] sm:w-auto" onClick={() => track("warriors_application_open", { source: "home" })}>{c.apply}</Button></RequestDialog></div>
        </motion.div>
        <motion.div initial={reduced ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}><InteractiveSurface accent="violet" lift={false} className="relative overflow-hidden rounded-[30px] border border-violet-200/[.12] bg-[linear-gradient(145deg,rgba(196,181,253,.055),rgba(255,255,255,.016)_48%,rgba(0,0,0,.48))] p-6 sm:p-8"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-zinc-100">Warriors</p><p className="mt-1 text-[10px] uppercase tracking-[.16em] text-zinc-600">{c.pathLabel}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><Network className="h-4 w-4" /></span></div><div className="mt-7 space-y-3">{c.steps.map((step, index) => { const Icon = STEP_ICONS[index] ?? Target; return <div key={step.title} className="grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-white/[.07] bg-black/26 p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/18 bg-violet-300/[.045] text-violet-200/80"><Icon className="h-4 w-4" /></span><div><p className="text-sm font-semibold text-zinc-200">{step.title}</p><p className="mt-1.5 text-xs leading-5 text-zinc-500">{step.text}</p></div></div>; })}</div></InteractiveSurface></motion.div>
      </div></div>
    </section>
  );
}
