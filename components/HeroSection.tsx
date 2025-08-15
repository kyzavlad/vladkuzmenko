"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PhoneCall, ArrowRight } from "lucide-react";
import { ContactDialog } from "@/components/ui/contact-dialog";
import { motion } from "framer-motion";
import Script from "next/script";

export function HeroSection() {
  const words = useMemo(
    () => ["automated", "simplified", "optimized", "revolutionized", "transformed", "enhanced"],
    []
  );
  const [w, setW] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setW((i) => (i + 1) % words.length), 3000);
    return () => clearInterval(t);
  }, [words]);

  // ТВОЙ scene.splinecode
  const splineScene =
    "https://prod.spline.design/tJ4jUZRp1dWv5A8l/scene.splinecode";

  return (
    <section id="hero-section" className="w-full mt-[64px] md:mt-[72px] pb-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 md:pt-10 gap-6 md:gap-8">
          {/* LEFT */}
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
              Transform your business with AI-powered solutions that help you engage customers,
              streamline operations, and drive growth.
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

          {/* RIGHT — «толстый» робот */}
          <div className="w-full md:w-7/12">
            {/* загружаем web-component viewer один раз */}
            <Script
              src="https://unpkg.com/@splinetool/viewer@1.10.48/build/spline-viewer.js"
              type="module"
              strategy="afterInteractive"
            />
            <div
              className="
                relative w-full overflow-hidden rounded-3xl
                bg-gradient-to-br from-gray-900 via-black to-gray-900 shadow-2xl
                h-[420px] sm:h-[520px] md:h-[640px] lg:h-[720px]
              "
            >
              {/* сам viewer — растянут по контейнеру без «сжатия» */}
              {/* @ts-ignore */}
              <spline-viewer
                url={splineScene}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
