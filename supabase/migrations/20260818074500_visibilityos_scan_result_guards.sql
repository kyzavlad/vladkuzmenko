alter table public.scan_runs
  drop constraint if exists scan_runs_monitoring_result_shape;

alter table public.scan_runs
  add constraint scan_runs_monitoring_result_shape
  check (
    status = 'failed'
    or job_type not in ('daily', 'weekly')
    or (
      job_type = 'daily'
      and result is not null
      and result->>'mode' = 'health'
    )
    or (
      job_type = 'weekly'
      and result is not null
      and result->>'version' = '2'
      and coalesce(result->>'mode', '') <> 'health'
    )
  );
