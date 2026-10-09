// Sanity checks: run with `npm run verify` (after `npm run places`).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { directionsUrl } from '../src/utils/maps.js';
import { filterPlaces } from '../src/utils/filter.js';
import { translations, CATEGORY_ORDER } from '../src/i18n.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const places = JSON.parse(readFileSync(path.join(root, 'src/data/places.json'), 'utf8'));
const csvLines = readFileSync(path.join(root, 'src/data/source-places.csv'), 'utf8')
  .replace(/^﻿/, '')
  .split(/\r?\n/)
  .filter((l) => l.trim())
  .slice(1);

let failures = 0;
const check = (ok, msg) => {
  if (!ok) { failures++; console.error('FAIL:', msg); }
};

// 1. Every CSV row is in the site data.
check(places.length === csvLines.length, `CSV has ${csvLines.length} rows, places.json has ${places.length}`);

// 2. Coordinates: raw CSV text vs. parsed data, in order (longitude is FIRST in WKT).
csvLines.forEach((line, i) => {
  const m = /POINT \((-?[\d.]+) (-?[\d.]+)\),(.*),([^,]*)$/.exec(line);
  const p = places[i];
  check(!!m && !!p, `row ${i + 2} could not be matched`);
  if (!m || !p) return;
  const [, rawLng, rawLat, name, cat] = m;
  check(p.name === name, `row ${i + 2} name "${p.name}" != "${name}"`);
  check(p.originalCategory === cat, `row ${i + 2} original category "${p.originalCategory}" != "${cat}"`);
  check(Math.abs(p.lng - Number(rawLng)) < 1e-6, `${name}: lng ${p.lng} != ${rawLng}`);
  check(Math.abs(p.lat - Number(rawLat)) < 1e-6, `${name}: lat ${p.lat} != ${rawLat}`);
  // Tegucigalpa is near lat 14.1, lng -87.2. A swap would break these bounds.
  check(p.lat > 13.9 && p.lat < 14.3, `${name}: latitude ${p.lat} not near Tegucigalpa`);
  check(p.lng > -87.4 && p.lng < -87.0, `${name}: longitude ${p.lng} not near Tegucigalpa`);

  // 3. Directions link uses latitude first, then longitude.
  const url = directionsUrl(p);
  check(
    url === `https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}`,
    `${name}: bad directions link ${url}`
  );
  check(CATEGORY_ORDER.includes(p.category) && p.category !== 'other', `${name}: unmapped category`);
});

// 4. Fallback to a name search when coordinates are missing/invalid.
for (const bad of [{ lat: null, lng: null }, { lat: NaN, lng: 1 }, { lat: 95, lng: 0 }, {}]) {
  const url = directionsUrl({ name: 'Café X', ...bad });
  check(url.startsWith('https://www.google.com/maps/search/?api=1&query=Caf%C3%A9%20X'), `fallback failed for ${JSON.stringify(bad)}: ${url}`);
}

// 5. Search + category filters work together.
const names = (r) => r.map((p) => p.name);
check(filterPlaces(places).length === places.length, 'no filter should return everything');
check(names(filterPlaces(places, { query: 'cafe' })).includes('Café Paradiso'), '"cafe" should match "Café Paradiso" (accent-insensitive)');
check(names(filterPlaces(places, { query: 'ANGELES' })).includes('Terminal buses a Cantarranas y Valle de Ángeles'), 'case/accent-insensitive search');
check(filterPlaces(places, { category: 'coffee' }).every((p) => p.category === 'coffee'), 'category filter');
const combo = filterPlaces(places, { query: 'baleadas', category: 'streetFood' });
check(combo.length === 3, `baleadas + streetFood should give 3, got ${combo.length}`);
check(filterPlaces(places, { query: 'baleadas', category: 'coffee' }).length === 0, 'query + wrong category should be empty');
check(filterPlaces(places, { query: 'zzzz' }).length === 0, 'no-match query should be empty');

// 6. English and Spanish have exactly the same keys.
const keys = (o, prefix = '') =>
  Object.entries(o).flatMap(([k, v]) =>
    v && typeof v === 'object' ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]);
const [en, es] = [keys(translations.en).sort(), keys(translations.es).sort()];
check(JSON.stringify(en) === JSON.stringify(es), 'EN and ES translation keys differ');
check(translations.en.card.directions === 'Get directions' && translations.es.card.directions === 'Cómo llegar', 'directions labels');
check(translations.en.map.title === 'Explore the map' && translations.es.map.title === 'Explorá el mapa', 'map titles');

// Summary
const counts = {};
places.forEach((p) => (counts[p.category] = (counts[p.category] || 0) + 1));
console.log('Places:', places.length, '| by category:', counts);
if (failures) { console.error(`\n${failures} check(s) failed.`); process.exit(1); }
console.log('All checks passed.');
