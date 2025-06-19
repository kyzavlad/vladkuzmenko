// app/page.tsx

// 1. Импортируем все нужные компоненты, включая новые
import { Header } from "@/components/ui/header";
import { HeroSection } from "@/components/HeroSection"; // Ты его переделаешь под себя
import { PersonalBrandSection } from "@/components/PersonalBrandSection"; // Новый
import { EducationPlatformSection } from "@/components/EducationPlatformSection"; // Новый
import { AutomationTeaserSection } from "@/components/AutomationTeaserSection"; // Новый
import { SaasLaunchSection } from "@/components/SaasLaunchSection";
import { MensCommunitySection } from "@/components/MensCommunitySection";
import { TestimonialsSection } from "@/components/TestimonialsSection"; // Оставим для соц. доказательств
import { FooterSection } from "@/components/FooterSection";
// Убираем импорты, которые больше не нужны на главной: AppsSection, MapSection, и т.д.


export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Блок 1: Твоя проекция силы. Переделай этот компонент, как мы обсуждали */}
      <HeroSection />

      {/* Блок 2: О тебе и твоей философии */}
      <PersonalBrandSection />
      
      {/* Блок 3: Тизер образовательной платформы */}
      <EducationPlatformSection />

      {/* Блок 4: Отзывы как социальное доказательство твоего авторитета */}
      <TestimonialsSection />

      {/* Блок 5: Тизер твоего агентства, ведущий на отдельную страницу */}
      <AutomationTeaserSection />

      {/* Блок 6: Тизер твоего SaaS */}
      <SaasLaunchSection />

      {/* Блок 7: Тизер твоего сообщества */}
      <MensCommunitySection />
      
      <FooterSection />
    </main>
  );
}
