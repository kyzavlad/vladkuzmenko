'use client';

import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';
import { CartProvider } from '@/context/cart-context';
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
import { Inter } from 'next/font/google';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        {/* Скрипты аналитики */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-EHD6NBQZHV" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EHD6NBQZHV');` }} />
        {/* ...другие скрипты... */}
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            // ВАШ ОРИГИНАЛЬНЫЙ КОД ЗАГРУЗЧИКА ВОССТАНОВЛЕН
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="loading-container" // ВАШ КЛАСС
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <div className="logo-loader"> {/* ВАШ КЛАСС */}
                  <span className="text-white">VladKuzmenko</span>
                  <span className="gradient-gold-text">.com</span> {/* ВАШ КЛАСС */}
                </div>
                <motion.div
                  className="absolute inset-0 logo-shine"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
                <motion.div
                  className="mt-8 h-1 w-32 mx-auto bg-gray-800 rounded-full overflow-hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-400 to-yellow-600"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <CartProvider>
                {children}
                <ShoppingCartSidebar />
              </CartProvider>
              <VoiceflowScript />
              <TranslateSwitcher />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
