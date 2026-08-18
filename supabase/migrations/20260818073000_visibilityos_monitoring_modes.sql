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
  v_current_status_code integer;
  v_previous_status_code integer;
  v_current_canonical text;
  v_previous_canonical text;
  v_current_robots_found boolean;
  v_previous_robots_found boolean;
  v_current_indexability text;
  v_previous_indexability text;
  v_current_security text;
  v_previous_security text;
begin
  if p_job_type not in ('daily', 'weekly') then
    raise exception 'invalid_job_type';
  end if;

  if exists (
    select 1
    from public.scan_runs sr
    where sr.idempotency_key = p_idempotency_key
  ) then
    return jsonb_build_object('duplicate', true, 'eventCount', 0, 'notificationCount', 0);
  end if;

  if not exists (
    select 1
    from public.projects p
    where p.id = p_project_id
      and p.automation_lock_key = p_idempotency_key
  ) then
    raise exception 'job_not_claimed';
  end if;

  select sr.result
    into v_previous_result
  from public.scan_runs sr
  where sr.project_id = p_project_id
    and sr.job_type = p_job_type
    and sr.status = 'success'
  order by sr.finished_at desc
  limit 1;

  insert into public.scan_runs (
    project_id,
    job_type,
    idempotency_key,
    status,
    result,
    error,
    finished_at
  ) values (
    p_project_id,
    p_job_type,
    p_idempotency_key,
    v_status,
    case when p_ok then p_result else null end,
    case when p_ok then null else left(coalesce(p_error, 'scan_failed'), 2000) end,
    coalesce(p_finished_at, now())
  )
  returning id into v_run_id;

  if p_ok and p_job_type = 'daily' then
    if p_result->>'mode' <> 'health' then
      raise exception 'daily_callback_requires_health_result';
    end if;

    insert into public.scan_findings (
      scan_run_id,
      finding_key,
      category,
      status,
      priority,
      title,
      evidence,
      recommendation,
      payload
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

    if (p_result->>'statusCode') ~ '^[0-9]{3}$' then
      v_current_status_code := (p_result->>'statusCode')::integer;
    end if;
    if v_previous_result is not null and (v_previous_result->>'statusCode') ~ '^[0-9]{3}$' then
      v_previous_status_code := (v_previous_result->>'statusCode')::integer;
    end if;

    v_current_canonical := nullif(trim(coalesce(p_result #>> '{health,canonical}', '')), '');
    v_previous_canonical := nullif(trim(coalesce(v_previous_result #>> '{health,canonical}', '')), '');
    v_current_robots_found := coalesce((p_result #>> '{health,robotsFound}')::boolean, false);
    v_previous_robots_found := case
      when v_previous_result is null then null
      else coalesce((v_previous_result #>> '{health,robotsFound}')::boolean, false)
    end;
    v_current_indexability := nullif(p_result #>> '{health,indexabilityStatus}', '');
    v_previous_indexability := nullif(v_previous_result #>> '{health,indexabilityStatus}', '');
    v_current_security := nullif(p_result #>> '{health,securityStatus}', '');
    v_previous_security := nullif(v_previous_result #>> '{health,securityStatus}', '');

    if v_previous_result is null then
      insert into public.visibility_events (
        project_id,
        scan_run_id,
        event_key,
        event_type,
        severity,
        title,
        payload
      ) values (
        p_project_id,
        v_run_id,
        p_idempotency_key || ':health-baseline',
        'health.baseline_created',
        'info',
        'Daily health baseline created',
        jsonb_build_object(
          'statusCode', v_current_status_code,
          'canonical', v_current_canonical,
          'robotsFound', v_current_robots_found,
          'indexabilityStatus', v_current_indexability,
          'securityStatus', v_current_security
        )
      ) on conflict (event_key) do nothing;
    else
      if v_previous_status_code is not null
        and v_previous_status_code < 400
        and v_current_status_code is not null
        and v_current_status_code >= 400 then
        insert into public.visibility_events (
          project_id, scan_run_id, event_key, event_type, severity, title, payload
        ) values (
          p_project_id,
          v_run_id,
          p_idempotency_key || ':availability-down',
          'availability.down',
          'critical',
          'Website availability regressed',
          jsonb_build_object('previousStatusCode', v_previous_status_code, 'statusCode', v_current_status_code)
        ) on conflict (event_key) do nothing;
      elsif v_previous_status_code is not null
        and v_previous_status_code >= 400
        and v_current_status_code is not null
        and v_current_status_code < 400 then
        insert into public.visibility_events (
          project_id, scan_run_id, event_key, event_type, severity, title, payload
        ) values (
          p_project_id,
          v_run_id,
          p_idempotency_key || ':availability-recovered',
          'availability.recovered',
          'positive',
          'Website availability recovered',
          jsonb_build_object('previousStatusCode', v_previous_status_code, 'statusCode', v_current_status_code)
        ) on conflict (event_key) do nothing;
      end if;

      if v_previous_canonical is distinct from v_current_canonical then
        insert into public.visibility_events (
          project_id, scan_run_id, event_key, event_type, severity, title, payload
        ) values (
          p_project_id,
          v_run_id,
          p_idempotency_key || ':canonical-changed',
          'canonical.changed',
          'warning',
          'Canonical URL changed',
          jsonb_build_object('previousCanonical', v_previous_canonical, 'canonical', v_current_canonical)
        ) on conflict (event_key) do nothing;
      end if;

      if v_previous_robots_found is true and v_current_robots_found is false then
        insert into public.visibility_events (
          project_id, scan_run_id, event_key, event_type, severity, title, payload
        ) values (
          p_project_id,
          v_run_id,
          p_idempotency_key || ':robots-lost',
          'robots_file.lost',
          'warning',
          'robots.txt is no longer available',
          jsonb_build_object('previousRobotsFound', true, 'robotsFound', false)
        ) on conflict (event_key) do nothing;
      elsif v_previous_robots_found is false and v_current_robots_found is true then
        insert into public.visibility_events (
          project_id, scan_run_id, event_key, event_type, severity, title, payload
        ) values (
          p_project_id,
          v_run_id,
          p_idempotency_key || ':robots-recovered',
          'robots_file.recovered',
          'positive',
          'robots.txt is available again',
          jsonb_build_object('previousRobotsFound', false, 'robotsFound', true)
        ) on conflict (event_key) do nothing;
      end if;

      if v_previous_indexability is distinct from v_current_indexability then
        if v_current_indexability = 'fail' then
          insert into public.visibility_events (
            project_id, scan_run_id, event_key, event_type, severity, title, payload
          ) values (
            p_project_id,
            v_run_id,
            p_idempotency_key || ':indexability-regressed',
            'indexability.regressed',
            'critical',
            'Homepage indexability regressed',
            jsonb_build_object('previousStatus', v_previous_indexability, 'status', v_current_indexability)
          ) on conflict (event_key) do nothing;
        elsif v_current_indexability = 'pass' and v_previous_indexability in ('warn', 'fail') then
          insert into public.visibility_events (
            project_id, scan_run_id, event_key, event_type, severity, title, payload
          ) values (
            p_project_id,
            v_run_id,
            p_idempotency_key || ':indexability-recovered',
            'indexability.recovered',
            'positive',
            'Homepage indexability recovered',
            jsonb_build_object('previousStatus', v_previous_indexability, 'status', v_current_indexability)
          ) on conflict (event_key) do nothing;
        end if;
      end if;

      if v_previous_security is distinct from v_current_security then
        if v_current_security = 'fail' then
          insert into public.visibility_events (
            project_id, scan_run_id, event_key, event_type, severity, title, payload
          ) values (
            p_project_id,
            v_run_id,
            p_idempotency_key || ':security-regressed',
            'security.regressed',
            'warning',
            'Security header coverage regressed',
            jsonb_build_object('previousStatus', v_previous_security, 'status', v_current_security)
          ) on conflict (event_key) do nothing;
        elsif v_current_security = 'pass' and v_previous_security in ('warn', 'fail') then
          insert into public.visibility_events (
            project_id, scan_run_id, event_key, event_type, severity, title, payload
          ) values (
            p_project_id,
            v_run_id,
            p_idempotency_key || ':security-recovered',
            'security.recovered',
            'positive',
            'Security header coverage recovered',
            jsonb_build_object('previousStatus', v_previous_security, 'status', v_current_security)
          ) on conflict (event_key) do nothing;
        end if;
      end if;
    end if;

    update public.projects
    set
      last_scan_at = coalesce(p_finished_at, now()),
      next_daily_scan_at = now() + interval '1 day',
      automation_locked_until = null,
      automation_lock_key = null,
      updated_at = now()
    where id = p_project_id
      and automation_lock_key = p_idempotency_key;

  elsif p_ok and p_job_type = 'weekly' then
    if p_result->>'version' <> '2' or p_result->>'mode' = 'health' then
      raise exception 'weekly_callback_requires_full_result';
    end if;

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
      scan_run_id,
      finding_key,
      category,
      status,
      priority,
      title,
      evidence,
      recommendation,
      payload
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
      project_id,
      action_key,
      lane,
      category,
      impact,
      confidence,
      effort,
      title,
      reason,
      evidence,
      action,
      status,
      first_observed_at,
      last_observed_at
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
        project_id,
        scan_run_id,
        event_key,
        event_type,
        severity,
        title,
        payload
      ) values (
        p_project_id,
        v_run_id,
        p_idempotency_key || ':weekly-baseline',
        'baseline.created',
        'info',
        'Weekly visibility baseline created',
        jsonb_build_object('score', v_score)
      ) on conflict (event_key) do nothing;
    elsif v_score is not null and v_previous_score is not null and abs(v_score - v_previous_score) >= 5 then
      insert into public.visibility_events (
        project_id,
        scan_run_id,
        event_key,
        event_type,
        severity,
        title,
        payload
      ) values (
        p_project_id,
        v_run_id,
        p_idempotency_key || ':score:' || v_score::text,
        'score.changed',
        case when v_score < v_previous_score then 'warning' else 'positive' end,
        case when v_score < v_previous_score then 'Visibility score decreased' else 'Visibility score improved' end,
        jsonb_build_object(
          'previousScore', v_previous_score,
          'score', v_score,
          'delta', v_score - v_previous_score
        )
      ) on conflict (event_key) do nothing;
    end if;

    if v_previous_result is not null then
      with current_findings as (
        select value as finding
        from jsonb_array_elements(coalesce(p_result->'findings', '[]'::jsonb))
      ),
      previous_findings as (
        select value as finding
        from jsonb_array_elements(coalesce(v_previous_result->'findings', '[]'::jsonb))
      ),
      transitions as (
        select
          cf.finding->>'id' as finding_id,
          cf.finding->>'title' as finding_title,
          cf.finding->>'status' as current_status,
          pf.finding->>'status' as previous_status,
          cf.finding as finding_payload
        from current_findings cf
        left join previous_findings pf
          on pf.finding->>'id' = cf.finding->>'id'
        where coalesce(cf.finding->>'id', '') <> ''
          and coalesce(cf.finding->>'status', '') <> coalesce(pf.finding->>'status', '')
          and (
            cf.finding->>'status' = 'fail'
            or (cf.finding->>'status' = 'pass' and pf.finding->>'status' in ('warn', 'fail'))
          )
      )
      insert into public.visibility_events (
        project_id,
        scan_run_id,
        event_key,
        event_type,
        severity,
        title,
        payload
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
      on conflict (event_key) do nothing;
    end if;

    update public.projects
    set
      last_scan_at = coalesce(p_finished_at, now()),
      last_score = coalesce(v_score, last_score),
      next_weekly_scan_at = now() + interval '7 days',
      automation_locked_until = null,
      automation_lock_key = null,
      updated_at = now()
    where id = p_project_id
      and automation_lock_key = p_idempotency_key;

  else
    insert into public.visibility_events (
      project_id,
      scan_run_id,
      event_key,
      event_type,
      severity,
      title,
      payload
    ) values (
      p_project_id,
      v_run_id,
      p_idempotency_key || ':failed',
      'scan.failed',
      'warning',
      'Scheduled visibility scan failed',
      jsonb_build_object(
        'jobType', p_job_type,
        'error', left(coalesce(p_error, 'scan_failed'), 500)
      )
    ) on conflict (event_key) do nothing;

    update public.projects
    set
      next_daily_scan_at = case
        when p_job_type = 'daily' then now() + interval '6 hours'
        else next_daily_scan_at
      end,
      next_weekly_scan_at = case
        when p_job_type = 'weekly' then now() + interval '12 hours'
        else next_weekly_scan_at
      end,
      automation_locked_until = null,
      automation_lock_key = null,
      updated_at = now()
    where id = p_project_id
      and automation_lock_key = p_idempotency_key;
  end if;

  select count(*)::integer
    into v_event_count
  from public.visibility_events ve
  where ve.scan_run_id = v_run_id;

  return jsonb_build_object(
    'duplicate', false,
    'runId', v_run_id,
    'eventCount', v_event_count,
    'notificationCount', 0
  );
end;
$$;

revoke all on function public.visibilityos_record_automation_callback(uuid, text, text, boolean, jsonb, text, timestamptz) from public, anon, authenticated;
grant execute on function public.visibilityos_record_automation_callback(uuid, text, text, boolean, jsonb, text, timestamptz) to service_role;
