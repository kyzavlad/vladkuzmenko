create extension if not exists pgcrypto;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspaces (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.workspace_members (
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz not null default now(),
  primary key (workspace_id, user_id)
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 160),
  url text not null,
  lang text not null default 'en' check (lang in ('en', 'ua', 'ru')),
  service text not null default '',
  location text not null default '',
  status text not null default 'active' check (status in ('active', 'paused', 'archived')),
  monitoring_enabled boolean not null default true,
  daily_health_enabled boolean not null default true,
  weekly_full_scan_enabled boolean not null default true,
  next_daily_scan_at timestamptz not null default now(),
  next_weekly_scan_at timestamptz not null default now(),
  last_scan_at timestamptz,
  last_score integer check (last_score between 0 and 100),
  automation_locked_until timestamptz,
  automation_lock_key text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_daily_due_idx
  on public.projects (next_daily_scan_at)
  where status = 'active' and monitoring_enabled and daily_health_enabled;
create index if not exists projects_weekly_due_idx
  on public.projects (next_weekly_scan_at)
  where status = 'active' and monitoring_enabled and weekly_full_scan_enabled;

create table if not exists public.project_competitors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  url text not null,
  created_at timestamptz not null default now(),
  unique (project_id, url)
);

create table if not exists public.connections (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  provider text not null check (provider in ('gsc', 'gbp', 'serp', 'citations', 'other')),
  status text not null default 'pending' check (status in ('pending', 'connected', 'error', 'disabled')),
  secret_ref text,
  metadata jsonb not null default '{}'::jsonb,
  connected_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, provider)
);

create table if not exists public.scan_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  job_type text not null check (job_type in ('baseline', 'manual', 'daily', 'weekly', 'verify')),
  idempotency_key text not null unique,
  status text not null check (status in ('success', 'failed')),
  result jsonb,
  error text,
  finished_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  check ((status = 'success' and result is not null) or status = 'failed')
);

create index if not exists scan_runs_project_finished_idx
  on public.scan_runs (project_id, finished_at desc);

create table if not exists public.scan_pages (
  id uuid primary key default gen_random_uuid(),
  scan_run_id uuid not null references public.scan_runs(id) on delete cascade,
  url text not null,
  kind text,
  status_code integer,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists scan_pages_run_idx on public.scan_pages (scan_run_id);

create table if not exists public.scan_findings (
  id uuid primary key default gen_random_uuid(),
  scan_run_id uuid not null references public.scan_runs(id) on delete cascade,
  finding_key text not null,
  category text,
  status text not null check (status in ('pass', 'warn', 'fail')),
  priority text,
  title text,
  evidence text,
  recommendation text,
  payload jsonb not null,
  created_at timestamptz not null default now(),
  unique (scan_run_id, finding_key)
);

create index if not exists scan_findings_run_idx on public.scan_findings (scan_run_id);

create table if not exists public.growth_actions (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  action_key text not null,
  lane text not null check (lane in ('now', 'next', 'later')),
  category text,
  impact text,
  confidence text,
  effort text,
  title text not null,
  reason text,
  evidence text,
  action text,
  status text not null default 'open' check (status in ('open', 'planned', 'in_progress', 'done', 'dismissed')),
  first_observed_at timestamptz not null default now(),
  last_observed_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (project_id, action_key)
);

create index if not exists growth_actions_project_status_idx
  on public.growth_actions (project_id, status, lane);

create table if not exists public.visibility_events (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  scan_run_id uuid references public.scan_runs(id) on delete set null,
  event_key text not null unique,
  event_type text not null,
  severity text not null default 'info' check (severity in ('info', 'warning', 'critical', 'positive')),
  title text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists visibility_events_project_created_idx
  on public.visibility_events (project_id, created_at desc);

create table if not exists public.notification_preferences (
  project_id uuid primary key references public.projects(id) on delete cascade,
  email_enabled boolean not null default false,
  email text,
  telegram_enabled boolean not null default false,
  telegram_chat_id text,
  minimum_severity text not null default 'warning' check (minimum_severity in ('info', 'warning', 'critical')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.visibility_events(id) on delete cascade,
  channel text not null check (channel in ('email', 'telegram')),
  destination_hash text not null,
  status text not null default 'pending' check (status in ('pending', 'sent', 'failed', 'suppressed')),
  provider_message_id text,
  error text,
  created_at timestamptz not null default now(),
  sent_at timestamptz,
  unique (event_id, channel, destination_hash)
);

create or replace function public.visibilityos_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.visibilityos_add_workspace_owner()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.workspace_members (workspace_id, user_id, role)
  values (new.id, new.owner_id, 'owner')
  on conflict (workspace_id, user_id) do update set role = 'owner';
  return new;
end;
$$;

drop trigger if exists workspaces_add_owner on public.workspaces;
create trigger workspaces_add_owner
after insert on public.workspaces
for each row execute function public.visibilityos_add_workspace_owner();

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at before update on public.profiles
for each row execute function public.visibilityos_touch_updated_at();
drop trigger if exists workspaces_touch_updated_at on public.workspaces;
create trigger workspaces_touch_updated_at before update on public.workspaces
for each row execute function public.visibilityos_touch_updated_at();
drop trigger if exists projects_touch_updated_at on public.projects;
create trigger projects_touch_updated_at before update on public.projects
for each row execute function public.visibilityos_touch_updated_at();
drop trigger if exists connections_touch_updated_at on public.connections;
create trigger connections_touch_updated_at before update on public.connections
for each row execute function public.visibilityos_touch_updated_at();
drop trigger if exists growth_actions_touch_updated_at on public.growth_actions;
create trigger growth_actions_touch_updated_at before update on public.growth_actions
for each row execute function public.visibilityos_touch_updated_at();
drop trigger if exists notification_preferences_touch_updated_at on public.notification_preferences;
create trigger notification_preferences_touch_updated_at before update on public.notification_preferences
for each row execute function public.visibilityos_touch_updated_at();

create or replace function public.is_visibilityos_workspace_member(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
  );
$$;

create or replace function public.is_visibilityos_workspace_admin(p_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members wm
    where wm.workspace_id = p_workspace_id
      and wm.user_id = auth.uid()
      and wm.role in ('owner', 'admin')
  );
$$;

alter table public.profiles enable row level security;
alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.projects enable row level security;
alter table public.project_competitors enable row level security;
alter table public.connections enable row level security;
alter table public.scan_runs enable row level security;
alter table public.scan_pages enable row level security;
alter table public.scan_findings enable row level security;
alter table public.growth_actions enable row level security;
alter table public.visibility_events enable row level security;
alter table public.notification_preferences enable row level security;
alter table public.notification_deliveries enable row level security;

drop policy if exists profiles_self on public.profiles;
create policy profiles_self on public.profiles
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists workspaces_select_member on public.workspaces;
create policy workspaces_select_member on public.workspaces
  for select to authenticated
  using (public.is_visibilityos_workspace_member(id));
drop policy if exists workspaces_insert_owner on public.workspaces;
create policy workspaces_insert_owner on public.workspaces
  for insert to authenticated
  with check (owner_id = auth.uid());
drop policy if exists workspaces_update_admin on public.workspaces;
create policy workspaces_update_admin on public.workspaces
  for update to authenticated
  using (public.is_visibilityos_workspace_admin(id))
  with check (public.is_visibilityos_workspace_admin(id));

drop policy if exists workspace_members_select_member on public.workspace_members;
create policy workspace_members_select_member on public.workspace_members
  for select to authenticated
  using (public.is_visibilityos_workspace_member(workspace_id));
drop policy if exists workspace_members_manage_admin on public.workspace_members;
create policy workspace_members_manage_admin on public.workspace_members
  for all to authenticated
  using (public.is_visibilityos_workspace_admin(workspace_id))
  with check (public.is_visibilityos_workspace_admin(workspace_id));

drop policy if exists projects_workspace_access on public.projects;
create policy projects_workspace_access on public.projects
  for all to authenticated
  using (public.is_visibilityos_workspace_member(workspace_id))
  with check (public.is_visibilityos_workspace_member(workspace_id));

drop policy if exists project_competitors_workspace_access on public.project_competitors;
create policy project_competitors_workspace_access on public.project_competitors
  for all to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ))
  with check (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists connections_workspace_access on public.connections;
create policy connections_workspace_access on public.connections
  for all to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ))
  with check (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists scan_runs_workspace_read on public.scan_runs;
create policy scan_runs_workspace_read on public.scan_runs
  for select to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists scan_pages_workspace_read on public.scan_pages;
create policy scan_pages_workspace_read on public.scan_pages
  for select to authenticated
  using (exists (
    select 1 from public.scan_runs sr
    join public.projects p on p.id = sr.project_id
    where sr.id = scan_run_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists scan_findings_workspace_read on public.scan_findings;
create policy scan_findings_workspace_read on public.scan_findings
  for select to authenticated
  using (exists (
    select 1 from public.scan_runs sr
    join public.projects p on p.id = sr.project_id
    where sr.id = scan_run_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists growth_actions_workspace_access on public.growth_actions;
create policy growth_actions_workspace_access on public.growth_actions
  for all to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ))
  with check (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists visibility_events_workspace_read on public.visibility_events;
create policy visibility_events_workspace_read on public.visibility_events
  for select to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists notification_preferences_workspace_access on public.notification_preferences;
create policy notification_preferences_workspace_access on public.notification_preferences
  for all to authenticated
  using (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ))
  with check (exists (
    select 1 from public.projects p
    where p.id = project_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

drop policy if exists notification_deliveries_workspace_read on public.notification_deliveries;
create policy notification_deliveries_workspace_read on public.notification_deliveries
  for select to authenticated
  using (exists (
    select 1
    from public.visibility_events ve
    join public.projects p on p.id = ve.project_id
    where ve.id = event_id and public.is_visibilityos_workspace_member(p.workspace_id)
  ));

create or replace function public.visibilityos_claim_due_jobs(
  p_job_type text,
  p_limit integer default 20
)
returns setof jsonb
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_job_type not in ('daily', 'weekly') then
    raise exception 'invalid_job_type';
  end if;

  return query
  with candidates as (
    select
      p.id,
      case when p_job_type = 'daily' then p.next_daily_scan_at else p.next_weekly_scan_at end as due_at
    from public.projects p
    where p.status = 'active'
      and p.monitoring_enabled
      and (p.automation_locked_until is null or p.automation_locked_until < now())
      and (
        (p_job_type = 'daily' and p.daily_health_enabled and p.next_daily_scan_at <= now())
        or
        (p_job_type = 'weekly' and p.weekly_full_scan_enabled and p.next_weekly_scan_at <= now())
      )
    order by case when p_job_type = 'daily' then p.next_daily_scan_at else p.next_weekly_scan_at end asc
    for update skip locked
    limit least(greatest(coalesce(p_limit, 20), 1), 50)
  ), claimed as (
    update public.projects p
    set
      automation_locked_until = now() + interval '30 minutes',
      automation_lock_key = p_job_type || ':' || p.id::text || ':' || to_char(c.due_at at time zone 'UTC', 'YYYYMMDDHH24MISS'),
      updated_at = now()
    from candidates c
    where p.id = c.id
    returning p.*, c.due_at
  )
  select jsonb_build_object(
    'projectId', c.id,
    'jobType', p_job_type,
    'idempotencyKey', c.automation_lock_key,
    'scanPayload', jsonb_build_object(
      'url', c.url,
      'lang', c.lang,
      'service', c.service,
      'location', c.location,
      'competitors', coalesce((
        select jsonb_agg(pc.url order by pc.created_at)
        from public.project_competitors pc
        where pc.project_id = c.id
      ), '[]'::jsonb)
    )
  )
  from claimed c;
end;
$$;

create or replace function public.visibilityos_record_automation_callback(
  p_project_id uuid,
  p_job_type text,
  p_idempotency_key text,
  p_ok boolean,
  p_result jsonb,
  p_error text,
  p_finished_at timestamptz default now()
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_run_id uuid;
  v_previous_result jsonb;
  v_score integer;
  v_previous_score integer;
  v_event_count integer := 0;
  v_status text := case when p_ok then 'success' else 'failed' end;
begin
  if p_job_type not in ('daily', 'weekly') then
    raise exception 'invalid_job_type';
  end if;

  if not exists (select 1 from public.projects where id = p_project_id) then
    raise exception 'project_not_found';
  end if;

  select sr.result
    into v_previous_result
  from public.scan_runs sr
  where sr.project_id = p_project_id
    and sr.status = 'success'
  order by sr.finished_at desc
  limit 1;

  insert into public.scan_runs (
    project_id, job_type, idempotency_key, status, result, error, finished_at
  ) values (
    p_project_id,
    p_job_type,
    p_idempotency_key,
    v_status,
    case when p_ok then p_result else null end,
    case when p_ok then null else left(coalesce(p_error, 'scan_failed'), 2000) end,
    coalesce(p_finished_at, now())
  )
  on conflict (idempotency_key) do nothing
  returning id into v_run_id;

  if v_run_id is null then
    return jsonb_build_object('duplicate', true, 'eventCount', 0, 'notificationCount', 0);
  end if;

  if p_ok then
    if (p_result->>'score') ~ '^[0-9]{1,3}$' then
      v_score := least(greatest((p_result->>'score')::integer, 0), 100);
    end if;

    if v_previous_result is not null and (v_previous_result->>'score') ~ '^[0-9]{1,3}$' then
      v_previous_score := least(greatest((v_previous_result->>'score')::integer, 0), 100);
    end if;

    insert into public.scan_pages (scan_run_id, url, kind, status_code, payload)
    select
      v_run_id,
      coalesce(page->>'url', ''),
      page->>'kind',
      case when (page->>'statusCode') ~ '^[0-9]{3}$' then (page->>'statusCode')::integer else null end,
      page
    from jsonb_array_elements(coalesce(p_result->'pages', '[]'::jsonb)) page
    where coalesce(page->>'url', '') <> '';

    insert into public.scan_findings (
      scan_run_id, finding_key, category, status, priority, title, evidence, recommendation, payload
    )
    select
      v_run_id,
      finding->>'id',
      finding->>'category',
      case when finding->>'status' in ('pass', 'warn', 'fail') then finding->>'status' else 'warn' end,
      finding->>'priority',
      finding->>'title',
      finding->>'evidence',
      finding->>'recommendation',
      finding
    from jsonb_array_elements(coalesce(p_result->'findings', '[]'::jsonb)) finding
    where coalesce(finding->>'id', '') <> ''
    on conflict (scan_run_id, finding_key) do nothing;

    update public.growth_actions ga
    set status = 'dismissed', updated_at = now()
    where ga.project_id = p_project_id
      and ga.status in ('open', 'planned')
      and not exists (
        select 1
        from jsonb_array_elements(coalesce(p_result->'growthQueue', '[]'::jsonb)) action_item
        where action_item->>'id' = ga.action_key
      );

    insert into public.growth_actions (
      project_id, action_key, lane, category, impact, confidence, effort,
      title, reason, evidence, action, status, first_observed_at, last_observed_at
    )
    select
      p_project_id,
      action_item->>'id',
      case when action_item->>'lane' in ('now', 'next', 'later') then action_item->>'lane' else 'next' end,
      action_item->>'category',
      action_item->>'impact',
      action_item->>'confidence',
      action_item->>'effort',
      coalesce(action_item->>'title', action_item->>'id'),
      action_item->>'reason',
      action_item->>'evidence',
      action_item->>'action',
      'open',
      now(),
      now()
    from jsonb_array_elements(coalesce(p_result->'growthQueue', '[]'::jsonb)) action_item
    where coalesce(action_item->>'id', '') <> ''
    on conflict (project_id, action_key) do update set
      lane = excluded.lane,
      category = excluded.category,
      impact = excluded.impact,
      confidence = excluded.confidence,
      effort = excluded.effort,
      title = excluded.title,
      reason = excluded.reason,
      evidence = excluded.evidence,
      action = excluded.action,
      status = case
        when public.growth_actions.status = 'dismissed' then 'open'
        else public.growth_actions.status
      end,
      last_observed_at = now(),
      updated_at = now();

    if v_previous_result is null then
      insert into public.visibility_events (
        project_id, scan_run_id, event_key, event_type, severity, title, payload
      ) values (
        p_project_id,
        v_run_id,
        p_idempotency_key || ':baseline',
        'baseline.created',
        'info',
        'Visibility baseline created',
        jsonb_build_object('score', v_score)
      ) on conflict (event_key) do nothing;
      get diagnostics v_event_count = row_count;
    elsif v_score is not null and v_previous_score is not null and abs(v_score - v_previous_score) >= 5 then
      insert into public.visibility_events (
        project_id, scan_run_id, event_key, event_type, severity, title, payload
      ) values (
        p_project_id,
        v_run_id,
        p_idempotency_key || ':score:' || v_score::text,
        'score.changed',
        case when v_score < v_previous_score then 'warning' else 'positive' end,
        case when v_score < v_previous_score then 'Visibility score decreased' else 'Visibility score improved' end,
        jsonb_build_object('previousScore', v_previous_score, 'score', v_score, 'delta', v_score - v_previous_score)
      ) on conflict (event_key) do nothing;
      v_event_count := v_event_count + 1;
    end if;

    with current_findings as (
      select value as finding
      from jsonb_array_elements(coalesce(p_result->'findings', '[]'::jsonb))
    ), previous_findings as (
      select value as finding
      from jsonb_array_elements(coalesce(v_previous_result->'findings', '[]'::jsonb))
    ), transitions as (
      select
        cf.finding->>'id' as finding_id,
        cf.finding->>'title' as finding_title,
        cf.finding->>'status' as current_status,
        pf.finding->>'status' as previous_status,
        cf.finding as finding_payload
      from current_findings cf
      left join previous_findings pf on pf.finding->>'id' = cf.finding->>'id'
      where coalesce(cf.finding->>'id', '') <> ''
        and coalesce(cf.finding->>'status', '') <> coalesce(pf.finding->>'status', '')
        and (
          cf.finding->>'status' = 'fail'
          or (cf.finding->>'status' = 'pass' and pf.finding->>'status' in ('warn', 'fail'))
        )
    ), inserted as (
      insert into public.visibility_events (
        project_id, scan_run_id, event_key, event_type, severity, title, payload
      )
      select
        p_project_id,
        v_run_id,
        p_idempotency_key || ':finding:' || finding_id || ':' || current_status,
        case when current_status = 'fail' then 'finding.regressed' else 'finding.recovered' end,
        case when current_status = 'fail' then 'warning' else 'positive' end,
        case
          when current_status = 'fail' then coalesce(finding_title, finding_id) || ' regressed'
          else coalesce(finding_title, finding_id) || ' recovered'
        end,
        jsonb_build_object(
          'findingId', finding_id,
          'previousStatus', previous_status,
          'status', current_status,
          'finding', finding_payload
        )
      from transitions
      on conflict (event_key) do nothing
      returning 1
    )
    select v_event_count + count(*) into v_event_count from inserted;

    update public.projects
    set
      last_scan_at = coalesce(p_finished_at, now()),
      last_score = coalesce(v_score, last_score),
      next_daily_scan_at = case when p_job_type = 'daily' then now() + interval '1 day' else next_daily_scan_at end,
      next_weekly_scan_at = case when p_job_type = 'weekly' then now() + interval '7 days' else next_weekly_scan_at end,
      automation_locked_until = null,
      automation_lock_key = null,
      updated_at = now()
    where id = p_project_id
      and (automation_lock_key = p_idempotency_key or automation_lock_key is null);
  else
    insert into public.visibility_events (
      project_id, scan_run_id, event_key, event_type, severity, title, payload
    ) values (
      p_project_id,
      v_run_id,
      p_idempotency_key || ':failed',
      'scan.failed',
      'warning',
      'Scheduled visibility scan failed',
      jsonb_build_object('jobType', p_job_type, 'error', left(coalesce(p_error, 'scan_failed'), 500))
    ) on conflict (event_key) do nothing;
    get diagnostics v_event_count = row_count;

    update public.projects
    set
      next_daily_scan_at = case when p_job_type = 'daily' then now() + interval '6 hours' else next_daily_scan_at end,
      next_weekly_scan_at = case when p_job_type = 'weekly' then now() + interval '12 hours' else next_weekly_scan_at end,
      automation_locked_until = null,
      automation_lock_key = null,
      updated_at = now()
    where id = p_project_id
      and automation_lock_key = p_idempotency_key;
  end if;

  return jsonb_build_object(
    'duplicate', false,
    'runId', v_run_id,
    'eventCount', v_event_count,
    'notificationCount', 0
  );
end;
$$;

revoke all on function public.visibilityos_claim_due_jobs(text, integer) from public, anon, authenticated;
revoke all on function public.visibilityos_record_automation_callback(uuid, text, text, boolean, jsonb, text, timestamptz) from public, anon, authenticated;
grant execute on function public.visibilityos_claim_due_jobs(text, integer) to service_role;
grant execute on function public.visibilityos_record_automation_callback(uuid, text, text, boolean, jsonb, text, timestamptz) to service_role;
