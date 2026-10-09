// Converts src/data/source-places.csv (exported from Google My Maps)
// into src/data/places.json, which the website reads.
//
// Usage:  npm run places
//
// CSV columns: WKT, name, description
//   WKT         -> "POINT (longitude latitude)"  (longitude comes FIRST)
//   name        -> business or attraction name (kept exactly as written)
//   description -> original category (kept as "originalCategory")

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const csvPath = path.join(root, 'src/data/source-places.csv');
const outPath = path.join(root, 'src/data/places.json');

// Original My Maps category -> internal category key used by the website.
const CATEGORY_MAP = {
  'attractions': 'attractions',
  'restaurants / bars': 'restaurants',
  'street food': 'streetFood',
  'coffee shops': 'coffee',
  'groceries': 'groceries',
  'transport': 'transport',
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  const src = text.replace(/^﻿/, '');
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQuotes) {
      if (ch === '"' && src[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') inQuotes = false;
      else field += ch;
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ',') {
      row.push(field); field = '';
    } else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i + 1] === '\n') i++;
      row.push(field); field = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }
  row.push(field);
  if (row.some((c) => c.trim() !== '')) rows.push(row);
  return rows;
}

// WKT is "POINT (longitude latitude)". Returns { lat, lng } or nulls if invalid.
export function parsePoint(wkt) {
  const m = /^\s*POINT\s*\(\s*(-?\d+(?:\.\d+)?)\s+(-?\d+(?:\.\d+)?)\s*\)\s*$/i.exec(wkt || '');
  if (!m) return { lat: null, lng: null };
  const lng = Number(m[1]); // first number = longitude
  const lat = Number(m[2]); // second number = latitude
  if (!(Math.abs(lat) <= 90 && Math.abs(lng) <= 180)) return { lat: null, lng: null };
  // 7 decimals is about 1 cm: tidies floating-point noise like -87.20292189999999
  return { lat: Number(lat.toFixed(7)), lng: Number(lng.toFixed(7)) };
}

const slugify = (s) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'place';

const rows = parseCsv(readFileSync(csvPath, 'utf8'));
const header = rows.shift().map((h) => h.trim().toLowerCase());
const col = (name) => header.indexOf(name);
const [iWkt, iName, iDesc] = [col('wkt'), col('name'), col('description')];
if ([iWkt, iName, iDesc].includes(-1)) {
  console.error('CSV must have the columns: WKT, name, description');
  process.exit(1);
}

const usedIds = new Set();
const places = [];
let skipped = 0;
for (const r of rows) {
  const name = (r[iName] || '').trim();
  if (!name) { skipped++; console.warn('Skipped a row with no name:', r.join(',')); continue; }
  const originalCategory = (r[iDesc] || '').trim();
  const category = CATEGORY_MAP[originalCategory.toLowerCase()] || 'other';
  if (category === 'other') console.warn(`Unknown category "${originalCategory}" for "${name}" -> shown under "Other"`);
  const { lat, lng } = parsePoint(r[iWkt]);
  if (lat === null) console.warn(`Invalid or missing coordinates for "${name}" -> will use a Google Maps search link`);

  let id = slugify(name);
  for (let n = 2; usedIds.has(id); n++) id = `${slugify(name)}-${n}`;
  usedIds.add(id);

  // "image" is optional: put a URL or a file path like "/photos/my-place.jpg" to show a photo.
  places.push({ id, name, category, originalCategory, lat, lng, image: null });
}

writeFileSync(outPath, JSON.stringify(places, null, 2) + '\n');
console.log(`places.json: ${places.length} places written (${skipped} rows skipped).`);
