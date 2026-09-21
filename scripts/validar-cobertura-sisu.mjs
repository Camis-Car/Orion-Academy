import { readdir, readFile } from 'node:fs/promises';
import vm from 'node:vm';

const evaluate = async (file) => {
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(await readFile(file, 'utf8'), context, { filename: file });
  return context.window;
};
const national = (await evaluate('sisu-2026-nacional.js')).SISU_2026_NACIONAL?.ofertas || [];
const files = (await readdir('sisu-2026-estados')).filter((file) => /^[a-z]{2}\.js$/.test(file));
const stateOffers = [];
const states = [];
for (const file of files) {
  const bases = (await evaluate(`sisu-2026-estados/${file}`)).ORION_SISU_ESTADOS || {};
  const [state, base] = Object.entries(bases)[0] || [];
  if (!state || !base?.ofertas) throw new Error(`Base estadual inválida: ${file}`);
  states.push(state);
  stateOffers.push(...base.ofertas);
}
const identity = (offer) => `${offer.id}|${offer.uf}`;
const nationalIds = new Set(national.map(identity));
const stateIds = new Set(stateOffers.map(identity));
const missing = [...nationalIds].filter((id) => !stateIds.has(id));
const extra = [...stateIds].filter((id) => !nationalIds.has(id));
const duplicates = stateOffers.length - stateIds.size;
const vacancies = stateOffers.reduce((total, offer) => total + Number(offer.vagas || 0), 0);
const report = { states: states.sort(), totalStates: states.length, nationalOffers: national.length, stateOffers: stateOffers.length, vacancies, missing: missing.length, extra: extra.length, duplicates };
console.log(JSON.stringify(report, null, 2));
if (states.length !== 27 || missing.length || extra.length || duplicates) process.exit(1);
