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
        font-size:clamp(.875rem,1.05vw,1.05rem)!important;
        line-height:1.7!important;
        letter-spacing:.003em;
      }
      html.orion-readable small{
        font-size:clamp(.75rem,.85vw,.88rem)!important;
        line-height:1.55!important;
      }
      html.orion-readable :is(label,button,input,select,textarea,.button,.aq-menu-links a){
        font-size:clamp(.8125rem,.95vw,.95rem)!important;
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
        html.orion-readable :is(p,li,td,th,blockquote,figcaption,.lead,.description,.subtitle,.helper,.notice,.guide-item span){font-size:.875rem!important;line-height:1.68!important}
        /* Acesso direto à conta, sempre ao lado do menu no topo. */
        .aq-mobile-login{position:fixed;z-index:1002;top:12px;right:68px;display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 14px;border:1px solid rgba(255,244,213,.72);border-radius:6px;color:#10213a!important;background:#d9ae63;font-size:.78rem!important;font-weight:800;letter-spacing:.015em;box-shadow:0 8px 20px rgba(8,21,38,.2)}
        .aq-mobile-login:hover{color:#10213a!important;background:#edcd90}
        .aq-mobile-login:focus-visible{outline:3px solid rgba(255,255,255,.82)!important;outline-offset:2px}
      }
      @media (max-width:370px){
        .aq-mobile-login{right:64px;padding:0 10px;font-size:.72rem!important}
      }
    `;
    document.head.append(style);
    document.documentElement.classList.add('orion-readable');
  };

  injectMenuStyles();
  if (!document.querySelector('.aq-mobile-login')) {
    const login = document.createElement('a');
    login.className = 'aq-mobile-login';
    login.href = 'minha-jornada.html';
    login.textContent = 'Log in';
    login.setAttribute('aria-label', 'Entrar na sua área do estudante');
    document.body.append(login);
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
