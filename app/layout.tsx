// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'  // ваш новый компонент

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation solutions...",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* Ставим куку ДО загрузки скрипта */}
        <Script id="gt-set-cookie" strategy="beforeInteractive">
          {`
            (function() {
              var lang = (navigator.language || 'en').split('-')[0];
              document.cookie = 'googtrans=/en/' + lang + ';path=/';
              document.cookie = 'googtrans=/en/' + lang + ';path=/;domain=' + location.hostname;
            })();
          `}
        </Script>

        {/* Инициализация Google Translate */}
        <Script id="gt-init" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: true },
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* Подключаем библиотеку */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* Скрываем весь дефолтный UI и баннер */}
        <style>{`
          #google_translate_element,
          .goog-te-gadget-icon,
          .goog-te-combo,
          .goog-te-banner-frame.skiptranslate {
            display: none !important;
          }
          body { top: 0 !important; }
        `}</style>
      </head>

      <body suppressHydrationWarning>
        {/* Невидимый контейнер Google (он нужен, но UI скрыт) */}
        <div id="google_translate_element" />

        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <VoiceflowScript />

        {/* Наш красивый переключатель */}
        <TranslateSwitcher />
      </body>
    </html>
  )
}
