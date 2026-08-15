"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Clock3, Dumbbell, PackageCheck, ShieldCheck, Utensils } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { RequestDialog } from "@/components/ui/request-dialog";
import { useI18n } from "@/components/i18n-provider";
import { type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  firstLabel: string;
  product: string;
  productLead: string;
  scenariosTitle: string;
  scenarios: { title: string; text: string }[];
  principleTitle: string;
  principles: string[];
  processTitle: string;
  process: { n: string; title: string; text: string }[];
  accessTitle: string;
  accessText: string;
  cta: string;
  dialogTitle: string;
  dialogDesc: string;
  helpLabel: string;
  helpPlaceholder: string;
  successTitle: string;
  successMessage: string;
  note: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Vlad Kuzmenko Performance",
    titleA: "Food for the days when ",
    titleB: "the schedule does not slow down.",
    lead: "A practical consumer line for training days, work, travel and the routines in between. The first direction is ready-to-eat meal sets, with a deliberately small line and a simple job: make the day easier to execute.",
    firstLabel: "First line",
    product: "Performance Meal Sets",
    productLead: "A compact set of ready-to-eat meals for people who train and do not want every busy day to become another search for something fast to eat.",
    scenariosTitle: "Built around real days, not a food catalogue",
    scenarios: [
      { title: "Training + work", text: "When the session has to fit before, between or after working hours." },
      { title: "On the move", text: "When travel or errands remove the time and place you would normally cook." },
      { title: "Busy week", text: "When the useful thing is fewer food decisions, not more menu options." },
    ],
    principleTitle: "What the line has to earn",
    principles: ["Simple enough to choose quickly", "Practical to store, carry and use", "Clear ingredients and product information", "Consistent enough to buy again"],
    processTitle: "How the first line is being built",
    process: [
      { n: "01", title: "Choose the use case", text: "Start with training-day food, not an endless general menu." },
      { n: "02", title: "Lock the format", text: "Supplier, packaging, storage and delivery have to work as one operating model." },
      { n: "03", title: "Show the real line", text: "Publish actual products, ingredients, conditions and geography only when confirmed." },
      { n: "04", title: "Expand from repeat demand", text: "Add products only when the first line proves useful enough to buy again." },
    ],
    accessTitle: "Want to see the first line when it is ready?",
    accessText: "Join first access and tell me what a training-day meal set would need to solve for you. I will send the actual menu and conditions when there is something real to show.",
    cta: "Get first access",
    dialogTitle: "Get first access to Performance Meal Sets",
    dialogDesc: "Leave your contact and tell me what your training-day food usually looks like. This is an interest list, not a pre-order.",
    helpLabel: "What would make the set useful for you?",
    helpPlaceholder: "Your routine, training time, what you buy now, what you want to avoid…",
    successTitle: "You're on the first-access list",
    successMessage: "You'll hear from me when the first line has a real menu and confirmed conditions.",
    note: "No payment is taken here. Price, menu, delivery area and availability are shown only after they are confirmed.",
  },
  ua: {
    eyebrow: "Vlad Kuzmenko Performance",
    titleA: "Харчування для днів, коли ",
    titleB: "графік не сповільнюється.",
    lead: "Практична споживча лінійка для тренувань, роботи, дороги й рутини між ними. Перший напрям — готові набори їжі з навмисно невеликою лінійкою та однією задачею: зробити день простішим у виконанні.",
    firstLabel: "Перша лінійка",
    product: "Performance Meal Sets",
    productLead: "Компактний набір готової їжі для людей, які тренуються й не хочуть, щоб кожен щільний день знову перетворювався на пошук чогось швидкого поїсти.",
    scenariosTitle: "Під реальні дні, а не під нескінченний каталог",
    scenarios: [
      { title: "Тренування + робота", text: "Коли сесію потрібно вмістити до, між або після робочих годин." },
      { title: "У дорозі", text: "Коли поїздки та справи забирають час і місце, де зазвичай готуєте." },
      { title: "Щільний тиждень", text: "Коли корисніше мати менше рішень про їжу, а не більше позицій у меню." },
    ],
    principleTitle: "Що лінійка має заслужити",
    principles: ["Швидкий і зрозумілий вибір", "Практичне зберігання та використання", "Зрозумілі склад і інформація про продукт", "Стабільна якість, за якою хочеться повернутися"],
    processTitle: "Як будується перша лінійка",
    process: [
      { n: "01", title: "Один сценарій", text: "Починаємо з харчування для тренувального дня, а не з нескінченного загального меню." },
      { n: "02", title: "Операційний формат", text: "Постачальник, упаковка, зберігання й доставка мають працювати як одна модель." },
      { n: "03", title: "Реальні позиції", text: "Публікуємо продукти, склад, умови та географію лише після фактичного підтвердження." },
      { n: "04", title: "Розширення від повторного попиту", text: "Додаємо нові продукти тільки якщо перша лінійка достатньо корисна, щоб до неї поверталися." },
    ],
    accessTitle: "Хочете побачити першу лінійку, коли вона буде готова?",
    accessText: "Приєднайтесь до першого доступу й напишіть, що набір їжі має вирішувати у ваш тренувальний день. Меню та реальні умови надішлю, коли буде що показати.",
    cta: "Отримати перший доступ",
    dialogTitle: "Отримати перший доступ до Performance Meal Sets",
    dialogDesc: "Залиште контакт і коротко опишіть, як ви зараз вирішуєте харчування в тренувальні дні. Це список інтересу, не передзамовлення.",
    helpLabel: "Що зробило б набір корисним саме для вас?",
    helpPlaceholder: "Ваш режим, час тренування, що купуєте зараз, чого хочете уникнути…",
    successTitle: "Ви у списку першого доступу",
    successMessage: "Напишу, коли у першої лінійки буде реальне меню та підтверджені умови.",
    note: "Оплата тут не приймається. Ціна, меню, зона доставки й доступність з’являться лише після підтвердження.",
  },
  ru: {
    eyebrow: "Vlad Kuzmenko Performance",
    titleA: "Питание для дней, когда ",
    titleB: "график не замедляется.",
    lead: "Практичная потребительская линейка для тренировок, работы, дороги и рутины между ними. Первое направление — готовые наборы еды с намеренно небольшой линейкой и одной задачей: сделать день проще в исполнении.",
    firstLabel: "Первая линейка",
    product: "Performance Meal Sets",
    productLead: "Компактный набор готовой еды для людей, которые тренируются и не хотят, чтобы каждый плотный день снова превращался в поиск чего-нибудь быстрого поесть.",
    scenariosTitle: "Под реальные дни, а не под бесконечный каталог",
    scenarios: [
      { title: "Тренировка + работа", text: "Когда тренировку нужно вместить до, между или после рабочих часов." },
      { title: "В дороге", text: "Когда поездки и дела убирают время и место, где вы обычно готовите." },
      { title: "Плотная неделя", text: "Когда полезнее иметь меньше решений про еду, а не больше позиций в меню." },
    ],
    principleTitle: "Что линейка должна заслужить",
    principles: ["Быстрый и понятный выбор", "Практичное хранение и использование", "Понятный состав и информация о продукте", "Стабильное качество, за которым хочется вернуться"],
    processTitle: "Как строится первая линейка",
    process: [
      { n: "01", title: "Один сценарий", text: "Начинаем с питания для тренировочного дня, а не с бесконечного общего меню." },
      { n: "02", title: "Операционный формат", text: "Поставщик, упаковка, хранение и доставка должны работать как одна модель." },
      { n: "03", title: "Реальные позиции", text: "Публикуем продукты, состав, условия и географию только после фактического подтверждения." },
      { n: "04", title: "Расширение от повторного спроса", text: "Добавляем новые продукты только если первая линейка достаточно полезна, чтобы к ней возвращались." },
    ],
    accessTitle: "Хотите увидеть первую линейку, когда она будет готова?",
    accessText: "Присоединитесь к первому доступу и напишите, что набор еды должен решать в ваш тренировочный день. Меню и реальные условия пришлю, когда будет что показать.",
    cta: "Получить первый доступ",
    dialogTitle: "Получить первый доступ к Performance Meal Sets",
    dialogDesc: "Оставьте контакт и коротко опишите, как вы сейчас решаете питание в тренировочные дни. Это список интереса, не предзаказ.",
    helpLabel: "Что сделало бы набор полезным именно для вас?",
    helpPlaceholder: "Ваш режим, время тренировки, что покупаете сейчас, чего хотите избежать…",
    successTitle: "Вы в списке первого доступа",
    successMessage: "Напишу, когда у первой линейки будет реальное меню и подтверждённые условия.",
    note: "Оплата здесь не принимается. Цена, меню, зона доставки и доступность появятся только после подтверждения.",
  },
};

const scenarioIcons = [Dumbbell, Clock3, PackageCheck];

export function DropPage() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const route = `${lang === "en" ? "" : `/${lang}`}/drop`;

  const dialog = (source: string) => ({
    intent: "drop_interest",
    title: x.dialogTitle,
    description: x.dialogDesc,
    successTitle: x.successTitle,
    successMessage: x.successMessage,
    buttonLabel: `Performance — ${source}`,
    showBuildType: false,
    compact: true,
    helpLabel: x.helpLabel,
    helpPlaceholder: x.helpPlaceholder,
    context: { concept: "performance_meal_sets", source, locale: lang, route },
  });

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-20 pt-36 sm:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,52,.14),transparent_42%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200">
              <Utensils className="h-3.5 w-3.5" /> {x.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black tracking-[-.05em] sm:text-6xl md:text-7xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.lead}</p>
            <div className="mt-8"><RequestDialog {...dialog("hero")}><Button className="premium-button min-h-12 px-8" onClick={() => track("drop_interest_open", { source: "drop_hero" })}>{x.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog></div>
            <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-zinc-600">{x.note}</p>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-5 overflow-hidden rounded-[30px] border border-amber-300/18 bg-[radial-gradient(circle_at_82%_0%,rgba(245,190,52,.10),transparent_36%),#080808] p-7 sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:p-12">
              <div>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300/70">{x.firstLabel}</p>
                <h2 className="mt-4 text-4xl font-black tracking-[-.05em] sm:text-5xl">{x.product}</h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.productLead}</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {x.principles.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-white/[.08] bg-black/30 p-4 text-sm leading-6 text-zinc-300"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-300" />{item}</div>)}
                </div>
              </div>
              <div className="rounded-[26px] border border-white/[.09] bg-black/40 p-6 sm:p-7">
                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-zinc-600">{x.principleTitle}</p>
                <div className="mt-5 space-y-3">
                  {x.principles.map((item, i) => <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/[.08] bg-white/[.018] p-4"><span className="text-xs font-bold text-amber-300/65">0{i + 1}</span><span className="text-sm text-zinc-300">{item}</span></div>)}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] bg-[#050505] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><span className="eyebrow">Use case</span><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">{x.scenariosTitle}</h2></div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {x.scenarios.map((item, i) => { const Icon = scenarioIcons[i]; return <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="rounded-[24px] border border-white/[.09] bg-[#080808] p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/20 bg-amber-300/[.06] text-amber-300"><Icon className="h-5 w-5" /></span><h3 className="mt-6 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{item.text}</p></motion.div>; })}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><span className="eyebrow">Build path</span><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">{x.processTitle}</h2></div>
            <div className="relative mt-12 grid gap-3 md:grid-cols-4">
              <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px bg-gradient-to-r from-transparent via-amber-300/30 to-transparent md:block" />
              {x.process.map((item) => <div key={item.n} className="relative rounded-[22px] border border-white/[.09] bg-[#080808] p-5"><div className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/25 bg-black text-sm font-black text-amber-300">{item.n}</div><h3 className="mt-5 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-[30px] border border-amber-300/18 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,52,.12),transparent_45%),#080808] p-7 text-center sm:p-10 md:p-12">
              <ShieldCheck className="mx-auto h-6 w-6 text-amber-300" />
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black tracking-[-.04em] sm:text-5xl">{x.accessTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-400">{x.accessText}</p>
              <div className="mt-7"><RequestDialog {...dialog("footer")}><Button className="premium-button min-h-12 px-8" onClick={() => track("drop_interest_open", { source: "drop_footer" })}>{x.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></RequestDialog></div>
              <p className="mx-auto mt-4 max-w-xl text-xs leading-5 text-zinc-600">{x.note}</p>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
