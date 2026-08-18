import { NextResponse } from "next/server";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

import { analyzeVisibilityScan } from "@/lib/visibilityos-scan";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_HTML_BYTES = 2_000_000;
const MAX_TEXT_BYTES = 500_000;
const MAX_REDIRECTS = 4;
const FETCH_TIMEOUT_MS = 5_500;
const USER_AGENT = "VisibilityOS/2.0 (+https://vladkuzmenko.com/visibilityos)";

type Lang = "en" | "ua" | "ru";
type HealthInput = {
  url?: unknown;
  lang?: unknown;
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
  return a === 0
    || a === 10
    || a === 127
    || (a === 100 && b >= 64 && b <= 127)
    || (a === 169 && b === 254)
    || (a === 172 && b >= 16 && b <= 31)
    || (a === 192 && b === 0)
    || (a === 192 && b === 168)
    || (a === 198 && (b === 18 || b === 19))
    || (a === 198 && b === 51 && parts[2] === 100)
    || (a === 203 && b === 0 && parts[2] === 113)
    || a >= 224;
}

function isBlockedIpv6(address: string): boolean {
  const normalized = address.toLowerCase();
  return normalized === "::"
    || normalized === "::1"
    || normalized.startsWith("fc")
    || normalized.startsWith("fd")
    || normalized.startsWith("fe8")
    || normalized.startsWith("fe9")
    || normalized.startsWith("fea")
    || normalized.startsWith("feb")
    || normalized.startsWith("ff")
    || normalized.startsWith("2001:db8:");
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
    hostname === "localhost"
    || hostname.endsWith(".localhost")
    || hostname.endsWith(".local")
    || hostname.endsWith(".internal")
    || hostname.endsWith(".home")
  ) {
    throw new Error("blocked");
  }

  if (isIP(hostname)) {
    if (isBlockedAddress(hostname)) throw new Error("blocked");
    return;
  }

  let addresses: Array<{ address: string; family: number }>;
  try {
    addresses = await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("fetch");
  }

  if (!addresses.length || addresses.some(({ address }) => isBlockedAddress(address))) {
    throw new Error("blocked");
  }
}

async function readLimited(response: Response, maxBytes: number): Promise<string> {
  const declaredLength = Number(response.headers.get("content-length") || "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) throw new Error("large");
  if (!response.body) return "";

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let total = 0;
  let text = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > maxBytes) throw new Error("large");
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
    return text;
  } finally {
    reader.releaseLock();
  }
}

async function fetchPublicResource(
  initialUrl: URL,
  mode: "html" | "text",
): Promise<{ response: Response; text: string; resolvedUrl: string; durationMs: number }> {
  let current = new URL(initialUrl);
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
          Accept: mode === "html"
            ? "text/html,application/xhtml+xml;q=0.9,*/*;q=0.5"
            : "text/plain,application/xml,text/xml,*/*;q=0.5",
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

    if (!response.ok && mode === "text") throw new Error("fetch");

    const contentType = (response.headers.get("content-type") || "").toLowerCase();
    if (
      mode === "html"
      && contentType
      && !contentType.includes("text/html")
      && !contentType.includes("application/xhtml+xml")
    ) {
      throw new Error("content");
    }

    const text = await readLimited(response, mode === "html" ? MAX_HTML_BYTES : MAX_TEXT_BYTES);
    if (!text.trim()) throw new Error("content");

    return {
      response,
      text,
      resolvedUrl: current.toString(),
      durationMs: Date.now() - started,
    };
  }

  throw new Error("fetch");
}

async function tryFetchRobots(url: URL) {
  try {
    const fetched = await fetchPublicResource(url, "text");
    return { found: fetched.response.ok, url: fetched.resolvedUrl };
  } catch {
    return { found: false, url: url.toString() };
  }
}

function findingStatus(
  findings: ReturnType<typeof analyzeVisibilityScan>["findings"],
  id: string,
) {
  return findings.find((finding) => finding.id === id)?.status || "warn";
}

async function runHealthScan(input: HealthInput) {
  const lang = normalizeLang(input.lang);
  const copy = ERROR_COPY[lang];
  const url = normalizeUrl(input.url);

  if (!url) {
    return NextResponse.json({ ok: false, error: copy.invalid }, { status: 400 });
  }

  try {
    const home = await fetchPublicResource(url, "html");
    const base = analyzeVisibilityScan({
      requestedUrl: url.toString(),
      resolvedUrl: home.resolvedUrl,
      statusCode: home.response.status,
      durationMs: home.durationMs,
      headers: home.response.headers,
      html: home.text,
      lang,
    });

    const root = new URL(home.resolvedUrl);
    root.pathname = "/";
    root.search = "";
    root.hash = "";
    const robots = await tryFetchRobots(new URL("/robots.txt", root));

    const monitoredFindingIds = new Set(["https", "status", "canonical", "robots", "security"]);
    const findings = base.findings.filter((finding) => monitoredFindingIds.has(finding.id));

    const result = {
      version: 1,
      mode: "health" as const,
      requestedUrl: base.requestedUrl,
      resolvedUrl: base.resolvedUrl,
      statusCode: base.statusCode,
      durationMs: base.durationMs,
      scannedAt: base.scannedAt,
      health: {
        https: base.resolvedUrl.startsWith("https://"),
        canonical: base.signals.canonical,
        robotsMeta: base.signals.robots,
        robotsFound: robots.found,
        robotsUrl: robots.url,
        availabilityStatus: findingStatus(base.findings, "status"),
        canonicalStatus: findingStatus(base.findings, "canonical"),
        indexabilityStatus: findingStatus(base.findings, "robots"),
        securityStatus: findingStatus(base.findings, "security"),
      },
      findings,
      limitations: [
        "Daily health monitoring checks the homepage response plus robots.txt only.",
        "It does not replace the weekly full Visibility Map or claim rankings, traffic, leads or revenue.",
      ],
    };

    return NextResponse.json(
      { ok: true, result },
      {
        headers: {
          "Cache-Control": "no-store",
          "X-VisibilityOS-Version": "2",
          "X-VisibilityOS-Mode": "health",
        },
      },
    );
  } catch (error) {
    const code = error instanceof Error ? error.message : "fetch";
    const safeCode = code in copy ? code : "fetch";
    const status = safeCode === "blocked" ? 403 : safeCode === "timeout" ? 504 : 502;
    return NextResponse.json({ ok: false, error: copy[safeCode] }, { status });
  }
}

export async function POST(request: Request) {
  let input: HealthInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: ERROR_COPY.en.invalid }, { status: 400 });
  }

  return runHealthScan(input);
}
