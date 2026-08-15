"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock3, Dumbbell, PackageCheck, Utensils } from "lucide-react";
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
  productTitle: string;
  productText: string;
  benefits: { title: string; text: string }[];
  cta: string;
  open: string;
  dialogTitle: string;
  dialogDesc: string;
  helpLabel: string;
  helpPlaceholder: string;
  successTitle: string;
  successMessage: string;
  note: string;
}> = {
  en: {
    eyebrow: "Performance food & essentials",
    titleA: "Keep the routine. ",
    titleB: "Remove the daily friction.",
    desc: "The consumer line under the Vlad Kuzmenko brand starts with practical food for training days and demanding schedules, then expands into essentials that genuinely make the routine easier.",
    productTitle: "Performance Meal Sets",
    productText: "Ready-to-eat meal sets designed around a simple use case: training, work and travel can sit in the same day without food becoming another decision to solve from scratch.",
    benefits: [
      { title: "Training-day ready", text: "Built around the days where training has to fit around work, study or travel." },
      { title: "Simple choice", text: "A small, understandable line instead of a catalogue that makes the decision harder." },
      { title: "Practical format", text: "Convenience, storage and delivery have to work in real life before the line expands." },
    ],
    cta: "Get first access",
    open: "Open Performance line",
    dialogTitle: "Get first access to the performance line",
    dialogDesc: "Leave your contact and tell me what a training-day food set would need to solve for you. I will send the menu and conditions when the first local line is ready to show.",
    helpLabel: "What would make a meal set useful for you?",
    helpPlaceholder: "Your routine, training days, what you buy now, what you want to avoid…",
    successTitle: "You're on the first-access list",
    successMessage: "You'll hear from me when there is a real first line to show, with actual menu and conditions.",
    note: "First access is an interest list, not a pre-order and no payment is taken here.",
  },
  ua: {
    eyebrow: "Performance food & essentials",
    titleA: "Тримайте режим. ",
    titleB: "Приберіть щоденне тертя.",
    desc: "Споживча лінійка під брендом Vlad Kuzmenko починається з практичного харчування для тренувальних днів і щільного графіка, а далі розширюється лише речами, які реально спрощують режим.",
    productTitle: "Performance Meal Sets",
    productText: "Готові набори їжі під простий сценарій: тренування, робота, навчання й дорога можуть бути в одному дні, а харчування не повинно щоразу перетворюватися на нову задачу.",
    benefits: [
      { title: "Під тренувальний день", text: "Формат для днів, де тренування потрібно поєднати з роботою, навчанням або дорогою." },
      { title: "Простий вибір", text: "Невелика зрозуміла лінійка замість каталогу, який лише ускладнює рішення." },
      { title: "Практичний формат", text: "Зручність, зберігання та доставка мають працювати в реальному житті до розширення лінійки." },
    ],
    cta: "Отримати перший доступ",
    open: "Відкрити Performance-напрям",
    dialogTitle: "Отримати перший доступ до performance-лінійки",
    dialogDesc: "Залиште контакт і напишіть, що набір харчування має вирішувати у ваш тренувальний день. Меню та умови надішлю, коли перша локальна лінійка буде готова до показу.",
    helpLabel: "Що зробило б набір харчування корисним саме для вас?",
    helpPlaceholder: "Ваш режим, тренувальні дні, що купуєте зараз, чого хочете уникнути…",
    successTitle: "Ви у списку першого доступу",
    successMessage: "Напишу, коли буде що реально показати: меню, формат і умови першої лінійки.",
    note: "Перший доступ — це список інтересу, не передзамовлення. Оплата тут не приймається.",
  },
  ru: {
    eyebrow: "Performance food & essentials",
    titleA: "Держите режим. ",
    titleB: "Уберите ежедневное трение.",
    desc: "Потребительская линейка под брендом Vlad Kuzmenko начинается с практичного питания для тренировочных дней и плотного графика, а дальше расширяется только вещами, которые реально упрощают режим.",
    productTitle: "Performance Meal Sets",
    productText: "Готовые наборы еды под простой сценарий: тренировка, работа, учёба и дорога могут быть в одном дне, а питание не должно каждый раз превращаться в новую задачу.",
    benefits: [
      { title: "Под тренировочный день", text: "Формат для дней, где тренировку нужно совместить с работой, учёбой или дорогой." },
      { title: "Простой выбор", text: "Небольшая понятная линейка вместо каталога, который только усложняет решение." },
      { title: "Практичный формат", text: "Удобство, хранение и доставка должны работать в реальной жизни до расширения линейки." },
    ],
    cta: "Получить первый доступ",
    open: "Открыть Performance-направление",
    dialogTitle: "Получить первый доступ к performance-линейке",
    dialogDesc: "Оставьте контакт и напишите, что набор питания должен решать в ваш тренировочный день. Меню и условия пришлю, когда первая локальная линейка будет готова к показу.",
    helpLabel: "Что сделало бы набор питания полезным именно для вас?",
    helpPlaceholder: "Ваш режим, тренировочные дни, что покупаете сейчас, чего хотите избежать…",
    successTitle: "Вы в списке первого доступа",
    successMessage: "Напишу, когда будет что реально показать: меню, формат и условия первой линейки.",
    note: "Первый доступ — это список интереса, не предзаказ. Оплата здесь не принимается.",
  },
};

const icons = [Dumbbell, Clock3, PackageCheck];

export function DropSection() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  return (
    <section id="drop" className="relative scroll-mt-24 overflow-hidden border-t border-zinc-900 bg-black py-24 md:py-32">
      <div className="pointer-events-none absolute left-[-12%] top-[12%] h-[500px] w-[500px] rounded-full bg-amber-300/[.045] blur-[120px]" />
      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200">
              <Utensils className="h-3.5 w-3.5" /> {x.eyebrow}
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-.05em] sm:text-5xl md:text-6xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h2>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.desc}</p>
          </motion.div>

          <div className="mt-12 overflow-hidden rounded-[30px] border border-white/[.09] bg-[radial-gradient(circle_at_85%_10%,rgba(245,190,52,.09),transparent_36%),#080808]">
            <div className="grid lg:grid-cols-[.95fr_1.05fr]">
              <div className="border-b border-white/[.07] p-7 sm:p-9 lg:border-b-0 lg:border-r lg:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-amber-300/70">First line</p>
                <h3 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">{x.productTitle}</h3>
                <p className="mt-4 text-base leading-7 text-zinc-300">{x.productText}</p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <RequestDialog intent="drop_interest" title={x.dialogTitle} description={x.dialogDesc} successTitle={x.successTitle} successMessage={x.successMessage} buttonLabel="Home — performance first access" showBuildType={false} compact helpLabel={x.helpLabel} helpPlaceholder={x.helpPlaceholder} context={{ concept: "performance_meal_sets", source: "home_drop", locale: lang }}>
                    <Button className="premium-button h-auto min-h-12 w-full px-7 py-3 sm:w-auto" onClick={() => track("drop_interest_open", { source: "home" })}>{x.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </RequestDialog>
                  <a href={`${prefix}/drop`} className="w-full sm:w-auto"><Button className="h-auto min-h-12 w-full border border-white/15 bg-white/[.03] px-7 py-3 text-white hover:bg-white/[.08] sm:w-auto">{x.open}</Button></a>
                </div>
                <p className="mt-4 text-xs leading-5 text-zinc-600">{x.note}</p>
              </div>

              <div className="grid gap-0 sm:grid-cols-3 lg:grid-cols-1">
                {x.benefits.map((item, i) => {
                  const Icon = icons[i];
                  return (
                    <div key={item.title} className={`p-6 sm:p-7 ${i ? "border-t border-white/[.07] sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t" : ""}`}>
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[.06] text-amber-300"><Icon className="h-4 w-4" /></span>
                        <div><h4 className="text-base font-bold text-zinc-100">{item.title}</h4><p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
