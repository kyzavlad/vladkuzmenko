import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type JobType = "daily" | "weekly";

type VisibilityJob = {
  projectId: string;
  jobType: JobType;
  idempotencyKey: string;
  scanPayload: Record<string, unknown>;
};

type ScanEnvelope = {
  ok?: boolean;
  result?: unknown;
  error?: unknown;
};

const DEFAULT_APP_BASE_URL = "https://www.vladkuzmenko.com";
const CLAIM_LIMIT_PER_MODE = 4;
const SCAN_TIMEOUT_MS = 55_000;

function getSecretKey(): string {
  const modernKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (modernKeys) {
    try {
      const parsed = JSON.parse(modernKeys) as Record<string, unknown>;
      if (typeof parsed.default === "string" && parsed.default.trim()) {
        return parsed.default.trim();
      }
    } catch {
      // Fall through to the legacy service-role key while both key systems coexist.
    }
  }

  const legacy = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim();
  if (!legacy) throw new Error("missing_supabase_secret_key");
  return legacy;
}

function normalizeBaseUrl(value: unknown): string {
  if (typeof value !== "string") return DEFAULT_APP_BASE_URL;
  const trimmed = value.trim().replace(/\/$/, "");
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "https:") return DEFAULT_APP_BASE_URL;
    return url.toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_APP_BASE_URL;
  }
}

const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim();
if (!supabaseUrl) throw new Error("missing_supabase_url");

const supabase = createClient(supabaseUrl, getSecretKey(), {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function isAuthorized(request: Request): Promise<boolean> {
  const provided = request.headers.get("x-visibilityos-cron-secret")?.trim();
  if (!provided) return false;

  const { data, error } = await supabase.rpc("visibilityos_verify_cron_secret", {
    p_secret: provided,
  });

  if (error) {
    console.error("VisibilityOS cron authorization failed", error);
    return false;
  }

  return data === true;
}

async function getAppBaseUrl(): Promise<string> {
  const { data, error } = await supabase
    .from("visibilityos_runtime_config")
    .select("value")
    .eq("key", "app_base_url")
    .maybeSingle();

  if (error) {
    console.error("VisibilityOS runtime config unavailable", error);
    return DEFAULT_APP_BASE_URL;
  }

  return normalizeBaseUrl(data?.value);
}

async function claimJobs(jobType: JobType): Promise<VisibilityJob[]> {
  const { data, error } = await supabase.rpc("visibilityos_claim_due_jobs", {
    p_job_type: jobType,
    p_limit: CLAIM_LIMIT_PER_MODE,
  });

  if (error) throw new Error(`claim_${jobType}_failed:${error.message}`);
  if (!Array.isArray(data)) return [];
  return data as VisibilityJob[];
}

async function recordCallback(input: {
  job: VisibilityJob;
  ok: boolean;
  result?: unknown;
  error?: string;
}) {
  const { data, error } = await supabase.rpc("visibilityos_record_automation_callback", {
    p_project_id: input.job.projectId,
    p_job_type: input.job.jobType,
    p_idempotency_key: input.job.idempotencyKey,
    p_ok: input.ok,
    p_result: input.ok ? input.result ?? null : null,
    p_error: input.ok ? null : (input.error || "scan_failed").slice(0, 2_000),
    p_finished_at: new Date().toISOString(),
  });

  if (error) throw new Error(`callback_failed:${error.message}`);
  return data;
}

async function executeJob(job: VisibilityJob, appBaseUrl: string) {
  const endpoint = job.jobType === "daily" ? "/api/visibilityos/health" : "/api/visibilityos/scan";
  let envelope: ScanEnvelope | null = null;

  try {
    const response = await fetch(`${appBaseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "VisibilityOS-Monitor/1.0",
      },
      body: JSON.stringify(job.scanPayload),
      signal: AbortSignal.timeout(SCAN_TIMEOUT_MS),
    });

    const text = await response.text();
    envelope = text ? (JSON.parse(text) as ScanEnvelope) : null;

    if (!response.ok || envelope?.ok !== true || envelope.result == null) {
      const message = typeof envelope?.error === "string"
        ? envelope.error
        : `scanner_http_${response.status}`;
      const callback = await recordCallback({ job, ok: false, error: message });
      return { projectId: job.projectId, jobType: job.jobType, ok: false, callback };
    }

    const callback = await recordCallback({
      job,
      ok: true,
      result: envelope.result,
    });

    return { projectId: job.projectId, jobType: job.jobType, ok: true, callback };
  } catch (error) {
    const message = error instanceof Error ? error.message : "worker_scan_failed";

    try {
      const callback = await recordCallback({ job, ok: false, error: message });
      return { projectId: job.projectId, jobType: job.jobType, ok: false, callback };
    } catch (callbackError) {
      console.error("VisibilityOS callback persistence failed", {
        projectId: job.projectId,
        jobType: job.jobType,
        error: callbackError,
      });
      throw callbackError;
    }
  }
}

Deno.serve(async (request: Request) => {
  if (request.method !== "POST") {
    return Response.json({ ok: false, error: "method_not_allowed" }, { status: 405 });
  }

  if (!(await isAuthorized(request))) {
    return Response.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const appBaseUrl = await getAppBaseUrl();

    // Claim weekly work first. A project claimed for a weekly scan is leased, so the
    // daily claim in the same worker pass will not run a redundant second scan.
    const weekly = await claimJobs("weekly");
    const daily = await claimJobs("daily");
    const jobs = [...weekly, ...daily];

    const settled = await Promise.allSettled(
      jobs.map((job) => executeJob(job, appBaseUrl)),
    );

    const results = settled.map((entry) => entry.status === "fulfilled"
      ? entry.value
      : { ok: false, workerError: entry.reason instanceof Error ? entry.reason.message : String(entry.reason) });

    const completed = results.filter((result) => result.ok === true).length;
    const failed = results.length - completed;

    console.log("VisibilityOS monitor worker completed", {
      claimed: jobs.length,
      completed,
      failed,
      appBaseUrl,
    });

    return Response.json({
      ok: failed === 0,
      claimed: jobs.length,
      completed,
      failed,
      results,
    });
  } catch (error) {
    console.error("VisibilityOS monitor worker failed", error);
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "worker_failed",
      },
      { status: 500 },
    );
  }
});
