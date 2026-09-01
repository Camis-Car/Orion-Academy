import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const sourcePath = join(root, 'sisu-2026-nacional.js');
const outputDirectory = join(root, 'sisu-2026-estados');
const source = await readFile(sourcePath, 'utf8');
const json = source.replace(/^window\.SISU_2026_NACIONAL\s*=\s*/, '').replace(/;\s*$/, '');
const national = JSON.parse(json);
const offersByState = new Map();
const brazilianStates = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];

for (const offer of national.ofertas || []) {
  const state = String(offer.uf || '').toUpperCase();
  if (!state) continue;
  if (!offersByState.has(state)) offersByState.set(state, []);
  offersByState.get(state).push(offer);
}

await mkdir(outputDirectory, { recursive: true });
const index = [];
for (const state of brazilianStates) {
  const offers = offersByState.get(state) || [];
  const stateData = {
    ...national,
    ofertas: offers,
    escopo: state,
    cobertura: `${national.cobertura} Consulta parcial: ${state}.`,
  };
  const filename = `${state.toLowerCase()}.js`;
  const content = `window.ORION_SISU_ESTADOS=window.ORION_SISU_ESTADOS||{};window.ORION_SISU_ESTADOS[${JSON.stringify(state)}]=${JSON.stringify(stateData)};window.SISU_2026_NACIONAL=window.ORION_SISU_ESTADOS[${JSON.stringify(state)}];\n`;
  await writeFile(join(outputDirectory, filename), content);
  index.push({ uf: state, ofertas: offers.length, vagas: offers.reduce((total, offer) => total + (Number(offer.vagas) || 0), 0), arquivo: filename });
}

await writeFile(join(outputDirectory, 'indice.js'), `window.ORION_SISU_INDICE=${JSON.stringify({ edicao: national.edicao, atualizadoEm: national.atualizadoEm, estados: index })};\n`);
console.log(`Criados ${index.length} arquivos estaduais em ${outputDirectory}.`);
