import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const base = (process.env.BASE_URL || 'https://vladkuzmenko.com').replace(/\/$/, '');
const outDir = 'site-audit-artifact';
const shotDir = path.join(outDir, 'screenshots');
await fs.mkdir(shotDir, { recursive: true });

const sitemapResponse = await fetch(`${base}/sitemap.xml`, { redirect: 'follow' });
if (!sitemapResponse.ok) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
const xml = await sitemapResponse.text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1].trim());
if (!urls.length) throw new Error('Sitemap returned no URLs');

const corePaths = new Set([
  '/', '/ua', '/ru',
  '/growth-systems', '/ua/growth-systems', '/ru/growth-systems',
  '/work', '/ua/work', '/ru/work',
  '/products', '/ua/products', '/ru/products',
  '/visibilityos', '/ua/visibilityos', '/ru/visibilityos',
  '/ai-systems', '/ua/ai-systems', '/ru/ai-systems',
  '/automation', '/ua/automation', '/ru/automation',
  '/auto-dealers', '/ua/auto-dealers', '/ru/auto-dealers',
  '/warriors-team', '/ua/warriors-team', '/ru/warriors-team',
  '/drop', '/ua/drop', '/ru/drop'
]);

const viewports = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 1000 },
];
const extraCoreViewports = [
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'laptop', width: 1024, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const results = [];
const internalLinks = new Set();

const safeName = (url) => {
  const u = new URL(url);
  const p = u.pathname === '/' ? 'home' : u.pathname.replace(/^\//, '').replaceAll('/', '__');
  return p.replace(/[^a-zA-Z0-9_\-]/g, '_');
};

async function auditOne(url, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    locale: url.includes('/ua') ? 'uk-UA' : url.includes('/ru') ? 'ru-RU' : 'en-US',
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', err => pageErrors.push(String(err)));

  let status = null;
  let navError = null;
  try {
    const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    status = response?.status() ?? null;
    await page.waitForLoadState('networkidle', { timeout: 12000 }).catch(() => {});
    await page.waitForTimeout(1800);
    await page.evaluate(async () => {
      await document.fonts?.ready;
      const step = Math.max(500, window.innerHeight * 0.8);
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 45));
      }
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 150));
    });
  } catch (e) {
    navError = String(e);
  }

  const data = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const qa = (s) => [...document.querySelectorAll(s)];
    const imgs = qa('img');
    const anchors = qa('a[href]');
    const doc = document.documentElement;
    const overflowBy = Math.max(doc.scrollWidth, document.body.scrollWidth) - window.innerWidth;
    const badWide = qa('body *').map(el => {
      const r = el.getBoundingClientRect();
      return { tag: el.tagName, cls: String(el.className || '').slice(0, 120), left: Math.round(r.left), right: Math.round(r.right), width: Math.round(r.width) };
    }).filter(x => x.width > 0 && (x.left < -2 || x.right > window.innerWidth + 2)).slice(0, 20);
    const emptyButtons = qa('button').filter(b => !(b.innerText || b.getAttribute('aria-label') || b.getAttribute('title'))?.trim()).length;
    const emptyLinks = anchors.filter(a => !(a.innerText || a.getAttribute('aria-label') || a.getAttribute('title'))?.trim()).length;
    const missingAlt = imgs.filter(i => !i.hasAttribute('alt')).length;
    const brokenImages = imgs.filter(i => i.complete && i.naturalWidth === 0).map(i => i.currentSrc || i.src);
    const h1s = qa('h1').map(h => (h.innerText || '').trim()).filter(Boolean);
    const canon = q('link[rel="canonical"]')?.href || null;
    const alternates = qa('link[rel="alternate"][hreflang]').map(x => ({ lang: x.getAttribute('hreflang'), href: x.href }));
    const title = document.title;
    const description = q('meta[name="description"]')?.content || null;
    const robots = q('meta[name="robots"]')?.content || null;
    const lang = document.documentElement.lang || null;
    const loadingVisible = qa('.loading-animation').some(el => {
      const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      return s.display !== 'none' && s.visibility !== 'hidden' && Number(s.opacity || 1) > 0.05 && r.width > 0 && r.height > 0;
    });
    return {
      title, description, robots, lang, canon, alternates,
      h1Count: h1s.length, h1s,
      overflowBy, badWide,
      brokenImages, missingAlt, emptyButtons, emptyLinks,
      bodyHeight: Math.round(document.body.getBoundingClientRect().height),
      internalHrefs: anchors.map(a => a.href).filter(Boolean),
      loadingVisible,
    };
  }).catch(() => ({ evaluationFailed: true }));

  for (const href of data.internalHrefs || []) {
    try {
      const u = new URL(href);
      if (u.origin === new URL(base).origin) {
        u.hash = '';
        internalLinks.add(u.href);
      }
    } catch {}
  }
  delete data.internalHrefs;

  const screenshot = `${safeName(url)}__${vp.name}_${vp.width}.png`;
  await page.screenshot({ path: path.join(shotDir, screenshot), fullPage: true }).catch(() => {});
  await context.close();
  return { url, viewport: vp, status, navError, consoleErrors, pageErrors, screenshot, ...data };
}

for (const url of urls) {
  const p = new URL(url).pathname;
  for (const vp of viewports) results.push(await auditOne(url, vp));
  if (corePaths.has(p)) {
    for (const vp of extraCoreViewports) results.push(await auditOne(url, vp));
  }
}

const linkResults = [];
for (const href of [...internalLinks].sort()) {
  let status = null; let error = null;
  try {
    let res = await fetch(href, { method: 'HEAD', redirect: 'manual' });
    if (res.status === 405 || res.status === 403) res = await fetch(href, { method: 'GET', redirect: 'manual' });
    status = res.status;
  } catch (e) { error = String(e); }
  linkResults.push({ href, status, error });
}
await browser.close();

const issues = [];
for (const r of results) {
  const add = (kind, detail) => issues.push({ kind, url: r.url, viewport: r.viewport?.name, detail });
  if (r.navError) add('navigation-error', r.navError);
  if (r.status && r.status >= 400) add('http-status', String(r.status));
  if (r.h1Count !== 1) add('h1-count', `${r.h1Count}: ${(r.h1s || []).join(' | ')}`);
  if ((r.overflowBy || 0) > 2) add('horizontal-overflow', `${r.overflowBy}px; ${JSON.stringify(r.badWide || [])}`);
  if ((r.brokenImages || []).length) add('broken-images', r.brokenImages.join(', '));
  if ((r.pageErrors || []).length) add('page-errors', r.pageErrors.join(' | '));
  if ((r.consoleErrors || []).length) add('console-errors', r.consoleErrors.slice(0, 5).join(' | '));
  if (!r.title) add('missing-title', 'empty document.title');
  if (!r.description) add('missing-description', 'no meta description');
  if (!r.canon) add('missing-canonical', 'no canonical');
  if (!r.lang) add('missing-lang', 'html lang empty');
  if (r.loadingVisible) add('loading-overlay-visible', 'loading animation remains visible after settle');
  if ((r.missingAlt || 0) > 0) add('missing-alt', String(r.missingAlt));
  if ((r.emptyButtons || 0) > 0) add('empty-buttons', String(r.emptyButtons));
  if ((r.emptyLinks || 0) > 0) add('empty-links', String(r.emptyLinks));
}
for (const l of linkResults) {
  if (l.error || (l.status && l.status >= 400)) issues.push({ kind: 'broken-internal-link', url: l.href, viewport: '-', detail: l.error || String(l.status) });
}

const counts = {};
for (const i of issues) counts[i.kind] = (counts[i.kind] || 0) + 1;
const report = {
  generatedAt: new Date().toISOString(), base,
  sitemapUrls: urls.length, screenshots: results.length, auditedResults: results.length,
  internalLinksChecked: linkResults.length, issueCounts: counts, issues, results, linkResults,
};
await fs.writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2));

const rows = Object.entries(counts).sort((a,b) => b[1]-a[1]).map(([k,v]) => `| ${k} | ${v} |`).join('\n') || '| none | 0 |';
const issueRows = issues.slice(0, 300).map(i => `| ${i.kind} | ${i.viewport} | ${i.url.replaceAll('|','%7C')} | ${(i.detail || '').replaceAll('\n',' ').replaceAll('|','\\|').slice(0, 500)} |`).join('\n');
const md = `# Production visual audit\n\nGenerated: ${report.generatedAt}\n\n- Sitemap URLs: **${urls.length}**\n- Screenshots: **${results.length}**\n- Internal URLs checked: **${linkResults.length}**\n- Total findings: **${issues.length}**\n\n## Finding counts\n\n| Finding | Count |\n|---|---:|\n${rows}\n\n## Findings\n\n| Finding | Viewport | URL | Detail |\n|---|---|---|---|\n${issueRows || '| none | - | - | - |'}\n`;
await fs.writeFile(path.join(outDir, 'REPORT.md'), md);
console.log(md);
