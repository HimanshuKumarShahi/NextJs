import HeroSection from "@/components/HeroScetion";
import Courses from "@/components/Courses";
import ContactPage from "@/components/Contact";
import StickyRoller from  "@/components/Sticky"

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      
      <HeroSection />
      <Courses />
      <StickyRoller />
      <ContactPage />
    </main>
  );
}