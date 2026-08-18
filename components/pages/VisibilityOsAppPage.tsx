"use client";

import { useEffect, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bell,
  Check,
  CheckCircle2,
  Clock3,
  Gauge,
  Globe2,
  Loader2,
  LogOut,
  MonitorCheck,
  Pause,
  Play,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  X,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { FooterSection } from "@/components/FooterSection";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import type { Lang } from "@/lib/i18n";
import type { VisibilitySiteScanResult } from "@/lib/visibilityos-scan";
import {
  createVisibilityProject,
  getValidVisibilitySession,
  listVisibilityProjects,
  loadVisibilityProjectBundle,
  readVisibilitySession,
  recordVisibilityUserScan,
  setVisibilityActionStatus,
  signInVisibilityUser,
  signOutVisibilityUser,
  signUpVisibilityUser,
  updateVisibilityProject,
  type VisibilityEventRow,
  type VisibilityGrowthActionRow,
  type VisibilityProject,
  type VisibilityProjectBundle,
  type VisibilityScanRunRow,
  type VisibilitySession,
} from "@/lib/visibilityos-client";

type Copy = {
  badge: string; title: string; titleAccent: string; lead: string;
  signIn: string; createAccount: string; email: string; password: string; submitSignIn: string; submitSignUp: string; confirmation: string; authError: string;
  projects: string; newProject: string; noProjects: string; createFirst: string; projectName: string; website: string; service: string; location: string; locationHint: string; competitors: string; createAndScan: string; creating: string;
  dashboard: string; lastScan: string; nextDaily: string; nextWeekly: string; pause: string; resume: string; rescan: string; verifyNow: string; score: string; scoreTrend: string;
  queue: string; queueLead: string; history: string; events: string; noActions: string; noEvents: string; noHistory: string;
  plan: string; progress: string; done: string; dismiss: string; open: string; pending: string; verified: string; reopened: string; signOut: string; scanFailed: string; saved: string; verificationComplete: string;
  accountNote: string; appStatus: string; autoStatus: string; now: string; active: string; pendingCount: string; verifiedCount: string; why: string; evidence: string; nextMove: string; status: string; impact: string; confidence: string; effort: string;
  cadence: string; cadenceLead: string; dailyHealth: string; weeklyGrowth: string; on: string; off: string; monitoringPaused: string;
  runNames: Record<VisibilityScanRunRow["job_type"], string>; eventNames: Record<string, string>;
};

const COPY: Record<Lang, Copy> = {
  en: {
    badge: "VisibilityOS · Customer workspace", title: "One queue. One", titleAccent: " evidence loop.", lead: "Turn public visibility signals into prioritized work, verify what actually changed, and keep the site under recurring observation.",
    signIn: "Sign in", createAccount: "Create account", email: "Email", password: "Password", submitSignIn: "Open workspace", submitSignUp: "Create workspace", confirmation: "Check your email to confirm the account, then return here and sign in.", authError: "Could not authenticate. Check the details and try again.",
    projects: "Projects", newProject: "New project", noProjects: "No saved projects yet.", createFirst: "Create your first monitored project", projectName: "Project name", website: "Website URL", service: "Target service / offer", location: "City / service area", locationHint: "Leave blank or use Worldwide for a non-local business.", competitors: "Competitor URLs, one per line (optional)", createAndScan: "Create project + baseline", creating: "Creating baseline…",
    dashboard: "Project control center", lastScan: "Last full scan", nextDaily: "Next health check", nextWeekly: "Next full scan", pause: "Pause", resume: "Resume", rescan: "Run full scan", verifyNow: "Verify completed work", score: "Visibility score", scoreTrend: "Score history",
    queue: "Growth Queue", queueLead: "Work only the evidence that matters. Done triggers a fresh full scan; if the evidence is still present, the task reopens automatically.", history: "Scan history", events: "Material events", noActions: "No active Growth Queue items in the latest full scan.", noEvents: "No material events yet.", noHistory: "No scan history yet.",
    plan: "Plan", progress: "In progress", done: "Done", dismiss: "Dismiss", open: "Open", pending: "Verification pending", verified: "Verified", reopened: "Reopened", signOut: "Sign out", scanFailed: "The scan did not complete. The project is saved and scheduled monitoring will retry.", saved: "Project state updated.", verificationComplete: "Verification scan completed.", accountNote: "Account data is protected by Supabase Auth + row-level security. Public scans never log into the target website.", appStatus: "Live account product", autoStatus: "Server monitoring active",
    now: "Now", active: "Active work", pendingCount: "Pending verification", verifiedCount: "Verified", why: "Why it matters", evidence: "Observed evidence", nextMove: "Recommended move", status: "Status", impact: "Impact", confidence: "Confidence", effort: "Effort",
    cadence: "Monitoring cadence", cadenceLead: "Daily checks stay lightweight. Weekly scans refresh the full evidence map and Growth Queue.", dailyHealth: "Daily health", weeklyGrowth: "Weekly growth scan", on: "On", off: "Off", monitoringPaused: "Monitoring paused",
    runNames: { baseline: "Baseline", manual: "Manual scan", daily: "Daily health", weekly: "Weekly scan", verify: "Verification" },
    eventNames: { "baseline.created": "Baseline created", "score.changed": "Visibility score changed", "action.verification_requested": "Verification requested", "action.verified": "Action verified", "action.reopened": "Action reopened", "scan.failed": "Scheduled scan failed", "project.created": "Project created" },
  },
  ua: {
    badge: "VisibilityOS · Кабінет клієнта", title: "Одна черга. Один", titleAccent: " evidence loop.", lead: "Перетворюйте публічні visibility-сигнали на пріоритетну роботу, перевіряйте реальні зміни та тримайте сайт під регулярним контролем.",
    signIn: "Увійти", createAccount: "Створити акаунт", email: "Email", password: "Пароль", submitSignIn: "Відкрити кабінет", submitSignUp: "Створити кабінет", confirmation: "Підтвердьте акаунт у листі, потім поверніться сюди та увійдіть.", authError: "Не вдалося авторизуватися. Перевірте дані та спробуйте ще раз.",
    projects: "Проєкти", newProject: "Новий проєкт", noProjects: "Збережених проєктів ще немає.", createFirst: "Створити перший проєкт з моніторингом", projectName: "Назва проєкту", website: "URL сайту", service: "Цільова послуга / офер", location: "Місто / зона роботи", locationHint: "Для нелокального бізнесу залиште поле порожнім або вкажіть Worldwide.", competitors: "URL конкурентів, один у рядку (опційно)", createAndScan: "Створити + baseline", creating: "Створюємо baseline…",
    dashboard: "Центр керування проєктом", lastScan: "Останній full scan", nextDaily: "Наступна health-перевірка", nextWeekly: "Наступний full scan", pause: "Призупинити", resume: "Відновити", rescan: "Повний re-scan", verifyNow: "Перевірити виконане", score: "Visibility score", scoreTrend: "Історія score",
    queue: "Growth Queue", queueLead: "Працюйте лише з evidence, що має значення. Done запускає новий full scan; якщо evidence лишився, задача автоматично відкриється знову.", history: "Історія сканів", events: "Суттєві події", noActions: "У latest full scan немає активних Growth Queue задач.", noEvents: "Суттєвих подій ще немає.", noHistory: "Історії сканів ще немає.",
    plan: "Запланувати", progress: "У роботі", done: "Готово", dismiss: "Приховати", open: "Відкрито", pending: "Очікує перевірки", verified: "Підтверджено", reopened: "Відкрито знову", signOut: "Вийти", scanFailed: "Скан не завершився. Проєкт збережено, scheduled monitoring повторить спробу.", saved: "Стан проєкту оновлено.", verificationComplete: "Verification scan завершено.", accountNote: "Дані акаунта захищені Supabase Auth + row-level security. Public scan не входить у target website.", appStatus: "Live account product", autoStatus: "Server monitoring active",
    now: "Зараз", active: "Активна робота", pendingCount: "Очікує verification", verifiedCount: "Підтверджено", why: "Чому це важливо", evidence: "Observed evidence", nextMove: "Що зробити", status: "Статус", impact: "Вплив", confidence: "Впевненість", effort: "Зусилля",
    cadence: "Ритм моніторингу", cadenceLead: "Daily перевірка легка. Weekly scan оновлює повну evidence map і Growth Queue.", dailyHealth: "Daily health", weeklyGrowth: "Weekly growth scan", on: "Увімкнено", off: "Вимкнено", monitoringPaused: "Моніторинг призупинено",
    runNames: { baseline: "Baseline", manual: "Ручний scan", daily: "Daily health", weekly: "Weekly scan", verify: "Verification" },
    eventNames: { "baseline.created": "Baseline створено", "score.changed": "Visibility score змінився", "action.verification_requested": "Verification запитано", "action.verified": "Зміну підтверджено", "action.reopened": "Задачу відкрито знову", "scan.failed": "Scheduled scan не вдався", "project.created": "Проєкт створено" },
  },
  ru: {
    badge: "VisibilityOS · Кабинет клиента", title: "Одна очередь. Один", titleAccent: " evidence loop.", lead: "Превращайте публичные visibility-сигналы в приоритетную работу, проверяйте реальные изменения и держите сайт под регулярным контролем.",
    signIn: "Войти", createAccount: "Создать аккаунт", email: "Email", password: "Пароль", submitSignIn: "Открыть кабинет", submitSignUp: "Создать кабинет", confirmation: "Подтвердите аккаунт в письме, затем вернитесь сюда и войдите.", authError: "Не удалось авторизоваться. Проверьте данные и попробуйте ещё раз.",
    projects: "Проекты", newProject: "Новый проект", noProjects: "Сохранённых проектов пока нет.", createFirst: "Создать первый проект с мониторингом", projectName: "Название проекта", website: "URL сайта", service: "Целевая услуга / оффер", location: "Город / зона работы", locationHint: "Для нелокального бизнеса оставьте поле пустым или укажите Worldwide.", competitors: "URL конкурентов, один на строку (необязательно)", createAndScan: "Создать + baseline", creating: "Создаём baseline…",
    dashboard: "Центр управления проектом", lastScan: "Последний full scan", nextDaily: "Следующая health-проверка", nextWeekly: "Следующий full scan", pause: "Приостановить", resume: "Возобновить", rescan: "Полный re-scan", verifyNow: "Проверить выполненное", score: "Visibility score", scoreTrend: "История score",
    queue: "Growth Queue", queueLead: "Работайте только с evidence, которое имеет значение. Done запускает новый full scan; если evidence осталось, задача автоматически откроется снова.", history: "История сканов", events: "Существенные события", noActions: "В latest full scan нет активных Growth Queue задач.", noEvents: "Существенных событий пока нет.", noHistory: "Истории сканов пока нет.",
    plan: "Запланировать", progress: "В работе", done: "Готово", dismiss: "Скрыть", open: "Открыто", pending: "Ожидает проверки", verified: "Подтверждено", reopened: "Открыто снова", signOut: "Выйти", scanFailed: "Скан не завершился. Проект сохранён, scheduled monitoring повторит попытку.", saved: "Состояние проекта обновлено.", verificationComplete: "Verification scan завершён.", accountNote: "Данные аккаунта защищены Supabase Auth + row-level security. Public scan не входит в target website.", appStatus: "Live account product", autoStatus: "Server monitoring active",
    now: "Сейчас", active: "Активная работа", pendingCount: "Ожидает verification", verifiedCount: "Подтверждено", why: "Почему это важно", evidence: "Observed evidence", nextMove: "Что сделать", status: "Статус", impact: "Влияние", confidence: "Уверенность", effort: "Затраты",
    cadence: "Ритм мониторинга", cadenceLead: "Daily-проверка остаётся лёгкой. Weekly scan обновляет полную evidence map и Growth Queue.", dailyHealth: "Daily health", weeklyGrowth: "Weekly growth scan", on: "Включено", off: "Выключено", monitoringPaused: "Мониторинг приостановлен",
    runNames: { baseline: "Baseline", manual: "Ручной scan", daily: "Daily health", weekly: "Weekly scan", verify: "Verification" },
    eventNames: { "baseline.created": "Baseline создан", "score.changed": "Visibility score изменился", "action.verification_requested": "Verification запрошен", "action.verified": "Изменение подтверждено", "action.reopened": "Задача открыта снова", "scan.failed": "Scheduled scan не выполнен", "project.created": "Проект создан" },
  },
};

const PANEL = "rounded-[28px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.036),rgba(255,255,255,.012)_55%,rgba(0,0,0,.22))] shadow-[0_28px_90px_-58px_rgba(56,189,248,.35)]";

function safeDate(value: string | null | undefined) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
}

function laneRank(lane: VisibilityGrowthActionRow["lane"]) {
  if (lane === "now") return 0;
  if (lane === "next") return 1;
  return 2;
}

function actionState(item: VisibilityGrowthActionRow) {
  if (item.verification_status === "verified") return "verified" as const;
  if (item.verification_status === "pending") return "pending" as const;
  if (item.verification_status === "reopened") return "reopened" as const;
  return item.status;
}

function stateLabel(item: VisibilityGrowthActionRow, copy: Copy) {
  const state = actionState(item);
  if (state === "verified") return copy.verified;
  if (state === "pending") return copy.pending;
  if (state === "reopened") return copy.reopened;
  if (state === "planned") return copy.plan;
  if (state === "in_progress") return copy.progress;
  if (state === "done") return copy.done;
  return copy.open;
}

function eventLabel(event: VisibilityEventRow, copy: Copy) {
  return copy.eventNames[event.event_type] || event.title;
}

export function VisibilityOsAppPage() {
  const { lang } = useI18n();
  const copy = COPY[lang];
  const reduced = useReducedMotion();
  const [session, setSession] = useState<VisibilitySession | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [auth, setAuth] = useState({ email: "", password: "" });
  const [authBusy, setAuthBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState<string | null>(null);
  const [projects, setProjects] = useState<VisibilityProject[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [bundle, setBundle] = useState<VisibilityProjectBundle | null>(null);
  const [loading, setLoading] = useState(false);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState({ name: "", url: "", service: "", location: "", competitors: "" });
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sortedActions = useMemo(
    () => [...(bundle?.actions || [])].sort((a, b) => laneRank(a.lane) - laneRank(b.lane) || b.updated_at.localeCompare(a.updated_at)),
    [bundle?.actions],
  );
  const hasPendingVerification = sortedActions.some((item) => item.status === "done" && item.verification_status === "pending");
  const queueSummary = useMemo(() => ({
    now: sortedActions.filter((item) => item.lane === "now" && item.verification_status !== "verified").length,
    active: sortedActions.filter((item) => item.status === "planned" || item.status === "in_progress").length,
    pending: sortedActions.filter((item) => item.verification_status === "pending").length,
    verified: sortedActions.filter((item) => item.verification_status === "verified").length,
  }), [sortedActions]);

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const valid = await getValidVisibilitySession();
      if (!mounted) return;
      setSession(valid ?? readVisibilitySession());
      setSessionLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const refreshProjects = async (preferredId?: string | null) => {
    const next = await listVisibilityProjects();
    setProjects(next);
    const desired = preferredId || selectedId || next[0]?.id || null;
    setSelectedId(desired);
    return desired;
  };

  const refreshBundle = async (projectId: string) => {
    setLoading(true);
    try { setBundle(await loadVisibilityProjectBundle(projectId)); } finally { setLoading(false); }
  };

  useEffect(() => {
    if (!session) { setProjects([]); setSelectedId(null); setBundle(null); return; }
    void refreshProjects().catch((cause) => setError(cause instanceof Error ? cause.message : "projects_unavailable"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.id]);

  useEffect(() => {
    if (!selectedId || !session) { setBundle(null); return; }
    void refreshBundle(selectedId).catch((cause) => setError(cause instanceof Error ? cause.message : "project_unavailable"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, session?.user.id]);

  const handleAuth = async () => {
    if (!auth.email.trim() || auth.password.length < 6) return;
    setAuthBusy(true); setAuthMessage(null); setError(null);
    try {
      if (authMode === "signin") setSession(await signInVisibilityUser(auth.email, auth.password));
      else {
        const result = await signUpVisibilityUser(auth.email, auth.password, window.location.href.split("#")[0]);
        if (result.session) setSession(result.session); else setAuthMessage(copy.confirmation);
      }
    } catch { setAuthMessage(copy.authError); } finally { setAuthBusy(false); }
  };

  const handleSignOut = async () => { await signOutVisibilityUser(session); setSession(null); setBundle(null); setProjects([]); };

  const runScan = async (project: VisibilityProject, competitors: string[], requestedJobType: "manual" | "verify" = "manual") => {
    const response = await fetch("/api/visibilityos/scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: project.url, lang: project.lang, service: project.service, location: project.location, competitors }) });
    const payload = await response.json() as { ok?: boolean; result?: VisibilitySiteScanResult; error?: string };
    if (!response.ok || !payload.ok || !payload.result) throw new Error(payload.error || `scan_http_${response.status}`);
    await recordVisibilityUserScan(project.id, payload.result, requestedJobType);
  };

  const handleCreate = async () => {
    if (!createForm.url.trim()) return;
    setBusyAction("create"); setError(null); setNotice(null);
    try {
      const competitors = createForm.competitors.split(/\n|,/).map((item) => item.trim()).filter(Boolean).slice(0, 2);
      const projectId = await createVisibilityProject({ name: createForm.name.trim() || createForm.url.trim(), url: createForm.url.trim(), lang, service: createForm.service.trim(), location: createForm.location.trim(), competitors });
      const project: VisibilityProject = { id: projectId, name: createForm.name.trim() || createForm.url.trim(), url: createForm.url.trim(), lang, service: createForm.service.trim(), location: createForm.location.trim(), status: "active", monitoring_enabled: true, daily_health_enabled: true, weekly_full_scan_enabled: true, last_score: null, last_scan_at: null, next_daily_scan_at: new Date().toISOString(), next_weekly_scan_at: new Date().toISOString(), created_at: new Date().toISOString() };
      try { await runScan(project, competitors, "manual"); } catch { setNotice(copy.scanFailed); }
      setShowCreate(false); setCreateForm({ name: "", url: "", service: "", location: "", competitors: "" });
      await refreshProjects(projectId); await refreshBundle(projectId); setNotice((current) => current || copy.saved);
    } catch (cause) { setError(cause instanceof Error ? cause.message : "project_create_failed"); } finally { setBusyAction(null); }
  };

  const handleRescan = async () => {
    if (!bundle) return;
    const verification = hasPendingVerification;
    setBusyAction("scan"); setError(null); setNotice(null);
    try {
      await runScan(bundle.project, bundle.competitors.map((item) => item.url), verification ? "verify" : "manual");
      await refreshProjects(bundle.project.id); await refreshBundle(bundle.project.id); setNotice(verification ? copy.verificationComplete : copy.saved);
    } catch (cause) { setError(cause instanceof Error ? cause.message : copy.scanFailed); } finally { setBusyAction(null); }
  };

  const handleAction = async (item: VisibilityGrowthActionRow, status: VisibilityGrowthActionRow["status"]) => {
    setBusyAction(item.id); setError(null); setNotice(null);
    try { await setVisibilityActionStatus(item.id, status); if (bundle) await refreshBundle(bundle.project.id); setNotice(copy.saved); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "action_update_failed"); }
    finally { setBusyAction(null); }
  };

  const patchProject = async (patch: Parameters<typeof updateVisibilityProject>[1], busyKey: string) => {
    if (!bundle) return;
    setBusyAction(busyKey); setError(null); setNotice(null);
    try { await updateVisibilityProject(bundle.project.id, patch); await refreshProjects(bundle.project.id); await refreshBundle(bundle.project.id); setNotice(copy.saved); }
    catch (cause) { setError(cause instanceof Error ? cause.message : "project_update_failed"); }
    finally { setBusyAction(null); }
  };

  if (sessionLoading) return <LoadingShell />;

  if (!session) {
    return <div className="min-h-screen overflow-hidden bg-[#020304] text-white"><Header /><main className="relative border-b border-white/[.07] px-4 pb-24 pt-32 sm:pb-32 sm:pt-40"><DashboardBackdrop /><div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.04fr_.96fr] lg:items-center"><motion.div initial={reduced ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}><span className="text-[10px] font-semibold uppercase tracking-[.25em] text-sky-200/75">{copy.badge}</span><h1 className="section-title mt-5 max-w-3xl text-[clamp(3rem,6vw,6.5rem)] leading-[.93] text-zinc-100">{copy.title}<em className="bg-gradient-to-br from-sky-100 via-sky-300 to-amber-200 bg-clip-text font-normal italic text-transparent">{copy.titleAccent}</em></h1><p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">{copy.lead}</p><div className="mt-8 flex flex-wrap gap-2"><FeaturePill icon={ShieldCheck} label="RLS tenant isolation" accent="sky" /><FeaturePill icon={Activity} label={copy.autoStatus} accent="emerald" /><FeaturePill icon={CheckCircle2} label="Evidence → action → verify" accent="amber" /></div></motion.div><motion.div initial={reduced ? false : { opacity: 0, y: 22, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: .55 }} className={`${PANEL} relative overflow-hidden p-6 sm:p-8`}><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(56,189,248,.14),transparent_42%),radial-gradient(circle_at_88%_100%,rgba(212,175,55,.08),transparent_38%)]" /><div className="relative"><div className="flex rounded-xl border border-white/[.08] bg-black/45 p-1"><button type="button" onClick={() => { setAuthMode("signin"); setAuthMessage(null); }} className={`flex-1 rounded-lg px-4 py-2.5 text-sm transition ${authMode === "signin" ? "bg-gradient-to-r from-sky-300/12 to-amber-200/8 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>{copy.signIn}</button><button type="button" onClick={() => { setAuthMode("signup"); setAuthMessage(null); }} className={`flex-1 rounded-lg px-4 py-2.5 text-sm transition ${authMode === "signup" ? "bg-gradient-to-r from-sky-300/12 to-amber-200/8 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>{copy.createAccount}</button></div><div className="mt-6 grid gap-4"><Field label={copy.email}><Input type="email" autoComplete="email" value={auth.email} onChange={(event) => setAuth((old) => ({ ...old, email: event.target.value }))} className="mt-2 h-12 border-white/10 bg-black/35 text-white focus-visible:ring-sky-300/25" /></Field><Field label={copy.password}><Input type="password" autoComplete={authMode === "signin" ? "current-password" : "new-password"} value={auth.password} onChange={(event) => setAuth((old) => ({ ...old, password: event.target.value }))} className="mt-2 h-12 border-white/10 bg-black/35 text-white focus-visible:ring-sky-300/25" /></Field>{authMessage ? <p className="rounded-xl border border-sky-300/15 bg-sky-300/[.045] p-3 text-sm leading-6 text-sky-100/85">{authMessage}</p> : null}<Button onClick={() => void handleAuth()} disabled={authBusy || !auth.email.trim() || auth.password.length < 6} className="premium-button h-12 w-full disabled:opacity-50">{authBusy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}{authMode === "signin" ? copy.submitSignIn : copy.submitSignUp}</Button><p className="text-center text-[11px] leading-5 text-zinc-600">{copy.accountNote}</p></div></div></motion.div></div></main><FooterSection /></div>;
  }

  return <div className="min-h-screen overflow-x-hidden bg-[#020304] text-white"><Header /><main className="relative border-b border-white/[.07] pb-24 pt-28 sm:pt-32"><DashboardBackdrop /><div className="container relative z-10 mx-auto max-w-[1460px] px-4 sm:px-6"><div className="flex flex-col justify-between gap-5 border-b border-white/[.07] pb-7 md:flex-row md:items-end"><div><p className="text-[10px] font-semibold uppercase tracking-[.24em] text-sky-200/75">{copy.badge}</p><h1 className="section-title mt-3 text-[clamp(2.8rem,5vw,5rem)] leading-none text-zinc-100">Visibility<span className="bg-gradient-to-r from-sky-200 via-sky-300 to-amber-200 bg-clip-text text-transparent">OS</span></h1><div className="mt-4 flex flex-wrap gap-2"><FeaturePill icon={Gauge} label={copy.appStatus} accent="amber" /><FeaturePill icon={Activity} label={copy.autoStatus} accent="emerald" /></div></div><div className="flex items-center gap-3"><span className="hidden text-xs text-zinc-500 sm:inline">{session.user.email}</span><Button variant="outline" onClick={() => void handleSignOut()} className="border-white/10 bg-black/25 text-zinc-300 hover:border-white/20 hover:bg-white/[.05] hover:text-white"><LogOut className="mr-2 h-4 w-4" />{copy.signOut}</Button></div></div>{notice ? <div className="mt-5 rounded-2xl border border-emerald-300/15 bg-emerald-300/[.045] px-4 py-3 text-sm text-emerald-100/90 shadow-[0_14px_50px_-30px_rgba(52,211,153,.45)]">{notice}</div> : null}{error ? <div className="mt-5 rounded-2xl border border-red-300/15 bg-red-300/[.04] px-4 py-3 text-sm text-red-200">{error}</div> : null}<div className="mt-7 grid gap-6 lg:grid-cols-[300px_minmax(0,1fr)]"><aside className={`${PANEL} h-fit p-4 lg:sticky lg:top-24`}><div className="flex items-center justify-between gap-3 px-2 py-1"><div><p className="text-[10px] uppercase tracking-[.18em] text-zinc-600">VisibilityOS</p><h2 className="mt-1 text-sm font-semibold text-zinc-200">{copy.projects}</h2></div><button type="button" onClick={() => setShowCreate(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-sky-300/20 bg-sky-300/[.06] text-sky-100 transition hover:border-amber-200/30 hover:bg-amber-200/[.07] hover:text-amber-100" aria-label={copy.newProject}><Plus className="h-4 w-4" /></button></div><div className="mt-4 grid gap-2.5">{projects.map((project) => <button key={project.id} type="button" onClick={() => { setSelectedId(project.id); setShowCreate(false); }} className={`group rounded-2xl border p-3.5 text-left transition ${selectedId === project.id ? "border-sky-300/25 bg-[linear-gradient(135deg,rgba(56,189,248,.09),rgba(212,175,55,.035))] shadow-[0_14px_35px_-28px_rgba(56,189,248,.8)]" : "border-white/[.07] bg-black/25 hover:border-white/[.13] hover:bg-white/[.025]"}`}><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-medium text-zinc-200">{project.name}</p><p className="mt-1 truncate text-[10px] text-zinc-600">{project.url}</p></div><span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${project.monitoring_enabled ? "bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,.65)]" : "bg-zinc-700"}`} /></div><div className="mt-3 flex items-center justify-between"><span className="font-display text-xl text-zinc-100">{project.last_score ?? "—"}<span className="ml-1 text-[10px] text-zinc-600">/100</span></span><ArrowUpRight className="h-3.5 w-3.5 text-zinc-700 transition group-hover:text-sky-200" /></div></button>)}{!projects.length ? <p className="px-2 py-5 text-xs leading-6 text-zinc-600">{copy.noProjects}</p> : null}</div><Button onClick={() => setShowCreate(true)} className="mt-4 h-11 w-full border border-white/[.08] bg-white/[.025] text-xs text-zinc-300 hover:border-sky-300/20 hover:bg-sky-300/[.05] hover:text-sky-100"><Plus className="mr-2 h-3.5 w-3.5" />{copy.newProject}</Button></aside><section className="min-w-0">{showCreate || !projects.length ? <CreateProjectPanel copy={copy} form={createForm} setForm={setCreateForm} busy={busyAction === "create"} onCreate={() => void handleCreate()} /> : loading || !bundle ? <div className={`${PANEL} flex min-h-[520px] items-center justify-center`}><Loader2 className="h-6 w-6 animate-spin text-sky-200" /></div> : <div className="grid gap-6"><ProjectHero bundle={bundle} copy={copy} busyAction={busyAction} hasPendingVerification={hasPendingVerification} onMonitoring={() => void patchProject({ monitoring_enabled: !bundle.project.monitoring_enabled }, "monitoring")} onRescan={() => void handleRescan()} /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><SummaryCard icon={Target} label={copy.now} value={String(queueSummary.now)} accent="amber" /><SummaryCard icon={Activity} label={copy.active} value={String(queueSummary.active)} accent="sky" /><SummaryCard icon={Clock3} label={copy.pendingCount} value={String(queueSummary.pending)} accent="violet" /><SummaryCard icon={CheckCircle2} label={copy.verifiedCount} value={String(queueSummary.verified)} accent="emerald" /></div><div className={`${PANEL} overflow-hidden p-5 sm:p-7`}><div className="flex flex-col justify-between gap-4 md:flex-row md:items-start"><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-sky-300/20 bg-sky-300/[.06] text-sky-100 shadow-[0_0_30px_-14px_rgba(56,189,248,.7)]"><Target className="h-4 w-4" /></span><div><p className="text-[10px] font-semibold uppercase tracking-[.2em] text-sky-200/70">Priority execution</p><h2 className="mt-1 text-2xl font-semibold text-zinc-100">{copy.queue}</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-400">{copy.queueLead}</p></div></div>{hasPendingVerification ? <Button onClick={() => void handleRescan()} disabled={busyAction === "scan"} className="premium-button h-11 shrink-0 px-5">{busyAction === "scan" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShieldCheck className="mr-2 h-4 w-4" />}{copy.verifyNow}</Button> : null}</div><div className="mt-7 grid gap-4">{sortedActions.map((item) => <ActionCard key={item.id} item={item} copy={copy} busy={busyAction === item.id} onStatus={(status) => void handleAction(item, status)} />)}{!sortedActions.length ? <div className="rounded-2xl border border-emerald-300/15 bg-emerald-300/[.035] p-6 text-sm text-emerald-100/80"><CheckCircle2 className="mb-3 h-5 w-5" />{copy.noActions}</div> : null}</div></div><div className="grid gap-6 xl:grid-cols-[1.08fr_.92fr]"><ScoreHistoryCard copy={copy} runs={bundle.runs} currentScore={bundle.project.last_score} /><MonitoringCard bundle={bundle} copy={copy} busyAction={busyAction} onToggle={(field, value) => void patchProject(field === "daily_health_enabled" ? { daily_health_enabled: value } : { weekly_full_scan_enabled: value }, `cadence:${field}`)} /></div><div className="grid gap-6 xl:grid-cols-2"><EventsCard copy={copy} events={bundle.events} /><HistoryCard copy={copy} runs={bundle.runs} /></div></div>}</section></div></div></main><FooterSection /></div>;
}

function DashboardBackdrop() { return <div className="pointer-events-none absolute inset-0" aria-hidden="true"><div className="absolute left-1/2 top-0 h-[640px] w-[95%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,.105),rgba(212,175,55,.028)_40%,transparent_70%)]" /><div className="absolute left-1/2 top-8 h-px w-[min(900px,82vw)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-300/25 to-transparent shadow-[0_0_30px_rgba(56,189,248,.16)]" /></div>; }
function LoadingShell() { return <div className="min-h-screen bg-[#020304] text-white"><Header /><main className="flex min-h-[72vh] items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-sky-200" /></main><FooterSection /></div>; }
function Field({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) { return <div><label className="text-sm font-medium text-zinc-300">{label}</label>{children}{hint ? <p className="mt-1.5 text-[10px] leading-5 text-zinc-600">{hint}</p> : null}</div>; }
function FeaturePill({ icon: Icon, label, accent }: { icon: LucideIcon; label: string; accent: "sky" | "amber" | "emerald" }) { const tone = accent === "sky" ? "border-sky-300/15 bg-sky-300/[.04] text-sky-100" : accent === "amber" ? "border-amber-200/15 bg-amber-200/[.04] text-amber-100" : "border-emerald-300/15 bg-emerald-300/[.04] text-emerald-100"; return <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] ${tone}`}><Icon className="mr-1.5 h-3.5 w-3.5" />{label}</span>; }

function CreateProjectPanel({ copy, form, setForm, busy, onCreate }: { copy: Copy; form: { name: string; url: string; service: string; location: string; competitors: string }; setForm: Dispatch<SetStateAction<{ name: string; url: string; service: string; location: string; competitors: string }>>; busy: boolean; onCreate: () => void }) {
  return <div className={`${PANEL} relative overflow-hidden p-6 sm:p-8`}><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,.11),transparent_38%),radial-gradient(circle_at_90%_100%,rgba(212,175,55,.06),transparent_36%)]" /><div className="relative"><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-sky-200/75">{copy.newProject}</p><h2 className="section-title mt-3 text-3xl text-zinc-100 sm:text-4xl">{copy.createFirst}</h2><div className="mt-8 grid gap-5"><Field label={copy.projectName}><Input value={form.name} onChange={(event) => setForm((old) => ({ ...old, name: event.target.value }))} className="mt-2 h-12 border-white/10 bg-black/35 text-white" /></Field><Field label={`${copy.website} *`}><Input value={form.url} onChange={(event) => setForm((old) => ({ ...old, url: event.target.value }))} placeholder="https://example.com" className="mt-2 h-12 border-white/10 bg-black/35 text-white" /></Field><div className="grid gap-5 sm:grid-cols-2"><Field label={copy.service}><Input value={form.service} onChange={(event) => setForm((old) => ({ ...old, service: event.target.value }))} className="mt-2 h-12 border-white/10 bg-black/35 text-white" /></Field><Field label={copy.location} hint={copy.locationHint}><Input value={form.location} onChange={(event) => setForm((old) => ({ ...old, location: event.target.value }))} className="mt-2 h-12 border-white/10 bg-black/35 text-white" /></Field></div><Field label={copy.competitors}><textarea value={form.competitors} onChange={(event) => setForm((old) => ({ ...old, competitors: event.target.value }))} rows={3} className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-black/35 px-3 py-3 text-sm text-white outline-none transition focus:border-sky-300/25" /></Field><Button onClick={onCreate} disabled={busy || !form.url.trim()} className="premium-button h-12 w-full disabled:opacity-50">{busy ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{copy.creating}</> : <><Search className="mr-2 h-4 w-4" />{copy.createAndScan}</>}</Button></div></div></div>;
}

function ProjectHero({ bundle, copy, busyAction, hasPendingVerification, onMonitoring, onRescan }: { bundle: VisibilityProjectBundle; copy: Copy; busyAction: string | null; hasPendingVerification: boolean; onMonitoring: () => void; onRescan: () => void }) {
  const project = bundle.project;
  return <div className={`${PANEL} relative overflow-hidden p-6 sm:p-8`}><div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(56,189,248,.12),transparent_36%),radial-gradient(circle_at_92%_100%,rgba(212,175,55,.075),transparent_34%)]" /><div className="relative"><div className="flex flex-col justify-between gap-6 xl:flex-row xl:items-start"><div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-sky-200/70">{copy.dashboard}</p><h2 className="section-title mt-3 truncate text-3xl text-zinc-100 sm:text-4xl">{project.name}</h2><a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex max-w-full items-center gap-1.5 truncate text-xs text-zinc-500 transition hover:text-sky-200">{project.url}<ArrowUpRight className="h-3 w-3" /></a><div className="mt-4 flex flex-wrap gap-2">{project.service ? <span className="rounded-full border border-sky-300/[.12] bg-sky-300/[.025] px-3 py-1.5 text-[10px] text-zinc-400">{project.service}</span> : null}{project.location ? <span className="rounded-full border border-amber-200/[.12] bg-amber-200/[.025] px-3 py-1.5 text-[10px] text-zinc-400">{project.location}</span> : null}</div></div><div className="flex flex-wrap gap-2"><Button variant="outline" onClick={onMonitoring} disabled={busyAction === "monitoring"} className="h-11 border-white/10 bg-black/30 text-zinc-300 hover:border-white/20 hover:bg-white/[.05] hover:text-white">{busyAction === "monitoring" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : project.monitoring_enabled ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}{project.monitoring_enabled ? copy.pause : copy.resume}</Button><Button onClick={onRescan} disabled={busyAction === "scan"} className={`${hasPendingVerification ? "premium-button" : "border border-sky-300/20 bg-sky-300/[.07] text-sky-50 hover:bg-sky-300/[.12]"} h-11`}>{busyAction === "scan" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : hasPendingVerification ? <ShieldCheck className="mr-2 h-4 w-4" /> : <RefreshCw className="mr-2 h-4 w-4" />}{hasPendingVerification ? copy.verifyNow : copy.rescan}</Button></div></div><div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><MetricCard icon={BarChart3} label={copy.score} value={project.last_score == null ? "—" : `${project.last_score}/100`} accent="sky" /><MetricCard icon={Clock3} label={copy.lastScan} value={safeDate(project.last_scan_at)} accent="amber" /><MetricCard icon={ShieldCheck} label={copy.nextDaily} value={safeDate(project.next_daily_scan_at)} accent="emerald" /><MetricCard icon={TrendingUp} label={copy.nextWeekly} value={safeDate(project.next_weekly_scan_at)} accent="violet" /></div></div></div>;
}

function MetricCard({ icon: Icon, label, value, accent }: { icon: LucideIcon; label: string; value: string; accent: "sky" | "amber" | "emerald" | "violet" }) { const iconTone = accent === "sky" ? "text-sky-200 border-sky-300/15 bg-sky-300/[.05]" : accent === "amber" ? "text-amber-200 border-amber-200/15 bg-amber-200/[.05]" : accent === "emerald" ? "text-emerald-200 border-emerald-300/15 bg-emerald-300/[.05]" : "text-violet-200 border-violet-300/15 bg-violet-300/[.05]"; return <div className="rounded-2xl border border-white/[.075] bg-black/30 p-4"><span className={`flex h-9 w-9 items-center justify-center rounded-xl border ${iconTone}`}><Icon className="h-4 w-4" /></span><p className="mt-4 text-[9px] font-semibold uppercase tracking-[.15em] text-zinc-600">{label}</p><p className="mt-2 text-sm font-medium text-zinc-200">{value}</p></div>; }
function SummaryCard({ icon: Icon, label, value, accent }: { icon: LucideIcon; label: string; value: string; accent: "sky" | "amber" | "emerald" | "violet" }) { const tone = accent === "sky" ? "from-sky-300/[.07] border-sky-300/15 text-sky-200" : accent === "amber" ? "from-amber-200/[.07] border-amber-200/15 text-amber-200" : accent === "emerald" ? "from-emerald-300/[.07] border-emerald-300/15 text-emerald-200" : "from-violet-300/[.07] border-violet-300/15 text-violet-200"; return <div className={`rounded-2xl border bg-gradient-to-br ${tone} to-transparent p-4`}><div className="flex items-center justify-between"><Icon className="h-4 w-4" /><span className="font-display text-3xl text-zinc-100">{value}</span></div><p className="mt-4 text-[10px] uppercase tracking-[.14em] text-zinc-500">{label}</p></div>; }

function ActionCard({ item, copy, busy, onStatus }: { item: VisibilityGrowthActionRow; copy: Copy; busy: boolean; onStatus: (status: VisibilityGrowthActionRow["status"]) => void }) {
  const state = actionState(item);
  const laneTone = item.lane === "now" ? "border-amber-200/20 bg-amber-200/[.035] text-amber-100" : item.lane === "next" ? "border-sky-300/20 bg-sky-300/[.035] text-sky-100" : "border-violet-300/20 bg-violet-300/[.035] text-violet-100";
  const stateTone = state === "verified" ? "border-emerald-300/20 bg-emerald-300/[.05] text-emerald-100" : state === "pending" ? "border-violet-300/20 bg-violet-300/[.05] text-violet-100" : state === "reopened" ? "border-amber-300/20 bg-amber-300/[.05] text-amber-100" : state === "in_progress" ? "border-sky-300/20 bg-sky-300/[.05] text-sky-100" : "border-white/[.09] bg-white/[.025] text-zinc-300";
  const verified = state === "verified";
  return <div className={`relative overflow-hidden rounded-[24px] border p-5 sm:p-6 ${verified ? "border-emerald-300/18 bg-[linear-gradient(135deg,rgba(52,211,153,.055),rgba(255,255,255,.012))]" : "border-white/[.085] bg-[linear-gradient(145deg,rgba(255,255,255,.028),rgba(0,0,0,.2))]"}`}><div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-sky-300/40 to-amber-200/35" /><div className="flex flex-col gap-5"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-start"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className={`rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.15em] ${laneTone}`}>{item.lane}</span><span className={`rounded-full border px-2.5 py-1 text-[9px] font-medium ${stateTone}`}>{stateLabel(item, copy)}</span>{item.impact ? <MetaChip label={`${copy.impact}: ${item.impact}`} /> : null}{item.confidence ? <MetaChip label={`${copy.confidence}: ${item.confidence}`} /> : null}{item.effort ? <MetaChip label={`${copy.effort}: ${item.effort}`} /> : null}</div><h3 className="mt-4 text-lg font-semibold leading-7 text-zinc-100">{item.title}</h3></div>{verified ? <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/20 bg-emerald-300/[.06] text-emerald-200"><CheckCircle2 className="h-5 w-5" /></span> : null}</div><StageRail item={item} copy={copy} /><div className="grid gap-3 lg:grid-cols-3">{item.reason ? <InfoCell label={copy.why} text={item.reason} accent="amber" /> : null}{item.evidence ? <InfoCell label={copy.evidence} text={item.evidence} accent="sky" /> : null}{item.action ? <InfoCell label={copy.nextMove} text={item.action} accent="emerald" /> : null}</div>{!verified ? <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[.06] pt-4"><p className="text-[10px] text-zinc-600">{state === "pending" ? copy.pending : state === "reopened" ? copy.reopened : `${copy.status}: ${stateLabel(item, copy)}`}</p>{busy ? <span className="flex h-10 items-center px-4"><Loader2 className="h-4 w-4 animate-spin text-sky-200" /></span> : <div className="flex flex-wrap gap-2"><ActionButton label={copy.plan} onClick={() => onStatus("planned")} active={item.status === "planned"} tone="amber" disabled={state === "pending"} /><ActionButton label={copy.progress} onClick={() => onStatus("in_progress")} active={item.status === "in_progress"} tone="sky" disabled={state === "pending"} /><ActionButton label={copy.done} onClick={() => onStatus("done")} active={item.status === "done"} tone="emerald" disabled={state === "pending"} /><button type="button" onClick={() => onStatus("dismissed")} disabled={state === "pending"} className="h-10 rounded-xl border border-white/[.08] bg-black/25 px-3.5 text-[11px] text-zinc-500 transition hover:border-red-300/15 hover:bg-red-300/[.035] hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-40"><X className="mr-1.5 inline h-3.5 w-3.5" />{copy.dismiss}</button></div>}</div> : <div className="border-t border-emerald-300/10 pt-4 text-xs text-emerald-100/70">{copy.verified} · {safeDate(item.verified_at)}</div>}</div></div>;
}
function MetaChip({ label }: { label: string }) { return <span className="rounded-full border border-white/[.07] bg-black/25 px-2.5 py-1 text-[9px] text-zinc-500">{label}</span>; }
function StageRail({ item, copy }: { item: VisibilityGrowthActionRow; copy: Copy }) { const stages = [{ id: "open", label: copy.open }, { id: "planned", label: copy.plan }, { id: "in_progress", label: copy.progress }, { id: "done", label: item.verification_status === "verified" ? copy.verified : item.verification_status === "pending" ? copy.pending : copy.done }]; const current = item.verification_status === "verified" || item.verification_status === "pending" ? 3 : item.status === "in_progress" ? 2 : item.status === "planned" ? 1 : 0; return <div className="grid grid-cols-4 gap-1.5">{stages.map((stage, index) => <div key={stage.id}><div className={`h-1.5 rounded-full transition ${index <= current ? index === 3 && item.verification_status === "verified" ? "bg-emerald-300" : "bg-gradient-to-r from-sky-300 to-amber-200" : "bg-white/[.06]"}`} /><p className={`mt-2 hidden text-[9px] sm:block ${index <= current ? "text-zinc-400" : "text-zinc-700"}`}>{stage.label}</p></div>)}</div>; }
function InfoCell({ label, text, accent }: { label: string; text: string; accent: "sky" | "amber" | "emerald" }) { const tone = accent === "sky" ? "text-sky-200" : accent === "amber" ? "text-amber-200" : "text-emerald-200"; return <div className="rounded-2xl border border-white/[.065] bg-black/28 p-4"><p className={`text-[9px] font-semibold uppercase tracking-[.15em] ${tone}`}>{label}</p><p className="mt-2 break-words text-xs leading-6 text-zinc-400">{text}</p></div>; }
function ActionButton({ label, onClick, active, tone, disabled }: { label: string; onClick: () => void; active: boolean; tone: "sky" | "amber" | "emerald"; disabled?: boolean }) { const styles = tone === "sky" ? "border-sky-300/20 bg-sky-300/[.055] text-sky-100 hover:bg-sky-300/[.1]" : tone === "amber" ? "border-amber-200/20 bg-amber-200/[.055] text-amber-100 hover:bg-amber-200/[.1]" : "border-emerald-300/20 bg-emerald-300/[.055] text-emerald-100 hover:bg-emerald-300/[.1]"; return <button type="button" onClick={onClick} disabled={disabled} className={`h-10 rounded-xl border px-4 text-[11px] font-medium transition disabled:cursor-not-allowed disabled:opacity-35 ${styles} ${active ? "ring-1 ring-white/20" : ""}`}>{active ? <Check className="mr-1.5 inline h-3.5 w-3.5" /> : null}{label}</button>; }

function ScoreHistoryCard({ copy, runs, currentScore }: { copy: Copy; runs: VisibilityScanRunRow[]; currentScore: number | null }) {
  const points = runs.filter((run) => run.status === "success" && typeof run.result?.score === "number").slice(0, 10).reverse();
  const previous = points.length > 1 ? points[points.length - 2].result?.score : null;
  const delta = typeof currentScore === "number" && typeof previous === "number" ? currentScore - previous : null;
  return <div className={`${PANEL} p-5 sm:p-7`}><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-semibold uppercase tracking-[.18em] text-sky-200/70">Visibility intelligence</p><h2 className="mt-1 text-xl font-semibold text-zinc-100">{copy.scoreTrend}</h2></div><div className="text-right"><p className="font-display text-4xl text-zinc-100">{currentScore ?? "—"}</p>{delta !== null ? <p className={`mt-1 text-xs ${delta > 0 ? "text-emerald-300" : delta < 0 ? "text-amber-300" : "text-zinc-600"}`}>{delta > 0 ? "+" : ""}{delta} vs previous</p> : null}</div></div><div className="mt-6"><ScoreChart points={points} /></div><div className="mt-5 flex flex-wrap gap-2">{points.slice(-4).map((run) => <span key={run.id} className="rounded-full border border-white/[.07] bg-black/25 px-3 py-1.5 text-[10px] text-zinc-500">{copy.runNames[run.job_type]} · {run.result?.score ?? "—"}</span>)}</div></div>;
}
function ScoreChart({ points }: { points: VisibilityScanRunRow[] }) { if (!points.length) return <div className="flex h-28 items-center justify-center rounded-2xl border border-white/[.06] bg-black/25 text-xs text-zinc-600">No full-scan score history yet</div>; const values = points.map((run) => Number(run.result?.score || 0)); const width = 520; const height = 120; const coords = values.map((value, index) => ({ x: values.length === 1 ? width / 2 : index / (values.length - 1) * width, y: height - Math.max(0, Math.min(100, value)) / 100 * (height - 16) - 8 })); const path = coords.map((point, index) => `${index ? "L" : "M"}${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" "); return <div className="overflow-hidden rounded-2xl border border-sky-300/[.09] bg-[linear-gradient(180deg,rgba(56,189,248,.045),rgba(0,0,0,.2))] p-3"><svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Visibility score history" className="h-28 w-full"><defs><linearGradient id="visibility-line" x1="0" x2="1"><stop offset="0" stopColor="rgb(125 211 252)" /><stop offset="1" stopColor="rgb(253 230 138)" /></linearGradient></defs>{[25, 50, 75].map((tick) => <line key={tick} x1="0" y1={height - tick / 100 * (height - 16) - 8} x2={width} y2={height - tick / 100 * (height - 16) - 8} stroke="rgba(255,255,255,.05)" strokeWidth="1" />)}<path d={path} fill="none" stroke="url(#visibility-line)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />{coords.map((point, index) => <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r="4" fill={index === coords.length - 1 ? "rgb(253 230 138)" : "rgb(125 211 252)"} />)}</svg></div>; }

function MonitoringCard({ bundle, copy, busyAction, onToggle }: { bundle: VisibilityProjectBundle; copy: Copy; busyAction: string | null; onToggle: (field: "daily_health_enabled" | "weekly_full_scan_enabled", value: boolean) => void }) { const project = bundle.project; return <div className={`${PANEL} p-5 sm:p-7`}><div className="flex items-start gap-3"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-300/15 bg-emerald-300/[.05] text-emerald-200"><MonitorCheck className="h-4 w-4" /></span><div><h2 className="text-xl font-semibold text-zinc-100">{copy.cadence}</h2><p className="mt-2 text-sm leading-7 text-zinc-500">{copy.cadenceLead}</p></div></div>{!project.monitoring_enabled ? <div className="mt-5 rounded-2xl border border-amber-200/15 bg-amber-200/[.035] p-4 text-xs text-amber-100/80">{copy.monitoringPaused}</div> : null}<div className="mt-5 grid gap-3"><CadenceRow icon={ShieldCheck} label={copy.dailyHealth} detail={safeDate(project.next_daily_scan_at)} enabled={project.daily_health_enabled} busy={busyAction === "cadence:daily_health_enabled"} onToggle={() => onToggle("daily_health_enabled", !project.daily_health_enabled)} copy={copy} /><CadenceRow icon={TrendingUp} label={copy.weeklyGrowth} detail={safeDate(project.next_weekly_scan_at)} enabled={project.weekly_full_scan_enabled} busy={busyAction === "cadence:weekly_full_scan_enabled"} onToggle={() => onToggle("weekly_full_scan_enabled", !project.weekly_full_scan_enabled)} copy={copy} /></div></div>; }
function CadenceRow({ icon: Icon, label, detail, enabled, busy, onToggle, copy }: { icon: LucideIcon; label: string; detail: string; enabled: boolean; busy: boolean; onToggle: () => void; copy: Copy }) { return <button type="button" onClick={onToggle} disabled={busy} className={`flex items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${enabled ? "border-sky-300/14 bg-sky-300/[.035]" : "border-white/[.07] bg-black/25"}`}><div className="flex min-w-0 items-center gap-3"><span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border ${enabled ? "border-sky-300/15 bg-sky-300/[.05] text-sky-200" : "border-white/[.07] text-zinc-600"}`}><Icon className="h-4 w-4" /></span><div className="min-w-0"><p className="text-sm font-medium text-zinc-200">{label}</p><p className="mt-1 truncate text-[10px] text-zinc-600">{detail}</p></div></div>{busy ? <Loader2 className="h-4 w-4 animate-spin text-sky-200" /> : <span className={`rounded-full border px-2.5 py-1 text-[9px] ${enabled ? "border-emerald-300/15 bg-emerald-300/[.04] text-emerald-200" : "border-white/[.07] text-zinc-600"}`}>{enabled ? copy.on : copy.off}</span>}</button>; }

function EventsCard({ copy, events }: { copy: Copy; events: VisibilityEventRow[] }) { return <div className={`${PANEL} p-5 sm:p-7`}><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-200/15 bg-amber-200/[.045] text-amber-200"><Bell className="h-4 w-4" /></span><div><p className="text-[10px] uppercase tracking-[.16em] text-zinc-600">Evidence changes</p><h2 className="mt-1 text-lg font-semibold text-zinc-100">{copy.events}</h2></div></div><div className="mt-5 grid gap-3">{events.slice(0, 10).map((event) => <EventRow key={event.id} event={event} copy={copy} />)}{!events.length ? <p className="text-sm text-zinc-600">{copy.noEvents}</p> : null}</div></div>; }
function EventRow({ event, copy }: { event: VisibilityEventRow; copy: Copy }) { const tone = event.severity === "critical" ? "border-red-300/15 bg-red-300/[.03] text-red-300" : event.severity === "warning" ? "border-amber-300/15 bg-amber-300/[.03] text-amber-300" : event.severity === "positive" ? "border-emerald-300/15 bg-emerald-300/[.03] text-emerald-300" : "border-sky-300/10 bg-sky-300/[.025] text-sky-200"; return <div className="rounded-2xl border border-white/[.065] bg-black/25 p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-zinc-300">{eventLabel(event, copy)}</p><p className="mt-1 text-[10px] text-zinc-600">{safeDate(event.created_at)}</p></div><span className={`rounded-full border px-2 py-1 text-[9px] ${tone}`}>{event.severity}</span></div></div>; }
function HistoryCard({ copy, runs }: { copy: Copy; runs: VisibilityScanRunRow[] }) { return <div className={`${PANEL} p-5 sm:p-7`}><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/[.045] text-sky-200"><Globe2 className="h-4 w-4" /></span><div><p className="text-[10px] uppercase tracking-[.16em] text-zinc-600">Audit trail</p><h2 className="mt-1 text-lg font-semibold text-zinc-100">{copy.history}</h2></div></div><div className="mt-5 grid gap-3">{runs.slice(0, 10).map((run) => <div key={run.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.065] bg-black/25 p-4"><div className="min-w-0"><div className="flex items-center gap-2"><p className="text-sm font-medium text-zinc-300">{copy.runNames[run.job_type]}</p>{typeof run.result?.score === "number" ? <span className="rounded-full border border-sky-300/10 bg-sky-300/[.025] px-2 py-0.5 text-[9px] text-sky-200">{run.result.score}/100</span> : null}</div><p className="mt-1 text-[10px] text-zinc-600">{safeDate(run.finished_at)}</p>{run.error ? <p className="mt-2 max-w-sm truncate text-[10px] text-red-300/70">{run.error}</p> : null}</div><span className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] ${run.status === "success" ? "border-emerald-300/15 bg-emerald-300/[.035] text-emerald-300" : "border-red-300/15 bg-red-300/[.035] text-red-300"}`}>{run.status === "success" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{run.status}</span></div>)}{!runs.length ? <p className="text-sm text-zinc-600">{copy.noHistory}</p> : null}</div></div>; }
