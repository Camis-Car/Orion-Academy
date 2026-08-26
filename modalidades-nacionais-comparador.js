(() => {
  const quota = document.getElementById('quota');
  const modes = Array.isArray(window.ORION_MODALIDADES_SISU) ? window.ORION_MODALIDADES_SISU : [];
  if (!quota || !modes.length) return;

  const current = new URLSearchParams(location.search).get('cota') || quota.value;
  quota.replaceChildren(new Option('Todas as modalidades', ''));
  modes.forEach(mode => quota.add(new Option(`${mode.numero}. ${mode.nome}`, mode.codigo)));
  quota.value = modes.some(mode => mode.codigo === current) ? current : 'AC';

  const label = document.querySelector('label[for="quota"]');
  if (label) label.textContent = 'Modalidade de referência (UFRJ 2026)';

  const updateObjective = () => {
    const objective = document.getElementById('selectedObjective');
    const selectedLabel = quota.options[quota.selectedIndex] && quota.options[quota.selectedIndex].text;
    const genericLabel = objective && [...objective.querySelectorAll('strong')].find(item => item.textContent === 'Modalidade selecionada');
    if (genericLabel && selectedLabel) genericLabel.textContent = selectedLabel;
  };

  updateObjective();
  window.setTimeout(updateObjective, 0);
})();
