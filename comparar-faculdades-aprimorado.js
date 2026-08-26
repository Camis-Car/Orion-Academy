(() => {
  const offers = (window.SISU_2026_NACIONAL || { ofertas: [] }).ofertas || [];
  const form = document.getElementById('compareForm');
  const courseInput = document.getElementById('course');
  const status = document.getElementById('formStatus');
  const results = document.getElementById('results');
  const grid = document.getElementById('summaryGrid');
  const description = document.getElementById('resultDescription');
  if (!form || !courseInput || !offers.length) return;

  const normal = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const publicDirectory = Array.isArray(window.INSTITUICOES_PUBLICAS_2024) ? window.INSTITUICOES_PUBLICAS_2024 : [];
  const number = value => new Intl.NumberFormat('pt-BR').format(Number(value || 0));
  const score = value => Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value).toFixed(2).replace('.', ',') : '—';
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const append = (parent, tag, className, text) => {
    const element = make(tag, className, text);
    parent.append(element);
    return element;
  };
  const unique = values => [...new Set(values.filter(Boolean))];
  const institutions = unique([...offers.map(offer => offer.instituicao), ...publicDirectory.map(institution => institution.nome)]).sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const institutionInputs = [1, 2, 3].map(index => document.getElementById('institution' + index));

  const style = document.createElement('style');
  style.textContent = '.modalidade-field{margin-top:17px}.modalidade-field select{width:100%;height:45px;padding:0 12px;border:1px solid #ccd5de;border-radius:4px;background:#fff;color:#17243a;outline:0}.modalidade-field select:focus{border-color:#a67b36;box-shadow:0 0 0 3px rgba(217,174,99,.14)}.offer-score .mode-vacancies{margin-top:5px;color:#5b6f83}.compare-score-link{display:inline-block;margin-top:9px;color:#76551d;font-size:10px;font-weight:700;text-decoration:underline;text-underline-offset:3px}.course-reference{display:inline-block;margin-top:9px;color:#596b7e;font-size:10px;font-weight:700}.fact{min-width:0}.fact b{word-break:break-word}';
  document.head.append(style);

  const modeField = make('div', 'field modalidade-field');
  const modeLabel = make('label', '', 'Modalidade de referência');
  modeLabel.htmlFor = 'referenceQuota';
  const modeSelect = make('select');
  modeSelect.id = 'referenceQuota';
  modeSelect.setAttribute('aria-describedby', 'referenceQuotaHelp');
  const modeHelp = make('small', '', 'As vagas e notas de corte do curso serão exibidas nesta modalidade. A elegibilidade e os documentos são confirmados no edital da instituição.');
  modeHelp.id = 'referenceQuotaHelp';
  modeField.append(modeLabel, modeSelect, modeHelp);
  courseInput.closest('.field').after(modeField);

  const modeMap = new Map();
  offers.forEach(offer => (offer.modalidades || []).forEach(mode => {
    if (mode && mode.codigo && !modeMap.has(mode.codigo)) modeMap.set(mode.codigo, mode);
  }));
  [...modeMap.values()].sort((a, b) => {
    if (a.codigo === 'AC') return -1;
    if (b.codigo === 'AC') return 1;
    return String(a.nome || a.codigo).localeCompare(String(b.nome || b.codigo), 'pt-BR');
  }).forEach(mode => {
    modeSelect.add(new Option(String(mode.codigo) + ' — ' + String(mode.nome || 'Modalidade de concorrência'), mode.codigo));
  });
  if ([...modeSelect.options].some(option => option.value === 'AC')) modeSelect.value = 'AC';

  const query = new URLSearchParams(location.search);
  const courseFromQuery = query.get('curso');
  if (courseFromQuery && !courseInput.value) courseInput.value = courseFromQuery;
  institutionInputs.forEach((input, index) => {
    const value = query.get('instituicao' + (index + 1));
    if (value && input && !input.value) input.value = value;
  });
  const quotaFromQuery = query.get('cota');
  if (quotaFromQuery && [...modeSelect.options].some(option => option.value === quotaFromQuery)) modeSelect.value = quotaFromQuery;

  const findInstitution = value => {
    const wanted = normal(value);
    return institutions.find(name => normal(name) === wanted) || (offers.find(offer => normal(offer.sigla) === wanted) || {}).instituicao || null;
  };
  const courseMatches = (items, value) => {
    const wanted = normal(value);
    return wanted ? items.filter(offer => {
      const actual = normal(offer.curso);
      return actual === wanted || actual.includes(wanted) || wanted.includes(actual);
    }) : [];
  };
  const selectedState = () => document.getElementById('compareState')?.value || '';
  const modeFor = offer => (offer.modalidades || []).find(mode => mode.codigo === modeSelect.value) || null;
  const createFact = (label, value) => {
    const fact = make('div', 'fact');
    append(fact, 'span', '', label);
    append(fact, 'b', '', value);
    return fact;
  };
  const compareLink = offer => {
    const params = new URLSearchParams({
      curso: offer.curso || '',
      uf: offer.uf || '',
      instituicao: offer.instituicao || '',
      cota: modeSelect.value
    });
    const link = make('a', 'compare-score-link', 'Comparar minha nota nesta oferta →');
    link.href = 'comparar-notas.html?' + params.toString();
    return link;
  };
  const createOffer = offer => {
    const mode = modeFor(offer);
    const item = make('article', 'offer');
    const details = make('div');
    append(details, 'strong', '', offer.curso || 'Curso não informado');
    append(details, 'span', '', [offer.cidade, offer.uf, offer.campus || 'Campus não informado'].filter(Boolean).join(' · '));
    details.append(compareLink(offer));
    const metric = make('div', 'offer-score');
    append(metric, 'b', '', mode ? score(mode.notaCorte) : '—');
    append(metric, 'small', '', mode && Number(mode.notaCorte) > 0 ? 'corte ' + modeSelect.value + ' · 2026' : mode ? 'sem corte publicado' : 'modalidade não ofertada');
    append(metric, 'small', 'mode-vacancies', mode ? number(mode.vagas) + ' vagas ' + modeSelect.value : '— vagas');
    item.append(details, metric);
    return item;
  };
  const createCard = (institution, courseValue) => {
    const scope = selectedState();
    const allInstitutionItems = offers.filter(offer => offer.instituicao === institution);
    const items = scope ? allInstitutionItems.filter(offer => offer.uf === scope) : allInstitutionItems;
    const directoryInstitution = publicDirectory.find(item => normal(item.nome) === normal(institution));
    const campuses = unique(items.map(offer => [offer.cidade, offer.uf, offer.campus || 'Campus não informado'].filter(Boolean).join(' · ')));
    const matches = courseMatches(items, courseValue);
    const card = make('article', 'college-card');
    const top = make('div', 'college-top');
    const heading = make('div');
    append(heading, 'span', 'eyebrow', 'Instituição pública');
    append(heading, 'h3', '', institution);
    append(heading, 'p', '', unique(items.map(offer => offer.sigla)).join(' · ') || directoryInstitution?.sigla || 'Sigla não informada');
    const badge = make('span', 'tag', items.length ? `SiSU 2026${scope ? ` · ${scope}` : ''}` : 'Diretório público');
    top.append(heading, badge);
    const facts = make('div', 'facts');
    facts.append(
      createFact('Cursos ofertados', number(unique(items.map(offer => offer.curso)).length)),
      createFact('Vagas totais', number(items.reduce((sum, offer) => sum + Number(offer.vagas || 0), 0))),
      createFact('Campi / locais', number(campuses.length))
    );
    const courseBox = make('div', 'course-box');
    if (!items.length) {
      const unavailable = make('div', 'no-course');
      const name = make('strong', '', institution);
      unavailable.append(name, document.createTextNode(` está disponível no diretório de instituições públicas, mas não tem oferta na chamada regular do SiSU 2026${scope ? ` em ${scope}` : ''}. Verifique o processo seletivo próprio e o edital da instituição.`));
      courseBox.append(unavailable);
    } else if (courseValue && matches.length) {
      append(courseBox, 'h4', '', courseValue + ' nesta instituição');
      append(courseBox, 'p', '', 'Ofertas encontradas na chamada regular do SiSU 2026.');
      append(courseBox, 'span', 'course-reference', 'Referência: ' + modeSelect.options[modeSelect.selectedIndex].text);
      const list = make('div', 'offer-list');
      matches.forEach(offer => list.append(createOffer(offer)));
      courseBox.append(list);
    } else if (courseValue) {
      const unavailable = make('div', 'no-course');
      const emphasis = make('strong', '', courseValue);
      unavailable.append(emphasis, document.createTextNode(' não apareceu nas ofertas do SiSU 2026 para esta instituição. Isso não confirma a inexistência do curso em outros processos de ingresso.'));
      courseBox.append(unavailable);
    } else {
      append(courseBox, 'h4', '', 'Quer comparar um curso específico?');
      append(courseBox, 'p', '', 'Informe um curso para ver os campi, as vagas e as referências de corte na modalidade escolhida.');
    }
    const source = make('p', 'source');
    const firstSource = items.find(offer => offer.fonteUrl);
    if (firstSource) {
      source.append('Fonte das ofertas: ');
      const link = make('a', '', String(firstSource.fonte || 'documentação oficial do SiSU') + ' ↗');
      link.href = firstSource.fonteUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      source.append(link);
    } else if (directoryInstitution) {
      source.textContent = 'Fonte: diretório de instituições públicas — Censo da Educação Superior 2024.';
    } else {
      source.textContent = 'Fonte: relatório oficial SiSU 2026.';
    }
    card.append(top, facts, courseBox, source);
    return card;
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    event.stopImmediatePropagation();
    const selected = institutionInputs.map(input => findInstitution(input && input.value)).filter(Boolean);
    const uniqueSelected = unique(selected);
    if (!uniqueSelected.length) {
      status.textContent = 'Escolha pelo menos uma instituição da lista de sugestões.';
      results.hidden = true;
      return;
    }
    if (selected.length !== uniqueSelected.length) {
      status.textContent = 'Escolha instituições diferentes para comparar.';
      results.hidden = true;
      return;
    }
    status.textContent = '';
    const courseValue = courseInput.value.trim();
    grid.replaceChildren();
    uniqueSelected.forEach(institution => grid.append(createCard(institution, courseValue)));
    const scope = selectedState();
    description.textContent = courseValue
      ? `Vagas e notas de corte do curso usam a modalidade de referência selecionada${scope ? ` em ${scope}` : ''}. Os totais da instituição seguem o mesmo recorte.`
      : `Os totais mostram a oferta da chamada regular do SiSU 2026${scope ? ` em ${scope}` : ''}. Informe um curso para comparar vagas e cortes por modalidade.`;
    results.hidden = false;
    results.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, true);
})();
