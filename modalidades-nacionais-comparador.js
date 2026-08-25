(() => {
  const quota = document.getElementById('quota');
  const offers = (window.SISU_2026_NACIONAL || { ofertas: [] }).ofertas || [];
  if (!quota || !offers.length) return;
  const current = new URLSearchParams(location.search).get('cota') || quota.value;
  const modes = new Map();
  offers.forEach(offer => (offer.modalidades || []).forEach(mode => {
    if (mode && mode.codigo && !modes.has(mode.codigo)) modes.set(mode.codigo, mode);
  }));
  quota.replaceChildren(new Option('Todas as modalidades', ''));
  [...modes.values()].sort((a, b) => {
    if (a.codigo === 'AC') return -1;
    if (b.codigo === 'AC') return 1;
    return String(a.nome || a.codigo).localeCompare(String(b.nome || b.codigo), 'pt-BR');
  }).forEach(mode => quota.add(new Option(String(mode.codigo) + ' — ' + String(mode.nome || 'Modalidade de concorrência'), mode.codigo)));
  if ([...quota.options].some(option => option.value === current)) quota.value = current;
  const label = document.querySelector('label[for="quota"]');
  if (label) label.textContent = 'Modalidade de referência';
  const updateObjective = () => {
    const objective = document.getElementById('selectedObjective');
    const selectedLabel = quota.options[quota.selectedIndex] && quota.options[quota.selectedIndex].text;
    const genericLabel = objective && [...objective.querySelectorAll('strong')].find(item => item.textContent === 'Modalidade selecionada');
    if (genericLabel && selectedLabel) genericLabel.textContent = selectedLabel;
  };
  updateObjective();
  window.setTimeout(updateObjective, 0);
})();
