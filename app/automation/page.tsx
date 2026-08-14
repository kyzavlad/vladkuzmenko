import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/HeroSection";
import { PricingSection } from "@/components/PricingSection";
import { FooterSection } from "@/components/FooterSection";
import { pageMeta } from "@/lib/page-meta";

// Shares the helper with /ua/automation and /ru/automation so the three locales
// declare matching hreflang alternates and localized share cards.
export const metadata = pageMeta(
  "en",
  "automation",
  "AI Automation & Web Systems | Vlad Kuzmenko",
  "AI automation, websites and MVPs, chatbots and voice assistants, content systems and lead generation — built for real business growth. Book a call or request a system audit.",
);

// Lean, honest services & pricing page. Fake-stat / fake-testimonial / fake-SaaS
// sections were removed; the real lead form (HeroSection + PricingSection both
// open the n8n-backed form) and Cal.com booking are preserved.
export default function AutomationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PricingSection />
      <FooterSection />
    </main>
  );
}
