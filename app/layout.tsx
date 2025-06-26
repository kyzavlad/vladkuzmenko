'use client';

import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'
// --- Я ИСПРАВИЛ ТОЛЬКО ЭТИ 2 СТРОКИ. ВСЕ ОСТАЛЬНОЕ - ВАШ ОРИГИНАЛЬНЫЙ КОД ---
import { CartProvider } from '@/context/cart-context';
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
// -------------------------------------------------------------------------
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Компонент анимации загрузки (ВАШ ОРИГИНАЛЬНЫЙ КОД)
function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="loading-animation"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center"
      >
        <div className="loading-logo mb-8">
          <span className="text-4xl font-bold font-serif italic gold-gradient logo-underline">
            VladKuzmenko
          </span>
        </div>
        <div className="sound-wave">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="sound-bar"></div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    document.documentElement.classList.add('dark');
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Vlad Kuzmenko | Building Systems for Freedom</title>
        <meta name="description" content="The official hub for Vlad Kuzmenko's ecosystem: The University, Warriors Team, AI Automation Agency, and more." />
        <link rel="icon" href="/VladKuzmenkoFavicon.png" />
        
        {/* Скрипты */}
        <Script id="gt-init" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <style>{`
          .goog-te-banner-frame, .goog-te-menu-frame,
          #google_translate_element,
          .goog-te-gadget, .goog-logo-link,
          .goog-te-gadget-icon, .goog-te-combo {
            display: none !important;
          }
          body { top: 0 !important; }
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
                <div id="google_translate_element" className="hidden" />
                {children}
                <VoiceflowScript />
                <TranslateSwitcher />
                <ShoppingCartSidebar />
              </motion.div>
            )}
          </AnimatePresence>
        </CartProvider>
      </body>
    </html>
  )
}
