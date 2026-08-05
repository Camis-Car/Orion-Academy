-- Projeto Aquiles — área administrativa
-- Execute este arquivo uma única vez no SQL Editor do Supabase.
-- A regra abaixo permite usar a tabela de tarefas administrativas
-- somente quando a conta autenticada for camilaoc14@gmail.com.

create table if not exists public.tarefas_administrativas (
  id uuid primary key default gen_random_uuid(),
  texto text not null check (char_length(trim(texto)) between 1 and 180),
  concluida boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tarefas_administrativas enable row level security;

drop policy if exists "Somente administradora gerencia tarefas" on public.tarefas_administrativas;

create policy "Somente administradora gerencia tarefas"
on public.tarefas_administrativas
for all
to authenticated
using ((auth.jwt() ->> 'email') = 'camilaoc14@gmail.com')
with check ((auth.jwt() ->> 'email') = 'camilaoc14@gmail.com');

drop trigger if exists tarefas_administrativas_updated_at on public.tarefas_administrativas;

create trigger tarefas_administrativas_updated_at
before update on public.tarefas_administrativas
for each row execute function public.atualizar_updated_at();
