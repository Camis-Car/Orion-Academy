/* Google Analytics — Orion Academy
 * Mede apenas acessos agregados. Não envie e-mails, nomes ou dados de cadastro
 * para o Google Analytics.
 */
(() => {
  "use strict";

  const measurementId = "G-NKRC7R3XJ5";

  // Evita registrar acessos enquanto o site é aberto localmente no Finder.
  if (location.protocol !== "https:" || window.__orionAnalyticsLoaded) return;
  window.__orionAnalyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId, {
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });

  const tag = document.createElement("script");
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(tag);
})();
