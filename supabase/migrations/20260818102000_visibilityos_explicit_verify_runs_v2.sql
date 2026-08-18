create or replace function public.visibilityos_record_user_scan_v2(
  p_project_id uuid,
  p_result jsonb,
  p_requested_job_type text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_workspace_id uuid;
  v_job_type text;
  v_key text;
  v_has_full_baseline boolean;
begin
  if v_user_id is null then raise exception 'authentication_required'; end if;

  select p.workspace_id into v_workspace_id
  from public.visibilityos_projects p
  where p.id = p_project_id;

  if v_workspace_id is null or not public.visibilityos_is_workspace_member(v_workspace_id) then
    raise exception 'project_not_found';
  end if;

  if p_requested_job_type is not null and p_requested_job_type not in ('manual','verify') then
    raise exception 'invalid_requested_job_type';
  end if;

  select exists(
    select 1
    from public.visibilityos_scan_runs sr
    where sr.project_id = p_project_id
      and sr.status = 'success'
      and sr.job_type in ('baseline','manual','weekly','verify')
  ) into v_has_full_baseline;

  if not v_has_full_baseline then
    v_job_type := 'baseline';
  elsif p_requested_job_type = 'verify' then
    v_job_type := 'verify';
  else
    v_job_type := 'manual';
  end if;

  v_key := v_job_type || ':' || p_project_id::text || ':' || gen_random_uuid()::text;
  return public.visibilityos_persist_full_scan(p_project_id, v_job_type, v_key, p_result, now());
end;
$$;

revoke all on function public.visibilityos_record_user_scan_v2(uuid, jsonb, text) from public, anon;
grant execute on function public.visibilityos_record_user_scan_v2(uuid, jsonb, text) to authenticated, service_role;

comment on function public.visibilityos_record_user_scan_v2(uuid, jsonb, text) is
  'Records authenticated full VisibilityOS scans while preserving baseline/manual/verify history semantics.';
