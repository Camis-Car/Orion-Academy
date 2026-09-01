(() => {
  if (decodeURIComponent(location.pathname.split('/').pop() || 'index.html') !== 'minha-jornada.html') return;

  const config = window.PROJETO_AQUILES_SUPABASE || {};
  const configured = typeof window.supabase !== 'undefined'
    && /^https:\/\//.test(config.url || '')
    && typeof config.anonKey === 'string'
    && config.anonKey.trim().length > 20;
  if (!configured) return;

  const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const textKey = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLocaleLowerCase('pt-BR');
  const dateLabel = (value) => {
    const parsed = value ? new Date(`${String(value).slice(0, 10)}T12:00:00`) : null;
    return parsed && !Number.isNaN(parsed.getTime()) ? parsed.toLocaleDateString('pt-BR') : 'não informada';
  };
  const option = (value, label = value) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`;
  const unique = (values) => [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const fieldsEqual = (left, right) => !left || textKey(left) === textKey(right);
  const topicFor = { vaga: 'acompanhar_vagas', edital: 'acompanhar_editais', chamada: 'acompanhar_chamadas', calendario: 'acompanhar_calendario' };
  const typeLabel = { vaga: 'Vagas', edital: 'Edital', chamada: 'Chamada', calendario: 'Calendário' };
  let client;
  let user;
  let offers = [];
  let subscriptions = [];
  let choices = [];
  let publishedUpdates = [];
  let readIds = new Set();
  let catalogLoading = null;

  const addStyles = () => {
    if (document.getElementById('orion-update-tracker-style')) return;
    const style = document.createElement('style');
    style.id = 'orion-update-tracker-style';
    style.textContent = `
      .update-tracker{margin:28px 0;padding:28px;border:1px solid #d9e0e7;border-radius:16px;background:linear-gradient(135deg,#fffdf8,#f5f8fb);box-shadow:0 12px 28px rgba(13,29,53,.06)}.update-tracker button:focus-visible,.update-tracker input:focus-visible,.update-tracker select:focus-visible{outline:3px solid #d9ae63;outline-offset:2px}
      .update-tracker-head{display:flex;align-items:flex-start;justify-content:space-between;gap:22px}.update-tracker h2{margin:6px 0 8px;color:#0d1d35;font-family:"Playfair Display",Georgia,serif;font-size:30px;line-height:1.14}.update-tracker p{color:#64748b;font-size:13px;line-height:1.6}.update-badge{display:inline-flex;align-items:center;gap:6px;padding:7px 10px;border-radius:999px;color:#175d48;background:#e5f4ec;font-size:10px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}.update-badge:before{content:"";width:7px;height:7px;border-radius:50%;background:#2f8b68}.update-summary{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:20px 0}.update-stat{padding:14px 15px;border:1px solid #e3e9ee;border-radius:12px;background:#fff}.update-stat strong{display:block;color:#0d1d35;font-family:"Playfair Display",Georgia,serif;font-size:24px;font-weight:600}.update-stat span{display:block;margin-top:3px;color:#718096;font-size:10px;font-weight:700}.update-notice{margin:17px 0;padding:14px 16px;border-left:3px solid #d9ae63;border-radius:0 10px 10px 0;color:#5f5138;background:#fff7e7;font-size:12px;line-height:1.6}.update-form{display:grid;grid-template-columns:1.2fr .55fr 1fr;gap:12px;margin-top:18px;padding:20px;border:1px solid #dde5eb;border-radius:14px;background:#fff}.update-field{display:grid;gap:6px}.update-field label,.update-checks legend{color:#34465e;font-size:11px;font-weight:800}.update-field input,.update-field select{width:100%;min-height:42px;padding:0 11px;border:1px solid #d6dfe7;border-radius:9px;color:#17243a;background:#fff;font:inherit;font-size:12px}.update-field input:focus,.update-field select:focus{outline:0;border-color:#bc9049;box-shadow:0 0 0 3px rgba(217,174,99,.16)}.update-checks{grid-column:1/-1;display:flex;flex-wrap:wrap;gap:8px;margin:2px 0 0;padding:0;border:0}.update-checks legend{width:100%;margin-bottom:2px}.update-checks label{display:inline-flex;align-items:center;gap:7px;padding:8px 10px;border:1px solid #e0e6eb;border-radius:999px;color:#4b5d73;background:#fbfcfd;font-size:11px;font-weight:700}.update-checks input{accent-color:#173a5e}.update-actions{display:flex;flex-wrap:wrap;gap:10px;align-items:center;grid-column:1/-1}.update-button{min-height:42px;padding:0 15px;cursor:pointer;border:0;border-radius:999px;color:#13233a;background:#d9ae63;font:inherit;font-size:12px;font-weight:800}.update-button:hover{filter:brightness(.97)}.update-button.secondary{color:#173a5e;background:#fff;border:1px solid #b9cada}.update-button:disabled{cursor:wait;opacity:.65}.update-status{min-height:18px;margin:0;color:#68778a;font-size:11px;line-height:1.5}.update-quick{margin:16px 0 0}.update-quick b{display:block;margin-bottom:8px;color:#314158;font-size:12px}.update-quick-list{display:flex;flex-wrap:wrap;gap:8px}.update-quick button{padding:8px 10px;cursor:pointer;border:1px solid #d6dfe7;border-radius:999px;color:#294663;background:#fff;font:inherit;font-size:11px;font-weight:700}.update-quick button:hover{border-color:#bc9049;color:#76541c}.update-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:18px;margin-top:22px}.update-panel{padding:18px;border:1px solid #e0e7ed;border-radius:13px;background:#fff}.update-panel h3{margin:0 0 12px;color:#102542;font-family:"Playfair Display",Georgia,serif;font-size:20px}.update-card{padding:13px 0;border-top:1px solid #edf0f3}.update-card:first-of-type{padding-top:0;border-top:0}.update-card h4{margin:0 0 5px;color:#213751;font-size:13px}.update-card p{margin:0;color:#64748b;font-size:11px}.update-card small{display:block;margin-top:6px;color:#8a97a6;font-size:10px}.update-card a{color:#76541c;font-weight:800;text-decoration:underline;text-underline-offset:3px}.update-label{display:inline-block;margin:0 0 7px;padding:4px 7px;border-radius:999px;color:#6b552b;background:#fff3d8;font-size:9px;font-weight:800;text-transform:uppercase}.update-subscriptions{display:grid;gap:9px}.update-subscription{display:grid;grid-template-columns:1fr auto;gap:12px;padding:13px;border:1px solid #e0e7ed;border-radius:11px;background:#fff}.update-subscription strong{display:block;color:#1b324e;font-size:13px}.update-subscription p{margin:3px 0 0;color:#6f7e90;font-size:10px}.update-subscription button{align-self:start;padding:6px 8px;cursor:pointer;border:0;border-radius:7px;color:#9b403c;background:#fff0ed;font:inherit;font-size:10px;font-weight:800}.update-empty{margin:0;padding:17px;border:1px dashed #d6dfe7;border-radius:10px;color:#738094;background:#fbfcfd;font-size:12px;line-height:1.55}.update-timeline{display:grid;gap:11px}.update-timeline-item{position:relative;padding-left:18px;color:#5f7083;font-size:11px;line-height:1.55}.update-timeline-item:before{content:"";position:absolute;left:0;top:4px;width:8px;height:8px;border:2px solid #d9ae63;border-radius:50%;background:#fff}.update-timeline-item b{display:block;color:#213751;font-size:12px}.update-mark-read{margin-top:11px;padding:7px 9px;cursor:pointer;border:1px solid #b9cada;border-radius:8px;color:#173a5e;background:#fff;font:inherit;font-size:10px;font-weight:800}@media(max-width:720px){.update-tracker{padding:21px}.update-tracker-head{align-items:stretch;flex-direction:column}.update-badge{align-self:flex-start}.update-summary,.update-grid{grid-template-columns:1fr}.update-form{grid-template-columns:1fr}.update-subscription{grid-template-columns:1fr}.update-subscription button{justify-self:start}}`;
    document.head.append(style);
  };

  const matchingUpdates = () => publishedUpdates.filter((update) => subscriptions.some((subscription) => {
    if (!subscription[topicFor[update.tipo]]) return false;
    return fieldsEqual(update.oferta_id, subscription.oferta_id)
      && fieldsEqual(update.curso, subscription.curso)
      && fieldsEqual(update.uf, subscription.uf)
      && fieldsEqual(update.instituicao, subscription.instituicao)
      && fieldsEqual(update.campus, subscription.campus)
      && fieldsEqual(update.modalidade, subscription.modalidade);
  }));

  const modes = () => Array.isArray(window.ORION_MODALIDADES_SISU) ? window.ORION_MODALIDADES_SISU : [];
  const modeName = (code) => modes().find((mode) => mode.codigo === code)?.nome || code || 'Modalidade não informada';
  const sourceRevision = () => window.SISU_2026_NACIONAL?.atualizadoEm || '';

  const getForm = () => ({
    course: document.getElementById('updateCourse'), state: document.getElementById('updateState'), institution: document.getElementById('updateInstitution'),
    campus: document.getElementById('updateCampus'), mode: document.getElementById('updateMode'), status: document.getElementById('updateStatus'),
    save: document.getElementById('saveUpdateFollow'), load: document.getElementById('loadNationalCatalog'), form: document.getElementById('updateFollowForm')
  });

  const renderTracker = () => {
    const overview = document.querySelector('#memberView .overview');
    if (!overview || document.getElementById('orionUpdateTracker')) return;
    const section = document.createElement('section');
    section.id = 'orionUpdateTracker';
    section.className = 'update-tracker';
    section.setAttribute('aria-label', 'Acompanhar atualizações');
    overview.insertAdjacentElement('afterend', section);
    renderContent();
  };

  const renderContent = () => {
    const root = document.getElementById('orionUpdateTracker');
    if (!root) return;
    const relevant = matchingUpdates();
    const unread = relevant.filter((update) => !readIds.has(update.id));
    const sourceChanged = subscriptions.filter((subscription) => sourceRevision() && subscription.ultima_revisao && String(subscription.ultima_revisao) !== String(sourceRevision()));
    const suggestions = choices.filter((choice) => choice.curso && choice.instituicao).slice(0, 3);
    root.innerHTML = `<div class="update-tracker-head"><div><span class="eyebrow" style="color:#a77a34">Acompanhamentos nacionais</span><h2>Volte sabendo o que mudou.</h2><p>Salve curso, estado, instituição e modalidade. Avisos publicados pela equipe aparecem nesta área quando houver uma mudança confirmada em fonte oficial.</p></div><span class="update-badge">Conta protegida</span></div>
      <div class="update-summary"><div class="update-stat"><strong>${subscriptions.length}</strong><span>acompanhamentos salvos</span></div><div class="update-stat"><strong>${unread.length}</strong><span>pendências novas</span></div><div class="update-stat"><strong>${sourceRevision() ? dateLabel(sourceRevision()) : '—'}</strong><span>revisão da base Sisu</span></div></div>
      ${sourceChanged.length ? `<div class="update-notice"><b>Revisão disponível.</b> A base nacional foi revisada desde que você salvou ${sourceChanged.length === 1 ? 'um acompanhamento' : `${sourceChanged.length} acompanhamentos`}. Consulte novamente as informações antes de tomar uma decisão.</div>` : ''}
      <div class="update-notice">Os avisos ficam dentro da Área do Estudante. E-mail, WhatsApp ou notificações do celular só serão ativados depois de uma escolha explícita de consentimento e de uma rotina segura de envio.</div>
      <div class="update-actions"><button class="update-button secondary" id="loadNationalCatalog" type="button">${offers.length ? 'Atualizar catálogo nacional' : 'Escolher o que acompanhar'}</button><p class="update-status" id="updateStatus" aria-live="polite">${offers.length ? 'Catálogo nacional carregado. Escolha a combinação que deseja acompanhar.' : 'O catálogo nacional será carregado somente quando você quiser pesquisar, para manter a Área do Estudante mais leve.'}</p></div>
      <form id="updateFollowForm" class="update-form" ${offers.length ? '' : 'hidden'}><div class="update-field"><label for="updateCourse">Curso</label><input id="updateCourse" list="updateCourses" autocomplete="off" placeholder="Ex.: Medicina" required><datalist id="updateCourses"></datalist></div><div class="update-field"><label for="updateState">Estado</label><select id="updateState" required><option value="">Selecione</option></select></div><div class="update-field"><label for="updateInstitution">Instituição</label><select id="updateInstitution" required disabled><option value="">Escolha curso e estado</option></select></div><div class="update-field"><label for="updateCampus">Campus</label><select id="updateCampus" required disabled><option value="">Escolha a instituição</option></select></div><div class="update-field"><label for="updateMode">Modalidade</label><select id="updateMode" required></select></div><fieldset class="update-checks"><legend>Quais avisos você quer ver aqui?</legend><label><input name="updateTopic" value="vagas" type="checkbox" checked> Vagas e referências</label><label><input name="updateTopic" value="editais" type="checkbox" checked> Editais</label><label><input name="updateTopic" value="chamadas" type="checkbox" checked> Chamadas</label><label><input name="updateTopic" value="calendario" type="checkbox" checked> Calendário</label></fieldset><div class="update-actions"><button class="update-button" id="saveUpdateFollow" type="submit">Salvar acompanhamento</button><p class="update-status">A elegibilidade para cada modalidade continua sendo confirmada pela instituição e pelo edital.</p></div></form>
      ${suggestions.length ? `<div class="update-quick"><b>Usar uma escolha já salva</b><div class="update-quick-list">${suggestions.map((choice, index) => `<button type="button" data-choice-index="${index}">${escapeHtml(choice.curso)} · ${escapeHtml(choice.sigla || choice.instituicao)} · ${escapeHtml(choice.uf || '')}</button>`).join('')}</div></div>` : ''}
      <div class="update-grid"><div class="update-panel"><h3>Pendências e avisos</h3>${unread.length ? unread.slice(0, 6).map((update) => `<article class="update-card"><span class="update-label">${escapeHtml(typeLabel[update.tipo] || 'Atualização')}</span><h4>${escapeHtml(update.titulo)}</h4><p>${escapeHtml(update.descricao)}</p><small>Publicado em ${dateLabel(update.publicado_em)} · ${escapeHtml(update.fonte || 'Fonte oficial')}</small>${update.fonte_url ? ` · <a href="${escapeHtml(update.fonte_url)}" target="_blank" rel="noopener noreferrer">Abrir fonte oficial</a>` : ''}<br><button class="update-mark-read" type="button" data-read-update="${escapeHtml(update.id)}">Marcar como visto</button></article>`).join('') : '<p class="update-empty">Nenhuma pendência publicada para os seus acompanhamentos. Quando a equipe confirmar uma mudança em fonte oficial, ela aparecerá aqui.</p>'}</div><div class="update-panel"><h3>Meus acompanhamentos</h3><div class="update-subscriptions">${subscriptions.length ? subscriptions.map((subscription) => `<article class="update-subscription"><div><strong>${escapeHtml(subscription.curso)}</strong><p>${escapeHtml([subscription.instituicao, subscription.campus, subscription.uf].filter(Boolean).join(' · '))}</p><p>${escapeHtml(modeName(subscription.modalidade))} · ${[subscription.acompanhar_vagas && 'vagas', subscription.acompanhar_editais && 'editais', subscription.acompanhar_chamadas && 'chamadas', subscription.acompanhar_calendario && 'calendário'].filter(Boolean).join(', ')}</p><p>Revisão ao salvar: ${dateLabel(subscription.ultima_revisao)}</p></div><button type="button" data-remove-follow="${escapeHtml(subscription.id)}">Remover</button></article>`).join('') : '<p class="update-empty">Você ainda não acompanha nenhuma combinação. Escolha uma consulta nacional acima para começar.</p>'}</div></div></div>
      <div class="update-panel" style="margin-top:18px"><h3>Linha do tempo</h3><div class="update-timeline"><div class="update-timeline-item"><b>Hoje · Área de atualizações aberta</b>Suas consultas e pendências ficam reunidas nesta conta.</div>${sourceRevision() ? `<div class="update-timeline-item"><b>Base Sisu revisada em ${dateLabel(sourceRevision())}</b>${escapeHtml(window.SISU_2026_NACIONAL?.cobertura || 'Consulte as fontes oficiais antes de se inscrever.')}</div>` : '<div class="update-timeline-item"><b>Catálogo nacional sob demanda</b>Abra o catálogo acima quando quiser pesquisar cursos e instituições do país.</div>'}</div></div>`;
    bindControls();
  };

  const renderCatalog = () => {
    const form = getForm();
    if (!form.form || !offers.length) return;
    form.form.hidden = false;
    const courses = unique(offers.map((offer) => offer.curso));
    const states = unique(offers.map((offer) => offer.uf));
    document.getElementById('updateCourses').innerHTML = courses.map((course) => option(course)).join('');
    form.state.innerHTML = `<option value="">Selecione</option>${states.map((state) => option(state)).join('')}`;
    form.mode.innerHTML = modes().map((mode) => option(mode.codigo, `${mode.numero}. ${mode.nome}`)).join('');
    form.course.addEventListener('input', syncOfferFilters);
    form.state.addEventListener('change', syncOfferFilters);
    form.institution.addEventListener('change', syncCampuses);
  };

  const matchingOffers = () => {
    const { course, state, institution } = getForm();
    const courseValue = textKey(course?.value);
    return offers.filter((offer) => (!courseValue || textKey(offer.curso) === courseValue)
      && (!state?.value || offer.uf === state.value)
      && (!institution?.value || textKey(offer.instituicao) === textKey(institution.value)));
  };

  const syncOfferFilters = () => {
    const { institution, campus, course, state } = getForm();
    if (!institution || !campus) return;
    const before = institution.value;
    const candidates = matchingOffers();
    const institutions = unique(candidates.map((offer) => offer.instituicao));
    institution.disabled = !(course.value.trim() && state.value && institutions.length);
    institution.innerHTML = `<option value="">${institution.disabled ? 'Escolha curso e estado' : 'Selecione'}</option>${institutions.map((name) => option(name)).join('')}`;
    if (institutions.some((name) => name === before)) institution.value = before;
    campus.disabled = true;
    campus.innerHTML = '<option value="">Escolha a instituição</option>';
    syncCampuses();
  };

  const syncCampuses = () => {
    const { campus, institution } = getForm();
    if (!campus || !institution) return;
    const campuses = unique(matchingOffers().map((offer) => offer.campus || offer.cidade || 'Campus não informado'));
    campus.disabled = !(institution.value && campuses.length);
    campus.innerHTML = `<option value="">${campus.disabled ? 'Escolha a instituição' : 'Selecione'}</option>${campuses.map((name) => option(name)).join('')}`;
  };

  const loadCatalog = async () => {
    const status = document.getElementById('updateStatus');
    const button = document.getElementById('loadNationalCatalog');
    if (offers.length) { renderCatalog(); return; }
    if (!catalogLoading) {
      catalogLoading = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'sisu-2026-nacional.js';
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Não foi possível abrir o catálogo nacional agora.'));
        document.head.append(script);
      });
    }
    if (button) { button.disabled = true; button.textContent = 'Carregando catálogo…'; }
    if (status) status.textContent = 'Carregando cursos, instituições e campus já incluídos na base nacional do projeto…';
    try {
      await catalogLoading;
      offers = Array.isArray(window.SISU_2026_NACIONAL?.ofertas) ? window.SISU_2026_NACIONAL.ofertas : [];
      if (!offers.length) throw new Error('O catálogo nacional não trouxe ofertas válidas.');
      renderContent();
      renderCatalog();
    } catch (error) {
      if (button) { button.disabled = false; button.textContent = 'Tentar carregar catálogo'; }
      if (status) status.textContent = error.message || 'Tente novamente em alguns instantes.';
    }
  };

  const useChoice = async (choice) => {
    await loadCatalog();
    const { course, state, institution } = getForm();
    if (!course) return;
    course.value = choice.curso || '';
    state.value = choice.uf || '';
    syncOfferFilters();
    if (institution && [...institution.options].some((item) => textKey(item.value) === textKey(choice.instituicao))) {
      institution.value = [...institution.options].find((item) => textKey(item.value) === textKey(choice.instituicao)).value;
      syncCampuses();
    }
  };

  const saveFollow = async (event) => {
    event.preventDefault();
    const { course, state, institution, campus, mode, status, save } = getForm();
    const candidate = matchingOffers().find((offer) => textKey(offer.campus || offer.cidade || 'Campus não informado') === textKey(campus.value));
    if (!candidate) { status.textContent = 'Escolha uma combinação disponível no catálogo nacional.'; return; }
    const selectedTopics = new Set([...document.querySelectorAll('input[name="updateTopic"]:checked')].map((input) => input.value));
    if (!selectedTopics.size) { status.textContent = 'Escolha pelo menos um tipo de aviso.'; return; }
    save.disabled = true;
    save.textContent = 'Salvando…';
    status.textContent = 'Guardando seu acompanhamento na conta…';
    const payload = {
      perfil_id: user.id, oferta_id: candidate.id || null, curso: candidate.curso, uf: candidate.uf, instituicao: candidate.instituicao,
      campus: candidate.campus || candidate.cidade || '', modalidade: mode.value, modalidade_nome: modeName(mode.value),
      acompanhar_vagas: selectedTopics.has('vagas'), acompanhar_editais: selectedTopics.has('editais'), acompanhar_chamadas: selectedTopics.has('chamadas'), acompanhar_calendario: selectedTopics.has('calendario'),
      fonte: window.SISU_2026_NACIONAL?.fonte ? 'Sisu / MEC' : 'Fonte oficial', fonte_url: window.SISU_2026_NACIONAL?.fonte || null, ultima_revisao: sourceRevision() || null
    };
    const { data, error } = await client.from('acompanhamentos').upsert(payload, { onConflict: 'perfil_id,curso,uf,instituicao,campus,modalidade' }).select().single();
    if (error) {
      status.textContent = 'Ainda não foi possível salvar. A equipe precisa ativar a base de acompanhamentos no Supabase.';
      save.disabled = false;
      save.textContent = 'Salvar acompanhamento';
      return;
    }
    subscriptions = [data, ...subscriptions.filter((subscription) => subscription.id !== data.id)];
    renderContent();
    renderCatalog();
  };

  const removeFollow = async (id) => {
    const { error } = await client.from('acompanhamentos').delete().eq('id', id).eq('perfil_id', user.id);
    if (error) return;
    subscriptions = subscriptions.filter((subscription) => subscription.id !== id);
    renderContent();
  };

  const markRead = async (id) => {
    const { error } = await client.from('leituras_atualizacoes').upsert({ perfil_id: user.id, atualizacao_id: id }, { onConflict: 'perfil_id,atualizacao_id' });
    if (error) return;
    readIds.add(id);
    renderContent();
  };

  const bindControls = () => {
    document.getElementById('loadNationalCatalog')?.addEventListener('click', loadCatalog);
    getForm().form?.addEventListener('submit', saveFollow);
    document.querySelectorAll('[data-choice-index]').forEach((button) => button.addEventListener('click', () => useChoice(choices[Number(button.dataset.choiceIndex)])));
    document.querySelectorAll('[data-remove-follow]').forEach((button) => button.addEventListener('click', () => removeFollow(button.dataset.removeFollow)));
    document.querySelectorAll('[data-read-update]').forEach((button) => button.addEventListener('click', () => markRead(button.dataset.readUpdate)));
  };

  const initialize = async () => {
    client = window.supabase.createClient(config.url, config.anonKey);
    const { data: { session } } = await client.auth.getSession();
    if (!session?.user) return;
    user = session.user;
    const [followsResult, choicesResult, updatesResult, readsResult] = await Promise.all([
      client.from('acompanhamentos').select('*').eq('perfil_id', user.id).order('updated_at', { ascending: false }),
      client.from('escolhas_candidatura').select('curso,instituicao,sigla,campus,cidade,uf').eq('perfil_id', user.id).order('ordem'),
      client.from('atualizacoes_publicadas').select('*').eq('publicado', true).order('publicado_em', { ascending: false }).limit(80),
      client.from('leituras_atualizacoes').select('atualizacao_id').eq('perfil_id', user.id)
    ]);
    subscriptions = followsResult.data || [];
    choices = choicesResult.data || [];
    publishedUpdates = updatesResult.data || [];
    readIds = new Set((readsResult.data || []).map((row) => row.atualizacao_id));
    addStyles();
    renderTracker();
  };

  initialize().catch(() => {});
})();
