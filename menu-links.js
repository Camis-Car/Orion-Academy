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
    style.textContent = '.aq-menu-links .aq-menu-index{margin:0 2px 5px;color:#8a662b;font-size:10px;font-weight:700;letter-spacing:.11em;text-transform:uppercase}.aq-menu-links a:focus-visible{outline:3px solid rgba(217,174,99,.55);outline-offset:2px}.aq-menu-links a{min-height:47px;display:block}';
    document.head.append(style);
  };

  injectMenuStyles();
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
})();
