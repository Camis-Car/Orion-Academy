(() => {
  const entries = [
    ['index.html', 'Início', 'Teste vocacional e apresentação'],
    ['cadastro.html', 'Criar cadastro', 'Comece sua jornada'],
    ['minha-jornada.html', 'Minha jornada', 'Sua central de estudante'],
    ['guia-enem.html', 'Guia ENEM', 'Conteúdos para revisar por matéria'],
    ['questoes-enem.html', 'Questões oficiais do ENEM', 'Treine com provas e gabaritos'],
    ['plano-estudos.html', 'Plano de estudos', 'Prioridades para cada objetivo'],
    ['caderno-erros.html', 'Caderno de erros', 'Revise erros e dificuldades'],
    ['cronometro-estudos.html', 'Cronômetro de estudos', 'Organize sessões de foco'],
    ['calendario-pessoal.html', 'Meu calendário', 'Planeje sua rotina pessoal'],
    ['minhas-escolhas.html', 'Minhas escolhas', 'Até três cursos e instituições'],
    ['carreiras.html', 'Profissões', 'Explore áreas e cursos'],
    ['carreiras-militares.html', 'Carreiras militares', 'Formas de ingresso e caminhos'],
    ['faculdades-publicas.html', 'Faculdades públicas', 'Instituições em todo o Brasil'],
    ['comparar-faculdades.html', 'Comparar faculdades', 'Ofertas, campi e vagas'],
    ['plano-sisu.html', 'Plano de candidatura', 'Vagas e modalidades do Sisu'],
    ['comparar-notas.html', 'Compare suas notas', 'Compare com referências do Sisu'],
    ['listas-espera-rj.html', 'Listas de espera', 'Chamadas e processos de ingresso'],
    ['calendario-vestibulando.html', 'Calendário do Vestibulando', 'Datas, provas e segundas fases'],
    ['painel-bolsas.html', 'Bolsas e apoios', 'Organize oportunidades de bolsa'],
    ['estude-no-exterior.html', 'Estude no Exterior', 'Processos e fontes oficiais'],
    ['sobre-nos.html', 'Nossa História', 'Os criadores e a origem do projeto'],
    ['privacidade.html', 'Privacidade e seus dados', 'Como protegemos suas informações']
  ].sort((first, second) => first[1].localeCompare(second[1], 'pt-BR', { sensitivity: 'base' }));
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
      @media (max-width:700px){
        body{scroll-padding-top:86px}
        /* Reserva espaço real no cabeçalho para os controles fixos. */
        body>header .nav{min-height:70px;padding-right:138px!important}
        body>header.top{padding-right:138px!important}
        body.orion-mobile-actions>header .nav{padding-right:220px!important}
        body.orion-mobile-actions header .nav .brand{flex:0 0 auto;font-size:0!important;gap:0}
        body.orion-mobile-actions header .nav .brand :is(.brand-mark,.mark){margin:0}
        body.orion-mobile-actions header .nav-actions .button{position:fixed!important;z-index:1002;top:12px;right:132px;display:inline-flex!important;min-height:42px!important;margin:0!important;padding:0 9px!important;border-radius:6px!important;white-space:nowrap;font-size:.68rem!important;line-height:1!important}
        body.orion-mobile-actions .menu-toggle{display:none!important}
        html.orion-readable :is(p,li,td,th,blockquote,figcaption,.lead,.description,.subtitle,.helper,.notice,.guide-item span){font-size:.95rem!important;line-height:1.72!important}
        /* Acesso direto à conta, sempre ao lado do menu no topo. */
        .aq-menu-toggle{top:12px!important;right:12px!important;width:42px!important;height:42px!important}
        .aq-mobile-login{position:fixed;z-index:1002;top:12px;right:60px;display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 10px;border:1px solid rgba(255,244,213,.72);border-radius:6px;color:#10213a!important;background:#d9ae63;font-size:.72rem!important;font-weight:800;letter-spacing:.015em;box-shadow:0 8px 20px rgba(8,21,38,.2);white-space:nowrap}
        .aq-mobile-login:hover{color:#10213a!important;background:#edcd90}
        .aq-mobile-login:focus-visible{outline:3px solid rgba(255,255,255,.82)!important;outline-offset:2px}
      }
      @media (max-width:370px){
        body.orion-mobile-actions>header .nav{padding-right:211px!important}
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
  if (document.querySelector('header .nav-actions .button')) {
    document.body.classList.add('orion-mobile-actions');
  }
  document.querySelectorAll('.aq-menu-links').forEach((links) => {
    links.replaceChildren();
    const heading = document.createElement('p');
    heading.className = 'aq-menu-index';
    heading.textContent = 'Todas as opções · A–Z';
    links.append(heading);
    entries.forEach(([href, label, description]) => {
      const link = document.createElement('a');
      link.href = href;
      link.append(document.createTextNode(label));
      const detail = document.createElement('small');
      detail.textContent = description;
      link.append(detail);
      if (href === currentPage) link.setAttribute('aria-current', 'page');
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
      if (href === currentPage) link.setAttribute('aria-current', 'page');
      pagesDropdown.append(link);
    });
  }

  if (!document.querySelector('script[src="pwa.js"]')) {
    const pwa = document.createElement('script');
    pwa.src = 'pwa.js';
    pwa.async = true;
    document.head.append(pwa);
  }
})();
