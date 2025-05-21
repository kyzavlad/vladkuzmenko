// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import Script from 'next/script'
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper'
import { VoiceflowScript } from '@/components/voiceflow-script'
import TranslateSwitcher from '@/components/translate-switcher'

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: 'Transform your business with AI-powered automation solutions that streamline operations, engage customers, and drive growth.',
  applicationName: 'VladKuzmenko.com',
  authors: [{ name: 'Vladislav Kuzmenko', url: 'https://vladkuzmenko.com' }],
  generator: 'Next.js',
  keywords: ['AI automation', 'business automation', 'AI solutions', 'workflow automation', 'Vlad Kuzmenko'],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)',  color: '#000000' },
  ],
  icons: {
    icon: '/VladKuzmenkoFavicon.png',
    shortcut: '/VladKuzmenkoFavicon.png',
    apple: '/VladKuzmenkoFavicon.png',
  },
  openGraph: {
    title: 'AI Automation Solutions | VladKuzmenko.com',
    description: 'Transform your business with AI-powered automation solutions that streamline operations, engage customers, and drive growth.',
    url: 'https://vladkuzmenko.com',
    siteName: 'VladKuzmenko.com',
    images: [
      {
        url: 'https://vladkuzmenko.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Automation Solutions by Vlad Kuzmenko'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Solutions | VladKuzmenko.com',
    description: 'Transform your business with AI-powered automation solutions that streamline operations, engage customers, and drive growth.',
    creator: '@VladKuzmenko',
    images: ['https://vladkuzmenko.com/twitter-card.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <head>
        {/* Если хотите дублировать <link> вручную, раскомментируйте: */}
        {/*
        <link rel="icon" href="/VladKuzmenkoFavicon.png" />
        <link rel="shortcut icon" href="/VladKuzmenkoFavicon.png" />
        <link rel="apple-touch-icon" href="/VladKuzmenkoFavicon.png" />
        */}
        {/* Google Translate setup (куки + скрытие UI) */}
        <Script id="gt-set-cookie" strategy="beforeInteractive">
          {`
            (function(){
              if (!document.cookie.includes('googtrans=')) {
                var lang = (navigator.language||'en').split('-')[0];
                document.cookie = 'googtrans=/en/'+lang+';path=/';
                document.cookie = 'googtrans=/en/'+lang+';path=/;domain=' + location.hostname;
              }
            })()
          `}
        </Script>
        <Script id="gt-init" strategy="beforeInteractive">
          {`
            function googleTranslateElementInit(){
              new google.translate.TranslateElement({pageLanguage:'en',autoDisplay:true},'google_translate_element');
            }
          `}
        </Script>
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <style>{`
          .goog-te-banner-frame, .goog-te-menu-frame,
          #google_translate_element, .goog-logo-link, .goog-te-gadget,
          .goog-te-gadget-icon, .goog-te-combo { display:none !important; }
          body { top:0 !important; }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <div id="google_translate_element" />
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
        <VoiceflowScript />
        <TranslateSwitcher />
      </body>
    </html>
  )
}
