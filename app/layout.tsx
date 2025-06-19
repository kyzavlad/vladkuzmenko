import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';
import { CartProvider } from '@/context/cart-context'; // <-- Импортируем провайдер
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar'; // <-- Импортируем сайдбар
import { Toaster } from "@/components/ui/sonner" // <-- Импортируем Toaster для уведомлений

export const metadata: Metadata = {
  metadataBase: new URL('https://vladkuzmenko.com'),
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: 'Transform your business with AI-powered automation...',
  icons: {
    icon: '/VladKuzmenkoFavicon.png',
    shortcut: '/VladKuzmenkoFavicon.png',
    apple: '/VladKuzmenkoFavicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
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
        <style>
          {`
            .goog-te-banner-frame, .goog-te-menu-frame,
            #google_translate_element,
            .goog-te-gadget, .goog-logo-link,
            .goog-te-gadget-icon, .goog-te-combo {
              display: none !important;
            }
            body { top: 0 !important; }
            .aurora-background {
              background-color: #000000;
              background-image: radial-gradient(ellipse 80% 80% at 50% -20%,rgba(120,119,198,0.3),hsla(0,0%,100%,0));
            }
          `}
        </style>
      </head>
      <body suppressHydrationWarning>
        <CartProvider> {/* <--- Оборачиваем всё в провайдер */}
          <ThemeProviderWrapper>
            <div id="google_translate_element" style={{ display: 'none' }} />
            {children}
            <ShoppingCartSidebar /> {/* <--- Добавляем сайдбар */}
            <Toaster position="top-center" richColors /> {/* <--- Добавляем Toaster */}
          </ThemeProviderWrapper>
        </CartProvider>
        <VoiceflowScript />
        <TranslateSwitcher />
      </body>
    </html>
  );
}
