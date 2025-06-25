'use client';

import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';

// --- ИСПРАВЛЕННЫЕ ИМПОРТЫ ---
import { CartProvider } from '@/context/cart-context'; // Логика корзины
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar'; // Дизайн корзины
// ------------------------------

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
        <Script id="facebook-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '486823147342957');fbq('track', 'PageView');` }} />
        <noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=486823147342957&ev=PageView&noscript=1" /></noscript>
        <Script id="microsoft-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "p1lvfdcjie");` }} />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="loading-container" >
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }} className="text-center" >
                <div className="logo-loader">
                  <span className="text-white">VladKuzmenko</span>
                  <span className="gradient-gold-text">.com</span>
                </div>
                <motion.div className="absolute inset-0 logo-shine" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
                <motion.div className="mt-8 h-1 w-32 mx-auto bg-gray-800 rounded-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} >
                  <motion.div className="h-full bg-gradient-to-r from-amber-400 to-yellow-600" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} >
              {/* --- ВОЗВРАЩАЕМ КОРЗИНУ --- */}
              <CartProvider>
                {children}
                <ShoppingCartSidebar />
              </CartProvider>
              {/* ------------------------- */}
              <VoiceflowScript />
              <TranslateSwitcher />
            </motion.div>
          )}
        </AnimatePresence>
      </body>
    </html>
  );
}
