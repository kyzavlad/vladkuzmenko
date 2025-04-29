import './globals.css';
import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation solutions for customer support, email marketing, and content creation. Our enterprise-grade AI platform helps you engage customers, streamline operations, and drive growth without complexity.",
  keywords: [
    "AI automation", "business automation", "customer support AI", "email marketing automation",
    "content generation AI", "enterprise AI solutions", "workflow automation", "AI chatbots",
    "voice AI", "business intelligence"
  ],
  metadataBase: new URL('https://vladkuzmenko.com'),
  icons: {
    icon: '/crown.png',
    shortcut: '/crown.png',
    apple: '/crown.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'AI Automation Solutions | VladKuzmenko.com',
    description: "Transform your business with AI-powered automation solutions for customer support, email marketing, and content creation.",
    url: 'https://vladkuzmenko.com',
    siteName: 'VladKuzmenko.com',
    images: [
      {
        url: 'https://vladkuzmenko.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VladKuzmenko.com AI Automation Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Solutions | VladKuzmenko.com',
    description: "Transform your business with AI-powered automation solutions for customer support, email marketing, and content creation.",
    creator: '@vladkuzmenkoai',
    images: ['https://vladkuzmenko.com/og-image.jpg'],
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
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    bing: 'your-bing-verification-code',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <body suppressHydrationWarning>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
        <VoiceflowScript />
      </body>
    </html>
  );
}

// Встроенный клиентский компонент для Voiceflow
'use client';

import { useEffect } from 'react';

function VoiceflowScript() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    script.type = "text/javascript";
    script.async = true;
    script.onload = () => {
      if (window.voiceflow && window.voiceflow.chat) {
        window.voiceflow.chat.load({
          verify: { projectID: '6807c446ff2e1848c8bfe41a' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production',
          voice: {
            url: "https://runtime-api.voiceflow.com"
          }
        });
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
