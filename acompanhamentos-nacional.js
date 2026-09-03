(() => {
  if (decodeURIComponent(location.pathname.split('/').pop() || 'index.html') !== 'minha-jornada.html') return;

  const config = window.PROJETO_AQUILES_SUPABASE || {};
  if (typeof window.supabase === 'undefined' || !/^https:\/\//.test(config.url || '') || String(config.anonKey || '').trim().length < 21) return;

  const nationalCourse = 'Atualizações nacionais';
  const nationalKey = { curso: nationalCourse, uf: 'BR', instituicao: 'Brasil', campus: 'Nacional', modalidade: 'AC' };
  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const dateLabel = (value) => value ? new Date(`${String(value).slice(0, 10)}T12:00:00`).toLocaleDateString('pt-BR') : 'data não informada';
  let client;
  let user;
  let subscription;
  let updates = [];
  let loadingMessage = '';

  const addStyles = () => {
    if (document.getElementById('orion-national-follow-styles')) return;
    const style = document.createElement('style');
    style.id = 'orion-national-follow-styles';
    style.textContent = `
      .national-follow{position:relative;overflow:hidden;margin:26px 0;padding:28px;border:1px solid #cfb16e;border-radius:18px;color:#f7fbff;background:radial-gradient(circle at 86% 0,rgba(217,174,99,.27),transparent 27%),linear-gradient(125deg,#0b1c33,#17456b);box-shadow:0 16px 32px rgba(13,29,53,.13)}.national-follow:after{content:"";position:absolute;right:-72px;bottom:-110px;width:245px;height:245px;border:1px solid rgba(217,174,99,.38);border-radius:50%}.national-follow>*{position:relative;z-index:1}.national-follow-head{display:flex;align-items:flex-start;justify-content:space-between;gap:18px}.national-follow-kicker{display:inline-flex;align-items:center;gap:7px;color:#f1ce8e;font-size:10px;font-weight:800;letter-spacing:.12em;text-transform:uppercase}.national-follow-kicker:before{content:"◉";font-size:12px}.national-follow h2{max-width:620px;margin:8px 0;color:#fff;font:600 clamp(25px,3vw,35px)/1.1 "Playfair Display",Georgia,serif;letter-spacing:-.03em}.national-follow p{max-width:680px;margin:0;color:#d4e1ec;font-size:13px;line-height:1.65}.national-follow-state{display:inline-flex;align-items:center;gap:7px;padding:8px 10px;border:1px solid rgba(255,255,255,.3);border-radius:999px;color:#e8f7ee;background:rgba(24,105,77,.38);font-size:10px;font-weight:800;white-space:nowrap}.national-follow-state:before{content:"✓"}.national-follow-state.off{color:#f5d59a;background:rgba(96,72,30,.42)}.national-follow-state.off:before{content:"i"}.national-follow-summary{display:grid;grid-template-columns:1fr auto;gap:16px;align-items:center;margin-top:20px;padding:16px;border:1px solid rgba(255,255,255,.18);border-radius:13px;background:rgba(255,255,255,.08)}.national-follow-summary strong{display:block;margin-bottom:3px;color:#fff;font-size:13px}.national-follow-button{min-height:44px;padding:0 16px;cursor:pointer;border:1px solid #e2be77;border-radius:999px;color:#14283f;background:#e2be77;font:800 12px "DM Sans",Arial,sans-serif}.national-follow-button[disabled]{cursor:wait;opacity:.7}.national-follow-status{min-height:18px;margin:10px 0 0;color:#dbe7f0;font-size:11px;line-height:1.5}.national-follow-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:18px}.national-follow-card{min-height:112px;padding:14px;border:1px solid rgba(255,255,255,.17);border-radius:12px;background:rgba(6,22,40,.3)}.national-follow-card span{display:inline-block;margin-bottom:8px;padding:3px 6px;border-radius:999px;color:#172b40;background:#f2d59c;font-size:9px;font-weight:800;text-transform:uppercase}.national-follow-card h3{margin:0 0 5px;color:#fff;font:600 16px/1.2 "Playfair Display",Georgia,serif}.national-follow-card p{font-size:11px}.national-follow-card a{display:inline-block;margin-top:8px;color:#f3cf8c;font-size:10px;font-weight:800;text-decoration:underline;text-underline-offset:3px}.national-follow-empty{grid-column:1/-1;margin:0;padding:16px;border:1px dashed rgba(255,255,255,.35);border-radius:11px;color:#dbe7f0;font-size:12px;line-height:1.6}@media(max-width:720px){.national-follow{padding:21px}.national-follow-head,.national-follow-summary{align-items:flex-start;flex-direction:column}.national-follow-list{grid-template-columns:1fr}.national-follow-button{width:100%}.national-follow-state{white-space:normal}}
    `;
    document.head.append(style);
  };

  const globalUpdates = () => updates.filter((update) => {
    const empty = (value) => !String(value || '').trim();
    const markedAsBrazil = /^(br|brasil)$/i.test(String(update.uf || '').trim());
    return markedAsBrazil || (empty(update.curso) && empty(update.uf) && empty(update.instituicao) && empty(update.campus) && empty(update.modalidade));
  });

  const render = (message = '') => {
    const root = document.getElementById('orionNationalFollow');
    if (!root) return;
    const active = Boolean(subscription);
    const visibleUpdates = globalUpdates().slice(0, 3);
    root.innerHTML = `<div class="national-follow-head"><div><span class="national-follow-kicker">Acompanhamento nacional</span><h2>Receba atualizações que valem para todo o Brasil.</h2><p>Acompanhe avisos confirmados sobre Enem, Sisu, ProUni, Fies, calendários e editais nacionais, sem precisar escolher curso, estado ou instituição.</p></div><span class="national-follow-state ${active ? '' : 'off'}">${active ? 'Ativo nesta conta' : 'Ainda não ativado'}</span></div><div class="national-follow-summary"><div><strong>${active ? 'Você acompanha os avisos nacionais.' : 'Ative para concentrar os avisos nacionais na sua área.'}</strong><p>As informações são publicadas somente após conferência em fonte oficial. Isto não envia e-mail ou WhatsApp sem seu consentimento.</p></div><button class="national-follow-button" id="toggleNationalFollow" type="button">${active ? 'Acompanhamento ativo' : 'Ativar acompanhamento nacional'}</button></div><p class="national-follow-status" id="nationalFollowStatus" aria-live="polite">${escapeHtml(message)}</p><div class="national-follow-list">${visibleUpdates.length ? visibleUpdates.map((update) => `<article class="national-follow-card"><span>${escapeHtml(update.tipo || 'Atualização')}</span><h3>${escapeHtml(update.titulo)}</h3><p>${escapeHtml(update.descricao)}</p>${update.fonte_url ? `<a href="${escapeHtml(update.fonte_url)}" target="_blank" rel="noopener noreferrer">Abrir fonte oficial ↗</a>` : ''}</article>`).join('') : '<p class="national-follow-empty">Nenhum aviso nacional publicado neste momento. Quando a equipe confirmar uma mudança oficial de alcance nacional, ela aparecerá aqui.</p>'}</div>`;
    const button = document.getElementById('toggleNationalFollow');
    if (user && client) button.addEventListener('click', activate);
    else { button.disabled = true; button.textContent = 'Indisponível agora'; }
  };

  const activate = async () => {
    const button = document.getElementById('toggleNationalFollow');
    const status = document.getElementById('nationalFollowStatus');
    if (subscription) { status.textContent = 'Seu acompanhamento nacional já está ativo.'; return; }
    button.disabled = true;
    button.textContent = 'Ativando…';
    status.textContent = 'Salvando este acompanhamento na sua conta…';
    const { data, error } = await client.from('acompanhamentos').upsert({
      perfil_id: user.id, ...nationalKey, oferta_id: null, modalidade_nome: 'Avisos nacionais',
      acompanhar_vagas: true, acompanhar_editais: true, acompanhar_chamadas: true, acompanhar_calendario: true,
      fonte: 'Fontes oficiais nacionais', fonte_url: 'https://www.gov.br/mec/', ultima_revisao: null
    }, { onConflict: 'perfil_id,curso,uf,instituicao,campus,modalidade' }).select().single();
    if (error) {
      status.textContent = 'Não foi possível ativar agora. Execute o arquivo supabase-acompanhamentos.sql no Supabase e tente novamente.';
      button.disabled = false;
      button.textContent = 'Tentar novamente';
      return;
    }
    subscription = data;
    render('Acompanhamento nacional ativado com sucesso.');
  };

  const mount = () => {
    const overview = document.querySelector('#memberView .overview');
    if (!overview || document.getElementById('orionNationalFollow')) return false;
    const root = document.createElement('section');
    root.id = 'orionNationalFollow';
    root.className = 'national-follow';
    root.setAttribute('aria-label', 'Acompanhamento nacional de atualizações');
    const tracker = document.getElementById('orionUpdateTracker');
    (tracker || overview).insertAdjacentElement('afterend', root);
    render(loadingMessage);
    return true;
  };

  const initialize = async () => {
    client = window.supabase.createClient(config.url, config.anonKey);
    const { data: { session } } = await client.auth.getSession();
    if (!session?.user) return;
    user = session.user;
    const [followResult, updateResult] = await Promise.all([
      client.from('acompanhamentos').select('*').eq('perfil_id', user.id).eq('curso', nationalCourse).maybeSingle(),
      client.from('atualizacoes_publicadas').select('*').eq('publicado', true).order('publicado_em', { ascending: false }).limit(24)
    ]);
    subscription = followResult.data || null;
    updates = updateResult.data || [];
    if (followResult.error || updateResult.error) {
      loadingMessage = 'A base de acompanhamentos ainda não está pronta nesta instalação. Execute o arquivo supabase-acompanhamentos.sql no Supabase e recarregue esta página.';
    }
    addStyles();
    if (!mount()) {
      const observer = new MutationObserver(() => { if (mount()) observer.disconnect(); });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  };

  initialize().catch(() => {
    loadingMessage = 'Não foi possível carregar seus acompanhamentos agora. Atualize a página e tente novamente.';
    addStyles();
    mount();
  });
})();
