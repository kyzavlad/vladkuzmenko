// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation solutions...",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* 
          0) Устанавливаем куку ТОЛЬКО если её ещё нет 
             (чтобы не затирать выбор пользователя)
        */}
        <Script id="gt-set-cookie" strategy="beforeInteractive">
          {`
            (function() {
              if (!document.cookie.includes('googtrans')) {
                var lang = (navigator.language || 'en').split('-')[0];
                document.cookie = 'googtrans=/en/' + lang + ';path=/';
                document.cookie = 'googtrans=/en/' + lang + ';path=/;domain=' + location.hostname;
              }
            })();
          `}
        </Script>

        {/* 1) Инициализатор */}
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

        {/* 2) Подключаем Google Translate */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* 3) Глобальное CSS-скрытие всего их UI */}
        <style>{`
          /* Верхний баннер */
          .goog-te-banner-frame { display: none !important; }
          /* Плавающий переключатель */
          .goog-te-menu-frame { display: none !important; }
          /* Сами виджеты и значки */
          #google_translate_element,
          .goog-te-gadget,
          .goog-logo-link,
          .goog-te-combo,
          .goog-te-gadget-icon {
            display: none !important;
            visibility: hidden !important;
          }
          /* Корректируем body */
          body { top: 0 !important; }
        `}</style>
      </head>

      <body suppressHydrationWarning>
        {/* нужный, но скрытый контейнер */}
        <div id="google_translate_element" />

        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <VoiceflowScript />

        {/* Плавающий TranslateSwitcher выше ассистента */}
        <TranslateSwitcher />
      </body>
    </html>
  )
}
