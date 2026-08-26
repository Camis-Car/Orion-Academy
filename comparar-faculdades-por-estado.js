(() => {
  const form = document.getElementById('compareForm');
  const courseInput = document.getElementById('course');
  const institutionOptions = document.getElementById('institutionOptions');
  if (!form || !courseInput || !institutionOptions || document.getElementById('compareState')) return;

  const offers = (window.SISU_2026_NACIONAL || { ofertas: [] }).ofertas || [];
  const publicDirectory = Array.isArray(window.INSTITUICOES_PUBLICAS_2024) ? window.INSTITUICOES_PUBLICAS_2024 : [];
  const interstatePresence = Array.isArray(window.INSTITUICOES_COM_OFERTAS_INTERESTADUAIS_SISU_2026) ? window.INSTITUICOES_COM_OFERTAS_INTERESTADUAIS_SISU_2026 : [];
  const unique = values => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const stateField = document.createElement('div');
  stateField.className = 'field modalidade-field';
  const label = document.createElement('label');
  label.htmlFor = 'compareState';
  label.textContent = 'Estado da comparação';
  const select = document.createElement('select');
  select.id = 'compareState';
  select.setAttribute('aria-describedby', 'compareStateHelp');
  const help = document.createElement('small');
  help.id = 'compareStateHelp';
  stateField.append(label, select, help);
  courseInput.closest('.field').after(stateField);

  const states = unique([...publicDirectory.map(item => item.uf), ...offers.map(item => item.uf), ...interstatePresence.map(item => item.uf)]);
  select.add(new Option('Todos os estados', ''));
  states.forEach(uf => select.add(new Option(uf, uf)));
  const requestedUf = new URLSearchParams(location.search).get('uf')?.trim().toUpperCase();
  if (requestedUf && states.includes(requestedUf)) select.value = requestedUf;

  const addOption = (fragment, value) => {
    const option = new Option(value, value);
    fragment.append(option);
  };
  const updateSuggestions = () => {
    const uf = select.value;
    const directoryRows = uf
      ? [...publicDirectory.filter(item => item.uf === uf), ...interstatePresence.filter(item => item.uf === uf)]
      : publicDirectory;
    const stateOffers = uf ? offers.filter(item => item.uf === uf) : offers;
    const institutionNames = unique([...directoryRows.map(item => item.nome), ...stateOffers.map(item => item.instituicao)]);
    const acronyms = unique([...directoryRows.map(item => item.sigla), ...stateOffers.map(item => item.sigla)]);
    const options = document.createDocumentFragment();
    institutionNames.forEach(name => addOption(options, name));
    acronyms.forEach(acronym => addOption(options, acronym));
    institutionOptions.replaceChildren(options);
    if (!uf) {
      help.textContent = 'Mostrando instituições públicas de todo o Brasil e as instituições com oferta no Sisu 2026. Sem estado, os totais abrangem toda a instituição.';
      return;
    }
    const sisuInstitutionCount = unique(stateOffers.map(item => item.instituicao)).length;
    help.textContent = `${uf}: ${unique(directoryRows.map(item => item.nome)).length} instituições públicas no diretório; ${sisuInstitutionCount} com ofertas na chamada regular do Sisu 2026. As vagas e os resultados da comparação usarão este estado.`;
  };

  select.addEventListener('change', updateSuggestions);
  updateSuggestions();
})();
