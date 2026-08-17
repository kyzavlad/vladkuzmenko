"use client";

import { useEffect } from "react";

/**
 * The product cards are visible before a user runs a scan, while the contextual
 * request form intentionally renders only after a real scan exists. This small
 * bridge preserves the same CTA semantics: before results it moves the visitor
 * to the scan input; after results the page's native handlers take over and
 * move to the contextual request form.
 */
export function VisibilityOsIntentBridge() {
  useEffect(() => {
    const product = document.getElementById("product");
    if (!product) return;

    const handleIntent = (event: Event) => {
      if (document.getElementById("request-plan")) return;

      const target = event.target;
      if (!(target instanceof Element)) return;
      const button = target.closest("button[type='button']");
      if (!button || !product.contains(button)) return;

      const scan = document.getElementById("scan");
      if (!scan) return;

      scan.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        document.getElementById("visibility-url")?.focus({ preventScroll: true });
      }, 450);
    };

    product.addEventListener("click", handleIntent, true);
    return () => product.removeEventListener("click", handleIntent, true);
  }, []);

  return null;
}
