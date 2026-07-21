"use client";

// Conditional GA4 layer. Loads gtag.js ONLY when a valid NEXT_PUBLIC_GA_ID is
// present at build time; otherwise this renders nothing and the site behaves
// exactly as before (the existing track() helper stays a safe no-op).
//
// Privacy: we only forward event names + non-PII props (locale, placement,
// intent, scenario, target, slug). Lead contact details are never sent here —
// they go only to the n8n webhook via submitLead().
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/** GA4 measurement IDs look like "G-XXXXXXXXXX". Guard against placeholders. */
export function isValidGaId(id?: string): boolean {
  return !!id && /^G-[A-Z0-9]{6,}$/.test(id);
}

type Win = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  __vkGaBound?: boolean;
};

export function Analytics() {
  const pathname = usePathname();

  // SPA page_view on route change (GA4 config sends the first one itself).
  useEffect(() => {
    if (!isValidGaId(GA_ID) || typeof window === "undefined") return;
    const w = window as Win;
    if (typeof w.gtag === "function") {
      w.gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname]);

  // Site-wide delegation: booking (Cal.com) + outbound portfolio/social clicks.
  // One listener covers every page without editing each link.
  useEffect(() => {
    if (!isValidGaId(GA_ID) || typeof window === "undefined") return;
    const w = window as Win;
    if (w.__vkGaBound) return;
    w.__vkGaBound = true;

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") || "";
      let host = "";
      try {
        host = new URL(href, window.location.origin).hostname.replace(/^www\./, "");
      } catch {
        return;
      }
      if (host.includes("cal.com")) {
        w.gtag?.("event", "booking_click", { target: host });
      } else if (
        /(behance|instagram|youtube|t\.me|telegram|x\.com|twitter|whatsapp|api\.whatsapp)/.test(
          host,
        )
      ) {
        w.gtag?.("event", "outbound_portfolio_click", { target: host });
      }
    };
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      w.__vkGaBound = false;
    };
  }, []);

  if (!isValidGaId(GA_ID)) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
