import './globals.css';
import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';
import { CartProvider } from '@/context/cart-context';
import { ShoppingCartSidebar } from '@/components/ui/shopping-cart-sidebar';
import { Toaster } from "@/components/ui/sonner";
import Script from 'next/script';

export const metadata: Metadata = {
  metadataBase: new URL('https://vladkuzmenko.com'),
  title: 'AI & Business Automation | VladKuzmenko.com',
  description: 'Transform your business with AI-powered automation, join an elite community, and get high-performance gear.',
  icons: { icon: '/VladKuzmenkoFavicon.png', shortcut: '/VladKuzmenkoFavicon.png', apple: '/VladKuzmenkoFavicon.png' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        <Script id="gt-init" strategy="beforeInteractive">{`function googleTranslateElementInit() { new google.translate.TranslateElement({ pageLanguage: 'en', autoDisplay: false }, 'google_translate_element'); }`}</Script>
        <Script src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" strategy="afterInteractive" />
      </head>
      <body suppressHydrationWarning className="bg-background text-foreground">
        <CartProvider>
          <ThemeProviderWrapper>
            <div id="google_translate_element" style={{ display: 'none' }} />
            {children}
            <ShoppingCartSidebar />
            <Toaster position="top-center" richColors theme="dark" />
          </ThemeProviderWrapper>
        </CartProvider>
        <VoiceflowScript />
        <TranslateSwitcher />
      </body>
    </html>
  );
}
