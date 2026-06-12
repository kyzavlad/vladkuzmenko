// Generates optimized .webp versions of the case-study screenshots for fast
// loading on the site. Originals (.png) are left untouched.
// Run with: node scripts/optimize-screenshots.mjs
import sharp from "sharp";
import { readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dir = path.join(root, "public/case-studies");

const folders = readdirSync(dir).filter((f) =>
  statSync(path.join(dir, f)).isDirectory()
);

for (const folder of folders) {
  const fdir = path.join(dir, folder);
  const pngs = readdirSync(fdir).filter((f) => f.endsWith(".png"));
  for (const png of pngs) {
    const inPath = path.join(fdir, png);
    const outPath = inPath.replace(/\.png$/, ".webp");
    await sharp(inPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outPath);
    console.log("wrote", path.relative(root, outPath));
  }
}
