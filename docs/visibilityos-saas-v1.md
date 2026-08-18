# VisibilityOS SaaS v1

## Product definition

VisibilityOS is a local visibility operating system for service businesses and agencies. The product outcome is not “an SEO score.” It is: **know what is blocking discoverability and conversion, know what changed, and know what to fix next.**

The existing public Visibility Map remains the free acquisition surface. SaaS v1 adds persistence, first-party data, recurring evidence, alerts and an execution queue.

## Target customer

Primary v1 ICP: local service businesses where one qualified lead is economically meaningful (dental/cosmetic clinics, legal, home services, automotive services, property/hospitality and similar). Secondary: agencies managing several such businesses.

## Product loop

1. **Onboard project** — domain, core service, actual service area, competitors.
2. **Connect evidence** — public crawl first; Search Console and Google Business Profile when authorized; compliant SERP/local data source when configured.
3. **Baseline** — capture public-site, search, local/entity, trust and conversion evidence.
4. **Growth Queue** — prioritize only actions supported by evidence with impact / confidence / effort.
5. **Execute** — user marks actions planned/in progress/done; VisibilityOS can draft changes but does not silently publish SEO content or business profile changes.
6. **Re-check** — compare the same evidence after implementation.
7. **Monitor** — scheduled checks generate deltas and notify only on material changes.

## SaaS v1 release scope

### Accounts and projects
- Supabase Auth.
- User-owned workspaces/projects.
- One canonical project record for domain + target service + target location.
- Competitors attached per project.
- RLS on all tenant data.

### Persistence
- Store scan runs and normalized findings.
- Store page-level evidence and pillar scores.
- Store Growth Queue actions and lifecycle state.
- Store material-change events and notification delivery state.

### Recurring monitoring
- Daily lightweight health check: response/indexability/canonical/robots/security drift.
- Weekly full Visibility Map re-scan.
- Weekly Growth Queue refresh from new evidence.
- Monthly executive summary.
- Alerts only for material changes: availability/indexability/canonical loss, major pillar drop, newly detected high-priority issue, or supported connected-data changes.

### First-party / local evidence
Phase 1: public site + saved history + deltas.
Phase 2 after credentials/API approval: Google Search Console query/page data, Google Business Profile operational data, compliant local SERP/map-pack source and citation/NAP evidence.

No UI may claim live rankings, traffic, leads, revenue or AI-assistant recommendation unless the relevant source is actually connected and the displayed metric comes from it.

### Execution workspace
- Now / Next / Later queue.
- Action state: open, planned, in_progress, done, dismissed.
- Evidence and expected mechanism attached to every action.
- Draft helpers for titles/H1/service/location/FAQ/schema and outreach where applicable.
- Human approval before any publish/write integration.

### Notifications
- In-app event feed.
- Email notification channel.
- Digest rules to prevent noisy repeated alerts.

### Billing
Do not activate paid checkout until the account product and recurring monitoring are production-verified. Initial beta can be manually provisioned. Stripe comes after the product loop is verified end-to-end.

## Data model

- `profiles`
- `workspaces`
- `workspace_members`
- `projects`
- `project_competitors`
- `connections`
- `scan_runs`
- `scan_pages`
- `scan_findings`
- `growth_actions`
- `visibility_events`
- `notification_preferences`
- `notification_deliveries`

Every tenant table must include ownership/workspace linkage and RLS. Provider tokens must never be stored in browser-readable columns.

## Workflow architecture

### WF-01 New project baseline
Trigger: project created.
Actions: validate public host -> scan -> persist normalized evidence -> generate Growth Queue -> record baseline -> show results.

### WF-02 Daily health monitor
Trigger: scheduled daily.
Actions: select active projects -> lightweight scan -> compare against last stable baseline -> create event only when material -> send alert according to preferences.

### WF-03 Weekly growth monitor
Trigger: scheduled weekly.
Actions: full scan -> ingest connected first-party data where available -> compare deltas -> refresh Growth Queue -> create weekly digest.

### WF-04 Post-fix verification
Trigger: action marked done or manual re-check.
Actions: scan affected target -> compare expected evidence -> mark verified only if the observable condition changed -> otherwise reopen with evidence.

### WF-05 Lead-to-account conversion
Trigger: public Visibility Map user requests monitoring.
Actions: preserve scan context -> create qualified lead in existing lead pipeline -> invite to beta/account when approved -> never require the user to repeat domain/service/location.

## Product metrics

Acquisition:
- scan starts
- successful scan completions
- completed scan -> identified lead
- lead -> growth-plan request
- growth-plan request -> sales conversation

Activation:
- account created
- first project created
- baseline completed
- first Growth Queue action opened/accepted

Retention:
- projects with successful weekly re-scan
- users returning to a new material event/digest
- actions verified after implementation

Revenue:
- beta -> paid conversion
- MRR
- implementation attach rate
- agency project expansion

Do not optimize for a vanity aggregate score alone.

## Release gates

SaaS v1 is not releasable until all are true:
- dedicated VisibilityOS database/project exists; no sharing the Dacha TV production database.
- migrations and RLS reviewed.
- auth/session flows verified on desktop/mobile.
- tenant isolation tested with two users/workspaces.
- baseline persistence verified against real scan output.
- daily and weekly jobs are idempotent.
- duplicate alerts are suppressed.
- failed scan retries do not corrupt the last stable baseline.
- production domain and exact commit verified.
- EN/UA/RU public acquisition routes remain intact.
- public scanner SSRF protections remain green.
- no unverified ranking/revenue claims appear in UI.

## Go-to-market architecture

The free Visibility Map is the lead-generation offer. It should lead to one of two paths:
1. **30-day implementation plan / done-for-you execution** for immediate cash flow.
2. **Monitoring account** for recurring product revenue.

Acquisition motion:
- personalized audits for high-value local businesses using real public evidence;
- short teardown videos and benchmark content that end in the free scan CTA;
- email follow-up based on the actual scan findings;
- real before/after case studies after implementation;
- agency/referral distribution once saved projects and multi-client workflows are ready.

The product should be sold as an outcome and operating loop, not as a crawler, dashboard, AI agent or collection of technical checks.
