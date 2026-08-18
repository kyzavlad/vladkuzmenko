# VisibilityOS SaaS operations

## Runtime ownership

- **Next.js / Vercel** owns the public product, signed automation API and SaaS application surface.
- **Dedicated Supabase project** owns accounts, workspaces, projects, scan history, Growth Queue, events and notification preferences.
- **Local n8n** is a worker/orchestrator only. It does not own customer state and it does not need an inbound public webhook.
- The existing `/api/visibilityos/scan` remains the canonical scanner.

This separation lets the local worker stop or restart without losing product history and avoids exposing the local Mac/n8n instance to inbound internet traffic.

## Required production environment

Set these only in the Vercel project environment. Never commit their values.

```text
VISIBILITYOS_SUPABASE_URL=https://<visibilityos-project-ref>.supabase.co
VISIBILITYOS_SUPABASE_SERVICE_ROLE_KEY=<server-only service role key>
VISIBILITYOS_AUTOMATION_SECRET=<at least 32 random bytes>
```

The service-role key is server-only and must never use a `NEXT_PUBLIC_` prefix.

Generate the automation secret with a cryptographically secure generator, for example:

```bash
openssl rand -hex 32
```

## Database bootstrap

Apply:

```text
supabase/migrations/20260818070000_visibilityos_saas_v1.sql
```

The migration creates:

- profiles, workspaces and membership
- projects and competitors
- future connected-data metadata
- scan runs, pages and findings
- persistent Growth Queue
- material-change events
- notification preferences/deliveries
- RLS policies for tenant isolation
- service-role-only automation RPCs

Do not apply this migration to the existing `dacha-tv-prod` project. VisibilityOS requires its own project/database.

## n8n worker

Import:

```text
n8n/VisibilityOS_Monitoring_Worker.json
```

The workflow is intentionally inactive in source control.

Create one n8n **Crypto** credential containing the same value as `VISIBILITYOS_AUTOMATION_SECRET`, then assign it to both:

- `Sign Job Pull`
- `Sign Callback`

The worker runs hourly and asks the SaaS backend for due daily and weekly jobs. The database decides which projects are due. A 30-minute database lease prevents concurrent duplicate work; callback idempotency prevents duplicate persistence if a request is retried.

Flow:

```text
Hourly Scheduler
  -> signed /api/visibilityos/automation/jobs
  -> existing /api/visibilityos/scan
  -> signed /api/visibilityos/automation/callback
  -> scan history + Growth Queue + events
```

No inbound public n8n webhook is required for scheduled monitoring.

## Signature contract

Signed requests use:

```text
x-visibilityos-timestamp: <unix seconds>
x-visibilityos-signature: v1=<hex HMAC-SHA256>
```

Signed bytes are exactly:

```text
<timestamp>.<raw request body>
```

The web app rejects signatures outside a five-minute replay window.

## Failure semantics

- A failed scheduled scan is stored as a failed run.
- It creates a `scan.failed` event.
- It does **not** replace the last successful baseline.
- Daily failures retry after six hours; weekly failures retry after twelve hours.
- Successful daily jobs schedule the next daily run one day later.
- Successful weekly jobs schedule the next weekly run seven days later.

## Material-change events in V1

The first monitoring release emits events only for observable changes:

- baseline created
- score changed by at least 5 points
- a finding regressed to `fail`
- a prior `warn`/`fail` finding recovered to `pass`
- scheduled scan failed

This intentionally avoids noisy daily reports and avoids inventing rankings, traffic, leads or revenue.

## Release gates

Do not merge/release the SaaS layer until all are verified:

1. Dedicated VisibilityOS Supabase project exists.
2. Migration applies successfully.
3. Supabase security and performance advisors are reviewed.
4. RLS tenant-isolation test passes with two users/workspaces.
5. Vercel production env contains all three server secrets.
6. n8n workflow imports on the actual local n8n version.
7. Both Crypto nodes use the matching HMAC credential.
8. Invalid/missing signature -> 401.
9. Stale signature -> 401.
10. Due job can be claimed only once while leased.
11. Successful scheduled scan persists history and refreshes Growth Queue.
12. Replayed callback with the same idempotency key does not duplicate the run/event.
13. Failed scan does not overwrite the prior successful baseline.
14. Existing public scanner SSRF rejection remains green.
15. EN / UA / RU public VisibilityOS routes still render correctly.
16. GitHub lint/typecheck/build/runtime-route gates pass for the exact commit.
17. Exact deployed commit and production runtime are verified before calling SaaS live.

## Next product layer

After the monitoring foundation is live, add the account application in this order:

1. Auth and workspace bootstrap.
2. Create/save project from a Visibility Map.
3. Project dashboard with score/history/evidence deltas.
4. Growth Queue status changes and post-fix verification.
5. Notification delivery from `visibility_events`.
6. GSC connection.
7. GBP connection.
8. SERP/Map Pack source and citation/review intelligence only when backed by real connected data.
9. Billing after activation/retention is proven with founder customers.
