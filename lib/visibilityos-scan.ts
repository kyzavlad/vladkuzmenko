export type ScanStatus = "pass" | "warn" | "fail";
export type ScanPriority = "high" | "medium" | "low";
export type ScanCategory = "visibility" | "trust" | "seo" | "conversion" | "technical";
export type ScanPageKind = "home" | "service" | "location" | "contact" | "about" | "faq" | "other";
export type GrowthLane = "now" | "next" | "later";
export type GrowthImpact = "high" | "medium" | "low";
export type GrowthConfidence = "high" | "medium";
export type GrowthEffort = "low" | "medium" | "high";

export type ScanFinding = {
  id: string;
  category: ScanCategory;
  status: ScanStatus;
  priority: ScanPriority;
  title: string;
  detail: string;
  evidence: string;
  recommendation: string;
};

export type PageSignals = {
  title: string;
  description: string;
  h1: string[];
  lang: string;
  canonical: string;
  robots: string;
  forms: number;
  contactLinks: number;
  internalLinks: number;
  externalLinks: number;
  htmlBytes: number;
  schemaTypes: string[];
  faqEvidence: boolean;
};

export type VisibilityScanResult = {
  requestedUrl: string;
  resolvedUrl: string;
  statusCode: number;
  durationMs: number;
  scannedAt: string;
  score: number;
  summary: {
    pass: number;
    warn: number;
    fail: number;
  };
  signals: PageSignals;
  findings: ScanFinding[];
  limitations: string[];
};

export type ScanPageSummary = {
  url: string;
  path: string;
  kind: ScanPageKind;
  statusCode: number;
  durationMs: number;
  title: string;
  description: string;
  h1: string[];
  canonical: string;
  lang: string;
  forms: number;
  contactLinks: number;
  internalLinks: number;
  externalLinks: number;
  schemaTypes: string[];
  serviceMatch: boolean;
  locationMatch: boolean;
};

export type GrowthAction = {
  id: string;
  lane: GrowthLane;
  category: ScanCategory | "local";
  impact: GrowthImpact;
  confidence: GrowthConfidence;
  effort: GrowthEffort;
  title: string;
  reason: string;
  evidence: string;
  action: string;
};

export type CompetitorSnapshot = {
  requestedUrl: string;
  resolvedUrl: string;
  title: string;
  score: number;
  summary: VisibilityScanResult["summary"];
  signals: Pick<PageSignals, "h1" | "forms" | "contactLinks" | "schemaTypes" | "faqEvidence">;
};

export type VisibilityPillars = {
  search: number;
  local: number | null;
  conversion: number;
  trust: number;
};

export type VisibilitySiteScanResult = VisibilityScanResult & {
  version: 2;
  context: {
    service: string;
    location: string;
  };
  pillars: VisibilityPillars;
  site: {
    pagesScanned: number;
    pagesDiscovered: number;
    robotsFound: boolean;
    robotsUrl: string;
    sitemapFound: boolean;
    sitemapUrl: string;
    serviceCoveragePages: number;
    locationCoveragePages: number;
    servicePageCandidates: number;
    locationPageCandidates: number;
    contactPageFound: boolean;
    aboutPageFound: boolean;
    faqFound: boolean;
    localBusinessSchemaFound: boolean;
    organizationSchemaFound: boolean;
    siteWideContactPaths: number;
    siteWideForms: number;
  };
  pages: ScanPageSummary[];
  growthQueue: GrowthAction[];
  competitors: CompetitorSnapshot[];
  limitations: string[];
};

type Lang = "en" | "ua" | "ru";

type Copy = {
  titles: Record<string, string>;
  details: Record<string, { pass: string; warn: string; fail: string }>;
  recommendations: Record<string, string>;
  limitations: string[];
};

const COPY: Record<Lang, Copy> = {
  en: {
    titles: {
      https: "HTTPS protection",
      status: "Page availability",
      title: "Search title",
      description: "Meta description",
      h1: "Primary page heading",
      lang: "Document language",
      canonical: "Canonical URL",
      robots: "Indexability",
      social: "Social sharing metadata",
      schema: "Structured data",
      contact: "Visible conversion paths",
      forms: "Lead capture",
      security: "Security headers",
    },
    details: {
      https: { pass: "The scanned page uses HTTPS.", warn: "HTTPS could not be confirmed.", fail: "The page is served without HTTPS." },
      status: { pass: "The page returned a successful HTTP response.", warn: "The page returned a redirect or non-standard response.", fail: "The page returned an error response." },
      title: { pass: "A useful title is present.", warn: "The title exists but its length is outside the usual useful range.", fail: "No page title was found." },
      description: { pass: "A useful meta description is present.", warn: "The description exists but its length is outside the usual useful range.", fail: "No meta description was found." },
      h1: { pass: "The page has one clear H1.", warn: "The page has multiple H1 headings.", fail: "No H1 heading was found in the returned HTML." },
      lang: { pass: "The document declares its language.", warn: "The language declaration is unusual.", fail: "The document does not declare a language." },
      canonical: { pass: "A canonical URL is declared for this host.", warn: "A canonical URL exists but points to a different host.", fail: "No canonical URL was found." },
      robots: { pass: "No noindex directive was found.", warn: "Robots directives deserve manual review.", fail: "The page contains a noindex directive." },
      social: { pass: "Core Open Graph fields are present.", warn: "Only part of the Open Graph set is present.", fail: "Open Graph metadata is missing." },
      schema: { pass: "Structured data is present.", warn: "Structured data was found but should be validated manually.", fail: "No JSON-LD structured data was found." },
      contact: { pass: "The page exposes direct contact or booking paths.", warn: "Only a weak contact path was detected.", fail: "No obvious contact or booking path was detected in the returned HTML." },
      forms: { pass: "A form is present on the page.", warn: "No form was found, but another conversion path exists.", fail: "No form or direct conversion path was detected." },
      security: { pass: "Several useful security headers are present.", warn: "Only part of the recommended header set is present.", fail: "No common security headers were detected." },
    },
    recommendations: {
      https: "Serve the public site only over HTTPS and redirect HTTP to HTTPS.",
      status: "Fix the response path before sending paid or organic traffic to this page.",
      title: "Write one specific title that matches the page intent and search context.",
      description: "Add a concise description that explains the offer and why the page matters.",
      h1: "Use one clear H1 that states the core page promise.",
      lang: "Declare the page language on the html element.",
      canonical: "Declare the preferred canonical URL for this page.",
      robots: "Remove noindex if this page is intended to acquire organic traffic.",
      social: "Add og:title, og:description and og:image for reliable link previews.",
      schema: "Add truthful JSON-LD that reflects the real page and business entity.",
      contact: "Give the visitor one obvious next action: book, call, message, buy or request a plan.",
      forms: "Add a low-friction lead path if this page is supposed to generate enquiries.",
      security: "Add appropriate security headers at the hosting layer after checking compatibility.",
    },
    limitations: [
      "VisibilityOS evaluates public HTML, HTTP headers, robots/sitemap signals and a capped sample of same-site pages. It is not a full search-engine index.",
      "It does not claim live Google rankings, traffic, conversion rate or AI-assistant recommendations without connected first-party or search data.",
      "Visual hierarchy, copy quality, accessibility interactions and conversion psychology still require human review.",
      "Competitor comparison uses the same observable public signals; it is context, not proof of who will outrank whom.",
    ],
  },
  ua: {
    titles: {
      https: "Захист HTTPS",
      status: "Доступність сторінки",
      title: "Пошуковий title",
      description: "Meta description",
      h1: "Головний заголовок",
      lang: "Мова документа",
      canonical: "Canonical URL",
      robots: "Індексація",
      social: "Метадані для соцмереж",
      schema: "Структуровані дані",
      contact: "Шляхи до конверсії",
      forms: "Збір лідів",
      security: "Security headers",
    },
    details: {
      https: { pass: "Сторінка використовує HTTPS.", warn: "HTTPS не вдалося підтвердити.", fail: "Сторінка працює без HTTPS." },
      status: { pass: "Сторінка повернула успішну HTTP-відповідь.", warn: "Сторінка повернула редирект або нестандартну відповідь.", fail: "Сторінка повернула помилку." },
      title: { pass: "Корисний title присутній.", warn: "Title є, але довжина виходить за звичний робочий діапазон.", fail: "Title сторінки не знайдено." },
      description: { pass: "Корисний meta description присутній.", warn: "Description є, але довжина виходить за звичний робочий діапазон.", fail: "Meta description не знайдено." },
      h1: { pass: "На сторінці один чіткий H1.", warn: "На сторінці кілька H1.", fail: "H1 не знайдено у поверненому HTML." },
      lang: { pass: "Мову документа вказано.", warn: "Позначення мови виглядає нетипово.", fail: "Мову документа не вказано." },
      canonical: { pass: "Canonical URL вказано для цього хоста.", warn: "Canonical є, але веде на інший хост.", fail: "Canonical URL не знайдено." },
      robots: { pass: "Директиву noindex не знайдено.", warn: "Robots-директиви варто перевірити вручну.", fail: "На сторінці є noindex." },
      social: { pass: "Основні Open Graph поля присутні.", warn: "Присутня лише частина Open Graph полів.", fail: "Open Graph metadata відсутня." },
      schema: { pass: "Структуровані дані присутні.", warn: "Структуровані дані знайдено, але їх слід валідовувати вручну.", fail: "JSON-LD не знайдено." },
      contact: { pass: "Є прямі шляхи до контакту або бронювання.", warn: "Виявлено лише слабкий шлях до контакту.", fail: "Очевидний шлях до контакту або бронювання не знайдено." },
      forms: { pass: "На сторінці є форма.", warn: "Форми немає, але є інший шлях до конверсії.", fail: "Форму або прямий шлях до конверсії не знайдено." },
      security: { pass: "Присутні кілька корисних security headers.", warn: "Присутня лише частина рекомендованих headers.", fail: "Типові security headers не виявлено." },
    },
    recommendations: {
      https: "Використовуйте HTTPS для публічного сайту і перенаправляйте HTTP на HTTPS.",
      status: "Виправте шлях відповіді до того, як вести сюди платний або органічний трафік.",
      title: "Напишіть один конкретний title під намір сторінки та пошуковий контекст.",
      description: "Додайте стислий description з офером і цінністю сторінки.",
      h1: "Використовуйте один чіткий H1 з головною обіцянкою сторінки.",
      lang: "Вкажіть мову сторінки на html-елементі.",
      canonical: "Вкажіть preferred canonical URL для сторінки.",
      robots: "Приберіть noindex, якщо сторінка має отримувати органічний трафік.",
      social: "Додайте og:title, og:description та og:image для стабільних превʼю посилань.",
      schema: "Додайте правдивий JSON-LD, що відповідає реальній сторінці й бізнесу.",
      contact: "Залиште одну очевидну наступну дію: бронювання, дзвінок, повідомлення, покупка або запит плану.",
      forms: "Додайте низькофрикційний lead path, якщо сторінка має генерувати звернення.",
      security: "Додайте доречні security headers на рівні хостингу після перевірки сумісності.",
    },
    limitations: [
      "VisibilityOS оцінює публічний HTML, HTTP headers, robots/sitemap та обмежену вибірку сторінок одного сайту. Це не повний індекс пошукової системи.",
      "Без підключених first-party або search-даних продукт не заявляє реальні позиції Google, трафік, конверсію чи рекомендації AI-асистентів.",
      "Візуальна ієрархія, якість тексту, інтерактивна доступність і психологія конверсії потребують ручної перевірки.",
      "Порівняння конкурентів використовує ті самі публічні сигнали й дає контекст, а не гарантію ранжування.",
    ],
  },
  ru: {
    titles: {
      https: "Защита HTTPS",
      status: "Доступность страницы",
      title: "Поисковый title",
      description: "Meta description",
      h1: "Главный заголовок",
      lang: "Язык документа",
      canonical: "Canonical URL",
      robots: "Индексация",
      social: "Метаданные для соцсетей",
      schema: "Структурированные данные",
      contact: "Пути к конверсии",
      forms: "Сбор лидов",
      security: "Security headers",
    },
    details: {
      https: { pass: "Страница использует HTTPS.", warn: "HTTPS не удалось подтвердить.", fail: "Страница работает без HTTPS." },
      status: { pass: "Страница вернула успешный HTTP-ответ.", warn: "Страница вернула редирект или нестандартный ответ.", fail: "Страница вернула ошибку." },
      title: { pass: "Полезный title присутствует.", warn: "Title есть, но длина выходит за обычный рабочий диапазон.", fail: "Title страницы не найден." },
      description: { pass: "Полезный meta description присутствует.", warn: "Description есть, но длина выходит за обычный рабочий диапазон.", fail: "Meta description не найден." },
      h1: { pass: "На странице один чёткий H1.", warn: "На странице несколько H1.", fail: "H1 не найден в возвращённом HTML." },
      lang: { pass: "Язык документа указан.", warn: "Обозначение языка выглядит нетипично.", fail: "Язык документа не указан." },
      canonical: { pass: "Canonical URL указан для этого хоста.", warn: "Canonical есть, но ведёт на другой хост.", fail: "Canonical URL не найден." },
      robots: { pass: "Директива noindex не найдена.", warn: "Robots-директивы стоит проверить вручную.", fail: "На странице есть noindex." },
      social: { pass: "Основные Open Graph поля присутствуют.", warn: "Присутствует только часть Open Graph полей.", fail: "Open Graph metadata отсутствует." },
      schema: { pass: "Структурированные данные присутствуют.", warn: "Структурированные данные найдены, но их нужно валидировать вручную.", fail: "JSON-LD не найден." },
      contact: { pass: "Есть прямые пути к контакту или бронированию.", warn: "Обнаружен только слабый путь к контакту.", fail: "Очевидный путь к контакту или бронированию не найден." },
      forms: { pass: "На странице есть форма.", warn: "Формы нет, но есть другой путь к конверсии.", fail: "Форма или прямой путь к конверсии не найден." },
      security: { pass: "Присутствует несколько полезных security headers.", warn: "Присутствует только часть рекомендованных headers.", fail: "Типовые security headers не обнаружены." },
    },
    recommendations: {
      https: "Используйте HTTPS для публичного сайта и перенаправляйте HTTP на HTTPS.",
      status: "Исправьте путь ответа до того, как вести сюда платный или органический трафик.",
      title: "Напишите один конкретный title под намерение страницы и поисковый контекст.",
      description: "Добавьте краткий description с офером и ценностью страницы.",
      h1: "Используйте один чёткий H1 с главным обещанием страницы.",
      lang: "Укажите язык страницы на html-элементе.",
      canonical: "Укажите preferred canonical URL для страницы.",
      robots: "Уберите noindex, если страница должна получать органический трафик.",
      social: "Добавьте og:title, og:description и og:image для стабильных превью ссылок.",
      schema: "Добавьте правдивый JSON-LD, который соответствует реальной странице и бизнесу.",
      contact: "Оставьте одно очевидное следующее действие: бронь, звонок, сообщение, покупка или запрос плана.",
      forms: "Добавьте низкофрикционный lead path, если страница должна генерировать обращения.",
      security: "Добавьте уместные security headers на уровне хостинга после проверки совместимости.",
    },
    limitations: [
      "VisibilityOS оценивает публичный HTML, HTTP headers, robots/sitemap и ограниченную выборку страниц одного сайта. Это не полный индекс поисковой системы.",
      "Без подключённых first-party или search-данных продукт не заявляет реальные позиции Google, трафик, конверсию или рекомендации AI-ассистентов.",
      "Визуальная иерархия, качество текста, интерактивная доступность и психология конверсии требуют ручной проверки.",
      "Сравнение конкурентов использует те же публичные сигналы и даёт контекст, а не гарантию ранжирования.",
    ],
  },
};

const BASIC_ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&quot;": "\"",
  "&#39;": "'",
  "&#x27;": "'",
  "&lt;": "<",
  "&gt;": ">",
  "&nbsp;": " ",
};

function decodeEntities(value: string): string {
  return value.replace(/&(amp|quot|#39|#x27|lt|gt|nbsp);/gi, (entity) => BASIC_ENTITIES[entity.toLowerCase()] ?? entity);
}

const stripTags = (value: string) =>
  decodeEntities(value.replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();

const attr = (html: string, pattern: RegExp) => stripTags((html.match(pattern)?.[1] || "").trim());

export function normalizeComparableHost(hostname: string): string {
  return hostname.toLowerCase().replace(/\.$/, "").replace(/^www\./, "");
}

function finding(copy: Copy, id: string, category: ScanCategory, status: ScanStatus, priority: ScanPriority, evidence: string): ScanFinding {
  return {
    id,
    category,
    status,
    priority,
    title: copy.titles[id],
    detail: copy.details[id][status],
    evidence,
    recommendation: copy.recommendations[id],
  };
}

export function extractSchemaTypes(html: string): string[] {
  const types = new Set<string>();
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  for (const block of blocks) {
    const raw = decodeEntities(block[1]);
    for (const match of raw.matchAll(/"@type"\s*:\s*"([^"]+)"/gi)) types.add(match[1]);
    for (const arrayMatch of raw.matchAll(/"@type"\s*:\s*\[([^\]]+)\]/gi)) {
      for (const match of arrayMatch[1].matchAll(/"([^"]+)"/g)) types.add(match[1]);
    }
  }
  return [...types].slice(0, 24);
}

export function extractPageSignals(input: { html: string; resolvedUrl: string }): PageSignals {
  const { html, resolvedUrl } = input;
  const lower = html.toLowerCase();
  const title = attr(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const description =
    attr(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i);
  const h1 = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)]
    .map((match) => stripTags(match[1]))
    .filter(Boolean)
    .slice(0, 12);
  const lang = attr(html, /<html[^>]+lang=["']([^"']+)["'][^>]*>/i);
  const canonical =
    attr(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i) ||
    attr(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
  const robots =
    attr(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["'][^>]*>/i) ||
    attr(html, /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']robots["'][^>]*>/i);
  const forms = (lower.match(/<form\b/g) || []).length;
  const links = [...html.matchAll(/<a\b[^>]+href=["']([^"']+)["']/gi)].map((match) => decodeEntities(match[1]));
  let resolvedHost = "";
  try {
    resolvedHost = normalizeComparableHost(new URL(resolvedUrl).hostname);
  } catch {
    // no-op
  }
  const contactLinks = links.filter(
    (href) =>
      /^(mailto:|tel:|https?:\/\/(wa\.me|api\.whatsapp\.com|cal\.com|t\.me))/i.test(href) ||
      /contact|book|calendar|appointment|checkout|buy|order|quote|request|demo|audit|plan/i.test(href)
  ).length;
  const internalLinks = links.filter((href) => {
    try {
      return href.startsWith("/") || normalizeComparableHost(new URL(href, resolvedUrl).hostname) === resolvedHost;
    } catch {
      return false;
    }
  }).length;
  const externalLinks = Math.max(0, links.length - internalLinks);
  const schemaTypes = extractSchemaTypes(html);
  const faqEvidence =
    schemaTypes.some((type) => type.toLowerCase() === "faqpage") ||
    /<h[1-6][^>]*>[^<]*(faq|frequently asked|част(і|о)\s+питан|поширен|вопрос|запитан)/i.test(html);

  return {
    title,
    description,
    h1,
    lang,
    canonical,
    robots,
    forms,
    contactLinks,
    internalLinks,
    externalLinks,
    htmlBytes: new TextEncoder().encode(html).length,
    schemaTypes,
    faqEvidence,
  };
}

export function analyzeVisibilityScan(input: {
  requestedUrl: string;
  resolvedUrl: string;
  statusCode: number;
  durationMs: number;
  headers: Headers;
  html: string;
  lang: Lang;
}): VisibilityScanResult {
  const { requestedUrl, resolvedUrl, statusCode, durationMs, headers, html, lang } = input;
  const copy = COPY[lang] || COPY.en;
  const signals = extractPageSignals({ html, resolvedUrl });
  let resolvedHost = "";
  try {
    resolvedHost = normalizeComparableHost(new URL(resolvedUrl).hostname);
  } catch {
    // no-op
  }

  const ogTitle = /<meta[^>]+property=["']og:title["']/i.test(html);
  const ogDesc = /<meta[^>]+property=["']og:description["']/i.test(html);
  const ogImage = /<meta[^>]+property=["']og:image["']/i.test(html);
  const secureHeaders = ["content-security-policy", "strict-transport-security", "x-content-type-options", "referrer-policy"].filter((name) => headers.get(name));

  const findings: ScanFinding[] = [];
  findings.push(finding(copy, "https", "trust", resolvedUrl.startsWith("https://") ? "pass" : "fail", "high", resolvedUrl.startsWith("https://") ? resolvedUrl : "HTTP"));
  findings.push(finding(copy, "status", "technical", statusCode >= 200 && statusCode < 300 ? "pass" : statusCode < 400 ? "warn" : "fail", "high", `HTTP ${statusCode} · ${durationMs} ms`));
  findings.push(finding(copy, "title", "seo", !signals.title ? "fail" : signals.title.length >= 25 && signals.title.length <= 70 ? "pass" : "warn", "high", signals.title ? `${signals.title.length} chars · ${signals.title}` : "Not found"));
  findings.push(finding(copy, "description", "seo", !signals.description ? "fail" : signals.description.length >= 60 && signals.description.length <= 180 ? "pass" : "warn", "medium", signals.description ? `${signals.description.length} chars · ${signals.description}` : "Not found"));
  findings.push(finding(copy, "h1", "visibility", signals.h1.length === 1 ? "pass" : signals.h1.length === 0 ? "fail" : "warn", "high", signals.h1.length ? `${signals.h1.length} H1 · ${signals.h1.join(" | ")}` : "0 H1"));
  findings.push(finding(copy, "lang", "seo", !signals.lang ? "fail" : /^[a-z]{2,3}(-[a-z0-9]+)?$/i.test(signals.lang) ? "pass" : "warn", "low", signals.lang || "Not found"));

  let canonicalStatus: ScanStatus = "fail";
  if (signals.canonical) {
    try {
      canonicalStatus = normalizeComparableHost(new URL(signals.canonical, resolvedUrl).hostname) === resolvedHost ? "pass" : "warn";
    } catch {
      canonicalStatus = "warn";
    }
  }
  findings.push(finding(copy, "canonical", "seo", canonicalStatus, "medium", signals.canonical || "Not found"));
  findings.push(finding(copy, "robots", "seo", /noindex/i.test(signals.robots) ? "fail" : "pass", "high", signals.robots || "No explicit noindex directive"));

  const ogCount = [ogTitle, ogDesc, ogImage].filter(Boolean).length;
  findings.push(finding(copy, "social", "visibility", ogCount === 3 ? "pass" : ogCount > 0 ? "warn" : "fail", "medium", `${ogCount}/3 core Open Graph fields`));
  findings.push(finding(copy, "schema", "trust", signals.schemaTypes.length > 0 ? "pass" : "fail", "medium", signals.schemaTypes.length ? signals.schemaTypes.join(", ") : "No JSON-LD types detected"));
  findings.push(finding(copy, "contact", "conversion", signals.contactLinks >= 2 ? "pass" : signals.contactLinks === 1 ? "warn" : "fail", "high", `${signals.contactLinks} direct conversion/contact link${signals.contactLinks === 1 ? "" : "s"}`));
  findings.push(finding(copy, "forms", "conversion", signals.forms > 0 ? "pass" : signals.contactLinks > 0 ? "warn" : "fail", "medium", `${signals.forms} form${signals.forms === 1 ? "" : "s"}`));
  findings.push(finding(copy, "security", "technical", secureHeaders.length >= 3 ? "pass" : secureHeaders.length > 0 ? "warn" : "fail", "low", secureHeaders.length ? secureHeaders.join(", ") : "No common security headers detected"));

  const statusWeight: Record<ScanStatus, number> = { pass: 1, warn: 0.55, fail: 0 };
  const priorityWeight: Record<ScanPriority, number> = { high: 3, medium: 2, low: 1 };
  const totalWeight = findings.reduce((sum, item) => sum + priorityWeight[item.priority], 0);
  const earned = findings.reduce((sum, item) => sum + priorityWeight[item.priority] * statusWeight[item.status], 0);
  const score = totalWeight ? Math.round((earned / totalWeight) * 100) : 0;

  return {
    requestedUrl,
    resolvedUrl,
    statusCode,
    durationMs,
    scannedAt: new Date().toISOString(),
    score,
    summary: {
      pass: findings.filter((item) => item.status === "pass").length,
      warn: findings.filter((item) => item.status === "warn").length,
      fail: findings.filter((item) => item.status === "fail").length,
    },
    signals,
    findings,
    limitations: copy.limitations,
  };
}

export function getVisibilityScanLimitations(lang: Lang): string[] {
  return (COPY[lang] || COPY.en).limitations;
}
