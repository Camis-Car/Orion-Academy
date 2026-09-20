(() => {
  const card = ({ state, institution, name, text, url, label }) => `<article class="program-card" data-orion-serial-update="true"><div class="program-top"><span class="state">${state}</span><span class="institution">${institution}</span></div><h4>${name}</h4><p>${text}</p><a href="${url}" target="_blank" rel="noopener noreferrer">${label} ↗</a></article>`;
  const regionGrid = (title) => [...document.querySelectorAll('.region')].find((section) => section.querySelector('h3')?.textContent.includes(title))?.querySelector('.program-grid');
  const add = (title, details) => {
    const grid = regionGrid(title);
    if (grid && ![...grid.querySelectorAll('h4')].some((heading) => heading.textContent === details.name)) grid.insertAdjacentHTML('beforeend', card(details));
  };

  // A Uniube é privada; o guia desta edição reúne apenas instituições públicas.
  [...document.querySelectorAll('.program-card')].find((item) => item.querySelector('h4')?.textContent === 'PIAS/Uniube')?.setAttribute('hidden', '');
  add('Minas Gerais', {
    state: 'MG', institution: 'Universidade Federal de Viçosa', name: 'PASES/UFV',
    text: 'O Programa de Avaliação Seriada para Ingresso na UFV é composto por três etapas relacionadas ao longo do Ensino Médio e atende os campi de Viçosa, Florestal e Rio Paranaíba.',
    url: 'https://www2.dti.ufv.br/noticias/scripts/exibeNoticiaMulti.php?codNot=45910', label: 'Consultar PASES/UFV'
  });
  add('Paraná', {
    state: 'PR', institution: 'Universidade Estadual do Centro-Oeste', name: 'PAC/Unicentro',
    text: 'O Programa de Avaliação Continuada acompanha o estudante ao longo do Ensino Médio. A escolha de curso ocorre no PAC III, de acordo com o edital da Unicentro.',
    url: 'https://www3.unicentro.br/vestibular/category/destaques/destaques-pac/', label: 'Consultar PAC/Unicentro'
  });
  [...document.querySelectorAll('.coverage-list span')].find((item) => item.querySelector('b')?.textContent === 'PR').innerHTML = '<b>PR</b> · quatro processos';
})();
