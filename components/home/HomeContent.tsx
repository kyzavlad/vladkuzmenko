import { Header } from "@/components/ui/header";
import { Hero } from "@/components/home/Hero";
import { EcosystemNavigator } from "@/components/home/EcosystemNavigator";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { ProductsOverview } from "@/components/home/ProductsOverview";
import { WarriorsSection } from "@/components/home/WarriorsSection";
import { DropSection } from "@/components/home/DropSection";
import { PersonalBrand } from "@/components/home/PersonalBrand";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FooterSection } from "@/components/FooterSection";

export function HomeContent() {
  return (
    <>
      <Header />
      <Hero />
      <EcosystemNavigator />
      <GrowthSystems />
      <ProductsOverview />
      <WarriorsSection />
      <DropSection />
      <PersonalBrand />
      <AboutSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
