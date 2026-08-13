#!/usr/bin/env node
/**
 * Stamp the correct `lang` on the exported localized HTML.
 *
 * The App Router renders a single root <html> element, and `output: "export"`
 * has no request context to vary it by — so every exported file leaves the
 * build with `lang="en"`. This pass rewrites the documents under /ua and /ru
 * (and the /ua.html, /ru.html entry files) to the language they are written in,
 * using the same `uk` / `ru` codes as the hreflang alternates.
 *
 * Runs after `next build` and before the deploy copy — see package.json.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const OUT = resolve(process.cwd(), "out");

/** Exported path prefix -> html lang code (Ukrainian is `uk`, not `ua`). */
const LOCALES = [
  { dir: "ua", lang: "uk" },
  { dir: "ru", lang: "ru" },
];

function htmlFilesUnder(path) {
  let entry;
  try {
    entry = statSync(path);
  } catch {
    return [];
  }
  if (entry.isFile()) return path.endsWith(".html") ? [path] : [];
  return readdirSync(path).flatMap((name) => htmlFilesUnder(join(path, name)));
}

let changed = 0;
let missed = 0;

for (const { dir, lang } of LOCALES) {
  const files = [...htmlFilesUnder(join(OUT, dir)), ...htmlFilesUnder(join(OUT, `${dir}.html`))];
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    const patched = html.replace(/<html([^>]*?)\slang="[^"]*"/, `<html$1 lang="${lang}"`);
    if (patched === html) {
      missed += 1;
      console.warn(`set-locale-lang: no <html lang> found in ${file}`);
      continue;
    }
    writeFileSync(file, patched);
    changed += 1;
  }
}

console.log(`set-locale-lang: updated ${changed} file(s)${missed ? `, ${missed} skipped` : ""}`);
if (missed > 0) process.exitCode = 1;
