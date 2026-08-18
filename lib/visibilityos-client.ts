export type VisibilitySession = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: {
    id: string;
    email?: string;
  };
};

export type VisibilityProject = {
  id: string;
  name: string;
  url: string;
  lang: "en" | "ua" | "ru";
  service: string;
  location: string;
  status: "active" | "paused" | "archived";
  monitoring_enabled: boolean;
  daily_health_enabled: boolean;
  weekly_full_scan_enabled: boolean;
  last_score: number | null;
  last_scan_at: string | null;
  next_daily_scan_at: string;
  next_weekly_scan_at: string;
  created_at: string;
};

export type VisibilityGrowthActionRow = {
  id: string;
  project_id: string;
  action_key: string;
  lane: "now" | "next" | "later";
  category: string | null;
  impact: string | null;
  confidence: string | null;
  effort: string | null;
  title: string;
  reason: string | null;
  evidence: string | null;
  action: string | null;
  status: "open" | "planned" | "in_progress" | "done" | "dismissed";
  verification_status: "not_requested" | "pending" | "verified" | "reopened";
  first_observed_at: string;
  last_observed_at: string;
  done_at: string | null;
  verified_at: string | null;
  updated_at: string;
};

export type VisibilityEventRow = {
  id: string;
  project_id: string;
  event_type: string;
  severity: "info" | "warning" | "critical" | "positive";
  title: string;
  payload: Record<string, unknown>;
  created_at: string;
};

export type VisibilityScanResultPreview = {
  score?: number;
  mode?: string;
  version?: number;
  pillars?: {
    search?: number | null;
    local?: number | null;
    conversion?: number | null;
    trust?: number | null;
  };
};

export type VisibilityScanRunRow = {
  id: string;
  project_id: string;
  job_type: "baseline" | "manual" | "daily" | "weekly" | "verify";
  status: "success" | "failed";
  error: string | null;
  result: VisibilityScanResultPreview | null;
  finished_at: string;
  created_at: string;
};

export type VisibilityCompetitorRow = {
  id: string;
  project_id: string;
  url: string;
  created_at: string;
};

export type VisibilityProjectBundle = {
  project: VisibilityProject;
  actions: VisibilityGrowthActionRow[];
  events: VisibilityEventRow[];
  runs: VisibilityScanRunRow[];
  competitors: VisibilityCompetitorRow[];
};

const SUPABASE_URL = "https://qpmktvybhlwbwsxevifj.supabase.co";
// Supabase publishable keys are browser-safe. RLS remains the authorization boundary.
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_Y3wbSyB1v3fSKOxC1UFrVQ_Pfde1EfL";
const SESSION_STORAGE_KEY = "visibilityos.session.v1";

class VisibilityApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "VisibilityApiError";
    this.status = status;
  }
}

function nowSeconds() {
  return Math.floor(Date.now() / 1000);
}

function normalizeSession(value: unknown): VisibilitySession | null {
  if (!value || typeof value !== "object") return null;
  const raw = value as Record<string, unknown>;
  const user = raw.user;
  if (
    typeof raw.access_token !== "string" ||
    typeof raw.refresh_token !== "string" ||
    !user ||
    typeof user !== "object" ||
    typeof (user as Record<string, unknown>).id !== "string"
  ) {
    return null;
  }

  const expiresIn = typeof raw.expires_in === "number" ? raw.expires_in : 3600;
  const expiresAt = typeof raw.expires_at === "number" ? raw.expires_at : nowSeconds() + expiresIn;
  const email = (user as Record<string, unknown>).email;

  return {
    access_token: raw.access_token,
    refresh_token: raw.refresh_token,
    expires_in: expiresIn,
    expires_at: expiresAt,
    token_type: typeof raw.token_type === "string" ? raw.token_type : "bearer",
    user: {
      id: (user as Record<string, unknown>).id as string,
      email: typeof email === "string" ? email : undefined,
    },
  };
}

function saveSession(session: VisibilitySession | null) {
  if (typeof window === "undefined") return;
  if (!session) {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return;
  }
  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function readVisibilitySession(): VisibilitySession | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) return null;
  try {
    return normalizeSession(JSON.parse(raw));
  } catch {
    return null;
  }
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  let payload: unknown = null;
  if (text) {
    try { payload = JSON.parse(text); } catch { payload = text; }
  }

  if (!response.ok) {
    const body = payload && typeof payload === "object" ? payload as Record<string, unknown> : null;
    const message =
      (body && typeof body.message === "string" && body.message) ||
      (body && typeof body.msg === "string" && body.msg) ||
      (body && typeof body.error_description === "string" && body.error_description) ||
      (body && typeof body.error === "string" && body.error) ||
      `request_failed_${response.status}`;
    throw new VisibilityApiError(message, response.status);
  }

  return payload as T;
}

async function authRequest<T>(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}${path}`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return parseResponse<T>(response);
}

export async function signInVisibilityUser(email: string, password: string) {
  const payload = await authRequest<unknown>("/auth/v1/token?grant_type=password", {
    email: email.trim(),
    password,
  });
  const session = normalizeSession(payload);
  if (!session) throw new Error("session_not_returned");
  saveSession(session);
  return session;
}

export async function signUpVisibilityUser(email: string, password: string, redirectTo: string) {
  const response = await fetch(
    `${SUPABASE_URL}/auth/v1/signup?redirect_to=${encodeURIComponent(redirectTo)}`,
    {
      method: "POST",
      headers: {
        apikey: SUPABASE_PUBLISHABLE_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim(), password }),
    },
  );
  const payload = await parseResponse<unknown>(response);
  const session = normalizeSession(payload);
  if (session) saveSession(session);
  return { session, confirmationRequired: !session };
}

export async function refreshVisibilitySession(session: VisibilitySession) {
  const payload = await authRequest<unknown>("/auth/v1/token?grant_type=refresh_token", {
    refresh_token: session.refresh_token,
  });
  const refreshed = normalizeSession(payload);
  if (!refreshed) throw new Error("session_refresh_failed");
  saveSession(refreshed);
  return refreshed;
}

export async function getValidVisibilitySession() {
  const session = readVisibilitySession();
  if (!session) return null;
  if (session.expires_at > nowSeconds() + 60) return session;
  try {
    return await refreshVisibilitySession(session);
  } catch {
    saveSession(null);
    return null;
  }
}

export async function signOutVisibilityUser(session?: VisibilitySession | null) {
  const active = session ?? readVisibilitySession();
  try {
    if (active) {
      await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          Authorization: `Bearer ${active.access_token}`,
        },
      });
    }
  } finally {
    saveSession(null);
  }
}

async function authedFetch<T>(path: string, init: RequestInit = {}, explicitSession?: VisibilitySession | null) {
  let session = explicitSession ?? await getValidVisibilitySession();
  if (!session) throw new VisibilityApiError("authentication_required", 401);

  const perform = (accessToken: string) => fetch(`${SUPABASE_URL}${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  let response = await perform(session.access_token);
  if (response.status === 401 && session.refresh_token) {
    session = await refreshVisibilitySession(session);
    response = await perform(session.access_token);
  }
  return parseResponse<T>(response);
}

async function rpc<T>(name: string, args: Record<string, unknown>) {
  return authedFetch<T>(`/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(args),
  });
}

const PROJECT_FIELDS = [
  "id", "name", "url", "lang", "service", "location", "status",
  "monitoring_enabled", "daily_health_enabled", "weekly_full_scan_enabled",
  "last_score", "last_scan_at", "next_daily_scan_at", "next_weekly_scan_at", "created_at",
].join(",");

export async function listVisibilityProjects() {
  return authedFetch<VisibilityProject[]>(
    `/rest/v1/visibilityos_projects?select=${encodeURIComponent(PROJECT_FIELDS)}&status=neq.archived&order=created_at.desc`,
  );
}

export async function createVisibilityProject(input: {
  name: string;
  url: string;
  lang: "en" | "ua" | "ru";
  service: string;
  location: string;
  competitors: string[];
}) {
  return rpc<string>("visibilityos_create_project", {
    p_name: input.name,
    p_url: input.url,
    p_lang: input.lang,
    p_service: input.service,
    p_location: input.location,
    p_competitors: input.competitors.filter(Boolean),
  });
}

export async function recordVisibilityUserScan(
  projectId: string,
  result: unknown,
  requestedJobType: "manual" | "verify" = "manual",
) {
  return rpc<Record<string, unknown>>("visibilityos_record_user_scan_v2", {
    p_project_id: projectId,
    p_result: result,
    p_requested_job_type: requestedJobType,
  });
}

export async function setVisibilityActionStatus(
  actionId: string,
  status: VisibilityGrowthActionRow["status"],
) {
  return rpc<Record<string, unknown>>("visibilityos_set_action_status", {
    p_action_id: actionId,
    p_status: status,
  });
}

export async function updateVisibilityProject(
  projectId: string,
  patch: Partial<Pick<
    VisibilityProject,
    "monitoring_enabled" | "daily_health_enabled" | "weekly_full_scan_enabled" | "status" | "name" | "service" | "location"
  >>,
) {
  return authedFetch<VisibilityProject[]>(
    `/rest/v1/visibilityos_projects?id=eq.${encodeURIComponent(projectId)}`,
    {
      method: "PATCH",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify(patch),
    },
  );
}

export async function loadVisibilityProjectBundle(projectId: string): Promise<VisibilityProjectBundle> {
  const actionFields = [
    "id", "project_id", "action_key", "lane", "category", "impact", "confidence", "effort",
    "title", "reason", "evidence", "action", "status", "verification_status",
    "first_observed_at", "last_observed_at", "done_at", "verified_at", "updated_at",
  ].join(",");

  const [projects, actions, events, runs, competitors] = await Promise.all([
    authedFetch<VisibilityProject[]>(
      `/rest/v1/visibilityos_projects?select=${encodeURIComponent(PROJECT_FIELDS)}&id=eq.${encodeURIComponent(projectId)}&limit=1`,
    ),
    authedFetch<VisibilityGrowthActionRow[]>(
      `/rest/v1/visibilityos_growth_actions?select=${encodeURIComponent(actionFields)}&project_id=eq.${encodeURIComponent(projectId)}&status=neq.dismissed&order=updated_at.desc`,
    ),
    authedFetch<VisibilityEventRow[]>(
      `/rest/v1/visibilityos_events?select=id,project_id,event_type,severity,title,payload,created_at&project_id=eq.${encodeURIComponent(projectId)}&order=created_at.desc&limit=40`,
    ),
    authedFetch<VisibilityScanRunRow[]>(
      `/rest/v1/visibilityos_scan_runs?select=id,project_id,job_type,status,error,result,finished_at,created_at&project_id=eq.${encodeURIComponent(projectId)}&order=finished_at.desc&limit=40`,
    ),
    authedFetch<VisibilityCompetitorRow[]>(
      `/rest/v1/visibilityos_project_competitors?select=id,project_id,url,created_at&project_id=eq.${encodeURIComponent(projectId)}&order=created_at.asc`,
    ),
  ]);

  const project = projects[0];
  if (!project) throw new Error("project_not_found");
  return { project, actions, events, runs, competitors };
}
