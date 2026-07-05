import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Battles & Campaigns",
  description: "All major battles and campaigns fought by Indian Armed Forces.",
};

const BATTLES = [
  {
    id: "1947",
    title: "Indo-Pakistani War",
    year: "1947",
    description: "The first war after independence. Indian forces airlifted to Srinagar defended Kashmir from Pakistani tribesman invasion.",
    color: "#FF9933",
    icon: "🪖",
    duration: "October 1947 – January 1949",
    theater: "Jammu & Kashmir",
  },
  {
    id: "1962",
    title: "Sino-Indian War",
    year: "1962",
    description: "China's surprise offensive along the Himalayan border. Indian soldiers, though outnumbered, fought with legendary bravery.",
    color: "#FF6B6B",
    icon: "⚔️",
    duration: "October – November 1962",
    theater: "NEFA & Ladakh",
  },
  {
    id: "1965",
    title: "Indo-Pakistani War",
    year: "1965",
    description: "Operation Gibraltar repulsed. The Battle of Chawinda saw one of the largest tank battles since World War II.",
    color: "#C49F47",
    icon: "🛡️",
    duration: "August – September 1965",
    theater: "Punjab & Kashmir",
  },
  {
    id: "1971",
    title: "Liberation War",
    year: "1971",
    description: "India's finest military achievement. 93,000 Pakistani troops surrendered in just 13 days. Bangladesh was born.",
    color: "#138808",
    icon: "🏆",
    duration: "December 3–16, 1971",
    theater: "Eastern & Western Front",
  },
  {
    id: "siachen",
    title: "Operation Meghdoot",
    year: "1984",
    description: "India secured the Siachen Glacier — the world's highest battlefield — in a daring pre-emptive operation.",
    color: "#5A753F",
    icon: "🏔️",
    duration: "April 1984 – Ongoing",
    theater: "Siachen Glacier",
  },
  {
    id: "kargil",
    title: "Kargil War",
    year: "1999",
    description: "Operation Vijay. India recaptured every single peak infiltrated by Pakistan. A testament to unmatched valor.",
    color: "#FF9933",
    icon: "🦁",
    duration: "May – July 1999",
    theater: "Kargil, Ladakh",
  },
];

export default function BattlesPage() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ background: "#0B1006" }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C49F47" }}>
              India's Military History
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
              Battles &{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #FF9933, #C49F47, #138808)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Campaigns
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base" style={{ color: "#9CA3AF" }}>
              Every battle tells a story of courage. Every campaign is a chapter in India&apos;s glorious military history.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {BATTLES.map((battle) => (
              <a
                key={battle.id}
                href={`/battles/${battle.id}`}
                className="group relative rounded-2xl border overflow-hidden hover:-translate-y-1 transition-all duration-500"
                style={{ background: "#131A0F", borderColor: "rgba(62,81,43,0.4)" }}
              >
                <div className="h-1 w-full" style={{ background: battle.color }} />
                <div className="p-6">
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                    style={{ background: `${battle.color}20`, color: battle.color, border: `1px solid ${battle.color}40` }}
                  >
                    <span>{battle.icon}</span>
                    <span>{battle.year}</span>
                  </div>
                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-[#C49F47] transition-colors duration-300">
                    {battle.title}
                  </h2>
                  <p className="text-sm mb-4" style={{ color: "#9CA3AF", lineHeight: "1.6" }}>
                    {battle.description}
                  </p>
                  <div className="space-y-1 border-t pt-4" style={{ borderColor: "rgba(62,81,43,0.3)" }}>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
                      <span>📅</span>
                      <span>{battle.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
                      <span>📍</span>
                      <span>{battle.theater}</span>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </Providers>
  );
}
