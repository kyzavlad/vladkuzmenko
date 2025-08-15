"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";

export function HeroSection() {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const animatedWords = useMemo(() => [
    "automated",
    "simplified",
    "optimized",
    "revolutionized",
    "transformed",
    "enhanced",
  ], []);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const wordTimer = setInterval(() => {
      setCurrentWordIndex((i) => (i + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(wordTimer);
  }, [animatedWords]);

  useEffect(() => {
    const descTimer = setInterval(() => {
      setCurrentDescriptionIndex((i) => (i + 1) % 6);
    }, 4000);
    return () => clearInterval(descTimer);
  }, []);

  // ------- Spline robust embed -------
  const viewerUrl = "https://prod.spline.design/tJ4jUZRp1dWv5A8l/scene.splinecode"; // <— если есть scene.splinecode
  const iframeUrl = "https://my.spline.design/nexbotrobotcharacterconcept-WGVbB97K9BiuoLypIsx5Vt2U/"; // <— public link

  const [mode, setMode] = useState<"viewer" | "iframe" | "fallback">("viewer");

  useEffect(() => {
    let script: HTMLScriptElement | null = null;
    let timeout: any = null;

    // если есть .splinecode — пробуем viewer
    if (viewerUrl.includes("splinecode")) {
      script = document.createElement("script");
      script.type = "module";
      script.src = "https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js";
      script.onload = () => setMode("viewer");
      script.onerror = () => setMode("iframe");
      document.head.appendChild(script);

      // если за 3с ничего не отрисовалось — падение на iframe
      timeout = setTimeout(() => setMode("iframe"), 3000);
    } else {
      setMode("iframe");
    }

    return () => {
      if (script) document.head.removeChild(script);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div id="hero-section" className="w-full mt-[64px] md:mt-[72px]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between py-12 md:py-20 gap-8 md:gap-16">

          {/* Left */}
          <div className="flex flex-col items-start text-left w-full md:w-1/2 pr-0 md:pr-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-brand">AI automation</span>
              <span className="block relative h-[1.2em] overflow-hidden">
                {animatedWords.map((word, i) => (
                  <motion.span
                    key={word}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: "-100%" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={currentWordIndex === i ? { y: 0, opacity: 1 } : { y: currentWordIndex > i ? -150 : 150, opacity: 0 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-foreground mt-6 mb-2">
              Automate routine business tasks with AI
            </p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
              Transform your business with AI-powered solutions that help you engage customers, streamline operations, and drive growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
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

          {/* Right — Spline with graceful fallback */}
          <div className="w-full md:w-1/2 h-[500px] md:h-[600px]">
            <div className="w-full h-full rounded-3xl relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {mode === "viewer" && (
                <spline-viewer
                  url={viewerUrl}
                  class="absolute inset-0 w-full h-full"
                  style={{ display: "block" }}
                />
              )}

              {mode === "iframe" && (
                <iframe
                  src={iframeUrl}
                  title="3D Robot"
                  className="absolute inset-0 w-full h-full"
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
    </div>
  );
}
