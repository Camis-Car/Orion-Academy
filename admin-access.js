(() => {
  const adminEmail = 'camilaoc14@gmail.com';
  const config = window.PROJETO_AQUILES_SUPABASE || {};
  const privateParts = ['aqMenuToggle', 'adminHeader', 'adminHero', 'adminMain', 'adminFooter']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const style = document.createElement('style');
  style.textContent = `
    .access-gate{min-height:100vh;display:grid;place-items:center;padding:48px 24px;background:radial-gradient(circle at 82% 10%,rgba(98,132,168,.34),transparent 28%),linear-gradient(135deg,#0b192d,#173a5e);color:#fff}
    .access-card{width:min(560px,100%);padding:35px;background:#fff;color:#17243a;border:1px solid rgba(217,174,99,.65);box-shadow:0 20px 50px rgba(5,15,29,.25)}
    .access-card h1{margin:10px 0;color:#0d1d35;font:500 39px/1.12 "Playfair Display",Georgia,serif;letter-spacing:-.04em}.access-card p{color:#667085;font-size:13px;line-height:1.65}
    .access-form{display:grid;grid-template-columns:1fr 1fr auto;gap:10px;margin-top:20px}.access-form input{flex:1;min-width:0;height:44px;padding:0 12px;border:1px solid #ccd5de;border-radius:4px;outline:0}.access-form input:focus{border-color:#a67b36;box-shadow:0 0 0 3px rgba(217,174,99,.14)}
    .access-button{display:inline-grid;place-items:center;min-height:43px;padding:0 14px;border:0;border-radius:4px;background:#d9ae63;color:#19263a;font-size:12px;font-weight:700;cursor:pointer}.access-status{min-height:19px;margin:13px 0 0;color:#a33630;font-size:12px;line-height:1.5}.access-status.success{color:#28735a}.access-site{display:inline-block;margin-top:19px;color:#76551d;font-size:12px;font-weight:700;text-decoration:underline;text-underline-offset:4px}.admin-logout{margin-right:14px;padding:8px 11px;border:1px solid rgba(217,174,99,.55);border-radius:4px;background:transparent;color:#f0c77f;font-size:11px;font-weight:700;cursor:pointer}
    @media(max-width:620px){.access-card{padding:26px}.access-form{grid-template-columns:1fr}.access-form .access-button{width:100%}}
  `;
  document.head.append(style);

  const gate = document.createElement('section');
  gate.className = 'access-gate';
  gate.id = 'adminGate';
  gate.innerHTML = `
    <div class="access-card">
      <span class="eyebrow" style="color:#a77a34">Área restrita</span>
      <h1 id="accessTitle">Verificando acesso…</h1>
      <p id="accessText">Aguarde enquanto confirmamos sua conta na Orion Academy.</p>
      <form class="access-form" id="accessForm" hidden>
        <input id="accessEmail" type="email" autocomplete="email" placeholder="Seu e-mail" required aria-label="Seu e-mail" />
        <input id="accessPassword" type="password" autocomplete="current-password" placeholder="Sua senha" required aria-label="Sua senha" />
        <button class="access-button" type="submit">Entrar</button>
      </form>
      <p class="access-status" id="accessStatus" aria-live="polite"></p>
      <button class="access-button" id="accessSignOut" type="button" hidden>Sair desta conta</button>
      <a class="access-site" href="index.html?public=1">← Voltar ao site público</a>
    </div>`;
  document.body.insertBefore(gate, document.getElementById('adminHeader'));

  const title = document.getElementById('accessTitle');
  const text = document.getElementById('accessText');
  const form = document.getElementById('accessForm');
  const email = document.getElementById('accessEmail');
  const password = document.getElementById('accessPassword');
  const status = document.getElementById('accessStatus');
  const accessSignOut = document.getElementById('accessSignOut');
  const topSignOut = document.getElementById('adminLogout');
  const configured = typeof window.supabase !== 'undefined'
    && /^https:\/\//.test(config.url || '')
    && typeof config.anonKey === 'string'
    && config.anonKey.trim().length > 20;

  if (!configured) {
    title.textContent = 'Acesso administrativo indisponível.';
    text.textContent = 'A conexão segura ainda não foi configurada.';
    return;
  }

  const client = window.supabase.createClient(config.url, config.anonKey);
  const logout = async () => {
    await client.auth.signOut();
    location.reload();
  };
  accessSignOut.addEventListener('click', logout);
  if (topSignOut) topSignOut.addEventListener('click', logout);

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (email.value.trim().toLowerCase() !== adminEmail) { status.textContent = 'Use o e-mail administrativo autorizado.'; return; }
    const button = form.querySelector('button');
    button.disabled = true;
    button.textContent = 'Entrando…';
    status.textContent = '';
    try {
      const { error } = await client.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value
      });
      if (error) throw error;
      status.textContent = 'Acesso confirmado. Abrindo o painel…';
      status.className = 'access-status success';
      window.setTimeout(() => location.reload(), 300);
    } catch (error) {
      status.textContent = error.message || 'E-mail ou senha não conferem.';
      status.className = 'access-status';
      button.disabled = false;
      button.textContent = 'Entrar';
    }
  });

  async function start() {
    const { data: { user }, error } = await client.auth.getUser();
    if (error) throw error;

    if (!user) {
      title.textContent = 'Entre na administração.';
      text.textContent = 'Esta área é restrita à conta autorizada na Orion Academy.';
      form.hidden = false;
      return;
    }

    if (String(user.email || '').toLowerCase() !== adminEmail) {
      title.textContent = 'Acesso não autorizado.';
      text.textContent = 'Esta área é restrita à administração da Orion Academy.';
      accessSignOut.hidden = false;
      return;
    }

    gate.hidden = true;
    privateParts.forEach((element) => { element.hidden = false; });
  }

  start().catch((error) => {
    title.textContent = 'Não foi possível confirmar o acesso.';
    text.textContent = error.message || 'Tente novamente em alguns instantes.';
  });
})();
