"use client";

import { motion } from "framer-motion";
import { BarChart3, PackageCheck, Search, ShoppingBag, TrendingUp } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  desc: string;
  currentFocus: string;
  dacha: {
    status: string;
    label: string;
    title: string;
    outcome: string;
    detail: string;
    flow: string[];
    tags: string[];
  };
  international: {
    status: string;
    label: string;
    title: string;
    outcome: string;
    detail: string;
    flow: string[];
    tags: string[];
  };
  note: string;
}> = {
  en: {
    eyebrow: "Owned ecommerce ventures",
    title: "Real commerce projects, tested through economics first.",
    desc: "One existing Ukrainian ecommerce asset and one separate international experiment. The goal is not to build more stores for display, but to prove demand, margin and repeatable acquisition before scaling.",
    currentFocus: "Current operating loop",
    dacha: {
      status: "Active owned asset",
      label: "Ukraine ecommerce",
      title: "Dacha TV",
      outcome: "An existing ecommerce project now focused on qualified demand, checkout, supplier fulfilment, contribution margin and repeat purchase.",
      detail: "The product and catalog infrastructure already exists. Development serves acquisition and operations instead of becoming the goal itself.",
      flow: ["Google intent", "Product", "Checkout", "Fulfilment", "Margin", "Repeat"],
      tags: ["Production catalog", "Merchant feed", "Supplier flow", "Order system"],
    },
    international: {
      status: "Research / validation",
      label: "International ecommerce",
      title: "International Ecommerce Experiment",
      outcome: "No brand, SKU or store is invented in advance. Candidates are narrowed by demand, landed cost, shipping, margin, creative potential and payment feasibility.",
      detail: "A dedicated brand and minimal store are earned only after supplier economics and a winner candidate are strong enough to justify a controlled paid test.",
      flow: ["Research", "Economics", "Supplier", "Sample", "Creative", "Purchase"],
      tags: ["Winner-first", "Supplier RFQ", "Unit economics", "Controlled testing"],
    },
    note: "Private label, broader fulfilment and additional countries come after a product proves purchases and economics, not before.",
  },
  ua: {
    eyebrow: "Власні ecommerce-проєкти",
    title: "Реальна електронна комерція, де спочатку перевіряється економіка.",
    desc: "Один наявний український ecommerce-актив і один окремий міжнародний експеримент. Мета не в тому, щоб будувати магазини для вигляду, а в тому, щоб підтвердити попит, маржу та повторюване залучення до масштабування.",
    currentFocus: "Поточний операційний цикл",
    dacha: {
      status: "Активний власний проєкт",
      label: "Ecommerce в Україні",
      title: "Дача TV",
      outcome: "Наявний ecommerce-проєкт, де зараз головний фокус — якісний попит, оформлення замовлення, виконання постачальником, маржинальність і повторні покупки.",
      detail: "Продуктова та каталогова інфраструктура вже існує. Розробка підтримує залучення клієнтів і операції, а не стає самоціллю.",
      flow: ["Google-попит", "Товар", "Замовлення", "Виконання", "Маржа", "Повтор"],
      tags: ["Продакшн-каталог", "Merchant feed", "Постачальник", "Система замовлень"],
    },
    international: {
      status: "Дослідження / перевірка",
      label: "Міжнародний ecommerce",
      title: "Міжнародний ecommerce-експеримент",
      outcome: "Бренд, товар і магазин не вигадуються наперед. Кандидати відбираються за попитом, повною собівартістю, доставкою, маржею, потенціалом креативів і доступністю платежів.",
      detail: "Окремий бренд і мінімальний магазин з’являються лише після того, як постачальник, економіка та кандидат у переможці виправдовують контрольований платний тест.",
      flow: ["Дослідження", "Економіка", "Постачальник", "Зразок", "Креатив", "Покупка"],
      tags: ["Спочатку winner", "RFQ постачальника", "Юніт-економіка", "Контрольований тест"],
    },
    note: "Private label, ширший fulfilment і нові країни додаються після підтверджених покупок та економіки, а не до них.",
  },
  ru: {
    eyebrow: "Собственные ecommerce-проекты",
    title: "Реальная электронная коммерция, где сначала проверяется экономика.",
    desc: "Один существующий украинский ecommerce-актив и один отдельный международный эксперимент. Цель не в том, чтобы строить магазины для вида, а в том, чтобы подтвердить спрос, маржу и повторяемое привлечение до масштабирования.",
    currentFocus: "Текущий операционный цикл",
    dacha: {
      status: "Активный собственный проект",
      label: "Ecommerce в Украине",
      title: "Дача TV",
      outcome: "Существующий ecommerce-проект, где сейчас главный фокус — качественный спрос, оформление заказа, выполнение поставщиком, маржинальность и повторные покупки.",
      detail: "Продуктовая и каталоговая инфраструктура уже существует. Разработка поддерживает привлечение клиентов и операции, а не становится самоцелью.",
      flow: ["Google-спрос", "Товар", "Заказ", "Выполнение", "Маржа", "Повтор"],
      tags: ["Продакшн-каталог", "Merchant feed", "Поставщик", "Система заказов"],
    },
    international: {
      status: "Исследование / проверка",
      label: "Международный ecommerce",
      title: "Международный ecommerce-эксперимент",
      outcome: "Бренд, товар и магазин не придумываются заранее. Кандидаты отбираются по спросу, полной себестоимости, доставке, марже, потенциалу креативов и доступности платежей.",
      detail: "Отдельный бренд и минимальный магазин появляются только после того, как поставщик, экономика и кандидат в победители оправдывают контролируемый платный тест.",
      flow: ["Исследование", "Экономика", "Поставщик", "Образец", "Креатив", "Покупка"],
      tags: ["Сначала winner", "RFQ поставщика", "Юнит-экономика", "Контролируемый тест"],
    },
    note: "Private label, более широкий fulfilment и новые страны добавляются после подтверждённых покупок и экономики, а не до них.",
  },
};

function VentureCard({
  index,
  active,
  venture,
  currentFocus,
}: {
  index: number;
  active?: boolean;
  venture: {
    status: string;
    label: string;
    title: string;
    outcome: string;
    detail: string;
    flow: string[];
    tags: string[];
  };
  currentFocus: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: .55, delay: index * .06 }}
      className="relative overflow-hidden rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.04),rgba(255,255,255,.012)_48%,rgba(0,0,0,.42))] p-6 sm:p-8"
    >
      <div aria-hidden="true" className={`absolute -right-20 -top-24 h-72 w-72 rounded-full blur-[90px] ${active ? "bg-emerald-300/[.07]" : "bg-amber-300/[.06]"}`} />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.12em] ${active ? "border-emerald-300/18 bg-emerald-300/[.04] text-emerald-200/80" : "border-amber-300/18 bg-amber-300/[.04] text-amber-200/80"}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-emerald-300" : "bg-amber-300"}`} />
            {venture.status}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-600">{venture.label}</span>
          <span className="ml-auto text-[10px] tracking-[.18em] text-zinc-700">0{index + 1}</span>
        </div>

        <div className="mt-7 flex items-start gap-4">
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${active ? "border-emerald-300/16 bg-emerald-300/[.045] text-emerald-200" : "border-amber-300/16 bg-amber-300/[.045] text-amber-200"}`}>
            {active ? <ShoppingBag className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </span>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-.035em] text-zinc-100 sm:text-3xl">{venture.title}</h3>
            <p className="mt-3 text-base font-medium leading-7 text-zinc-200">{venture.outcome}</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-zinc-500">{venture.detail}</p>

        <div className="mt-6 rounded-2xl border border-white/[.07] bg-black/25 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.16em] text-zinc-600">
            {active ? <TrendingUp className="h-3.5 w-3.5" /> : <BarChart3 className="h-3.5 w-3.5" />}
            {currentFocus}
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {venture.flow.map((step, stepIndex) => (
              <div key={step} className="flex items-center gap-2">
                <span className="rounded-full border border-white/[.09] bg-white/[.025] px-3 py-1.5 text-[11px] text-zinc-300">{step}</span>
                {stepIndex < venture.flow.length - 1 ? <span className="text-zinc-800">→</span> : null}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {venture.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/[.08] bg-white/[.018] px-3 py-1.5 text-[11px] text-zinc-500">{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function OwnedVentures() {
  const { lang } = useI18n();
  const x = COPY[lang];

  return (
    <section id="owned-ventures" className="relative scroll-mt-24 overflow-hidden border-y border-white/[.06] bg-[#030303] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,.055),transparent_62%)]" aria-hidden="true" />
      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-amber-300/72">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-[clamp(2.4rem,4.5vw,4.25rem)] text-zinc-100">{x.title}</h2>
          <p className="section-lead mx-auto mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.desc}</p>
        </motion.div>

        <div className="mt-11 grid gap-5 lg:grid-cols-2">
          <VentureCard index={0} active venture={x.dacha} currentFocus={x.currentFocus} />
          <VentureCard index={1} venture={x.international} currentFocus={x.currentFocus} />
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl items-start gap-3 rounded-2xl border border-white/[.07] bg-white/[.015] p-4 sm:p-5">
          <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-amber-200/70" />
          <p className="text-xs leading-6 text-zinc-600">{x.note}</p>
        </div>
      </div>
    </section>
  );
}
