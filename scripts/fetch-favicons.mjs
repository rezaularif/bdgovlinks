// Fetch and cache favicons locally for all sites referenced in pages/index.vue
// Usage: node scripts/fetch-favicons.mjs

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const PAGE_FILE = path.join(repoRoot, 'pages', 'index.vue');
const OUTPUT_DIR = path.join(repoRoot, 'public', 'site-icons');
const ICON_MAP_FILE = path.join(repoRoot, 'utils', 'site-icons.json');

async function ensureDir(dir) {
  await fs.promises.mkdir(dir, { recursive: true }).catch(() => {});
}

function extractUrlsFromPage(source) {
  const regex = /url:\s*['"](https?:\/\/[^'"\s]+)['"]/g;
  const urls = new Set();
  let m;
  while ((m = regex.exec(source)) !== null) {
    urls.add(m[1]);
  }
  return Array.from(urls);
}

async function fetchWithOk(url, init) {
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res;
}

function resolveUrl(base, href) {
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
}

function pickIconHref(html, base) {
  // Quick regex scans for common rel values
  const linkTagRegex = /<link\s+[^>]*>/gi;
  const relRegex = /rel\s*=\s*"([^"]*)"/i;
  const hrefRegex = /href\s*=\s*"([^"]*)"/i;
  const candidates = [];
  let m;
  while ((m = linkTagRegex.exec(html)) !== null) {
    const tag = m[0];
    const relMatch = tag.match(relRegex);
    const hrefMatch = tag.match(hrefRegex);
    if (!relMatch || !hrefMatch) continue;
    const rel = relMatch[1].toLowerCase();
    const href = resolveUrl(base, hrefMatch[1]);
    if (!href) continue;
    if (
      rel.includes('icon') ||
      rel.includes('shortcut icon') ||
      rel.includes('apple-touch-icon')
    ) {
      candidates.push(href);
    }
  }
  // Prefer png/svg over ico if multiple
  candidates.sort((a, b) => {
    const score = (u) => (u.endsWith('.png') ? 3 : u.endsWith('.svg') ? 2 : u.endsWith('.ico') ? 1 : 0);
    return score(b) - score(a);
  });
  return candidates[0] || null;
}

function extFromContentType(ct, fallback) {
  if (!ct) return fallback;
  if (ct.includes('png')) return '.png';
  if (ct.includes('svg')) return '.svg';
  if (ct.includes('jpeg') || ct.includes('jpg')) return '.jpg';
  if (ct.includes('ico') || ct.includes('vnd.microsoft.icon')) return '.ico';
  return fallback;
}

async function downloadToFile(url, outFile) {
  const res = await fetchWithOk(url, { redirect: 'follow' });
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.promises.writeFile(outFile, buf);
}

async function fetchFaviconForHost(originUrl) {
  const { origin, hostname } = new URL(originUrl);
  const baseName = hostname; // file name without extension yet

  // 1) try /favicon.ico
  try {
    const icoUrl = `${origin}/favicon.ico`;
    const res = await fetch(icoUrl, { method: 'GET' });
    if (res.ok && (res.headers.get('content-type') || '').includes('image')) {
      const out = path.join(OUTPUT_DIR, `${baseName}.ico`);
      const buf = Buffer.from(await res.arrayBuffer());
      await fs.promises.writeFile(out, buf);
      return out;
    }
  } catch {}

  // 2) parse page for <link rel="icon" ...>
  try {
    const pageRes = await fetch(origin, { method: 'GET' });
    if (pageRes.ok) {
      const html = await pageRes.text();
      const iconHref = pickIconHref(html, origin);
      if (iconHref) {
        const res = await fetch(iconHref, { method: 'GET' });
        if (res.ok && (res.headers.get('content-type') || '').includes('image')) {
          const ct = res.headers.get('content-type') || '';
          const out = path.join(OUTPUT_DIR, `${baseName}${extFromContentType(ct, path.extname(new URL(iconHref).pathname) || '.png')}`);
          const buf = Buffer.from(await res.arrayBuffer());
          await fs.promises.writeFile(out, buf);
          return out;
        }
      }
    }
  } catch {}

  // 3) fallback to Google s2 once to cache a PNG locally
  try {
    const s2 = `https://www.google.com/s2/favicons?domain=${origin}&sz=64`;
    const out = path.join(OUTPUT_DIR, `${baseName}.png`);
    await downloadToFile(s2, out);
    return out;
  } catch {}

  return null;
}

async function main() {
  console.log('Fetching favicons...');
  const src = await fs.promises.readFile(PAGE_FILE, 'utf8');
  const urls = extractUrlsFromPage(src);
  await ensureDir(OUTPUT_DIR);

  let ok = 0, fail = 0;
  for (const u of urls) {
    const { hostname } = new URL(u);
    const existing = (await fs.promises.readdir(OUTPUT_DIR).catch(() => [])).find(f => f.startsWith(hostname + '.'));
    if (existing) {
      continue;
    }
    try {
      const file = await fetchFaviconForHost(u);
      if (file) {
        ok++;
        console.log(`✓ ${hostname} -> ${path.basename(file)}`);
      } else {
        fail++;
        console.warn(`! ${hostname} -> no icon`);
      }
    } catch (e) {
      fail++;
      console.warn(`! ${hostname} error: ${e.message}`);
    }
  }
  console.log(`Done. Saved: ${ok}, missed: ${fail}. Output: ${path.relative(repoRoot, OUTPUT_DIR)}`);

  // Build mapping JSON of hostname -> public path
  const files = await fs.promises.readdir(OUTPUT_DIR).catch(() => []);
  const map = {};
  for (const f of files) {
    const hostname = f.replace(/\.(png|svg|ico|jpg|jpeg|webp)$/i, '');
    // prefer existing entries that are png/svg over ico
    const score = (name) => name.endsWith('.png') ? 3 : name.endsWith('.svg') ? 2 : name.endsWith('.ico') ? 1 : 0;
    if (!map[hostname] || score(f) > score(path.basename(map[hostname]))) {
      map[hostname] = `/site-icons/${f}`;
    }
  }
  await fs.promises.mkdir(path.dirname(ICON_MAP_FILE), { recursive: true }).catch(() => {});
  await fs.promises.writeFile(ICON_MAP_FILE, JSON.stringify(map, null, 2), 'utf8');
  console.log(`Wrote icon map: ${path.relative(repoRoot, ICON_MAP_FILE)} (${Object.keys(map).length} hosts)`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

