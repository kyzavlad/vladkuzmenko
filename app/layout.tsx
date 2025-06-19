import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';
import { CartProvider } from '@/context/cart-context';
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
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
              if (typeof google !== 'undefined' && google.translate) {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', autoDisplay: false },
                  'google_translate_element'
                );
              }
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
          <ThemeProviderWrapper>
            {children}
            <ShoppingCartSidebar />
            <Toaster richColors position="top-right" />
          </ThemeProviderWrapper>
          <div id="google_translate_element" style={{ display: 'none' }} />
          <VoiceflowScript />
          <TranslateSwitcher />
        </CartProvider>
      </body>
    </html>
  );
}
