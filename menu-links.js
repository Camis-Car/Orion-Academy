// Medição agregada de acessos da Orion Academy — não envia dados do cadastro.
(() => {
  const measurementId = 'G-NKRC7R3XJ5';
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.append(tag);
})();

(() => {
  const groups = [
    {
      title: 'Comece aqui',
      entries: [
        ['index.html', 'Início', 'Teste vocacional e apresentação'],
        ['cadastro.html', 'Criar cadastro', 'Comece sua jornada'],
        ['minha-jornada.html', 'Minha jornada', 'Sua central de estudante']
      ]
    },
    {
      title: 'Estude e pratique',
      entries: [
        ['guia-enem.html', 'Guia ENEM', 'Conteúdos para revisar por matéria'],
        ['questoes-enem.html', 'Questões oficiais do ENEM', 'Treine com provas e gabaritos'],
        ['plano-estudos.html', 'Plano de estudos', 'Prioridades para cada objetivo'],
        ['caderno-erros.html', 'Caderno de erros', 'Revise erros e dificuldades'],
        ['cronometro-estudos.html', 'Cronômetro de estudos', 'Organize sessões de foco'],
        ['calendario-pessoal.html', 'Meu calendário', 'Planeje sua rotina pessoal']
      ]
    },
    {
      title: 'Escolhas e ingresso',
      entries: [
        ['minhas-escolhas.html', 'Minhas escolhas', 'Até três cursos e instituições'],
        ['carreiras.html', 'Profissões', 'Explore áreas e cursos'],
        ['carreiras-militares.html', 'Carreiras militares', 'Formas de ingresso e caminhos'],
        ['faculdades-publicas.html', 'Faculdades públicas', 'Instituições em todo o Brasil'],
        ['comparar-faculdades.html', 'Comparar faculdades', 'Ofertas, campi e vagas'],
        ['plano-sisu.html', 'Plano de candidatura', 'Vagas e modalidades do Sisu'],
        ['comparar-notas.html', 'Compare suas notas', 'Compare com referências do Sisu'],
        ['listas-espera-rj.html', 'Listas de espera', 'Chamadas e processos de ingresso'],
        ['calendario-vestibulando.html', 'Calendário do Vestibulando', 'Datas, provas e segundas fases']
      ]
    },
    {
      title: 'Oportunidades',
      entries: [
        ['painel-bolsas.html', 'Bolsas e apoios', 'Organize oportunidades de bolsa'],
        ['estude-no-exterior.html', 'Estude no Exterior', 'Processos e fontes oficiais']
      ]
    },
    {
      title: 'Sobre a Orion',
      entries: [
        ['sobre-nos.html', 'Nossa História', 'Os criadores e a origem do projeto'],
        ['privacidade.html', 'Privacidade e seus dados', 'Como protegemos suas informações']
      ]
    }
  ];
  const entries = groups.flatMap((group) => group.entries);
  const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');

  const injectMenuStyles = () => {
    if (document.getElementById('orionMenuNavigationStyles')) return;
    const style = document.createElement('style');
    style.id = 'orionMenuNavigationStyles';
    style.textContent = '.aq-menu-links .aq-menu-group{margin:17px 2px 4px;padding-top:15px;border-top:1px solid #e1e6eb;color:#8a662b;font-size:10px;font-weight:700;letter-spacing:.11em;text-transform:uppercase}.aq-menu-links .aq-menu-group:first-child{margin-top:0;padding-top:0;border-top:0}.aq-menu-links .aq-menu-group+a{margin-top:0}.aq-menu-links a:focus-visible{outline:3px solid rgba(217,174,99,.55);outline-offset:2px}.aq-menu-links a{min-height:47px;display:block}';
    document.head.append(style);
  };

  injectMenuStyles();
  document.querySelectorAll('.aq-menu-links').forEach((links) => {
    links.replaceChildren();
    groups.forEach((group) => {
      const heading = document.createElement('p');
      heading.className = 'aq-menu-group';
      heading.textContent = group.title;
      links.append(heading);
      group.entries.forEach(([href, label, description]) => {
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
})();
