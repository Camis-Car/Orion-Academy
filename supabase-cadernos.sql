-- Orion Academy — Cadernos de anotações
-- Execute uma única vez no SQL Editor do Supabase.

-- A função fica neste próprio arquivo para que os cadernos funcionem
-- mesmo se o esquema principal tiver sido executado em outro momento.
create or replace function public.atualizar_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.cadernos_estudo (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfis(id) on delete cascade,
  titulo text not null check (char_length(trim(titulo)) between 1 and 80),
  cor text not null default '#173a5e' check (cor in ('#173a5e','#29725a','#8a662b','#a54b45','#624b85')),
  paginas jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.cadernos_estudo enable row level security;

drop policy if exists "Cada estudante lê os próprios cadernos" on public.cadernos_estudo;
create policy "Cada estudante lê os próprios cadernos"
on public.cadernos_estudo for select to authenticated
using (auth.uid() = perfil_id);

drop policy if exists "Cada estudante cria os próprios cadernos" on public.cadernos_estudo;
create policy "Cada estudante cria os próprios cadernos"
on public.cadernos_estudo for insert to authenticated
with check (auth.uid() = perfil_id);

drop policy if exists "Cada estudante atualiza os próprios cadernos" on public.cadernos_estudo;
create policy "Cada estudante atualiza os próprios cadernos"
on public.cadernos_estudo for update to authenticated
using (auth.uid() = perfil_id)
with check (auth.uid() = perfil_id);

drop policy if exists "Cada estudante exclui os próprios cadernos" on public.cadernos_estudo;
create policy "Cada estudante exclui os próprios cadernos"
on public.cadernos_estudo for delete to authenticated
using (auth.uid() = perfil_id);

drop trigger if exists cadernos_estudo_updated_at on public.cadernos_estudo;
create trigger cadernos_estudo_updated_at
before update on public.cadernos_estudo
for each row execute function public.atualizar_updated_at();

-- Limite de produto: cada perfil pode guardar até 15 cadernos. A verificação
-- no banco impede ultrapassar o limite mesmo com duas abas abertas ao mesmo tempo.
create or replace function public.limitar_cadernos_por_perfil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  perform pg_advisory_xact_lock(hashtext(new.perfil_id::text));
  if (select count(*) from public.cadernos_estudo where perfil_id = new.perfil_id) >= 15 then
    raise exception 'Limite de 15 cadernos por perfil atingido.' using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists cadernos_estudo_limite_por_perfil on public.cadernos_estudo;
create trigger cadernos_estudo_limite_por_perfil
before insert on public.cadernos_estudo
for each row execute function public.limitar_cadernos_por_perfil();

-- Atualiza imediatamente o PostgREST/Supabase para que o site encontre a
-- nova tabela, sem depender do tempo de renovação automática do cache.
notify pgrst, 'reload schema';
