"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleDollarSign, MessageSquareText, Network, ShieldCheck, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RequestDialog, type RequestField } from "@/components/ui/request-dialog";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { useI18n } from "@/components/i18n-provider";
import { track } from "@/lib/analytics";
import { directionRoute } from "@/lib/ecosystem";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  status: string;
  price: string;
  priceNote: string;
  cap: string;
  rhythm: string;
  principles: string[];
  pathLabel: string;
  steps: { title: string; text: string }[];
  open: string;
  apply: string;
  dialogTitle: string;
  dialogDesc: string;
  dialogSubmit: string;
  dialogSuccessT: string;
  dialogSuccessM: string;
  fields: RequestField[];
}> = {
  en: {
    eyebrow: "Private execution circle",
    titleA: "The people around you ",
    titleB: "change the standard.",
    lead: "Warriors Founding Circle is a curated group for builders already shipping. Weekly Commit + Proof, two focused live sessions each month, direct feedback and useful introductions.",
    status: "Founding circle · applications open",
    price: "$49/month",
    priceNote: "after acceptance",
    cap: "capped at 8",
    rhythm: "2 live sessions / month",
    principles: ["Execution over motivation", "Confidential by default", "Contribute, do not just consume", "No unsolicited selling"],
    pathLabel: "Access path",
    steps: [
      { title: "Apply", text: "Show what you are building and recent proof of execution." },
      { title: "Fit", text: "A short conversation checks expectations and group fit." },
      { title: "Activate", text: "$49/month only after acceptance. No fee to apply." },
      { title: "Circle", text: "Private Telegram, first commitment and the live operating rhythm." },
    ],
    open: "Explore Warriors",
    apply: "Apply",
    dialogTitle: "Apply to Warriors Founding Circle",
    dialogDesc: "A selective founding circle for builders already executing. No payment is taken before a fit decision.",
    dialogSubmit: "Submit application",
    dialogSuccessT: "Application received",
    dialogSuccessM: "If the fit looks strong, Vlad will reach out for a short conversation before any payment or access.",
    fields: [
      { id: "name", label: "Your name", required: true, placeholder: "First and last name" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle or number" },
      { id: "project", label: "What are you building?", type: "textarea", required: true, placeholder: "Project, current stage and a link if available" },
      { id: "proof", label: "Recent proof of execution", type: "textarea", required: true, placeholder: "What did you ship, sell or materially improve in the last 30 days?" },
    ],
  },
  ua: {
    eyebrow: "Приватне коло виконання",
    titleA: "Люди поруч ",
    titleB: "змінюють планку.",
    lead: "Warriors Founding Circle — відібрана група для builders, які вже виконують. Weekly Commit + Proof, дві фокусні live-сесії щомісяця, direct feedback і корисні introductions.",
    status: "Founding circle · заявки відкриті",
    price: "$49/місяць",
    priceNote: "після прийняття",
    cap: "максимум 8",
    rhythm: "2 live-сесії / місяць",
    principles: ["Execution замість motivation", "Confidential by default", "Contribute, а не лише consume", "Без unsolicited selling"],
    pathLabel: "Шлях доступу",
    steps: [
      { title: "Заявка", text: "Покажіть, що будуєте, і recent proof of execution." },
      { title: "Fit", text: "Коротка розмова перевіряє очікування та group fit." },
      { title: "Activate", text: "$49/місяць лише після прийняття. Заявка безкоштовна." },
      { title: "Коло", text: "Приватний Telegram, перший commitment і live operating rhythm." },
    ],
    open: "Відкрити Warriors",
    apply: "Подати заявку",
    dialogTitle: "Заявка у Warriors Founding Circle",
    dialogDesc: "Selective founding circle для builders, які вже виконують. Оплати до fit decision немає.",
    dialogSubmit: "Надіслати заявку",
    dialogSuccessT: "Заявку отримано",
    dialogSuccessM: "Якщо fit виглядає сильним, Vlad напише для короткої розмови до будь-якої оплати чи доступу.",
    fields: [
      { id: "name", label: "Ваше ім'я", required: true, placeholder: "Ім'я та прізвище" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle або номер" },
      { id: "project", label: "Що ви будуєте?", type: "textarea", required: true, placeholder: "Проєкт, поточна стадія і посилання, якщо є" },
      { id: "proof", label: "Recent proof of execution", type: "textarea", required: true, placeholder: "Що ви shipped, sold або materially improved за останні 30 днів?" },
    ],
  },
  ru: {
    eyebrow: "Закрытый круг исполнения",
    titleA: "Люди рядом ",
    titleB: "меняют планку.",
    lead: "Warriors Founding Circle — отобранная группа для builders, которые уже исполняют. Weekly Commit + Proof, две фокусные live-сессии каждый месяц, direct feedback и полезные introductions.",
    status: "Founding circle · заявки открыты",
    price: "$49/месяц",
    priceNote: "после принятия",
    cap: "максимум 8",
    rhythm: "2 live-сессии / месяц",
    principles: ["Execution вместо motivation", "Confidential by default", "Contribute, а не только consume", "Без unsolicited selling"],
    pathLabel: "Путь доступа",
    steps: [
      { title: "Заявка", text: "Покажите, что строите, и recent proof of execution." },
      { title: "Fit", text: "Короткий разговор проверяет ожидания и group fit." },
      { title: "Activate", text: "$49/месяц только после принятия. Заявка бесплатна." },
      { title: "Круг", text: "Закрытый Telegram, первый commitment и live operating rhythm." },
    ],
    open: "Открыть Warriors",
    apply: "Подать заявку",
    dialogTitle: "Заявка в Warriors Founding Circle",
    dialogDesc: "Selective founding circle для builders, которые уже исполняют. Оплаты до fit decision нет.",
    dialogSubmit: "Отправить заявку",
    dialogSuccessT: "Заявка получена",
    dialogSuccessM: "Если fit выглядит сильным, Vlad напишет для короткого разговора до любой оплаты или доступа.",
    fields: [
      { id: "name", label: "Ваше имя", required: true, placeholder: "Имя и фамилия" },
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { id: "phone", label: "Telegram / WhatsApp", type: "tel", required: true, placeholder: "@handle или номер" },
      { id: "project", label: "Что вы строите?", type: "textarea", required: true, placeholder: "Проект, текущая стадия и ссылка, если есть" },
      { id: "proof", label: "Recent proof of execution", type: "textarea", required: true, placeholder: "Что вы shipped, sold или materially improved за последние 30 дней?" },
    ],
  },
};

const STEP_ICONS = [Target, MessageSquareText, CircleDollarSign, Network];

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
            <div className="mt-6 flex flex-wrap gap-2"><span className="rounded-full border border-violet-300/14 bg-violet-300/[.035] px-3 py-1.5 text-xs text-violet-100">{c.price} <span className="text-violet-200/45">· {c.priceNote}</span></span><span className="rounded-full border border-white/[.08] bg-white/[.02] px-3 py-1.5 text-xs text-zinc-500"><Users className="mr-1.5 inline h-3.5 w-3.5" />{c.cap}</span><span className="rounded-full border border-white/[.08] bg-white/[.02] px-3 py-1.5 text-xs text-zinc-500">{c.rhythm}</span></div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">{c.principles.map((principle) => <div key={principle} className="flex gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] p-4"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><Check className="h-3.5 w-3.5" /></span><span className="text-xs leading-6 text-zinc-400">{principle}</span></div>)}</div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={href} className="w-full sm:w-auto" onClick={() => track("warriors_open", { source: "home" })}><Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto">{c.open}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
              <RequestDialog intent="warriors_team_application" title={c.dialogTitle} description={c.dialogDesc} submitLabel={c.dialogSubmit} successTitle={c.dialogSuccessT} successMessage={c.dialogSuccessM} buttonLabel="Home - Warriors Founding Circle application" fields={c.fields} context={{ source: "home_warriors", locale: lang, cohort: "founding_circle_v1", founding_price_usd_monthly: 49 }}>
                <Button className="h-auto min-h-12 w-full border border-violet-300/20 bg-violet-300/[.05] px-7 py-3 text-white hover:bg-violet-300/[.09] sm:w-auto" onClick={() => track("warriors_application_open", { source: "home" })}>{c.apply}</Button>
              </RequestDialog>
            </div>
          </motion.div>

          <motion.div initial={reduced ? false : { opacity: 0, y: 20, scale: .985 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ duration: .65, ease: [0.16, 1, 0.3, 1] }}>
            <InteractiveSurface accent="violet" lift={false} className="relative overflow-hidden rounded-[30px] border border-violet-200/[.12] bg-[linear-gradient(145deg,rgba(196,181,253,.055),rgba(255,255,255,.016)_48%,rgba(0,0,0,.48))] p-6 shadow-[0_42px_120px_-60px_rgba(139,92,246,.18)] sm:p-8">
              <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-zinc-100">Warriors Founding Circle</p><p className="mt-1 text-[10px] uppercase tracking-[.17em] text-zinc-600">{c.pathLabel}</p></div><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-violet-300/20 bg-violet-300/[.06] text-violet-200"><ShieldCheck className="h-4 w-4" /></span></div>
              <div className="mt-7 space-y-3">{c.steps.map((step, index) => { const Icon = STEP_ICONS[index] ?? Target; return <motion.div key={step.title} initial={reduced ? false : { opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }} className="relative grid grid-cols-[40px_1fr] gap-4 rounded-2xl border border-white/[.07] bg-black/26 p-4"><span className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border ${index === 0 ? "border-amber-300/25 bg-amber-300/[.07] text-amber-200" : "border-violet-300/18 bg-violet-300/[.045] text-violet-200/80"}`}><Icon className="h-4 w-4" /></span><div><div className="flex items-center justify-between gap-3"><p className="text-sm font-semibold text-zinc-200">{step.title}</p><span className="text-[9px] tracking-[.16em] text-zinc-700">0{index + 1}</span></div><p className="mt-1.5 text-xs leading-5 text-zinc-500">{step.text}</p></div></motion.div>; })}</div>
            </InteractiveSurface>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
