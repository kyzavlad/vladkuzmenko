create index if not exists visibilityos_workspace_members_user_idx
  on public.visibilityos_workspace_members(user_id);
create index if not exists visibilityos_workspaces_owner_idx
  on public.visibilityos_workspaces(owner_id);
create index if not exists visibilityos_events_scan_run_idx
  on public.visibilityos_events(scan_run_id);

create or replace function public.visibilityos_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

revoke all on function public.visibilityos_touch_updated_at() from public, anon, authenticated;
revoke all on function public.visibilityos_add_workspace_owner() from public, anon, authenticated;

drop policy if exists visibilityos_profiles_self on public.visibilityos_profiles;
create policy visibilityos_profiles_self on public.visibilityos_profiles
for all to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

drop policy if exists visibilityos_workspaces_insert_owner on public.visibilityos_workspaces;
create policy visibilityos_workspaces_insert_owner on public.visibilityos_workspaces
for insert to authenticated
with check (owner_id = (select auth.uid()));

drop policy if exists visibilityos_workspace_members_manage_admin on public.visibilityos_workspace_members;
drop policy if exists visibilityos_workspace_members_insert_admin on public.visibilityos_workspace_members;
drop policy if exists visibilityos_workspace_members_update_admin on public.visibilityos_workspace_members;
drop policy if exists visibilityos_workspace_members_delete_admin on public.visibilityos_workspace_members;
create policy visibilityos_workspace_members_insert_admin on public.visibilityos_workspace_members
for insert to authenticated
with check (public.visibilityos_is_workspace_admin(workspace_id));
create policy visibilityos_workspace_members_update_admin on public.visibilityos_workspace_members
for update to authenticated
using (public.visibilityos_is_workspace_admin(workspace_id))
with check (public.visibilityos_is_workspace_admin(workspace_id));
create policy visibilityos_workspace_members_delete_admin on public.visibilityos_workspace_members
for delete to authenticated
using (public.visibilityos_is_workspace_admin(workspace_id));

drop policy if exists visibilityos_runtime_config_service_role on public.visibilityos_runtime_config;
create policy visibilityos_runtime_config_service_role on public.visibilityos_runtime_config
for all to service_role using (true) with check (true);
