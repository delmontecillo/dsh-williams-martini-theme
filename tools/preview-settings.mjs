#!/usr/bin/env node
/**
 * Design harness: renders the Martini Racing settings page outside the app so
 * the light palette can be inspected at a fixed size. Not shipped at runtime.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'client.template.js'), 'utf8');

const tokenStart = source.indexOf('const TOKENS = {');
const tokenEnd = source.indexOf('\n    };', tokenStart);
if (tokenStart < 0 || tokenEnd < 0) throw new Error('TOKENS not found');
const tokenSrc = source.slice(tokenStart + 'const TOKENS = '.length, tokenEnd + '\n    }'.length);

const fileUrl = (name) =>
  'file:///' + join(root, 'assets', name).replaceAll('\\', '/').replaceAll(' ', '%20');
const TOKENS = new Function(
  'm',
  'LOGO',
  'PLATE',
  'CAR_NIGHT',
  'CAR_PAPER',
  'DISPLAY_FONT',
  `return (${tokenSrc});`,
)(
  (light, dark) => ({ light, dark }),
  fileUrl('martini-logo.webp'),
  fileUrl('martini-plate.webp'),
  fileUrl('car-night.webp'),
  fileUrl('car-paper.webp'),
  '"Bahnschrift SemiCondensed", "Bahnschrift", "Arial Narrow", "Segoe UI", sans-serif',
);

const cssStart = source.indexOf('const CSS = String.raw`');
const cssEnd = source.indexOf('`;', cssStart);
if (cssStart < 0 || cssEnd < 0) throw new Error('CSS not found');
const css = source
  .slice(cssStart + 'const CSS = String.raw`'.length, cssEnd)
  .replaceAll('${LOGO}', fileUrl('martini-logo.webp'))
  .replaceAll('${PLATE}', fileUrl('martini-plate.webp'))
  .replaceAll('${CAR_NIGHT}', fileUrl('car-night.webp'))
  .replaceAll('${CAR_PAPER}', fileUrl('car-paper.webp'));

const vars = (mode) =>
  Object.entries(TOKENS)
    .map(([name, value]) => `  ${name}: ${value[mode]};`)
    .join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Martini Racing settings - paddock preview</title>
<style>
:root {
${vars('light')}
}
* { box-sizing: border-box; }
html, body { margin: 0; min-height: 100%; }
body {
  background:
    radial-gradient(70% 40% at 80% 0%, #DCEAF7, transparent 70%),
    #EEF3F9;
  font-family: "Segoe UI Variable Text", "Segoe UI", sans-serif;
}
.panel {
  width: min(860px, calc(100vw - 48px));
  margin: 30px auto;
  border: 1px solid var(--wm-line);
  border-radius: 10px;
  background: var(--dsw-alias-bg-layer-1);
  box-shadow: 0 28px 70px rgba(8, 27, 50, .12);
}
</style>
<style>${css}</style>
</head>
<body data-wm-theme="martini">
  <div class="panel">
    <div class="wm-set">
      <header class="wm-set__hero">
        <img class="wm-set__logo" src="${fileUrl('martini-logo.webp')}" alt="Martini Racing">
        <div class="wm-set__heroText">
          <span class="wm-set__eyebrow">Livery · FW40 · 2017</span>
          <h2>Williams Martini Racing</h2>
          <p class="wm-set__lead">A paddock-to-floodlight livery for DeepSeek Harness, cut from the Martini four-stripe livery and the FW40 detail.</p>
          <div class="wm-set__stats">
            <span class="wm-set__stat"><b>4</b> stripes</span>
            <span class="wm-set__stat"><b>19</b> race number</span>
            <span class="wm-set__stat"><b>2017</b> season</span>
          </div>
        </div>
      </header>

      <section class="wm-set__section">
        <div class="wm-set__sectionHead">
          <h3>Choose the light</h3>
          <span class="wm-set__hint">Switches the whole shell</span>
        </div>
        <div class="wm-set__modes">
          <button type="button" class="wm-set__mode" aria-pressed="true">
            <span class="wm-set__swatch wm-set__swatch--day" aria-hidden="true"></span>
            <span class="wm-set__modeText">
              <span class="wm-set__modeName">Paddock <span class="wm-set__active">Active</span></span>
              <span class="wm-set__modeNote">Ice white, ink navy, daylight blue.</span>
            </span>
          </button>
          <button type="button" class="wm-set__mode" aria-pressed="false">
            <span class="wm-set__swatch wm-set__swatch--night" aria-hidden="true"></span>
            <span class="wm-set__modeText">
              <span class="wm-set__modeName">Night race</span>
              <span class="wm-set__modeNote">Deep navy, floodlights, electric blue.</span>
            </span>
          </button>
        </div>
      </section>

      <section class="wm-set__section">
        <div class="wm-set__sectionHead">
          <h3>Race palette</h3>
          <span class="wm-set__hint">Six colours, nothing else</span>
        </div>
        <div class="wm-set__palette">
          <span class="wm-set__chip"><i style="background:#071A31"></i>Ink navy</span>
          <span class="wm-set__chip"><i style="background:#009FDF"></i>Martini blue</span>
          <span class="wm-set__chip"><i style="background:#E4002B"></i>Rosso</span>
          <span class="wm-set__chip"><i style="background:#F1F5FA"></i>Ice white</span>
          <span class="wm-set__chip"><i style="background:#B9C9DA"></i>Silverstone</span>
          <span class="wm-set__chip"><i style="background:#EFBF4C"></i>Podium gold</span>
        </div>
      </section>

      <section class="wm-set__section">
        <div class="wm-set__sectionHead"><h3>Livery details</h3></div>
        <div class="wm-set__details">
          <div class="wm-set__detail"><b>Martini rails</b><span>Four-stripe edges on the rail, composer and buttons.</span></div>
          <div class="wm-set__detail"><b>Supplied artwork</b><span>The die-cut Martini roundel and the FW40 sidepod detail.</span></div>
          <div class="wm-set__detail"><b>Race typography</b><span>Condensed italic display type and pit-board micro labels.</span></div>
        </div>
      </section>

      <footer class="wm-set__footer">The theme is a token layer: the built-in Light, Dark and System preference still works. Disabling the plugin restores the stock palette and removes every livery surface.</footer>
    </div>
  </div>
</body>
</html>`;

mkdirSync(join(root, 'preview'), { recursive: true });
writeFileSync(join(root, 'preview', 'settings-light.html'), html);
console.log('preview/settings-light.html');
