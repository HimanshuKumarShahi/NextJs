import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import HeroSection from "@/components/HeroSection";
import HistoricalTimeline from "@/components/HistoricalTimeline";
import IndiaMap from "@/components/IndiaMap";

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1">
        <HeroSection />

        {/* Interactive India Map Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ background: "#0D1509" }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C49F47" }}>
                Battlegrounds of India
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-white mb-3">
                Where Heroes{" "}
                <span style={{
                  background: "linear-gradient(to right, #FF9933, #C49F47, #138808)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
                  Fought
                </span>
              </h2>
              <p className="max-w-xl mx-auto text-sm" style={{ color: "#9CA3AF" }}>
                Click on a glowing battle location to learn more about the historic conflict.
              </p>
            </div>
            <IndiaMap />
          </div>
        </section>

        <HistoricalTimeline />
      </main>
      <Footer />
    </Providers>
  );
}
