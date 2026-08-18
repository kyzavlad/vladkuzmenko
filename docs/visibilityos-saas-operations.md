# VisibilityOS SaaS operations

## Canonical production architecture

VisibilityOS does not depend on a founder-owned n8n workflow for its core monitoring loop.

- **Next.js / Vercel** owns the public Visibility Map, the lightweight health scan, acquisition pages and the account application.
- **Dedicated Supabase** owns Auth, workspaces, projects, scan history, Growth Queue, events, notification preferences and the monitoring scheduler.
- **Supabase pg_cron** is the scheduler.
- **Supabase Edge Function `visibilityos-monitor-worker`** is the recurring worker.
- `/api/visibilityos/health` is the lightweight daily scanner.
- `/api/visibilityos/scan` is the canonical weekly/full Visibility Map scanner.

The runtime loop is:

```text
pg_cron
  -> visibilityos-monitor-worker Edge Function
  -> claim due projects with a DB lease
  -> daily: /api/visibilityos/health
     weekly: /api/visibilityos/scan
  -> visibilityos_record_automation_callback RPC
  -> scan history + evidence deltas + events + Growth Queue
```

This keeps the product online if a personal n8n instance, laptop or other founder system is offline. n8n remains useful for internal sales/content/ops workflows, but it is not a production dependency of the customer product.

## Database bootstrap

Use a dedicated VisibilityOS Supabase project. Never apply these migrations to `dacha-tv-prod`.

Apply all migrations in order:

```text
supabase/migrations/20260818070000_visibilityos_saas_v1.sql
supabase/migrations/20260818073000_visibilityos_monitoring_modes.sql
supabase/migrations/20260818074500_visibilityos_scan_result_guards.sql
supabase/migrations/20260818080000_visibilityos_server_worker.sql
```

The migrations create tenant-scoped persistence, RLS, job leases/idempotency, separate daily/weekly baselines, runtime configuration and the protected cron bootstrap function.

After the Edge Function is deployed, configure the scheduler once as Postgres admin:

```sql
select public.visibilityos_configure_monitor_worker(
  'https://<visibilityos-project-ref>.supabase.co',
  '*/15 * * * *'
);
```

The bootstrap function generates a 32-byte random cron secret inside Supabase Vault. The secret is never committed or copied into the website. `pg_cron` reads it from Vault and sends it to the Edge Function in `x-visibilityos-cron-secret`. The Edge Function validates it through a service-role-only RPC before claiming any work.

## Runtime configuration

`public.visibilityos_runtime_config` is server-only. The first key is:

```text
app_base_url = https://www.vladkuzmenko.com
```

For a controlled pre-production E2E test this value may temporarily point at an accessible release candidate. Before activating production monitoring it must point at the canonical production domain.

## Daily vs weekly monitoring

### Daily health

Daily checks intentionally stay lightweight:

- homepage availability/status
- HTTPS
- canonical
- page indexability directive
- `robots.txt` availability
- security-header coverage

Daily runs compare only with the prior successful **daily** run. They do not crawl the rest of the site, compare competitors, refresh the Growth Queue or overwrite the full visibility score.

### Weekly growth scan

Weekly monitoring runs the full Visibility Map and can persist:

- sampled pages
- normalized findings
- pillar/score history
- competitor context
- persistent Growth Queue
- material weekly deltas

Weekly runs compare only with the prior successful **weekly** run.

## Reliability rules

- Database leasing prevents two workers from claiming the same project concurrently.
- Callback idempotency prevents duplicate scan/event persistence.
- A failed scan is recorded but never becomes the successful baseline.
- Daily failures retry after the configured short retry window; weekly failures retry separately.
- The worker claims weekly jobs first, so a weekly scan leases the project before the same pass can claim a redundant daily scan.
- Each cron invocation claims a bounded batch. Remaining due projects are handled by later scheduler passes.
- The Edge Function isolates per-project failures and reports a worker summary in function logs.

## Secrets

No VisibilityOS monitoring secret belongs in source control.

The Edge Function receives Supabase server credentials automatically from the hosted runtime. It prefers `SUPABASE_SECRET_KEYS.default` and falls back to the legacy service-role environment variable only while both Supabase key systems coexist.

The scheduler-specific secret exists only in Supabase Vault.

## Release gates

Do not call the SaaS live until all are verified:

1. Dedicated VisibilityOS Supabase project exists.
2. All migrations apply successfully.
3. Supabase security and performance advisors are reviewed.
4. RLS tenant isolation passes with two independent users/workspaces.
5. `visibilityos-monitor-worker` is deployed with JWT gateway verification disabled because it performs its own Vault-backed secret verification.
6. Missing/incorrect cron secret returns 401.
7. The pg_cron job is installed and its run history is healthy.
8. Due job can be claimed only once while leased.
9. Daily job reaches the health endpoint and persists only daily health history/events.
10. Weekly job reaches the full scanner and refreshes full history/Growth Queue.
11. Replayed idempotency key cannot duplicate a run/event.
12. Failed scan cannot overwrite the prior successful baseline.
13. Daily and weekly runs compare only against their own prior successful mode.
14. Public scanner and health scanner reject private/localhost targets.
15. Auth/session flows work on desktop/mobile.
16. EN/UA/RU acquisition routes remain intact.
17. GitHub lint/typecheck/build/runtime-route gates pass for the exact release commit.
18. Exact production deployment commit/domain/runtime are verified before customer monitoring is enabled.

## Product completion order

After the server monitoring loop is verified, finish the customer product in this order:

1. Auth and workspace bootstrap.
2. Save a successful Visibility Map as a project without re-entering domain/service/location.
3. Project dashboard with current state, history and material deltas.
4. Growth Queue action lifecycle: open, planned, in progress, done, dismissed.
5. Post-fix verification against observable evidence.
6. In-app event feed and notification preferences.
7. Email delivery for material alerts/digests.
8. Connected first-party data only when real credentials/data exist (GSC first, then GBP; SERP/Map Pack only through a compliant source).
9. Manual beta provisioning first; billing only after the recurring product loop is proven with real users.

The product is an operating loop and outcome, not a crawler, dashboard or automation-tool showcase.
