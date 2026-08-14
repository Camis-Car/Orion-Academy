(() => {
  const fileName = decodeURIComponent(location.pathname.split('/').pop() || '');
  const pageClass = fileName === 'guia-enem.html' ? 'orion-guide-focus' : fileName === 'questoes-enem.html' ? 'orion-questions-focus' : '';
  if (!pageClass) return;

  const storageKey = 'orion-modo-foco';
  const style = document.createElement('style');
  style.textContent = `
    .orion-focus-toggle{position:fixed;z-index:1100;right:18px;bottom:18px;display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 15px;border:1px solid #d9ae63;border-radius:999px;background:#0d1d35;color:#fff;box-shadow:0 10px 24px rgba(8,21,38,.28);font:700 12px "DM Sans",Arial,sans-serif;cursor:pointer}
    .orion-focus-toggle:focus-visible{outline:3px solid #e5bf7e;outline-offset:3px}
    .orion-focus-toggle:hover{background:#173a5e}
    .orion-focus-toggle .focus-dot{display:grid;place-items:center;width:19px;height:19px;border:1px solid currentColor;border-radius:50%;font-size:13px;line-height:1}
    .orion-focus-status{position:fixed;left:-9999px;width:1px;height:1px;overflow:hidden}
    body.orion-focus-mode header,body.orion-focus-mode .hero,body.orion-focus-mode footer,body.orion-focus-mode .aq-menu-toggle,body.orion-focus-mode .aq-menu-backdrop{display:none!important}
    body.orion-focus-mode .page{padding-top:76px}
    body.orion-focus-mode.orion-guide-focus .intro,body.orion-focus-mode.orion-guide-focus .sources{display:none}
    body.orion-focus-mode.orion-questions-focus .notice,body.orion-focus-mode.orion-questions-focus .archive{display:none}
    body.orion-focus-mode .area,body.orion-focus-mode .method-card,body.orion-focus-mode .redacao,body.orion-focus-mode .session,body.orion-focus-mode .training,body.orion-focus-mode .source,body.orion-focus-mode .answer-card{box-shadow:0 10px 25px rgba(13,29,53,.06)}
    @media(max-width:640px){.orion-focus-toggle{right:12px;bottom:12px;min-height:42px;padding:0 13px}.orion-focus-toggle .focus-label{font-size:11px}body.orion-focus-mode .page{padding-top:60px}}
  `;
  document.head.append(style);
  document.body.classList.add(pageClass);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'orion-focus-toggle';
  button.innerHTML = '<span class="focus-dot" aria-hidden="true">◐</span><span class="focus-label"></span>';
  button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-describedby', 'orionFocusStatus');

  const status = document.createElement('p');
  status.id = 'orionFocusStatus';
  status.className = 'orion-focus-status';
  status.setAttribute('aria-live', 'polite');

  const savePreference = (active) => {
    try { localStorage.setItem(storageKey, String(active)); } catch (_) { /* O modo foco continua funcionando sem armazenamento. */ }
  };
  const readPreference = () => {
    try { return localStorage.getItem(storageKey) === 'true'; } catch (_) { return false; }
  };
  const setFocus = (active, announce = false) => {
    document.body.classList.toggle('orion-focus-mode', active);
    button.setAttribute('aria-pressed', String(active));
    button.querySelector('.focus-label').textContent = active ? 'Sair do modo foco' : 'Modo foco';
    button.setAttribute('aria-label', active ? 'Sair do modo foco' : 'Ativar modo foco');
    savePreference(active);
    if (announce) status.textContent = active ? 'Modo foco ativado. Cabeçalho e elementos de apoio foram ocultados.' : 'Modo foco desativado. Todos os elementos voltaram a aparecer.';
  };

  const saved = readPreference();
  setFocus(saved);
  button.addEventListener('click', () => setFocus(!document.body.classList.contains('orion-focus-mode'), true));
  document.body.append(status, button);
})();
