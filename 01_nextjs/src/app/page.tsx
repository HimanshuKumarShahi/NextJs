import HeroSection from "@/components/HeroScetion";
import Courses from "@/components/Courses"

export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
      <HeroSection />
      <Courses />
    </main>
  );
}
