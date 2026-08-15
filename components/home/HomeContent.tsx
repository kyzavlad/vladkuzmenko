import { Header } from "@/components/ui/header";
import { Hero } from "@/components/home/Hero";
import { GrowthSystems } from "@/components/home/GrowthSystems";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ProductsOverview } from "@/components/home/ProductsOverview";
import { WarriorsSection } from "@/components/home/WarriorsSection";
import { DropSection } from "@/components/home/DropSection";
import { PersonalBrand } from "@/components/home/PersonalBrand";
import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FooterSection } from "@/components/FooterSection";

/**
 * Homepage is refined section by section. The top now goes directly from the
 * visitor-facing hero into the business problem / Growth Systems section.
 * Lower sections remain untouched until their own review pass.
 */
export function HomeContent() {
  return (
    <>
      <Header />
      <Hero />
      <GrowthSystems />
      <SelectedWork />
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
