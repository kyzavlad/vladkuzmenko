'use client';

import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'
import { CartProvider } from '@/context/cart-context';
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

// Компонент анимации загрузки
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
    // Показываем анимацию загрузки
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Устанавливаем темную тему по умолчанию
    document.documentElement.classList.add('dark');

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        <title>Vlad Kuzmenko | Building Systems for Freedom</title>
        <meta name="description" content="The official hub for Vlad Kuzmenko's ecosystem: The University, Warriors Team, AI Automation Agency, and more." />
        <link rel="icon" href="/VladKuzmenkoFavicon.png" />
        
        {/* Google Translate Scripts */}
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
          
          /* Минималистичный скроллбар */
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.2);
          }
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
                <Toaster />
              </motion.div>
            )}
          </AnimatePresence>
        </CartProvider>
      </body>
    </html>
  )
}
