import { NextRequest, NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import {
  analyzeVisibilityScan,
  extractPageSignals,
  getVisibilityScanLimitations,
  normalizeComparableHost,
  type CompetitorSnapshot,
  type GrowthAction,
  type GrowthEffort,
  type GrowthImpact,
  type GrowthLane,
  type ScanCategory,
  type ScanPageKind,
  type ScanPageSummary,
  type VisibilityPillars,
  type VisibilitySiteScanResult,
} from "@/lib/visibilityos-scan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_HTML_BYTES = 2_000_000;
const MAX_TEXT_BYTES = 500_000;
const MAX_REDIRECTS = 4;
const FETCH_TIMEOUT_MS = 5_500;
const MAX_SITE_PAGES = 5;
const MAX_COMPETITORS = 2;
const MAX_DISCOVERED_LINKS = 160;
const USER_AGENT = "VisibilityOS/2.0 (+https://vladkuzmenko.com/visibilityos)";

type Lang = "en" | "ua" | "ru";
type ScanInput = {
  url?: unknown;
  lang?: unknown;
  service?: unknown;
  location?: unknown;
  competitors?: unknown;
};

const ERROR_COPY: Record<Lang, Record<string, string>> = {
  en: {
    invalid: "Enter a valid public website URL.",
    blocked: "This address cannot be scanned because it is not a public internet host.",
    timeout: "The website took too long to respond. Try again in a moment.",
    content: "The URL did not return a public page that VisibilityOS can scan.",
    large: "The returned page is too large for this scan.",
    fetch: "VisibilityOS could not reach this website from the scan service.",
  },
  ua: {
    invalid: "Введіть коректний URL публічного сайту.",
    blocked: "Цю адресу не можна сканувати, оскільки це не публічний інтернет-хост.",
    timeout: "Сайт відповідав надто довго. Спробуйте ще раз за мить.",
    content: "URL не повернув публічну сторінку, яку може просканувати VisibilityOS.",
    large: "Сторінка надто велика для цього сканування.",
    fetch: "VisibilityOS не зміг підключитися до цього сайту зі scan service.",
  },
  ru: {
    invalid: "Введите корректный URL публичного сайта.",
    blocked: "Этот адрес нельзя сканировать, потому что это не публичный интернет-хост.",
    timeout: "Сайт отвечал слишком долго. Попробуйте ещё раз через минуту.",
    content: "URL не вернул публичную страницу, которую может просканировать VisibilityOS.",
    large: "Страница слишком большая для этого сканирования.",
    fetch: "VisibilityOS не смог подключиться к этому сайту со scan service.",
  },
};

const ACTION_COPY: Record<Lang, Record<string, { title: string; reason: string; action: string }>> = {
  en: {
    conversion: { title: "Make the next action impossible to miss", reason: "The sampled pages expose too few direct enquiry or booking paths.", action: "Choose one primary CTA and repeat it consistently on the pages that acquire or qualify demand." },
    serviceClarity: { title: "Tell search engines exactly what you sell", reason: "The target service is not clearly present across the sampled pages.", action: "Strengthen the homepage/service copy around the real service, then support it with one focused service page." },
    localClarity: { title: "Make the service area explicit", reason: "The target location is not clearly represented across the sampled pages.", action: "State where the business operates in visible copy and build truthful location coverage only for areas actually served." },
    servicePages: { title: "Build topical depth around the service", reason: "The crawl did not find a focused page that appears to own this service topic.", action: "Create or improve a dedicated service page with useful detail, proof, FAQs and internal links." },
    locationPages: { title: "Build local authority without doorway-page spam", reason: "The crawl did not find a focused page for the target service area.", action: "Create a genuinely useful location page only where the business has real coverage, proof and distinct local context." },
    sitemap: { title: "Expose a clean crawl map", reason: "VisibilityOS could not confirm a sitemap from the public site.", action: "Publish sitemap.xml, keep it current and reference it from robots.txt." },
    robots: { title: "Make crawler rules explicit", reason: "VisibilityOS could not confirm a public robots.txt file.", action: "Publish a simple robots.txt that permits intended public pages and points to the sitemap." },
    schema: { title: "Clarify the business entity with structured data", reason: "No LocalBusiness-style structured data was detected in the sampled pages.", action: "Add truthful Organization/LocalBusiness/Service structured data that matches visible business information." },
    faq: { title: "Turn repeated buying questions into crawlable answers", reason: "No clear FAQ evidence was detected in the sampled pages.", action: "Add concise, real FAQs around buying objections, service scope and location where they genuinely help users." },
    trustPages: { title: "Strengthen trust and business identity", reason: "The sampled crawl could not confirm both an About and a Contact path.", action: "Make the business identity, contact route and relevant proof easy to find from the main journey." },
    searchBasics: { title: "Fix high-confidence on-page blockers first", reason: "The homepage still has high-priority observable SEO or visibility issues.", action: "Resolve the highest-priority title, H1, indexability or availability findings before adding more content." },
    competitor: { title: "Close observable competitor gaps, not vanity metrics", reason: "At least one supplied competitor has a stronger observable readiness score on the same public checks.", action: "Compare the specific evidence gap, then improve only the layers that matter to your offer and customer journey." },
    monitor: { title: "Re-scan after implementation", reason: "A one-time audit cannot prove whether changes stayed live or drifted later.", action: "Re-run the same target after changes and compare the evidence before deciding what to do next." },
  },
  ua: {
    conversion: { title: "Зробіть наступну дію неможливою для пропуску", reason: "На вибірці сторінок замало прямих шляхів до звернення або бронювання.", action: "Оберіть один головний CTA і послідовно повторюйте його на сторінках, що залучають або кваліфікують попит." },
    serviceClarity: { title: "Чітко поясніть пошуковикам, що саме ви продаєте", reason: "Цільова послуга недостатньо явно присутня на вибірці сторінок.", action: "Посильте homepage/service copy навколо реальної послуги та підтримайте її окремою сфокусованою сторінкою." },
    localClarity: { title: "Зробіть зону роботи явною", reason: "Цільова локація недостатньо чітко представлена на вибірці сторінок.", action: "Вкажіть реальну географію роботи у видимому тексті та створюйте location coverage лише для територій, які справді обслуговуєте." },
    servicePages: { title: "Побудуйте тематичну глибину навколо послуги", reason: "Скан не знайшов окремої сторінки, яка чітко володіє темою цієї послуги.", action: "Створіть або посильте service page з корисними деталями, доказами, FAQ та внутрішніми посиланнями." },
    locationPages: { title: "Побудуйте локальний авторитет без doorway-page спаму", reason: "Скан не знайшов сфокусованої сторінки під цільову географію.", action: "Створюйте корисну location page лише там, де є реальне покриття, докази й окремий локальний контекст." },
    sitemap: { title: "Дайте crawler-ам чисту карту сайту", reason: "VisibilityOS не підтвердив публічний sitemap.", action: "Опублікуйте sitemap.xml, підтримуйте його актуальним і вкажіть у robots.txt." },
    robots: { title: "Зробіть правила для crawler-ів явними", reason: "VisibilityOS не підтвердив публічний robots.txt.", action: "Опублікуйте простий robots.txt, що дозволяє потрібні публічні сторінки та вказує sitemap." },
    schema: { title: "Опишіть бізнес-entity структурованими даними", reason: "На вибірці сторінок не знайдено LocalBusiness-подібних structured data.", action: "Додайте правдиві Organization/LocalBusiness/Service structured data, що збігаються з видимою інформацією про бізнес." },
    faq: { title: "Перетворіть повторювані питання покупців на crawlable answers", reason: "На вибірці сторінок не знайдено чітких FAQ-сигналів.", action: "Додайте реальні короткі FAQ про заперечення, scope послуги та географію там, де це допомагає користувачу." },
    trustPages: { title: "Посильте довіру та ідентичність бізнесу", reason: "Скан не зміг підтвердити одночасно About і Contact path.", action: "Зробіть інформацію про бізнес, контактний шлях і релевантні докази легкодоступними з основного journey." },
    searchBasics: { title: "Спочатку виправте надійно вимірювані on-page blockers", reason: "На homepage залишилися high-priority SEO або visibility проблеми.", action: "Закрийте головні title, H1, indexability чи availability проблеми до нарощування контенту." },
    competitor: { title: "Закривайте реальні competitor gaps, а не vanity metrics", reason: "Принаймні один доданий конкурент має сильніший observable-readiness score за тими самими публічними перевірками.", action: "Порівняйте конкретну різницю в evidence та покращуйте лише те, що важливо для оферу й customer journey." },
    monitor: { title: "Перескануйте після впровадження", reason: "Одноразовий аудит не доводить, що зміни залишилися live або не зламалися пізніше.", action: "Запустіть той самий target після змін і порівняйте evidence перед наступним рішенням." },
  },
  ru: {
    conversion: { title: "Сделайте следующее действие невозможно пропустить", reason: "На выборке страниц слишком мало прямых путей к заявке или бронированию.", action: "Выберите один основной CTA и последовательно повторяйте его на страницах, которые привлекают или квалифицируют спрос." },
    serviceClarity: { title: "Чётко объясните поисковикам, что именно вы продаёте", reason: "Целевая услуга недостаточно явно представлена на выборке страниц.", action: "Усильте homepage/service copy вокруг реальной услуги и поддержите её отдельной сфокусированной страницей." },
    localClarity: { title: "Сделайте географию работы явной", reason: "Целевая локация недостаточно чётко представлена на выборке страниц.", action: "Укажите реальную географию работы в видимом тексте и создавайте location coverage только для территорий, которые действительно обслуживаете." },
    servicePages: { title: "Постройте тематическую глубину вокруг услуги", reason: "Скан не нашёл отдельной страницы, которая явно раскрывает тему этой услуги.", action: "Создайте или усилите service page полезными деталями, доказательствами, FAQ и внутренними ссылками." },
    locationPages: { title: "Стройте локальный авторитет без doorway-page спама", reason: "Скан не нашёл сфокусированной страницы под целевую географию.", action: "Создавайте полезную location page только там, где есть реальное покрытие, доказательства и отдельный локальный контекст." },
    sitemap: { title: "Дайте crawler-ам чистую карту сайта", reason: "VisibilityOS не подтвердил публичный sitemap.", action: "Опубликуйте sitemap.xml, поддерживайте его актуальным и укажите его в robots.txt." },
    robots: { title: "Сделайте правила для crawler-ов явными", reason: "VisibilityOS не подтвердил публичный robots.txt.", action: "Опубликуйте простой robots.txt, который разрешает нужные публичные страницы и указывает sitemap." },
    schema: { title: "Опишите бизнес-entity структурированными данными", reason: "На выборке страниц не обнаружены LocalBusiness-подобные structured data.", action: "Добавьте правдивые Organization/LocalBusiness/Service structured data, совпадающие с видимой информацией о бизнесе." },
    faq: { title: "Превратите повторяющиеся вопросы покупателей в crawlable answers", reason: "На выборке страниц не обнаружено явных FAQ-сигналов.", action: "Добавьте реальные короткие FAQ про возражения, scope услуги и географию там, где это помогает пользователю." },
    trustPages: { title: "Усильте доверие и идентичность бизнеса", reason: "Скан не смог подтвердить одновременно About и Contact path.", action: "Сделайте информацию о бизнесе, контактный путь и релевантные доказательства легко доступными из основного journey." },
    searchBasics: { title: "Сначала исправьте надёжно измеряемые on-page blockers", reason: "На homepage остались high-priority SEO или visibility проблемы.", action: "Закройте основные title, H1, indexability или availability проблемы до наращивания контента." },
    competitor: { title: "Закрывайте наблюдаемые competitor gaps, а не vanity metrics", reason: "Хотя бы один добавленный конкурент имеет более сильный observable-readiness score по тем же публичным проверкам.", action: "Сравните конкретный разрыв в evidence и улучшайте только слои, важные для офера и customer journey." },
    monitor: { title: "Пересканируйте после внедрения", reason: "Разовый аудит не доказывает, что изменения остались live или не сломались позже.", action: "Запустите тот же target после изменений и сравните evidence перед следующим решением." },
  },
};

function normalizeLang(value: unknown): Lang { return value === "ua" || value === "ru" ? value : "en"; }
function normalizeTextInput(value: unknown, maxLength: number): string { return typeof value === "string" ? value.trim().replace(/\s+/g, " ").slice(0, maxLength) : ""; }
function normalizeUrl(value: unknown): URL | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 2048) return null;
  try {
    const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
    const url = new URL(withScheme);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password || !url.hostname) return null;
    url.hash = "";
    return url;
  } catch { return null; }
}

function isBlockedIpv4(address: string): boolean {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b] = parts;
  return a === 0 || a === 10 || a === 127 || (a === 100 && b >= 64 && b <= 127) || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 0) || (a === 192 && b === 168) || (a === 198 && (b === 18 || b === 19)) || (a === 198 && b === 51 && parts[2] === 100) || (a === 203 && b === 0 && parts[2] === 113) || a >= 224;
}
function isBlockedIpv6(address: string): boolean {
  const normalized = address.toLowerCase();
  return normalized === "::" || normalized === "::1" || normalized.startsWith("fc") || normalized.startsWith("fd") || normalized.startsWith("fe8") || normalized.startsWith("fe9") || normalized.startsWith("fea") || normalized.startsWith("feb") || normalized.startsWith("ff") || normalized.startsWith("2001:db8:");
}
function isBlockedAddress(address: string): boolean { const family = isIP(address); if (family === 4) return isBlockedIpv4(address); if (family === 6) return isBlockedIpv6(address); return true; }
async function assertPublicHost(url: URL): Promise<void> {
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  if (hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local") || hostname.endsWith(".internal") || hostname.endsWith(".home")) throw new Error("blocked");
  if (isIP(hostname)) { if (isBlockedAddress(hostname)) throw new Error("blocked"); return; }
  let addresses: Array<{ address: string; family: number }>;
  try { addresses = await lookup(hostname, { all: true, verbatim: true }); } catch { throw new Error("fetch"); }
  if (!addresses.length || addresses.some(({ address }) => isBlockedAddress(address))) throw new Error("blocked");
}
async function readLimited(response: Response, maxBytes: number): Promise<string> {
  const declaredLength = Number(response.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) throw new Error("large");
  if (!response.body) return "";
  const reader = response.body.getReader(); const decoder = new TextDecoder(); let total = 0; let text = "";
  try {
    while (true) { const { done, value } = await reader.read(); if (done) break; total += value.byteLength; if (total > maxBytes) throw new Error("large"); text += decoder.decode(value, { stream: true }); }
    text += decoder.decode(); return text;
  } finally { reader.releaseLock(); }
}
async function fetchPublicResource(initialUrl: URL, mode: "html" | "text"): Promise<{ response: Response; text: string; resolvedUrl: string; durationMs: number }> {
  let current = new URL(initialUrl); const started = Date.now();
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublicHost(current);
    let response: Response;
    try {
      response = await fetch(current, { method: "GET", redirect: "manual", cache: "no-store", headers: { Accept: mode === "html" ? "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5" : "text/plain,application/xml,text/xml,*/*;q=0.5", "User-Agent": USER_AGENT }, signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    } catch (error) { if (error instanceof DOMException && error.name === "TimeoutError") throw new Error("timeout"); throw new Error("fetch"); }
    if (response.status >= 300 && response.status < 400) { const location = response.headers.get("location"); if (!location || hop === MAX_REDIRECTS) throw new Error("fetch"); current = new URL(location, current); if (!/^https?:$/.test(current.protocol) || current.username || current.password) throw new Error("blocked"); continue; }
    if (!response.ok && mode === "text") throw new Error("fetch");
    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    if (mode === "html" && contentType && !contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) throw new Error("content");
    const text = await readLimited(response, mode === "html" ? MAX_HTML_BYTES : MAX_TEXT_BYTES); if (!text.trim()) throw new Error("content");
    return { response, text, resolvedUrl: current.toString(), durationMs: Date.now() - started };
  }
  throw new Error("fetch");
}

function normalizeSearchText(value: string): string { return value.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").replace(/\s+/g, " ").trim(); }
function keywordTokens(value: string): string[] { return normalizeSearchText(value).split(" ").filter((token) => token.length >= 3).slice(0, 8); }
function containsContext(haystack: string, context: string): boolean { const tokens = keywordTokens(context); if (!tokens.length) return false; const normalized = ` ${normalizeSearchText(haystack)} `; return tokens.every((token) => normalized.includes(` ${token} `) || normalized.includes(token)); }
function inferPageKind(url: string, title: string, h1: string[], service: string, location: string): ScanPageKind {
  let path = ""; try { path = decodeURIComponent(new URL(url).pathname).toLowerCase(); } catch { /* no-op */ }
  const surface = `${path} ${title} ${h1.join(" ")}`;
  if (/\/(contact|contacts|kontakt|kontakty|контакт|контакты|контакти)(\/|$)/i.test(path)) return "contact";
  if (/\/(about|about-us|company|o-nas|pro-nas|про-нас|о-нас)(\/|$)/i.test(path)) return "about";
  if (/\/(faq|questions|pytann|vopros)(\/|$)/i.test(path)) return "faq";
  if (service && containsContext(surface, service)) return "service";
  if (location && containsContext(surface, location)) return "location";
  if (/\/(services?|uslugi|poslug|послуг|услуг)(\/|$)/i.test(path)) return "service";
  if (/\/(locations?|areas?|cities|mista|goroda|міст|город)(\/|$)/i.test(path)) return "location";
  try { if (new URL(url).pathname === "/" || !new URL(url).pathname) return "home"; } catch { /* no-op */ }
  return "other";
}
function cleanCandidate(urlValue: string, baseUrl: string): string | null {
  try {
    const url = new URL(urlValue, baseUrl); if (!/^https?:$/.test(url.protocol) || url.username || url.password) return null;
    if (normalizeComparableHost(url.hostname) !== normalizeComparableHost(new URL(baseUrl).hostname)) return null;
    url.hash = ""; url.search = "";
    if (/\.(?:jpg|jpeg|png|gif|webp|svg|ico|pdf|zip|rar|mp4|mp3|avi|mov|webm|woff2?|ttf|css|js|json|xml)$/i.test(url.pathname)) return null;
    if (/\/(?:api|_next|wp-admin|wp-login|login|signin|cart|checkout|privacy|terms|cookies?|feed)(?:\/|$)/i.test(url.pathname)) return null;
    return url.toString();
  } catch { return null; }
}
function extractInternalCandidates(html: string, baseUrl: string): string[] { const candidates = new Set<string>(); for (const match of html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)) { const candidate = cleanCandidate(match[1], baseUrl); if (candidate) candidates.add(candidate); if (candidates.size >= MAX_DISCOVERED_LINKS) break; } return [...candidates]; }
function extractSitemapUrls(xml: string, baseUrl: string): string[] { const urls = new Set<string>(); for (const match of xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/gi)) { const candidate = cleanCandidate(match[1].replace(/&amp;/g, "&"), baseUrl); if (candidate) urls.add(candidate); if (urls.size >= MAX_DISCOVERED_LINKS) break; } return [...urls]; }
function candidateScore(urlValue: string, service: string, location: string): number {
  try { const path = decodeURIComponent(new URL(urlValue).pathname).toLowerCase(); let score = 0; if (service && containsContext(path.replace(/[-_/]/g, " "), service)) score += 60; if (location && containsContext(path.replace(/[-_/]/g, " "), location)) score += 55; if (/\/(services?|uslugi|poslug|послуг|услуг)/i.test(path)) score += 35; if (/\/(locations?|areas?|cities|mista|goroda|міст|город)/i.test(path)) score += 32; if (/\/(contact|contacts|kontakt|контакт)/i.test(path)) score += 24; if (/\/(about|about-us|company|o-nas|pro-nas|про-нас|о-нас)/i.test(path)) score += 20; if (/\/(faq|questions|pytann|vopros)/i.test(path)) score += 18; score -= Math.min(20, path.split("/").filter(Boolean).length * 2); return score; } catch { return -100; }
}
function pageSummary(input: { url: string; statusCode: number; durationMs: number; html: string; service: string; location: string }): ScanPageSummary {
  const signals = extractPageSignals({ html: input.html, resolvedUrl: input.url });
  const searchable = `${signals.title} ${signals.description} ${signals.h1.join(" ")} ${input.html.replace(/<[^>]+>/g, " ").slice(0, 140_000)}`;
  let path = "/"; try { path = new URL(input.url).pathname || "/"; } catch { /* no-op */ }
  return { url: input.url, path, kind: inferPageKind(input.url, signals.title, signals.h1, input.service, input.location), statusCode: input.statusCode, durationMs: input.durationMs, title: signals.title, description: signals.description, h1: signals.h1, canonical: signals.canonical, lang: signals.lang, forms: signals.forms, contactLinks: signals.contactLinks, internalLinks: signals.internalLinks, externalLinks: signals.externalLinks, schemaTypes: signals.schemaTypes, serviceMatch: input.service ? containsContext(searchable, input.service) : false, locationMatch: input.location ? containsContext(searchable, input.location) : false };
}
function average(values: number[]): number { return values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 0; }
function scoreFindings(findings: VisibilitySiteScanResult["findings"], categories: ScanCategory[]): number { const values = findings.filter((finding) => categories.includes(finding.category)).map((finding) => finding.status === "pass" ? 100 : finding.status === "warn" ? 55 : 0); return average(values); }
function calculatePillars(input: { base: ReturnType<typeof analyzeVisibilityScan>; pages: ScanPageSummary[]; service: string; location: string; robotsFound: boolean; sitemapFound: boolean }): VisibilityPillars {
  const { base, pages, service, location, robotsFound, sitemapFound } = input; const serviceCoverage = service ? pages.filter((page) => page.serviceMatch).length : 0; const locationCoverage = location ? pages.filter((page) => page.locationMatch).length : 0; const schemaTypes = pages.flatMap((page) => page.schemaTypes.map((type) => type.toLowerCase())); const hasEntitySchema = schemaTypes.some((type) => ["organization", "localbusiness", "professionalservice", "service"].includes(type));
  const search = Math.round(scoreFindings(base.findings, ["seo", "visibility", "technical"]) * 0.72 + (robotsFound ? 7 : 0) + (sitemapFound ? 7 : 0) + (pages.length >= 3 ? 7 : pages.length * 2) + (pages.some((page) => page.kind === "service") ? 7 : 0));
  const conversion = Math.min(100, Math.round(scoreFindings(base.findings, ["conversion"]) * 0.6 + (pages.reduce((sum, page) => sum + page.contactLinks, 0) > 2 ? 25 : 8) + (pages.some((page) => page.forms > 0) ? 15 : 0)));
  const trust = Math.min(100, Math.round(scoreFindings(base.findings, ["trust"]) * 0.65 + (hasEntitySchema ? 15 : 0) + (pages.some((page) => page.kind === "about") ? 10 : 0) + (pages.some((page) => page.kind === "contact") ? 10 : 0)));
  let local: number | null = null; if (service || location) { const servicePart = service ? Math.min(40, serviceCoverage * 20) : 20; const locationPart = location ? Math.min(40, locationCoverage * 20) : 20; const schemaPart = schemaTypes.some((type) => ["localbusiness", "professionalservice"].includes(type)) ? 20 : 5; local = Math.min(100, servicePart + locationPart + schemaPart); }
  return { search: Math.max(0, Math.min(100, search)), local, conversion, trust };
}
function action(lang: Lang, id: string, lane: GrowthLane, category: ScanCategory | "local", impact: GrowthImpact, confidence: "high" | "medium", effort: GrowthEffort, evidence: string): GrowthAction { const copy = ACTION_COPY[lang][id] || ACTION_COPY.en[id]; return { id, lane, category, impact, confidence, effort, title: copy.title, reason: copy.reason, evidence, action: copy.action }; }
function buildGrowthQueue(input: { lang: Lang; base: ReturnType<typeof analyzeVisibilityScan>; pages: ScanPageSummary[]; service: string; location: string; robotsFound: boolean; sitemapFound: boolean; competitors: CompetitorSnapshot[] }): GrowthAction[] {
  const { lang, base, pages, service, location, robotsFound, sitemapFound, competitors } = input; const actions: GrowthAction[] = []; const siteWideContactPaths = pages.reduce((sum, page) => sum + page.contactLinks, 0); const serviceCoveragePages = service ? pages.filter((page) => page.serviceMatch).length : 0; const locationCoveragePages = location ? pages.filter((page) => page.locationMatch).length : 0; const servicePageCandidates = pages.filter((page) => page.kind === "service").length; const locationPageCandidates = pages.filter((page) => page.kind === "location").length; const schemaTypes = pages.flatMap((page) => page.schemaTypes.map((type) => type.toLowerCase())); const localSchema = schemaTypes.some((type) => ["localbusiness", "professionalservice"].includes(type)); const faqFound = pages.some((page) => page.kind === "faq" || page.schemaTypes.some((type) => type.toLowerCase() === "faqpage")); const aboutFound = pages.some((page) => page.kind === "about"); const contactFound = pages.some((page) => page.kind === "contact");
  if (base.findings.some((finding) => finding.priority === "high" && finding.status !== "pass")) { const evidence = base.findings.filter((finding) => finding.priority === "high" && finding.status !== "pass").slice(0, 3).map((finding) => finding.title).join(", "); actions.push(action(lang, "searchBasics", "now", "seo", "high", "high", "low", evidence)); }
  if (siteWideContactPaths < 2) actions.push(action(lang, "conversion", "now", "conversion", "high", "high", "low", `${siteWideContactPaths} direct contact/booking paths across ${pages.length} sampled pages`));
  if (service && serviceCoveragePages === 0) actions.push(action(lang, "serviceClarity", "now", "seo", "high", "high", "medium", `Target service "${service}" was not clearly matched on the sampled pages`));
  if (location && locationCoveragePages === 0) actions.push(action(lang, "localClarity", "now", "local", "high", "high", "low", `Target location "${location}" was not clearly matched on the sampled pages`));
  if (service && servicePageCandidates === 0) actions.push(action(lang, "servicePages", "next", "seo", "high", "medium", "high", `0 focused service-page candidates in ${pages.length} sampled pages`));
  if (location && locationPageCandidates === 0) actions.push(action(lang, "locationPages", "next", "local", "high", "medium", "high", `0 focused location-page candidates in ${pages.length} sampled pages`));
  if (!sitemapFound) actions.push(action(lang, "sitemap", "next", "technical", "medium", "high", "low", "Public sitemap not confirmed"));
  if (!robotsFound) actions.push(action(lang, "robots", "next", "technical", "medium", "high", "low", "Public robots.txt not confirmed"));
  if ((service || location) && !localSchema) actions.push(action(lang, "schema", "next", "local", "medium", "high", "medium", schemaTypes.length ? `Detected schema: ${[...new Set(schemaTypes)].join(", ")}` : "No business entity schema detected"));
  if (!faqFound) actions.push(action(lang, "faq", "later", "visibility", "medium", "medium", "medium", "No FAQ page/schema signal in sampled pages"));
  if (!aboutFound || !contactFound) actions.push(action(lang, "trustPages", "later", "trust", "medium", "high", "medium", `About: ${aboutFound ? "found" : "not found"} · Contact: ${contactFound ? "found" : "not found"}`));
  const strongerCompetitor = competitors.find((competitor) => competitor.score >= base.score + 10); if (strongerCompetitor) actions.push(action(lang, "competitor", "next", "visibility", "medium", "medium", "medium", `${strongerCompetitor.resolvedUrl} observable score ${strongerCompetitor.score} vs ${base.score}`));
  actions.push(action(lang, "monitor", "later", "technical", "medium", "high", "low", "Baseline captured for this scan"));
  const laneOrder: Record<GrowthLane, number> = { now: 0, next: 1, later: 2 }; const impactOrder: Record<GrowthImpact, number> = { high: 0, medium: 1, low: 2 }; const effortOrder: Record<GrowthEffort, number> = { low: 0, medium: 1, high: 2 };
  return actions.sort((a, b) => laneOrder[a.lane] - laneOrder[b.lane] || impactOrder[a.impact] - impactOrder[b.impact] || effortOrder[a.effort] - effortOrder[b.effort]).slice(0, 10);
}
async function tryFetchText(url: URL): Promise<{ found: boolean; url: string; text: string }> { try { const fetched = await fetchPublicResource(url, "text"); return { found: fetched.response.ok, url: fetched.resolvedUrl, text: fetched.text }; } catch { return { found: false, url: url.toString(), text: "" }; } }
async function scanCompetitor(value: string, lang: Lang): Promise<CompetitorSnapshot | null> {
  const url = normalizeUrl(value); if (!url) return null;
  try { const fetched = await fetchPublicResource(url, "html"); const scan = analyzeVisibilityScan({ requestedUrl: url.toString(), resolvedUrl: fetched.resolvedUrl, statusCode: fetched.response.status, durationMs: fetched.durationMs, headers: fetched.response.headers, html: fetched.text, lang }); return { requestedUrl: url.toString(), resolvedUrl: scan.resolvedUrl, title: scan.signals.title, score: scan.score, summary: scan.summary, signals: { h1: scan.signals.h1, forms: scan.signals.forms, contactLinks: scan.signals.contactLinks, schemaTypes: scan.signals.schemaTypes, faqEvidence: scan.signals.faqEvidence } }; } catch { return null; }
}

async function runScan(input: ScanInput) {
  const lang = normalizeLang(input.lang); const copy = ERROR_COPY[lang]; const url = normalizeUrl(input.url); const service = normalizeTextInput(input.service, 120); const location = normalizeTextInput(input.location, 120); const competitorInputs = Array.isArray(input.competitors) ? input.competitors.filter((value): value is string => typeof value === "string").map((value) => value.trim()).filter(Boolean).slice(0, MAX_COMPETITORS) : [];
  if (!url) return NextResponse.json({ ok: false, error: copy.invalid }, { status: 400 });
  try {
    const home = await fetchPublicResource(url, "html");
    const base = analyzeVisibilityScan({ requestedUrl: url.toString(), resolvedUrl: home.resolvedUrl, statusCode: home.response.status, durationMs: home.durationMs, headers: home.response.headers, html: home.text, lang });
    const root = new URL(home.resolvedUrl); root.pathname = "/"; root.search = ""; root.hash = "";
    const robotsCandidate = new URL("/robots.txt", root); const defaultSitemapCandidate = new URL("/sitemap.xml", root);
    const [robots, defaultSitemap, competitorsSettled] = await Promise.all([tryFetchText(robotsCandidate), tryFetchText(defaultSitemapCandidate), Promise.all(competitorInputs.map((candidate) => scanCompetitor(candidate, lang)))]);
    const declaredSitemap = robots.text.match(/^\s*Sitemap:\s*(\S+)/im)?.[1]; let sitemap = defaultSitemap;
    if (declaredSitemap) { const declaredUrl = normalizeUrl(declaredSitemap); if (declaredUrl && normalizeComparableHost(declaredUrl.hostname) === normalizeComparableHost(root.hostname) && declaredUrl.toString() !== defaultSitemap.url) sitemap = await tryFetchText(declaredUrl); }
    const discovered = new Set<string>(); const homeUrl = cleanCandidate(home.resolvedUrl, home.resolvedUrl) || home.resolvedUrl; discovered.add(homeUrl); for (const candidate of extractInternalCandidates(home.text, home.resolvedUrl)) discovered.add(candidate); if (sitemap.found) for (const candidate of extractSitemapUrls(sitemap.text, home.resolvedUrl)) discovered.add(candidate);
    const rankedCandidates = [...discovered].filter((candidate) => candidate !== homeUrl).sort((a, b) => candidateScore(b, service, location) - candidateScore(a, service, location)).slice(0, MAX_SITE_PAGES - 1);
    const pageFetches = await Promise.allSettled(rankedCandidates.map(async (candidate) => { const fetched = await fetchPublicResource(new URL(candidate), "html"); return pageSummary({ url: fetched.resolvedUrl, statusCode: fetched.response.status, durationMs: fetched.durationMs, html: fetched.text, service, location }); }));
    const pages: ScanPageSummary[] = [pageSummary({ url: home.resolvedUrl, statusCode: home.response.status, durationMs: home.durationMs, html: home.text, service, location }), ...pageFetches.filter((result): result is PromiseFulfilledResult<ScanPageSummary> => result.status === "fulfilled").map((result) => result.value)];
    const competitors = competitorsSettled.filter((item): item is CompetitorSnapshot => Boolean(item));
    const pillars = calculatePillars({ base, pages, service, location, robotsFound: robots.found, sitemapFound: sitemap.found });
    const schemaTypes = pages.flatMap((page) => page.schemaTypes.map((type) => type.toLowerCase())); const serviceCoveragePages = service ? pages.filter((page) => page.serviceMatch).length : 0; const locationCoveragePages = location ? pages.filter((page) => page.locationMatch).length : 0;
    const site = { pagesScanned: pages.length, pagesDiscovered: discovered.size, robotsFound: robots.found, robotsUrl: robots.url, sitemapFound: sitemap.found, sitemapUrl: sitemap.url, serviceCoveragePages, locationCoveragePages, servicePageCandidates: pages.filter((page) => page.kind === "service").length, locationPageCandidates: pages.filter((page) => page.kind === "location").length, contactPageFound: pages.some((page) => page.kind === "contact"), aboutPageFound: pages.some((page) => page.kind === "about"), faqFound: pages.some((page) => page.kind === "faq" || page.schemaTypes.some((type) => type.toLowerCase() === "faqpage")), localBusinessSchemaFound: schemaTypes.some((type) => ["localbusiness", "professionalservice"].includes(type)), organizationSchemaFound: schemaTypes.some((type) => type === "organization"), siteWideContactPaths: pages.reduce((sum, page) => sum + page.contactLinks, 0), siteWideForms: pages.reduce((sum, page) => sum + page.forms, 0) };
    const growthQueue = buildGrowthQueue({ lang, base, pages, service, location, robotsFound: robots.found, sitemapFound: sitemap.found, competitors });
    const pillarValues = [pillars.search, pillars.conversion, pillars.trust, ...(pillars.local === null ? [] : [pillars.local])]; const siteScore = average(pillarValues);
    const result: VisibilitySiteScanResult = { ...base, version: 2, score: siteScore, context: { service, location }, pillars, site, pages, growthQueue, competitors, limitations: getVisibilityScanLimitations(lang) };
    return NextResponse.json({ ok: true, result }, { headers: { "Cache-Control": "no-store", "X-VisibilityOS-Version": "2" } });
  } catch (error) {
    const code = error instanceof Error ? error.message : "fetch"; const safeCode = code in copy ? code : "fetch"; const status = safeCode === "invalid" ? 400 : safeCode === "blocked" ? 403 : safeCode === "content" ? 415 : safeCode === "large" ? 413 : safeCode === "timeout" ? 504 : 502;
    return NextResponse.json({ ok: false, error: copy[safeCode] }, { status, headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(request: NextRequest) { let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ ok: false, error: ERROR_COPY.en.invalid }, { status: 400 }); } const parsed = body && typeof body === "object" ? body as ScanInput : {}; return runScan(parsed); }
export async function GET(request: NextRequest) { const competitors = request.nextUrl.searchParams.getAll("competitor"); return runScan({ url: request.nextUrl.searchParams.get("url"), lang: request.nextUrl.searchParams.get("lang"), service: request.nextUrl.searchParams.get("service"), location: request.nextUrl.searchParams.get("location"), competitors }); }
