// app/layout.tsx
import './globals.css'; // Подключаем обновленный globals.css
import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { Inter } from 'next/font/google'; // Пример подключения шрифта
// Ваши другие импорты (VoiceflowScript, TranslateSwitcher и т.д.)
import { VoiceflowScript } from '@/components/voiceflow-script';
import TranslateSwitcher from '@/components/translate-switcher';
import Script from 'next/script'; // Для скриптов Google Translate

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VladKuzmenko.com | AI Automation', // Пример заголовка
  description: 'Transform your business with AI-powered automation solutions by VladKuzmenko.', // Пример описания
  icons: { // Используйте ваши реальные иконки
    icon: '/VladKuzmenkoFavicon.png', // путь от папки public
    shortcut: '/VladKuzmenkoFavicon.png',
    apple: '/VladKuzmenkoFavicon.png',
  },
  // Добавьте другие важные мета-теги (keywords, openGraph, twitter)
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Добавляем класс переменной шрифта и font-sans для применения шрифта Inter
    // Класс темы (light/dark) будет добавлен ThemeProviderWrapper
    <html lang="en" suppressHydrationWarning className={`${inter.variable} font-sans`}> 
      <head>
        {/* Скрипты Google Translate */}
        <Script id="gt-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `
          function googleTranslateElementInit() {
            if (typeof google !== 'undefined' && google.translate) {
              new google.translate.TranslateElement(
                { pageLanguage: 'en', autoDisplay: false, layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
                'google_translate_element'
              );
            }
          }
        `}} />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        {/* Стили для скрытия стандартного виджета Google Translate и возможных артефактов */}
        <style dangerouslySetInnerHTML={{ __html: `
          .goog-te-banner-frame, body > .skiptranslate, .goog-te-gadget-simple,
          .goog-te-menu-frame, #google_translate_element, .goog-logo-link,
          .goog-te-gadget-icon, .goog-te-combo, .goog-tooltip, .goog-text-highlight {
            display: none !important;
            visibility: hidden !important;
            height: 0 !important;
            width: 0 !important;
            opacity: 0 !important;
          }
          body { top: 0px !important; position: relative !important; min-height: 100vh !important; }
          iframe.goog-te-menu-frame { display: none !important; }
        `}} />
      </head>
      {/* ВАЖНО: Тег <body> НЕ должен иметь Tailwind классов для фона (типа bg-white, bg-black, bg-neutral-950, bg-background).
        Фон теперь полностью управляется из globals.css через стили для тега <html>.
        Класс inter.className (если вы его используете напрямую) тоже не нужен, так как inter.variable + font-sans уже применены к html.
      */}
      <body suppressHydrationWarning> {/* suppressHydrationWarning может быть полезен */}
        <ThemeProviderWrapper> {/* Этот компонент управляет классом .light/.dark на html */}
          <div id="google_translate_element" style={{ display: 'none' }}></div>
          
          {/* Основной контейнер для вашего контента. 
              Убедитесь, что он НЕ имеет непрозрачного фона, который мог бы перекрыть фон <html>.
              Классы типа min-h-screen, flex, flex-col здесь для базовой структуры.
          */}
          <div className="flex min-h-screen flex-col"> 
            {/* Здесь будет ваш Header, затем {children}, затем Footer, если они есть */}
            {/* Например: */}
            {/* <ActualHeaderComponent /> */}
            <main className="flex-grow"> {/* flex-grow чтобы footer был внизу, если контента мало */}
              {children}
            </main>
            {/* <ActualFooterComponent /> */}
          </div>
        </ThemeProviderWrapper>
        
        {/* Глобальные скрипты, которые должны быть в конце body */}
        <VoiceflowScript /> {/* Если он у вас есть */}
        <TranslateSwitcher /> {/* Переключатель языка */}
      </body>
    </html>
  );
}
