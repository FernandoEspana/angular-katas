#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

const KATAS = {
  1: { dir: 'kata-01-add-name', title: 'Agregar nombre a una lista', minutes: 12 },
  2: { dir: 'kata-02-filter-list', title: 'Lista con filtro en vivo', minutes: 12 },
  3: { dir: 'kata-03-edit-delete', title: 'Editar y eliminar elementos', minutes: 18 },
  4: { dir: 'kata-04-input-output', title: 'Comunicación padre / hijo', minutes: 15 },
  5: { dir: 'kata-05-http-list', title: 'HttpClient, loading y error', minutes: 15 },
  6: { dir: 'kata-06-reactive-form', title: 'Formulario reactivo', minutes: 15 },
};

const args = process.argv.slice(2);
let command = 'show';
if (['solve', 'test', 'show'].includes(args[0])) {
  command = args.shift();
}
const n = Number(args[0]);

if (!KATAS[n]) {
  console.log('\nUso:');
  console.log('  npm run kata 3            ver el enunciado y arrancar el cronómetro');
  console.log('  npm run test:one 3        correr solo los tests de la kata 3');
  console.log('  npm run solve 3           copiar la solución encima del starter');
  console.log('\nKatas disponibles:');
  Object.entries(KATAS).forEach(([k, v]) => {
    console.log(`  ${k}  ${v.title}  (${v.minutes} min)`);
  });
  console.log('');
  process.exit(KATAS[n] ? 0 : 1);
}

const kata = KATAS[n];
const srcDir = path.join(ROOT, 'src', 'app', kata.dir);
const solDir = path.join(ROOT, 'solutions', `kata-0${n}`);

if (command === 'solve') {
  const files = fs.readdirSync(solDir);
  files.forEach((f) => {
    fs.copyFileSync(path.join(solDir, f), path.join(srcDir, f));
    console.log(`  copiado  ${f}`);
  });
  console.log('\nSolución aplicada. Para volver al starter:  git checkout -- src/\n');
  process.exit(0);
}

if (command === 'test') {
  const result = spawnSync(
    'npx',
    ['ng', 'test', '--watch=false', '--browsers=ChromeHeadless', `--include=**/${kata.dir}/**`],
    { stdio: 'inherit', cwd: ROOT, shell: process.platform === 'win32' }
  );
  process.exit(result.status ?? 1);
}

console.log('\n' + '='.repeat(64));
console.log(`KATA 0${n} — ${kata.title}`);
console.log('='.repeat(64) + '\n');
console.log(fs.readFileSync(path.join(srcDir, 'ENUNCIADO.md'), 'utf8'));
console.log('='.repeat(64));
console.log(`Cronómetro: ${kata.minutes} minutos. Ctrl+C para abortar.`);
console.log('Regla: sin IA, sin buscar en Google, sin mirar las soluciones.');
console.log('='.repeat(64) + '\n');

let remaining = kata.minutes * 60;
const render = () => {
  const m = String(Math.floor(remaining / 60)).padStart(2, '0');
  const s = String(remaining % 60).padStart(2, '0');
  process.stdout.write(`\r  restante  ${m}:${s}   `);
};
render();
const timer = setInterval(() => {
  remaining -= 1;
  render();
  if (remaining <= 0) {
    clearInterval(timer);
    console.log('\n\n  TIEMPO. Para donde vas y corre los tests:');
    console.log(`  npm run test:one ${n}\n`);
    process.exit(0);
  }
}, 1000);
