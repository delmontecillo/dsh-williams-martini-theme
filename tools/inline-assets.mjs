#!/usr/bin/env node
/**
 * Inlines the binary artwork into `client.js` and `icon.svg`.
 *
 * A Web Client plugin module is a single script, so the die-cut logo, the
 * borderless plate and the two car grades travel inside it as data URLs.
 * Edit `client.template.js` and `assets/build_assets.py`, then run:
 *   python assets/build_assets.py
 *   node tools/inline-assets.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => readFileSync(join(root, 'assets', name), 'utf8').trim();

const assets = {
  __LOGO__: read('martini-logo.webp.b64'),
  __PLATE__: read('martini-plate.webp.b64'),
  __CAR_NIGHT__: read('car-night.webp.b64'),
  __CAR_PAPER__: read('car-paper.webp.b64'),
};

let client = readFileSync(join(root, 'client.template.js'), 'utf8');
for (const [token, payload] of Object.entries(assets)) {
  if (!client.includes(token)) throw new Error(`template is missing ${token}`);
  client = client.split(token).join(payload);
}
writeFileSync(join(root, 'client.js'), client);
console.log(`client.js written: ${(client.length / 1024).toFixed(0)} KiB`);

const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Williams Martini Racing theme">
  <defs>
    <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#0A2A4A"/>
      <stop offset="0.55" stop-color="#061426"/>
      <stop offset="1" stop-color="#030B16"/>
    </linearGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="0">
      <stop stop-color="#4FD3F7"/>
      <stop offset="0.34" stop-color="#009FDF"/>
      <stop offset="0.62" stop-color="#E4002B"/>
      <stop offset="1" stop-color="#009FDF"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#tile)"/>
  <rect x="0.75" y="0.75" width="62.5" height="62.5" rx="13.25" fill="none" stroke="#35C4F0" stroke-opacity="0.45" stroke-width="1.5"/>
  <image x="5" y="13" width="54" height="24.2" href="data:image/webp;base64,${assets.__LOGO__}"/>
  <rect x="12" y="45" width="40" height="2.2" rx="1.1" fill="#4FD3F7"/>
  <rect x="12" y="49" width="40" height="2.2" rx="1.1" fill="#009FDF"/>
  <rect x="12" y="53" width="26" height="2.2" rx="1.1" fill="#E4002B"/>
  <rect x="12" y="57" width="40" height="2.2" rx="1.1" fill="url(#edge)"/>
</svg>
`;
writeFileSync(join(root, 'icon.svg'), icon);
console.log(`icon.svg written: ${(icon.length / 1024).toFixed(0)} KiB`);
