(() => {
  const isSecure = location.protocol === 'https:' || location.hostname === 'localhost';
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  let deferredInstallPrompt = null;

  function addAppMetadata() {
    if (!document.querySelector('link[rel="manifest"]')) {
      const manifest = document.createElement('link');
      manifest.rel = 'manifest';
      manifest.href = 'manifest.webmanifest';
      document.head.append(manifest);
    }
    if (!document.querySelector('meta[name="theme-color"]')) {
      const theme = document.createElement('meta');
      theme.name = 'theme-color';
      theme.content = '#0d1d35';
      document.head.append(theme);
    }
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      const capable = document.createElement('meta');
      capable.name = 'apple-mobile-web-app-capable';
      capable.content = 'yes';
      document.head.append(capable);
    }
    if (!document.querySelector('meta[name="apple-mobile-web-app-title"]')) {
      const title = document.createElement('meta');
      title.name = 'apple-mobile-web-app-title';
      title.content = 'Orion Academy';
      document.head.append(title);
    }
    if (!document.querySelector('link[rel="apple-touch-icon"]')) {
      const icon = document.createElement('link');
      icon.rel = 'apple-touch-icon';
      icon.href = 'orion-icon.svg';
      document.head.append(icon);
    }
  }

  function addInstallStyle() {
    if (document.getElementById('orionInstallStyle')) return;
    const style = document.createElement('style');
    style.id = 'orionInstallStyle';
    style.textContent = '.orion-install-app{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;min-height:46px;margin:18px 0 0;padding:0 13px;border:1px solid #b98c43;color:#17243a;background:#f1cb86;font:700 13px "DM Sans",Arial,sans-serif;cursor:pointer}.orion-install-app:hover{filter:brightness(1.04)}.orion-install-app[hidden]{display:none}.orion-install-app span{font-size:17px;line-height:1}';
    document.head.append(style);
  }

  function createInstallButton() {
    if (isStandalone || document.getElementById('orionInstallApp')) return;
    const panel = document.querySelector('.aq-menu-panel');
    if (!panel) return;
    const button = document.createElement('button');
    button.id = 'orionInstallApp';
    button.className = 'orion-install-app';
    button.type = 'button';
    button.innerHTML = '<span aria-hidden="true">✦</span> Instalar Orion Academy';
    button.addEventListener('click', async () => {
      if (deferredInstallPrompt) {
        deferredInstallPrompt.prompt();
        await deferredInstallPrompt.userChoice;
        deferredInstallPrompt = null;
        button.hidden = true;
        return;
      }
      const iPhone = /iPad|iPhone|iPod/.test(navigator.userAgent);
      window.alert(iPhone ? 'No Safari, toque em Compartilhar e escolha “Adicionar à Tela de Início”. Assim a Orion Academy ficará como um app no seu celular.' : 'Para instalar, abra o menu do seu navegador e escolha “Instalar aplicativo” ou “Adicionar à tela inicial”.');
    });
    const note = panel.querySelector('.aq-menu-note');
    panel.insertBefore(button, note || null);
  }

  addAppMetadata();
  addInstallStyle();
  createInstallButton();

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredInstallPrompt = event;
    const button = document.getElementById('orionInstallApp');
    if (button) button.hidden = false;
  });

  window.addEventListener('appinstalled', () => {
    const button = document.getElementById('orionInstallApp');
    if (button) button.hidden = true;
  });

  if (isSecure && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('service-worker.js').catch(() => {});
    });
  }
})();
