// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation...",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* 0) Кука только один раз */}
        <Script id="gt-set-cookie" strategy="beforeInteractive">
          {`
            (function() {
              if (!document.cookie.includes('googtrans=')) {
                var lang = (navigator.language||'en').split('-')[0];
                document.cookie = 'googtrans=/en/'+lang+';path=/';
                document.cookie = 'googtrans=/en/'+lang+';path=/;domain=' + location.hostname;
              }
            })();
          `}
        </Script>

        {/* 1) Инициализация */}
        <Script id="gt-init" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {pageLanguage:'en', autoDisplay:true},
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* 2) Подключаем */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* 3) Полное скрытие всего Google-UI */}
        <style>{`
          /* баннер сверху */
          .goog-te-banner-frame, .goog-te-banner-frame.skiptranslate { display:none !important; }
          /* меню языков */
          .goog-te-menu-frame, .goog-te-menu-frame.skiptranslate { display:none !important; }
          /* значки, селекты, линки */
          #google_translate_element,
          .goog-logo-link,
          .goog-te-gadget,
          .goog-te-gadget-icon,
          .goog-te-combo {
            display:none !important;
            visibility:hidden !important;
          }
          /* Сброс top у body */
          body { top:0 !important; }
        `}</style>
      </head>

      <body suppressHydrationWarning>
        {/* контейнер нужен для скрипта, но он скрыт */}
        <div id="google_translate_element" />

        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        <VoiceflowScript />

        {/* наша обновлённая форма переключения */}
        <TranslateSwitcher />
      </body>
    </html>
  )
}
