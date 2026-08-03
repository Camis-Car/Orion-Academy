-- Projeto Aquiles — execute uma única vez no SQL Editor do Supabase.
-- O e-mail e a autenticação ficam em auth.users; esta tabela guarda somente o perfil necessário.

create table if not exists public.perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null check (char_length(trim(nome)) between 2 and 80),
  faixa_etaria text not null check (faixa_etaria in ('Até 12 anos','13 a 15 anos','16 a 17 anos','18 anos ou mais')),
  etapa_escolar text not null check (char_length(trim(etapa_escolar)) between 2 and 100),
  uf char(2),
  cidade text check (cidade is null or char_length(cidade) <= 100),
  consentimento_responsavel boolean not null default false,
  versao_privacidade text not null default '2026-08-01',
  consentiu_em timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (faixa_etaria <> 'Até 12 anos' or consentimento_responsavel = true)
);

alter table public.perfis enable row level security;

create policy "Cada estudante lê o próprio perfil"
on public.perfis for select to authenticated
using (auth.uid() = id);

create policy "Cada estudante cria o próprio perfil"
on public.perfis for insert to authenticated
with check (auth.uid() = id);

create policy "Cada estudante atualiza o próprio perfil"
on public.perfis for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Cada estudante exclui o próprio perfil"
on public.perfis for delete to authenticated
using (auth.uid() = id);

create or replace function public.atualizar_updated_at()
returns trigger language plpgsql security invoker as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger perfis_updated_at
before update on public.perfis
for each row execute function public.atualizar_updated_at();

-- Até três escolhas de carreira e instituição por estudante.
create table if not exists public.escolhas_candidatura (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfis(id) on delete cascade,
  ordem smallint not null check (ordem between 1 and 3),
  curso text not null check (char_length(trim(curso)) between 2 and 160),
  oferta_id text,
  instituicao text not null check (char_length(trim(instituicao)) between 2 and 180),
  sigla text,
  campus text,
  cidade text,
  uf char(2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (perfil_id, ordem)
);

alter table public.escolhas_candidatura enable row level security;

create policy "Cada estudante lê as próprias escolhas"
on public.escolhas_candidatura for select to authenticated
using (auth.uid() = perfil_id);

create policy "Cada estudante cria as próprias escolhas"
on public.escolhas_candidatura for insert to authenticated
with check (auth.uid() = perfil_id);

create policy "Cada estudante atualiza as próprias escolhas"
on public.escolhas_candidatura for update to authenticated
using (auth.uid() = perfil_id)
with check (auth.uid() = perfil_id);

create policy "Cada estudante exclui as próprias escolhas"
on public.escolhas_candidatura for delete to authenticated
using (auth.uid() = perfil_id);

create trigger escolhas_candidatura_updated_at
before update on public.escolhas_candidatura
for each row execute function public.atualizar_updated_at();
