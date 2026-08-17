import { NextRequest, NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { analyzeVisibilityScan } from "@/lib/visibilityos-scan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_HTML_BYTES = 2_000_000;
const MAX_REDIRECTS = 4;
const FETCH_TIMEOUT_MS = 8_000;
const USER_AGENT = "VisibilityOS/1.0 (+https://vladkuzmenko.com/visibilityos)";

type Lang = "en" | "ua" | "ru";

const ERROR_COPY: Record<Lang, Record<string, string>> = {
  en: {
    invalid: "Enter a valid public website URL.",
    blocked: "This address cannot be scanned because it is not a public internet host.",
    timeout: "The website took too long to respond. Try again in a moment.",
    content: "The URL did not return a normal HTML page that VisibilityOS can scan.",
    large: "The returned page is too large for this first-pass scan.",
    fetch: "VisibilityOS could not reach this website from the scan service.",
  },
  ua: {
    invalid: "Введіть коректний URL публічного сайту.",
    blocked: "Цю адресу не можна сканувати, оскільки це не публічний інтернет-хост.",
    timeout: "Сайт відповідав надто довго. Спробуйте ще раз за мить.",
    content: "URL не повернув звичайну HTML-сторінку, яку може просканувати VisibilityOS.",
    large: "Сторінка надто велика для цього першого проходу сканування.",
    fetch: "VisibilityOS не зміг підключитися до цього сайту зі scan service.",
  },
  ru: {
    invalid: "Введите корректный URL публичного сайта.",
    blocked: "Этот адрес нельзя сканировать, потому что это не публичный интернет-хост.",
    timeout: "Сайт отвечал слишком долго. Попробуйте ещё раз через минуту.",
    content: "URL не вернул обычную HTML-страницу, которую может просканировать VisibilityOS.",
    large: "Страница слишком большая для этого первого прохода сканирования.",
    fetch: "VisibilityOS не смог подключиться к этому сайту со scan service.",
  },
};

function normalizeLang(value: unknown): Lang {
  return value === "ua" || value === "ru" ? value : "en";
}

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
  } catch {
    return null;
  }
}

function isBlockedIpv4(address: string): boolean {
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [a, b] = parts;
  return (
    a === 0 ||
    a === 10 ||
    a === 127 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0 && parts[2] === 2) ||
    (a === 198 && (b === 18 || b === 19)) ||
    (a === 198 && b === 51 && parts[2] === 100) ||
    (a === 203 && b === 0 && parts[2] === 113) ||
    a >= 224
  );
}

function isBlockedIpv6(address: string): boolean {
  const normalized = address.toLowerCase();
  return (
    normalized === "::" ||
    normalized === "::1" ||
    normalized.startsWith("fc") ||
    normalized.startsWith("fd") ||
    normalized.startsWith("fe8") ||
    normalized.startsWith("fe9") ||
    normalized.startsWith("fea") ||
    normalized.startsWith("feb") ||
    normalized.startsWith("ff") ||
    normalized.startsWith("2001:db8:")
  );
}

function isBlockedAddress(address: string): boolean {
  const family = isIP(address);
  if (family === 4) return isBlockedIpv4(address);
  if (family === 6) return isBlockedIpv6(address);
  return true;
}

async function assertPublicHost(url: URL): Promise<void> {
  const hostname = url.hostname.toLowerCase().replace(/\.$/, "");
  if (
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname.endsWith(".home")
  ) {
    throw new Error("blocked");
  }

  if (isIP(hostname)) {
    if (isBlockedAddress(hostname)) throw new Error("blocked");
    return;
  }

  let addresses: Awaited<ReturnType<typeof lookup>>;
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("fetch");
  }

  if (!addresses.length || addresses.some(({ address }) => isBlockedAddress(address))) {
    throw new Error("blocked");
  }
}

async function readLimitedHtml(response: Response): Promise<string> {
  const declaredLength = Number(response.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > MAX_HTML_BYTES) throw new Error("large");

  if (!response.body) return "";
  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let html = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_HTML_BYTES) throw new Error("large");
      html += decoder.decode(value, { stream: true });
    }
    html += decoder.decode();
    return html;
  } finally {
    reader.releaseLock();
  }
}

async function fetchPublicHtml(initialUrl: URL): Promise<{ response: Response; html: string; resolvedUrl: string; durationMs: number }> {
  let current = initialUrl;
  const started = Date.now();

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    await assertPublicHost(current);

    let response: Response;
    try {
      response = await fetch(current, {
        method: "GET",
        redirect: "manual",
        cache: "no-store",
        headers: {
          Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5",
          "User-Agent": USER_AGENT,
        },
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      });
    } catch (error) {
      if (error instanceof DOMException && error.name === "TimeoutError") throw new Error("timeout");
      throw new Error("fetch");
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.get("location");
      if (!location || hop === MAX_REDIRECTS) throw new Error("fetch");
      current = new URL(location, current);
      if (!/^https?:$/.test(current.protocol) || current.username || current.password) throw new Error("blocked");
      continue;
    }

    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    if (contentType && !contentType.includes("text/html") && !contentType.includes("application/xhtml+xml")) {
      throw new Error("content");
    }

    const html = await readLimitedHtml(response);
    if (!html.trim()) throw new Error("content");

    return {
      response,
      html,
      resolvedUrl: current.toString(),
      durationMs: Date.now() - started,
    };
  }

  throw new Error("fetch");
}

async function runScan(rawUrl: unknown, rawLang: unknown) {
  const lang = normalizeLang(rawLang);
  const copy = ERROR_COPY[lang];
  const url = normalizeUrl(rawUrl);
  if (!url) return NextResponse.json({ ok: false, error: copy.invalid }, { status: 400 });

  try {
    const fetched = await fetchPublicHtml(url);
    const result = analyzeVisibilityScan({
      requestedUrl: url.toString(),
      resolvedUrl: fetched.resolvedUrl,
      statusCode: fetched.response.status,
      durationMs: fetched.durationMs,
      headers: fetched.response.headers,
      html: fetched.html,
      lang,
    });
    return NextResponse.json({ ok: true, result }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const code = error instanceof Error ? error.message : "fetch";
    const safeCode = code in copy ? code : "fetch";
    const status = safeCode === "invalid" ? 400 : safeCode === "blocked" ? 403 : safeCode === "content" ? 415 : safeCode === "large" ? 413 : safeCode === "timeout" ? 504 : 502;
    return NextResponse.json({ ok: false, error: copy[safeCode] }, { status, headers: { "Cache-Control": "no-store" } });
  }
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: ERROR_COPY.en.invalid }, { status: 400 });
  }
  const parsed = body && typeof body === "object" ? body as Record<string, unknown> : {};
  return runScan(parsed.url, parsed.lang);
}

// GET exists as a transparent diagnostic path so the production scanner can be
// verified end-to-end without a privileged client. The scan itself is read-only.
export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  const lang = request.nextUrl.searchParams.get("lang");
  return runScan(url, lang);
}
