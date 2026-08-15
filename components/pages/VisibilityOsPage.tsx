"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, CheckCircle, Eye, Gauge, Loader2, Search, ShieldCheck, Sparkles } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import { type Lang } from "@/lib/i18n";

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  secondary: string;
  demoTitle: string;
  demoLead: string;
  demoRows: { label: string; state: string; text: string }[];
  whyTitle: string;
  why: { title: string; text: string }[];
  outputTitle: string;
  output: string[];
  principlesTitle: string;
  principles: { title: string; text: string }[];
  formEyebrow: string;
  formTitle: string;
  formLead: string;
  website: string;
  name: string;
  email: string;
  context: string;
  submit: string;
  sending: string;
  error: string;
  successTitle: string;
  success: string;
  note: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "VisibilityOS · website intelligence",
    titleA: "Find what is costing your website ",
    titleB: "trust, visibility and the next action.",
    lead: "VisibilityOS brings conversion, trust, technical health, SEO, AEO and AI-search readiness into one evidence-led view, then separates what matters from what is merely cosmetic.",
    secondary: "See the analysis model",
    demoTitle: "The product is organised around evidence, not generic advice.",
    demoLead: "Every finding should answer three questions: what was observed, why it matters and what deserves attention first.",
    demoRows: [
      { label: "Conversion path", state: "Review", text: "Offer clarity, CTA hierarchy, form friction and the handoff after intent." },
      { label: "Trust layer", state: "Evidence", text: "Proof, authority, consistency and whether the page makes the decision safer." },
      { label: "AI + Search", state: "Visibility", text: "SEO, AEO, structured answers and whether machines can understand the page clearly." },
      { label: "Technical surface", state: "Health", text: "Mobile behaviour, metadata, crawlability and observable performance issues." },
    ],
    whyTitle: "A website now has two audiences: people and the systems that guide them.",
    why: [
      { title: "More intentional visits", text: "AI-assisted discovery can answer basic questions before the click. The visit that remains is more valuable and the page has to earn the next action." },
      { title: "Answer-engine visibility", text: "Clear structure, concise answers, proof and machine-readable context increasingly matter alongside traditional SEO." },
      { title: "Conversion is still the home base", text: "Visibility only matters if the page can convert interest into a useful next step once someone arrives." },
    ],
    outputTitle: "What a useful result should give you",
    output: ["A prioritised issue list, not a wall of observations", "Evidence attached to every important finding", "Screenshots and page-level context where relevant", "A clear order: fix now, fix later, ignore", "A repeatable baseline for comparing the next scan"],
    principlesTitle: "Product rules",
    principles: [
      { title: "Evidence first", text: "AI can explain a finding, but it should not invent the finding." },
      { title: "Commercial priority", text: "A small conversion blocker can matter more than ten cosmetic inconsistencies." },
      { title: "Human-readable", text: "The report should make sense to an owner, marketer or operator without an SEO dictionary." },
    ],
    formEyebrow: "Early access",
    formTitle: "Start with one real website.",
    formLead: "Send the URL. Early scans are reviewed personally while the product model is being tightened, so the output can be compared against real human judgement.",
    website: "Website URL *", name: "Name *", email: "Email *", context: "What should the website be doing better?", submit: "Request a VisibilityOS scan", sending: "Sending…", error: "Add the website URL, your name and email.", successTitle: "Website received", success: "The request is in. You will get the next step from the actual site context.", note: "This is early access. The current scan is reviewed personally; it is not presented as a fully autonomous audit engine yet.",
  },
  ua: {
    eyebrow: "VisibilityOS · website intelligence",
    titleA: "Знайдіть, де сайт втрачає ",
    titleB: "довіру, видимість і наступну дію.",
    lead: "VisibilityOS збирає conversion, trust, technical health, SEO, AEO та готовність до AI-search в один evidence-led розбір, а потім відділяє важливе від просто косметичного.",
    secondary: "Подивитися модель аналізу",
    demoTitle: "Продукт будується навколо evidence, а не загальних порад.",
    demoLead: "Кожен finding має відповідати на три питання: що побачили, чому це важливо і що варто робити першим.",
    demoRows: [
      { label: "Conversion path", state: "Review", text: "Зрозумілість офера, CTA-ієрархія, тертя у формах і передача після наміру." },
      { label: "Trust layer", state: "Evidence", text: "Proof, authority, послідовність і те, чи робить сторінка рішення безпечнішим." },
      { label: "AI + Search", state: "Visibility", text: "SEO, AEO, структуровані відповіді й наскільки чітко машини розуміють сторінку." },
      { label: "Technical surface", state: "Health", text: "Mobile-поведінка, metadata, crawlability та спостережувані performance-проблеми." },
    ],
    whyTitle: "У сайту тепер дві аудиторії: люди й системи, які приводять їх до рішення.",
    why: [
      { title: "Більш намірені візити", text: "AI-assisted discovery може відповісти на базові питання ще до кліку. Тому візит, що залишився, цінніший і сторінка має заслужити наступну дію." },
      { title: "Answer-engine visibility", text: "Чітка структура, короткі відповіді, proof і machine-readable context стають важливими разом із класичним SEO." },
      { title: "Conversion лишається home base", text: "Видимість має сенс лише якщо сторінка може перетворити інтерес у корисний наступний крок." },
    ],
    outputTitle: "Що має дати корисний результат",
    output: ["Пріоритетний список проблем замість стіни спостережень", "Evidence біля кожного важливого finding", "Скріншоти та контекст конкретної сторінки", "Чіткий порядок: зараз, пізніше, ігнорувати", "Базову точку для порівняння наступного scan"],
    principlesTitle: "Правила продукту",
    principles: [
      { title: "Evidence first", text: "AI може пояснити finding, але не має вигадувати сам finding." },
      { title: "Commercial priority", text: "Один conversion blocker може бути важливішим за десять косметичних невідповідностей." },
      { title: "Human-readable", text: "Звіт має бути зрозумілим власнику, маркетологу чи оператору без словника SEO." },
    ],
    formEyebrow: "Ранній доступ",
    formTitle: "Почніть з одного реального сайту.",
    formLead: "Надішліть URL. Ранні scans переглядаються особисто, поки продуктова модель посилюється й порівнюється з реальною людською оцінкою.",
    website: "URL сайту *", name: "Ім’я *", email: "Email *", context: "Що сайт має робити краще?", submit: "Запросити VisibilityOS scan", sending: "Надсилаю…", error: "Додайте URL сайту, ім’я та email.", successTitle: "Сайт отримано", success: "Запит у системі. Наступний крок буде сформований із контексту реального сайту.", note: "Це ранній доступ. Поточний scan переглядається особисто й поки не подається як повністю автономний audit engine.",
  },
  ru: {
    eyebrow: "VisibilityOS · website intelligence",
    titleA: "Найдите, где сайт теряет ",
    titleB: "доверие, видимость и следующее действие.",
    lead: "VisibilityOS собирает conversion, trust, technical health, SEO, AEO и готовность к AI-search в один evidence-led разбор, а затем отделяет важное от просто косметического.",
    secondary: "Посмотреть модель анализа",
    demoTitle: "Продукт строится вокруг evidence, а не общих советов.",
    demoLead: "Каждый finding должен отвечать на три вопроса: что увидели, почему это важно и что стоит делать первым.",
    demoRows: [
      { label: "Conversion path", state: "Review", text: "Понятность оффера, CTA-иерархия, трение в формах и передача после намерения." },
      { label: "Trust layer", state: "Evidence", text: "Proof, authority, последовательность и то, делает ли страница решение безопаснее." },
      { label: "AI + Search", state: "Visibility", text: "SEO, AEO, структурированные ответы и насколько ясно машины понимают страницу." },
      { label: "Technical surface", state: "Health", text: "Mobile-поведение, metadata, crawlability и наблюдаемые performance-проблемы." },
    ],
    whyTitle: "У сайта теперь две аудитории: люди и системы, которые приводят их к решению.",
    why: [
      { title: "Более намеренные визиты", text: "AI-assisted discovery может ответить на базовые вопросы ещё до клика. Поэтому оставшийся визит ценнее и страница должна заслужить следующее действие." },
      { title: "Answer-engine visibility", text: "Чёткая структура, короткие ответы, proof и machine-readable context становятся важными вместе с классическим SEO." },
      { title: "Conversion остаётся home base", text: "Видимость имеет смысл только если страница может превратить интерес в полезный следующий шаг." },
    ],
    outputTitle: "Что должен дать полезный результат",
    output: ["Приоритетный список проблем вместо стены наблюдений", "Evidence возле каждого важного finding", "Скриншоты и контекст конкретной страницы", "Чёткий порядок: сейчас, позже, игнорировать", "Базовую точку для сравнения следующего scan"],
    principlesTitle: "Правила продукта",
    principles: [
      { title: "Evidence first", text: "AI может объяснить finding, но не должен придумывать сам finding." },
      { title: "Commercial priority", text: "Один conversion blocker может быть важнее десяти косметических несоответствий." },
      { title: "Human-readable", text: "Отчёт должен быть понятен владельцу, маркетологу или оператору без словаря SEO." },
    ],
    formEyebrow: "Ранний доступ",
    formTitle: "Начните с одного реального сайта.",
    formLead: "Отправьте URL. Ранние scans просматриваются лично, пока продуктовая модель усиливается и сравнивается с реальной человеческой оценкой.",
    website: "URL сайта *", name: "Имя *", email: "Email *", context: "Что сайт должен делать лучше?", submit: "Запросить VisibilityOS scan", sending: "Отправляю…", error: "Добавьте URL сайта, имя и email.", successTitle: "Сайт получен", success: "Запрос в системе. Следующий шаг будет сформирован из контекста реального сайта.", note: "Это ранний доступ. Текущий scan просматривается лично и пока не подаётся как полностью автономный audit engine.",
  },
};

const whyIcons = [Eye, Bot, Gauge];

export function VisibilityOsPage() {
  const { lang } = useI18n();
  const x = COPY[lang];
  const [form, setForm] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);
  const set = (k: string, val: string) => setForm((p) => ({ ...p, [k]: val }));
  const valid = !!form.website?.trim() && !!form.name?.trim() && !!form.email?.trim();

  const submit = async () => {
    if (!valid) { setError(true); return; }
    setSubmitting(true); setError(false);
    const ok = await submitLead({ intent: "visibilityos_audit_request", language: lang, buttonLabel: "VisibilityOS — early scan", ...form });
    setSubmitting(false);
    if (ok) setDone(true); else setError(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-20 pt-36 sm:pt-44">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(245,190,52,.14),transparent_42%)]" />
          <div className="container relative mx-auto max-w-6xl px-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-300/[.06] px-3 py-1.5 text-xs font-bold uppercase tracking-[.18em] text-amber-200"><Sparkles className="h-3.5 w-3.5" />{x.eyebrow}</span>
            <h1 className="mx-auto mt-6 max-w-5xl text-4xl font-black tracking-[-.05em] sm:text-6xl md:text-7xl">{x.titleA}<span className="gradient-gold-text">{x.titleB}</span></h1>
            <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">{x.lead}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><a href="#scan"><Button className="premium-button min-h-12 px-8">{x.submit}<ArrowRight className="ml-2 h-4 w-4" /></Button></a><a href="#model"><Button variant="outline" className="min-h-12 border-white/15 bg-white/[.025] px-8 text-white hover:bg-white/[.07]">{x.secondary}</Button></a></div>
          </div>
        </section>

        <section id="model" className="scroll-mt-24 border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div><span className="eyebrow">Analysis model</span><h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.demoTitle}</h2><p className="mt-5 text-base leading-7 text-zinc-400">{x.demoLead}</p></div>
              <div className="overflow-hidden rounded-[28px] border border-white/[.1] bg-[#070707] shadow-[0_30px_90px_rgba(0,0,0,.45)]">
                <div className="flex items-center justify-between border-b border-white/[.08] px-5 py-4"><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-amber-300"/><span className="text-xs font-bold">VisibilityOS</span></div><span className="text-[10px] font-bold uppercase tracking-[.18em] text-zinc-700">example analysis map</span></div>
                <div className="p-5 sm:p-6"><div className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-black/40 px-4 py-3"><Search className="h-4 w-4 text-amber-300"/><span className="text-sm text-zinc-600">https://yourwebsite.com</span><span className="ml-auto rounded-full border border-amber-300/20 bg-amber-300/[.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-amber-200">scan</span></div><div className="mt-4 space-y-3">{x.demoRows.map((row, i) => <div key={row.label} className="grid gap-3 rounded-2xl border border-white/[.08] bg-white/[.018] p-4 sm:grid-cols-[1fr_auto] sm:items-start"><div><div className="flex items-center gap-2"><span className="text-[10px] font-bold tracking-[.18em] text-zinc-700">0{i+1}</span><h3 className="text-sm font-bold text-zinc-200">{row.label}</h3></div><p className="mt-2 text-xs leading-5 text-zinc-500">{row.text}</p></div><span className="w-fit rounded-full border border-white/10 bg-white/[.025] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.14em] text-zinc-500">{row.state}</span></div>)}</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[.07] bg-[#050505] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4"><div className="mx-auto max-w-4xl text-center"><span className="eyebrow">Why now</span><h2 className="mt-4 text-3xl font-black tracking-[-.045em] sm:text-5xl">{x.whyTitle}</h2></div><div className="mt-10 grid gap-4 lg:grid-cols-3">{x.why.map((item,i)=>{const Icon=whyIcons[i];return <div key={item.title} className="rounded-[24px] border border-white/[.09] bg-[#080808] p-6"><Icon className="h-5 w-5 text-amber-300"/><h3 className="mt-5 text-xl font-bold">{item.title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{item.text}</p></div>})}</div></div>
        </section>

        <section className="border-b border-white/[.07] py-20 sm:py-28">
          <div className="container mx-auto max-w-6xl px-4"><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-[28px] border border-amber-300/16 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.09),transparent_42%),#080808] p-7 sm:p-9"><ShieldCheck className="h-6 w-6 text-amber-300"/><h2 className="mt-5 text-3xl font-black tracking-[-.04em]">{x.outputTitle}</h2><div className="mt-6 space-y-4">{x.output.map((item)=><div key={item} className="flex gap-3 text-sm leading-6 text-zinc-300"><Check className="mt-1 h-4 w-4 shrink-0 text-amber-300"/>{item}</div>)}</div></div><div><h2 className="text-3xl font-black tracking-[-.04em]">{x.principlesTitle}</h2><div className="mt-5 space-y-3">{x.principles.map((item)=><div key={item.title} className="rounded-[22px] border border-white/[.09] bg-[#080808] p-5"><h3 className="font-bold text-zinc-100">{item.title}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{item.text}</p></div>)}</div></div></div></div>
        </section>

        <section id="scan" className="scroll-mt-24 py-20 sm:py-28">
          <div className="container mx-auto max-w-5xl px-4"><div className="grid overflow-hidden rounded-[30px] border border-amber-300/18 bg-[radial-gradient(circle_at_20%_0%,rgba(245,190,52,.12),transparent_40%),#080808] lg:grid-cols-[.8fr_1.2fr]"><div className="border-b border-white/[.07] p-7 sm:p-9 lg:border-b-0 lg:border-r"><p className="text-xs font-bold uppercase tracking-[.2em] text-amber-300/75">{x.formEyebrow}</p><h2 className="mt-4 text-3xl font-black tracking-[-.04em] sm:text-4xl">{x.formTitle}</h2><p className="mt-4 text-sm leading-6 text-zinc-400">{x.formLead}</p><p className="mt-6 text-xs leading-5 text-zinc-600">{x.note}</p></div><div className="p-7 sm:p-9">{done?<div className="flex min-h-[330px] flex-col items-center justify-center text-center"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-amber-300/20 bg-amber-300/[.07] text-amber-300"><CheckCircle className="h-6 w-6"/></span><h3 className="mt-5 text-2xl font-black">{x.successTitle}</h3><p className="mt-3 max-w-md text-sm leading-6 text-zinc-500">{x.success}</p></div>:<div className="grid gap-4"><Input value={form.website||""} onChange={(e)=>set("website",e.target.value)} placeholder={x.website} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600"/><div className="grid gap-4 sm:grid-cols-2"><Input value={form.name||""} onChange={(e)=>set("name",e.target.value)} placeholder={x.name} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600"/><Input type="email" value={form.email||""} onChange={(e)=>set("email",e.target.value)} placeholder={x.email} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600"/></div><Input value={form.context||""} onChange={(e)=>set("context",e.target.value)} placeholder={x.context} className="h-12 border-white/10 bg-white/[.035] text-white placeholder:text-zinc-600"/>{error&&<p className="text-sm text-red-400">{x.error}</p>}<Button onClick={submit} disabled={submitting||!valid} className="premium-button min-h-12 w-full text-base disabled:opacity-50">{submitting?<><Loader2 className="mr-2 h-5 w-5 animate-spin"/>{x.sending}</>:<><Search className="mr-2 h-5 w-5"/>{x.submit}</>}</Button></div>}</div></div></div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
