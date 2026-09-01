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
