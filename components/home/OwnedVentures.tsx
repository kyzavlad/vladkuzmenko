"use client";

import { motion, useReducedMotion } from "framer-motion";
import { BarChart3, PackageCheck, Search, ShoppingBag, TrendingUp } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";

type Venture = {
  status: string;
  label: string;
  title: string;
  outcome: string;
  detail: string;
  flow: string[];
  tags: string[];
};

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  desc: string;
  currentFocus: string;
  dacha: Venture;
  international: Venture;
  note: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "Owned ecommerce",
    titleA: "A store has one job: ",
    titleB: "sell.",
    desc: "So these projects are judged by the market, not by how finished they look: demand, purchase, margin and repeat behaviour decide what earns more capital and attention.",
    currentFocus: "How the project becomes revenue",
    dacha: {
      status: "Active project",
      label: "Ukraine · Ecommerce",
      title: "Dacha TV",
      outcome: "An existing ecommerce asset being turned from a catalogue into a more predictable path from product intent to a completed order.",
      detail: "People already search for the products. The work now is to remove friction around discovery, product choice, checkout, fulfilment and the reasons to buy again.",
      flow: ["Search intent", "Product", "Order", "Fulfilment", "Margin", "Repeat"],
      tags: ["Google intent", "Production catalogue", "Merchant feed", "Order system"],
    },
    international: {
      status: "Research / validation",
      label: "International ecommerce",
      title: "The next international brand",
      outcome: "We are not looking for a pretty store idea. We are looking for a product the market is willing to validate with money.",
      detail: "Demand, landed cost, margin, supplier quality and creative potential are checked before time is spent on a brand or a full store. Only a strong candidate earns a sample and controlled paid test.",
      flow: ["Demand", "Economics", "Supplier", "Sample", "Creative", "Purchase"],
      tags: ["Winner-first", "Unit economics", "Supplier RFQ", "Controlled test"],
    },
    note: "Private label, broader fulfilment and more countries are rewards for proven purchases and economics — not the starting point.",
  },
  ua: {
    eyebrow: "Власний ecommerce",
    titleA: "У магазину одна робота: ",
    titleB: "продавати.",
    desc: "Тому ці проєкти оцінює ринок, а не зовнішня готовність: попит, покупка, маржа та повторна поведінка визначають, що отримує більше капіталу й уваги.",
    currentFocus: "Як проєкт перетворюється на виручку",
    dacha: {
      status: "Активний проєкт",
      label: "Україна · Ecommerce",
      title: "Дача TV",
      outcome: "Наявний ecommerce-актив, який перетворюємо з каталогу на більш передбачуваний шлях від наміру купити до виконаного замовлення.",
      detail: "Люди вже шукають ці товари. Тепер робота — прибрати тертя у пошуку, виборі товару, оформленні, виконанні замовлення та причинах купити знову.",
      flow: ["Пошуковий попит", "Товар", "Замовлення", "Виконання", "Маржа", "Повтор"],
      tags: ["Google intent", "Продакшн-каталог", "Merchant feed", "Система замовлень"],
    },
    international: {
      status: "Дослідження / перевірка",
      label: "Міжнародний ecommerce",
      title: "Наступний міжнародний бренд",
      outcome: "Ми шукаємо не красиву ідею магазину, а товар, який ринок готовий підтвердити грошима.",
      detail: "Попит, повна собівартість із доставкою, маржа, постачальник і потенціал креативів перевіряються до витрат часу на бренд і повний магазин. Лише сильний кандидат отримує зразок і контрольований платний тест.",
      flow: ["Попит", "Економіка", "Постачальник", "Зразок", "Креатив", "Покупка"],
      tags: ["Winner-first", "Юніт-економіка", "Supplier RFQ", "Контрольований тест"],
    },
    note: "Private label, ширший fulfilment і нові країни — це нагорода за підтверджені покупки та економіку, а не стартова точка.",
  },
  ru: {
    eyebrow: "Собственный ecommerce",
    titleA: "У магазина одна работа: ",
    titleB: "продавать.",
    desc: "Поэтому эти проекты оценивает рынок, а не внешняя готовность: спрос, покупка, маржа и повторное поведение решают, что получает больше капитала и внимания.",
    currentFocus: "Как проект превращается в выручку",
    dacha: {
      status: "Активный проект",
      label: "Украина · Ecommerce",
      title: "Дача TV",
      outcome: "Существующий ecommerce-актив, который превращаем из каталога в более предсказуемый путь от намерения купить до выполненного заказа.",
      detail: "Люди уже ищут эти товары. Теперь задача — убрать трение в поиске, выборе товара, оформлении, выполнении заказа и причинах купить снова.",
      flow: ["Поисковый спрос", "Товар", "Заказ", "Выполнение", "Маржа", "Повтор"],
      tags: ["Google intent", "Продакшн-каталог", "Merchant feed", "Система заказов"],
    },
    international: {
      status: "Исследование / проверка",
      label: "Международный ecommerce",
      title: "Следующий международный бренд",
      outcome: "Мы ищем не красивую идею магазина, а товар, который рынок готов подтвердить деньгами.",
      detail: "Спрос, полная себестоимость с доставкой, маржа, поставщик и потенциал креативов проверяются до затрат времени на бренд и полноценный магазин. Только сильный кандидат получает образец и контролируемый платный тест.",
      flow: ["Спрос", "Экономика", "Поставщик", "Образец", "Креатив", "Покупка"],
      tags: ["Winner-first", "Юнит-экономика", "Supplier RFQ", "Контролируемый тест"],
    },
    note: "Private label, более широкий fulfilment и новые страны — это награда за подтверждённые покупки и экономику, а не стартовая точка.",
  },
};

function VentureCard({ index, active, venture, currentFocus }: { index: number; active?: boolean; venture: Venture; currentFocus: string }) {
  const reduced = Boolean(useReducedMotion());
  const accent = active ? {
    border: "rgba(110,231,183,.18)",
    glow: "rgba(16,185,129,.16)",
    solid: "#6ee7b7",
    chip: "border-emerald-300/18 bg-emerald-300/[.045] text-emerald-100/80",
  } : {
    border: "rgba(251,191,36,.17)",
    glow: "rgba(245,158,11,.12)",
    solid: "#f6d365",
    chip: "border-amber-300/18 bg-amber-300/[.04] text-amber-100/80",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: .62, delay: index * .07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduced ? undefined : { y: -4 }}
      className="group relative overflow-hidden rounded-[34px] border p-5 shadow-[0_50px_140px_-72px_rgba(0,0,0,.96)] sm:p-7"
      style={{
        borderColor: accent.border,
        background: active
          ? "linear-gradient(145deg,rgba(110,231,183,.075),rgba(8,15,11,.92)_36%,rgba(2,4,3,.98)_78%)"
          : "linear-gradient(145deg,rgba(251,191,36,.055),rgba(13,12,8,.91)_34%,rgba(2,4,3,.98)_78%)",
      }}
    >
      <div aria-hidden="true" className="absolute -right-24 -top-28 h-80 w-80 rounded-full blur-[100px] transition-opacity duration-500 group-hover:opacity-100" style={{ background: `radial-gradient(circle,${accent.glow},transparent 68%)`, opacity: .78 }} />
      <div aria-hidden="true" className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.14em] ${accent.chip}`}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accent.solid, boxShadow: `0 0 12px ${accent.glow}` }} />
            {venture.status}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-[.17em] text-zinc-600">{venture.label}</span>
          <span className="ml-auto text-[10px] tracking-[.2em] text-zinc-700">0{index + 1}</span>
        </div>

        <div className="mt-7 flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border bg-black/30" style={{ borderColor: accent.border, color: accent.solid }}>
            {active ? <ShoppingBag className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </span>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-.035em] text-zinc-50 sm:text-3xl">{venture.title}</h3>
            <p className="mt-3 text-base font-medium leading-7 text-zinc-200">{venture.outcome}</p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-7 text-zinc-500">{venture.detail}</p>

        <div className="mt-6 rounded-[22px] border border-white/[.07] bg-black/30 p-4 sm:p-5">
          <div className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[.17em] text-zinc-600">
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
    <section id="owned-ventures" className="relative scroll-mt-24 overflow-hidden border-y border-white/[.06] bg-[#020403] py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute left-1/2 top-0 h-[720px] w-[1100px] max-w-[100vw] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(110,231,183,.105),rgba(212,175,55,.032)_38%,transparent_70%)]" />
        <div className="absolute left-1/2 top-12 h-px w-[min(820px,80vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-300/26 to-transparent shadow-[0_0_34px_rgba(16,185,129,.15)]" />
        <div className="absolute inset-0 opacity-[.022] mix-blend-soft-light" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.9'/%3E%3C/svg%3E\")", backgroundSize: "180px 180px" }} />
      </div>

      <div className="container relative z-10 mx-auto max-w-6xl px-4">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto max-w-4xl text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-emerald-200/72">{x.eyebrow}</span>
          <h2 className="section-title mt-4 text-[clamp(2.5rem,4.7vw,4.45rem)] text-zinc-100">
            {x.titleA}<em className="bg-gradient-to-br from-emerald-100 via-emerald-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{x.titleB}</em>
          </h2>
          <p className="section-lead mx-auto mt-5 max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{x.desc}</p>
        </motion.div>

        <div className="mt-11 grid gap-5 lg:grid-cols-2">
          <VentureCard index={0} active venture={x.dacha} currentFocus={x.currentFocus} />
          <VentureCard index={1} venture={x.international} currentFocus={x.currentFocus} />
        </div>

        <div className="mx-auto mt-6 flex max-w-5xl items-start gap-3 rounded-2xl border border-emerald-300/[.09] bg-emerald-300/[.018] p-4 sm:p-5">
          <PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-200/70" />
          <p className="text-xs leading-6 text-zinc-600">{x.note}</p>
        </div>
      </div>
    </section>
  );
}
