"use client";

import { useEffect } from "react";

/**
 * First-visit language detection (English-first, client-side — safe for static
 * export). Only mounted on the EN home route (`/`).
 *
 * Rules:
 * - If the visitor previously picked a language (localStorage `vk_lang`), respect it.
 * - Otherwise, on a first visit, redirect by browser language only:
 *     `uk*` → /ua, `ru*` → /ru, anything else → stay on /.
 * - No IP-based redirects. The language switcher writes `vk_lang` on manual change,
 *   so a manual choice is never overridden.
 */
export function LangAutoRedirect() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("vk_lang");
      if (saved === "ua") {
        window.location.replace("/ua");
        return;
      }
      if (saved === "ru") {
        window.location.replace("/ru");
        return;
      }
      if (saved === "en") return; // respect a manual English choice

      // First visit, no saved preference — detect from browser language only.
      const lang = (navigator.language || "").toLowerCase();
      if (lang.startsWith("uk")) window.location.replace("/ua");
      else if (lang.startsWith("ru")) window.location.replace("/ru");
    } catch {
      /* no-op */
    }
  }, []);

  return null;
}
