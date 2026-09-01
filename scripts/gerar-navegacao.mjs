import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fallback = `<div class="aq-menu-links"><a href="index.html?public=1">Home<small>Informações e ferramentas para estudantes</small></a><a href="busca.html">Buscar informações<small>Pesquise cursos, faculdades e processos</small></a><a href="plano-sisu.html">Vagas e Sisu<small>Vagas, modalidades e referências</small></a><a href="carreiras.html">Profissões e faculdades<small>Cursos e instituições públicas</small></a><a href="calendario-vestibulando.html">Vestibulares e calendário<small>Datas, provas e etapas</small></a><a href="minha-jornada.html">Área do estudante<small>Consultas e informações salvas</small></a><a href="privacidade.html">Privacidade e seus dados<small>Como protegemos suas informações</small></a></div>`;
const files = (await readdir(root)).filter((file) => file.endsWith('.html'));
let updated = 0;

for (const file of files) {
  const path = resolve(root, file);
  const content = await readFile(path, 'utf8');
  const next = content.replace(/<div class="aq-menu-links">[\s\S]*?<\/div>/, fallback);
  if (next === content) continue;
  await writeFile(path, next);
  updated += 1;
}

console.log(`Navegação de ${updated} páginas atualizada.`);
