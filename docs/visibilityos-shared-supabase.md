# VisibilityOS shared Supabase architecture

VisibilityOS shares the existing `dacha-tv-prod` Supabase project to avoid a second monthly project charge.

## Isolation rules

VisibilityOS must never use generic table names in this shared project. Every customer-product table is prefixed with `visibilityos_` and all user-facing tables use Row Level Security.

Dacha TV tables such as `catalog_products`, `supplier_products`, `orders`, `bookings`, `services` and their data are not modified by VisibilityOS migrations.

## Runtime

- Public scanner and health scanner: Next.js/Vercel.
- Persistence/Auth/RLS: existing Supabase project `qpmktvybhlwbwsxevifj`.
- Scheduler: Supabase `pg_cron`, every 15 minutes.
- Worker: Supabase Edge Function `visibilityos-monitor-worker`.
- Scheduler authentication: random secret stored only in Supabase Vault.
- Customer account UI: `/visibilityos/app`, `/ua/visibilityos/app`, `/ru/visibilityos/app`.
- n8n remains available on the always-on server for internal sales/content/ops or optional delivery integrations, but core customer monitoring does not depend on n8n availability.

## Product loop

1. User creates an account.
2. User creates a project with URL, service, location and optional competitors.
3. VisibilityOS runs and persists a full baseline.
4. Growth Queue is persisted per project.
5. User moves actions through Planned / In progress / Done.
6. Done schedules a full verification scan.
7. If the evidence issue disappears, the action becomes Verified.
8. If the issue remains, the action automatically reopens.
9. Daily health checks and weekly full scans create history and material events.

## Current production database objects

Tables are prefixed `visibilityos_`, including projects, workspaces, scan runs/pages/findings, Growth Queue, events and notification preferences.

Service-role-only RPCs claim due jobs and persist automation callbacks. Authenticated-user RPCs create workspaces/projects, persist a user-triggered full scan and update Growth Queue state.

## Security

- Publishable Supabase key is browser-safe and is used only with authenticated user JWTs.
- Secret/service-role keys are never shipped to the browser.
- RLS is the tenant boundary.
- Worker auth secret is stored in Vault and is not committed.
- Public scanner continues to reject private/localhost targets.
- Account pages are `noindex`.

## Verification before production cutover

- GitHub exact-commit lint/typecheck/build.
- Vercel preview READY and rendered account routes.
- Supabase security/performance advisors reviewed after DDL.
- RLS tenant-isolation tests with two simulated users/workspaces.
- Edge worker wrong secret -> 401.
- Edge worker correct secret -> 200.
- Cron exists and run history is healthy.
- Real project baseline persists pages/findings/actions.
- Marking an action Done schedules verification and the next full scan can verify/reopen it.
- Production domain is changed only after approval.
