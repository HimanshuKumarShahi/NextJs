import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Shield, Target, Heart, Globe, Terminal, Cpu, Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About the Indian War Memorial project — a free digital tribute to the heroes of India.",
};

const MISSION_ITEMS = [
  {
    title: "Our Mission",
    description: "To archive and document the individual stories of every Indian soldier who laid down their lives in service of the nation, ensuring their legacy remains etched in history forever.",
    icon: <Shield className="w-5 h-5" />,
    badge: "Legacy",
    badgeColor: "soldier-accent",
    className: "md:col-span-2",
  },
  {
    title: "100% Free & Open",
    description: "This project is built as a non-commercial public service. It will always remain entirely free of ads, sponsorships, and paywalls for students, researchers, and citizens.",
    icon: <Heart className="w-5 h-5 text-red-400" />,
    badge: "Public Service",
    badgeColor: "saffron",
    className: "md:col-span-1",
  },
  {
    title: "Verified Historical Accounts",
    description: "We source our data directly from official war records, regiments, government rolls, and verified historical archives to maintain strict accuracy and absolute factual integrity.",
    icon: <Target className="w-5 h-5" />,
    badge: "Factual",
    badgeColor: "soldier-accent",
    className: "md:col-span-1",
  },
  {
    title: "Global Educational Reach",
    description: "Empowering schools, institutions, and citizens worldwide to access comprehensive military logs, maps, and biographies to study India's contemporary war history.",
    icon: <Globe className="w-5 h-5" />,
    badge: "Education",
    badgeColor: "green",
    className: "md:col-span-2",
  },
];

export default function AboutPage() {
  return (
    <Providers>
      <Navbar />
      
      <main className="min-h-screen pt-28 pb-16 bg-[#070B04] relative overflow-hidden">
        {/* Background Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-olive opacity-30 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-3xl shadow-xl relative"
              style={{ background: "linear-gradient(135deg, #FF9933, #C49F47, #138808)" }}
            >
              <div className="absolute inset-0 rounded-full bg-[#C49F47] blur-md opacity-30" />
              <span className="relative z-10">🇮🇳</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-serif font-black text-white mb-4 uppercase tracking-wider">
              About The{" "}
              <span className="text-tricolor-gradient drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Memorial
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400 leading-relaxed">
              The Indian War Memorial is an independent, community-driven digital archive. We build modern interactive products to honor the valour of our soldiers and preserve military records.
            </p>
          </div>

          {/* Bento Grid layout */}
          <BentoGrid className="max-w-5xl">
            {MISSION_ITEMS.map((item, i) => (
              <BentoGridItem
                key={i}
                title={item.title}
                description={item.description}
                icon={item.icon}
                badge={item.badge}
                badgeColor={item.badgeColor}
                className={item.className}
              />
            ))}
          </BentoGrid>

          {/* Technology stack card */}
          <div
            className="max-w-5xl mx-auto p-8 rounded-2xl border border-[#324322]/50 bg-[#0E140B]/80 backdrop-blur-sm relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#455F2F]/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center gap-3 justify-center mb-6">
              <Cpu className="w-5 h-5 text-[#C49F47]" />
              <h2 className="text-xl font-serif font-bold text-white tracking-wide uppercase">Memorial Tech Stack</h2>
            </div>
            
            <p className="text-xs text-gray-400 text-center max-w-xl mx-auto mb-8 leading-relaxed">
              Engineered with modern fullstack primitives to deliver a smooth, high-fidelity responsive dashboard that handles high traffic and loads instantly.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Next.js 16", desc: "Framework" },
                { name: "MongoDB", desc: "Database" },
                { name: "Tailwind CSS v4", desc: "Styling" },
                { name: "Framer Motion", desc: "Animations" },
                { name: "NextAuth.js", desc: "Auth" },
                { name: "Cloudinary", desc: "Media CDN" },
                { name: "TypeScript", desc: "Type Safety" },
              ].map((tech) => (
                <div
                  key={tech.name}
                  className="px-4 py-2.5 rounded-xl bg-[#070B04] border border-[#324322]/40 text-center flex flex-col justify-center min-w-[120px] hover:border-[#C49F47]/40 transition-colors"
                >
                  <span className="text-xs font-bold text-[#C49F47]">{tech.name}</span>
                  <span className="text-[9px] text-gray-500 font-medium uppercase mt-0.5">{tech.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Patriotic Creed footer */}
          <div className="text-center space-y-2 pt-6">
            <div className="h-[2px] w-24 bg-gradient-to-r from-[#FF9933] via-[#F2F4F0] to-[#138808] mx-auto mb-4" />
            <p className="text-xs font-mono font-bold tracking-[0.25em] text-[#C49F47] uppercase">
              Vande Mataram • Shaheedon Ki Chitaon Par Lagenge Har Baras Mele
            </p>
            <p className="text-[10px] text-gray-600 font-mono">
              Jai Hind 🇮🇳 · Vande Mataram · Jai Jawan, Jai Kisan, Jai Vigyan
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </Providers>
  );
}
