import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'
import { CartProvider, ShoppingCartSidebar } from '@/components/EducationPlatformSection'; // <-- ИМПОРТИРУЙ

export const metadata: Metadata = {
  title: 'Vlad Kuzmenko | Building Systems for Freedom',
  description: 'The official hub for Vlad Kuzmenko\'s ecosystem: The University, Warriors Team, AI Automation Agency, and more.',
  icons: {
    icon: '/VladKuzmenkoFavicon.png',
    shortcut: '/VladKuzmenkoFavicon.png',
    apple: '/VladKuzmenkoFavicon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans dark">
      <head>
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
        {/* Скрываем дефолтный UI */}
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
        <CartProvider> {/* <-- ОБЕРНУЛИ В ПРОВАЙДЕР КОРЗИНЫ */}
          <ThemeProviderWrapper>
            <div id="google_translate_element" className="hidden" />
            {children}
            <VoiceflowScript />
            <TranslateSwitcher />
            <ShoppingCartSidebar /> {/* <-- ДОБАВИЛИ САМУ КОРЗИНУ */}
          </ThemeProviderWrapper>
        </CartProvider>
      </body>
    </html>
  )
}
