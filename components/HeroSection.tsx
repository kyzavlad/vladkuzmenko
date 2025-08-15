"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";

export function HeroSection() {
  const animatedWords = useMemo(
    () => ["automated", "simplified", "optimized", "revolutionized", "transformed", "enhanced"],
    []
  );
  const [wordIdx, setWordIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((i) => (i + 1) % animatedWords.length), 3000);
    return () => clearInterval(t);
  }, [animatedWords]);

  // --- Spline embed: сначала viewer (.splinecode), если не прокатит — public iframe
  const viewerUrl =
    "https://prod.spline.design/CPBE8PFe07sjn6R6/scene.splinecode"; // из твоего скрина Code Export
  const iframeUrl =
    "https://my.spline.design/nexbotrobotcharacterconcept-WGVbB97K9BiuoLypIsx5Vt2U/"; // из твоего Public URL

  const [mode, setMode] = useState<"viewer" | "iframe" | "fallback">("viewer");

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let bail: number | undefined;

    // грузим viewer один раз
    if (!customElements.get("spline-viewer")) {
      script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js";
      script.onload = () => setMode("viewer");
      script.onerror = () => setMode("iframe");
      document.head.appendChild(script);
    } else {
      setMode("viewer");
    }

    // если за 3с web-component не отрисовался — падаем на iframe
    bail = window.setTimeout(() => setMode((m) => (m === "viewer" ? "iframe" : m)), 3000);

    return () => {
      if (script) document.head.removeChild(script);
      if (bail) window.clearTimeout(bail);
    };
  }, []);

  return (
    <section id="hero-section" className="w-full mt-[64px] md:mt-[72px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-8 md:gap-16">
          {/* Left */}
          <div className="w-full md:w-1/2 md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-brand">AI automation</span>
              <span className="relative block h-[1.2em] overflow-hidden">
                {animatedWords.map((w, i) => (
                  <motion.span
                    key={w}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={wordIdx === i ? { opacity: 1, y: 0 } : { opacity: 0, y: wordIdx > i ? -150 : 150 }}
                    transition={{ type: "spring", stiffness: 50 }}
                  >
                    {w}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="mt-6 mb-2 text-lg sm:text-xl md:text-2xl text-foreground">
              Automate routine business tasks with AI
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Transform your business with AI-powered solutions that help you engage customers, streamline operations, and drive growth.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="https://cal.com/vladkuzmenko.com/call" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4" />
                  Schedule a free consultation
                </Button>
              </a>

              <ContactDialog triggerText="Get started now">
                <Button size="lg" className="flex items-center gap-2">
                  Get started now <ArrowRight className="h-4 w-4" />
                </Button>
              </ContactDialog>
            </div>
          </div>

          {/* Right */}
          <div className="w-full md:w-1/2">
            <div
              className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900"
              style={{ aspectRatio: "1 / 1", minHeight: 480 }}
            >
              {mode === "viewer" && (
                // @ts-ignore — web component
                <spline-viewer
                  url={viewerUrl}
                  class="absolute inset-0 h-full w-full"
                  style={{ display: "block" }}
                />
              )}

              {mode === "iframe" && (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={iframeUrl}
                  title="3D Robot"
                  frameBorder={0}
                  loading="eager"
                  allow="xr-spatial-tracking; fullscreen"
                />
              )}

              {mode === "fallback" && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  3D model unavailable
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
