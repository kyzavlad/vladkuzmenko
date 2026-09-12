// Central site config + real conversion helpers for the Vlad Kuzmenko brand.
// Every website form routes through submitLead() to the n8n website-lead webhook
// with a clean, consistent payload (intent + contact fields + page/UTM context).
// Cal.com is used only for "Book a call" buttons — never for website forms.

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://n8n.vladkuzmenko.com/webhook/website-lead";

export const SITE = {
  name: "Vlad Kuzmenko",
  domain: "vladkuzmenko.com",
  // Vercel's production routing resolves the canonical public site on www.
  // Keep one absolute host for metadata, structured data and share assets.
  url: "https://www.vladkuzmenko.com",
  email: "ai@vladkuzmenko.com",
  calcom: "https://cal.com/vladkuzmenko.com/call",
  webhook: WEBHOOK_URL,
  socials: {
    instagram: "https://www.instagram.com/vladkuzmenkosxy/",
    youtube: "https://www.youtube.com/@VladKuzmenkoSpeech",
    x: "https://x.com/vladkuzmenkosxy",
    telegram: "https://t.me/VladKuzmenkoSXY",
    tiktok: "https://www.tiktok.com/@vladkuzmenkosxy",
    whatsapp: "https://wa.me/380951444853",
  },
} as const;

/** Pull any UTM parameters from the current URL (campaign attribution). */
function collectUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
      (k) => {
        const v = p.get(k);
        if (v) out[k] = v;
      }
    );
  } catch {
    /* no-op */
  }
  return out;
}

/**
 * Submit a website lead to the n8n webhook.
 * Enriches every payload with a consistent envelope:
 *   source, sourcePage, referrer, submittedAt, utm_* (+ the caller's intent/fields).
 * Callers should always pass at least an `intent`. Returns true only after the intake confirms a persisted record.
 */
export async function submitLead(
  payload: Record<string, unknown>
): Promise<boolean> {
  const enriched = {
    source: SITE.domain,
    sourcePage:
      typeof window !== "undefined"
        ? window.location.pathname + window.location.hash
        : "",
    referrer: typeof document !== "undefined" ? document.referrer : "",
    submittedAt: new Date().toISOString(),
    ...collectUtm(),
    ...payload,
  };

  try {
    const res = await fetch(SITE.webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
    });
    if (!res.ok) return false;
    const receipt: unknown = await res.json();
    if (!receipt || typeof receipt !== "object") return false;
    const result = receipt as Record<string, unknown>;
    return result.ok === true && result.status === "persisted" &&
      typeof result.leadId === "string" && result.leadId.startsWith("WEB-");
  } catch (err) {
    console.error("submitLead failed", err);
    return false;
  }
}

