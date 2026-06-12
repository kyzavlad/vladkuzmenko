"use client";

import { CartProvider } from "@/context/cart-context";
import { ShoppingCartSidebar } from "@/components/ui/shopping-cart-sidebar";
import { VoiceflowScript } from "@/components/voiceflow-script";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            Vlad Kuzmenko
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

/**
 * Client shell: keeps the existing intro animation, cart, assistant and toaster.
 * Split out of the root layout so the layout can stay a server component and
 * use the Next.js Metadata API for proper SEO.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    document.documentElement.classList.add("dark");
    return () => clearTimeout(t);
  }, []);

  return (
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
  );
}
