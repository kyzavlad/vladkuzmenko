"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Braces, Gauge, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/i18n-provider";
import { langHref, type Lang } from "@/lib/i18n";
import { track } from "@/lib/analytics";

const COPY: Record<Lang, {
  eyebrow: string;
  title: string;
  desc: string;
  productKicker: string;
  productTitle: string;
  productDesc: string;
  outcome: string;
  cta: string;
  labels: string[];
  whyTitle: string;
  why: { title: string; text: string }[];
  workflowTitle: string;
  workflow: { n: string; title: string; text: string }[];
  footerTitle: string;
  footerDesc: string;
}> = {
  en: {
    eyebrow: "Vlad Kuzmenko Software",
    title: "Software for decisions that should not depend on guesswork.",
    desc: "The first product focuses on a problem every website owner can understand: traffic arrives, but it is hard to see what is costing trust, visibility and the next action.",
    productKicker: "Website intelligence",
    productTitle: "VisibilityOS",
    productDesc: "An evidence-led website analysis layer that brings conversion, trust, technical health, SEO, AEO and AI-search readiness into one prioritised view.",
    outcome: "The goal is not another 40-page audit. It is a short list of the highest-value things to fix, with evidence attached to every finding.",
    cta: "Open VisibilityOS",
    labels: ["Conversion", "Trust", "SEO + AEO", "AI Search", "Technical"],
    whyTitle: "Why this matters now",
    why: [
      { title: "Traffic is more intentional", text: "AI-assisted search and answer engines mean fewer casual clicks. When a qualified visitor lands, the page has to make the decision easier." },
      { title: "Visibility is changing", text: "A website now has to be understandable not only to search engines, but also to systems that summarise and answer for the user." },
      { title: "Redesign is not diagnosis", text: "A prettier site can keep the same commercial problem. VisibilityOS starts with evidence before recommending what deserves work." },
    ],
    workflowTitle: "From URL to next action",
    workflow: [
      { n: "01", title: "Scan", text: "Capture the pages, structure and observable signals." },
      { n: "02", title: "Evidence", text: "Attach every finding to something visible or measurable." },
      { n: "03", title: "Prioritise", text: "Separate cosmetic noise from issues that can affect trust, discovery or conversion." },
      { n: "04", title: "Act", text: "Turn findings into a short implementation order." },
    ],
    footerTitle: "Start with the website you already have.",
    footerDesc: "VisibilityOS is the software direction. Client implementation remains available separately through Growth Systems.",
  },
  ua: {
    eyebrow: "Vlad Kuzmenko Software",
    title: "Software для рішень, які не мають залежати від здогадок.",
    desc: "Перший продукт вирішує зрозумілу власнику сайту задачу: трафік приходить, але незрозуміло, що саме коштує довіри, видимості та наступної дії.",
    productKicker: "Website intelligence",
    productTitle: "VisibilityOS",
    productDesc: "Evidence-led шар аналізу сайту, який об’єднує conversion, trust, technical health, SEO, AEO та готовність до AI-search в один пріоритетний розбір.",
    outcome: "Ціль — не ще один аудит на 40 сторінок. Ціль — короткий список того, що варто виправити першим, з evidence біля кожного висновку.",
    cta: "Відкрити VisibilityOS",
    labels: ["Conversion", "Trust", "SEO + AEO", "AI Search", "Technical"],
    whyTitle: "Чому це важливо зараз",
    why: [
      { title: "Трафік стає більш наміреним", text: "AI-assisted search та answer engines зменшують частку випадкових кліків. Коли якісний відвідувач приходить, сторінка має полегшувати рішення." },
      { title: "Видимість змінюється", text: "Сайт має бути зрозумілим не лише пошуковику, а й системам, які узагальнюють інформацію та відповідають замість списку посилань." },
      { title: "Редизайн — не діагностика", text: "Красивіший сайт може залишити ту саму комерційну проблему. VisibilityOS починає з evidence, а не з декоративних правок." },
    ],
    workflowTitle: "Від URL до наступної дії",
    workflow: [
      { n: "01", title: "Scan", text: "Зібрати сторінки, структуру та спостережувані сигнали." },
      { n: "02", title: "Evidence", text: "Прив’язати кожен висновок до видимого або вимірюваного доказу." },
      { n: "03", title: "Prioritise", text: "Відокремити косметику від проблем, що можуть впливати на trust, discovery або conversion." },
      { n: "04", title: "Act", text: "Перетворити findings у короткий порядок впровадження." },
    ],
    footerTitle: "Почніть із сайту, який уже є.",
    footerDesc: "VisibilityOS — software-напрям. Клієнтське впровадження окремо доступне через Growth Systems.",
  },
  ru: {
    eyebrow: "Vlad Kuzmenko Software",
    title: "Software для решений, которые не должны зависеть от догадок.",
    desc: "Первый продукт решает понятную владельцу сайта задачу: трафик приходит, но непонятно, что именно стоит доверия, видимости и следующего действия.",
    productKicker: "Website intelligence",
    productTitle: "VisibilityOS",
    productDesc: "Evidence-led слой анализа сайта, который объединяет conversion, trust, technical health, SEO, AEO и готовность к AI-search в один приоритетный разбор.",
    outcome: "Цель — не ещё один аудит на 40 страниц. Цель — короткий список того, что стоит исправить первым, с evidence возле каждого вывода.",
    cta: "Открыть VisibilityOS",
    labels: ["Conversion", "Trust", "SEO + AEO", "AI Search", "Technical"],
    whyTitle: "Почему это важно сейчас",
    why: [
      { title: "Трафик становится более намеренным", text: "AI-assisted search и answer engines уменьшают долю случайных кликов. Когда качественный посетитель приходит, страница должна облегчать решение." },
      { title: "Видимость меняется", text: "Сайт должен быть понятен не только поисковику, но и системам, которые суммируют информацию и отвечают вместо списка ссылок." },
      { title: "Редизайн — не диагностика", text: "Более красивый сайт может оставить ту же коммерческую проблему. VisibilityOS начинает с evidence, а не с декоративных правок." },
    ],
    workflowTitle: "От URL до следующего действия",
    workflow: [
      { n: "01", title: "Scan", text: "Собрать страницы, структуру и наблюдаемые сигналы." },
      { n: "02", title: "Evidence", text: "Привязать каждый вывод к видимому или измеряемому доказательству." },
      { n: "03", title: "Prioritise", text: "Отделить косметику от проблем, которые могут влиять на trust, discovery или conversion." },
      { n: "04", title: "Act", text: "Превратить findings в короткий порядок внедрения." },
    ],
    footerTitle: "Начните с сайта, который уже есть.",
    footerDesc: "VisibilityOS — software-направление. Клиентское внедрение отдельно доступно через Growth Systems.",
  },
};

const whyIcons = [Gauge, Bot, ShieldCheck];

export function ProductsPage() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const base = langHref(lang);
  const prefix = base === "/" ? "" : base;

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-20 pt-36 sm:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,52,.13),transparent_42%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200">
              <Braces className="h-3.5 w-3.5" /> {x.eyebrow}
            </span>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black tracking-[-.05em] sm:text-6xl md:text-7xl">{x.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-400 sm:text-lg sm:leading-8">{x.desc}</p>
          </div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-8 overflow-hidden rounded-[32px] border border-amber-300/20 bg-[radial-gradient(circle_at_78%_12%,rgba(245,190,52,.1),transparent_38%),#080808] p-7 sm:p-10 lg:grid-cols-[1.05fr_.95fr] lg:p-12">
              <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300/75">{x.productKicker}</p>
                <h2 className="mt-4 text-5xl font-black tracking-[-.05em] sm:text-6xl">{x.productTitle}</h2>
                <p className="mt-5 max-w-xl text-lg leading-8 text-zinc-200">{x.productDesc}</p>
                <p className="mt-5 max-w-xl text-sm leading-6 text-zinc-500">{x.outcome}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {x.labels.map((label) => <span key={label} className="rounded-full border border-white/10 bg-white/[.025] px-3 py-1.5 text-xs text-zinc-300">{label}</span>)}
                </div>
                <a href={`${prefix}/visibilityos`} onClick={() => track("product_open", { product: "visibilityos", source: "products_page" })} className="mt-8 inline-flex">
                  <Button className="premium-button h-auto min-h-12 px-8 py-3">{x.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </a>
              </motion.div>

              <div className="rounded-[26px] border border-white/[.09] bg-black/45 p-5 sm:p-6">
                <div className="flex items-center justify-between border-b border-white/[.08] pb-4">
                  <span className="text-sm font-bold">VisibilityOS / audit map</span>
                  <Sparkles className="h-4 w-4 text-amber-300" />
                </div>
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.02] px-4 py-3">
                  <Search className="h-4 w-4 text-amber-300" /><span className="text-sm text-zinc-500">yourwebsite.com</span>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {x.labels.slice(0, 4).map((label, i) => (
                    <div key={label} className="rounded-2xl border border-white/[.08] bg-white/[.018] p-4">
                      <div className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-600">0{i + 1}</div>
                      <div className="mt-2 text-sm font-semibold text-zinc-200">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] bg-[#050505] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="eyebrow">Context</span>
              <h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">{x.whyTitle}</h2>
            </div>
            <div className="mt-10 grid gap-4 lg:grid-cols-3">
              {x.why.map((item, i) => {
                const Icon = whyIcons[i];
                return <div key={item.title} className="rounded-[24px] border border-white/[.09] bg-[#080808] p-6"><Icon className="h-5 w-5 text-amber-300" /><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-400">{item.text}</p></div>;
              })}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center"><span className="eyebrow">Flow</span><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-5xl">{x.workflowTitle}</h2></div>
            <div className="mt-10 grid gap-3 md:grid-cols-4">
              {x.workflow.map((item) => <div key={item.n} className="rounded-[22px] border border-white/[.09] bg-[#080808] p-5"><div className="text-xs font-bold tracking-[.2em] text-amber-300/65">{item.n}</div><h3 className="mt-4 text-lg font-bold">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p></div>)}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.07] py-20 sm:py-24">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <h2 className="text-3xl font-black tracking-[-.04em] sm:text-5xl">{x.footerTitle}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-zinc-400">{x.footerDesc}</p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a href={`${prefix}/visibilityos`}><Button className="premium-button min-h-12 px-8">{x.cta}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
              <a href={`${prefix}/growth-systems`}><Button className="min-h-12 border border-white/15 bg-white/[.03] px-8 text-white hover:bg-white/[.08]">Growth Systems</Button></a>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
