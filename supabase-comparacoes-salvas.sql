-- Orion Academy — execute no SQL Editor do Supabase para ativar os favoritos.
-- Não altera nem remove escolhas de candidatura já existentes.

create table if not exists public.comparacoes_salvas (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfis(id) on delete cascade,
  oferta_id text not null,
  curso text not null check (char_length(trim(curso)) between 2 and 160),
  instituicao text not null check (char_length(trim(instituicao)) between 2 and 180),
  sigla text,
  campus text,
  cidade text,
  uf char(2),
  modalidade text not null default 'AC',
  modalidade_nome text,
  nota_calculada numeric(6,2),
  nota_corte numeric(6,2),
  fonte text not null default 'Sisu / MEC',
  fonte_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (perfil_id, oferta_id, modalidade)
);

alter table public.comparacoes_salvas enable row level security;

create policy "Cada estudante lê as próprias comparações"
on public.comparacoes_salvas for select to authenticated
using (auth.uid() = perfil_id);

create policy "Cada estudante cria as próprias comparações"
on public.comparacoes_salvas for insert to authenticated
with check (auth.uid() = perfil_id);

create policy "Cada estudante atualiza as próprias comparações"
on public.comparacoes_salvas for update to authenticated
using (auth.uid() = perfil_id)
with check (auth.uid() = perfil_id);

create policy "Cada estudante exclui as próprias comparações"
on public.comparacoes_salvas for delete to authenticated
using (auth.uid() = perfil_id);

create or replace function public.atualizar_updated_at()
returns trigger language plpgsql security invoker as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger comparacoes_salvas_updated_at
before update on public.comparacoes_salvas
for each row execute function public.atualizar_updated_at();
