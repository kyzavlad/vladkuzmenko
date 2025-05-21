// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'
import { VoiceflowScript } from '@/components/voiceflow-script'

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation solutions...",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* 0) Ставим куку на авто-перевод: */}
        <Script id="gt-set-cookie" strategy="beforeInteractive">
          {`
            (function() {
              const lang = (navigator.language || 'en').split('-')[0];
              // ставим куку для всех путей и поддоменов
              document.cookie = 'googtrans=/en/' + lang + ';path=/';
              document.cookie = 'googtrans=/en/' + lang + ';path=/;domain=' + location.hostname;
            })();
          `}
        </Script>

        {/* 1) Регистрируем колбэк */}
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

        {/* 2) Подключаем библиотеку */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* 3) Скрываем родной UI и баннер через CSS */}
        <style>{`
          /* скрыть весь интерфейс Google Translate */
          #google_translate_element, 
          .goog-te-gadget-icon,
          .goog-te-combo {
            display: none !important;
          }
          /* убрать сдвиг страницы баннером */
          .goog-te-banner-frame.skiptranslate { display: none !important; }
          body { top: 0 !important; }
        `}</style>
      </head>

      <body suppressHydrationWarning>
        {/* контейнер нужен, но скрыт через CSS */}
        <div id="google_translate_element" />

        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <VoiceflowScript />
      </body>
    </html>
  )
}
