// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';

export const metadata: Metadata = {
  // Убедитесь, что у вас есть metadataBase в next.config.js для правильных URL
  metadataBase: new URL('https://vladkuzmenko.com'), // Замените на ваш домен
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: 'Transform your business with AI-powered automation...',
  icons: {
    icon: '/VladKuzmenkoFavicon.png',
    shortcut: '/VladKuzmenkoFavicon.png',
    apple: '/VladKuzmenkoFavicon.png',
  },
  // … остальное SEO
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* Google Translate Initialization */}
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
        {/* Hiding the default Google Translate UI */}
        <style>
          {`
            .goog-te-banner-frame, .goog-te-menu-frame,
            #google_translate_element,
            .goog-te-gadget, .goog-logo-link,
            .goog-te-gadget-icon, .goog-te-combo {
              display: none !important;
            }
            body { top: 0 !important; }
          `}
        </style>
      </head>
      <body suppressHydrationWarning>
        {/* Этот div нужен для работы Google Translate */}
        <div id="google_translate_element" />

        {/* Оборачиваем дочерние элементы в ThemeProvider */}
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>

        {/* Подключаем скрипты */}
        <VoiceflowScript />
        <TranslateSwitcher />
      </body>
    </html>
  );
}
