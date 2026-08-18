"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpenCheck, Check, CircleDollarSign, MessageSquareText, Rocket, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { directionRoute } from "@/lib/ecosystem";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  eyebrow: string; titleA: string; titleB: string; lead: string; status: string; price: string; priceNote: string; tracks: string; live: string;
  principles: string[]; pathLabel: string; steps: { title: string; text: string }[]; open: string; apply: string;
  dialogTitle: string; dialogDesc: string; dialogSubmit: string; dialogSuccessT: string; dialogSuccessM: string; fields: RequestField[];
}> = {
  en: {
    eyebrow: "Learning + execution network", titleA: "Learn the skill. ", titleB: "Ship the proof.",
    lead: "Warriors combines practical skill tracks, weekly live implementation and a private execution community in one membership. Closest model: an integrated platform like The Real World, rebuilt around our own systems and real work.",
    status: "Founding access · applications open", price: "$49/month", priceNote: "after acceptance", tracks: "4 starting tracks", live: "weekly live review",
    principles: ["AI Systems + Client Acquisition + Content + Business", "One membership, all tracks", "Implementation over passive learning", "No fake income or member claims"],
    pathLabel: "How it works",
    steps: [
      { title: "Choose a track", text: "Start with the bottleneck that matters now." },
      { title: "Build", text: "Every module ends in a real implementation mission." },
      { title: "Review", text: "Use private feedback and the weekly live implementation session." },
      { title: "Prove", text: "Show what shipped, changed, sold, published or started working." },
    ],
    open: "Explore Warriors", apply: "Apply",
    dialogTitle: "Apply for Warriors Founding Access", dialogDesc: "Choose the starting track and tell us what you want to execute in the next 30 days.", dialogSubmit: "Submit application", dialogSuccessT: "Application received", dialogSuccessM: "If the founding format matches the goal, Vlad will reach out before any payment.",
    fields: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle or number" },
      { id: "track", label: "Starting track", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "goal30", label: "30-day execution goal", type: "textarea", required: true, placeholder: "What do you want to build, sell, publish or improve?" },
    ],
  },
  ua: {
    eyebrow: "Навчання + execution network", titleA: "Освойте skill. ", titleB: "Покажіть proof.",
    lead: "Warriors об'єднує practical skill tracks, weekly live implementation і private execution community в одній membership. Найближча модель — integrated platform на кшталт The Real World, але з нашими original systems і real work.",
    status: "Founding access · заявки відкриті", price: "$49/місяць", priceNote: "після прийняття", tracks: "4 стартові tracks", live: "weekly live review",
    principles: ["AI Systems + Client Acquisition + Content + Business", "Одна membership, усі tracks", "Implementation замість passive learning", "Без fake income чи member claims"],
    pathLabel: "Як це працює",
    steps: [
      { title: "Оберіть track", text: "Починайте з bottleneck, який важливий зараз." },
      { title: "Build", text: "Кожен module завершується реальною implementation mission." },
      { title: "Review", text: "Private feedback + weekly live implementation session." },
      { title: "Proof", text: "Покажіть, що shipped, changed, sold, published або почало працювати." },
    ],
    open: "Відкрити Warriors", apply: "Подати заявку",
    dialogTitle: "Заявка на Warriors Founding Access", dialogDesc: "Оберіть starting track і розкажіть, що хочете виконати за наступні 30 днів.", dialogSubmit: "Надіслати заявку", dialogSuccessT: "Заявку отримано", dialogSuccessM: "Якщо founding format відповідає цілі, Vlad напише до будь-якої оплати.",
    fields: [
      { id: "name", label: "Ваше ім'я", required: true, placeholder: "Ім'я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle або номер" },
      { id: "track", label: "Starting track", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "goal30", label: "30-day execution goal", type: "textarea", required: true, placeholder: "Що хочете build, sell, publish або improve?" },
    ],
  },
  ru: {
    eyebrow: "Обучение + execution network", titleA: "Освойте skill. ", titleB: "Покажите proof.",
    lead: "Warriors объединяет practical skill tracks, weekly live implementation и private execution community в одной membership. Ближайшая модель — integrated platform вроде The Real World, но с нашими original systems и real work.",
    status: "Founding access · заявки открыты", price: "$49/месяц", priceNote: "после принятия", tracks: "4 стартовых tracks", live: "weekly live review",
    principles: ["AI Systems + Client Acquisition + Content + Business", "Одна membership, все tracks", "Implementation вместо passive learning", "Без fake income или member claims"],
    pathLabel: "Как это работает",
    steps: [
      { title: "Выберите track", text: "Начинайте с bottleneck, который важен сейчас." },
      { title: "Build", text: "Каждый module заканчивается реальной implementation mission." },
      { title: "Review", text: "Private feedback + weekly live implementation session." },
      { title: "Proof", text: "Покажите, что shipped, changed, sold, published или начало работать." },
    ],
    open: "Открыть Warriors", apply: "Подать заявку",
    dialogTitle: "Заявка на Warriors Founding Access", dialogDesc: "Выберите starting track и расскажите, что хотите исполнить за следующие 30 дней.", dialogSubmit: "Отправить заявку", dialogSuccessT: "Заявка получена", dialogSuccessM: "Если founding format соответствует цели, Vlad напишет до любой оплаты.",
    fields: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle или номер" },
      { id: "track", label: "Starting track", type: "select", required: true, options: ["AI Systems", "Client Acquisition", "Content Engine", "Business Operator"] },
      { id: "goal30", label: "30-day execution goal", type: "textarea", required: true, placeholder: "Что хотите build, sell, publish или improve?" },
    ],
  },
};

const STEP_ICONS = [Target, Rocket, MessageSquareText, BookOpenCheck];

export function WarriorsSection() {
  const { lang } = useI18n();
  const reduced = useReducedMotion();
  const c = COPY[lang];
  const href = directionRoute(lang, "warriors");

  return (
    <section id="warriors" className="relative scroll-mt-24 overflow-hidden border-t border-white/[.07] bg-[#030203] py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true"><div className="absolute left-1/2 top-0 h-[620px] w-[94%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(196,181,253,.11),rgba(212,175,55,.025)_36%,transparent_68%)]" /></div>
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[.92fr_1.08fr] lg:gap-14">
          <motion.div initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-violet-200/75">{c.eyebrow}</span><span className="rounded-full border border-emerald-300/14 bg-emerald-300/[.035] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.14em] text-emerald-200">{c.status}</span></div>
            <h2 className="section-title mt-4 text-[clamp(2.8rem,5vw,4.8rem)] text-zinc-100">{c.titleA}<em className="bg-gradient-to-br from-violet-100 via-violet-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{c.titleB}</em></h2>
            <p className="section-lead mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{c.lead}</p>
            <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-violet-300/14 bg-violet-300/[.035] px-3 py-1.5 text-xs text-violet-100">{c.price} <span className="text-violet-200/45">· {c.priceNote}</span></span><span className="rounded-full border border-white/[.08] bg-white/[.02] px-3 py-1.5 text-xs text-zinc-500"><Users className="mr-1.5 inline h-3.5 w-3.5" />{c.tracks}</span><span className="rounded-full border border-white/[.08] bg-white/[.02] px-3 py-1.5 text-xs text-zinc-500">{c.live}</span></div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">{c.principles.map((principle) => <div key={principle} className="flex gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] p-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><Check className="h-3.5 w-3.5" /></span><span className="text-xs leading-6 text-zinc-400">{principle}</span></div>)}</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={href} className="w-full sm:w-auto" onClick={() => track("warriors_open", { source: "home" })}><Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">{c.open}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
              <RequestDialog intent="warriors_team_application" title={c.dialogTitle} description={c.dialogDesc} submitLabel={c.dialogSubmit} successTitle={c.dialogSuccessT} successMessage={c.dialogSuccessM} buttonLabel="Home - Warriors Founding Access" fields={c.fields} context={{ source: "home_warriors", locale: lang, offer: "warriors_founding_membership_v1", founding_price_usd_monthly: 49 }}><Button className="h-auto min-h-12 w-full border border-violet-300/20 bg-violet-300/[.05] px-7 py-3 text-white hover:bg-violet-300/[.09] sm:w-auto" onClick={() => track("warriors_application_open", { source: "home" })}>{c.apply}</Button></RequestDialog>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 20, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
            <InteractiveSurface accent="violet" lift={false} className="relative overflow-hidden rounded-[30px] border border-violet-200/[.12] bg-[linear-gradient(145deg,rgba(196,181,253,.055),rgba(255,255,255,.016)_48%,rgba(0,0,0,.48))] p-6 shadow-[0_42px_120px_-60px_rgba(139,92,246,.18)] sm:p-8">
              <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-zinc-100">Warriors</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{c.pathLabel}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><CircleDollarSign className="h-4 w-4" /></span></div>
              <div className="mt-7 space-y-3">{c.steps.map((step, index) => { const Icon = STEP_ICONS[index] ?? Target; return <motion.div key={step.title} initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="relative grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-white/[.07] bg-black/26 p-4"><span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border ${index === 0 ? "border-amber-300/25 bg-amber-300/[.07] text-amber-200" : "border-violet-300/18 bg-violet-300/[.045] text-violet-200/80"}`}><Icon className="h-4 w-4" /></span><div><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-zinc-200">{step.title}</p><span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span></div><p className="mt-1.5 text-xs leading-5 text-zinc-500">{step.text}</p></div></motion.div>; })}</div>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
