(() => {
  const entries = [
    ['alimentacao-e-estudos.html', 'Alimentação e estudos', 'Informações sobre hábitos e rotina de estudo'],
    ['index.html?public=1', 'Home', 'Informações e ferramentas para estudantes'],
    ['busca.html', 'Buscar informações', 'Pesquise cursos, faculdades e processos'],
    ['cadastro.html', 'Criar cadastro', 'Reúna consultas e informações salvas'],
    ['minha-jornada.html', 'Área do estudante', 'Consultas, referências e escolhas salvas'],
    ['carreiras.html', 'Profissões', 'Informações sobre áreas e cursos'],
    ['carreiras-militares.html', 'Carreiras militares', 'Editais, critérios e formas de ingresso'],
    ['faculdades-publicas.html', 'Faculdades públicas', 'Instituições em todo o Brasil'],
    ['comparar-faculdades.html', 'Comparar faculdades', 'Compare ofertas, campus e vagas'],
    ['plano-sisu.html', 'Vagas e Sisu', 'Vagas e modalidades do Sisu'],
    ['comparar-notas.html', 'Comparar notas', 'Cálculos e referências do Sisu'],
    ['listas-espera-rj.html', 'Listas de espera', 'Chamadas e processos de ingresso'],
    ['calendario-vestibulando.html', 'Calendário do Vestibulando', 'Datas, provas e segundas fases'],
    ['vestibulares-seriados.html', 'Vestibulares seriados', 'Processos em etapas e fontes oficiais'],
    ['countdown-enem.html', 'Countdown ENEM', 'Contagem regressiva para os dias de prova'],
    ['painel-bolsas.html', 'Bolsas e apoios', 'Informações sobre bolsas e apoios'],
    ['estude-no-exterior.html', 'Estude no Exterior', 'Guias, processos e fontes oficiais'],
    ['entenda-escolhas.html', 'Entenda antes de escolher', 'Cotas, notas, campus e lista de espera'],
    ['favoritos.html', 'Favoritos e comparações', 'Cursos, faculdades e comparações salvas'],
    ['como-usamos-informacoes.html', 'Como usamos as informações', 'Critérios, fontes e limites do hub'],
    ['privacidade.html', 'Privacidade e seus dados', 'Como protegemos suas informações']
  ].sort((first, second) => {
    const priority = { Home: 0, 'Buscar informações': .5, 'Vagas e Sisu': 1, 'Área do estudante': 2, 'Criar cadastro': 3, 'Como usamos as informações': 98, 'Privacidade e seus dados': 99 };
    const firstPriority = priority[first[1]] ?? 4;
    const secondPriority = priority[second[1]] ?? 4;
    if (firstPriority !== secondPriority) return firstPriority - secondPriority;
    return first[1].localeCompare(second[1], 'pt-BR', { sensitivity: 'base' });
  });
  const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  const themeStorageKey = 'orion-theme';
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
      title: 'Profissões e cursos',
      description: 'Os resumos ajudam a conhecer áreas de estudo. As ofertas de curso devem ser confirmadas por instituição, campus, turno e processo seletivo.',
      source: 'Portal Único de Acesso ao Ensino Superior · Sisu',
      url: 'https://sisu.mec.gov.br/',
      button: 'Consultar ofertas no Sisu ↗',
      how: '.controls',
      data: '#careerContent'
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
      @media(max-width:700px){.orion-data-trust{grid-template-columns:1fr;gap:15px;margin-top:18px;padding:18px}.orion-data-trust-action{justify-self:start;white-space:normal}.orion-page-index{align-items:flex-start;flex-direction:column}.orion-page-index b{margin-bottom:2px}.orion-home-updates-inner{grid-template-columns:1fr;padding:20px}.orion-update{grid-template-columns:72px minmax(0,1fr)}}
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
    meta.append(make('span', '', 'Revisado em 31/08/2026'));
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

  const refreshHomeHub = () => {
    if (currentPage !== 'index.html') return;
    document.querySelectorAll('.career-stack a[href="cadernos.html"], .career-stack .career-static').forEach((card) => card.remove());
    document.getElementById('quizLayer')?.remove();
    const grid = document.querySelector('.benefit-grid');
    if (grid && !grid.dataset.orionHubReady) {
      const topics = [
        ['busca.html', '⌕', 'Buscar informações', 'Pesquise cursos, estados, universidades, vestibulares e termos importantes.'],
        ['plano-sisu.html', '◎', 'Vagas e Sisu', 'Consulte ofertas, modalidades e referências da chamada regular.'],
        ['faculdades-publicas.html', '⌘', 'Faculdades públicas', 'Encontre instituições por estado, cidade e administração.'],
        ['carreiras.html', '⌁', 'Profissões e cursos', 'Conheça áreas, cursos e informações para ampliar sua pesquisa.'],
        ['calendario-vestibulando.html', '◈', 'Vestibulares e calendário', 'Acompanhe provas, editais, etapas e processos seriados.'],
        ['plano-estudos.html', '✦', 'Ferramentas de estudo', 'Organize a rotina, registre ideias e priorize conteúdos.']
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

  injectMenuStyles();
  normalizeHeaders();
  addHeaderSearch();
  injectProfessionalStyles();
  addDataTrustPanel();
  refreshHomeHub();
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
    heading.textContent = 'Ferramenta de consulta · Home e opções A–Z';
    links.append(heading);
    entries.forEach(([href, label, description]) => {
      const link = document.createElement('a');
      link.href = href;
      if (['Buscar informações', 'Vagas e Sisu', 'Área do estudante'].includes(label)) link.classList.add('aq-menu-priority');
      link.append(document.createTextNode(label));
      const detail = document.createElement('small');
      detail.textContent = description;
      link.append(detail);
      if (href.split('?')[0] === currentPage) link.setAttribute('aria-current', 'page');
      links.append(link);
    });
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
    if (studyRooms && !studyRooms.querySelector('a[href="countdown-enem.html"]')) {
      const countdownLink = document.createElement('a');
      countdownLink.className = 'tool';
      countdownLink.href = 'countdown-enem.html';
      countdownLink.setAttribute('aria-label', 'Abrir o Countdown ENEM');

      const icon = document.createElement('span');
      icon.className = 'tool-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = '⌛';

      const title = document.createElement('h3');
      title.textContent = 'Countdown ENEM';
      const description = document.createElement('p');
      description.textContent = 'Acompanhe a contagem regressiva para os dois dias de prova do Enem.';

      countdownLink.append(icon, title, description);
      studyRooms.append(countdownLink);
    }

    const journeyIllustrations = {
      'calendario-pessoal.html': ['calendario', '▦', '◷'],
      'cronometro-estudos.html': ['cronometro', '◷', '·'],
      'cadernos.html': ['cadernos', '✎', '▤'],
      'alimentacao-e-estudos.html': ['nutricao', '♧', '◒'],
      'caderno-erros.html': ['revisao', '↻', '✓'],
      'painel-bolsas.html': ['bolsas', '✦', '◌'],
      'guia-enem.html': ['guia', '✦', '▤'],
      'questoes-enem.html': ['questoes', '?', '✓'],
      'plano-estudos.html': ['plano', '↗', '▦'],
      'calendario-vestibulando.html': ['agenda', '◫', '✦'],
      'countdown-enem.html': ['countdown', '⌛', '✦'],
      'minhas-escolhas.html': ['escolhas', '◈', '⌁'],
      'carreiras.html': ['profissoes', '⌁', '✦'],
      'faculdades-publicas.html': ['faculdades', '⌂', '▥'],
      'comparar-faculdades.html': ['comparar', '⇄', '⌂'],
      'comparar-notas.html': ['notas', '≈', '✦'],
      'plano-sisu.html': ['sisu', '◎', '▦'],
      'listas-espera-rj.html': ['listas', '☷', '◷'],
      'index.html': ['inicio', '⌂', '✦'],
      'carreiras-militares.html': ['militares', '★', '⌂'],
      'estude-no-exterior.html': ['exterior', '◎', '✦'],
      'privacidade.html': ['privacidade', '⌘', '✓']
    };

    const decorateJourneyTools = () => {
      document.querySelectorAll('.classroom-grid .tool').forEach((card) => {
        const href = (card.getAttribute('href') || '').split(/[?#]/)[0];
        const [topic, symbol, accent] = journeyIllustrations[href] || ['informacoes', '✦', '·'];
        const icon = card.querySelector('.tool-icon');
        if (!icon) return;

        card.dataset.illustration = topic;
        icon.classList.add('tool-illustration');
        icon.replaceChildren();

        const mainSymbol = document.createElement('span');
        mainSymbol.className = 'tool-symbol';
        mainSymbol.textContent = symbol;
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
