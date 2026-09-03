(() => {
  const setup = () => {
    if (document.documentElement.dataset.orionAccessibility === 'ready') return;
    document.documentElement.dataset.orionAccessibility = 'ready';
    document.documentElement.classList.add('orion-a11y-ready');

    const style = document.createElement('style');
    style.id = 'orionAccessibilityStyles';
    style.textContent = `
      .orion-skip-link{position:fixed;z-index:10050;top:10px;left:10px;transform:translateY(-180%);padding:12px 16px;border:2px solid #fff;border-radius:10px;color:#081526!important;background:#0d3155;font:800 14px/1.2 Arial,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.28);transition:transform .16s ease}
      .orion-skip-link:focus{transform:translateY(0);outline:3px solid #e8c985;outline-offset:3px}
      .orion-sr-only{position:absolute!important;width:1px!important;height:1px!important;padding:0!important;margin:-1px!important;overflow:hidden!important;clip:rect(0,0,0,0)!important;white-space:nowrap!important;border:0!important}
      .orion-state-label{display:inline-flex!important;align-items:center!important;gap:6px!important;width:max-content!important;max-width:100%!important;margin:0 0 8px!important;padding:4px 8px!important;border:1px solid currentColor!important;border-radius:999px!important;font:800 11px/1.2 Arial,sans-serif!important;letter-spacing:.01em!important}
      .orion-state-label[data-orion-state="information"]{color:#064a79!important;background:#e8f5fc!important}.orion-state-label[data-orion-state="attention"]{color:#6b4100!important;background:#fff3d6!important}.orion-state-label[data-orion-state="error"]{color:#7a1721!important;background:#fdebed!important}.orion-state-label[data-orion-state="success"]{color:#145a35!important;background:#e5f6ec!important}
      .orion-state-symbol{font-size:14px!important;font-weight:900!important}.orion-answer-state{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:16px!important;margin-left:4px!important;font-weight:900!important}.answer[data-orion-outcome="correct"]{border:2px solid #145a35!important;color:#145a35!important;background:#e5f6ec!important}.answer[data-orion-outcome="wrong"]{border:2px solid #7a1721!important;color:#7a1721!important;background:#fdebed!important}.answer[data-orion-outcome="selected"]{border:2px solid #064a79!important;color:#064a79!important;background:#e8f5fc!important}
      table.quota-table,table[class*="quota" i],table[class*="cota" i]{border-collapse:separate;border-spacing:0}table.quota-table :is(th,td),table[class*="quota" i] :is(th,td),table[class*="cota" i] :is(th,td){border-bottom:1px solid #637a90!important}table.quota-table th,table[class*="quota" i] th,table[class*="cota" i] th{color:#102a48!important;background:#e7eff6!important}
      .orion-a11y-ready :focus-visible{outline:3px solid #a96500!important;outline-offset:3px!important;box-shadow:0 0 0 6px rgba(255,244,213,.92)!important}
      .orion-a11y-ready main:focus{outline:none}
      @media (prefers-contrast:more){.orion-a11y-ready a:not(.button),.orion-a11y-ready main a{font-weight:800;text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}.orion-a11y-ready :is(button,input,select,textarea,.button){border:2px solid currentColor!important}.orion-a11y-ready :focus-visible{outline-width:4px!important}}
      @media (prefers-reduced-motion:reduce){html{scroll-behavior:auto!important}.orion-a11y-ready *, .orion-a11y-ready *:before, .orion-a11y-ready *:after{scroll-behavior:auto!important;animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
      @media (pointer:coarse){.orion-a11y-ready :is(button,input,select,textarea,.button,a.aq-mobile-login,.aq-menu-toggle,.aq-menu-close){min-height:44px;min-width:44px}.orion-a11y-ready :is(input,select,textarea){font-size:16px!important}}
    `;
    document.head.append(style);

    const content = document.querySelector('main, [role="main"], #conteudo');
    if (content) {
      if (!content.id) content.id = 'conteudo-principal';
      content.setAttribute('tabindex', '-1');
      if (!document.querySelector('.orion-skip-link')) {
        const skip = document.createElement('a');
        skip.className = 'orion-skip-link';
        skip.href = `#${content.id}`;
        skip.textContent = 'Pular para o conteúdo principal';
        skip.addEventListener('click', () => window.setTimeout(() => content.focus({ preventScroll: true }), 0));
        document.body.insertBefore(skip, document.body.firstChild);
      }
    }

    document.querySelectorAll('a[target="_blank"]').forEach((link) => {
      link.rel = [...new Set(`${link.rel} noopener noreferrer`.trim().split(/\s+/))].join(' ');
      if (!link.querySelector('.orion-sr-only')) {
        const note = document.createElement('span');
        note.className = 'orion-sr-only';
        note.textContent = ' (abre em nova aba)';
        link.append(note);
      }
    });

    const decorateInformation = (root = document) => {
      root.querySelectorAll?.('.notice, .alert, .warning, [role="alert"], [role="status"], [aria-live], .form-error, .form-status, .status').forEach((element) => {
        if (element.querySelector(':scope > .orion-state-label') || !element.textContent.trim()) return;
        const classes = element.className instanceof SVGAnimatedString ? element.className.baseVal : String(element.className || '');
        const text = `${classes} ${element.getAttribute('role') || ''}`.toLowerCase();
        const state = /error|wrong|alert/.test(text) ? 'error' : /warning|warn|attention/.test(text) ? 'attention' : /success|correct/.test(text) ? 'success' : 'information';
        const labels = { information: ['ℹ', 'Informação'], attention: ['!', 'Atenção'], error: ['!', 'Erro'], success: ['✓', 'Confirmado'] };
        const label = document.createElement('span');
        label.className = 'orion-state-label';
        label.dataset.orionState = state;
        label.innerHTML = `<span class="orion-state-symbol" aria-hidden="true">${labels[state][0]}</span><span>${labels[state][1]}</span>`;
        element.insertBefore(label, element.firstChild);
      });
      root.querySelectorAll?.('.answer.correct, .answer.wrong, .answer.selected').forEach((answer) => {
        if (answer.dataset.orionOutcome) return;
        const outcome = answer.classList.contains('correct') ? 'correct' : answer.classList.contains('wrong') ? 'wrong' : 'selected';
        const words = { correct: ['✓', 'correta'], wrong: ['×', 'incorreta'], selected: ['•', 'selecionada'] };
        answer.dataset.orionOutcome = outcome;
        answer.setAttribute('aria-label', `${answer.getAttribute('aria-label') || answer.textContent.trim()}, alternativa ${words[outcome][1]}`);
        const symbol = document.createElement('span');
        symbol.className = 'orion-answer-state';
        symbol.setAttribute('aria-hidden', 'true');
        symbol.textContent = words[outcome][0];
        answer.append(symbol);
      });
      root.querySelectorAll?.('table.quota-table, table[class*="quota" i], table[class*="cota" i]').forEach((table) => {
        if (table.querySelector(':scope > caption')) return;
        const caption = document.createElement('caption');
        caption.className = 'orion-sr-only';
        caption.textContent = 'Vagas e notas por modalidade de concorrência.';
        table.insertBefore(caption, table.firstChild);
      });
    };
    decorateInformation();
    const informationObserver = new MutationObserver((changes) => {
      changes.forEach((change) => change.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) decorateInformation(node);
      }));
    });
    informationObserver.observe(document.body, { childList: true, subtree: true });

    document.querySelectorAll('.aq-menu-backdrop').forEach((menu) => {
      const toggle = document.querySelector(`[aria-controls="${menu.id}"]`);
      menu.setAttribute('role', 'dialog');
      menu.setAttribute('aria-modal', 'true');
      if (!menu.getAttribute('aria-label')) menu.setAttribute('aria-label', 'Menu principal');
      let wasOpen = menu.classList.contains('open');
      const sync = () => {
        const isOpen = menu.classList.contains('open');
        menu.inert = !isOpen;
        menu.setAttribute('aria-hidden', String(!isOpen));
        if (wasOpen && !isOpen && toggle) toggle.focus();
        wasOpen = isOpen;
      };
      sync();
      new MutationObserver(sync).observe(menu, { attributes: true, attributeFilter: ['class'] });
      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Tab' || !menu.classList.contains('open')) return;
        const focusable = [...menu.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')].filter((element) => !element.closest('[aria-hidden="true"]'));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup, { once: true });
  else setup();
})();
