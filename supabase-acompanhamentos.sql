-- Orion Academy — execute este arquivo no SQL Editor do Supabase uma única vez.
-- Ele guarda acompanhamentos da Área do Estudante e os avisos internos publicados pela equipe.
-- Não armazena notas do ENEM, senhas, documentos ou dados de cotas além da modalidade escolhida.

create table if not exists public.acompanhamentos (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfis(id) on delete cascade,
  oferta_id text,
  curso text not null check (char_length(trim(curso)) between 2 and 160),
  uf char(2) not null,
  instituicao text not null check (char_length(trim(instituicao)) between 2 and 180),
  campus text not null default '',
  modalidade text not null default 'AC',
  modalidade_nome text,
  acompanhar_vagas boolean not null default true,
  acompanhar_editais boolean not null default true,
  acompanhar_chamadas boolean not null default true,
  acompanhar_calendario boolean not null default true,
  fonte text not null default 'Sisu / MEC',
  fonte_url text,
  ultima_revisao date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (perfil_id, curso, uf, instituicao, campus, modalidade)
);

alter table public.acompanhamentos enable row level security;

create policy "Cada estudante lê seus acompanhamentos"
on public.acompanhamentos for select to authenticated
using (auth.uid() = perfil_id);

create policy "Cada estudante cria seus acompanhamentos"
on public.acompanhamentos for insert to authenticated
with check (auth.uid() = perfil_id);

create policy "Cada estudante atualiza seus acompanhamentos"
on public.acompanhamentos for update to authenticated
using (auth.uid() = perfil_id)
with check (auth.uid() = perfil_id);

create policy "Cada estudante exclui seus acompanhamentos"
on public.acompanhamentos for delete to authenticated
using (auth.uid() = perfil_id);

create trigger acompanhamentos_updated_at
before update on public.acompanhamentos
for each row execute function public.atualizar_updated_at();

-- A equipe publica aqui mudanças confirmadas em fonte oficial. Os campos vazios
-- tornam o aviso nacional; os preenchidos permitem direcioná-lo a curso, UF,
-- instituição, campus ou modalidade específicos.
create table if not exists public.atualizacoes_publicadas (
  id uuid primary key default gen_random_uuid(),
  tipo text not null check (tipo in ('edital','vaga','chamada','calendario')),
  titulo text not null check (char_length(trim(titulo)) between 3 and 180),
  descricao text not null check (char_length(trim(descricao)) between 3 and 1200),
  oferta_id text,
  curso text,
  uf char(2),
  instituicao text,
  campus text,
  modalidade text,
  fonte text not null,
  fonte_url text,
  publicado_em timestamptz not null default now(),
  publicado boolean not null default true
);

alter table public.atualizacoes_publicadas enable row level security;

create policy "Estudantes leem avisos publicados"
on public.atualizacoes_publicadas for select to authenticated
using (publicado = true);

-- Não há política de escrita para visitantes: somente a equipe, usando o painel
-- administrativo ou uma rotina segura com service role, pode publicar avisos.

create table if not exists public.leituras_atualizacoes (
  id uuid primary key default gen_random_uuid(),
  perfil_id uuid not null references public.perfis(id) on delete cascade,
  atualizacao_id uuid not null references public.atualizacoes_publicadas(id) on delete cascade,
  lido_em timestamptz not null default now(),
  unique (perfil_id, atualizacao_id)
);

alter table public.leituras_atualizacoes enable row level security;

create policy "Cada estudante lê suas leituras"
on public.leituras_atualizacoes for select to authenticated
using (auth.uid() = perfil_id);

create policy "Cada estudante registra suas leituras"
on public.leituras_atualizacoes for insert to authenticated
with check (auth.uid() = perfil_id);

create policy "Cada estudante atualiza suas leituras"
on public.leituras_atualizacoes for update to authenticated
using (auth.uid() = perfil_id)
with check (auth.uid() = perfil_id);
