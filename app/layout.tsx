"use client";

import "./globals.css";
import { VoiceflowScript } from "@/components/voiceflow-script";
import { CartProvider } from "@/context/cart-context";
import { ShoppingCartSidebar } from "@/components/ui/shopping-cart-sidebar";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";

function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading-animation"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.55 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="loading-logo mb-8">
          <span className="text-4xl font-bold font-serif italic gold-gradient logo-underline">
            VladKuzmenko
          </span>
        </div>
        <div className="sound-wave">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="sound-bar" />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    document.documentElement.classList.add("dark");
    return () => clearTimeout(t);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Vlad Kuzmenko | Business • AI Systems • Network</title>
        <meta
          name="description"
          content="Vlad Kuzmenko — education, AI systems, and a global network for builders. Practical leverage: skills, automation, and execution."
        />
        <meta name="robots" content="index,follow" />
        <link rel="icon" href="/VladKuzmenkoFavicon.png" />
        <link rel="canonical" href="https://vladkuzmenko.com" />

        {/* OpenGraph / Twitter (база, без лишнего) */}
        <meta property="og:title" content="Vlad Kuzmenko | Business • AI Systems • Network" />
        <meta
          property="og:description"
          content="Education, AI systems, and a global network for builders. Practical leverage: skills, automation, and execution."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vladkuzmenko.com" />
        <meta property="twitter:card" content="summary_large_image" />

        <style>{`
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
        `}</style>
      </head>

      <body suppressHydrationWarning>
        <CartProvider>
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingAnimation key="loading" />
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {children}
                <VoiceflowScript />
                <ShoppingCartSidebar />
                <Toaster />
              </motion.div>
            )}
          </AnimatePresence>
        </CartProvider>
      </body>
    </html>
  );
}
