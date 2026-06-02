import { HeroSection } from "@/components/sections/HeroSection";
import { IntroSection } from "@/components/sections/IntroSection";
import { TechSection } from "@/components/sections/TechSection";
import { StickyFeaturesSection } from "@/components/sections/StickyFeaturesSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { EvidenceSection } from "@/components/sections/EvidenceSection";
import { CTASection } from "@/components/sections/CTASection";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling using lenis or native if needed. Native CSS smooth scroll is fine for now
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <main className="w-full bg-background text-foreground antialiased selection:bg-accent selection:text-background">
      <HeroSection />
      <IntroSection />
      <TechSection />
      <StickyFeaturesSection />
      <GallerySection />
      <EvidenceSection />
      <CTASection />
    </main>
  );
}
