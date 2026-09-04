(() => {
  const entries = [
    ['alimentacao-e-estudos.html', 'Alimentação e estudos', 'Informações sobre hábitos e rotina de estudo'],
    ['index.html?public=1', 'Home', 'Informações e ferramentas para estudantes'],
    ['busca.html', 'Buscar informações', 'Pesquise cursos, faculdades e processos'],
    ['cadastro.html', 'Criar cadastro', 'Reúna consultas e informações salvas'],
    ['minha-jornada.html', 'Área do estudante', 'Consultas, referências e escolhas salvas'],
    ['carreiras.html', 'Profissões e faculdades', 'Cursos, instituições públicas e ofertas por estado'],
    ['carreiras-militares.html', 'Carreiras militares', 'Editais, critérios e formas de ingresso'],
    ['comparar-faculdades.html', 'Comparar faculdades', 'Compare ofertas, campus e vagas'],
    ['plano-sisu.html', 'Vagas e Sisu', 'Vagas e modalidades do Sisu'],
    ['comparar-notas.html', 'Comparar notas', 'Cálculos e referências do Sisu'],
    ['listas-espera-rj.html', 'Listas de espera', 'Chamadas e processos de ingresso'],
    ['calendario-vestibulando.html', 'Calendário do Vestibulando', 'Datas, provas e segundas fases'],
    ['vestibulares-seriados.html', 'Vestibulares seriados', 'Processos em etapas e fontes oficiais'],
    ['plano-estudos.html', 'Plano de estudos', 'Prioridades e organização da rotina'],
    ['cronometro-estudos.html', 'Cronômetro e Countdown ENEM', 'Foco de estudo e contagem para os dias de prova'],
    ['painel-bolsas.html', 'Bolsas e apoios', 'Informações sobre bolsas e apoios'],
    ['estude-no-exterior.html', 'Estude no Exterior', 'Guias, processos e fontes oficiais'],
    ['entenda-escolhas.html', 'Entenda antes de escolher', 'Cotas, notas, campus e lista de espera'],
    ['favoritos.html', 'Favoritos e comparações', 'Cursos, faculdades e comparações salvas'],
    ['como-usamos-informacoes.html', 'Como usamos as informações', 'Critérios, fontes e limites do hub'],
    ['equipe-editorial.html', 'Equipe editorial e metodologia', 'Como revisamos fontes e corrigimos informações'],
    ['status-fontes.html', 'Status das fontes', 'Verificação técnica e pendências de fontes oficiais'],
    ['impacto-projeto-aquiles.html', 'Impacto do Projeto Aquiles', 'Problema, método, evidências e limites do projeto'],
    ['acessibilidade-orion.html', 'Acessibilidade', 'Como tornar a Orion utilizável por mais estudantes'],
    ['privacidade.html', 'Privacidade e seus dados', 'Como protegemos suas informações']
  ].sort((first, second) => {
    const priority = { Home: 0, 'Buscar informações': .5, 'Vagas e Sisu': 1, 'Área do estudante': 2, 'Criar cadastro': 3, 'Impacto do Projeto Aquiles': 96, 'Como usamos as informações': 97, 'Equipe editorial e metodologia': 98, Acessibilidade: 99, 'Privacidade e seus dados': 100 };
    const firstPriority = priority[first[1]] ?? 4;
    const secondPriority = priority[second[1]] ?? 4;
    if (firstPriority !== secondPriority) return firstPriority - secondPriority;
    return first[1].localeCompare(second[1], 'pt-BR', { sensitivity: 'base' });
  });
  const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  const themeStorageKey = 'orion-theme';
  const enablePrivacyMetrics = () => {
    if (location.protocol !== 'https:' || navigator.doNotTrack === '1' || window.gtag) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', 'G-NKRC7R3XJ5', { allow_google_signals: false, allow_ad_personalization_signals: false });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=G-NKRC7R3XJ5';
    document.head.append(tag);
  };
  enablePrivacyMetrics();
  const metric = (name, parameters = {}) => {
    if (navigator.doNotTrack === '1' || !window.gtag) return;
    window.gtag('event', name, parameters);
  };
  window.orionMetric = metric;
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="http"]');
    if (!link) return;
    try { metric('official_source_open', { link_host: new URL(link.href).hostname }); } catch {}
  });
  const dataPageProfiles = {
    'faculdades-publicas.html': {
      title: 'Instituições públicas',
      description: 'Consulte instituições por estado, cidade e administração. A existência de uma instituição não confirma oferta de curso, vaga ou forma de ingresso.',
      source: 'Cadastro e-MEC e Censo da Educação Superior',
      url: 'https://emec.mec.gov.br/emec/nova-index/',
      button: 'Consultar e-MEC ↗',
      how: '.filters',
      data: '.list'
    },
    'carreiras.html': {
      title: 'Profissões e faculdades públicas',
      description: 'Os resumos apresentam áreas de estudo; o filtro integrado localiza ofertas por curso, estado e instituição. Confirme campus, turno, vagas e edital antes de se inscrever.',
      source: 'Portal Único de Acesso ao Ensino Superior · Sisu',
      url: 'https://sisu.mec.gov.br/',
      button: 'Consultar ofertas no Sisu ↗',
      how: '.controls',
      data: '#careerContent'
    },
    'alimentacao-e-estudos.html': {
      title: 'Alimentação, hidratação e estudos',
      description: 'Esta página reúne referências de saúde pública e pesquisa do projeto. Resultados da pesquisa própria devem ser interpretados como percepção dos participantes, não como diagnóstico.',
      source: 'Ministério da Saúde · Guia Alimentar para a População Brasileira',
      url: 'https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf',
      button: 'Abrir Guia Alimentar ↗',
      how: '.hero',
      data: 'main'
    },
    'questoes-enem.html': {
      title: 'Questões oficiais do ENEM',
      description: 'Os cadernos, gabaritos e anulações usados nas sessões devem ser confirmados diretamente na publicação oficial do Inep. As respostas ficam somente neste navegador.',
      source: 'Inep · Provas e gabaritos do ENEM',
      url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos',
      button: 'Abrir provas do Inep ↗',
      how: '.archive',
      data: '#practice'
    },
    'guia-enem.html': {
      title: 'Guia de estudos do ENEM',
      description: 'O guia organiza a matriz e provas anteriores para estudo. A edição vigente, o cronograma e as regras de aplicação devem sempre ser confirmados no Inep.',
      source: 'Inep · ENEM',
      url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem',
      button: 'Consultar Inep ↗',
      how: '.intro',
      data: 'main'
    },
    'cronometro-estudos.html': {
      title: 'Cronômetro e Countdown ENEM',
      description: 'O cronômetro é uma ferramenta local de organização. A contagem do Enem é apenas um lembrete: confirme datas, horários e local de prova no cronograma oficial.',
      source: 'Inep · Cronograma do ENEM',
      url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/orientacoes/cronograma',
      button: 'Ver cronograma oficial ↗',
      how: '.focus-layout',
      data: '.constellation-card'
    },
    'estude-no-exterior.html': {
      title: 'Estude no exterior',
      description: 'Os caminhos de inscrição, bolsas e vistos variam por país, instituição e edição. Use os resumos para se orientar e confirme cada requisito na fonte responsável.',
      source: 'EducationUSA e portais oficiais de admissão e visto',
      url: 'https://educationusa.state.gov/',
      button: 'Abrir EducationUSA ↗',
      how: '.quick',
      data: 'main'
    },
    'entenda-escolhas.html': {
      title: 'Termos de ingresso',
      description: 'Cotas, notas de corte, pesos e listas de espera mudam conforme processo e instituição. As definições ajudam na leitura, mas a regra aplicável é sempre a do edital.',
      source: 'Portal Único de Acesso ao Ensino Superior · MEC',
      url: 'https://acessounico.mec.gov.br/sisu',
      button: 'Abrir Portal Único ↗',
      how: '.hero',
      data: 'main'
    },
    'plano-sisu.html': {
      title: 'Vagas e modalidades do Sisu',
      description: 'Consulte ofertas da chamada regular, vagas e modalidades. A consulta serve para pesquisa e não substitui a inscrição ou a classificação oficial.',
      source: 'Portal Único de Acesso ao Ensino Superior · Sisu',
      url: 'https://sisu.mec.gov.br/',
      button: 'Abrir Sisu oficial ↗',
      how: '.planner',
      data: '#results'
    },
    'comparar-notas.html': {
      title: 'Referências de nota e pesos',
      description: 'A comparação usa somente registros e pesos disponíveis na base. Ela é uma referência de estudo e nunca uma previsão de aprovação.',
      source: 'Portal Único de Acesso ao Ensino Superior · Sisu',
      url: 'https://sisu.mec.gov.br/vagas',
      button: 'Consultar Sisu ↗',
      how: '.layout',
      data: '#results'
    },
    'comparar-faculdades.html': {
      title: 'Comparação de faculdades',
      description: 'Compare informações da chamada regular do Sisu. Outros cursos, campi e formas de ingresso podem existir fora dessa seleção.',
      source: 'Portal Único de Acesso ao Ensino Superior · Sisu',
      url: 'https://sisu.mec.gov.br/',
      button: 'Abrir Sisu oficial ↗',
      how: '.selector',
      data: '#results'
    },
    'vestibulares-seriados.html': {
      title: 'Vestibulares seriados',
      description: 'Cada processo possui regras, etapas, escalas de nota e vagas próprias. Os cartões da página levam à instituição responsável por cada processo.',
      source: 'Páginas e editais das instituições responsáveis',
      url: '#programs-title',
      button: 'Ver fontes por processo ↓',
      how: '.intro',
      data: '#serial-reference-title'
    },
    'calendario-vestibulando.html': {
      title: 'Calendário do vestibulando',
      description: 'Use as datas para se organizar. Inscrições, provas e chamadas só devem ser consideradas definitivas depois da confirmação no edital correspondente.',
      source: 'Organizadoras e instituições responsáveis',
      url: '#datesTitle',
      button: 'Ver fontes no calendário ↓',
      how: '.tools',
      data: '#timeline'
    },
    'listas-espera-rj.html': {
      title: 'Listas de espera e chamadas',
      description: 'As chamadas variam por instituição, curso e modalidade. A presença em uma lista não garante vaga, matrícula ou validação de documentos.',
      source: 'Canais de ingresso das instituições',
      url: '#orion-page-data',
      button: 'Ver canais oficiais ↓',
      how: '.heading',
      data: '.grid'
    },
    'painel-bolsas.html': {
      title: 'Bolsas e apoios',
      description: 'Bolsas, financiamentos e apoios têm critérios próprios e podem mudar a cada edição. Use esta página para localizar os canais de confirmação.',
      source: 'Portal Único de Acesso ao Ensino Superior · MEC',
      url: 'https://acessounico.mec.gov.br/',
      button: 'Abrir Acesso Único ↗',
      how: '.selector',
      data: '#routeCards'
    },
    'carreiras-militares.html': {
      title: 'Carreiras militares',
      description: 'Idade, vagas, etapas, requisitos físicos e critérios de seleção são definidos por edital e podem mudar a cada processo.',
      source: 'Portais oficiais de ingresso das Forças Armadas',
      url: 'https://www.gov.br/defesa/pt-br/assuntos/forcas-armadas',
      button: 'Consultar portais oficiais ↗',
      how: '.intro',
      data: '.grid'
    }
  };

  const readTheme = () => {
    try {
      return localStorage.getItem(themeStorageKey) === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  };

  const updateThemeControls = (theme) => {
    const dark = theme === 'dark';
    document.querySelectorAll('.orion-theme-toggle').forEach((button) => {
      button.setAttribute('aria-pressed', String(dark));
      button.innerHTML = dark
        ? '<span aria-hidden="true">☀</span><span>Modo claro</span>'
        : '<span aria-hidden="true">☾</span><span>Modo escuro</span>';
    });
  };

  const applyTheme = (theme, save = false) => {
    const dark = theme === 'dark';
    document.documentElement.dataset.orionTheme = dark ? 'dark' : 'light';
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = dark ? '#081526' : '#0d1d35';
    if (save) {
      try {
        localStorage.setItem(themeStorageKey, dark ? 'dark' : 'light');
      } catch {}
    }
    updateThemeControls(dark ? 'dark' : 'light');
  };

  const injectThemeStyles = () => {
    if (document.getElementById('orionThemeStyles')) return;
    const style = document.createElement('style');
    style.id = 'orionThemeStyles';
    style.textContent = [
      'html[data-orion-theme="dark"]{color-scheme:dark;}',
      'html[data-orion-theme="dark"] body{background:#081526!important;color:#0d1d35!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"]){background:#fbfcff!important;border-color:#d7e0ea!important;color:#0d1d35!important;}',
      'html[data-orion-theme="dark"] :is(.hero,.cta,.constellation-card,footer,.aq-menu-panel){color:#f7f9fd!important;}',
      'html[data-orion-theme="dark"] :is(.hero,.cta,.constellation-card,footer,.aq-menu-panel) :is(h1,h2,h3,h4,h5,h6,strong,b,.aq-menu-title){color:#f7f9fd!important;}',
      'html[data-orion-theme="dark"] :is(.hero,.cta,.constellation-card,footer,.aq-menu-panel) :is(p,li,td,label,small,.lead,.muted,.helper,.description,.subtitle,.notice,.source,.section-head p,.footer-text,.aq-menu-note){color:#c9d5e4!important;}',
      'html[data-orion-theme="dark"] :is(.hero,.cta,.constellation-card,footer,.aq-menu-panel) a:not(.button){color:#f0cc8a!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"]) :is(h1,h2,h3,h4,h5,h6,strong,b,th){color:#0d1d35!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"]) :is(p,li,td,label,small,.lead,.muted,.helper,.description,.subtitle,.notice,.source,.section-head p,.card>p,.subject p,.method p,.offer span,.university span){color:#38506c!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"]) a:not(.button){color:#173a5e!important;}',
      'html[data-orion-theme="dark"] :is(input,select,textarea){background:#0a182b!important;border-color:#39516e!important;color:#f5f8fc!important;}',
      'html[data-orion-theme="dark"] :is(input,textarea)::placeholder{color:#9dafc4!important;}',
      'html[data-orion-theme="dark"] :is(table,tr,td,th){border-color:#344b67!important;}',
      'html[data-orion-theme="dark"] :is(.aq-menu-panel,.pages-dropdown,.aq-menu-close){background:#10213a!important;color:#f6f8fb!important;border-color:#39516e!important;}',
      'html[data-orion-theme="dark"] :is(.aq-menu-links a:hover,.pages-dropdown a:hover){background:#1b3554!important;color:#ffe1a6!important;}',
      'html[data-orion-theme="dark"] :is(.button-light,.button-outline){background:#152a45!important;border-color:#d9ae63!important;color:#f6d69b!important;}',
      'html[data-orion-theme="dark"] :is(.result-track,.progress-track){background:#263b56!important;}',
      'html[data-orion-theme="dark"] .constellation-card{background:linear-gradient(135deg,#09182c,#123858)!important;border-color:#365778!important;}',
      'html[data-orion-theme="dark"] .constellation-card :is(h1,h2,h3,h4,h5,h6,strong,b){color:#f7f9fd!important;}',
      'html[data-orion-theme="dark"] .constellation-card :is(p,span,small){color:#d6e2ef!important;}',
      '/* Tema noturno Orion: contraste alto para estudo prolongado e projeção. */',
      'html[data-orion-theme="dark"] body{background:#06121f!important;color:#f7fbff!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"],[class*="answer"],[class*="option"]){background:#0b1d32!important;border-color:#2b4b6a!important;color:#f7fbff!important;box-shadow:none!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"],[class*="answer"],[class*="option"]) :is(h1,h2,h3,h4,h5,h6,strong,b,th){color:#ffffff!important;}',
      'html[data-orion-theme="dark"] :is(main>section:not(.hero),.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="field"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="form"],[class*="empty"],[class*="answer"],[class*="option"]) :is(p,li,td,label,small,.lead,.muted,.helper,.description,.subtitle,.notice,.source,.section-head p,.card>p,.subject p,.method p,.offer span,.university span){color:#c8d5e3!important;}',
      'html[data-orion-theme="dark"] :is(a:not(.button),.eyebrow,.aq-menu-index,.tag,.pill,.badge){color:#f1c77e!important;}',
      'html[data-orion-theme="dark"] :is(input,select,textarea){background:#071728!important;border-color:#426486!important;color:#ffffff!important;}',
      'html[data-orion-theme="dark"] :is(input,textarea)::placeholder{color:#aebfd0!important;}',
      'html[data-orion-theme="dark"] :is(table,tr,td,th){background:#0b1d32!important;border-color:#2b4b6a!important;color:#f7fbff!important;}',
      'html[data-orion-theme="dark"] :is(.aq-menu-panel,.pages-dropdown,.aq-menu-close){background:#0b1d32!important;color:#ffffff!important;border-color:#365a7d!important;}',
      'html[data-orion-theme="dark"] :is(.aq-menu-links a:hover,.pages-dropdown a:hover){background:#163655!important;color:#ffe0a3!important;}',
      'html[data-orion-theme="dark"] :is(button,.button){background:#163655!important;border-color:#4c6f91!important;color:#ffffff!important;}',
      'html[data-orion-theme="dark"] :is(.button-dark,.button.primary,.primary,.primary-button,.submit-button,button[type="submit"]){background:#d9ae63!important;border-color:#eccb90!important;color:#071728!important;}',
      'html[data-orion-theme="dark"] :is(.button-light,.button-outline){background:#102944!important;border-color:#d9ae63!important;color:#f6d69b!important;}',
      'html[data-orion-theme="dark"] :is(.result-track,.progress-track,.spotify-progress-line){background:#294866!important;}',
      'html[data-orion-theme="dark"] :is(.progress-fill,.spotify-progress-line span){background:#d9ae63!important;}',
      'html[data-orion-theme="dark"] .constellation-card{background:linear-gradient(135deg,#071728,#102f4c)!important;border-color:#416889!important;}',
      'html[data-orion-theme="dark"] main :is(h1,h2,h3,h4,h5,h6,strong,b){color:#ffffff!important;}',
      'html[data-orion-theme="dark"] main :is(p,li,td,label,small,span){color:#d6e2ee!important;}',
      'html[data-orion-theme="dark"] main :is(.eyebrow,.tag,.pill,.badge,.highlight){color:#f1c77e!important;}',
      'html[data-orion-theme="dark"] main :is(.stat,.time-now,.session,.spotify-status,.spotify-track,.classical-tip,.pomodoro-panel,.mode-choice,.quick,.timer-info,.timer-ring,.notice,.alert,.message,[class*="status"],[class*="session"],[class*="choice"],[class*="event"],[class*="day"]){background:#0b1d32!important;border-color:#2f5273!important;color:#f7fbff!important;}',
      'html[data-orion-theme="dark"] .timer-ring:before{background:#0b1d32!important;}',
      'html[data-orion-theme="dark"] .aq-menu-links a{color:#ffffff!important;}',
      'html[data-orion-theme="dark"] .aq-menu-links a small{color:#c8d5e3!important;}',
      'html[data-orion-theme="dark"] .aq-menu-links .aq-menu-index{color:#f1c77e!important;}',
      'html[data-orion-theme="dark"] main :is(div,article,section,aside,form,fieldset,details,summary){background:#0b1d32!important;border-color:#2f5273!important;}',
      'html[data-orion-theme="dark"] :is(.timer-ring){background:conic-gradient(#d9ae63 var(--value),#294866 0)!important;}',
      'html[data-orion-theme="dark"] :is(.progress-fill,.spotify-progress-line span,.result-fill){background:#d9ae63!important;}',
      'html[data-orion-theme="dark"] main :is(button,.button){color:#ffffff!important;}',
      'html[data-orion-theme="dark"] main a:not(.button){color:#f1c77e!important;}',
      'html[data-orion-theme="dark"] main :is(.button.primary,.button-dark,.primary,.primary-button,.submit,button[type="submit"]){color:#071728!important;background:#d9ae63!important;border-color:#eccb90!important;}',
      '.spotify-card{background:linear-gradient(135deg,#08251b,#0d3a29)!important;border-color:#36a864!important;color:#f7fff9!important;}',
      '.spotify-card :is(h2,h3,strong){color:#ffffff!important;}',
      '.spotify-card :is(p,span,small){color:#d8f5e3!important;}',
      '.spotify-card :is(.spotify-status,.spotify-track,.classical-tip){background:#0b3023!important;border-color:#3d9564!important;color:#f7fff9!important;}',
      '.spotify-card .spotify-art{background:#124631!important;border-color:#63d98e!important;color:#ffffff!important;}',
      '.spotify-card .spotify-button{background:#0b3023!important;border-color:#62c985!important;color:#f4fff7!important;}',
      '.spotify-card .spotify-button.primary,.spotify-card .spotify-progress-line span{background:#1db954!important;border-color:#1db954!important;color:#ffffff!important;}',
      '.spotify-card .spotify-progress-line{background:#174a35!important;}',
      '.spotify-card .classical-tip a,.spotify-card .eyebrow{color:#8ce8ad!important;}',
      '.timer-ring{background:conic-gradient(from 20deg,#f4d18e,#c68c32,#f4d18e)!important;}',
      '.study-now{display:grid;gap:5px;min-width:210px;padding:14px 16px;border:1px solid #c99a49;border-radius:5px;background:#fff8ea;color:#17243a;text-align:center;box-shadow:0 8px 18px rgba(8,21,38,.08);}',
      '.study-now-current{display:flex;align-items:baseline;justify-content:center;gap:6px;}',
      '.study-now-label{color:#715222!important;font-size:10px!important;font-weight:800!important;letter-spacing:.09em;text-transform:uppercase;}',
      '.study-now-time{color:#17243a!important;font-family:"Playfair Display",Georgia,serif;font-size:25px!important;font-weight:600!important;letter-spacing:.02em;line-height:1.05;}',
      '.study-now-date{color:#614924!important;font-size:11px!important;font-weight:700!important;}',
      'html[data-orion-theme="dark"] .study-now{background:#102b42!important;border-color:#d9ae63!important;box-shadow:none;}',
      'html[data-orion-theme="dark"] .study-now-label,html[data-orion-theme="dark"] .study-now-date{color:#f1c77e!important;}',
      'html[data-orion-theme="dark"] .study-now-time{color:#ffffff!important;}',
      '/* Camada final: tema noturno Orion, uniforme e legível em projetores. */',
      'html[data-orion-theme="dark"] body{background:#06111e!important;color:#f8fafc!important;}',
      'html[data-orion-theme="dark"] main :is(div,section,article,aside,form,fieldset,details,summary){background:transparent!important;border-color:#2a4c6d!important;}',
      'html[data-orion-theme="dark"] main :is(article,aside,form,fieldset,details,.page,.content,.quiz-layer,.result,.question-card,[class*="card"],[class*="panel"],[class*="tool"],[class*="subject"],[class*="university"],[class*="country"],[class*="step"],[class*="summary"],[class*="filter"],[class*="offer"],[class*="calendar"],[class*="guide"],[class*="route"],[class*="principle"],[class*="benefit"],[class*="career"],[class*="quote"],[class*="faq"],[class*="modal"],[class*="answer"],[class*="option"],[class*="status"],[class*="session"],[class*="choice"],[class*="event"],[class*="day"]){background:#0c2035!important;border-color:#315878!important;color:#f8fafc!important;box-shadow:0 10px 24px rgba(0,0,0,.16)!important;}',
      'html[data-orion-theme="dark"] main :is(h1,h2,h3,h4,h5,h6,strong,b,th){color:#ffffff!important;}',
      'html[data-orion-theme="dark"] main :is(p,li,td,label,small,span,.lead,.muted,.helper,.description,.subtitle,.notice,.source){color:#e2e5e9!important;}',
      'html[data-orion-theme="dark"] main :is(a:not(.button),.eyebrow,.tag,.pill,.badge,.highlight){color:#f2ce8e!important;}',
      'html[data-orion-theme="dark"] :is(input,select,textarea){background:#071728!important;border-color:#466a89!important;color:#ffffff!important;}',
      'html[data-orion-theme="dark"] :is(input,textarea)::placeholder{color:#c7ccd3!important;}',
      'html[data-orion-theme="dark"] :is(table,tr,td,th){background:#0c2035!important;border-color:#315878!important;color:#f8fafc!important;}',
      'html[data-orion-theme="dark"] :is(button,.button){background:#173a5b!important;border-color:#4b7191!important;color:#ffffff!important;}',
      'html[data-orion-theme="dark"] :is(.button-dark,.button.primary,.primary,.primary-button,.submit,.submit-button,button[type="submit"]){background:#d9ae63!important;border-color:#f1cf94!important;color:#071524!important;}',
      'html[data-orion-theme="dark"] :is(.aq-menu-panel,.pages-dropdown,.aq-menu-close){background:#0a1b2e!important;color:#ffffff!important;border-color:#365c7b!important;}',
      'html[data-orion-theme="dark"] .aq-menu-links a{color:#ffffff!important;}',
      'html[data-orion-theme="dark"] .aq-menu-links a small,html[data-orion-theme="dark"] .aq-menu-note{color:#d9dde3!important;}',
      'html[data-orion-theme="dark"] :is(.aq-menu-links a:hover,.pages-dropdown a:hover){background:#173a5b!important;color:#f5d69b!important;}',
      'html[data-orion-theme="dark"] :is(.result-track,.progress-track,.spotify-progress-line){background:#264661!important;}',
      'html[data-orion-theme="dark"] :is(.progress-fill,.result-fill){background:#d9ae63!important;}',
      'html[data-orion-theme="dark"] .timer-ring{background:conic-gradient(from 20deg,#f4d18e,#c68c32,#f4d18e)!important;border-color:#f0cd8d!important;}',
      'html[data-orion-theme="dark"] .timer-ring:before{background:#0c2035!important;}',
      'html[data-orion-theme="dark"] .study-now{background:#102a43!important;border-color:#d9ae63!important;box-shadow:none!important;}',
      'html[data-orion-theme="dark"] .study-now-label,html[data-orion-theme="dark"] .study-now-date{color:#f2ce8e!important;}',
      'html[data-orion-theme="dark"] .study-now-time{color:#ffffff!important;}',
      'html[data-orion-theme="dark"] .spotify-card{background:linear-gradient(135deg,#082a1d,#0e4832)!important;border-color:#4fbe78!important;}',
      'html[data-orion-theme="dark"] .spotify-card :is(.spotify-status,.spotify-track,.classical-tip){background:#0a3726!important;border-color:#4baf72!important;box-shadow:none!important;}',
      'html[data-orion-theme="dark"] .spotify-card .spotify-button{background:#0c3d2a!important;border-color:#67d78f!important;color:#ffffff!important;}',
      'html[data-orion-theme="dark"] .spotify-card .spotify-button.primary,html[data-orion-theme="dark"] .spotify-card .spotify-progress-line span{background:#1db954!important;border-color:#1db954!important;color:#ffffff!important;}',
      'html[data-orion-theme="dark"] .spotify-card .spotify-progress-line{background:#164f35!important;}',
      '/* Painel Som para foco: verde Spotify, letras brancas e detalhes Orion em dourado. */',
      '.spotify-card{background:linear-gradient(135deg,#07321f,#0c5a35)!important;border-color:#d9ae63!important;color:#ffffff!important;}',
      '.spotify-card :is(h2,h3,strong,p,span,small){color:#ffffff!important;}',
      '.spotify-card :is(.spotify-status,.spotify-track,.classical-tip){background:rgba(4,39,23,.44)!important;border-color:rgba(217,174,99,.62)!important;color:#ffffff!important;}',
      '.spotify-card .spotify-art{background:#0a3f27!important;border-color:#d9ae63!important;color:#ffffff!important;}',
      '.spotify-card .spotify-button{background:#0a4328!important;border-color:#d9ae63!important;color:#ffffff!important;}',
      '.spotify-card .spotify-button.primary{background:#1db954!important;border-color:#8ce8ad!important;color:#ffffff!important;}',
      '.spotify-card .spotify-progress-line{background:#063820!important;}',
      '.spotify-card .spotify-progress-line span{background:#d9ae63!important;}',
      '.spotify-card .classical-tip a,.spotify-card .eyebrow{color:#f4d18e!important;}',
      '.orion-theme-toggle{width:100%;display:flex;align-items:center;justify-content:center;gap:9px;min-height:44px;margin:17px 0 3px;padding:0 12px;border:1px solid #b9893d;border-radius:5px;color:#1a2c43;background:#f6dfb0;font:700 12px "DM Sans",Arial,sans-serif;cursor:pointer;}',
      '.orion-theme-toggle:hover{filter:brightness(1.03);}',
      '.orion-theme-toggle span:first-child{font-size:17px;line-height:1;}',
      'html[data-orion-theme="dark"] .orion-theme-toggle{color:#f7deb0;background:#193452;border-color:#d9ae63;}',
      '.orion-theme-toggle:focus-visible{outline:3px solid rgba(217,174,99,.72);outline-offset:3px;}'
    ].join('');
    document.head.append(style);
  };

  const addThemeControl = () => {
    document.querySelectorAll('.aq-menu-panel').forEach((panel) => {
      if (panel.querySelector('.orion-theme-toggle')) return;
      const button = document.createElement('button');
      button.className = 'orion-theme-toggle';
      button.type = 'button';
      button.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.orionTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme, true);
      });
      const links = panel.querySelector('.aq-menu-links');
      panel.insertBefore(button, links || null);
    });
    updateThemeControls(document.documentElement.dataset.orionTheme || 'light');
  };

  const injectMenuStyles = () => {
    if (document.getElementById('orionMenuNavigationStyles')) return;
    const style = document.createElement('style');
    style.id = 'orionMenuNavigationStyles';
    style.textContent = `
      /* Leitura confortável em telas grandes, projetores e celulares. */
      html.orion-readable body{
        text-rendering:optimizeLegibility;
        -webkit-font-smoothing:antialiased;
        line-height:1.65;
      }
      html.orion-readable :is(h1,h2,h3){
        font-weight:600!important;
        text-wrap:balance;
      }
      html.orion-readable :is(p,li,td,th,blockquote,figcaption,.lead,.description,.subtitle,.helper,.notice,.guide-item span){
        font-size:clamp(.98rem,1.15vw,1.12rem)!important;
        line-height:1.75!important;
        letter-spacing:.003em;
      }
      html.orion-readable small{
        font-size:clamp(.82rem,.95vw,.96rem)!important;
        line-height:1.6!important;
      }
      html.orion-readable :is(label,button,input,select,textarea,.button,.aq-menu-links a){
        font-size:clamp(.9rem,1vw,1rem)!important;
      }
      html.orion-readable :is(button,input,select,textarea,.button){min-height:44px}
      html.orion-readable :is(.hero p,.top p,.guide p,.alert p,.cta p,.compare p,.footer-text){
        color:rgba(255,255,255,.88)!important;
      }
      html.orion-readable :is(.muted,.lead,.helper,.field small,.notice p,.source,.section-head p,.card>p,.subject p,.method p,.offer span,.university span){
        color:#4e6075!important;
      }
      html.orion-readable :is(a,button,input,select,textarea):focus-visible{
        outline:3px solid rgba(217,174,99,.72)!important;
        outline-offset:3px;
      }
      .aq-menu-links .aq-menu-index{margin:0 2px 5px;color:#8a662b;font-size:11px;font-weight:700;letter-spacing:.11em;text-transform:uppercase}
      .aq-menu-links .aq-menu-group{margin:16px 2px 4px;color:#8a662b;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.aq-menu-links .aq-menu-group:first-of-type{margin-top:2px}
      .aq-menu-links a{min-height:50px;display:block}
      .aq-menu-links .aq-menu-priority{border:1px solid rgba(185,137,61,.42);border-radius:14px;background:linear-gradient(135deg,#fffaf0,#f8e5bb);box-shadow:0 6px 15px rgba(31,48,72,.08)}
      .aq-menu-links .aq-menu-priority:hover{border-color:#b9893d;background:#f7dfae}
      .aq-menu-links .aq-menu-priority small{color:#715222!important;font-weight:600}
      .aq-menu-links a:focus-visible{outline:3px solid rgba(217,174,99,.55);outline-offset:2px}
      :is(.button,.new-button,.next-page-button,.orion-theme-toggle){border-radius:14px!important}
      body > header .nav-actions .button,.aq-mobile-login{border-radius:999px!important}
      .orion-header-search{display:inline-grid;place-items:center;flex:0 0 auto;width:42px;height:42px;padding:0;border:1px solid rgba(217,174,99,.72);border-radius:50%;color:#f2ce8e;background:rgba(255,255,255,.04);box-shadow:0 5px 14px rgba(5,18,35,.18);transition:background .18s,color .18s,transform .18s,box-shadow .18s}.orion-header-search:hover{color:#fff;background:rgba(217,174,99,.16);box-shadow:0 8px 18px rgba(5,18,35,.28);transform:translateY(-1px)}.orion-header-search:focus-visible{outline:3px solid rgba(217,174,99,.72);outline-offset:3px}.orion-search-icon{position:relative;display:block;width:14px;height:14px;border:2px solid currentColor;border-radius:50%}.orion-search-icon:after{content:"";position:absolute;right:-5px;bottom:-4px;width:7px;height:2px;border-radius:2px;background:currentColor;transform:rotate(45deg);transform-origin:left center}@media(max-width:700px){body.orion-header-safe .orion-header-search{display:none!important}}
      .aq-mobile-login{display:none}
      /* O botão fica na borda direita e o conteúdo do cabeçalho reserva esse espaço. */
      body.orion-header-safe>header :is(.nav,.top){
        gap:18px!important;
        padding-right:84px!important;
      }
      body.orion-header-safe>header :is(.brand,.back,.public-link){
        min-width:0;
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .aq-menu-toggle{
        position:absolute!important;
        z-index:1002!important;
        top:16px!important;
        right:18px!important;
        left:auto!important;
        width:46px!important;
        height:46px!important;
        transform:none!important;
      }
      @media (max-width:700px){
        body{scroll-padding-top:86px}
        body>header :is(.nav,.top){min-height:70px;padding-right:128px!important}
        body>header :is(.back,.public-link){display:none!important}
        body.orion-mobile-actions>header .nav{padding-right:230px!important}
        body.orion-mobile-actions header .nav .brand{flex:0 0 auto;font-size:0!important;gap:0}
        body.orion-mobile-actions header .nav .brand :is(.brand-mark,.mark){margin:0}
        body.orion-mobile-actions header .nav-actions .button{position:absolute!important;z-index:1002;top:12px;right:132px;display:inline-flex!important;min-height:42px!important;margin:0!important;padding:0 9px!important;border-radius:6px!important;white-space:nowrap;font-size:.68rem!important;line-height:1!important}
        body.orion-mobile-actions .menu-toggle{display:none!important}
        html.orion-readable :is(p,li,td,th,blockquote,figcaption,.lead,.description,.subtitle,.helper,.notice,.guide-item span){font-size:.95rem!important;line-height:1.72!important}
        .aq-menu-toggle{top:12px!important;right:12px!important;width:42px!important;height:42px!important}
        .aq-mobile-login{position:absolute;z-index:1002;top:12px;right:60px;display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 10px;border:1px solid rgba(255,244,213,.72);border-radius:6px;color:#10213a!important;background:#d9ae63;font-size:.72rem!important;font-weight:800;letter-spacing:.015em;box-shadow:0 8px 20px rgba(8,21,38,.2);white-space:nowrap}
        .aq-mobile-login:hover{color:#10213a!important;background:#edcd90}
        .aq-mobile-login:focus-visible{outline:3px solid rgba(255,255,255,.82)!important;outline-offset:2px}
      }
      @media (max-width:390px){
        body>header .nav .brand{font-size:0!important;gap:0!important}
        body>header .nav .brand :is(.brand-mark,.mark){margin:0}
        body.orion-mobile-actions>header .nav{padding-right:220px!important}
        body.orion-mobile-actions header .nav-actions .button{right:128px;padding:0 7px!important;font-size:.63rem!important}
        .aq-mobile-login{right:58px;padding:0 8px;font-size:.68rem!important}
      }
    `;
    document.head.append(style);
    document.documentElement.classList.add('orion-readable');
  };

  const normalizeHeaders = () => {
    const createOriginalBishop = () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 40 48');
      svg.setAttribute('aria-hidden', 'true');
      svg.setAttribute('focusable', 'false');
      svg.setAttribute('fill', 'currentColor');
      svg.style.cssText = 'display:block;width:100%;height:100%';
      const body = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      body.setAttribute('fill-rule', 'evenodd');
      body.setAttribute('d', 'M20 2L9 15c0 5.5 4.9 10.3 9 13.2L11 38h18l-7-9.8c4.1-2.9 9-7.7 9-13.2L20 2Zm3.9 5.4L14 16.2l4 3 9-10.1Z');
      const base = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      base.setAttribute('d', 'M8 40h24v3H8zM4 45h32v3H4z');
      svg.append(body, base);
      return svg;
    };

    document.querySelectorAll('body > header').forEach((header) => {
      if (header.dataset.orionOriginalHeader === 'true' || header.dataset.orionUnified === 'true') return;
      const brand = header.querySelector('.brand');
      if (!brand) return;
      header.dataset.orionUnified = 'true';
      let mark = brand.querySelector('.brand-mark, .mark');
      if (!mark) {
        mark = document.createElement('span');
        mark.className = 'brand-mark';
        brand.prepend(mark);
      }
      mark.setAttribute('aria-hidden', 'true');
      mark.replaceChildren(createOriginalBishop());
    });

    if (document.getElementById('orionUnifiedHeaderStyles')) return;
    const style = document.createElement('style');
    style.id = 'orionUnifiedHeaderStyles';
    style.textContent = `
      body > header[data-orion-unified="true"]{
        position:relative!important;z-index:20!important;width:100%!important;
        min-height:76px!important;border:0!important;background:#0d1d35!important;color:#fff!important;
        box-shadow:0 1px 0 rgba(217,174,99,.24)!important;
      }
      body > header[data-orion-unified="true"] :is(.nav,.top){
        width:min(1152px,calc(100% - 48px))!important;min-height:76px!important;margin:0 auto!important;
        display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;
      }
      body > header[data-orion-unified="true"] .brand{
        display:inline-flex!important;align-items:center!important;gap:10px!important;color:#fff!important;
        font-family:"Playfair Display",Georgia,serif!important;font-size:20px!important;font-weight:600!important;
        line-height:1.1!important;letter-spacing:-.025em!important;text-decoration:none!important;
      }
      body > header[data-orion-unified="true"] .brand :is(.brand-mark,.mark){
        display:grid!important;place-items:center!important;flex:0 0 auto!important;width:29px!important;height:34px!important;
        overflow:hidden!important;border:1px solid #d9ae63!important;clip-path:polygon(50% 0,100% 18%,89% 100%,11% 100%,0 18%)!important;
        color:#e5bf7e!important;background:transparent!important;font:700 21px/1 Georgia,serif!important;
      }
      body > header[data-orion-unified="true"] .back,body > header[data-orion-unified="true"] .public-link{
        color:#f2ce8e!important;font-size:12px!important;font-weight:800!important;text-decoration:none!important;
      }
      body > header[data-orion-unified="true"] .back:hover,body > header[data-orion-unified="true"] .public-link:hover{color:#fff!important;text-decoration:underline!important;text-underline-offset:4px!important;}
      @media(max-width:700px){
        body > header[data-orion-unified="true"]{min-height:68px!important;}
        body > header[data-orion-unified="true"] :is(.nav,.top){width:min(100% - 28px,1152px)!important;min-height:68px!important;padding:12px 132px 12px 0!important;gap:10px!important;}
        body > header[data-orion-unified="true"] .brand{font-size:18px!important;white-space:nowrap!important;}
        body > header[data-orion-unified="true"] .back,body > header[data-orion-unified="true"] .public-link{display:none!important;}
      }
      @media(max-width:390px){body > header[data-orion-unified="true"] .brand{font-size:0!important;gap:0!important;}}
    `;
    document.head.append(style);
  };

  const addHeaderSearch = () => {
    document.querySelectorAll('body > header').forEach((header) => {
      if (header.querySelector('.orion-header-search')) return;
      const target = header.querySelector('.nav-actions') || header.querySelector('.nav, .top');
      if (!target) return;
      const link = document.createElement('a');
      link.className = 'orion-header-search';
      link.href = 'busca.html';
      link.setAttribute('aria-label', 'Buscar informações no site');
      link.title = 'Buscar informações';
      const icon = document.createElement('span');
      icon.className = 'orion-search-icon';
      icon.setAttribute('aria-hidden', 'true');
      link.append(icon);
      if (target.classList.contains('nav-actions')) target.prepend(link);
      else target.append(link);
    });
  };

  const injectProfessionalStyles = () => {
    if (document.getElementById('orionProfessionalStyles')) return;
    const style = document.createElement('style');
    style.id = 'orionProfessionalStyles';
    style.textContent = `
      main :is(input,select,textarea){border-radius:12px!important}
      main :is(.submit,.add,.load,.action,.save,.document-action){border-radius:14px!important}
      main :is(.filter,.filter-button,.choice-chip){border-radius:999px!important}
      main :is(.card,.institution,.offer,.result,.program-card,.event,.second-card,.follow,.quick,.benefit,.career,.college-card){border-radius:16px!important}
      main :is(.tag,.badge,.pill,.official-badge){border-radius:999px!important}
      .orion-data-trust{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:22px;align-items:center;margin:26px 0 13px;padding:21px 23px;border:1px solid #d9bc80;border-radius:18px;background:linear-gradient(125deg,#fffaf0,#f2f7fb);box-shadow:0 10px 24px rgba(13,29,53,.07);color:#17304b}
      .orion-data-trust-kicker{display:block;margin-bottom:7px;color:#8a6525;font-size:10px;font-weight:800;letter-spacing:.11em;text-transform:uppercase}
      .orion-data-trust h2{margin:0;color:#102a48;font:600 clamp(22px,2.6vw,30px)/1.12 "Playfair Display",Georgia,serif;letter-spacing:-.025em}
      .orion-data-trust p{max-width:770px;margin:8px 0 0;color:#4d6279;font-size:13px;line-height:1.65}
      .orion-data-trust-meta{display:flex;flex-wrap:wrap;gap:7px;margin-top:13px}.orion-data-trust-meta span{display:inline-flex;align-items:center;min-height:27px;padding:0 9px;border:1px solid #d9c18e;border-radius:999px;color:#604a24;background:#fffdf8;font-size:10px;font-weight:800}.orion-data-trust-meta span:first-child{color:#1e6048;border-color:#b8d8c4;background:#eff8f1}
      .orion-data-trust-action{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 15px;border:1px solid #b9893d;border-radius:999px;color:#132a45!important;background:#e8c985;font-size:12px;font-weight:800;text-align:center;white-space:nowrap;box-shadow:0 7px 14px rgba(104,74,27,.12)}.orion-data-trust-action:hover{background:#f2dba8}.orion-data-trust-action:focus-visible{outline:3px solid rgba(185,137,61,.72);outline-offset:3px}
      .orion-page-index{display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin:0 0 28px;padding:12px 14px;border:1px solid #dce5ec;border-radius:14px;background:#fff;color:#50647a}.orion-page-index b{margin-right:3px;color:#193a5f;font-size:11px}.orion-page-index a{padding:6px 9px;border-radius:999px;color:#234f7a!important;background:#edf4fa;font-size:11px;font-weight:800}.orion-page-index a:hover{color:#183e64!important;background:#e0edf8}
      .orion-home-updates{padding:0 0 34px;background:#fbfaf7}.orion-home-updates-inner{display:grid;grid-template-columns:minmax(225px,.72fr) minmax(0,1.28fr);gap:25px;align-items:center;padding:23px 27px;border:1px solid #d9e2eb;border-radius:18px;background:#fff;box-shadow:0 10px 24px rgba(13,29,53,.05)}.orion-home-updates h2{margin:5px 0 0;color:#102a48;font:600 clamp(23px,2.8vw,32px)/1.14 "Playfair Display",Georgia,serif;letter-spacing:-.03em}.orion-update-list{display:grid;gap:8px}.orion-update{display:grid;grid-template-columns:84px minmax(0,1fr);gap:10px;align-items:center;padding:10px 12px;border:1px solid #e1e8ee;border-radius:13px;color:#1c4f7c;background:#fbfdff;font-size:12px;font-weight:800}.orion-update:hover{border-color:#cba25c;background:#fffaf0}.orion-update time{color:#8a6525;font-size:10px;letter-spacing:.04em;text-transform:uppercase}
      .orion-home-search{margin:0 0 27px;padding:22px 24px;border:1px solid #d9c18e;border-radius:18px;background:linear-gradient(135deg,#102a48,#1d4e78);box-shadow:0 13px 28px rgba(13,29,53,.12)}.orion-home-search-copy{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:15px}.orion-home-search .eyebrow{color:#e8c985}.orion-home-search h2{margin:6px 0 0;color:#fff;font:600 clamp(24px,2.8vw,33px)/1.12 "Playfair Display",Georgia,serif;letter-spacing:-.03em}.orion-home-search p{max-width:470px;margin:0;color:#d7e5f1;font-size:12px;line-height:1.6;text-align:right}.orion-home-search-form{display:grid;grid-template-columns:1fr auto;gap:9px}.orion-home-search-form input{min-height:48px;padding:0 14px;border:1px solid #c1d2e0;border-radius:12px;color:#17243a;background:#fff;font:600 13px "DM Sans",Arial,sans-serif}.orion-home-search-form button{min-height:48px;padding:0 16px;cursor:pointer;border:0;border-radius:12px;color:#17243a;background:#e8c985;font:800 12px "DM Sans",Arial,sans-serif}.orion-home-search-form button:hover{background:#f4d9a3}
      .orion-saved-filter-note{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:15px;padding:11px 12px;border:1px solid #dbe5ee;border-radius:12px;color:#52677c;background:#f7fbff;font-size:11px;line-height:1.45}.orion-saved-filter-note strong{color:#245d4b}.orion-saved-filter-note button{padding:6px 9px;cursor:pointer;border:1px solid #b9cbd9;border-radius:999px;color:#244866;background:#fff;font:800 10px/1 "DM Sans",Arial,sans-serif}.orion-saved-filter-note button:hover{border-color:#b9893d;color:#785719}
      .orion-print-toolbar{display:flex;justify-content:flex-end;margin:0 0 18px}.orion-print-button{display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:0 14px;cursor:pointer;border:1px solid #b88940;border-radius:999px;color:#183b5d;background:#fffaf0;font:800 11px/1 "DM Sans",Arial,sans-serif;box-shadow:0 5px 12px rgba(44,63,83,.08)}.orion-print-button:hover{background:#f5dfad}.orion-print-button:focus-visible{outline:3px solid rgba(185,137,61,.55);outline-offset:3px}
      .orion-student-timeline{margin:30px 0;padding:25px;border:1px solid #dbe4ec;border-radius:18px;background:linear-gradient(135deg,#fff,#f6faff);box-shadow:0 10px 25px rgba(13,29,53,.05)}.orion-student-timeline-head{display:flex;justify-content:space-between;gap:18px;align-items:flex-end;margin-bottom:18px}.orion-student-timeline h2{margin:6px 0 0;color:#102a48;font:600 clamp(23px,2.8vw,31px)/1.14 "Playfair Display",Georgia,serif;letter-spacing:-.03em}.orion-student-timeline-head p{max-width:450px;margin:0;color:#627589;font-size:11px;line-height:1.55;text-align:right}.orion-timeline-list{display:grid;gap:10px}.orion-timeline-item{display:grid;grid-template-columns:31px minmax(0,1fr) auto;gap:12px;align-items:center;padding:13px;border:1px solid #e0e8ee;border-radius:13px;background:#fff;color:#173a5e}.orion-timeline-icon{display:grid;place-items:center;width:31px;height:31px;border-radius:50%;color:#71521f;background:#f8ead0;font-size:14px}.orion-timeline-copy{min-width:0}.orion-timeline-copy b{display:block;overflow:hidden;color:#183b5d;font-size:12px;text-overflow:ellipsis;white-space:nowrap}.orion-timeline-copy span{display:block;margin-top:3px;color:#6a7b8d;font-size:10px;line-height:1.4}.orion-timeline-item time{color:#87682f;font-size:10px;font-weight:800;white-space:nowrap}.orion-timeline-empty{padding:15px;border:1px dashed #cbd9e3;border-radius:13px;color:#61758a;background:#fff;font-size:12px;line-height:1.6}.orion-timeline-item:hover{border-color:#cfab68;background:#fffdf8}
      .orion-course-finder{margin:0 0 38px;padding:25px;border:1px solid #d8e2eb;border-radius:18px;background:linear-gradient(140deg,#fff,#f5f9fc);box-shadow:0 12px 28px rgba(13,29,53,.05)}.orion-course-finder-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:18px}.orion-course-finder h2{margin:6px 0 0;color:#102a48;font:600 clamp(24px,2.8vw,34px)/1.12 "Playfair Display",Georgia,serif;letter-spacing:-.03em}.orion-course-finder-head p{max-width:460px;margin:0;color:#5f7286;font-size:12px;line-height:1.6;text-align:right}.orion-course-fields{display:grid;grid-template-columns:1.2fr .65fr 1fr;gap:11px}.orion-course-fields label{display:grid;gap:6px;color:#425a73;font-size:11px;font-weight:800}.orion-course-fields input,.orion-course-fields select{min-height:44px;padding:0 11px;border:1px solid #cfdbe5;border-radius:11px;color:#17243a;background:#fff;font:600 12px "DM Sans",Arial,sans-serif}.orion-course-result{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:18px}.orion-course-result .orion-offer{padding:14px;border:1px solid #dfe7ed;border-radius:12px;background:#fff}.orion-offer b{display:block;color:#173a5e;font-size:12px}.orion-offer span{display:block;margin-top:4px;color:#607387;font-size:10px;line-height:1.45}.orion-course-empty{grid-column:1/-1;padding:14px;border:1px dashed #c8d7e2;border-radius:12px;color:#596f84;background:#fff;font-size:12px;line-height:1.55}.orion-course-action{display:inline-flex;align-items:center;justify-content:center;min-height:38px;margin-top:16px;padding:0 12px;border:1px solid #b98a40;border-radius:999px;color:#173a5e;background:#fff8ea;font-size:11px;font-weight:800}.orion-course-action:hover{background:#f6e1ae}
      .orion-error-notebook{margin:48px 0 0;padding:25px;border:1px solid #e7d3cf;border-radius:18px;background:linear-gradient(135deg,#fff9f8,#fff)}.orion-error-notebook-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:17px}.orion-error-notebook h2{margin:6px 0 0;color:#6e3631;font:600 clamp(24px,2.8vw,33px)/1.12 "Playfair Display",Georgia,serif}.orion-error-notebook-head p{max-width:465px;margin:0;color:#765f5b;font-size:12px;line-height:1.6;text-align:right}.orion-error-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:14px}.orion-error-summary div{padding:13px;border:1px solid #eadbd8;border-radius:12px;background:#fff}.orion-error-summary b{display:block;color:#8e443c;font:600 28px/1 "Playfair Display",Georgia,serif}.orion-error-summary span{display:block;margin-top:5px;color:#746b6a;font-size:10px;line-height:1.4}.orion-error-list{display:grid;gap:9px}.orion-error-entry{padding:13px;border:1px solid #eadeda;border-radius:12px;background:#fff}.orion-error-entry b{display:block;color:#173a5e;font-size:12px}.orion-error-entry span{display:block;margin-top:5px;color:#72625f;font-size:11px;line-height:1.5}.orion-error-entry em{display:inline-block;margin:8px 5px 0 0;padding:4px 7px;border-radius:999px;color:#8b413a;background:#f9e6e3;font-size:10px;font-style:normal;font-weight:800}.orion-error-empty{padding:15px;border:1px dashed #d7bebb;border-radius:12px;color:#735f5c;background:#fff;font-size:12px;line-height:1.6}
      .orion-enem-countdown{margin:38px 0;padding:25px;border:1px solid #d8c6a3;border-radius:18px;background:linear-gradient(135deg,#fff,#fffaf0);box-shadow:0 12px 26px rgba(13,29,53,.05)}.orion-enem-countdown-head{display:flex;align-items:end;justify-content:space-between;gap:18px;margin-bottom:17px}.orion-enem-countdown h2{margin:6px 0 0;color:#102a48;font:600 clamp(25px,2.8vw,35px)/1.12 "Playfair Display",Georgia,serif}.orion-enem-countdown-head p{max-width:445px;margin:0;color:#607286;font-size:12px;line-height:1.6;text-align:right}.orion-countdown-clock{display:grid;grid-template-columns:repeat(4,1fr);gap:9px}.orion-countdown-unit{padding:15px 8px;border:1px solid #dfe5ea;border-radius:12px;background:#fff;text-align:center}.orion-countdown-unit b{display:block;color:#173a5e;font:600 clamp(28px,4vw,45px)/1 "Playfair Display",Georgia,serif;font-variant-numeric:tabular-nums}.orion-countdown-unit span{display:block;margin-top:6px;color:#6b7b8e;font-size:9px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}.orion-countdown-days{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:13px}.orion-countdown-days div{padding:12px;border-left:3px solid #d9ae63;border-radius:0 10px 10px 0;background:#fff}.orion-countdown-days b{display:block;color:#173a5e;font-size:11px}.orion-countdown-days span{display:block;margin-top:4px;color:#607286;font-size:10px;line-height:1.5}
      @media print{@page{margin:12mm}.aq-menu-toggle,.aq-menu-backdrop,.aq-mobile-login,.orion-header-search,.orion-print-toolbar,footer,.orion-page-index,.theme-control{display:none!important}body{background:#fff!important;color:#111!important}body>header,body>header[data-orion-unified="true"]{min-height:auto!important;color:#111!important;background:#fff!important;border-bottom:1px solid #bbb!important}body>header :is(.nav,.top),body>header[data-orion-unified="true"] :is(.nav,.top){width:100%!important;min-height:54px!important;padding:0!important;color:#111!important}body>header .brand,body>header[data-orion-unified="true"] .brand{color:#111!important}body>header .back,body>header .public-link{display:none!important}.hero{padding:22px 0!important;color:#111!important;background:#fff!important}.hero:after{display:none!important}.hero :is(h1,h2,h3,p,.eyebrow){color:#111!important}.hero p{max-width:none!important}.wrap{width:100%!important}.orion-data-trust{box-shadow:none!important}.orion-data-trust-action{box-shadow:none!important}main{padding:18px 0!important}.orion-print-results :is(.planner,.selector,#comparisonForm,#studyForm,.add-card){display:none!important}.results,.result,.offer,.card,.event,.checklist,.orion-data-trust,.orion-student-timeline{break-inside:avoid!important;box-shadow:none!important}a{color:#111!important;text-decoration:none!important}.results[hidden]{display:none!important}}
      @media(max-width:700px){.orion-data-trust{grid-template-columns:1fr;gap:15px;margin-top:18px;padding:18px}.orion-data-trust-action{justify-self:start;white-space:normal}.orion-page-index{align-items:flex-start;flex-direction:column}.orion-page-index b{margin-bottom:2px}.orion-home-updates-inner{grid-template-columns:1fr;padding:20px}.orion-update{grid-template-columns:72px minmax(0,1fr)}.orion-home-search{padding:19px}.orion-home-search-copy{align-items:flex-start;flex-direction:column}.orion-home-search p{text-align:left}.orion-home-search-form{grid-template-columns:1fr}.orion-saved-filter-note,.orion-student-timeline-head,.orion-course-finder-head,.orion-error-notebook-head,.orion-enem-countdown-head{align-items:flex-start;flex-direction:column}.orion-student-timeline{padding:19px}.orion-student-timeline-head p,.orion-course-finder-head p,.orion-error-notebook-head p,.orion-enem-countdown-head p{text-align:left}.orion-timeline-item{grid-template-columns:31px minmax(0,1fr)}.orion-timeline-item time{grid-column:2}.orion-course-fields,.orion-course-result,.orion-error-summary,.orion-countdown-days{grid-template-columns:1fr}.orion-countdown-clock{gap:6px}.orion-countdown-unit{padding:12px 4px}.orion-countdown-unit b{font-size:29px}}
    `;
    document.head.append(style);
  };

  const addDataTrustPanel = () => {
    const profile = dataPageProfiles[currentPage];
    const main = document.querySelector('main');
    if (!profile || !main || document.getElementById('orion-data-trust')) return;

    const make = (tag, className, text) => {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text) element.textContent = text;
      return element;
    };
    const setTarget = (selector, id) => {
      const target = document.querySelector(selector);
      if (!target) return null;
      if (!target.id) target.id = id;
      return `#${target.id}`;
    };

    const panel = make('section', 'orion-data-trust');
    panel.id = 'orion-data-trust';
    panel.setAttribute('aria-label', 'Fonte e atualização dos dados');
    const copy = make('div', 'orion-data-trust-copy');
    copy.append(make('span', 'orion-data-trust-kicker', 'Fonte e atualização'));
    copy.append(make('h2', '', profile.title));
    copy.append(make('p', '', profile.description));
    const meta = make('div', 'orion-data-trust-meta');
    meta.append(make('span', '', '✓ Fonte oficial'));
    const automaticReview = make('span', 'orion-automatic-review', 'Verificação automática: aguardando primeira revisão');
    automaticReview.dataset.orionAutomaticReview = 'true';
    meta.append(automaticReview);
    meta.append(make('span', '', 'Regras, vagas, notas e datas podem mudar'));
    copy.append(meta);
    const action = make('a', 'orion-data-trust-action', profile.button);
    action.href = profile.url;
    if (/^https?:/i.test(profile.url)) {
      action.target = '_blank';
      action.rel = 'noopener noreferrer';
    }
    action.setAttribute('aria-label', `${profile.button.replace(/ [↗↓]$/, '')}: ${profile.source}`);
    panel.append(copy, action);

    const howTarget = setTarget(profile.how, 'orion-how-it-works');
    const dataTarget = setTarget(profile.data, 'orion-page-data');
    const index = make('nav', 'orion-page-index');
    index.setAttribute('aria-label', 'Nesta página');
    index.append(make('b', '', 'Nesta página'));
    [[ '#orion-data-trust', 'Fonte e atualização' ], [howTarget, 'Como funciona'], [dataTarget, 'Dados e resultados']].forEach(([href, label]) => {
      if (!href) return;
      const link = make('a', '', label);
      link.href = href;
      index.append(link);
    });
    main.prepend(index);
    main.prepend(panel);
  };

  const refreshAutomaticSourceReview = () => {
    fetch('dados-revisao/fontes-oficiais-status.json', { cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((status) => {
        if (!status?.verificadoEm) return;
        const date = new Date(status.verificadoEm).toLocaleDateString('pt-BR');
        const summary = status.resumo || {};
        const label = summary.mudancasDetectadas || summary.indisponiveis
          ? `Revisão necessária: ${Number(summary.mudancasDetectadas || 0) + Number(summary.indisponiveis || 0)} fonte(s) com pendência`
          : `Verificação automática em ${date}`;
        document.querySelectorAll('[data-orion-automatic-review]').forEach((element) => { element.textContent = label; });
      })
      .catch(() => {});
  };

  const refreshHomeHub = () => {
    if (currentPage !== 'index.html') return;
    document.querySelectorAll('.career-stack a[href="cadernos.html"], .career-stack .career-static').forEach((card) => card.remove());
    document.getElementById('quizLayer')?.remove();
    const grid = document.querySelector('.benefit-grid');
    if (grid && !grid.dataset.orionHubReady) {
      const topics = [
        ['carreiras.html', '⌁', 'Encontrar curso ou faculdade', 'Pesquise cursos, estados, instituições públicas e campus.'],
        ['plano-sisu.html', '◎', 'Entender Sisu, vagas e cotas', 'Consulte modalidades, vagas, notas e explicações antes de comparar.'],
        ['plano-estudos.html', '✦', 'Organizar estudos e rotina', 'Monte um plano, use o cronômetro e registre seus estudos.'],
        ['calendario-vestibulando.html', '◈', 'Acompanhar editais e datas', 'Veja calendário, vestibulares e fontes para confirmar cada etapa.']
      ];
      grid.replaceChildren();
      topics.forEach(([href, icon, title, description]) => {
        const link = document.createElement('a');
        link.className = 'benefit';
        link.href = href;
        const iconBox = document.createElement('div');
        iconBox.className = 'icon-box';
        iconBox.setAttribute('aria-hidden', 'true');
        iconBox.textContent = icon;
        const heading = document.createElement('h3');
        heading.textContent = title;
        const text = document.createElement('p');
        text.textContent = description;
        link.append(iconBox, heading, text);
        grid.append(link);
      });
      grid.dataset.orionHubReady = 'true';
    }
    if (grid && !document.querySelector('.orion-home-search')) {
      const search = document.createElement('section');
      search.className = 'orion-home-search';
      search.setAttribute('aria-labelledby', 'orion-home-search-title');
      const copy = document.createElement('div');
      copy.className = 'orion-home-search-copy';
      const intro = document.createElement('div');
      const eyebrow = document.createElement('span');
      eyebrow.className = 'eyebrow';
      eyebrow.textContent = 'Busca geral';
      const heading = document.createElement('h2');
      heading.id = 'orion-home-search-title';
      heading.textContent = 'O que você quer consultar?';
      intro.append(eyebrow, heading);
      const text = document.createElement('p');
      text.textContent = 'Pesquise cursos, estados, instituições, vestibulares, cotas ou termos como “Medicina Paraná” e “PISM”.';
      copy.append(intro, text);
      const form = document.createElement('form');
      form.className = 'orion-home-search-form';
      const input = document.createElement('input');
      input.type = 'search'; input.name = 'q'; input.placeholder = 'Ex.: Medicina Paraná'; input.setAttribute('aria-label', 'Buscar informações no site');
      const button = document.createElement('button');
      button.type = 'submit'; button.textContent = 'Buscar informações →';
      form.append(input, button);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = input.value.trim();
        window.location.href = `busca.html${query ? `?q=${encodeURIComponent(query)}` : ''}`;
      });
      search.append(copy, form);
      grid.insertAdjacentElement('beforebegin', search);
    }
    const logos = document.querySelector('.logos');
    if (!logos || document.querySelector('.orion-home-updates')) return;
    const section = document.createElement('section');
    section.className = 'orion-home-updates';
    section.setAttribute('aria-labelledby', 'orion-updates-title');
    const wrap = document.createElement('div');
    wrap.className = 'wrap orion-home-updates-inner';
    const intro = document.createElement('div');
    const eyebrow = document.createElement('span');
    eyebrow.className = 'eyebrow';
    eyebrow.textContent = 'Atualizações recentes';
    const heading = document.createElement('h2');
    heading.id = 'orion-updates-title';
    heading.textContent = 'Informações revisadas para sua consulta.';
    intro.append(eyebrow, heading);
    const list = document.createElement('div');
    list.className = 'orion-update-list';
    [
      ['31 ago. 2026', 'Padrão de fontes, revisões e avisos nas páginas de dados', 'como-usamos-informacoes.html'],
      ['27 ago. 2026', 'Referências de vagas e modalidades do Sisu 2026', 'plano-sisu.html'],
      ['27 ago. 2026', 'Calendário do vestibulando com links de confirmação', 'calendario-vestibulando.html']
    ].forEach(([date, label, href]) => {
      const link = document.createElement('a');
      link.className = 'orion-update';
      link.href = href;
      const time = document.createElement('time');
      time.dateTime = date === '31 ago. 2026' ? '2026-08-31' : '2026-08-27';
      time.textContent = date;
      const text = document.createElement('span');
      text.textContent = label;
      link.append(time, text);
      list.append(link);
    });
    wrap.append(intro, list);
    section.append(wrap);
    logos.insertAdjacentElement('afterend', section);
  };

  const localData = {
    get(key, fallback) {
      try {
        const value = JSON.parse(window.localStorage.getItem(key));
        return value === null ? fallback : value;
      } catch (_) {
        return fallback;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (_) {
        return false;
      }
    },
    remove(key) {
      try {
        window.localStorage.removeItem(key);
      } catch (_) {
        // O recurso continua funcionando sem armazenamento local.
      }
    }
  };

  const savedFiltersKey = 'orion-saved-filters-v1';
  const activitiesKey = 'orion-student-activity-v1';
  const normalText = (value) => String(value || '').replace(/\s+/g, ' ').trim();
  const formatActivityDate = (value) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'agora';
    const day = new Date();
    if (date.toDateString() === day.toDateString()) return 'hoje';
    day.setDate(day.getDate() - 1);
    if (date.toDateString() === day.toDateString()) return 'ontem';
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  };
  const readActivities = () => {
    const value = localData.get(activitiesKey, []);
    return Array.isArray(value) ? value.filter((item) => item && item.title && item.href).slice(0, 16) : [];
  };
  const recordActivity = (type, title, href, detail = '') => {
    const cleanTitle = normalText(title);
    if (!cleanTitle) return;
    const entry = { id: `${type}|${href}|${cleanTitle}`, type, title: cleanTitle, href, detail: normalText(detail), updatedAt: new Date().toISOString() };
    const next = [entry, ...readActivities().filter((item) => item.id !== entry.id)].slice(0, 16);
    if (!localData.set(activitiesKey, next)) return;
    window.dispatchEvent(new CustomEvent('orion:activity-updated'));
  };

  const addSavedFilterNote = (form, message) => {
    if (!form || form.parentElement?.querySelector('.orion-saved-filter-note')) return null;
    const note = document.createElement('div');
    note.className = 'orion-saved-filter-note';
    const text = document.createElement('span');
    const strong = document.createElement('strong');
    strong.textContent = 'Filtros salvos neste navegador. ';
    text.append(strong, document.createTextNode(message));
    const clear = document.createElement('button');
    clear.type = 'button';
    clear.textContent = 'Limpar filtros salvos';
    note.append(text, clear);
    form.insertAdjacentElement('afterend', note);
    return { note, text, clear };
  };

  const setupSisuSavedFilters = () => {
    if (currentPage !== 'plano-sisu.html') return;
    const form = document.getElementById('planForm');
    const course = document.getElementById('courseInput');
    const state = document.getElementById('state');
    const city = document.getElementById('city');
    const quota = document.getElementById('quota');
    const addCourse = document.getElementById('addCourse');
    const chips = document.getElementById('chips');
    if (!form || !course || !state || !quota || !addCourse || !chips) return;

    const note = addSavedFilterNote(form, 'Cursos, estado e modalidade são guardados apenas aqui; notas e dados pessoais não entram nesse registro.');
    const readCourses = () => [...chips.querySelectorAll('.chip')].map((chip) => normalText(chip.firstChild?.textContent)).filter(Boolean);
    const save = () => {
      const all = localData.get(savedFiltersKey, {});
      localData.set(savedFiltersKey, { ...all,
        sisu: { courses: readCourses(), state: state.value, city: city?.value || '', quota: quota.value, updatedAt: new Date().toISOString() }
      });
    };
    const saved = localData.get(savedFiltersKey, {})?.sisu;
    const hasJourneyParameters = ['curso', 'uf', 'cota', 'cidade'].some((name) => new URLSearchParams(window.location.search).has(name));
    const restore = () => {
      if (!saved || hasJourneyParameters) return;
      if ([...state.options].some((option) => option.value === saved.state)) state.value = saved.state || '';
      if (city) city.value = saved.city || '';
      if ([...quota.options].some((option) => option.value === saved.quota)) quota.value = saved.quota || '';
      (Array.isArray(saved.courses) ? saved.courses : []).slice(0, 3).forEach((name) => {
        course.value = name;
        addCourse.click();
      });
      state.dispatchEvent(new Event('change', { bubbles: true }));
      if (note && (saved.state || saved.quota || saved.city || saved.courses?.length)) note.text.firstChild.textContent = 'Filtros recuperados neste navegador. ';
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restore, { once: true });
    else window.setTimeout(restore, 0);
    [course, state, city, quota].filter(Boolean).forEach((field) => field.addEventListener('change', save));
    course.addEventListener('input', save);
    new MutationObserver(save).observe(chips, { childList: true });
    form.addEventListener('submit', () => {
      save();
      window.setTimeout(() => {
        if (document.getElementById('results')?.hidden) return;
        const label = readCourses().join(', ') || 'Ofertas do Sisu';
        const detail = [state.value, quota.selectedOptions[0]?.textContent].filter(Boolean).join(' · ');
        recordActivity('Pesquisa salva', label, 'plano-sisu.html', detail);
      }, 0);
    });
    note?.clear.addEventListener('click', () => {
      const stored = localData.get(savedFiltersKey, {});
      if (stored && typeof stored === 'object') {
        delete stored.sisu;
        localData.set(savedFiltersKey, stored);
      }
      note.text.firstChild.textContent = 'Filtros salvos removidos deste navegador. ';
    });
  };

  const setupComparisonSavedFilters = () => {
    if (currentPage !== 'comparar-notas.html') return;
    const form = document.getElementById('comparisonForm');
    const course = document.getElementById('course');
    const state = document.getElementById('state');
    const quota = document.getElementById('quota');
    if (!form || !course || !state || !quota) return;
    const note = addSavedFilterNote(form, 'Curso, estado e modalidade ficam apenas neste aparelho. As suas cinco notas não são salvas.');
    const save = () => {
      const all = localData.get(savedFiltersKey, {});
      localData.set(savedFiltersKey, { ...all, comparison: { course: course.value, state: state.value, quota: quota.value, updatedAt: new Date().toISOString() } });
    };
    const saved = localData.get(savedFiltersKey, {})?.comparison;
    const hasJourneyParameters = ['curso', 'uf', 'cota'].some((name) => new URLSearchParams(window.location.search).has(name));
    const restore = () => {
      if (!saved || hasJourneyParameters) return;
      course.value = saved.course || '';
      if ([...state.options].some((option) => option.value === saved.state)) state.value = saved.state || '';
      if ([...quota.options].some((option) => option.value === saved.quota)) quota.value = saved.quota || '';
      if (note && (saved.course || saved.state || saved.quota)) note.text.firstChild.textContent = 'Filtros recuperados neste navegador. ';
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', restore, { once: true });
    else window.setTimeout(restore, 0);
    [course, state, quota].forEach((field) => {
      field.addEventListener('change', save);
      field.addEventListener('input', save);
    });
    form.addEventListener('submit', () => {
      save();
      window.setTimeout(() => {
        if (document.getElementById('results')?.hidden) return;
        recordActivity('Comparação de notas', course.value || 'Notas do Enem', 'comparar-notas.html', [state.value, quota.selectedOptions[0]?.textContent].filter(Boolean).join(' · '));
      }, 0);
    });
    note?.clear.addEventListener('click', () => {
      const stored = localData.get(savedFiltersKey, {});
      if (stored && typeof stored === 'object') {
        delete stored.comparison;
        localData.set(savedFiltersKey, stored);
      }
      note.text.firstChild.textContent = 'Filtros salvos removidos deste navegador. ';
    });
  };

  const addActivityTracking = () => {
    if (currentPage === 'comparar-faculdades.html') {
      const form = document.getElementById('compareForm');
      form?.addEventListener('submit', () => {
        const course = document.getElementById('course')?.value || 'Faculdades públicas';
        const institutions = ['institution1', 'institution2', 'institution3'].map((id) => document.getElementById(id)?.value).filter(Boolean).join(' · ');
        window.setTimeout(() => {
          if (!document.getElementById('results')?.hidden) recordActivity('Comparação de faculdades', course, 'comparar-faculdades.html', institutions);
        }, 0);
      });
    }
    if (currentPage === 'calendario-vestibulando.html') {
      document.querySelectorAll('[data-filter], .filter, .filter-button').forEach((button) => {
        button.addEventListener('click', () => {
          const label = normalText(button.textContent);
          if (label) recordActivity('Calendário consultado', label, 'calendario-vestibulando.html', 'Calendário de vestibulares');
        });
      });
    }
    if (currentPage === 'cadernos.html') {
      document.getElementById('newNotebook')?.addEventListener('click', () => recordActivity('Cadernos', 'Criou ou abriu um novo caderno', 'cadernos.html', 'Cadernos livres'));
      document.getElementById('bookGrid')?.addEventListener('click', (event) => {
        const card = event.target.closest('[data-book]');
        if (card) recordActivity('Cadernos', card.querySelector('h3')?.textContent || 'Caderno aberto', 'cadernos.html', 'Cadernos livres');
      });
    }
  };

  const addStudentTimeline = () => {
    if (currentPage !== 'minha-jornada.html') return;
    const member = document.getElementById('memberView');
    const overview = member?.querySelector('.overview');
    if (!member || !overview || document.getElementById('orion-student-timeline')) return;
    const section = document.createElement('section');
    section.id = 'orion-student-timeline';
    section.className = 'orion-student-timeline';
    const header = document.createElement('div');
    header.className = 'orion-student-timeline-head';
    const intro = document.createElement('div');
    const eyebrow = document.createElement('span');
    eyebrow.className = 'eyebrow';
    eyebrow.style.color = '#a77a34';
    eyebrow.textContent = 'Sua linha do tempo';
    const title = document.createElement('h2');
    title.textContent = 'Retome suas consultas.';
    intro.append(eyebrow, title);
    const copy = document.createElement('p');
    copy.textContent = 'Pesquisas, comparações, calendário e cadernos usados neste navegador. Não inclui notas nem outros dados pessoais.';
    header.append(intro, copy);
    const list = document.createElement('div');
    list.className = 'orion-timeline-list';
    section.append(header, list);
    overview.insertAdjacentElement('afterend', section);

    const iconByType = { 'Pesquisa salva': '⌕', 'Comparação de notas': '≈', 'Comparação de faculdades': '⇄', 'Calendário consultado': '◫', Cadernos: '✎' };
    const render = () => {
      list.replaceChildren();
      const records = readActivities();
      if (!records.length) {
        const empty = document.createElement('div');
        empty.className = 'orion-timeline-empty';
        empty.textContent = 'Quando você consultar vagas, comparar opções, abrir o calendário ou usar os cadernos, os atalhos mais recentes aparecerão aqui.';
        list.append(empty);
        return;
      }
      records.forEach((record) => {
        const link = document.createElement('a');
        link.className = 'orion-timeline-item';
        link.href = record.href;
        const icon = document.createElement('span');
        icon.className = 'orion-timeline-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.textContent = iconByType[record.type] || '✦';
        const content = document.createElement('span');
        content.className = 'orion-timeline-copy';
        const name = document.createElement('b');
        name.textContent = record.title;
        const detail = document.createElement('span');
        detail.textContent = [record.type, record.detail].filter(Boolean).join(' · ');
        content.append(name, detail);
        const time = document.createElement('time');
        time.dateTime = record.updatedAt;
        time.textContent = formatActivityDate(record.updatedAt);
        link.append(icon, content, time);
        list.append(link);
      });
    };
    window.addEventListener('orion:activity-updated', render);
    render();
  };

  const addIntegratedCourseFinder = () => {
    if (currentPage !== 'carreiras.html' || document.getElementById('orion-course-finder')) return;
    const offers = Array.isArray(window.SISU_2026_NACIONAL?.ofertas) ? window.SISU_2026_NACIONAL.ofertas : [];
    const publicInstitutions = Array.isArray(window.INSTITUICOES_PUBLICAS_2024) ? window.INSTITUICOES_PUBLICAS_2024 : [];
    const main = document.querySelector('main');
    const anchor = document.querySelector('.area-summary');
    if (!main || !anchor || !offers.length) return;

    document.title = 'Profissões e faculdades públicas — Orion Academy';
    const heroTitle = document.querySelector('.hero h1');
    const heroCopy = document.querySelector('.hero p');
    if (heroTitle) heroTitle.textContent = 'Profissões, cursos e faculdades públicas.';
    if (heroCopy) heroCopy.textContent = 'Conheça áreas de estudo e localize, no mesmo lugar, ofertas de cursos e instituições públicas por estado e faculdade.';

    const make = (tag, className, text) => {
      const node = document.createElement(tag);
      if (className) node.className = className;
      if (text) node.textContent = text;
      return node;
    };
    const section = make('section', 'orion-course-finder');
    section.id = 'orion-course-finder';
    const head = make('div', 'orion-course-finder-head');
    const intro = document.createElement('div');
    const eyebrow = make('span', 'eyebrow', 'Pesquisa integrada');
    eyebrow.style.color = '#a77a34';
    const title = make('h2', '', 'Encontre curso, estado e faculdade.');
    intro.append(eyebrow, title);
    head.append(intro, make('p', '', 'Escolha um curso, uma UF e, se desejar, uma faculdade. Os resultados usam as ofertas carregadas da chamada regular do Sisu 2026.'));
    const fields = make('div', 'orion-course-fields');
    const buildField = (labelText, control) => {
      const label = make('label', '', labelText);
      label.append(control);
      fields.append(label);
    };
    const course = document.createElement('input');
    course.type = 'search'; course.id = 'orionFinderCourse'; course.placeholder = 'Ex.: Medicina'; course.setAttribute('list', 'orionFinderCourses');
    const courseList = document.createElement('datalist');
    courseList.id = 'orionFinderCourses';
    [...new Set(offers.map((offer) => offer.curso).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR')).forEach((name) => {
      const option = document.createElement('option'); option.value = name; courseList.append(option);
    });
    const state = document.createElement('select'); state.id = 'orionFinderState';
    const allStates = make('option', '', 'Todos os estados'); allStates.value = ''; state.append(allStates);
    [...new Set(offers.map((offer) => offer.uf).filter(Boolean))].sort().forEach((uf) => { const option = make('option', '', uf); option.value = uf; state.append(option); });
    const institution = document.createElement('select'); institution.id = 'orionFinderInstitution';
    buildField('Curso ou profissão', course); buildField('Estado', state); buildField('Faculdade pública', institution);
    const result = make('div', 'orion-course-result');
    const action = make('a', 'orion-course-action', 'Abrir consulta completa de vagas →');
    action.href = 'plano-sisu.html';
    section.append(head, fields, courseList, result, action);
    anchor.insertAdjacentElement('beforebegin', section);

    const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
    const updateInstitutions = () => {
      const previous = institution.value;
      institution.replaceChildren();
      const all = make('option', '', state.value ? 'Todas as faculdades do estado' : 'Escolha primeiro um estado'); all.value = ''; institution.append(all);
      institution.disabled = !state.value;
      const names = [...new Set([
        ...offers.filter((offer) => !state.value || offer.uf === state.value).map((offer) => offer.instituicao),
        ...publicInstitutions.filter((item) => state.value && item.uf === state.value).map((item) => item.nome)
      ].filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      names.forEach((name) => { const option = make('option', '', name); option.value = name; institution.append(option); });
      if ([...institution.options].some((option) => option.value === previous)) institution.value = previous;
    };
    const render = () => {
      const courseQuery = normalize(course.value);
      const matches = offers.filter((offer) => (!courseQuery || normalize(offer.curso).includes(courseQuery)) && (!state.value || offer.uf === state.value) && (!institution.value || offer.instituicao === institution.value));
      result.replaceChildren();
      if (!courseQuery && !state.value && !institution.value) {
        result.append(make('div', 'orion-course-empty', 'Comece escolhendo uma profissão, um estado ou uma faculdade para ver as ofertas disponíveis.'));
      } else if (!matches.length) {
        result.append(make('div', 'orion-course-empty', 'Nenhuma oferta do Sisu 2026 foi localizada com estes filtros. Isso não significa que o curso ou a instituição não existam: confira o edital e outras formas de ingresso.'));
      } else {
        matches.slice(0, 12).forEach((offer) => {
          const card = make('article', 'orion-offer');
          card.append(make('b', '', offer.curso || 'Curso'), make('span', '', [offer.instituicao, offer.sigla, offer.campus, offer.cidade, offer.uf].filter(Boolean).join(' · ')));
          result.append(card);
        });
        if (matches.length > 12) result.append(make('div', 'orion-course-empty', `${matches.length} ofertas encontradas. Mostramos as primeiras 12; abra a consulta completa para ver todas.`));
      }
      const params = new URLSearchParams();
      if (course.value.trim()) params.set('curso', course.value.trim());
      if (state.value) params.set('uf', state.value);
      if (institution.value) params.set('instituicao', institution.value);
      action.href = `plano-sisu.html${params.size ? `?${params}` : ''}`;
      const locationParams = new URLSearchParams(window.location.search);
      ['curso', 'uf', 'instituicao'].forEach((key) => locationParams.delete(key));
      params.forEach((value, key) => locationParams.set(key, value));
      window.history.replaceState(null, '', `carreiras.html${locationParams.size ? `?${locationParams}` : ''}${window.location.hash}`);
    };
    const params = new URLSearchParams(window.location.search);
    if (params.get('curso')) course.value = params.get('curso');
    if ([...state.options].some((option) => option.value === params.get('uf'))) state.value = params.get('uf');
    updateInstitutions();
    if ([...institution.options].some((option) => option.value === params.get('instituicao'))) institution.value = params.get('instituicao');
    [course, institution].forEach((field) => field.addEventListener('input', render));
    state.addEventListener('change', () => { updateInstitutions(); render(); });
    main.addEventListener('click', (event) => {
      const card = event.target.closest('.career');
      if (!card || event.target.closest('a,button,summary,input,select')) return;
      const careerName = card.querySelector('h3')?.textContent?.trim();
      if (!careerName) return;
      course.value = careerName; render(); section.scrollIntoView({ behavior: 'smooth', block: 'start' }); course.focus();
    });
    render();
  };

  const addErrorNotebookToQuestions = () => {
    if (currentPage !== 'questoes-enem.html' || document.getElementById('caderno-erros')) return;
    const sessions = Array.isArray(window.AQUILES_ENEM_OFICIAL?.sessions) ? window.AQUILES_ENEM_OFICIAL.sessions : [];
    const target = document.querySelector('.practice');
    if (!sessions.length || !target) return;
    const section = document.createElement('section');
    section.id = 'caderno-erros';
    section.className = 'orion-error-notebook';
    section.setAttribute('aria-labelledby', 'orion-error-title');
    const head = document.createElement('div'); head.className = 'orion-error-notebook-head';
    const intro = document.createElement('div');
    const eyebrow = document.createElement('span'); eyebrow.className = 'eyebrow'; eyebrow.style.color = '#9b4d45'; eyebrow.textContent = 'Revisão da sua prática';
    const title = document.createElement('h2'); title.id = 'orion-error-title'; title.textContent = 'Caderno de erros.';
    intro.append(eyebrow, title);
    const copy = document.createElement('p'); copy.textContent = 'Depois de corrigir uma sessão, as questões erradas e em branco aparecem aqui. Tudo fica apenas neste navegador.';
    head.append(intro, copy);
    const summary = document.createElement('div'); summary.className = 'orion-error-summary';
    const list = document.createElement('div'); list.className = 'orion-error-list';
    section.append(head, summary, list);
    target.insertAdjacentElement('afterend', section);

    const getSaved = (key) => { try { const item = JSON.parse(localStorage.getItem(key) || '{}'); return item && typeof item === 'object' ? item : {}; } catch (_) { return {}; } };
    const render = () => {
      const reports = sessions.map((session) => {
        const saved = getSaved(`orion-enem-2022-${session.id}`);
        if (!saved.corrected) return null;
        const answers = saved.answers && typeof saved.answers === 'object' ? saved.answers : {};
        const pending = [], wrong = [];
        session.answers.forEach((answer, index) => {
          if (answer === '*') return;
          const selected = answers[index];
          if (!selected) pending.push(session.firstQuestion + index);
          else if (selected !== answer) wrong.push(session.firstQuestion + index);
        });
        return { session, pending, wrong };
      }).filter(Boolean);
      const errors = reports.reduce((total, report) => total + report.pending.length + report.wrong.length, 0);
      const pending = reports.reduce((total, report) => total + report.pending.length, 0);
      summary.replaceChildren();
      [[reports.length, 'sessões corrigidas'], [errors, 'questões para revisar'], [pending, 'deixadas em branco']].forEach(([value, label]) => {
        const card = document.createElement('div'); const number = document.createElement('b'); number.textContent = value; const text = document.createElement('span'); text.textContent = label; card.append(number, text); summary.append(card);
      });
      list.replaceChildren();
      if (!reports.length) {
        const empty = document.createElement('div'); empty.className = 'orion-error-empty'; empty.textContent = 'Seu caderno aparecerá aqui depois que você finalizar e corrigir uma sessão oficial.'; list.append(empty); return;
      }
      reports.forEach(({ session, pending: blank, wrong }) => {
        const entry = document.createElement('article'); entry.className = 'orion-error-entry';
        const heading = document.createElement('b'); heading.textContent = `${session.label} · ${session.area}`;
        const detail = document.createElement('span'); detail.textContent = `${wrong.length} erro(s) e ${blank.length} em branco.`;
        entry.append(heading, detail);
        [...wrong.map((number) => `Q${number} · erro`), ...blank.map((number) => `Q${number} · em branco`)].forEach((label) => { const tag = document.createElement('em'); tag.textContent = label; entry.append(tag); });
        list.append(entry);
      });
    };
    document.getElementById('finish')?.addEventListener('click', () => window.setTimeout(render, 0));
    document.getElementById('restart')?.addEventListener('click', () => window.setTimeout(render, 0));
    render();
  };

  const addEnemCountdownToTimer = () => {
    if (currentPage !== 'cronometro-estudos.html' || document.getElementById('countdown-enem')) return;
    const anchor = document.querySelector('.constellation-card') || document.querySelector('main > section');
    if (!anchor) return;
    const section = document.createElement('section'); section.id = 'countdown-enem'; section.className = 'orion-enem-countdown';
    const head = document.createElement('div'); head.className = 'orion-enem-countdown-head';
    const intro = document.createElement('div'); const eyebrow = document.createElement('span'); eyebrow.className = 'eyebrow'; eyebrow.style.color = '#a77a34'; eyebrow.textContent = 'Enem 2026 · horário de Brasília'; const title = document.createElement('h2'); title.textContent = 'Countdown ENEM'; intro.append(eyebrow, title);
    const description = document.createElement('p'); description.id = 'orionCountdownDescription'; head.append(intro, description);
    const clock = document.createElement('div'); clock.className = 'orion-countdown-clock';
    const fields = {};
    [['days', 'dias'], ['hours', 'horas'], ['minutes', 'minutos'], ['seconds', 'segundos']].forEach(([key, label]) => { const unit = document.createElement('div'); unit.className = 'orion-countdown-unit'; const value = document.createElement('b'); value.textContent = '00'; const text = document.createElement('span'); text.textContent = label; unit.append(value, text); clock.append(unit); fields[key] = value; });
    const days = document.createElement('div'); days.className = 'orion-countdown-days';
    [['1º dia · 8 de novembro', 'Linguagens, Humanas e Redação'], ['2º dia · 15 de novembro', 'Natureza e Matemática']].forEach(([heading, detail]) => { const card = document.createElement('div'); const strong = document.createElement('b'); strong.textContent = heading; const text = document.createElement('span'); text.textContent = detail; card.append(strong, text); days.append(card); });
    section.append(head, clock, days); anchor.insertAdjacentElement('beforebegin', section);
    const first = new Date('2026-11-08T13:30:00-03:00'); const second = new Date('2026-11-15T13:30:00-03:00'); const secondEnd = new Date('2026-11-15T18:30:00-03:00');
    const update = () => {
      const now = new Date(); const target = now < first ? first : now < second ? second : null; const labels = now < first ? 'Faltam para o 1º dia do Enem.' : now < second ? 'A contagem agora segue para o 2º dia do Enem.' : now < secondEnd ? 'Hoje é o 2º dia do Enem.' : 'O Enem 2026 foi concluído.';
      description.textContent = labels;
      const total = target ? Math.max(0, Math.floor((target - now) / 1000)) : 0;
      fields.days.textContent = String(Math.floor(total / 86400)).padStart(2, '0'); fields.hours.textContent = String(Math.floor(total % 86400 / 3600)).padStart(2, '0'); fields.minutes.textContent = String(Math.floor(total % 3600 / 60)).padStart(2, '0'); fields.seconds.textContent = String(total % 60).padStart(2, '0');
    };
    update(); window.setInterval(update, 1000);
  };

  const addPrintTools = () => {
    const printablePages = new Set(['plano-estudos.html', 'plano-sisu.html', 'comparar-notas.html', 'comparar-faculdades.html', 'calendario-vestibulando.html', 'calendario-pessoal.html', 'listas-espera-rj.html', 'painel-bolsas.html', 'painel-controle.html', 'estude-no-exterior.html']);
    const main = document.querySelector('main');
    if (!printablePages.has(currentPage) || !main || document.querySelector('.orion-print-toolbar')) return;
    const toolbar = document.createElement('div');
    toolbar.className = 'orion-print-toolbar';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'orion-print-button';
    button.textContent = '⎙ Imprimir ou salvar em PDF';
    button.addEventListener('click', () => {
      const results = document.getElementById('results');
      document.body.classList.toggle('orion-print-results', Boolean(results && !results.hidden) || currentPage === 'calendario-pessoal.html');
      window.print();
    });
    window.addEventListener('afterprint', () => document.body.classList.remove('orion-print-results'));
    toolbar.append(button);
    main.prepend(toolbar);
  };

  injectMenuStyles();
  normalizeHeaders();
  addHeaderSearch();
  injectProfessionalStyles();
  addDataTrustPanel();
  refreshAutomaticSourceReview();
  refreshHomeHub();
  setupSisuSavedFilters();
  setupComparisonSavedFilters();
  addActivityTracking();
  addStudentTimeline();
  addIntegratedCourseFinder();
  if (currentPage === 'carreiras.html' && !window.SISU_2026_NACIONAL && !document.getElementById('orionLoadCareerOffers')) {
    const target = document.querySelector('#careerContent, main');
    if (target) {
      const notice = document.createElement('section');
      notice.id = 'orionLoadCareerOffers';
      notice.className = 'orion-data-trust';
      notice.setAttribute('aria-label', 'Carregar ofertas nacionais por estado');
      const states = window.ORION_SISU_ESTADOS_DISPONIVEIS || ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
      notice.innerHTML = `<div class="orion-data-trust-copy"><span class="orion-data-trust-kicker">Consulta sob demanda</span><h2>Encontre ofertas por estado e instituição.</h2><p>Escolha um estado para baixar apenas as vagas daquela UF. A consulta nacional continua disponível quando necessária.</p></div><label for="orionCareerState" style="display:grid;gap:6px;color:#17304b;font-size:11px;font-weight:800">Estado da consulta<select id="orionCareerState" data-orion-sisu-state style="min-height:42px;padding:0 12px;border:1px solid #b9893d;border-radius:999px;background:#fff;color:#17304b;font:inherit"><option value="">Escolha um estado</option>${states.map((state) => `<option value="${state}">${state}</option>`).join('')}</select></label><button class="orion-data-trust-action" type="button" data-orion-needs-sisu>Carregar catálogo nacional</button>`;
      target.prepend(notice);
    }
  }
  addErrorNotebookToQuestions();
  addEnemCountdownToTimer();
  addPrintTools();
  injectThemeStyles();
  applyTheme(readTheme());
  addThemeControl();
  if (!document.querySelector('.aq-mobile-login')) {
    const login = document.createElement('a');
    login.className = 'aq-mobile-login';
    login.href = 'minha-jornada.html';
    login.textContent = 'Log in';
    login.setAttribute('aria-label', 'Entrar na sua área do estudante');
    document.body.append(login);
  }
  if (document.querySelector('.aq-menu-toggle')) {
    document.body.classList.add('orion-header-safe');
  }
  if (document.querySelector('header .nav-actions .button')) {
    document.body.classList.add('orion-mobile-actions');
  }
  document.querySelectorAll('a[href="sobre-nos.html"]').forEach((link) => {
    const card = link.closest('.tool, .quick');
    if (card) card.remove();
    else link.remove();
  });
  document.querySelectorAll('.aq-menu-links').forEach((links) => {
    links.replaceChildren();
    const heading = document.createElement('p');
    heading.className = 'aq-menu-index';
    heading.textContent = 'Hub de informações para estudantes';
    links.append(heading);
    const groups = [
      ['Consulta e escolhas', ['Home', 'Buscar informações', 'Profissões e faculdades', 'Vagas e Sisu', 'Comparar faculdades', 'Comparar notas', 'Entenda antes de escolher']],
      ['Vestibulares e calendário', ['Calendário do Vestibulando', 'Vestibulares seriados', 'Listas de espera']],
      ['Ferramentas de estudo', ['Plano de estudos', 'Cronômetro e Countdown ENEM', 'Alimentação e estudos']],
      ['Área do estudante', ['Área do estudante', 'Favoritos e comparações', 'Criar cadastro']],
      ['Outras informações', ['Bolsas e apoios', 'Carreiras militares', 'Estude no Exterior', 'Como usamos as informações', 'Privacidade e seus dados']]
    ];
    const byLabel = new Map(entries.map((entry) => [entry[1], entry]));
    const added = new Set();
    const appendLink = ([href, label, description]) => {
      const link = document.createElement('a');
      link.href = href;
      if (['Buscar informações', 'Vagas e Sisu', 'Área do estudante'].includes(label)) link.classList.add('aq-menu-priority');
      link.append(document.createTextNode(label));
      const detail = document.createElement('small');
      detail.textContent = description;
      link.append(detail);
      if (href.split('?')[0] === currentPage) link.setAttribute('aria-current', 'page');
      links.append(link);
      added.add(label);
    };
    groups.forEach(([title, labels]) => {
      const available = labels.map((label) => byLabel.get(label)).filter(Boolean);
      if (!available.length) return;
      const groupTitle = document.createElement('p');
      groupTitle.className = 'aq-menu-group';
      groupTitle.textContent = title;
      links.append(groupTitle);
      available.forEach(appendLink);
    });
    entries.filter((entry) => !added.has(entry[1])).forEach(appendLink);
  });

  const pagesDropdown = document.querySelector('#pagesDropdown');
  if (pagesDropdown) {
    pagesDropdown.replaceChildren();
    entries.forEach(([href, label]) => {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = label;
      if (href.split('?')[0] === currentPage) link.setAttribute('aria-current', 'page');
      pagesDropdown.append(link);
    });
  }

  if (currentPage === 'minha-jornada.html') {
    const organizerRooms = document.querySelector('.organizer-rooms');
    if (organizerRooms && !organizerRooms.querySelector('a[href="alimentacao-e-estudos.html"]')) {
      const nutritionLink = document.createElement('a');
      nutritionLink.className = 'tool nutrition-tool';
      nutritionLink.href = 'alimentacao-e-estudos.html';
      nutritionLink.setAttribute('aria-label', 'Abrir informações sobre alimentação e estudos');

      const icon = document.createElement('span');
      icon.className = 'tool-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '◒';

      const title = document.createElement('h3');
      title.textContent = 'Alimentação e estudos';
      const description = document.createElement('p');
      description.textContent = 'Consulte a pesquisa do projeto sobre alimentação, hidratação e rotina de estudo.';

      nutritionLink.append(icon, title, description);
      organizerRooms.append(nutritionLink);
    }

    const studyRooms = document.querySelector('.study-rooms');
    studyRooms?.querySelectorAll('a[href="countdown-enem.html"]').forEach((card) => card.remove());
    const timerRoom = studyRooms?.querySelector('a[href="cronometro-estudos.html"]');
    if (timerRoom) {
      timerRoom.setAttribute('aria-label', 'Abrir cronômetro de estudos e Countdown ENEM');
      const title = timerRoom.querySelector('h3');
      const description = timerRoom.querySelector('p');
      if (title) title.textContent = 'Cronômetro e Countdown ENEM';
      if (description) description.textContent = 'Organize blocos de foco e acompanhe a contagem para os dois dias de prova.';
    }
    document.querySelectorAll('.classroom-grid .tool[href="caderno-erros.html"]').forEach((card) => card.remove());
    const choiceRooms = document.querySelector('.choice-rooms');
    choiceRooms?.querySelectorAll('a[href="faculdades-publicas.html"]').forEach((card) => card.remove());
    const careersRoom = choiceRooms?.querySelector('a[href="carreiras.html"]');
    if (careersRoom) {
      careersRoom.setAttribute('aria-label', 'Abrir profissões, cursos e faculdades públicas');
      const title = careersRoom.querySelector('h3');
      const description = careersRoom.querySelector('p');
      if (title) title.textContent = 'Profissões e faculdades';
      if (description) description.textContent = 'Pesquise cursos, estados e instituições públicas em um só lugar.';
    }

    const journeyIllustrations = {
      'calendario-pessoal.html': ['calendario', '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 10h17M8 14h.01M12 14h.01M16 14h.01M8 17.5h.01M12 17.5h.01"/>', '·'],
      'cronometro-estudos.html': ['cronometro', '<circle cx="12" cy="13" r="7.5"/><path d="M12 5.5V3M9 3h6M12 13l3-2.3M18.5 6.5l1.5-1.5"/>', '·'],
      'cadernos.html': ['cadernos', '<path d="M5 4.5h10.5A2.5 2.5 0 0 1 18 7v13H7.5A2.5 2.5 0 0 0 5 22.5v-18Z"/><path d="M5 20.5A2.5 2.5 0 0 1 7.5 18H18M9 8h5M9 12h3"/>', '·'],
      'alimentacao-e-estudos.html': ['nutricao', '<path d="M18.5 4.5c-6.1.2-10.6 3.5-11.6 9.2-.5 2.9 1 5.6 3.9 5.6 5.9 0 8.4-6.8 7.7-14.8Z"/><path d="M5.5 20c2-3.3 5.1-6.1 9.3-8.3"/>', '·'],
      'painel-bolsas.html': ['bolsas', '<path d="M3 10.5 12 5l9 5.5-9 5.5-9-5.5Z"/><path d="M7 13.2V17c2.7 2 7.3 2 10 0v-3.8"/><path d="M21 11v5"/>', '·'],
      'guia-enem.html': ['guia', '<path d="M4.5 5.5h5.7c1.3 0 2.3.7 2.3 1.6v12c0-.9 1-1.6 2.3-1.6h4.7v-12h-4.7c-1.3 0-2.3.7-2.3 1.6"/><path d="M8 9h2.5M15 9h2.5M8 12h2.5M15 12h2.5"/>', '·'],
      'questoes-enem.html': ['questoes', '<rect x="5" y="3.5" width="14" height="17" rx="2"/><path d="M9 3.5h6v3H9zM8.5 12l2 2 4.5-4.5M8.5 17h6"/>', '·'],
      'plano-estudos.html': ['plano', '<path d="M5 5.5h14v13H5zM8.5 9h7M8.5 12h4M8.5 15h2"/><path d="M16.5 14.5v4M14.5 16.5h4"/>', '·'],
      'calendario-vestibulando.html': ['agenda', '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M7.5 3v4M16.5 3v4M3.5 10h17M12 13.2l.8 1.8 2 .2-1.5 1.4.4 2-1.7-1-1.7 1 .4-2-1.5-1.4 2-.2.8-1.8Z"/>', '·'],
      'minhas-escolhas.html': ['escolhas', '<path d="M12 20s-7-4.3-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.7 12 20 12 20Z"/><path d="M12 8V4M10 4h4"/>', '·'],
      'carreiras.html': ['profissoes', '<circle cx="12" cy="12" r="7.5"/><path d="m14.8 9.2-2 3.6-3.6 2 2-3.6 3.6-2ZM12 4.5V3M19.5 12H21M12 19.5V21M4.5 12H3"/>', '·'],
      'faculdades-publicas.html': ['faculdades', '<path d="M3 10.5 12 5l9 5.5M5.5 11.5v7M9 11.5v7M15 11.5v7M18.5 11.5v7M3.5 19.5h17"/><path d="M12 8.5h.01"/>', '·'],
      'comparar-faculdades.html': ['comparar', '<path d="M5 6.5h10M15 3.5l3 3-3 3M19 17.5H9M9 14.5l-3 3 3 3"/>', '·'],
      'comparar-notas.html': ['notas', '<path d="M5 19.5V12M12 19.5V5M19 19.5v-9M3.5 20.5h17M7.5 8.5h9"/>', '·'],
      'plano-sisu.html': ['sisu', '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 16v-3M12 16V9M16 16v-5M7 7.5h4M7 10h2"/>', '·'],
      'listas-espera-rj.html': ['listas', '<path d="M8 6h11M8 12h11M8 18h11"/><circle cx="4.5" cy="6" r=".7" fill="currentColor"/><circle cx="4.5" cy="12" r=".7" fill="currentColor"/><circle cx="4.5" cy="18" r=".7" fill="currentColor"/>', '·'],
      'index.html': ['inicio', '<path d="m4 11 8-7 8 7v9H4v-9Z"/><path d="M9.5 20v-5h5v5"/>', '·'],
      'carreiras-militares.html': ['militares', '<path d="M12 3.5 19 6v5.5c0 4.3-2.7 7.7-7 9-4.3-1.3-7-4.7-7-9V6l7-2.5Z"/><path d="m12 7 1.1 2.4 2.6.3-1.9 1.8.5 2.6-2.3-1.3-2.3 1.3.5-2.6-1.9-1.8 2.6-.3L12 7Z"/>', '·'],
      'estude-no-exterior.html': ['exterior', '<circle cx="12" cy="12" r="8.5"/><path d="M3.8 12h16.4M12 3.5c2.2 2.3 3.3 5.1 3.3 8.5S14.2 18.2 12 20.5c-2.2-2.3-3.3-5.1-3.3-8.5S9.8 5.8 12 3.5"/>', '·'],
      'privacidade.html': ['privacidade', '<rect x="5.5" y="10" width="13" height="10" rx="2"/><path d="M8.5 10V7.5a3.5 3.5 0 0 1 7 0V10M12 14v2"/>', '·']
    };

    const decorateJourneyTools = () => {
      document.querySelectorAll('.classroom-grid .tool').forEach((card) => {
        const href = (card.getAttribute('href') || '').split(/[?#]/)[0];
        const [topic, paths, accent] = journeyIllustrations[href] || ['informacoes', '<circle cx="12" cy="12" r="7"/><path d="M12 8v4l2.5 2"/>', '·'];
        const icon = card.querySelector('.tool-icon');
        if (!icon) return;

        card.dataset.illustration = topic;
        icon.classList.add('tool-illustration');
        icon.replaceChildren();

        const mainSymbol = document.createElement('span');
        mainSymbol.className = 'tool-symbol';
        const drawing = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        drawing.setAttribute('viewBox', '0 0 24 24');
        drawing.setAttribute('aria-hidden', 'true');
        drawing.innerHTML = paths;
        mainSymbol.append(drawing);
        const accentSymbol = document.createElement('span');
        accentSymbol.className = 'tool-accent';
        accentSymbol.textContent = accent;
        icon.append(mainSymbol, accentSymbol);
      });
    };

    requestAnimationFrame(decorateJourneyTools);
  }

  const hubCopy = [
    ['Voltar à minha jornada', 'Voltar à área do estudante'],
    ['Voltar para a minha jornada', 'Voltar para a área do estudante'],
    ['Minha jornada', 'Área do estudante'],
    ['minha jornada', 'área do estudante'],
    ['Teste vocacional e apresentação', 'Hub de informações para estudantes'],
    ['Teste vocacional e caminhos', 'Hub de informações para estudantes'],
    ['Formas de ingresso e caminhos', 'Informações e formas de ingresso'],
    ['Comece sua jornada', 'Acesse informações reunidas'],
    ['Sua jornada começa aqui.', 'Suas informações salvas começam aqui.'],
    ['Sua jornada continua.', 'Suas informações salvas estão aqui.'],
    ['Organize escolhas, acompanhe seus próximos passos e transforme informação em um plano possível.', 'Reúna escolhas, consultas e referências em um só lugar.'],
    ['Plano personalizado', 'Ferramentas de consulta'],
    ['Acesse sua jornada', 'Acesse sua área de informações'],
    ['Entrar na minha jornada', 'Entrar na área do estudante'],
    ['Seu próximo passo', 'Informações para consultar'],
    ['Um hub para acompanhar suas escolhas.', 'Um hub que concentra as informações que importam.'],
    ['Acompanhe as novidades', 'Informações reunidas'],
    ['Vamos te manter informados sobre prazos, provas, editais e conteúdos que fazem parte da sua rotina.', 'Consulte prazos, provas, editais e conteúdos relevantes para a sua rotina de estudo.'],
    ['Tudo para acompanhar sua trajetória de estudo.', 'Informações reunidas para a sua trajetória de estudo.'],
    ['Da pesquisa sobre profissões à comparação de faculdades, a Orion Academy reúne referências para você consultar quando precisar e seguir aprendendo sobre as suas possibilidades.', 'Da pesquisa sobre profissões à comparação de faculdades, a Orion Academy concentra referências para você consultar, comparar e entender as possibilidades disponíveis.'],
    ['Vamos te manter informados em cada etapa.', 'O que você precisa, concentrado em um só lugar.'],
    ['Explore dados, calendários, instituições e ferramentas para acompanhar seus estudos e escolhas com mais contexto.', 'Explore dados, calendários, instituições e ferramentas para pesquisar seus estudos e escolhas com mais contexto.'],
    ['Escolha até três cursos e instituições para que a Orion Academy possa organizar seus próximos passos.', 'Escolha até três cursos e instituições para salvar consultas e comparar informações.'],
    ['Esses dados ficam associados somente à sua conta e ajudam o projeto a apresentar caminhos mais úteis.', 'Esses dados ficam associados somente à sua conta e mantêm escolhas e consultas reunidas.'],
    ['Roteiro da sua jornada', 'Informações salvas na sua conta'],
    ['Roteiro de hoje', 'Consultas de hoje'],
    ['Complete suas escolhas para receber caminhos mais direcionados.', 'Complete suas escolhas para ampliar as comparações disponíveis.'],
    ['Encontre seu caminho.', 'Consulte e compare opções.'],
    ['Faça login para abrir sua área pessoal.', 'Faça login para abrir sua área de informações.'],
    ['Sua jornada está pronta para você.', 'Sua área de informações está pronta.'],
    ['Informações básicas salvas para personalizar a jornada.', 'Informações básicas salvas na sua conta.'],
    ['Você já pode comparar caminhos com mais clareza.', 'Você já pode comparar opções com mais contexto.'],
    ['Acesso confirmado. Abrindo sua jornada…', 'Acesso confirmado. Abrindo sua área de informações…'],
    ['Continue de onde parou.', 'Acesse suas informações salvas.'],
    ['Seu perfil', 'Informações da conta'],
    ['Seu espaço.', 'Suas informações salvas.'],
    ['Planejamento em construção.', 'Consultas em organização.'],
    ['Você não precisa decidir tudo de uma vez. Cada etapa deixa suas escolhas mais claras.', 'Use as consultas e comparações para registrar as opções que deseja analisar.'],
    ['Um passo por vez.', 'Uma consulta por vez.'],
    ['Planeje seu tempo.', 'Organize seu tempo.'],
    ['Estratégia pessoal', 'Ferramentas de estudo'],
    ['Encontre seu caminho', 'Consulte suas opções'],
    ['Amplie seus horizontes.', 'Amplie suas informações.'],
    ['Conheça outros caminhos de formação e os recursos da Orion Academy.', 'Consulte outras formas de formação e os recursos informativos da Orion Academy.'],
    ['Plano de candidatura', 'Vagas e Sisu'],
    ['Seu plano de candidatura', 'Vagas e Sisu'],
    ['Plano de vagas', 'Vagas e Sisu'],
    ['Meu plano de vagas', 'Vagas e Sisu'],
    ['Plano de estudos', 'Temas e pesos de estudo'],
    ['Gerar meu plano', 'Consultar temas e pesos'],
    ['O plano é gerado neste navegador.', 'A consulta é gerada neste navegador.'],
    ['Seu roteiro', 'Informações consultadas'],
    ['O que priorizar agora', 'Temas e referências consultados'],
    ['A Orion Academy orienta;', 'A Orion Academy reúne informações gerais;'],
    ['A Orion Academy apresenta orientação geral', 'A Orion Academy reúne informações gerais'],
    ['Use esta página para se orientar', 'Use esta página para consultar informações gerais'],
    ['caminhos para carreiras militares', 'formas de ingresso em carreiras militares'],
    ['Bolsas e caminhos para cursos concorridos.', 'Bolsas, financiamento e informações de acesso.'],
    ['Rotas para Medicina.', 'Informações sobre acesso a Medicina.'],
    ['Uma estratégia para Medicina.', 'Informações para consultar sobre Medicina.'],
    ['Seu foco', 'Filtro de consulta'],
    ['Mapa de possibilidades', 'Informações disponíveis'],
    ['Plano alternativo responsável', 'Opções alternativas para consultar'],
    ['onde seus planos podem começar.', 'quais instituições estão disponíveis.'],
    ['sua nota conversa com cada oportunidade.', 'sua nota se compara às referências de cada oferta.'],
    ['Escolha com mais clareza', 'Compare informações'],
    ['trilha de estudo', 'guia de estudo'],
    ['Atualize o plano conforme suas dificuldades reais.', 'Atualize sua organização de estudos conforme suas dificuldades reais.'],
    ['campi', 'campus'],
    ['Campi', 'Campus'],
    ['Escolha com mais clareza', 'Compare informações'],
    ['O seu comparativo', 'Comparação de informações'],
    ['Seu comparativo', 'Comparação de informações'],
    ['Seu planejamento', 'Informações salvas'],
    ['Monte seu plano', 'Consulte temas e pesos'],
    ['Montar plano de estudos', 'Consultar temas e pesos'],
    ['Crie uma senha forte para acessar sua jornada na Orion Academy.', 'Crie uma senha forte para acessar sua área de informações na Orion Academy.'],
    ['Depois de criar o cadastro, entre pela sua jornada usando e-mail e senha.', 'Depois de criar o cadastro, entre na área do estudante com e-mail e senha.'],
    ['Volte à sua jornada', 'Volte à área do estudante'],
    ['Sua área pessoal', 'Sua área de informações'],
    ['Sua central pessoal', 'Sua área de informações'],
    ['Tudo o que você salvar aqui fica reunido para facilitar suas escolhas e próximos passos.', 'Tudo o que você salvar aqui fica reunido para facilitar suas consultas e comparações.'],
    ['Vamos abrir sua central pessoal.', 'Abrindo sua área de informações salvas.'],
    ['Vamos começar sua organização.', 'Comece a organizar suas informações.'],
    ['Aproxime-se dos seus objetivos.', 'Consulte informações do seu interesse.'],
    ['Informações básicas salvas para personalizar a jornada.', 'Informações básicas salvas na sua conta.'],
    ['Sua base está organizada.', 'Suas informações salvas estão organizadas.'],
    ['Seu planejamento inicial está organizado.', 'Suas informações salvas estão organizadas.'],
    ['transforme objetivos em um plano de preparação.', 'consulte temas e informações para seus estudos.'],
    ['Inclua a última opção ou explore seu plano de estudos.', 'Inclua a última opção ou consulte temas e pesos de estudo.'],
    ['Ter alternativas ajuda a construir um plano mais realista.', 'Ter alternativas ampliam as informações disponíveis para comparar.'],
    ['Ver plano', 'Consultar']
  ];

  const rewriteHubText = (value) => {
    let text = value;
    hubCopy.forEach(([from, to]) => { text = text.replaceAll(from, to); });
    text = text.replace(/para comparar caminhos com segurança\./g, 'para comparar opções com mais contexto.');
    return text;
  };

  const rewriteHubCopy = (node) => {
    const text = rewriteHubText(node.data);
    if (text !== node.data) node.data = text;
  };

  const rewriteHubAttributes = (element) => {
    ['aria-label', 'title', 'placeholder'].forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      const current = element.getAttribute(attribute);
      const text = rewriteHubText(current);
      if (text !== current) element.setAttribute(attribute, text);
    });
  };

  const normalizeHubCopy = (root = document.body) => {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      rewriteHubCopy(root);
      return;
    }
    if (root.nodeType === Node.ELEMENT_NODE) rewriteHubAttributes(root);
    if (root.querySelectorAll) root.querySelectorAll('[aria-label],[title],[placeholder]').forEach(rewriteHubAttributes);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const tag = node.parentElement?.tagName;
        return ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE'].includes(tag)
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(rewriteHubCopy);
  };

  normalizeHubCopy();
  new MutationObserver((records) => {
    records.forEach((record) => {
      if (record.type === 'characterData') {
        normalizeHubCopy(record.target);
        return;
      }
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) normalizeHubCopy(node);
      });
    });
  }).observe(document.body, { childList: true, characterData: true, subtree: true });

  if (!document.querySelector('script[src="pwa.js"]')) {
    const pwa = document.createElement('script');
    pwa.src = 'pwa.js';
    pwa.async = true;
    document.head.append(pwa);
  }
})();
