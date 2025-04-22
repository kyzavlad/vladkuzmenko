import './globals.css';
import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import Script from 'next/script'; // добавлено для подключения внешнего скрипта

const description = "Transform your business with AI-powered automation solutions for customer support, email marketing, and content creation. Our enterprise-grade AI platform helps you engage customers, streamline operations, and drive growth without complexity.";

const keywords = "AI automation, business automation, customer support AI, email marketing automation, content generation AI, enterprise AI solutions, workflow automation, AI chatbots, voice AI, business intelligence";

const siteUrl = "https://vladkuzmenko.com";

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description,
  keywords,
  metadataBase: new URL(siteUrl),
  icons: {
    icon: '/crown.png',
    shortcut: '/crown.png',
    apple: '/crown.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'AI Automation Solutions | VladKuzmenko.com',
    description,
    url: siteUrl,
    siteName: 'VladKuzmenko.com',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
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
    description,
    creator: '@vladkuzmenkoai',
    images: [`${siteUrl}/og-image.jpg`],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="font-sans">
      <body suppressHydrationWarning>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>

        {/* Voiceflow Chatbot Script */}
        <Script id="voiceflow-chat" strategy="afterInteractive">
          {`
            (function(d, t) {
              var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
              v.onload = function() {
                window.voiceflow.chat.load({
                  verify: { projectID: '6807a37af5b859583df1dd36' },
                  url: 'https://general-runtime.voiceflow.com',
                  versionID: 'production',
                  voice: {
                    url: "https://runtime-api.voiceflow.com"
                  }
                });
              };
              v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
              v.type = "text/javascript";
              s.parentNode.insertBefore(v, s);
            })(document, 'script');
          `}
        </Script>
      </body>
    </html>
  );
}
