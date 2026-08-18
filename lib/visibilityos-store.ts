import type {
  VisibilityAutomationCallback,
  VisibilityAutomationJob,
  VisibilityAutomationJobType,
} from "@/lib/visibilityos-automation";

const REQUEST_TIMEOUT_MS = 12_000;

type SupabaseConfig = {
  url: string;
  serviceRoleKey: string;
};

type RecordCallbackResult = {
  duplicate?: boolean;
  runId?: string;
  eventCount?: number;
  notificationCount?: number;
};

function getSupabaseConfig(): SupabaseConfig | null {
  const url = process.env.VISIBILITYOS_SUPABASE_URL?.trim().replace(/\/$/, "") || "";
  const serviceRoleKey = process.env.VISIBILITYOS_SUPABASE_SERVICE_ROLE_KEY?.trim() || "";

  if (!url || !serviceRoleKey) return null;
  return { url, serviceRoleKey };
}

export function isVisibilityStoreConfigured() {
  return Boolean(getSupabaseConfig());
}

async function supabaseRequest<T>(path: string, init: RequestInit): Promise<T> {
  const config = getSupabaseConfig();
  if (!config) throw new Error("visibility_store_not_configured");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(`${config.url}/rest/v1/${path.replace(/^\//, "")}`, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
    });

    const text = await response.text();
    const payload = text ? (JSON.parse(text) as unknown) : null;

    if (!response.ok) {
      const detail = payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message?: unknown }).message || "")
        : "";
      throw new Error(`visibility_store_${response.status}${detail ? `:${detail}` : ""}`);
    }

    return payload as T;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getDueVisibilityAutomationJobs(input: {
  jobType: VisibilityAutomationJobType;
  limit: number;
}): Promise<VisibilityAutomationJob[]> {
  const payload = await supabaseRequest<unknown>("rpc/visibilityos_claim_due_jobs", {
    method: "POST",
    body: JSON.stringify({
      p_job_type: input.jobType,
      p_limit: input.limit,
    }),
  });

  if (!Array.isArray(payload)) return [];
  return payload as VisibilityAutomationJob[];
}

export async function recordVisibilityAutomationCallback(
  callback: VisibilityAutomationCallback,
): Promise<RecordCallbackResult> {
  const payload = await supabaseRequest<RecordCallbackResult | RecordCallbackResult[]>(
    "rpc/visibilityos_record_automation_callback",
    {
      method: "POST",
      body: JSON.stringify({
        p_project_id: callback.projectId,
        p_job_type: callback.jobType,
        p_idempotency_key: callback.idempotencyKey,
        p_ok: callback.ok,
        p_result: callback.ok ? callback.result ?? null : null,
        p_error: callback.ok ? null : callback.error?.slice(0, 2_000) || "scan_failed",
        p_finished_at: callback.finishedAt || new Date().toISOString(),
      }),
    },
  );

  if (Array.isArray(payload)) return payload[0] || {};
  return payload || {};
}
