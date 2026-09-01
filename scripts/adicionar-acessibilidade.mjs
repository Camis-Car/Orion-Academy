import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const files = (await readdir(root)).filter((file) => file.endsWith('.html'));
let updated = 0;

for (const file of files) {
  const path = resolve(root, file);
  const content = await readFile(path, 'utf8');
  if (content.includes('acessibilidade.js')) continue;
  const next = content.replace(/<body(\s[^>]*)?>/i, (body) => `${body}<script src="acessibilidade.js"></script>`);
  if (next === content) continue;
  await writeFile(path, next);
  updated += 1;
}

console.log(`Acessibilidade adicionada a ${updated} páginas.`);
