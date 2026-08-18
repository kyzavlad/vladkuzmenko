create extension if not exists pg_cron;
create extension if not exists pg_net;

create table if not exists public.visibilityos_runtime_config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.visibilityos_runtime_config enable row level security;
revoke all on table public.visibilityos_runtime_config from public, anon, authenticated;
grant select, insert, update, delete on table public.visibilityos_runtime_config to service_role;

insert into public.visibilityos_runtime_config (key, value)
values ('app_base_url', 'https://www.vladkuzmenko.com')
on conflict (key) do nothing;

drop trigger if exists visibilityos_runtime_config_touch_updated_at on public.visibilityos_runtime_config;
create trigger visibilityos_runtime_config_touch_updated_at
before update on public.visibilityos_runtime_config
for each row execute function public.visibilityos_touch_updated_at();

create or replace function public.visibilityos_verify_cron_secret(p_secret text)
returns boolean
language sql
stable
security definer
set search_path = public, vault
as $$
  select
    p_secret is not null
    and char_length(p_secret) >= 32
    and exists (
      select 1
      from vault.decrypted_secrets secret
      where secret.name = 'visibilityos_cron_secret'
        and secret.decrypted_secret = p_secret
    );
$$;

revoke all on function public.visibilityos_verify_cron_secret(text) from public, anon, authenticated;
grant execute on function public.visibilityos_verify_cron_secret(text) to service_role;

create or replace function public.visibilityos_configure_monitor_worker(
  p_project_url text,
  p_schedule text default '*/15 * * * *'
)
returns jsonb
language plpgsql
security definer
set search_path = public, vault, cron
as $$
declare
  v_project_url text;
  v_existing_job_id bigint;
  v_job_id bigint;
begin
  v_project_url := regexp_replace(trim(coalesce(p_project_url, '')), '/+$', '');

  if v_project_url !~ '^https://[a-z0-9-]+\.supabase\.co$' then
    raise exception 'invalid_supabase_project_url';
  end if;

  if not exists (
    select 1
    from vault.decrypted_secrets
    where name = 'visibilityos_cron_secret'
  ) then
    perform vault.create_secret(
      encode(gen_random_bytes(32), 'hex'),
      'visibilityos_cron_secret',
      'Authenticates the internal VisibilityOS pg_cron -> Edge Function worker call.'
    );
  end if;

  insert into public.visibilityos_runtime_config (key, value)
  values ('supabase_project_url', v_project_url)
  on conflict (key) do update
    set value = excluded.value,
        updated_at = now();

  select jobid
    into v_existing_job_id
  from cron.job
  where jobname = 'visibilityos-monitor-worker'
  limit 1;

  if v_existing_job_id is not null then
    perform cron.unschedule(v_existing_job_id);
  end if;

  v_job_id := cron.schedule(
    'visibilityos-monitor-worker',
    p_schedule,
    $visibilityos_cron$
      select net.http_post(
        url := (
          select value
          from public.visibilityos_runtime_config
          where key = 'supabase_project_url'
        ) || '/functions/v1/visibilityos-monitor-worker',
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'x-visibilityos-cron-secret', (
            select decrypted_secret
            from vault.decrypted_secrets
            where name = 'visibilityos_cron_secret'
          )
        ),
        body := jsonb_build_object('triggeredAt', now()),
        timeout_milliseconds := 55000
      ) as request_id;
    $visibilityos_cron$
  );

  return jsonb_build_object(
    'configured', true,
    'jobId', v_job_id,
    'schedule', p_schedule,
    'projectUrl', v_project_url
  );
end;
$$;

revoke all on function public.visibilityos_configure_monitor_worker(text, text)
  from public, anon, authenticated, service_role;

comment on function public.visibilityos_configure_monitor_worker(text, text) is
  'Postgres-admin bootstrap only. Stores an internal cron secret in Vault and schedules the server-native VisibilityOS monitor worker.';
