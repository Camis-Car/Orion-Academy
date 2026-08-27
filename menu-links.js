(() => {
  const entries = [
    ['alimentacao-e-estudos.html', 'Alimentação e estudos', 'Informações sobre hábitos e rotina de estudo'],
    ['index.html?public=1', 'Home', 'Informações e ferramentas para estudantes'],
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
    ['countdown-enem.html', 'Countdown ENEM', 'Contagem regressiva para os dias de prova'],
    ['painel-bolsas.html', 'Bolsas e apoios', 'Informações sobre bolsas e apoios'],
    ['estude-no-exterior.html', 'Estude no Exterior', 'Guias, processos e fontes oficiais'],
    ['privacidade.html', 'Privacidade e seus dados', 'Como protegemos suas informações']
  ].sort((first, second) => {
    const priority = { Home: 0, 'Vagas e Sisu': 1 };
    const firstPriority = priority[first[1]] ?? 2;
    const secondPriority = priority[second[1]] ?? 2;
    if (firstPriority !== secondPriority) return firstPriority - secondPriority;
    return first[1].localeCompare(second[1], 'pt-BR', { sensitivity: 'base' });
  });
  const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');
  const themeStorageKey = 'orion-theme';

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
      .aq-menu-links a:focus-visible{outline:3px solid rgba(217,174,99,.55);outline-offset:2px}
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

  injectMenuStyles();
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
