// Medição agregada de acessos do Projeto Aquiles — não envia dados do cadastro.
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
    ['guia-enem.html', 'Guia ENEM', 'Conteúdos por disciplina e fontes oficiais'],
    ['questoes-enem.html', 'Questões Oficiais do ENEM', 'Cadernos do Inep e correção por gabarito oficial'],
    ['minha-jornada.html', 'Minha jornada', 'Seu espaço pessoal no Projeto Aquiles'],
    ['cadastro.html', 'Criar cadastro', 'Comece sua jornada'],
    ['minhas-escolhas.html', 'Minhas escolhas', 'Até três cursos e instituições'],
    ['plano-estudos.html', 'Plano de estudos', 'Prioridades para cada objetivo'],
    ['carreiras.html', 'Profissões', 'Explore áreas e cursos'],
    ['carreiras-militares.html', 'Carreiras militares', 'Formas de ingresso e caminhos'],
    ['faculdades-publicas.html', 'Faculdades públicas', 'Instituições em todo o Brasil'],
    ['comparar-faculdades.html', 'Comparar faculdades', 'Ofertas, campi e vagas'],
    ['plano-sisu.html', 'Seu plano de candidatura', 'Vagas e modalidades do Sisu'],
    ['comparar-notas.html', 'Compare suas notas', 'Compare com referências do Sisu'],
    ['listas-espera-rj.html', 'Listas de espera', 'Chamadas e processos de ingresso'],
    ['calendario-vestibulando.html', 'Calendário do Vestibulando', 'Datas, provas e segundas fases'],
    ['estude-no-exterior.html', 'Estude no Exterior', 'Processos e fontes oficiais'],
    ['sobre-nos.html', 'Nossa História', 'Os criadores e a origem do projeto'],
    ['privacidade.html', 'Aviso de privacidade', 'Como protegemos os dados']
  ];
  const currentPage = decodeURIComponent(location.pathname.split('/').pop() || 'index.html');

  document.querySelectorAll('.aq-menu-links').forEach((links) => {
    links.replaceChildren();
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
