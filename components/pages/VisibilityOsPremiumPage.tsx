"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  CircleDot,
  Clock3,
  ExternalLink,
  FileCheck2,
  Globe2,
  Loader2,
  RefreshCw,
  ScanSearch,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Header } from "@/components/ui/header";
import { FooterSection } from "@/components/FooterSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DirectionPageHero } from "@/components/ui/direction-page-hero";
import { InteractiveSurface } from "@/components/ui/premium-interaction";
import { submitLead } from "@/lib/site";
import { useI18n } from "@/components/i18n-provider";
import type { Lang } from "@/lib/i18n";
import type { ScanFinding, ScanStatus, VisibilityScanResult } from "@/lib/visibilityos-scan";

type ProductCopy = {
  badge: string;
  heroLead: string;
  heroSupport: string;
  heroPrimary: string;
  heroSecondary: string;
  liveLabel: string;
  scanTitle: string;
  scanLead: string;
  urlLabel: string;
  urlPlaceholder: string;
  scanButton: string;
  scanning: string;
  scanNote: string;
  errorTitle: string;
  resultEyebrow: string;
  scoreLabel: string;
  resolved: string;
  response: string;
  scanned: string;
  pass: string;
  warn: string;
  fail: string;
  findingsTitle: string;
  findingsLead: string;
  priority: Record<"high" | "medium" | "low", string>;
  evidence: string;
  recommendation: string;
  signalsTitle: string;
  titleSignal: string;
  descriptionSignal: string;
  h1Signal: string;
  canonicalSignal: string;
  formsSignal: string;
  contactSignal: string;
  linksSignal: string;
  limitationsTitle: string;
  scanAnother: string;
  reviewEyebrow: string;
  reviewTitle: string;
  reviewLead: string;
  name: string;
  email: string;
  phone: string;
  context: string;
  contextPlaceholder: string;
  reviewButton: string;
  sending: string;
  reviewSuccessTitle: string;
  reviewSuccessLead: string;
  reviewError: string;
  reviewNote: string;
  workflowEyebrow: string;
  workflowTitle: string;
  workflowLead: string;
  workflow: { title: string; text: string }[];
};

const COPY: Record<Lang, ProductCopy> = {
  en: {
    badge: "VisibilityOS · Live website scan",
    heroLead: "Turn a website URL into observable evidence, priorities and a clear first action.",
    heroSupport: "Run a real first-pass scan now. No email gate. Technical signals are automated; judgment-heavy findings stay explicitly marked for human review.",
    heroPrimary: "Scan a website",
    heroSecondary: "How it works",
    liveLabel: "Live product · v1",
    scanTitle: "Start with the real website",
    scanLead: "VisibilityOS fetches the public page, checks observable technical, visibility, trust and conversion signals, then explains what deserves attention first.",
    urlLabel: "Website URL",
    urlPlaceholder: "example.com",
    scanButton: "Run VisibilityOS scan",
    scanning: "Scanning public page…",
    scanNote: "Public websites only. The scanner does not log in, submit forms or claim business performance from technical signals.",
    errorTitle: "The scan could not complete",
    resultEyebrow: "Automated first pass",
    scoreLabel: "observable readiness",
    resolved: "Resolved URL",
    response: "Response",
    scanned: "Scanned",
    pass: "Pass",
    warn: "Review",
    fail: "Priority",
    findingsTitle: "Evidence before opinions",
    findingsLead: "Every item below is tied to something observable in the returned page or HTTP response. A score helps triage; it is not a business KPI.",
    priority: { high: "High priority", medium: "Medium priority", low: "Low priority" },
    evidence: "Evidence",
    recommendation: "Next move",
    signalsTitle: "Raw observable signals",
    titleSignal: "Title",
    descriptionSignal: "Description",
    h1Signal: "H1 headings",
    canonicalSignal: "Canonical",
    formsSignal: "Forms",
    contactSignal: "Contact paths",
    linksSignal: "Internal / external links",
    limitationsTitle: "What this scan does not pretend to know",
    scanAnother: "Scan another site",
    reviewEyebrow: "Human review",
    reviewTitle: "Want the findings turned into an execution plan?",
    reviewLead: "Send this scan for review. The automated evidence is preserved, then the page journey, copy, visual hierarchy and commercial context can be assessed by a human before recommendations are treated as verified.",
    name: "Name",
    email: "Email",
    phone: "Phone / messenger",
    context: "What matters most right now?",
    contextPlaceholder: "More qualified leads, stronger trust, clearer offer, SEO, conversion…",
    reviewButton: "Request human review",
    sending: "Sending…",
    reviewSuccessTitle: "Review request received",
    reviewSuccessLead: "The scan context has been attached to the request. You do not need to repeat the URL or automated findings.",
    reviewError: "Could not send the review request. Check the required fields and try again.",
    reviewNote: "No payment is taken here. This is a request for review, not an invented instant diagnosis.",
    workflowEyebrow: "Product logic",
    workflowTitle: "URL → evidence → priority → human judgment",
    workflowLead: "The product separates what a machine can observe reliably from what still needs commercial and creative judgment.",
    workflow: [
      { title: "Scan", text: "Fetch the public page safely and record the real response." },
      { title: "Evidence", text: "Extract visible, testable signals instead of generating unsupported opinions." },
      { title: "Priority", text: "Weight issues by likely urgency so the first action is obvious." },
      { title: "Human review", text: "Escalate copy, UX, positioning and conversion judgment instead of pretending automation verified them." },
    ],
  },
  ua: {
    badge: "VisibilityOS · Живе сканування сайту",
    heroLead: "Перетворіть URL сайту на спостережувані докази, пріоритети та зрозумілу першу дію.",
    heroSupport: "Запустіть реальний перший скан зараз. Без email-gate. Технічні сигнали автоматизовані, а висновки, де потрібне судження, явно залишаються на ручну перевірку.",
    heroPrimary: "Просканувати сайт",
    heroSecondary: "Як це працює",
    liveLabel: "Живий продукт · v1",
    scanTitle: "Починаємо з реального сайту",
    scanLead: "VisibilityOS завантажує публічну сторінку, перевіряє видимі технічні, visibility, trust і conversion сигнали та пояснює, що варто виправляти першим.",
    urlLabel: "URL сайту",
    urlPlaceholder: "example.com",
    scanButton: "Запустити VisibilityOS",
    scanning: "Скануємо публічну сторінку…",
    scanNote: "Лише публічні сайти. Сканер не входить в акаунти, не надсилає форми й не видає технічні сигнали за бізнес-результати.",
    errorTitle: "Сканування не вдалося завершити",
    resultEyebrow: "Автоматичний перший прохід",
    scoreLabel: "готовність за видимими сигналами",
    resolved: "Фінальний URL",
    response: "Відповідь",
    scanned: "Проскановано",
    pass: "Добре",
    warn: "Перевірити",
    fail: "Пріоритет",
    findingsTitle: "Спочатку докази, потім думки",
    findingsLead: "Кожен пункт нижче прив’язаний до того, що реально видно у HTML або HTTP-відповіді. Score допомагає розставити черговість, але не є бізнес-KPI.",
    priority: { high: "Високий пріоритет", medium: "Середній пріоритет", low: "Низький пріоритет" },
    evidence: "Доказ",
    recommendation: "Наступна дія",
    signalsTitle: "Сирі спостережувані сигнали",
    titleSignal: "Title",
    descriptionSignal: "Description",
    h1Signal: "H1 заголовки",
    canonicalSignal: "Canonical",
    formsSignal: "Форми",
    contactSignal: "Контактні шляхи",
    linksSignal: "Внутрішні / зовнішні посилання",
    limitationsTitle: "Чого цей скан не вдає, що знає",
    scanAnother: "Просканувати інший сайт",
    reviewEyebrow: "Ручна перевірка",
    reviewTitle: "Перетворити висновки на план реалізації?",
    reviewLead: "Надішліть цей скан на перевірку. Автоматичні докази збережуться, а шлях користувача, тексти, візуальна ієрархія та комерційний контекст будуть оцінені людиною до того, як рекомендації вважатимуться підтвердженими.",
    name: "Ім’я",
    email: "Email",
    phone: "Телефон / месенджер",
    context: "Що зараз найважливіше?",
    contextPlaceholder: "Більше якісних лідів, довіра, офер, SEO, конверсія…",
    reviewButton: "Запросити ручну перевірку",
    sending: "Надсилаємо…",
    reviewSuccessTitle: "Запит на перевірку отримано",
    reviewSuccessLead: "Контекст скану прикріплено до запиту. URL і автоматичні висновки повторювати не потрібно.",
    reviewError: "Не вдалося надіслати запит. Перевірте обов’язкові поля й спробуйте ще раз.",
    reviewNote: "Тут немає оплати. Це запит на перевірку, а не вигаданий миттєвий діагноз.",
    workflowEyebrow: "Логіка продукту",
    workflowTitle: "URL → докази → пріоритет → людське судження",
    workflowLead: "Продукт відділяє те, що машина може надійно спостерігати, від того, де ще потрібне комерційне й креативне судження.",
    workflow: [
      { title: "Сканування", text: "Безпечно завантажуємо публічну сторінку й фіксуємо реальну відповідь." },
      { title: "Докази", text: "Витягуємо видимі сигнали замість генерації непідтверджених думок." },
      { title: "Пріоритет", text: "Зважуємо проблеми за терміновістю, щоб перша дія була очевидною." },
      { title: "Ручна перевірка", text: "Тексти, UX, позиціонування та conversion-рішення ескалюються людині, а не маскуються під автоматичну істину." },
    ],
  },
  ru: {
    badge: "VisibilityOS · Живой скан сайта",
    heroLead: "Превратите URL сайта в наблюдаемые доказательства, приоритеты и понятное первое действие.",
    heroSupport: "Запустите реальный первый скан прямо сейчас. Без email-gate. Технические сигналы автоматизированы, а выводы, где нужно суждение, явно остаются на ручную проверку.",
    heroPrimary: "Просканировать сайт",
    heroSecondary: "Как это работает",
    liveLabel: "Живой продукт · v1",
    scanTitle: "Начинаем с реального сайта",
    scanLead: "VisibilityOS загружает публичную страницу, проверяет наблюдаемые технические, visibility, trust и conversion-сигналы и объясняет, что заслуживает внимания в первую очередь.",
    urlLabel: "URL сайта",
    urlPlaceholder: "example.com",
    scanButton: "Запустить VisibilityOS",
    scanning: "Сканируем публичную страницу…",
    scanNote: "Только публичные сайты. Сканер не входит в аккаунты, не отправляет формы и не выдаёт технические сигналы за бизнес-результаты.",
    errorTitle: "Сканирование не удалось завершить",
    resultEyebrow: "Автоматический первый проход",
    scoreLabel: "готовность по видимым сигналам",
    resolved: "Финальный URL",
    response: "Ответ",
    scanned: "Просканировано",
    pass: "Хорошо",
    warn: "Проверить",
    fail: "Приоритет",
    findingsTitle: "Сначала доказательства, потом мнения",
    findingsLead: "Каждый пункт ниже привязан к тому, что реально видно в HTML или HTTP-ответе. Score помогает расставить очерёдность, но не является бизнес-KPI.",
    priority: { high: "Высокий приоритет", medium: "Средний приоритет", low: "Низкий приоритет" },
    evidence: "Доказательство",
    recommendation: "Следующий шаг",
    signalsTitle: "Сырые наблюдаемые сигналы",
    titleSignal: "Title",
    descriptionSignal: "Description",
    h1Signal: "H1 заголовки",
    canonicalSignal: "Canonical",
    formsSignal: "Формы",
    contactSignal: "Контактные пути",
    linksSignal: "Внутренние / внешние ссылки",
    limitationsTitle: "Чего этот скан не делает вид, что знает",
    scanAnother: "Просканировать другой сайт",
    reviewEyebrow: "Ручная проверка",
    reviewTitle: "Превратить находки в план реализации?",
    reviewLead: "Отправьте этот скан на проверку. Автоматические доказательства сохранятся, а путь пользователя, тексты, визуальная иерархия и коммерческий контекст будут оценены человеком до того, как рекомендации будут считаться подтверждёнными.",
    name: "Имя",
    email: "Email",
    phone: "Телефон / мессенджер",
    context: "Что сейчас важнее всего?",
    contextPlaceholder: "Больше качественных лидов, доверие, офер, SEO, конверсия…",
    reviewButton: "Запросить ручную проверку",
    sending: "Отправляем…",
    reviewSuccessTitle: "Запрос на проверку получен",
    reviewSuccessLead: "Контекст скана прикреплён к запросу. URL и автоматические выводы повторять не нужно.",
    reviewError: "Не удалось отправить запрос. Проверьте обязательные поля и попробуйте ещё раз.",
    reviewNote: "Здесь нет оплаты. Это запрос на проверку, а не выдуманный мгновенный диагноз.",
    workflowEyebrow: "Логика продукта",
    workflowTitle: "URL → доказательства → приоритет → человеческое суждение",
    workflowLead: "Продукт отделяет то, что машина может надёжно наблюдать, от того, где всё ещё нужно коммерческое и креативное суждение.",
    workflow: [
      { title: "Сканирование", text: "Безопасно загружаем публичную страницу и фиксируем реальный ответ." },
      { title: "Доказательства", text: "Извлекаем наблюдаемые сигналы вместо генерации неподтверждённых мнений." },
      { title: "Приоритет", text: "Взвешиваем проблемы по срочности, чтобы первое действие было очевидным." },
      { title: "Ручная проверка", text: "Тексты, UX, позиционирование и conversion-решения передаются человеку, а не маскируются под автоматическую истину." },
    ],
  },
};

const STATUS_ORDER: Record<ScanStatus, number> = { fail: 0, warn: 1, pass: 2 };
const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const;
const WORKFLOW_ICONS: LucideIcon[] = [ScanSearch, FileCheck2, Target, Sparkles];

function statusUi(status: ScanStatus) {
  if (status === "pass") return { icon: CheckCircle2, border: "border-emerald-300/15", bg: "bg-emerald-300/[.035]", text: "text-emerald-300", dot: "bg-emerald-300" };
  if (status === "warn") return { icon: AlertTriangle, border: "border-amber-300/15", bg: "bg-amber-300/[.035]", text: "text-amber-300", dot: "bg-amber-300" };
  return { icon: XCircle, border: "border-red-300/15", bg: "bg-red-300/[.035]", text: "text-red-300", dot: "bg-red-300" };
}

function safeDate(value: string) {
  try { return new Date(value).toLocaleString(); } catch { return value; }
}

function FindingCard({ finding, copy }: { finding: ScanFinding; copy: ProductCopy }) {
  const ui = statusUi(finding.status);
  const Icon = ui.icon;
  return (
    <div className={`rounded-[24px] border ${ui.border} ${ui.bg} p-5 sm:p-6`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${ui.border} bg-black/30 ${ui.text}`}><Icon className="h-4 w-4" /></span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-100 sm:text-base">{finding.title}</h3>
              <span className="rounded-full border border-white/[.07] px-2 py-1 text-[9px] font-semibold uppercase tracking-[.12em] text-zinc-500">{copy.priority[finding.priority]}</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-zinc-400">{finding.detail}</p>
          </div>
        </div>
      </div>
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/[.06] bg-black/25 p-4"><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-600">{copy.evidence}</p><p className="mt-2 break-words text-xs leading-6 text-zinc-400">{finding.evidence}</p></div>
        <div className="rounded-2xl border border-white/[.06] bg-black/25 p-4"><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-600">{copy.recommendation}</p><p className="mt-2 text-xs leading-6 text-zinc-400">{finding.recommendation}</p></div>
      </div>
    </div>
  );
}

export function VisibilityOsPremiumPage() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const reduced = useReducedMotion();
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [scanError, setScanError] = useState("");
  const [result, setResult] = useState<VisibilityScanResult | null>(null);
  const [review, setReview] = useState<Record<string, string>>({});
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [reviewDone, setReviewDone] = useState(false);
  const [reviewError, setReviewError] = useState(false);

  const sortedFindings = useMemo(() => {
    if (!result) return [];
    return [...result.findings].sort((a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status] || PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority]);
  }, [result]);

  const runScan = async () => {
    if (!url.trim()) return;
    setScanning(true);
    setScanError("");
    setResult(null);
    setReviewDone(false);
    setReviewError(false);

    try {
      const response = await fetch("/api/visibilityos/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), lang }),
      });
      const data = await response.json() as { ok?: boolean; result?: VisibilityScanResult; error?: string };
      if (!response.ok || !data.ok || !data.result) throw new Error(data.error || "Scan failed");
      setResult(data.result);
      requestAnimationFrame(() => document.getElementById("results")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" }));
    } catch (error) {
      setScanError(error instanceof Error ? error.message : "Scan failed");
    } finally {
      setScanning(false);
    }
  };

  const requestReview = async () => {
    if (!result || !review.name?.trim() || !review.email?.trim()) {
      setReviewError(true);
      return;
    }
    setReviewSubmitting(true);
    setReviewError(false);

    const topFindings = result.findings
      .filter((item) => item.status !== "pass" && item.priority === "high")
      .map((item) => `${item.title}: ${item.evidence}`)
      .slice(0, 6);

    const ok = await submitLead({
      intent: "visibilityos_human_review_request",
      language: lang,
      buttonLabel: "VisibilityOS live result - Human review",
      website: result.resolvedUrl,
      automatedScore: result.score,
      automatedPass: result.summary.pass,
      automatedReview: result.summary.warn,
      automatedPriority: result.summary.fail,
      automatedHighPriorityFindings: topFindings,
      scanTimestamp: result.scannedAt,
      ...review,
    });

    setReviewSubmitting(false);
    if (ok) setReviewDone(true);
    else setReviewError(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020202] text-white">
      <Header />
      <main>
        <DirectionPageHero accent="blue" eyebrow={copy.badge} titleA="Visibility" titleB="OS." lead={copy.heroLead} support={copy.heroSupport}>
          <a href="#scan"><Button className="premium-button h-auto min-h-12 px-8 py-3.5">{copy.heroPrimary}<ArrowRight className="ml-2 h-4 w-4" /></Button></a>
          <a href="#workflow"><Button className="h-auto min-h-12 border border-sky-200/18 bg-sky-200/[.05] px-8 py-3.5 text-white hover:bg-sky-200/[.09]">{copy.heroSecondary}<ScanSearch className="ml-2 h-4 w-4" /></Button></a>
        </DirectionPageHero>

        <section id="scan" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,.11),transparent_62%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-5xl px-4">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.18em] text-emerald-200"><CircleDot className="h-3.5 w-3.5" />{copy.liveLabel}</span>
              <h1 className="section-title mt-5 text-[clamp(2.5rem,5vw,4.6rem)] text-zinc-100">{copy.scanTitle}</h1>
              <p className="section-lead mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">{copy.scanLead}</p>
            </div>

            <InteractiveSurface accent="blue" lift={false} className="relative mx-auto mt-10 overflow-hidden rounded-[32px] border border-sky-200/[.14] bg-[linear-gradient(145deg,rgba(125,211,252,.06),rgba(255,255,255,.018),rgba(0,0,0,.48))] p-5 sm:p-8">
              {!reduced && scanning && <motion.div aria-hidden="true" className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_30px_rgba(125,211,252,.7)]" animate={{ y: [20, 180, 20] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }} />}
              <label htmlFor="visibility-url" className="text-sm font-medium text-zinc-300">{copy.urlLabel}</label>
              <div className="mt-2 grid gap-3 sm:grid-cols-[1fr_auto]">
                <div className="relative"><Globe2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600" /><Input id="visibility-url" value={url} onChange={(event) => setUrl(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !scanning) void runScan(); }} placeholder={copy.urlPlaceholder} autoCapitalize="none" autoCorrect="off" spellCheck={false} className="h-13 border-white/10 bg-black/35 pl-11 text-base text-white placeholder:text-zinc-700" /></div>
                <Button onClick={() => void runScan()} disabled={scanning || !url.trim()} className="premium-button h-13 min-w-[210px] px-6 disabled:opacity-50">{scanning ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{copy.scanning}</> : <><ScanSearch className="mr-2 h-4 w-4" />{copy.scanButton}</>}</Button>
              </div>
              <div className="mt-4 flex gap-2 text-xs leading-6 text-zinc-600"><ShieldCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-sky-300/55" /><p>{copy.scanNote}</p></div>
              {scanError && <div className="mt-5 rounded-2xl border border-red-300/15 bg-red-300/[.035] p-4"><div className="flex gap-3"><XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-300" /><div><p className="text-sm font-semibold text-red-200">{copy.errorTitle}</p><p className="mt-1 text-sm leading-6 text-zinc-400">{scanError}</p></div></div></div>}
            </InteractiveSurface>
          </div>
        </section>

        {result && (
          <section id="results" className="scroll-mt-24 pb-24">
            <div className="container mx-auto max-w-6xl px-4">
              <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
                <div className="rounded-[30px] border border-sky-200/[.13] bg-[radial-gradient(circle_at_50%_0%,rgba(56,189,248,.10),transparent_48%),rgba(255,255,255,.018)] p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-sky-200/70">{copy.resultEyebrow}</p>
                  <div className="mt-6 flex items-end gap-4"><span className="font-display text-7xl font-medium tracking-[-.06em] text-white sm:text-8xl">{result.score}</span><div className="pb-3"><span className="text-2xl text-zinc-600">/100</span><p className="mt-1 text-xs text-zinc-500">{copy.scoreLabel}</p></div></div>
                  <div className="mt-7 grid grid-cols-3 gap-2">
                    {(["pass", "warn", "fail"] as const).map((key) => { const ui = statusUi(key); return <div key={key} className={`rounded-2xl border ${ui.border} ${ui.bg} p-3 text-center`}><p className={`text-2xl font-semibold ${ui.text}`}>{result.summary[key]}</p><p className="mt-1 text-[10px] uppercase tracking-[.12em] text-zinc-600">{copy[key]}</p></div>; })}
                  </div>
                </div>

                <div className="rounded-[30px] border border-white/[.08] bg-white/[.018] p-6 sm:p-8">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-650">{copy.resolved}</p><a href={result.resolvedUrl} target="_blank" rel="noopener noreferrer" className="mt-2 flex items-start gap-2 break-all text-sm leading-6 text-zinc-300 hover:text-sky-200">{result.resolvedUrl}<ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0" /></a></div>
                    <div><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-650">{copy.response}</p><p className="mt-2 text-sm text-zinc-300">HTTP {result.statusCode} · {result.durationMs} ms</p></div>
                    <div><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-650">{copy.scanned}</p><p className="mt-2 text-sm text-zinc-300">{safeDate(result.scannedAt)}</p></div>
                    <div><p className="text-[9px] font-semibold uppercase tracking-[.16em] text-zinc-650">HTML</p><p className="mt-2 text-sm text-zinc-300">{Math.max(1, Math.round(result.signals.htmlBytes / 1024))} KB · {result.signals.internalLinks + result.signals.externalLinks} links</p></div>
                  </div>
                  <Button onClick={() => { setResult(null); setScanError(""); setUrl(""); window.scrollTo({ top: document.getElementById("scan")?.offsetTop || 0, behavior: reduced ? "auto" : "smooth" }); }} variant="outline" className="mt-7 border-white/10 bg-white/[.025] text-zinc-300 hover:bg-white/[.05] hover:text-white"><RefreshCw className="mr-2 h-4 w-4" />{copy.scanAnother}</Button>
                </div>
              </div>

              <div className="mx-auto mt-14 max-w-3xl text-center"><h2 className="section-title text-[clamp(2.4rem,4.4vw,4rem)] text-zinc-100">{copy.findingsTitle}</h2><p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">{copy.findingsLead}</p></div>
              <div className="mt-9 grid gap-4">{sortedFindings.map((finding) => <FindingCard key={finding.id} finding={finding} copy={copy} />)}</div>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
                <div className="rounded-[28px] border border-white/[.08] bg-white/[.018] p-6 sm:p-7"><h3 className="text-lg font-semibold text-zinc-100">{copy.signalsTitle}</h3><div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    [copy.titleSignal, result.signals.title || "—"],
                    [copy.descriptionSignal, result.signals.description || "—"],
                    [copy.h1Signal, result.signals.h1.join(" | ") || "—"],
                    [copy.canonicalSignal, result.signals.canonical || "—"],
                    [copy.formsSignal, String(result.signals.forms)],
                    [copy.contactSignal, String(result.signals.contactLinks)],
                    [copy.linksSignal, `${result.signals.internalLinks} / ${result.signals.externalLinks}`],
                    ["HTML lang", result.signals.lang || "—"],
                  ].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/[.055] bg-black/25 p-4"><p className="text-[9px] uppercase tracking-[.15em] text-zinc-650">{label}</p><p className="mt-2 break-words text-xs leading-6 text-zinc-400">{value}</p></div>)}
                </div></div>
                <div className="rounded-[28px] border border-amber-300/[.10] bg-amber-300/[.025] p-6 sm:p-7"><div className="flex items-center gap-2 text-amber-200"><ShieldCheck className="h-4 w-4" /><h3 className="text-lg font-semibold text-zinc-100">{copy.limitationsTitle}</h3></div><ul className="mt-5 space-y-4">{result.limitations.map((item) => <li key={item} className="flex gap-3 text-sm leading-7 text-zinc-450"><ChevronRight className="mt-1.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />{item}</li>)}</ul></div>
              </div>

              <div className="mt-12 overflow-hidden rounded-[34px] border border-amber-300/[.12] bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,.08),transparent_45%),rgba(255,255,255,.018)] p-6 sm:p-9">
                <div className="mx-auto max-w-3xl text-center"><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-amber-300/70">{copy.reviewEyebrow}</p><h2 className="section-title mt-4 text-3xl text-zinc-100 sm:text-5xl">{copy.reviewTitle}</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-400">{copy.reviewLead}</p></div>
                {reviewDone ? <div className="mx-auto mt-8 max-w-2xl rounded-[24px] border border-emerald-300/15 bg-emerald-300/[.035] p-7 text-center"><CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" /><h3 className="mt-4 text-xl font-semibold text-zinc-100">{copy.reviewSuccessTitle}</h3><p className="mt-2 text-sm leading-7 text-zinc-400">{copy.reviewSuccessLead}</p></div> : <div className="mx-auto mt-8 grid max-w-3xl gap-4">
                  <div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm text-zinc-300">{copy.name} *</label><Input value={review.name || ""} onChange={(event) => setReview((old) => ({ ...old, name: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div><div><label className="text-sm text-zinc-300">{copy.email} *</label><Input type="email" value={review.email || ""} onChange={(event) => setReview((old) => ({ ...old, email: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div></div>
                  <div><label className="text-sm text-zinc-300">{copy.phone}</label><Input value={review.phone || ""} onChange={(event) => setReview((old) => ({ ...old, phone: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div>
                  <div><label className="text-sm text-zinc-300">{copy.context}</label><textarea value={review.context || ""} onChange={(event) => setReview((old) => ({ ...old, context: event.target.value }))} placeholder={copy.contextPlaceholder} rows={4} className="mt-1.5 w-full resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm leading-6 text-white outline-none placeholder:text-zinc-700 focus:border-amber-300/30" /></div>
                  {reviewError && <p className="text-sm text-red-300">{copy.reviewError}</p>}
                  <Button onClick={() => void requestReview()} disabled={reviewSubmitting || !review.name?.trim() || !review.email?.trim()} className="premium-button h-12 w-full disabled:opacity-50">{reviewSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{copy.sending}</> : <><Search className="mr-2 h-4 w-4" />{copy.reviewButton}</>}</Button>
                  <p className="text-center text-[11px] leading-5 text-zinc-650">{copy.reviewNote}</p>
                </div>}
              </div>
            </div>
          </section>
        )}

        <section id="workflow" className="relative scroll-mt-24 overflow-hidden py-24 md:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(125,211,252,.065),transparent_62%)]" aria-hidden="true" />
          <div className="container relative z-10 mx-auto max-w-6xl px-4">
            <div className="mx-auto max-w-3xl text-center"><span className="text-[10px] font-semibold uppercase tracking-[.24em] text-sky-200/70">{copy.workflowEyebrow}</span><h2 className="section-title mt-4 text-[clamp(2.55rem,4.7vw,4.4rem)] text-zinc-100">{copy.workflowTitle}</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">{copy.workflowLead}</p></div>
            <div className="relative mt-12 grid gap-4 md:grid-cols-4"><div aria-hidden="true" className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-gradient-to-r from-transparent via-sky-300/28 to-transparent md:block" />{copy.workflow.map((step, index) => { const Icon = WORKFLOW_ICONS[index] ?? Target; return <motion.div key={step.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }} className="relative rounded-[24px] border border-white/[.08] bg-black/40 p-6"><span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/18 bg-[#03080b] text-sky-200"><Icon className="h-4 w-4" /></span><p className="mt-5 text-[9px] font-semibold uppercase tracking-[.17em] text-zinc-700">0{index + 1}</p><h3 className="mt-2 text-lg font-semibold text-zinc-100">{step.title}</h3><p className="mt-3 text-sm leading-7 text-zinc-500">{step.text}</p></motion.div>; })}</div>
            <div className="mx-auto mt-7 flex max-w-4xl items-center justify-center gap-3 rounded-2xl border border-white/[.07] bg-white/[.018] px-5 py-4 text-center text-xs leading-6 text-zinc-500"><Clock3 className="h-4 w-4 shrink-0 text-sky-300/55" />The automated scan is intentionally a first pass. Human review remains part of the product where evidence alone is not enough.</div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
}
