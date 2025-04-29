import './globals.css';
import type { Metadata } from 'next';
import { ThemeProviderWrapper } from '@/components/theme-provider-wrapper';
import { VoiceflowScript } from '@/components/voiceflow-script'; // новый компонент

export const metadata: Metadata = {
  title: 'AI Automation Solutions | VladKuzmenko.com',
  description: "Transform your business with AI-powered automation solutions...",
  // дальше как у тебя было, всё нормально
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
