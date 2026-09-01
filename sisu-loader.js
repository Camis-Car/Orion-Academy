(() => {
  const source = 'sisu-2026-nacional.js';
  const stateDirectory = 'sisu-2026-estados';
  const parameter = 'orionSisu';
  const query = new URLSearchParams(location.search);
  const states = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  const stateNames = { acre: 'AC', alagoas: 'AL', amapa: 'AP', amazonas: 'AM', bahia: 'BA', ceara: 'CE', 'distrito federal': 'DF', 'espirito santo': 'ES', goias: 'GO', maranhao: 'MA', 'mato grosso': 'MT', 'mato grosso do sul': 'MS', 'minas gerais': 'MG', para: 'PA', paraiba: 'PB', parana: 'PR', pernambuco: 'PE', piaui: 'PI', 'rio de janeiro': 'RJ', 'rio grande do norte': 'RN', 'rio grande do sul': 'RS', rondonia: 'RO', roraima: 'RR', 'santa catarina': 'SC', 'sao paulo': 'SP', sergipe: 'SE', tocantins: 'TO' };
  const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  const validState = (value) => states.includes(String(value || '').toUpperCase()) ? String(value).toUpperCase() : '';
  const stateFromText = (value) => {
    const text = normalize(value);
    const byName = Object.entries(stateNames).sort(([a], [b]) => b.length - a.length).find(([name]) => text.includes(name));
    if (byName) return byName[1];
    const abbreviation = text.toUpperCase().match(/(?:^|\s)(AC|AL|AM|AP|BA|CE|DF|ES|GO|MA|MG|MS|MT|PA|PB|PE|PI|PR|RJ|RN|RO|RS|SC|SE|SP|TO)(?:$|\s)/);
    return abbreviation ? abbreviation[1] : '';
  };
  const requestedState = validState(query.get('uf')) || stateFromText(query.get('q'));
  const needsCatalogNow = !requestedState && (query.get(parameter) === '1' || query.has('curso') || query.has('ofertaId') || query.get('abrirNotas') === '1' || location.pathname.endsWith('/painel-controle.html'));
  window.ORION_SISU_ESTADOS_DISPONIVEIS = states;

  const load = () => {
    const current = window.SISU_2026_NACIONAL;
    if (current?.escopo === 'nacional' || (current && !current.escopo)) return Promise.resolve(current);
    if (window.__orionSisuLoading) return window.__orionSisuLoading;
    window.__orionSisuLoading = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = source;
      script.onload = () => resolve(window.SISU_2026_NACIONAL);
      script.onerror = () => reject(new Error('Não foi possível carregar a base nacional do Sisu agora.'));
      document.head.append(script);
    });
    return window.__orionSisuLoading;
  };
  const loadState = (state) => {
    const uf = validState(state);
    if (!uf) return Promise.reject(new Error('Escolha um estado válido para consultar as vagas.'));
    if (window.ORION_SISU_ESTADOS?.[uf]) { window.SISU_2026_NACIONAL = window.ORION_SISU_ESTADOS[uf]; return Promise.resolve(window.SISU_2026_NACIONAL); }
    window.__orionSisuStateLoading = window.__orionSisuStateLoading || {};
    if (window.__orionSisuStateLoading[uf]) return window.__orionSisuStateLoading[uf];
    window.__orionSisuStateLoading[uf] = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = `${stateDirectory}/${uf.toLowerCase()}.js`;
      script.onload = () => resolve(window.ORION_SISU_ESTADOS?.[uf] || window.SISU_2026_NACIONAL);
      script.onerror = () => reject(new Error(`Não foi possível carregar a base do Sisu para ${uf} agora.`));
      document.head.append(script);
    });
    return window.__orionSisuStateLoading[uf];
  };
  window.orionLoadSisuCatalog = load;
  window.orionLoadSisuState = loadState;

  if (requestedState) { document.write('<script src="' + stateDirectory + '/' + requestedState.toLowerCase() + '.js"><' + '/script>'); return; }
  if (needsCatalogNow) { document.write('<script src="' + source + '"><' + '/script>'); return; }

  document.querySelectorAll('#planForm #state, #comparisonForm #state').forEach((field) => field.setAttribute('data-orion-sisu-state', ''));

  const draftKey = `orion-sisu-draft:${location.pathname}`;
  const saveDraft = (form) => {
    const values = {};
    form?.querySelectorAll('input[id], select[id], textarea[id]').forEach((control) => { values[control.id] = control.value; });
    try { sessionStorage.setItem(draftKey, JSON.stringify(values)); } catch (_) { /* navegador em modo restrito */ }
  };
  const restoreDraft = () => {
    try {
      const values = JSON.parse(sessionStorage.getItem(draftKey) || 'null');
      if (!values) return;
      Object.entries(values).forEach(([id, value]) => { const control = document.getElementById(id); if (control) control.value = value; });
      sessionStorage.removeItem(draftKey);
    } catch (_) { /* navegador em modo restrito */ }
  };
  window.addEventListener('DOMContentLoaded', restoreDraft, { once: true });
  const openCatalog = (form, state) => {
    if (form) saveDraft(form);
    const next = new URL(location.href);
    next.searchParams.set(parameter, '1');
    if (state) next.searchParams.set('uf', state);
    location.replace(next.toString());
  };
  const activateCatalog = (event) => {
    const control = event.target.closest('input, select, textarea, button[data-orion-needs-sisu]');
    if (!control || control.disabled || control.readOnly) return;
    if (control.matches('select[data-orion-sisu-state]')) {
      const uf = validState(control.value);
      if (uf) openCatalog(control.closest('form'), uf);
      return;
    }
    if (!control.matches('button[data-orion-needs-sisu]')) {
      const form = control.closest('form');
      if (!form || !form.matches('#planForm, #comparisonForm, #compareForm, #choicesForm, #studyForm') || form.querySelector('[data-orion-sisu-state]')) return;
    }
    document.removeEventListener('focusin', activateCatalog, true);
    document.removeEventListener('pointerdown', activateCatalog, true);
    openCatalog(control.closest('form'));
  };
  document.addEventListener('change', activateCatalog, true);
  document.addEventListener('submit', (event) => {
    const form = event.target;
    if (!form.matches?.('#planForm, #comparisonForm, #compareForm, #choicesForm, #studyForm') || window.SISU_2026_NACIONAL) return;
    event.preventDefault();
    openCatalog(form, validState(form.querySelector('[data-orion-sisu-state]')?.value));
  }, true);
  document.addEventListener('focusin', activateCatalog, true);
  document.addEventListener('pointerdown', activateCatalog, true);
})();
