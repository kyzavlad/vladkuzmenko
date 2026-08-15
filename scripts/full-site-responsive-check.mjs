import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseURL = (process.env.BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const outDir = path.resolve("redesign-visual-artifact/full-site");
await fs.mkdir(outDir, { recursive: true });

const sitemapResponse = await fetch(`${baseURL}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Unable to load sitemap.xml: ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const routes = [...new Set(urls.map((raw) => {
  const u = new URL(raw);
  return `${u.pathname}${u.search}` || "/";
}))];

if (!routes.length) throw new Error("No routes found in sitemap.xml");

const viewports = [
  { name: "mobile_390", width: 390, height: 844 },
  { name: "desktop_1440", width: 1440, height: 1000 },
];

const browser = await chromium.launch({ headless: true });
const findings = [];
const rows = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  for (const route of routes) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });

    let status = 0;
    try {
      const response = await page.goto(`${baseURL}${route}`, { waitUntil: "domcontentloaded", timeout: 30000 });
      status = response?.status() ?? 0;
      await page.waitForTimeout(650);
    } catch (error) {
      findings.push({ route, viewport: viewport.name, issue: "navigation failed", details: String(error) });
      await page.close();
      continue;
    }

    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const overflowNodes = [...document.querySelectorAll("body *")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2);
        })
        .slice(0, 8)
        .map((el) => ({ tag: el.tagName, className: typeof el.className === "string" ? el.className.slice(0, 160) : "", right: Math.round(el.getBoundingClientRect().right), left: Math.round(el.getBoundingClientRect().left) }));
      return {
        scrollWidth: Math.max(root.scrollWidth, body?.scrollWidth || 0),
        clientWidth: root.clientWidth,
        h1: document.querySelectorAll("h1").length,
        textLength: body?.innerText?.trim().length || 0,
        overflowNodes,
      };
    });

    const row = { route, viewport: viewport.name, status, ...metrics, consoleErrors: errors.length };
    rows.push(row);

    if (status >= 400 || status === 0) findings.push({ ...row, issue: `HTTP ${status}` });
    if (metrics.scrollWidth > metrics.clientWidth + 2) findings.push({ ...row, issue: `horizontal overflow ${metrics.scrollWidth - metrics.clientWidth}px` });
    if (metrics.h1 !== 1) findings.push({ ...row, issue: `expected one H1, found ${metrics.h1}` });
    if (metrics.textLength < 150) findings.push({ ...row, issue: "unexpectedly little visible text" });
    if (errors.length) findings.push({ ...row, issue: "console/page errors", details: errors.slice(0, 5) });

    await page.close();
  }
  await context.close();
}

await browser.close();
await fs.writeFile(path.join(outDir, "summary.json"), JSON.stringify(rows, null, 2));
await fs.writeFile(path.join(outDir, "findings.json"), JSON.stringify(findings, null, 2));
await fs.writeFile(
  path.join(outDir, "REPORT.md"),
  `# Full sitemap responsive QA\n\n- Base: ${baseURL}\n- Sitemap routes: ${routes.length}\n- Viewports: ${viewports.length}\n- Page checks: ${routes.length * viewports.length}\n- Findings: ${findings.length}\n\n${findings.length ? findings.map((f) => `- ${f.route} @ ${f.viewport}: ${f.issue}`).join("\n") : "No automated responsive/runtime findings."}\n`,
);

if (findings.length) {
  console.error(`Full-site QA found ${findings.length} issue(s).`);
  process.exitCode = 1;
}
