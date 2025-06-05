// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'; // Ваш компонент
import { Inter } from 'next/font/google'; 
import { VoiceflowScript } from '@/components/voiceflow-script'; // Ваши компоненты
import TranslateSwitcher from '@/components/translate-switcher'; // Ваши компоненты
import Script from 'next/script'; // Для скриптов Google Translate

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VladKuzmenko.com | AI Automation & More', // Обновленный заголовок
  description: 'Leading innovations in AI automation and empowering elite communities.', // Обновленное описание
  icons: { 
    icon: '/VladKuzmenkoFavicon.png',
    shortcut: '/VladKuzmenkoFavicon.png',
    apple: '/VladKuzmenkoFavicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans`}> 
      <head>
        <Script id="gt-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            if (typeof window.google !== 'undefined' && typeof window.google.translate !== 'undefined') {
              new window.google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false, layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE },
                'google_translate_element'
              );
            }
          }
        `}} />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          .goog-te-banner-frame, body > .skiptranslate, .goog-te-gadget-simple,
          .goog-te-menu-frame, #google_translate_element, .goog-logo-link,
          .goog-te-gadget-icon, .goog-te-combo, .goog-tooltip, .goog-text-highlight {
            display: none !important; visibility: hidden !important; height: 0 !important; width: 0 !important; opacity: 0 !important;
          }
          body { top: 0px !important; position: relative !important; }
          iframe.goog-te-menu-frame { display: none !important; }
        `}} />
      </head>
      {/* Тег body НЕ должен иметь классов фона. Его фон будет прозрачным, показывая фон html. */}
      <body suppressHydrationWarning> 
        <ThemeProviderWrapper 
          attribute="class" 
          defaultTheme="dark" /* УСТАНАВЛИВАЕМ ТЕМНУЮ ТЕМУ ПО УМОЛЧАНИЮ */
          enableSystem={false} /* Отключаем системную тему, чтобы всегда была темная по умолчанию, если вы не хотите переключатель */
          /* Если хотите, чтобы системная тема работала и был переключатель, оставьте enableSystem={true} и defaultTheme="system" */
        >
          <div id="google_translate_element" style={{ display: 'none' }}></div>
          
          {/* Основной div для контента НЕ должен иметь непрозрачный фон */}
          <div className="flex min-h-screen flex-col"> 
            {/* <YourSiteHeaderComponent /> Если у вас есть отдельный компонент хедера */}
            <main className="flex-grow">
              {children}
            </main>
            {/* <YourSiteFooterComponent /> Если у вас есть отдельный компонент футера */}
          </div>
        </ThemeProviderWrapper>
        
        <VoiceflowScript />
        <TranslateSwitcher />
      </body>
    </html>
  );
}
