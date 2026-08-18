"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Keeps pre-scan product CTAs focused on the free Visibility Map while exposing
 * the saved-project workspace as a persistent next step.
 */
export function VisibilityOsIntentBridge() {
  const pathname = usePathname();

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

  const prefix = pathname.startsWith("/ua/")
    ? "/ua"
    : pathname.startsWith("/ru/")
      ? "/ru"
      : "";
  const label = prefix === "/ua" ? "Кабінет" : prefix === "/ru" ? "Кабинет" : "Workspace";

  return (
    <a
      href={`${prefix}/visibilityos/app`}
      className="fixed bottom-4 right-4 z-40 rounded-full border border-sky-200/15 bg-black/80 px-4 py-2 text-[11px] font-medium text-sky-100 shadow-[0_12px_40px_rgba(0,0,0,.45)] backdrop-blur-xl transition hover:border-sky-200/30 hover:bg-[#071015] sm:bottom-6 sm:right-6"
    >
      VisibilityOS · {label}
    </a>
  );
}
