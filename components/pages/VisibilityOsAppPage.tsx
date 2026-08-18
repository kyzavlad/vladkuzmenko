"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bell,
  CheckCircle2,
  Clock3,
  Globe2,
  Loader2,
  LogOut,
  MonitorCheck,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  XCircle,
} from "lucide-react";

import { FooterSection } from "@/components/FooterSection";
import { Header } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/components/i18n-provider";
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
  type VisibilityGrowthActionRow,
  type VisibilityProject,
  type VisibilityProjectBundle,
  type VisibilitySession,
} from "@/lib/visibilityos-client";

type Copy = {
  badge: string;
  title: string;
  lead: string;
  signIn: string;
  createAccount: string;
  email: string;
  password: string;
  submitSignIn: string;
  submitSignUp: string;
  confirmation: string;
  authError: string;
  projects: string;
  newProject: string;
  noProjects: string;
  createFirst: string;
  projectName: string;
  website: string;
  service: string;
  location: string;
  competitors: string;
  createAndScan: string;
  creating: string;
  dashboard: string;
  lastScan: string;
  nextDaily: string;
  nextWeekly: string;
  monitoring: string;
  pause: string;
  resume: string;
  rescan: string;
  verifyNow: string;
  score: string;
  queue: string;
  queueLead: string;
  history: string;
  events: string;
  noActions: string;
  noEvents: string;
  noHistory: string;
  plan: string;
  progress: string;
  done: string;
  dismiss: string;
  open: string;
  pending: string;
  verified: string;
  reopened: string;
  signOut: string;
  scanning: string;
  scanFailed: string;
  saved: string;
  accountNote: string;
  appStatus: string;
  autoStatus: string;
};

const COPY: Record<Lang, Copy> = {
  en: {
    badge: "VisibilityOS · Customer workspace",
    title: "Turn visibility evidence into an operating loop.",
    lead: "Save projects, keep scan history, work the Growth Queue, verify completed changes and let monitoring catch material regressions.",
    signIn: "Sign in",
    createAccount: "Create account",
    email: "Email",
    password: "Password",
    submitSignIn: "Open workspace",
    submitSignUp: "Create workspace",
    confirmation: "Check your email to confirm the account, then return here and sign in.",
    authError: "Could not authenticate. Check the details and try again.",
    projects: "Projects",
    newProject: "New project",
    noProjects: "No saved projects yet.",
    createFirst: "Create your first monitored project",
    projectName: "Project name",
    website: "Website URL",
    service: "Target service / offer",
    location: "City / service area",
    competitors: "Competitor URLs, one per line (optional)",
    createAndScan: "Create project + baseline",
    creating: "Creating baseline…",
    dashboard: "Project dashboard",
    lastScan: "Last scan",
    nextDaily: "Next health check",
    nextWeekly: "Next full scan",
    monitoring: "Monitoring",
    pause: "Pause monitoring",
    resume: "Resume monitoring",
    rescan: "Run full scan",
    verifyNow: "Verify completed changes now",
    score: "Visibility score",
    queue: "Growth Queue",
    queueLead: "Move work through the queue. Marking an item Done schedules a full evidence re-check; if the issue remains it reopens automatically.",
    history: "Scan history",
    events: "Material events",
    noActions: "No open Growth Queue items in the latest full scan.",
    noEvents: "No material events yet.",
    noHistory: "No scan history yet.",
    plan: "Plan",
    progress: "In progress",
    done: "Done",
    dismiss: "Dismiss",
    open: "Open",
    pending: "Verification pending",
    verified: "Verified",
    reopened: "Reopened",
    signOut: "Sign out",
    scanning: "Scanning public evidence…",
    scanFailed: "The scan did not complete. The project is saved and the scheduled worker will retry.",
    saved: "Project state updated.",
    accountNote: "Account data is protected by Supabase Auth + row-level security. Public scans never log into the target website.",
    appStatus: "Account product",
    autoStatus: "Server monitoring active",
  },
  ua: {
    badge: "VisibilityOS · Кабінет клієнта",
    title: "Перетворіть visibility evidence на постійний operating loop.",
    lead: "Зберігайте проєкти, історію сканів, працюйте з Growth Queue, перевіряйте виконані зміни та відстежуйте суттєві регресії.",
    signIn: "Увійти",
    createAccount: "Створити акаунт",
    email: "Email",
    password: "Пароль",
    submitSignIn: "Відкрити кабінет",
    submitSignUp: "Створити кабінет",
    confirmation: "Підтвердьте акаунт у листі, потім поверніться сюди та увійдіть.",
    authError: "Не вдалося авторизуватися. Перевірте дані та спробуйте ще раз.",
    projects: "Проєкти",
    newProject: "Новий проєкт",
    noProjects: "Збережених проєктів ще немає.",
    createFirst: "Створити перший проєкт з моніторингом",
    projectName: "Назва проєкту",
    website: "URL сайту",
    service: "Цільова послуга / офер",
    location: "Місто / зона роботи",
    competitors: "URL конкурентів, один у рядку (опційно)",
    createAndScan: "Створити + базовий скан",
    creating: "Створюємо baseline…",
    dashboard: "Панель проєкту",
    lastScan: "Останній скан",
    nextDaily: "Наступна health-перевірка",
    nextWeekly: "Наступний повний скан",
    monitoring: "Моніторинг",
    pause: "Призупинити",
    resume: "Відновити",
    rescan: "Повний re-scan",
    verifyNow: "Перевірити виконані зміни зараз",
    score: "Visibility score",
    queue: "Growth Queue",
    queueLead: "Проводьте задачі через чергу. Статус Done запускає evidence re-check; якщо проблема лишилася, задача відкриється знову.",
    history: "Історія сканів",
    events: "Суттєві події",
    noActions: "У останньому повному скані немає відкритих Growth Queue задач.",
    noEvents: "Суттєвих подій ще немає.",
    noHistory: "Історії сканів ще немає.",
    plan: "Запланувати",
    progress: "У роботі",
    done: "Готово",
    dismiss: "Приховати",
    open: "Відкрито",
    pending: "Очікує перевірки",
    verified: "Підтверджено",
    reopened: "Відкрито знову",
    signOut: "Вийти",
    scanning: "Скануємо публічні evidence…",
    scanFailed: "Скан не завершився. Проєкт збережено, server worker повторить спробу.",
    saved: "Стан проєкту оновлено.",
    accountNote: "Дані акаунта захищені Supabase Auth + row-level security. Public scan не входить у target website.",
    appStatus: "Account product",
    autoStatus: "Server monitoring active",
  },
  ru: {
    badge: "VisibilityOS · Кабинет клиента",
    title: "Превратите visibility evidence в постоянный operating loop.",
    lead: "Сохраняйте проекты, историю сканов, работайте с Growth Queue, проверяйте выполненные изменения и отслеживайте существенные регрессии.",
    signIn: "Войти",
    createAccount: "Создать аккаунт",
    email: "Email",
    password: "Пароль",
    submitSignIn: "Открыть кабинет",
    submitSignUp: "Создать кабинет",
    confirmation: "Подтвердите аккаунт в письме, затем вернитесь сюда и войдите.",
    authError: "Не удалось авторизоваться. Проверьте данные и попробуйте ещё раз.",
    projects: "Проекты",
    newProject: "Новый проект",
    noProjects: "Сохранённых проектов пока нет.",
    createFirst: "Создать первый проект с мониторингом",
    projectName: "Название проекта",
    website: "URL сайта",
    service: "Целевая услуга / оффер",
    location: "Город / зона работы",
    competitors: "URL конкурентов, один на строку (необязательно)",
    createAndScan: "Создать + базовый скан",
    creating: "Создаём baseline…",
    dashboard: "Панель проекта",
    lastScan: "Последний скан",
    nextDaily: "Следующая health-проверка",
    nextWeekly: "Следующий полный скан",
    monitoring: "Мониторинг",
    pause: "Приостановить",
    resume: "Возобновить",
    rescan: "Полный re-scan",
    verifyNow: "Проверить выполненные изменения сейчас",
    score: "Visibility score",
    queue: "Growth Queue",
    queueLead: "Проводите задачи через очередь. Статус Done запускает evidence re-check; если проблема осталась, задача откроется снова.",
    history: "История сканов",
    events: "Существенные события",
    noActions: "В последнем полном скане нет открытых Growth Queue задач.",
    noEvents: "Существенных событий пока нет.",
    noHistory: "Истории сканов пока нет.",
    plan: "Запланировать",
    progress: "В работе",
    done: "Готово",
    dismiss: "Скрыть",
    open: "Открыто",
    pending: "Ожидает проверки",
    verified: "Подтверждено",
    reopened: "Открыто снова",
    signOut: "Выйти",
    scanning: "Сканируем публичные evidence…",
    scanFailed: "Скан не завершился. Проект сохранён, server worker повторит попытку.",
    saved: "Состояние проекта обновлено.",
    accountNote: "Данные аккаунта защищены Supabase Auth + row-level security. Public scan не входит в target website.",
    appStatus: "Account product",
    autoStatus: "Server monitoring active",
  },
};

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

function statusTone(status: VisibilityGrowthActionRow["verification_status"]) {
  if (status === "verified") return "border-emerald-300/15 bg-emerald-300/[.04] text-emerald-200";
  if (status === "pending") return "border-sky-300/15 bg-sky-300/[.04] text-sky-200";
  if (status === "reopened") return "border-amber-300/15 bg-amber-300/[.04] text-amber-200";
  return "border-white/[.07] bg-white/[.025] text-zinc-500";
}

export function VisibilityOsAppPage() {
  const { lang } = useI18n();
  const copy = COPY[lang];
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
  const [createForm, setCreateForm] = useState({
    name: "",
    url: "",
    service: "",
    location: "",
    competitors: "",
  });
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sortedActions = useMemo(
    () => [...(bundle?.actions || [])].sort((a, b) => laneRank(a.lane) - laneRank(b.lane)),
    [bundle?.actions],
  );
  const hasPendingVerification = sortedActions.some(
    (item) => item.status === "done" && item.verification_status === "pending",
  );

  useEffect(() => {
    let mounted = true;
    void (async () => {
      const valid = await getValidVisibilitySession();
      if (!mounted) return;
      setSession(valid ?? readVisibilitySession());
      setSessionLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const refreshProjects = async (preferredId?: string | null) => {
    const next = await listVisibilityProjects();
    setProjects(next);
    const desired = preferredId || selectedId || next[0]?.id || null;
    setSelectedId(desired);
    return { projects: next, selected: desired };
  };

  const refreshBundle = async (projectId: string) => {
    setLoading(true);
    try {
      const next = await loadVisibilityProjectBundle(projectId);
      setBundle(next);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!session) {
      setProjects([]);
      setSelectedId(null);
      setBundle(null);
      return;
    }
    void refreshProjects().catch((cause) => setError(cause instanceof Error ? cause.message : "projects_unavailable"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.id]);

  useEffect(() => {
    if (!selectedId || !session) {
      setBundle(null);
      return;
    }
    void refreshBundle(selectedId).catch((cause) => setError(cause instanceof Error ? cause.message : "project_unavailable"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, session?.user.id]);

  const handleAuth = async () => {
    if (!auth.email.trim() || auth.password.length < 6) return;
    setAuthBusy(true);
    setAuthMessage(null);
    setError(null);
    try {
      if (authMode === "signin") {
        const next = await signInVisibilityUser(auth.email, auth.password);
        setSession(next);
      } else {
        const redirectTo = window.location.href.split("#")[0];
        const result = await signUpVisibilityUser(auth.email, auth.password, redirectTo);
        if (result.session) setSession(result.session);
        else setAuthMessage(copy.confirmation);
      }
    } catch {
      setAuthMessage(copy.authError);
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    await signOutVisibilityUser(session);
    setSession(null);
    setBundle(null);
    setProjects([]);
  };

  const runScan = async (project: VisibilityProject, competitors: string[]) => {
    const response = await fetch("/api/visibilityos/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: project.url,
        lang: project.lang,
        service: project.service,
        location: project.location,
        competitors,
      }),
    });
    const payload = (await response.json()) as {
      ok?: boolean;
      result?: VisibilitySiteScanResult;
      error?: string;
    };
    if (!response.ok || !payload.ok || !payload.result) {
      throw new Error(payload.error || `scan_http_${response.status}`);
    }
    await recordVisibilityUserScan(project.id, payload.result);
  };

  const handleCreate = async () => {
    if (!createForm.url.trim()) return;
    setBusyAction("create");
    setError(null);
    setNotice(null);
    try {
      const competitors = createForm.competitors
        .split(/\n|,/)
        .map((item) => item.trim())
        .filter(Boolean)
        .slice(0, 2);
      const projectId = await createVisibilityProject({
        name: createForm.name.trim() || createForm.url.trim(),
        url: createForm.url.trim(),
        lang,
        service: createForm.service.trim(),
        location: createForm.location.trim(),
        competitors,
      });
      const project: VisibilityProject = {
        id: projectId,
        name: createForm.name.trim() || createForm.url.trim(),
        url: createForm.url.trim(),
        lang,
        service: createForm.service.trim(),
        location: createForm.location.trim(),
        status: "active",
        monitoring_enabled: true,
        daily_health_enabled: true,
        weekly_full_scan_enabled: true,
        last_score: null,
        last_scan_at: null,
        next_daily_scan_at: new Date().toISOString(),
        next_weekly_scan_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };

      try {
        await runScan(project, competitors);
      } catch {
        setNotice(copy.scanFailed);
      }

      setShowCreate(false);
      setCreateForm({ name: "", url: "", service: "", location: "", competitors: "" });
      await refreshProjects(projectId);
      await refreshBundle(projectId);
      setNotice((current) => current || copy.saved);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "project_create_failed");
    } finally {
      setBusyAction(null);
    }
  };

  const handleRescan = async () => {
    if (!bundle) return;
    setBusyAction("scan");
    setError(null);
    setNotice(null);
    try {
      await runScan(
        bundle.project,
        bundle.competitors.map((item) => item.url),
      );
      await refreshProjects(bundle.project.id);
      await refreshBundle(bundle.project.id);
      setNotice(copy.saved);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : copy.scanFailed);
    } finally {
      setBusyAction(null);
    }
  };

  const handleAction = async (action: VisibilityGrowthActionRow, status: VisibilityGrowthActionRow["status"]) => {
    setBusyAction(action.id);
    setError(null);
    setNotice(null);
    try {
      await setVisibilityActionStatus(action.id, status);
      if (bundle) await refreshBundle(bundle.project.id);
      setNotice(copy.saved);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "action_update_failed");
    } finally {
      setBusyAction(null);
    }
  };

  const handleMonitoring = async () => {
    if (!bundle) return;
    setBusyAction("monitoring");
    setError(null);
    try {
      await updateVisibilityProject(bundle.project.id, {
        monitoring_enabled: !bundle.project.monitoring_enabled,
      });
      await refreshProjects(bundle.project.id);
      await refreshBundle(bundle.project.id);
      setNotice(copy.saved);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "monitoring_update_failed");
    } finally {
      setBusyAction(null);
    }
  };

  if (sessionLoading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="flex min-h-[70vh] items-center justify-center"><Loader2 className="h-6 w-6 animate-spin text-sky-200" /></main>
        <FooterSection />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <main className="relative overflow-hidden border-b border-white/[.07] px-4 py-20 sm:py-28">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(56,189,248,.12),transparent_56%)]" />
          <div className="relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[.24em] text-sky-200/70">{copy.badge}</span>
              <h1 className="section-title mt-5 max-w-3xl text-[clamp(3rem,6vw,6.2rem)] leading-[.94] text-zinc-100">{copy.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400">{copy.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3 text-xs text-zinc-500">
                <span className="rounded-full border border-white/[.08] bg-white/[.025] px-3 py-2"><ShieldCheck className="mr-1.5 inline h-3.5 w-3.5 text-sky-200" />RLS tenant isolation</span>
                <span className="rounded-full border border-white/[.08] bg-white/[.025] px-3 py-2"><MonitorCheck className="mr-1.5 inline h-3.5 w-3.5 text-emerald-200" />{copy.autoStatus}</span>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/[.09] bg-[linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012))] p-6 sm:p-8">
              <div className="flex rounded-xl border border-white/[.08] bg-black/35 p-1">
                <button type="button" onClick={() => { setAuthMode("signin"); setAuthMessage(null); }} className={`flex-1 rounded-lg px-4 py-2 text-sm ${authMode === "signin" ? "bg-white/[.08] text-white" : "text-zinc-600"}`}>{copy.signIn}</button>
                <button type="button" onClick={() => { setAuthMode("signup"); setAuthMessage(null); }} className={`flex-1 rounded-lg px-4 py-2 text-sm ${authMode === "signup" ? "bg-white/[.08] text-white" : "text-zinc-600"}`}>{copy.createAccount}</button>
              </div>
              <div className="mt-6 grid gap-4">
                <div><label className="text-sm text-zinc-300">{copy.email}</label><Input type="email" autoComplete="email" value={auth.email} onChange={(event) => setAuth((old) => ({ ...old, email: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div>
                <div><label className="text-sm text-zinc-300">{copy.password}</label><Input type="password" autoComplete={authMode === "signin" ? "current-password" : "new-password"} value={auth.password} onChange={(event) => setAuth((old) => ({ ...old, password: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div>
                {authMessage ? <p className="rounded-xl border border-sky-300/12 bg-sky-300/[.035] p-3 text-sm leading-6 text-sky-100/80">{authMessage}</p> : null}
                <Button onClick={() => void handleAuth()} disabled={authBusy || !auth.email.trim() || auth.password.length < 6} className="premium-button h-12 w-full disabled:opacity-50">{authBusy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}{authMode === "signin" ? copy.submitSignIn : copy.submitSignUp}</Button>
                <p className="text-center text-[11px] leading-5 text-zinc-650">{copy.accountNote}</p>
              </div>
            </div>
          </div>
        </main>
        <FooterSection />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020304] text-white">
      <Header />
      <main className="border-b border-white/[.07] py-14 sm:py-18">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-col justify-between gap-5 border-b border-white/[.07] pb-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[.24em] text-sky-200/70">{copy.badge}</p>
              <h1 className="section-title mt-3 text-4xl text-zinc-100 sm:text-5xl">VisibilityOS</h1>
              <div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full border border-white/[.08] bg-white/[.025] px-3 py-1.5 text-[10px] text-zinc-500">{copy.appStatus}</span><span className="rounded-full border border-emerald-300/12 bg-emerald-300/[.035] px-3 py-1.5 text-[10px] text-emerald-200/80">{copy.autoStatus}</span></div>
            </div>
            <div className="flex items-center gap-3"><span className="hidden text-xs text-zinc-600 sm:inline">{session.user.email}</span><Button variant="outline" onClick={() => void handleSignOut()} className="border-white/10 bg-white/[.02] text-zinc-300 hover:bg-white/[.05] hover:text-white"><LogOut className="mr-2 h-4 w-4" />{copy.signOut}</Button></div>
          </div>

          {notice ? <div className="mt-5 rounded-xl border border-emerald-300/12 bg-emerald-300/[.035] px-4 py-3 text-sm text-emerald-100/80">{notice}</div> : null}
          {error ? <div className="mt-5 rounded-xl border border-red-300/12 bg-red-300/[.035] px-4 py-3 text-sm text-red-200">{error}</div> : null}

          <div className="mt-8 grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="rounded-[26px] border border-white/[.08] bg-white/[.018] p-4 lg:sticky lg:top-24 lg:h-fit">
              <div className="flex items-center justify-between gap-3 px-2"><h2 className="text-sm font-semibold text-zinc-200">{copy.projects}</h2><button type="button" onClick={() => setShowCreate(true)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-300/12 bg-sky-300/[.035] text-sky-200 hover:bg-sky-300/[.07]" aria-label={copy.newProject}><Plus className="h-4 w-4" /></button></div>
              <div className="mt-4 grid gap-2">
                {projects.map((project) => <button type="button" key={project.id} onClick={() => { setSelectedId(project.id); setShowCreate(false); }} className={`rounded-xl border px-3 py-3 text-left transition ${selectedId === project.id ? "border-sky-300/16 bg-sky-300/[.045]" : "border-white/[.06] bg-black/20 hover:bg-white/[.025]"}`}><p className="truncate text-sm font-medium text-zinc-200">{project.name}</p><p className="mt-1 truncate text-[10px] text-zinc-650">{project.url}</p><div className="mt-2 flex items-center justify-between"><span className="text-[10px] text-zinc-700">{project.last_score ?? "—"}/100</span><span className={`h-1.5 w-1.5 rounded-full ${project.monitoring_enabled ? "bg-emerald-300" : "bg-zinc-700"}`} /></div></button>)}
                {!projects.length ? <p className="px-2 py-5 text-xs leading-6 text-zinc-600">{copy.noProjects}</p> : null}
              </div>
              <Button onClick={() => setShowCreate(true)} className="mt-4 h-10 w-full border border-white/[.08] bg-white/[.03] text-xs text-zinc-300 hover:bg-white/[.06]"><Plus className="mr-2 h-3.5 w-3.5" />{copy.newProject}</Button>
            </aside>

            <section className="min-w-0">
              {showCreate || !projects.length ? (
                <div className="rounded-[30px] border border-white/[.09] bg-white/[.018] p-6 sm:p-8">
                  <p className="text-[10px] font-semibold uppercase tracking-[.22em] text-sky-200/70">{copy.newProject}</p>
                  <h2 className="mt-3 text-2xl font-semibold text-zinc-100">{copy.createFirst}</h2>
                  <div className="mt-7 grid gap-4">
                    <div><label className="text-sm text-zinc-300">{copy.projectName}</label><Input value={createForm.name} onChange={(event) => setCreateForm((old) => ({ ...old, name: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div>
                    <div><label className="text-sm text-zinc-300">{copy.website} *</label><Input value={createForm.url} onChange={(event) => setCreateForm((old) => ({ ...old, url: event.target.value }))} placeholder="https://example.com" className="mt-1.5 border-white/10 bg-black/30 text-white" /></div>
                    <div className="grid gap-4 sm:grid-cols-2"><div><label className="text-sm text-zinc-300">{copy.service}</label><Input value={createForm.service} onChange={(event) => setCreateForm((old) => ({ ...old, service: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div><div><label className="text-sm text-zinc-300">{copy.location}</label><Input value={createForm.location} onChange={(event) => setCreateForm((old) => ({ ...old, location: event.target.value }))} className="mt-1.5 border-white/10 bg-black/30 text-white" /></div></div>
                    <div><label className="text-sm text-zinc-300">{copy.competitors}</label><textarea value={createForm.competitors} onChange={(event) => setCreateForm((old) => ({ ...old, competitors: event.target.value }))} rows={3} className="mt-1.5 w-full resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none focus:border-sky-300/25" /></div>
                    <Button onClick={() => void handleCreate()} disabled={busyAction === "create" || !createForm.url.trim()} className="premium-button h-12 w-full disabled:opacity-50">{busyAction === "create" ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />{copy.creating}</> : <><Search className="mr-2 h-4 w-4" />{copy.createAndScan}</>}</Button>
                  </div>
                </div>
              ) : loading || !bundle ? (
                <div className="flex min-h-[420px] items-center justify-center rounded-[30px] border border-white/[.08] bg-white/[.014]"><Loader2 className="h-6 w-6 animate-spin text-sky-200" /></div>
              ) : (
                <div className="grid gap-6">
                  <div className="rounded-[30px] border border-white/[.09] bg-[radial-gradient(circle_at_12%_0%,rgba(56,189,248,.08),transparent_34%),rgba(255,255,255,.018)] p-6 sm:p-8">
                    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
                      <div className="min-w-0"><p className="text-[10px] font-semibold uppercase tracking-[.22em] text-sky-200/70">{copy.dashboard}</p><h2 className="mt-3 truncate text-3xl font-semibold text-zinc-100">{bundle.project.name}</h2><a href={bundle.project.url} target="_blank" rel="noopener noreferrer" className="mt-2 block truncate text-xs text-zinc-600 hover:text-sky-200">{bundle.project.url}</a><div className="mt-4 flex flex-wrap gap-2">{bundle.project.service ? <span className="rounded-full border border-white/[.07] px-3 py-1 text-[10px] text-zinc-500">{bundle.project.service}</span> : null}{bundle.project.location ? <span className="rounded-full border border-white/[.07] px-3 py-1 text-[10px] text-zinc-500">{bundle.project.location}</span> : null}</div></div>
                      <div className="flex gap-3"><Button variant="outline" onClick={() => void handleMonitoring()} disabled={busyAction === "monitoring"} className="border-white/10 bg-black/20 text-zinc-300 hover:bg-white/[.05] hover:text-white">{busyAction === "monitoring" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <MonitorCheck className="mr-2 h-4 w-4" />}{bundle.project.monitoring_enabled ? copy.pause : copy.resume}</Button><Button onClick={() => void handleRescan()} disabled={busyAction === "scan"} className="border border-sky-300/12 bg-sky-300/[.055] text-sky-100 hover:bg-sky-300/[.09]">{busyAction === "scan" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}{hasPendingVerification ? copy.verifyNow : copy.rescan}</Button></div>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                      <MetricCard icon={BarChart3} label={copy.score} value={bundle.project.last_score == null ? "—" : `${bundle.project.last_score}/100`} />
                      <MetricCard icon={Clock3} label={copy.lastScan} value={safeDate(bundle.project.last_scan_at)} />
                      <MetricCard icon={ShieldCheck} label={copy.nextDaily} value={safeDate(bundle.project.next_daily_scan_at)} />
                      <MetricCard icon={TrendingUp} label={copy.nextWeekly} value={safeDate(bundle.project.next_weekly_scan_at)} />
                    </div>
                  </div>

                  <div className="rounded-[30px] border border-white/[.08] bg-white/[.018] p-6 sm:p-8">
                    <div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-sky-300/15 bg-sky-300/[.04] text-sky-200"><Target className="h-4 w-4" /></span><div><h2 className="text-xl font-semibold text-zinc-100">{copy.queue}</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-zinc-500">{copy.queueLead}</p></div></div>
                    <div className="mt-7 grid gap-4">{sortedActions.map((item) => <ActionCard key={item.id} item={item} copy={copy} busy={busyAction === item.id} onStatus={(status) => void handleAction(item, status)} />)}{!sortedActions.length ? <p className="rounded-2xl border border-white/[.06] bg-black/20 p-5 text-sm text-zinc-600">{copy.noActions}</p> : null}</div>
                  </div>

                  <div className="grid gap-6 xl:grid-cols-2">
                    <div className="rounded-[30px] border border-white/[.08] bg-white/[.018] p-6 sm:p-8"><div className="flex items-center gap-2"><Bell className="h-4 w-4 text-amber-200" /><h2 className="text-lg font-semibold text-zinc-100">{copy.events}</h2></div><div className="mt-5 grid gap-3">{bundle.events.map((event) => <div key={event.id} className="rounded-2xl border border-white/[.06] bg-black/20 p-4"><div className="flex items-start justify-between gap-4"><div><p className="text-sm font-medium text-zinc-300">{event.title}</p><p className="mt-1 text-[10px] text-zinc-700">{event.event_type}</p></div><span className={`rounded-full border px-2 py-1 text-[9px] ${event.severity === "critical" ? "border-red-300/15 text-red-300" : event.severity === "warning" ? "border-amber-300/15 text-amber-300" : event.severity === "positive" ? "border-emerald-300/15 text-emerald-300" : "border-white/[.07] text-zinc-600"}`}>{event.severity}</span></div><p className="mt-3 text-[10px] text-zinc-700">{safeDate(event.created_at)}</p></div>)}{!bundle.events.length ? <p className="text-sm text-zinc-650">{copy.noEvents}</p> : null}</div></div>
                    <div className="rounded-[30px] border border-white/[.08] bg-white/[.018] p-6 sm:p-8"><div className="flex items-center gap-2"><Globe2 className="h-4 w-4 text-sky-200" /><h2 className="text-lg font-semibold text-zinc-100">{copy.history}</h2></div><div className="mt-5 grid gap-3">{bundle.runs.map((run) => <div key={run.id} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[.06] bg-black/20 p-4"><div><p className="text-sm font-medium capitalize text-zinc-300">{run.job_type}</p><p className="mt-1 text-[10px] text-zinc-700">{safeDate(run.finished_at)}</p></div><span className={`flex items-center gap-1 rounded-full border px-2 py-1 text-[9px] ${run.status === "success" ? "border-emerald-300/15 text-emerald-300" : "border-red-300/15 text-red-300"}`}>{run.status === "success" ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}{run.status}</span></div>)}{!bundle.runs.length ? <p className="text-sm text-zinc-650">{copy.noHistory}</p> : null}</div></div>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
}

function MetricCard({ icon: Icon, label, value }: { icon: typeof BarChart3; label: string; value: string }) {
  return <div className="rounded-2xl border border-white/[.065] bg-black/25 p-4"><Icon className="h-4 w-4 text-sky-200/75" /><p className="mt-4 text-[10px] uppercase tracking-[.14em] text-zinc-700">{label}</p><p className="mt-2 text-sm font-medium text-zinc-300">{value}</p></div>;
}

function ActionCard({ item, copy, busy, onStatus }: { item: VisibilityGrowthActionRow; copy: Copy; busy: boolean; onStatus: (status: VisibilityGrowthActionRow["status"]) => void }) {
  const verificationLabel = item.verification_status === "pending" ? copy.pending : item.verification_status === "verified" ? copy.verified : item.verification_status === "reopened" ? copy.reopened : copy.open;
  return <div className="rounded-[22px] border border-white/[.07] bg-black/25 p-5"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-start"><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-sky-300/12 bg-sky-300/[.03] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[.13em] text-sky-200/75">{item.lane}</span><span className={`rounded-full border px-2.5 py-1 text-[9px] ${statusTone(item.verification_status)}`}>{verificationLabel}</span>{item.impact ? <span className="text-[9px] text-zinc-700">impact · {item.impact}</span> : null}</div><h3 className="mt-3 text-base font-semibold text-zinc-200">{item.title}</h3>{item.reason ? <p className="mt-2 text-xs leading-6 text-zinc-500">{item.reason}</p> : null}{item.evidence ? <p className="mt-3 rounded-xl border border-white/[.05] bg-white/[.018] p-3 text-[11px] leading-5 text-zinc-600">{item.evidence}</p> : null}{item.action ? <p className="mt-3 text-xs leading-6 text-zinc-400">{item.action}</p> : null}</div><div className="flex shrink-0 flex-wrap gap-2 md:max-w-[220px] md:justify-end">{busy ? <span className="flex h-9 items-center px-3"><Loader2 className="h-4 w-4 animate-spin text-sky-200" /></span> : <><SmallAction label={copy.plan} onClick={() => onStatus("planned")} active={item.status === "planned"} /><SmallAction label={copy.progress} onClick={() => onStatus("in_progress")} active={item.status === "in_progress"} /><SmallAction label={copy.done} onClick={() => onStatus("done")} active={item.status === "done"} positive /><SmallAction label={copy.dismiss} onClick={() => onStatus("dismissed")} /></>}</div></div></div>;
}

function SmallAction({ label, onClick, active = false, positive = false }: { label: string; onClick: () => void; active?: boolean; positive?: boolean }) {
  return <button type="button" onClick={onClick} className={`rounded-lg border px-2.5 py-2 text-[10px] transition ${active ? positive ? "border-emerald-300/20 bg-emerald-300/[.06] text-emerald-200" : "border-sky-300/18 bg-sky-300/[.05] text-sky-200" : "border-white/[.07] bg-white/[.02] text-zinc-600 hover:bg-white/[.05] hover:text-zinc-300"}`}>{label}</button>;
}
