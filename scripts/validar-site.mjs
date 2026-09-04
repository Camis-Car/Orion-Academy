import { readdir, readFile } from 'node:fs/promises';
import { extname, resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const ignored = new Set(['.git', 'node_modules', 'bases-de-dados-projeto-aquiles']);
const errors = [];
const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = `${directory}/${entry.name}`;
    if (entry.isDirectory() && !ignored.has(entry.name)) files.push(...await walk(path));
    if (entry.isFile()) files.push(path);
  }
  return files;
};
const files = await walk(root);
const html = files.filter((file) => extname(file) === '.html');
const localFile = (value) => value && !/^(https?:|mailto:|tel:|#|data:|javascript:)/i.test(value);
for (const file of html) {
  const content = await readFile(file, 'utf8');
  for (const match of content.matchAll(/(?:href|src)=["']([^"']+)["']/gi)) {
    const value = match[1].split(/[?#]/)[0];
    if (!localFile(value) || !value || value.includes('${') || value.includes('{{')) continue;
    const target = resolve(file, '..', value);
    try { await readFile(target); } catch { errors.push(`${relative(root, file)} aponta para arquivo inexistente: ${match[1]}`); }
  }
  for (const [index, script] of [...content.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((match, index) => [index + 1, match[1]])) {
    try { new Function(script); } catch (error) { errors.push(`${relative(root, file)}: script interno ${index}: ${error.message}`); }
  }
}
for (const file of files.filter((item) => extname(item) === '.js' || extname(item) === '.mjs')) {
  const content = await readFile(file, 'utf8');
  try { new Function(content); } catch (error) { if (extname(file) === '.js') errors.push(`${relative(root, file)}: ${error.message}`); }
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(JSON.stringify({ html: html.length, javascript: files.filter((item) => /\.m?js$/.test(item)).length, result: 'ok' }));
