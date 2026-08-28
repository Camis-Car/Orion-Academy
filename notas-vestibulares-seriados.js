/* Referências numéricas publicadas para processos seriados.
   Cada valor conserva a escala e o critério da instituição de origem. */
window.NOTAS_VESTIBULARES_SERIADOS = {
  atualizadaEm: '27/08/2026',
  areas: ['Saúde', 'Tecnologia e Exatas', 'Humanas e Sociais', 'Licenciaturas'],
  processos: [
    { uf: 'AM', estado: 'Amazonas', nome: 'SIS/UEA', fonte: 'UEA — Sistema de Ingresso Seriado', url: 'https://proreitoria.uea.edu.br/proplan/?page_id=731' },
    { uf: 'AM', estado: 'Amazonas', nome: 'PSC/UFAM', fonte: 'UFAM — Processo Seletivo Contínuo', url: 'https://ufam.edu.br/noticias/7891-ufam-lanca-editais-das-etapas-1-2-e-3-do-processo-seletivo-continuo-psc.html' },
    { uf: 'DF', estado: 'Distrito Federal', nome: 'PAS/UnB', fonte: 'UnB — Programa de Avaliação Seriada', url: 'https://vempraunb.unb.br/pas/' },
    { uf: 'MG', estado: 'Minas Gerais', nome: 'PISM/UFJF', fonte: 'UFJF — PISM', url: 'https://www2.ufjf.br/copese/vestibular-pism-2/pism-2027/' },
    { uf: 'MG', estado: 'Minas Gerais', nome: 'Seriado UFMG', fonte: 'UFMG — Seriado', url: 'https://www.ufmg.br/seriadoufmg/o-ciclo-2/' },
    { uf: 'MG', estado: 'Minas Gerais', nome: 'PAS/UFLA', fonte: 'UFLA — Processo de Avaliação Seriada', url: 'https://ufla.br/processo-de-avaliacao-seriada/' },
    { uf: 'MG', estado: 'Minas Gerais', nome: 'SASI/UFVJM', fonte: 'UFVJM — SASI', url: 'https://portal.ufvjm.edu.br/a-universidade/formas-de-ingresso/sasi/2025' },
    { uf: 'PE', estado: 'Pernambuco', nome: 'SSA/UPE', fonte: 'UPE — Sistema Seriado de Avaliação', url: 'https://processodeingresso.upe.pe.gov.br/' },
    { uf: 'PR', estado: 'Paraná', nome: 'PAS/UEM', fonte: 'UEM — Processo de Avaliação Seriada', url: 'https://www.pas.uem.br/faq.html' },
    { uf: 'PR', estado: 'Paraná', nome: 'PSS/UEPG', fonte: 'UEPG — Processo Seletivo Seriado', url: 'https://www2.uepg.br/cps/pss-2026/' },
    { uf: 'PR', estado: 'Paraná', nome: 'Seriado Unioeste', fonte: 'Unioeste — Vestibular Seriado', url: 'https://www.unioeste.br/portal/vestibular/publicacoes-seriado' },
    { uf: 'RR', estado: 'Roraima', nome: 'PSS/UFRR', fonte: 'UFRR — Processo Seletivo Seriado', url: 'https://ufrr.br/noticias/ufrr-inicia-nesta-segunda-feira-27-as-inscricoes-para-o-vestibular-2027/' },
    { uf: 'RS', estado: 'Rio Grande do Sul', nome: 'PAVE/UFPel', fonte: 'UFPel — Programa de Avaliação da Vida Escolar', url: 'https://wp.ufpel.edu.br/pave/' },
    { uf: 'RS', estado: 'Rio Grande do Sul', nome: 'PSS/UFSM', fonte: 'UFSM — Processo Seletivo Seriado', url: 'https://nisa.ufsm.br/concursos' },
    { uf: 'SP', estado: 'São Paulo', nome: 'Provão Paulista', fonte: 'Provão Paulista Seriado', url: 'https://www.provaopaulistaseriado.sp.gov.br/' }
  ],
  referencias: [
    {
      uf: 'MG', processo: 'PISM/UFJF', area: 'Saúde', valor: '756,42', unidade: 'pontos',
      titulo: 'Média de referência das menores notas aprovadas',
      edicao: 'PISM 2026 · Módulo III · Triênio 2023–2025 · Grupo C',
      descricao: 'Cálculo da Orion Academy com as menores pontuações aprovadas do Grupo C em cursos selecionados da área.',
      cursos: 'Medicina (1.040,25), Farmácia (676,75), Fisioterapia (719,75), Nutrição (561,75), Odontologia (681,25) e Psicologia (858,75).',
      alerta: 'Não é média oficial nem previsão: a pontuação muda conforme curso, grupo, campus e edição.',
      fonte: 'UFJF — PISM 2026: pontuação máxima e mínima para aprovação',
      url: 'https://www2.ufjf.br/copese/wp-content/uploads/sites/42/2026/02/PISM-2026-M%C3%B3dulo-III-Pontua%C3%A7%C3%A3o-m%C3%A1xima-e-m%C3%ADnima.pdf'
    },
    {
      uf: 'MG', processo: 'PISM/UFJF', area: 'Tecnologia e Exatas', valor: '865,75', unidade: 'pontos',
      titulo: 'Média de referência das menores notas aprovadas',
      edicao: 'PISM 2026 · Módulo III · Triênio 2023–2025 · Grupo C',
      descricao: 'Cálculo da Orion Academy com as menores pontuações aprovadas do Grupo C em cursos selecionados da área.',
      cursos: 'Ciência da Computação (1.015,50), Engenharia Civil (719,00), Engenharia Computacional (1.033,25), Engenharia de Produção (746,75), Engenharia Elétrica – Robótica e Automação Industrial (945,25), Engenharia Mecânica (892,75) e Sistemas de Informação (707,75).',
      alerta: 'Não é média oficial nem previsão: a pontuação muda conforme curso, grupo, campus e edição.',
      fonte: 'UFJF — PISM 2026: pontuação máxima e mínima para aprovação',
      url: 'https://www2.ufjf.br/copese/wp-content/uploads/sites/42/2026/02/PISM-2026-M%C3%B3dulo-III-Pontua%C3%A7%C3%A3o-m%C3%A1xima-e-m%C3%ADnima.pdf'
    },
    {
      uf: 'MG', processo: 'PISM/UFJF', area: 'Humanas e Sociais', valor: '652,00', unidade: 'pontos',
      titulo: 'Média de referência das menores notas aprovadas',
      edicao: 'PISM 2026 · Módulo III · Triênio 2023–2025 · Grupo C',
      descricao: 'Cálculo da Orion Academy com as menores pontuações aprovadas do Grupo C em cursos selecionados da área.',
      cursos: 'Direito (890,00), História – bacharelado/licenciatura integral (718,75), Ciências Sociais – bacharelado (537,50), Pedagogia – licenciatura matutino (581,25), Serviço Social – matutino (605,25) e Ciências Econômicas – integral (579,25).',
      alerta: 'Não é média oficial nem previsão: a pontuação muda conforme curso, grupo, campus e edição.',
      fonte: 'UFJF — PISM 2026: pontuação máxima e mínima para aprovação',
      url: 'https://www2.ufjf.br/copese/wp-content/uploads/sites/42/2026/02/PISM-2026-M%C3%B3dulo-III-Pontua%C3%A7%C3%A3o-m%C3%A1xima-e-m%C3%ADnima.pdf'
    },
    {
      uf: 'MG', processo: 'PISM/UFJF', area: 'Licenciaturas', valor: '610,75', unidade: 'pontos',
      titulo: 'Média de referência das menores notas aprovadas',
      edicao: 'PISM 2026 · Módulo III · Triênio 2023–2025 · Grupo C',
      descricao: 'Cálculo da Orion Academy com as menores pontuações aprovadas do Grupo C em cursos selecionados da área.',
      cursos: 'Ciências Biológicas (715,75), Matemática (648,25), Física (619,50), Química (534,50), História (718,75), Letras (629,75), Pedagogia – matutino (581,25) e Geografia (438,25).',
      alerta: 'Não é média oficial nem previsão: a pontuação muda conforme curso, grupo, campus e edição.',
      fonte: 'UFJF — PISM 2026: pontuação máxima e mínima para aprovação',
      url: 'https://www2.ufjf.br/copese/wp-content/uploads/sites/42/2026/02/PISM-2026-M%C3%B3dulo-III-Pontua%C3%A7%C3%A3o-m%C3%A1xima-e-m%C3%ADnima.pdf'
    },
    {
      uf: 'SP', processo: 'Provão Paulista', area: 'Todas as áreas', valor: '22', unidade: 'acertos',
      titulo: 'Pontuação mínima de habilitação',
      edicao: 'Critério informado na página oficial do processo',
      descricao: 'A página do Provão Paulista informa o mínimo de 22 acertos para USP, Unesp e Unicamp.',
      cursos: '',
      alerta: 'Não é média nem nota de corte final: a classificação varia por curso, instituição e edital.',
      fonte: 'Provão Paulista Seriado — Perguntas frequentes',
      url: 'https://www.provaopaulistaseriado.sp.gov.br/'
    }
  ]
};
