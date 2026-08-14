-- Orion Academy — execute uma única vez no SQL Editor do Supabase antes de publicar a atualização do cadastro.
-- Atualiza o perfil para guardar a modalidade de concorrência usada como referência nas comparações.

alter table public.perfis
  add column if not exists modalidade_cota text not null default 'AC';

alter table public.perfis
  drop constraint if exists perfis_modalidade_cota_check;

alter table public.perfis
  add constraint perfis_modalidade_cota_check
  check (modalidade_cota in ('AC', 'LI_EP', 'LI_PCD', 'LI_Q', 'LI_PPI', 'LB_EP', 'LB_PCD', 'LB_Q', 'LB_PPI', 'V1'));

-- Compatibiliza a tabela já criada com as idades que aparecem no cadastro atual.
alter table public.perfis
  drop constraint if exists perfis_faixa_etaria_check;

alter table public.perfis
  add constraint perfis_faixa_etaria_check
  check (faixa_etaria in (
    'Até 12 anos', '13 a 15 anos', '16 a 17 anos', '18 anos ou mais',
    '14 anos', '15 anos', '16 anos', '17 anos', '18 anos',
    '19 anos', '20 anos', '21 anos', '22 anos', '22 anos ou mais'
  ));
