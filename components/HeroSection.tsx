"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";

export function HeroSection() {
  const words = useMemo(() => ["automated", "simplified", "optimized", "revolutionized", "transformed", "enhanced"], []);
  const [w, setW] = useState(0);
  useEffect(() => { const t = setInterval(() => setW((i) => (i + 1) % words.length), 3000); return () => clearInterval(t); }, [words]);

  const viewerUrl = "https://prod.spline.design/CPBE8PFe07sjn6R6/scene.splinecode";
  const iframeUrl = "https://my.spline.design/nexbotrobotcharacterconcept-WGVbB97K9BiuoLypIsx5Vt2U/";
  const [mode, setMode] = useState<"viewer" | "iframe">("viewer");

  useEffect(() => {
    if (!customElements.get("spline-viewer")) {
      const s = document.createElement("script");
      s.type = "module";
      s.src = "https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js";
      s.onload = () => setMode("viewer");
      s.onerror = () => setMode("iframe");
      document.head.appendChild(s);
      return () => document.head.removeChild(s);
    }
  }, []);

  return (
    <section id="hero-section" className="w-full mt-[64px] md:mt-[72px] pb-6 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 md:pt-12 gap-8 md:gap-10">

          {/* Left */}
          <div className="w-full md:w-5/12 md:pr-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="text-brand">AI automation</span>
              <span className="relative block h-[1.2em] overflow-hidden">
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    className="absolute inset-0"
                    initial={{ opacity: 0, y: "-100%" }}
                    animate={w === i ? { opacity: 1, y: 0 } : { opacity: 0, y: w > i ? -150 : 150 }}
                    transition={{ type: "spring", stiffness: 50 }}
                  >
                    {word}
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

          {/* Right — шире и выше */}
          <div className="w-full md:w-7/12">
            {/* Проверенный padding-hack: держит реальную высоту */}
            <div className="relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl" style={{ paddingTop: "62%" }}>
              {mode === "viewer" ? (
                // @ts-ignore web component
                <spline-viewer url={viewerUrl} class="absolute inset-0 w-full h-full block" />
              ) : (
                <iframe
                  src={iframeUrl}
                  title="3D Robot"
                  className="absolute inset-0 w-full h-full block"
                  frameBorder={0}
                  loading="eager"
                  allow="xr-spatial-tracking; fullscreen"
                />
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
