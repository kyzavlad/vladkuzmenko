# VisibilityOS SaaS operations

## Canonical architecture

VisibilityOS intentionally reuses the existing free Supabase project `dacha-tv-prod` instead of creating a second paid project.

Isolation is mandatory: every VisibilityOS table is prefixed `visibilityos_`, every customer-facing table uses RLS, and Dacha TV tables/data are not modified by VisibilityOS migrations.

Runtime:

```text
Next.js/Vercel public scan + health scan
        ↓
Supabase Auth + RLS + visibilityos_* persistence
        ↓
pg_cron every 15 minutes
        ↓
visibilityos-monitor-worker Edge Function
        ↓
daily health / weekly full scan
        ↓
scan history + Growth Queue + material events + verification loop
```

The user's always-on n8n server remains available for internal sales/content/ops and optional delivery integrations. Core customer monitoring does not require n8n and therefore remains operational independently of founder workflows.

## Shared-project safety

Existing Dacha TV tables such as `catalog_products`, `supplier_products`, `orders`, `bookings`, `services`, and their rows remain untouched. VisibilityOS objects use names such as:

- `visibilityos_workspaces`
- `visibilityos_workspace_members`
- `visibilityos_projects`
- `visibilityos_scan_runs`
- `visibilityos_scan_pages`
- `visibilityos_scan_findings`
- `visibilityos_growth_actions`
- `visibilityos_events`
- `visibilityos_notification_preferences`

## Customer loop

1. User signs in at `/visibilityos/app` (localized routes also exist).
2. User creates a project with URL, target service, location and optional competitors.
3. The app runs a full public Visibility Map and persists the baseline.
4. Growth Queue becomes durable project state.
5. Actions move through Planned / In progress / Done / Dismissed.
6. Marking Done schedules a full verification scan.
7. If the evidence issue disappears, the action becomes Verified.
8. If it remains, the action automatically reopens.
9. Daily health and weekly full scans build history and material events.

## Scheduler and worker

`pg_cron` invokes the Supabase Edge Function `visibilityos-monitor-worker` every 15 minutes. The call is authenticated by a random secret stored only in Supabase Vault. The Edge Function validates that secret through a service-role-only RPC before it can claim work.

Job claiming uses a database lease plus idempotency keys. Failed runs never replace successful baselines and are rescheduled on a shorter retry window.

## Browser security

The website uses the Supabase publishable key only. The publishable key is not a secret; customer authorization comes from the authenticated user JWT plus RLS.

Secret/service-role keys are never shipped to the browser. Account pages are `noindex`. Public target scanning continues to reject private/localhost targets.

## Verified production facts (2026-08-18)

- Existing Supabase project: `qpmktvybhlwbwsxevifj` (`dacha-tv-prod`).
- VisibilityOS shared schema migrations applied successfully.
- Edge Function `visibilityos-monitor-worker` deployed and ACTIVE.
- Correct Vault-backed worker request returned HTTP 200 with zero jobs when none were due.
- Incorrect worker secret returned HTTP 401.
- Cron job configured every 15 minutes.

## Release gates still required before production cutover

- Exact GitHub release commit lint/typecheck/build green.
- Preview renders EN/UA/RU account routes on desktop/mobile.
- Supabase advisors reviewed after final DDL.
- Two-tenant RLS isolation test passes.
- A real baseline persists pages/findings/actions.
- Done → verification → Verified/Reopened is proven end-to-end.
- Exact production deployment commit/domain/runtime verified.

Production remains unchanged until those gates pass.
