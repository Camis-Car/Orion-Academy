/* Referências oficiais do Inep. Os enunciados permanecem nos PDFs oficiais
   exibidos pela página; o Orion não reproduz os cadernos. */
(() => {
  const regularDay1 = 'A A E D C C E A A C B A E B B E D A C D B A A D A D D E B B E B A A A D E A C A A A D B B D A B C B D D D A E D B E C E C B B E D E B D E E C B C C C B A C D C C A D E B D E C D D'.split(' ');
  const regularDay2 = 'D D B A C B D D D E C D A E D C C C E D B D D C B D D C A A E C E D D A C C B A E D C D * D A B C C A E D B B C C C A B C A C C B D * C C C B E E E D B B A C C D A C B A E B A E C'.split(' ');
  const pplDay1 = 'E E B E A D B D B C C C C A B C E D D C E B E B B D A E A A A E B A D A E C D A D E A E E D E D C D C B A E A C A A B E A C D E A B C E E E C D A A B C E E C B E A E D C D D B D B'.split(' ');
  const pplDay2 = ['D B D A C * D B E A A A D E C E C A C E A C C C D B E E B E C C A B E A D C C E D E A B D', 'C D B E A A E C B A D A B C C A E B D B B A D E D D B B C E A E B B A D C E E C A D A D E'].join(' ').split(' ');
  const sourcePage = 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos';
  const archive = [2020, 2021, 2022, 2023, 2024, 2025].map((year) => ({
    year,
    url: `${sourcePage}/${year}`,
    detail: year === 2020
      ? 'Aplicação regular, digital e reaplicação/PPL. Sessões interativas abaixo.'
      : 'Cadernos e gabaritos da aplicação regular e das demais aplicações publicadas pelo Inep.'
  }));
  const official = 'https://download.inep.gov.br/enem/provas_e_gabaritos/';
  const makeSession = ({ id, label, application, day, area, firstQuestion, answers, paper, key, language }) => ({ id, label, application, day, area, firstQuestion, answers, language: language || null, paperUrl: `${official}${paper}`, keyUrl: `${official}${key}`, sourcePage });
  const sessions = [
    makeSession({ id: 'regular-linguagens', label: 'Linguagens', application: 'ENEM 2020 · Aplicação regular', day: '1º dia · Caderno 1 Azul', area: 'Linguagens, Códigos e suas Tecnologias', firstQuestion: 1, answers: regularDay1.slice(0, 45), paper: '2020_PV_impresso_D1_CD1.pdf', key: '2020_GB_impresso_D1_CD1.pdf', language: 'Inglês nas questões 1 a 5' }),
    makeSession({ id: 'regular-humanas', label: 'Ciências Humanas', application: 'ENEM 2020 · Aplicação regular', day: '1º dia · Caderno 1 Azul', area: 'Ciências Humanas e suas Tecnologias', firstQuestion: 46, answers: regularDay1.slice(45, 90), paper: '2020_PV_impresso_D1_CD1.pdf', key: '2020_GB_impresso_D1_CD1.pdf' }),
    makeSession({ id: 'regular-natureza', label: 'Ciências da Natureza', application: 'ENEM 2020 · Aplicação regular', day: '2º dia · Caderno 7 Azul', area: 'Ciências da Natureza e suas Tecnologias', firstQuestion: 91, answers: regularDay2.slice(0, 45), paper: '2020_PV_impresso_D2_CD7.pdf', key: '2020_GB_impresso_D2_CD7.pdf' }),
    makeSession({ id: 'regular-matematica', label: 'Matemática', application: 'ENEM 2020 · Aplicação regular', day: '2º dia · Caderno 7 Azul', area: 'Matemática e suas Tecnologias', firstQuestion: 136, answers: regularDay2.slice(45, 90), paper: '2020_PV_impresso_D2_CD7.pdf', key: '2020_GB_impresso_D2_CD7.pdf' }),
    makeSession({ id: 'ppl-linguagens', label: 'Linguagens', application: 'ENEM 2020 · Reaplicação/PPL', day: '1º dia · Caderno 1 Azul', area: 'Linguagens, Códigos e suas Tecnologias', firstQuestion: 1, answers: pplDay1.slice(0, 45), paper: '2020_PV_reaplicacao_PPL_D1_CD1.pdf', key: '2020_GB_reaplicacao_PPL_D1_CD1.pdf', language: 'Inglês nas questões 1 a 5' }),
    makeSession({ id: 'ppl-humanas', label: 'Ciências Humanas', application: 'ENEM 2020 · Reaplicação/PPL', day: '1º dia · Caderno 1 Azul', area: 'Ciências Humanas e suas Tecnologias', firstQuestion: 46, answers: pplDay1.slice(45, 90), paper: '2020_PV_reaplicacao_PPL_D1_CD1.pdf', key: '2020_GB_reaplicacao_PPL_D1_CD1.pdf' }),
    makeSession({ id: 'ppl-natureza', label: 'Ciências da Natureza', application: 'ENEM 2020 · Reaplicação/PPL', day: '2º dia · Caderno 7 Azul', area: 'Ciências da Natureza e suas Tecnologias', firstQuestion: 91, answers: pplDay2.slice(0, 45), paper: '2020_PV_reaplicacao_PPL_D2_CD7.pdf', key: '2020_GB_reaplicacao_PPL_D2_CD7.pdf' }),
    makeSession({ id: 'ppl-matematica', label: 'Matemática', application: 'ENEM 2020 · Reaplicação/PPL', day: '2º dia · Caderno 7 Azul', area: 'Matemática e suas Tecnologias', firstQuestion: 136, answers: pplDay2.slice(45, 90), paper: '2020_PV_reaplicacao_PPL_D2_CD7.pdf', key: '2020_GB_reaplicacao_PPL_D2_CD7.pdf' })
  ];
  if (sessions.some((session) => session.answers.length !== 45)) throw new Error('Uma sessão oficial precisa ter 45 respostas.');
  window.AQUILES_ENEM_OFICIAL = { sessions, sourcePage, archive };
})();
