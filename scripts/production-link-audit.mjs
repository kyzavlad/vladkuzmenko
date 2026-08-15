import fs from "node:fs/promises";

const base = (process.env.BASE_URL || "https://vladkuzmenko.com").replace(/\/$/, "");
const outDir = "site-audit-artifact";
await fs.mkdir(outDir, { recursive: true });

const sameSite = (a, b) => a.replace(/^www\./, "") === b.replace(/^www\./, "");
const sitemapRes = await fetch(`${base}/sitemap.xml`, { redirect: "follow" });
if (!sitemapRes.ok) throw new Error(`Sitemap HTTP ${sitemapRes.status}`);
const sitemapXml = await sitemapRes.text();
const sitemapUrls = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
const links = new Set(sitemapUrls);

let nextPage = 0;
const pageWorker = async () => {
  while (true) {
    const i = nextPage++;
    if (i >= sitemapUrls.length) return;
    const pageUrl = sitemapUrls[i];
    try {
      const res = await fetch(pageUrl, { redirect: "follow" });
      const html = await res.text();
      for (const match of html.matchAll(/href=["']([^"']+)["']/gi)) {
        const href = match[1];
        if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
        try {
          const u = new URL(href, pageUrl);
          if (sameSite(u.hostname, new URL(base).hostname)) {
            u.hash = "";
            links.add(u.href);
          }
        } catch {}
      }
    } catch {}
  }
};
await Promise.all(Array.from({ length: 12 }, () => pageWorker()));

const targets = [...links].sort();
const checks = [];
let nextLink = 0;
const linkWorker = async () => {
  while (true) {
    const i = nextLink++;
    if (i >= targets.length) return;
    const url = targets[i];
    let status = null;
    let finalUrl = null;
    let error = null;
    try {
      let res = await fetch(url, { method: "HEAD", redirect: "follow" });
      if (res.status === 403 || res.status === 405) res = await fetch(url, { method: "GET", redirect: "follow" });
      status = res.status;
      finalUrl = res.url;
    } catch (e) {
      error = String(e);
    }
    checks.push({ url, status, finalUrl, error });
  }
};
await Promise.all(Array.from({ length: 20 }, () => linkWorker()));
checks.sort((a, b) => a.url.localeCompare(b.url));

const broken = checks.filter((x) => x.error || x.status === null || x.status >= 400);
const report = {
  generatedAt: new Date().toISOString(),
  sitemapUrls: sitemapUrls.length,
  internalUrlsChecked: checks.length,
  brokenCount: broken.length,
  broken,
  checks,
};
await fs.writeFile(`${outDir}/link-report.json`, JSON.stringify(report, null, 2));
const rows = broken.map((x) => `| ${x.status ?? "ERR"} | ${x.url} | ${(x.error || x.finalUrl || "").replaceAll("|", "\\|")} |`).join("\n") || "| - | none | - |";
const md = `# Production internal-link audit\n\n- Sitemap URLs: **${sitemapUrls.length}**\n- Internal URLs checked: **${checks.length}**\n- Broken: **${broken.length}**\n\n| Status | URL | Detail |\n|---:|---|---|\n${rows}\n`;
await fs.writeFile(`${outDir}/LINK_REPORT.md`, md);
console.log(md);
if (broken.length) process.exitCode = 1;
