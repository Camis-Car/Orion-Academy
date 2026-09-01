(() => {
  const source = 'sisu-2026-nacional.js';
  const parameter = 'orionSisu';
  const query = new URLSearchParams(location.search);
  const needsCatalogNow = query.get(parameter) === '1'
    || query.has('curso')
    || query.has('q')
    || query.has('ofertaId')
    || query.get('abrirNotas') === '1'
    || location.pathname.endsWith('/painel-controle.html');

  const load = () => {
    if (window.SISU_2026_NACIONAL) return Promise.resolve(window.SISU_2026_NACIONAL);
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

  window.orionLoadSisuCatalog = load;

  if (needsCatalogNow) {
    // Mantém compatibilidade com as páginas que iniciam resultados a partir da URL.
    document.write('<script src="' + source + '"><' + '/script>');
    return;
  }

  const activateCatalog = (event) => {
    const control = event.target.closest('input, select, textarea, button[data-orion-needs-sisu]');
    if (!control || control.disabled || control.readOnly) return;
    if (!control.matches('button[data-orion-needs-sisu]')) {
      const form = control.closest('form');
      if (!form || !form.matches('#planForm, #comparisonForm, #compareForm, #choicesForm, #studyForm, #searchForm')) return;
    }
    document.removeEventListener('focusin', activateCatalog, true);
    document.removeEventListener('pointerdown', activateCatalog, true);
    const next = new URL(location.href);
    next.searchParams.set(parameter, '1');
    location.replace(next.toString());
  };

  // A página abre sem transferir 14 MB. Ao começar uma consulta de Sisu, a base
  // é carregada uma única vez para aquela tela, preservando os filtros da URL.
  document.addEventListener('focusin', activateCatalog, true);
  document.addEventListener('pointerdown', activateCatalog, true);
})();
