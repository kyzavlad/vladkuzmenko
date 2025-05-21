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
        {/* 1) Регистрация колбэка ДО того, как загрузится сам скрипт */}
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

        {/* 2) Подгрузка Google Translate */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* 3) Авто-переключатель после полной загрузки страницы */}
        <Script id="gt-autoswitch" strategy="afterInteractive">
          {`
            window.addEventListener('load', () => {
              const lang = (navigator.language || 'en').split('-')[0];
              const sel = document.querySelector('#google_translate_element select');
              if (sel) {
                const opt = sel.querySelector('option[value="'+lang+'"]');
                if (opt) {
                  sel.value = lang;
                  sel.dispatchEvent(new Event('change'));
                }
              }
            });
          `}
        </Script>
      </head>

      <body suppressHydrationWarning>
        {/* 
          1) Временно УБЕРИ display:none, чтобы видеть селектор 
          2) Как только проверишь, что он загружается — вернёшь display:none
        */}
        <div
          id="google_translate_element"
          style={{
            position: 'fixed',
            top: 10,
            right: 10,
            zIndex: 9999,
            background: 'white',
            border: '1px solid #ddd',
          }}
        />

        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <VoiceflowScript />
      </body>
    </html>
  )
}
