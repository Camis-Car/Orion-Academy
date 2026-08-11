/* Cadernos e gabaritos oficiais do Inep. Os quatro cadernos azuis do ENEM
   2022 foram preservados no projeto para abrir com mais estabilidade no celular. */
(() => {
  const regularDay1 = 'D C B D E E A A A C A B B D B E B A C C B E E E C C B B D C A A A D C C A B E D B D E C E D E A B E E D A E B A A E C B E C B A B C D D A A A D B C E D A E A C D B B C D C B E C A'.split(' ');
  const regularDay2 = 'A D B A D A B E A B C E E E A C C B D D A D D C B B C C A E B A E B E B E A C C C D D D E E C D A B E B D C E E C D B D C C C C B C * C B A A C D B A A A C E B A B D D E D A E B E'.split(' ');
  const pplDay1 = 'A C B A A B D B A A D A B C C D C E E C B B A C D C A D D A A C A B A B E B E C B A E E A A D B A B E D B E A C B B C B D A A D B D C C C A B B A B B D E D A B C E C A C C C C E A'.split(' ');
  const pplDay2 = 'B D B E D E A C B A E C D C A B A B D A C E D D E A E B D C C C D B B B B C A D C A D A A B D C D B D E C B D D C B A C B A D B D D C C E A D C B E D B A C D E C A C B D B A B D E'.split(' ');
  const sourcePage = 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos';
  const archive = [2020, 2021, 2022, 2023, 2024, 2025].map((year) => ({
    year,
    url: `${sourcePage}/${year}`,
    detail: year === 2022
      ? 'Aplicação regular, digital e reaplicação/PPL. Sessões interativas abaixo.'
      : 'Cadernos e gabaritos da aplicação regular e das demais aplicações publicadas pelo Inep.'
  }));
  const official = 'https://download.inep.gov.br/enem/provas_e_gabaritos/';
  const material = 'materiais/enem-2022/';
  const makeSession = ({ id, label, application, day, area, firstQuestion, answers, paper, key, language }) => ({ id, label, application, day, area, firstQuestion, answers, language: language || null, paperUrl: `${material}${paper}`, keyUrl: `${official}${key}`, sourcePage });
  const sessions = [
    makeSession({ id: 'regular-linguagens', label: 'Linguagens', application: 'ENEM 2022 · Aplicação regular', day: '1º dia · Caderno 1 Azul', area: 'Linguagens, Códigos e suas Tecnologias', firstQuestion: 1, answers: regularDay1.slice(0, 45), paper: 'enem-2022-regular-dia-1-azul.pdf', key: '2022_GB_impresso_D1_CD1.pdf', language: 'Inglês nas questões 1 a 5' }),
    makeSession({ id: 'regular-humanas', label: 'Ciências Humanas', application: 'ENEM 2022 · Aplicação regular', day: '1º dia · Caderno 1 Azul', area: 'Ciências Humanas e suas Tecnologias', firstQuestion: 46, answers: regularDay1.slice(45, 90), paper: 'enem-2022-regular-dia-1-azul.pdf', key: '2022_GB_impresso_D1_CD1.pdf' }),
    makeSession({ id: 'regular-natureza', label: 'Ciências da Natureza', application: 'ENEM 2022 · Aplicação regular', day: '2º dia · Caderno 7 Azul', area: 'Ciências da Natureza e suas Tecnologias', firstQuestion: 91, answers: regularDay2.slice(0, 45), paper: 'enem-2022-regular-dia-2-azul.pdf', key: '2022_GB_impresso_D2_CD7.pdf' }),
    makeSession({ id: 'regular-matematica', label: 'Matemática', application: 'ENEM 2022 · Aplicação regular', day: '2º dia · Caderno 7 Azul', area: 'Matemática e suas Tecnologias', firstQuestion: 136, answers: regularDay2.slice(45, 90), paper: 'enem-2022-regular-dia-2-azul.pdf', key: '2022_GB_impresso_D2_CD7.pdf' }),
    makeSession({ id: 'ppl-linguagens', label: 'Linguagens', application: 'ENEM 2022 · Reaplicação/PPL', day: '1º dia · Caderno 1 Azul', area: 'Linguagens, Códigos e suas Tecnologias', firstQuestion: 1, answers: pplDay1.slice(0, 45), paper: 'enem-2022-ppl-dia-1-azul.pdf', key: '2022_GB_reaplicacao_PPL_D1_CD1.pdf', language: 'Inglês nas questões 1 a 5' }),
    makeSession({ id: 'ppl-humanas', label: 'Ciências Humanas', application: 'ENEM 2022 · Reaplicação/PPL', day: '1º dia · Caderno 1 Azul', area: 'Ciências Humanas e suas Tecnologias', firstQuestion: 46, answers: pplDay1.slice(45, 90), paper: 'enem-2022-ppl-dia-1-azul.pdf', key: '2022_GB_reaplicacao_PPL_D1_CD1.pdf' }),
    makeSession({ id: 'ppl-natureza', label: 'Ciências da Natureza', application: 'ENEM 2022 · Reaplicação/PPL', day: '2º dia · Caderno 7 Azul', area: 'Ciências da Natureza e suas Tecnologias', firstQuestion: 91, answers: pplDay2.slice(0, 45), paper: 'enem-2022-ppl-dia-2-azul.pdf', key: '2022_GB_reaplicacao_PPL_D2_CD7.pdf' }),
    makeSession({ id: 'ppl-matematica', label: 'Matemática', application: 'ENEM 2022 · Reaplicação/PPL', day: '2º dia · Caderno 7 Azul', area: 'Matemática e suas Tecnologias', firstQuestion: 136, answers: pplDay2.slice(45, 90), paper: 'enem-2022-ppl-dia-2-azul.pdf', key: '2022_GB_reaplicacao_PPL_D2_CD7.pdf' })
  ];
  if (sessions.some((session) => session.answers.length !== 45)) throw new Error('Uma sessão oficial precisa ter 45 respostas.');
  window.AQUILES_ENEM_OFICIAL = { sessions, sourcePage, archive };
})();
