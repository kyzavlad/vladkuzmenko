"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Globe2,
  Loader2,
  MapPin,
  MonitorCheck,
  RefreshCw,
  Route,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FooterSection } from "@/components/FooterSection";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import type { Lang } from "@/lib/i18n";
import type {
  GrowthAction,
  ScanPageSummary,
  VisibilitySiteScanResult,
} from "@/lib/visibilityos-scan";

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  lead: string;
  support: string;
  scanCta: string;
  workspaceCta: string;
  live: string;
  scanTitle: string;
  scanLead: string;
  url: string;
  service: string;
  servicePlaceholder: string;
  location: string;
  locationPlaceholder: string;
  locationHint: string;
  competitors: string;
  competitorPlaceholder: string;
  scan: string;
  scanning: string;
  scanNote: string;
  errorTitle: string;
  score: string;
  sampled: string;
  discovered: string;
  robots: string;
  sitemap: string;
  found: string;
  review: string;
  pillars: string;
  search: string;
  local: string;
  conversion: string;
  trust: string;
  notApplicable: string;
  queueEyebrow: string;
  queueTitle: string;
  queueLead: string;
  queueEmpty: string;
  why: string;
  evidence: string;
  nextMove: string;
  impact: string;
  confidence: string;
  effort: string;
  pages: string;
  pagesLead: string;
  serviceMatch: string;
  locationMatch: string;
  competitorsTitle: string;
  competitorsLead: string;
  boundaries: string;
  scanAnother: string;
  systemEyebrow: string;
  systemTitle: string;
  systemLead: string;
  steps: { label: string; title: string; text: string }[];
  openWorkspace: string;
  createAccount: string;
  implementation: string;
  implementationLead: string;
  bookCall: string;
  faqEyebrow: string;
  faqTitle: string;
  faq: { q: string; a: string }[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    eyebrow: "VisibilityOS · Public evidence → verified action",
    titleA: "See what the market",
    titleB: "can actually understand.",
    lead: "Scan the public site, turn observable gaps into a Growth Queue, save the project and verify what actually changed after implementation.",
    support: "No invented rankings, traffic or revenue. VisibilityOS separates what public evidence can prove from what needs first-party search data or human judgment.",
    scanCta: "Run free Visibility Map",
    workspaceCta: "Open live workspace",
    live: "Live product · account + recurring monitoring",
    scanTitle: "Build the baseline in real market context",
    scanLead: "Add the offer you want to win. Add a city only when the business is genuinely local; leave it blank or use Worldwide for non-local work.",
    url: "Website URL",
    service: "Target service / offer",
    servicePlaceholder: "AI automation, roof repair, dental implants…",
    location: "City / service area",
    locationPlaceholder: "Kharkiv, London, Worldwide…",
    locationHint: "Worldwide/global/remote is treated as non-local, not as a city.",
    competitors: "Competitor URLs (optional, up to 2)",
    competitorPlaceholder: "competitor.com",
    scan: "Build Visibility Map",
    scanning: "Mapping public evidence…",
    scanNote: "Public pages only. The scan samples up to five same-site pages plus robots/sitemap and never logs into the target site.",
    errorTitle: "The scan could not complete",
    score: "Observable readiness",
    sampled: "Pages sampled",
    discovered: "Pages discovered",
    robots: "Robots",
    sitemap: "Sitemap",
    found: "Found",
    review: "Review",
    pillars: "Visibility layers",
    search: "Search & crawl",
    local: "Local relevance",
    conversion: "Conversion path",
    trust: "Trust & entity",
    notApplicable: "N/A",
    queueEyebrow: "Growth Queue",
    queueTitle: "Work the highest-confidence evidence first.",
    queueLead: "Each item is evidence-backed. In the workspace it moves through Plan → In progress → Done → automatic verification.",
    queueEmpty: "No active Growth Queue items were generated from this scan. That means the sampled public evidence is already strong, not that rankings or revenue are guaranteed.",
    why: "Why it matters",
    evidence: "Observed evidence",
    nextMove: "Recommended move",
    impact: "Impact",
    confidence: "Confidence",
    effort: "Effort",
    pages: "Page coverage",
    pagesLead: "What the scanner sampled and whether the target service/location is visible in each page surface.",
    serviceMatch: "Service",
    locationMatch: "Location",
    competitorsTitle: "Competitive context",
    competitorsLead: "Same public checks and scoring model. Use the evidence gap as a clue, never as a ranking claim.",
    boundaries: "What this scan does not pretend to know",
    scanAnother: "Scan another site",
    systemEyebrow: "The live operating loop",
    systemTitle: "The free scan is the front door. The workspace is the product.",
    systemLead: "Save the baseline, execute the queue, verify completed changes and let server monitoring catch material regressions without keeping a browser open.",
    steps: [
      { label: "01", title: "Map", text: "Create a public Visibility Map with service, location and competitor context." },
      { label: "02", title: "Save", text: "Create an account and keep the project, scan history and evidence instead of starting over." },
      { label: "03", title: "Execute", text: "Move Growth Queue work through Planned, In progress and Done." },
      { label: "04", title: "Verify + monitor", text: "Done triggers a fresh evidence check. Daily health and weekly full scans continue server-side." },
    ],
    openWorkspace: "Open VisibilityOS workspace",
    createAccount: "Create account & save projects",
    implementation: "Want us to implement the queue?",
    implementationLead: "Use the evidence as a scoped starting point for SEO, conversion, web or automation implementation instead of paying for another disconnected audit.",
    bookCall: "Discuss implementation",
    faqEyebrow: "Methodology",
    faqTitle: "Clear evidence. Clear limits.",
    faq: [
      { q: "Does VisibilityOS show my real Google ranking?", a: "No. A public-site scan cannot prove live rankings or query performance. Those require connected first-party data or a compliant search-results source." },
      { q: "What happens after I mark a task Done?", a: "The workspace queues a full evidence re-check. If the issue remains, the task reopens. If the evidence is gone, it becomes Verified." },
      { q: "Do I need n8n to use VisibilityOS?", a: "No. Core monitoring is server-native. Your account, history, verification and scheduled daily/weekly scans continue without a personal automation server." },
      { q: "What does Local relevance mean for a global business?", a: "Nothing is forced. Blank, Worldwide, Global or Remote context disables the local pillar instead of pretending that a global service needs city landing pages." },
    ],
  },
  ua: {
    eyebrow: "VisibilityOS · Public evidence → verified action",
    titleA: "Побачте, що ринок",
    titleB: "реально може зрозуміти.",
    lead: "Проскануйте публічний сайт, перетворіть observable gaps на Growth Queue, збережіть проєкт і перевіряйте, що реально змінилось після впровадження.",
    support: "Без вигаданих rankings, traffic чи revenue. VisibilityOS відділяє те, що може довести public evidence, від first-party search data та human judgment.",
    scanCta: "Безкоштовний Visibility Map",
    workspaceCta: "Відкрити live workspace",
    live: "Live product · account + recurring monitoring",
    scanTitle: "Побудуйте baseline у реальному market context",
    scanLead: "Додайте офер, який хочете просувати. Місто вказуйте лише для справді локального бізнесу; для non-local залиште поле порожнім або Worldwide.",
    url: "URL сайту",
    service: "Цільова послуга / офер",
    servicePlaceholder: "AI automation, ремонт даху, імплантація…",
    location: "Місто / зона роботи",
    locationPlaceholder: "Харків, London, Worldwide…",
    locationHint: "Worldwide/global/remote сприймається як non-local context, а не як місто.",
    competitors: "URL конкурентів (опційно, до 2)",
    competitorPlaceholder: "competitor.com",
    scan: "Побудувати Visibility Map",
    scanning: "Збираємо public evidence…",
    scanNote: "Лише публічні сторінки. Скан бере до п’яти сторінок плюс robots/sitemap і ніколи не входить в target website.",
    errorTitle: "Скан не вдалося завершити",
    score: "Observable readiness",
    sampled: "Сторінок у вибірці",
    discovered: "Сторінок знайдено",
    robots: "Robots",
    sitemap: "Sitemap",
    found: "Знайдено",
    review: "Перевірити",
    pillars: "Visibility layers",
    search: "Search & crawl",
    local: "Local relevance",
    conversion: "Conversion path",
    trust: "Trust & entity",
    notApplicable: "N/A",
    queueEyebrow: "Growth Queue",
    queueTitle: "Спочатку працюйте з evidence найвищої confidence.",
    queueLead: "Кожна задача має evidence. У workspace вона проходить Plan → In progress → Done → automatic verification.",
    queueEmpty: "Цей scan не створив активних Growth Queue задач. Це означає сильний sampled public evidence, а не гарантію rankings чи revenue.",
    why: "Чому це важливо",
    evidence: "Observed evidence",
    nextMove: "Що зробити",
    impact: "Вплив",
    confidence: "Впевненість",
    effort: "Зусилля",
    pages: "Page coverage",
    pagesLead: "Що просканував VisibilityOS і чи видно цільову послугу/локацію на кожній surface.",
    serviceMatch: "Послуга",
    locationMatch: "Локація",
    competitorsTitle: "Competitive context",
    competitorsLead: "Ті самі public checks і scoring model. Evidence gap — підказка, а не ranking claim.",
    boundaries: "Чого цей scan не вдає, що знає",
    scanAnother: "Просканувати інший сайт",
    systemEyebrow: "Live operating loop",
    systemTitle: "Free scan — це вхід. Workspace — це продукт.",
    systemLead: "Збережіть baseline, виконуйте queue, перевіряйте completed changes і дозвольте server monitoring ловити material regressions без відкритої вкладки.",
    steps: [
      { label: "01", title: "Map", text: "Побудуйте Visibility Map із service, location та competitor context." },
      { label: "02", title: "Save", text: "Створіть account і зберігайте project, scan history та evidence." },
      { label: "03", title: "Execute", text: "Проводьте Growth Queue через Planned, In progress та Done." },
      { label: "04", title: "Verify + monitor", text: "Done запускає evidence re-check. Daily health і weekly full scan далі працюють server-side." },
    ],
    openWorkspace: "Відкрити VisibilityOS workspace",
    createAccount: "Створити акаунт і зберігати проєкти",
    implementation: "Потрібно впровадити Growth Queue?",
    implementationLead: "Використайте evidence як scoped starting point для SEO, conversion, web або automation implementation замість ще одного відірваного аудиту.",
    bookCall: "Обговорити implementation",
    faqEyebrow: "Методологія",
    faqTitle: "Чіткий evidence. Чіткі межі.",
    faq: [
      { q: "VisibilityOS показує реальну позицію в Google?", a: "Ні. Public-site scan не може довести live rankings чи query performance. Для цього потрібні connected first-party data або compliant search-results source." },
      { q: "Що відбувається після Done?", a: "Workspace ставить full evidence re-check. Якщо проблема лишилась, задача reopened. Якщо evidence зник — Verified." },
      { q: "Для VisibilityOS потрібен n8n?", a: "Ні. Core monitoring server-native. Account, history, verification та daily/weekly scheduled scans працюють без персонального automation server." },
      { q: "Що з Local relevance для глобального бізнесу?", a: "Local layer не нав’язується. Blank, Worldwide, Global або Remote context вимикає local pillar замість штучних city landing pages." },
    ],
  },
  ru: {
    eyebrow: "VisibilityOS · Public evidence → verified action",
    titleA: "Посмотрите, что рынок",
    titleB: "реально может понять.",
    lead: "Просканируйте публичный сайт, превратите observable gaps в Growth Queue, сохраните проект и проверяйте, что реально изменилось после внедрения.",
    support: "Без выдуманных rankings, traffic или revenue. VisibilityOS отделяет то, что может доказать public evidence, от first-party search data и human judgment.",
    scanCta: "Бесплатный Visibility Map",
    workspaceCta: "Открыть live workspace",
    live: "Live product · account + recurring monitoring",
    scanTitle: "Постройте baseline в реальном market context",
    scanLead: "Добавьте офер, который хотите продвигать. Город указывайте только для действительно локального бизнеса; для non-local оставьте поле пустым или Worldwide.",
    url: "URL сайта",
    service: "Целевая услуга / офер",
    servicePlaceholder: "AI automation, ремонт крыши, имплантация…",
    location: "Город / зона работы",
    locationPlaceholder: "Харьков, London, Worldwide…",
    locationHint: "Worldwide/global/remote считается non-local context, а не городом.",
    competitors: "URL конкурентов (необязательно, до 2)",
    competitorPlaceholder: "competitor.com",
    scan: "Построить Visibility Map",
    scanning: "Собираем public evidence…",
    scanNote: "Только публичные страницы. Скан берёт до пяти страниц плюс robots/sitemap и никогда не входит в target website.",
    errorTitle: "Скан не удалось завершить",
    score: "Observable readiness",
    sampled: "Страниц в выборке",
    discovered: "Страниц найдено",
    robots: "Robots",
    sitemap: "Sitemap",
    found: "Найдено",
    review: "Проверить",
    pillars: "Visibility layers",
    search: "Search & crawl",
    local: "Local relevance",
    conversion: "Conversion path",
    trust: "Trust & entity",
    notApplicable: "N/A",
    queueEyebrow: "Growth Queue",
    queueTitle: "Сначала работайте с evidence самой высокой confidence.",
    queueLead: "Каждая задача подкреплена evidence. В workspace она проходит Plan → In progress → Done → automatic verification.",
    queueEmpty: "Этот scan не создал активных Growth Queue задач. Это означает сильный sampled public evidence, а не гарантию rankings или revenue.",
    why: "Почему это важно",
    evidence: "Observed evidence",
    nextMove: "Что сделать",
    impact: "Влияние",
    confidence: "Уверенность",
    effort: "Затраты",
    pages: "Page coverage",
    pagesLead: "Что просканировал VisibilityOS и видны ли целевая услуга/локация на каждой surface.",
    serviceMatch: "Услуга",
    locationMatch: "Локация",
    competitorsTitle: "Competitive context",
    competitorsLead: "Те же public checks и scoring model. Evidence gap — подсказка, а не ranking claim.",
    boundaries: "Чего этот scan не делает вид, что знает",
    scanAnother: "Просканировать другой сайт",
    systemEyebrow: "Live operating loop",
    systemTitle: "Free scan — это вход. Workspace — это продукт.",
    systemLead: "Сохраните baseline, выполняйте queue, проверяйте completed changes и позвольте server monitoring ловить material regressions без открытой вкладки.",
    steps: [
      { label: "01", title: "Map", text: "Постройте Visibility Map с service, location и competitor context." },
      { label: "02", title: "Save", text: "Создайте account и храните project, scan history и evidence." },
      { label: "03", title: "Execute", text: "Проводите Growth Queue через Planned, In progress и Done." },
      { label: "04", title: "Verify + monitor", text: "Done запускает evidence re-check. Daily health и weekly full scan дальше работают server-side." },
    ],
    openWorkspace: "Открыть VisibilityOS workspace",
    createAccount: "Создать аккаунт и сохранять проекты",
    implementation: "Нужно внедрить Growth Queue?",
    implementationLead: "Используйте evidence как scoped starting point для SEO, conversion, web или automation implementation вместо ещё одного оторванного аудита.",
    bookCall: "Обсудить implementation",
    faqEyebrow: "Методология",
    faqTitle: "Чёткий evidence. Чёткие границы.",
    faq: [
      { q: "VisibilityOS показывает реальную позицию в Google?", a: "Нет. Public-site scan не может доказать live rankings или query performance. Для этого нужны connected first-party data либо compliant search-results source." },
      { q: "Что происходит после Done?", a: "Workspace ставит full evidence re-check. Если проблема осталась, задача reopened. Если evidence исчезло — Verified." },
      { q: "Для VisibilityOS нужен n8n?", a: "Нет. Core monitoring server-native. Account, history, verification и daily/weekly scheduled scans работают без персонального automation server." },
      { q: "Что с Local relevance для глобального бизнеса?", a: "Local layer не навязывается. Blank, Worldwide, Global или Remote context отключает local pillar вместо искусственных city landing pages." },
    ],
  },
};

const PANEL = "rounded-[30px] border border-white/[.085] bg-[linear-gradient(145deg,rgba(255,255,255,.036),rgba(255,255,255,.012)_55%,rgba(0,0,0,.35))]";

function localePath(lang: Lang, path: string) {
  return lang === "en" ? path : `/${lang}${path}`;
}

export function VisibilityOsMarketPageV3() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const [url, setUrl] = useState("");
  const [service, setService] = useState("");
  const [location, setLocation] = useState("");
  const [competitors, setCompetitors] = useState(["", ""]);
  const [showCompetitors, setShowCompetitors] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<VisibilitySiteScanResult | null>(null);

  const workspaceHref = localePath(lang, "/visibilityos/app");
  const sortedPages = useMemo(() => result?.pages || [], [result?.pages]);

  const runScan = async () => {
    if (!url.trim()) return;
    setScanning(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/visibilityos/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          service: service.trim(),
          location: location.trim(),
          competitors: competitors.map((item) => item.trim()).filter(Boolean),
          lang,
        }),
      });
      const payload = await response.json() as { ok?: boolean; result?: VisibilitySiteScanResult; error?: string };
      if (!response.ok || !payload.ok || !payload.result) throw new Error(payload.error || "scan_failed");
      setResult(payload.result);
      requestAnimationFrame(() => document.getElementById("visibility-results")?.scrollIntoView({ behavior: "smooth", block: "start" }));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "scan_failed");
    } finally {
      setScanning(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError("");
    setUrl("");
    setService("");
    setLocation("");
    setCompetitors(["", ""]);
    requestAnimationFrame(() => document.getElementById("visibility-scan")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020304] text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden border-b border-white/[.07] pb-24 pt-36 sm:pb-32 sm:pt-44">
          <Backdrop />
          <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-200">
                <CircleDot className="h-3.5 w-3.5" />{copy.live}
              </span>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[.25em] text-sky-200/70">{copy.eyebrow}</p>
              <h1 className="section-title mx-auto mt-4 max-w-4xl text-[clamp(3.2rem,7vw,7.2rem)] leading-[.91] tracking-[-.055em] text-zinc-100">
                {copy.titleA} <em className="bg-gradient-to-br from-sky-100 via-sky-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{copy.titleB}</em>
              </h1>
              <p className="mx-auto mt-7 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg sm:leading-9">{copy.lead}</p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-600">{copy.support}</p>
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <a href="#visibility-scan"><Button className="premium-button h-12 px-7"><ScanSearch className="mr-2 h-4 w-4" />{copy.scanCta}</Button></a>
                <a href={workspaceHref}><Button variant="outline" className="h-12 border-sky-300/18 bg-sky-300/[.045] px-7 text-sky-50 hover:border-amber-200/25 hover:bg-amber-200/[.055] hover:text-amber-50"><MonitorCheck className="mr-2 h-4 w-4" />{copy.workspaceCta}</Button></a>
              </div>
            </div>
          </div>
        </section>

        <section id="visibility-scan" className="relative scroll-mt-24 py-20 md:py-28">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-sky-200/70">Free Visibility Map</p>
              <h2 className="section-title mt-4 text-[clamp(2.5rem,5vw,4.7rem)] text-zinc-100">{copy.scanTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{copy.scanLead}</p>
            </div>
            <div className={`${PANEL} relative mx-auto mt-10 overflow-hidden p-5 sm:p-8`}>
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(56,189,248,.11),transparent_42%),radial-gradient(circle_at_92%_100%,rgba(212,175,55,.055),transparent_38%)]" />
              <div className="relative grid gap-5">
                <Field label={copy.url}><div className="relative mt-2"><Globe2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200/45" /><Input value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://example.com" className="h-12 border-white/10 bg-black/35 pl-11 text-white" /></div></Field>
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label={copy.service}><div className="relative mt-2"><Target className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-sky-200/45" /><Input value={service} onChange={(event) => setService(event.target.value)} placeholder={copy.servicePlaceholder} className="h-12 border-white/10 bg-black/35 pl-11 text-white" /></div></Field>
                  <Field label={copy.location} hint={copy.locationHint}><div className="relative mt-2"><MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-amber-200/50" /><Input value={location} onChange={(event) => setLocation(event.target.value)} placeholder={copy.locationPlaceholder} className="h-12 border-white/10 bg-black/35 pl-11 text-white" /></div></Field>
                </div>
                <button type="button" onClick={() => setShowCompetitors((value) => !value)} className="flex w-fit items-center gap-2 text-xs font-medium text-sky-200/75 transition hover:text-sky-100"><Users className="h-4 w-4" />{copy.competitors}<ChevronRight className={`h-3.5 w-3.5 transition-transform ${showCompetitors ? "rotate-90" : ""}`} /></button>
                {showCompetitors ? <div className="grid gap-3 rounded-2xl border border-white/[.07] bg-black/25 p-4 md:grid-cols-2">{competitors.map((value, index) => <Input key={index} value={value} onChange={(event) => setCompetitors((old) => old.map((item, itemIndex) => itemIndex === index ? event.target.value : item))} placeholder={copy.competitorPlaceholder} className="border-white/10 bg-black/35 text-white" />)}</div> : null}
                <Button onClick={() => void runScan()} disabled={scanning || !url.trim()} className="premium-button h-12 w-full disabled:opacity-50">{scanning ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{copy.scanning}</> : <><Search className="mr-2 h-4 w-4" />{copy.scan}</>}</Button>
                <div className="flex gap-2 text-xs leading-6 text-zinc-600"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-sky-300/55" /><p>{copy.scanNote}</p></div>
                {error ? <div className="rounded-2xl border border-red-300/15 bg-red-300/[.035] p-4"><div className="flex gap-3"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" /><div><p className="text-sm font-semibold text-red-200">{copy.errorTitle}</p><p className="mt-1 text-sm leading-6 text-zinc-400">{error}</p></div></div></div> : null}
              </div>
            </div>
          </div>
        </section>

        {result ? <Results result={result} copy={copy} workspaceHref={workspaceHref} onReset={reset} /> : null}

        <section className="relative border-t border-white/[.06] py-24 md:py-32">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[.23em] text-sky-200/70">{copy.systemEyebrow}</p>
              <h2 className="section-title mt-4 text-[clamp(2.6rem,5vw,4.8rem)] text-zinc-100">{copy.systemTitle}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-500 sm:text-base">{copy.systemLead}</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {copy.steps.map((step, index) => <LoopStep key={step.label} item={step} icon={[ScanSearch, BarChart3, Target, MonitorCheck][index] || Sparkles} />)}
            </div>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-[28px] border border-sky-300/12 bg-[linear-gradient(135deg,rgba(56,189,248,.055),rgba(212,175,55,.035))] p-6 text-center sm:p-8 md:flex-row md:text-left">
              <div><p className="text-sm font-semibold text-zinc-100">VisibilityOS Workspace</p><p className="mt-2 text-sm leading-7 text-zinc-500">{copy.createAccount}</p></div>
              <a href={workspaceHref} className="shrink-0"><Button className="premium-button h-11 px-6">{copy.openWorkspace}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.06] py-20 md:py-24">
          <div className="container mx-auto max-w-5xl px-4 sm:px-6">
            <div className={`${PANEL} flex flex-col items-start justify-between gap-7 p-6 sm:p-8 md:flex-row md:items-center`}>
              <div className="max-w-2xl"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-amber-200/70">Implementation</p><h2 className="mt-2 text-2xl font-semibold text-zinc-100">{copy.implementation}</h2><p className="mt-3 text-sm leading-7 text-zinc-500">{copy.implementationLead}</p></div>
              <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer" className="shrink-0"><Button variant="outline" className="h-11 border-amber-200/20 bg-amber-200/[.05] px-6 text-amber-50 hover:bg-amber-200/[.09]">{copy.bookCall}<ArrowUpRight className="ml-2 h-4 w-4" /></Button></a>
            </div>
          </div>
        </section>

        <section className="border-t border-white/[.06] py-24 md:py-28">
          <div className="container mx-auto max-w-4xl px-4 sm:px-6">
            <div className="text-center"><p className="text-[10px] font-semibold uppercase tracking-[.23em] text-amber-200/70">{copy.faqEyebrow}</p><h2 className="section-title mt-4 text-[clamp(2.4rem,4.5vw,4rem)] text-zinc-100">{copy.faqTitle}</h2></div>
            <div className="mt-10 space-y-3">{copy.faq.map((item) => <details key={item.q} className="group rounded-[22px] border border-white/[.075] bg-white/[.018] p-5 open:border-sky-300/15"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-zinc-200"><span>{item.q}</span><ChevronRight className="h-4 w-4 shrink-0 text-zinc-600 transition-transform group-open:rotate-90" /></summary><p className="mt-4 pr-6 text-sm leading-7 text-zinc-500">{item.a}</p></details>)}</div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}

function Backdrop() {
  return <div className="pointer-events-none absolute inset-0" aria-hidden="true"><div className="absolute left-1/2 top-0 h-[720px] w-[96%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,.14),rgba(212,175,55,.035)_42%,transparent_70%)]" /><div className="absolute left-1/2 top-24 h-px w-[min(900px,85vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-300/30 to-transparent shadow-[0_0_35px_rgba(56,189,248,.2)]" /></div>;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return <div><label className="text-sm font-medium text-zinc-300">{label}</label>{children}{hint ? <p className="mt-1.5 text-[10px] leading-5 text-zinc-600">{hint}</p> : null}</div>;
}

function Results({ result, copy, workspaceHref, onReset }: { result: VisibilitySiteScanResult; copy: Copy; workspaceHref: string; onReset: () => void }) {
  const pillarItems: { label: string; value: number | null; icon: LucideIcon; accent: string }[] = [
    { label: copy.search, value: result.pillars.search, icon: Search, accent: "sky" },
    { label: copy.local, value: result.pillars.local, icon: MapPin, accent: "amber" },
    { label: copy.conversion, value: result.pillars.conversion, icon: Route, accent: "emerald" },
    { label: copy.trust, value: result.pillars.trust, icon: ShieldCheck, accent: "violet" },
  ];
  return <section id="visibility-results" className="scroll-mt-24 pb-24"><div className="container mx-auto max-w-6xl px-4 sm:px-6">
    <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
      <div className={`${PANEL} relative overflow-hidden p-6 sm:p-8`}><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_45%_0%,rgba(56,189,248,.12),transparent_48%)]" /><div className="relative"><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-sky-200/70">Visibility Map</p><div className="mt-5 flex items-end gap-3"><span className="font-display text-7xl tracking-[-.06em] text-white sm:text-8xl">{result.score}</span><span className="pb-3 text-xl text-zinc-600">/100</span></div><p className="mt-2 text-xs text-zinc-500">{copy.score}</p><p className="mt-7 break-all text-xs leading-6 text-zinc-600">{result.resolvedUrl}</p></div></div>
      <div className={`${PANEL} p-6 sm:p-8`}><p className="text-sm font-semibold text-zinc-200">{copy.pillars}</p><div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{pillarItems.map((item) => <Pillar key={item.label} {...item} empty={copy.notApplicable} />)}</div><div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4"><SmallMetric label={copy.sampled} value={String(result.site.pagesScanned)} /><SmallMetric label={copy.discovered} value={String(result.site.pagesDiscovered)} /><SmallMetric label={copy.robots} value={result.site.robotsFound ? copy.found : copy.review} good={result.site.robotsFound} /><SmallMetric label={copy.sitemap} value={result.site.sitemapFound ? copy.found : copy.review} good={result.site.sitemapFound} /></div></div>
    </div>

    <div className="mx-auto mt-16 max-w-3xl text-center"><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-amber-200/70">{copy.queueEyebrow}</p><h2 className="section-title mt-4 text-[clamp(2.5rem,5vw,4.4rem)] text-zinc-100">{copy.queueTitle}</h2><p className="mt-4 text-sm leading-7 text-zinc-500 sm:text-base">{copy.queueLead}</p></div>
    <div className="mt-8 grid gap-4">{result.growthQueue.map((item) => <QueueCard key={item.id} item={item} copy={copy} />)}{!result.growthQueue.length ? <div className="rounded-[24px] border border-emerald-300/15 bg-emerald-300/[.035] p-6 text-sm leading-7 text-emerald-100/80"><CheckCircle2 className="mb-3 h-5 w-5" />{copy.queueEmpty}</div> : null}</div>

    <div className="mt-14 grid gap-6 xl:grid-cols-[1.12fr_.88fr]">
      <div className={`${PANEL} p-6 sm:p-8`}><h2 className="text-xl font-semibold text-zinc-100">{copy.pages}</h2><p className="mt-2 text-sm leading-7 text-zinc-500">{copy.pagesLead}</p><div className="mt-5 grid gap-3">{result.pages.map((page) => <PageRow key={page.url} page={page} copy={copy} hasService={Boolean(result.context.service)} hasLocation={result.pillars.local !== null && Boolean(result.context.location)} />)}</div></div>
      <div className="grid gap-6">{result.competitors.length ? <div className={`${PANEL} p-6`}><h2 className="text-xl font-semibold text-zinc-100">{copy.competitorsTitle}</h2><p className="mt-2 text-sm leading-7 text-zinc-500">{copy.competitorsLead}</p><div className="mt-5 grid gap-3">{result.competitors.map((competitor) => <div key={competitor.resolvedUrl} className="rounded-2xl border border-violet-300/10 bg-violet-300/[.025] p-4"><div className="flex items-start justify-between gap-4"><div className="min-w-0"><p className="truncate text-sm font-medium text-zinc-300">{competitor.title || competitor.resolvedUrl}</p><p className="mt-1 truncate text-[10px] text-zinc-650">{competitor.resolvedUrl}</p></div><span className="font-display text-3xl text-violet-200">{competitor.score}</span></div></div>)}</div></div> : null}
        <div className={`${PANEL} p-6`}><div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-amber-200" /><h2 className="text-lg font-semibold text-zinc-100">{copy.boundaries}</h2></div><ul className="mt-5 space-y-3">{result.limitations.map((item) => <li key={item} className="flex gap-2.5 text-xs leading-6 text-zinc-500"><ChevronRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-amber-200/55" />{item}</li>)}</ul></div>
      </div>
    </div>

    <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row"><a href={workspaceHref}><Button className="premium-button h-12 px-7"><MonitorCheck className="mr-2 h-4 w-4" />{copy.openWorkspace}</Button></a><Button onClick={onReset} variant="outline" className="h-12 border-white/10 bg-white/[.025] px-7 text-zinc-300 hover:bg-white/[.05] hover:text-white"><RefreshCw className="mr-2 h-4 w-4" />{copy.scanAnother}</Button></div>
  </div></section>;
}

function Pillar({ label, value, icon: Icon, accent, empty }: { label: string; value: number | null; icon: LucideIcon; accent: string; empty: string }) {
  const tone = accent === "sky" ? "border-sky-300/15 bg-sky-300/[.04] text-sky-200" : accent === "amber" ? "border-amber-200/15 bg-amber-200/[.04] text-amber-200" : accent === "emerald" ? "border-emerald-300/15 bg-emerald-300/[.04] text-emerald-200" : "border-violet-300/15 bg-violet-300/[.04] text-violet-200";
  return <div className="rounded-2xl border border-white/[.07] bg-black/25 p-4"><div className="flex items-center justify-between gap-3"><span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${tone}`}><Icon className="h-4 w-4" /></span><span className="font-display text-2xl text-zinc-100">{value ?? empty}</span></div><p className="mt-4 text-[10px] text-zinc-500">{label}</p>{value !== null ? <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[.05]"><div className="h-full rounded-full bg-gradient-to-r from-sky-300 to-amber-200" style={{ width: `${Math.max(4, value)}%` }} /></div> : null}</div>;
}

function SmallMetric({ label, value, good }: { label: string; value: string; good?: boolean }) {
  return <div className="rounded-2xl border border-white/[.06] bg-black/25 p-4"><p className={`text-lg font-semibold ${good === false ? "text-amber-200" : good === true ? "text-emerald-200" : "text-zinc-200"}`}>{value}</p><p className="mt-1 text-[10px] text-zinc-650">{label}</p></div>;
}

function QueueCard({ item, copy }: { item: GrowthAction; copy: Copy }) {
  const tone = item.lane === "now" ? "border-amber-200/18 bg-amber-200/[.035] text-amber-100" : item.lane === "next" ? "border-sky-300/18 bg-sky-300/[.035] text-sky-100" : "border-violet-300/18 bg-violet-300/[.035] text-violet-100";
  return <div className="rounded-[24px] border border-white/[.08] bg-[linear-gradient(145deg,rgba(255,255,255,.027),rgba(0,0,0,.25))] p-5 sm:p-6"><div className="flex flex-wrap items-center justify-between gap-3"><span className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.15em] ${tone}`}>{item.lane}</span><div className="flex flex-wrap gap-2"><Chip label={`${copy.impact}: ${item.impact}`} /><Chip label={`${copy.confidence}: ${item.confidence}`} /><Chip label={`${copy.effort}: ${item.effort}`} /></div></div><h3 className="mt-4 text-lg font-semibold text-zinc-100">{item.title}</h3><div className="mt-4 grid gap-3 lg:grid-cols-3"><Info label={copy.why} text={item.reason} accent="amber" /><Info label={copy.evidence} text={item.evidence} accent="sky" /><Info label={copy.nextMove} text={item.action} accent="emerald" /></div></div>;
}
function Chip({ label }: { label: string }) { return <span className="rounded-full border border-white/[.07] bg-black/25 px-2.5 py-1 text-[9px] text-zinc-550">{label}</span>; }
function Info({ label, text, accent }: { label: string; text: string; accent: "sky" | "amber" | "emerald" }) { const tone = accent === "sky" ? "text-sky-200" : accent === "amber" ? "text-amber-200" : "text-emerald-200"; return <div className="rounded-2xl border border-white/[.06] bg-black/25 p-4"><p className={`text-[9px] font-semibold uppercase tracking-[.15em] ${tone}`}>{label}</p><p className="mt-2 break-words text-xs leading-6 text-zinc-450">{text}</p></div>; }

function PageRow({ page, copy, hasService, hasLocation }: { page: ScanPageSummary; copy: Copy; hasService: boolean; hasLocation: boolean }) {
  return <div className="rounded-2xl border border-white/[.06] bg-black/25 p-4"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-sky-300/12 bg-sky-300/[.025] px-2 py-1 text-[9px] font-semibold uppercase text-sky-200/75">{page.kind}</span><span className="text-[10px] text-zinc-700">HTTP {page.statusCode}</span></div><p className="mt-2 truncate text-sm font-medium text-zinc-300">{page.title || page.path}</p><p className="mt-1 truncate text-[10px] text-zinc-650">{page.path}</p></div><div className="flex shrink-0 gap-2">{hasService ? <Signal label={copy.serviceMatch} pass={page.serviceMatch} /> : null}{hasLocation ? <Signal label={copy.locationMatch} pass={page.locationMatch} /> : null}</div></div></div>;
}
function Signal({ label, pass }: { label: string; pass: boolean }) { return <span className={`rounded-lg border px-2 py-1 text-[9px] ${pass ? "border-emerald-300/15 bg-emerald-300/[.035] text-emerald-300" : "border-white/[.06] text-zinc-700"}`}>{label}</span>; }
function LoopStep({ item, icon: Icon }: { item: { label: string; title: string; text: string }; icon: LucideIcon }) { return <div className={`${PANEL} p-6`}><div className="flex items-center justify-between"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/[.04] text-sky-200"><Icon className="h-4 w-4" /></span><span className="font-display text-3xl text-zinc-800">{item.label}</span></div><h3 className="mt-5 text-lg font-semibold text-zinc-100">{item.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{item.text}</p></div>; }
