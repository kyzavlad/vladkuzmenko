// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { VoiceflowScript } from '@/components/voiceflow-script';

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation solutions...",
  // …остальное без изменений
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* 1) Колбэк инициализации Google Translate */}
        <Script id="gt-init" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false },
                'google_translate_element'
              );
            }
          `}
        </Script>

        {/* 2) Подгружаем сам виджет */}
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />

        {/* 3) Авто-переключение на язык браузера */}
        <Script id="gt-autoswitch" strategy="afterInteractive">
          {`
            document.addEventListener('DOMContentLoaded', () => {
              const lang = (navigator.language || 'en').split('-')[0];
              const sel = document.querySelector('#google_translate_element select');
              if (sel && sel.querySelector('option[value="' + lang + '"]')) {
                sel.value = lang;
                sel.dispatchEvent(new Event('change'));
              }
            });
          `}
        </Script>
      </head>

      <body suppressHydrationWarning>
        {/* контейнер для виджета (скрыт) */}
        <div id="google_translate_element" style={{ display: 'none' }} />

        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <VoiceflowScript />
      </body>
    </html>
  );
}
