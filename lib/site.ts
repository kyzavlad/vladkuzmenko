// Central site config + real conversion helpers for the Vlad Kuzmenko brand.
// Every website form routes through submitLead() to the n8n website-lead webhook
// with a clean, consistent payload (intent + contact fields + page/UTM context).
// Cal.com is used only for "Book a call" buttons — never for website forms.

const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL ||
  "https://n8n.vladkuzmenkoai.com/webhook/b60f2736-ecb9-451a-b38e-5018c3935013";

export const SITE = {
  name: "Vlad Kuzmenko",
  domain: "vladkuzmenko.com",
  url: "https://vladkuzmenko.com",
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

function collectUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const out: Record<string, string> = {};
  try {
    const p = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = p.get(k);
      if (v) out[k] = v;
    });
  } catch {
    /* no-op */
  }
  return out;
}

export async function submitLead(payload: Record<string, unknown>): Promise<boolean> {
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
    return res.ok;
  } catch (err) {
    console.error("submitLead failed", err);
    return false;
  }
}
