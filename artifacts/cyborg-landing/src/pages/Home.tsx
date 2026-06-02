import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { TechSection } from "@/components/sections/TechSection";
import { StickyFeaturesSection } from "@/components/sections/StickyFeaturesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { EvidenceSection } from "@/components/sections/EvidenceSection";
import { CTASection } from "@/components/sections/CTASection";

export default function Home() {
  return (
    <main className="w-full antialiased">
      <Navbar />
      <HeroSection />
      <IntroSection />
      <TechSection />
      <StickyFeaturesSection />
      <GallerySection />
      <EvidenceSection />
      <CTASection />
      <Footer />
    </main>
  );
}
