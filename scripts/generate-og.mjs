// Generates a premium 1200×630 OG banner (black/gold) using the real logo.
// Run once with: node scripts/generate-og.mjs  (output committed to /public/og-banner.png)
import sharp from "sharp";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const W = 1200;
const H = 630;

const svg = `
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="50%" cy="34%" r="65%">
      <stop offset="0%" stop-color="#4a3a0f"/>
      <stop offset="48%" stop-color="#120d02"/>
      <stop offset="100%" stop-color="#000000"/>
    </radialGradient>
    <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#B8860B"/>
      <stop offset="50%" stop-color="#F7E98E"/>
      <stop offset="100%" stop-color="#B8860B"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <text x="${W / 2}" y="455" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="34" font-weight="600" fill="#ededed">Building cashflow through AI, content, client work and execution.</text>
  <rect x="${W / 2 - 140}" y="492" width="280" height="3" rx="1.5" fill="url(#gold)"/>
  <text x="${W / 2}" y="548" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="6" fill="#D4AF37">VLADKUZMENKO.COM</text>
</svg>`;

const base = await sharp(Buffer.from(svg)).png().toBuffer();

const logoW = 600;
const logo = await sharp(path.join(root, "public/brand/vlad-kuzmenko-logo-gold.png"))
  .resize({ width: logoW })
  .png()
  .toBuffer();
const logoH = (await sharp(logo).metadata()).height ?? Math.round((logoW * 548) / 1800);

await sharp(base)
  .composite([
    {
      input: logo,
      top: Math.round(250 - logoH / 2),
      left: Math.round((W - logoW) / 2),
    },
  ])
  .png()
  .toFile(path.join(root, "public/og-banner.png"));

console.log("public/og-banner.png written");
