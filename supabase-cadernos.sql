-- Orion Academy — Cadernos de anotações
-- Execute uma única vez no SQL Editor do Supabase.

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
