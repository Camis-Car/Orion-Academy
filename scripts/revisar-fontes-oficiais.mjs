import { createHash } from 'node:crypto';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputDirectory = join(root, 'dados-revisao');
const statusPath = join(outputDirectory, 'fontes-oficiais-status.json');
const reportPath = join(outputDirectory, 'pendencias-fontes.md');
const allowedExtensions = new Set(['.html', '.js']);
const ignoredDirectories = new Set(['.git', 'node_modules', 'bases-de-dados-projeto-aquiles', '.github']);
const ignoredHosts = new Set([
  'fonts.googleapis.com', 'fonts.gstatic.com', 'cdn.jsdelivr.net', 'www.googletagmanager.com',
  'www.google-analytics.com', 'www.instagram.com', 'open.spotify.com', 'accounts.spotify.com'
]);
const ignoredFragments = ['supabase.co', 'localhost', '127.0.0.1'];

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!ignoredDirectories.has(entry.name)) files.push(...await walk(path));
    } else if (allowedExtensions.has(extname(entry.name))) {
      files.push(path);
    }
  }
  return files;
};

const cleanUrl = (value) => value.replace(/[),.;]+$/g, '').replace(/\\u0026/g, '&');
const editorialUrl = (value) => {
  try {
    const url = new URL(value);
    return /^https?:$/.test(url.protocol)
      && !ignoredHosts.has(url.hostname)
      && !ignoredFragments.some((fragment) => url.hostname.includes(fragment));
  } catch {
    return false;
  }
};
const categoryFor = (files) => files.some((path) => /lista[s-]?espera|acompanhamento/i.test(path))
  ? 'lista_espera'
  : 'fonte_geral';
const getSources = async () => {
  const byUrl = new Map();
  const files = await walk(root);
  for (const path of files) {
    const content = await readFile(path, 'utf8');
    const repositoryPath = relative(root, path);
    const matches = content.match(/https?:\/\/[^\s"'<>`]+/g) || [];
    matches.map(cleanUrl).filter(editorialUrl).forEach((url) => {
      if (!byUrl.has(url)) byUrl.set(url, new Set());
      byUrl.get(url).add(repositoryPath);
    });
  }
  return [...byUrl.entries()]
    .map(([url, paths]) => {
      const arquivos = [...paths].sort((left, right) => left.localeCompare(right));
      return { url, arquivos, categoria: categoryFor(arquivos) };
    })
    .sort((left, right) => left.url.localeCompare(right.url));
};

const fingerprint = (result) => createHash('sha256').update([
  result.status, result.finalUrl, result.etag, result.lastModified, result.contentLength
].join('|')).digest('hex').slice(0, 20);
const check = async (url) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 18000);
  const headers = { 'user-agent': 'OrionAcademySourceReview/1.0 (+https://theorionacademy.com.br)' };
  try {
    let response = await fetch(url, {
      method: 'HEAD', redirect: 'follow', signal: controller.signal,
      headers, cache: 'no-store'
    });
    if (response.status === 403 || response.status === 405 || response.status === 501) {
      response = await fetch(url, {
        method: 'GET', redirect: 'follow', signal: controller.signal,
        headers: { ...headers, range: 'bytes=0-1024' }, cache: 'no-store'
      });
    }
    const result = {
      url, status: response.status, finalUrl: response.url, etag: response.headers.get('etag') || '',
      lastModified: response.headers.get('last-modified') || '', contentLength: response.headers.get('content-length') || '',
      disponivel: response.ok, erro: ''
    };
    return { ...result, assinatura: fingerprint(result) };
  } catch (error) {
    const result = { url, status: 0, finalUrl: '', etag: '', lastModified: '', contentLength: '', disponivel: false, erro: error.name === 'AbortError' ? 'Tempo de resposta excedido' : 'Falha de conexão' };
    return { ...result, assinatura: fingerprint(result) };
  } finally {
    clearTimeout(timeout);
  }
};

const mapConcurrent = async (items, limit, callback) => {
  const results = [];
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await callback(items[index]);
    }
  }));
  return results;
};

await mkdir(outputDirectory, { recursive: true });
let previous = { verificadoEm: null, fontes: [] };
try { previous = JSON.parse(await readFile(statusPath, 'utf8')); } catch {}
const previousByUrl = new Map((previous.fontes || []).map((source) => [source.url, source]));
const configuredSources = await getSources();
const checked = await mapConcurrent(configuredSources, 6, (source) => check(source.url));
const firstReview = !previous.verificadoEm;
const sources = checked.map((source, index) => {
  const configured = configuredSources[index];
  const before = previousByUrl.get(source.url);
  const mudou = !firstReview && Boolean(before) && before.assinatura !== source.assinatura;
  const indisponibilidadeNova = !firstReview && !source.disponivel && before?.disponivel === true;
  return { ...source, ...configured, mudou, nova: !before, indisponibilidadeNova };
});
const changed = sources.filter((source) => source.mudou || source.indisponibilidadeNova);
const unavailable = sources.filter((source) => !source.disponivel);
const possibleWaitlistChanges = changed.filter((source) => source.categoria === 'lista_espera');
const now = new Date().toISOString();
const status = {
  versao: 2,
  verificadoEm: now,
  frequencia: 'Diariamente',
  resumo: {
    fontes: sources.length,
    disponiveis: sources.length - unavailable.length,
    mudancasDetectadas: changed.filter((source) => source.mudou).length,
    possiveisChamadasOuListas: possibleWaitlistChanges.length,
    indisponiveis: unavailable.length
  },
  fontes: sources
};
await writeFile(statusPath, `${JSON.stringify(status, null, 2)}\n`);

const reportLines = [
  '# Pendências de fontes oficiais', '', `Verificação automática: ${now}.`, '',
  firstReview
    ? 'A primeira execução estabeleceu a linha de base. Nenhuma alteração foi tratada como atualização pendente.'
    : changed.length
      ? '## Itens para revisão editorial'
      : 'Nenhuma mudança ou indisponibilidade nova foi detectada nesta verificação.', ''
];
if (!firstReview && changed.length) {
  changed.forEach((source) => {
    const contexto = source.categoria === 'lista_espera' ? 'Possível chamada ou lista de espera' : 'Mudança detectada';
    const evento = source.indisponibilidadeNova && !source.mudou ? 'Fonte indisponível' : contexto;
    reportLines.push(`- ${evento}: ${source.url}${source.status ? ` (HTTP ${source.status})` : ''}`);
    if (source.arquivos.length) reportLines.push(`  - Referência no projeto: ${source.arquivos.join(', ')}`);
  });
  reportLines.push('', 'Confirme o documento na fonte oficial antes de publicar um aviso para estudantes. Alterações técnicas não são, por si só, uma nova chamada.');
}
await writeFile(reportPath, `${reportLines.join('\n')}\n`);
console.log(JSON.stringify({
  firstReview,
  checked: sources.length,
  changed: changed.length,
  possibleWaitlistChanges: possibleWaitlistChanges.length,
  unavailable: unavailable.length,
  shouldCommit: firstReview || changed.length > 0
}));
