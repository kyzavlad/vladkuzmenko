import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const baseURL = process.env.BASE_URL || "http://127.0.0.1:4173";
const outDir = path.resolve("redesign-visual-artifact");
const shotDir = path.join(outDir, "screenshots");
await fs.mkdir(shotDir, { recursive: true });

const routes = [
  "/ru",
  "/ru/products",
  "/ru/visibilityos",
  "/ru/warriors-team",
  "/ru/drop",
  "/ru/work",
  "/ua",
  "/",
];

const viewports = [
  { name: "mobile_390", width: 390, height: 844 },
  { name: "tablet_768", width: 768, height: 1024 },
  { name: "desktop_1440", width: 1440, height: 1000 },
];

const browser = await chromium.launch({ headless: true });
const findings = [];
const summary = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, deviceScaleFactor: 1 });
  for (const route of routes) {
    const page = await context.newPage();
    const consoleErrors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (err) => consoleErrors.push(err.message));

    const response = await page.goto(`${baseURL}${route}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(1200);

    // Move through the page once so whileInView sections settle before the full-page capture.
    await page.evaluate(async () => {
      const step = Math.max(500, Math.floor(window.innerHeight * 0.75));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      h1: document.querySelectorAll("h1").length,
      bodyText: document.body.innerText.length,
      loadingVisible: [...document.querySelectorAll(".loading-animation")].some((el) => {
        const s = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity || 1) > 0.05 && r.width > 0 && r.height > 0;
      }),
    }));

    const routeName = route === "/" ? "home" : route.replace(/^\//, "").replaceAll("/", "__");
    const filename = `${routeName}__${viewport.name}.png`;
    await page.screenshot({ path: path.join(shotDir, filename), fullPage: true });

    const status = response?.status() ?? 0;
    const row = { route, viewport: viewport.name, status, ...metrics, consoleErrors: consoleErrors.length };
    summary.push(row);

    if (status >= 400) findings.push({ ...row, issue: `HTTP ${status}` });
    if (metrics.scrollWidth > metrics.clientWidth + 2) findings.push({ ...row, issue: `horizontal overflow ${metrics.scrollWidth - metrics.clientWidth}px` });
    if (metrics.h1 !== 1) findings.push({ ...row, issue: `expected one H1, found ${metrics.h1}` });
    if (metrics.bodyText < 200) findings.push({ ...row, issue: "page body unexpectedly small" });
    if (metrics.loadingVisible) findings.push({ ...row, issue: "loading overlay still visible" });
    if (consoleErrors.length) findings.push({ ...row, issue: "console/page errors", details: consoleErrors.slice(0, 5) });

    await page.close();
  }
  await context.close();
}

await browser.close();
await fs.writeFile(path.join(outDir, "summary.json"), JSON.stringify(summary, null, 2));
await fs.writeFile(path.join(outDir, "findings.json"), JSON.stringify(findings, null, 2));
await fs.writeFile(
  path.join(outDir, "REPORT.md"),
  `# Ecosystem redesign visual QA\n\n- Base: ${baseURL}\n- Routes: ${routes.length}\n- Viewports: ${viewports.length}\n- Screenshots: ${routes.length * viewports.length}\n- Findings: ${findings.length}\n\n${findings.length ? findings.map((f) => `- ${f.route} @ ${f.viewport}: ${f.issue}`).join("\n") : "No automated layout/runtime findings."}\n`,
);

if (findings.length) {
  console.error(JSON.stringify(findings, null, 2));
  process.exitCode = 1;
}
