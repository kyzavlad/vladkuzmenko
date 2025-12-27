'use client';

import './globals.css';
import { VoiceflowScript } from '@/components/voiceflow-script';
import { CartProvider } from '@/context/cart-context';
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';

function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
      className="loading-animation"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45 }}
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 800);
    document.documentElement.classList.add('dark');
    return () => clearTimeout(t);
  }, []);

  const title = 'Vlad Kuzmenko | Business • AI Systems • Network';
  const description =
    'Vlad Kuzmenko official hub: education, AI systems, and a global network — products, community and tools to build leverage.';
  const siteUrl = 'https://vladkuzmenko.com';
  const ogImage = `${siteUrl}/og.jpg`; // если нет — сделаем позже, но ссылка уже готова

  return (
    <html lang="en" className="dark">
      <head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/VladKuzmenkoFavicon.png" />

        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Optional keywords (не “магия”, но ок для базовой семантики) */}
        <meta
          name="keywords"
          content="Vlad Kuzmenko, business education, AI systems, AI automation, automation agency, online education, community, network, entrepreneurship, creators, content systems, leverage, digital products"
        />

        <style>{`
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 3px; }
          ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.22); }
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
                transition={{ duration: 0.45 }}
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
