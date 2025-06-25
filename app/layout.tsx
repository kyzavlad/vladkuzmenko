'use client';

import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';
// Правильный импорт, который чинит деплой
import { CartProvider, ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
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
    }, 2000); // Можете поставить 1000 для ускорения проверки

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className="dark">
      <head>
        {/* Все ваши скрипты аналитики остаются здесь */}
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-EHD6NBQZHV" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-EHD6NBQZHV');` }} />
        <Script id="facebook-pixel" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init', '486823147342957');fbq('track', 'PageView');` }} />
        <noscript><img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=486823147342957&ev=PageView&noscript=1" /></noscript>
        <Script id="microsoft-clarity" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "p1lvfdcjie");` }} />
      </head>
      <body className={`${inter.className} bg-black text-white`}>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div key="loader" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 flex items-center justify-center bg-black z-50">
               {/* Используем ваш класс из globals.css */}
               <div className="loading-logo">
                 <span className="text-white text-2xl font-bold">VladKuzmenko</span>
                 <span className="gradient-text-animated text-2xl font-bold">.com</span>
               </div>
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
