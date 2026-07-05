import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { Sword, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Battles & Campaigns",
  description: "All major battles and campaigns fought by the Indian Armed Forces since independence.",
};

const BATTLES_DATA = [
  {
    title: "Indo-Pakistani War of 1947",
    description: "The first major conflict following Partition. Indian soldiers were airlifted to Srinagar, launch counter-offensives, and saved Kashmir from tribal militia invasion.",
    icon: "🪖",
    year: "1947",
    color: "#FF9933",
    duration: "October 1947 – January 1949",
    theater: "Jammu & Kashmir Valley",
    link: "/timeline",
  },
  {
    title: "Sino-Indian War of 1962",
    description: "China's surprise border offensive in the Himalayas. Outnumbered and outgunned Indian forces fought with legendary bravery, notably at Rezang La in Ladakh.",
    icon: "⚔️",
    year: "1962",
    color: "#FF6B6B",
    duration: "October – November 1962",
    theater: "NEFA border & Ladakh",
    link: "/timeline",
  },
  {
    title: "Indo-Pakistani War of 1965",
    description: "Repulsed Pakistan's Operation Gibraltar infiltration in Kashmir. Features the Battle of Chawinda, one of the largest tank battles since World War II.",
    icon: "🛡️",
    year: "1965",
    color: "#C49F47",
    duration: "August – September 1965",
    theater: "Punjab plains & Kashmir borders",
    link: "/timeline",
  },
  {
    title: "Liberation War of 1971",
    description: "India's finest military hour. Over 93,000 Pakistani soldiers surrendered in a swift 13-day campaign on two fronts. Bangladesh was liberated.",
    icon: "🏆",
    year: "1971",
    color: "#138808",
    duration: "December 3–16, 1971",
    theater: "Eastern & Western Fronts",
    link: "/timeline",
  },
  {
    title: "Operation Meghdoot",
    description: "A pre-emptive heliborne military operation. Indian Army successfully secured the entire Siachen Glacier in Ladakh, the highest battlefield on earth.",
    icon: "🏔️",
    year: "1984",
    color: "#5A753F",
    duration: "April 1984 – Ongoing",
    theater: "Siachen Glacier, Ladakh",
    link: "/timeline",
  },
  {
    title: "Kargil War of 1999",
    description: "Operation Vijay. Evicted Pakistani soldiers and irregulars from high-altitude mountain posts at 18,000+ feet in the Kargil-Dras sector.",
    icon: "🦁",
    year: "1999",
    color: "#FF9933",
    duration: "May – July 1999",
    theater: "Kargil & Ladakh Ranges",
    link: "/timeline",
  },
];

export default function BattlesPage() {
  return (
    <Providers>
      <Navbar />
      
      <main className="min-h-screen pt-28 pb-16 bg-[#070B04] relative overflow-hidden">
        {/* Background Dot pattern overlay */}
        <div className="absolute inset-0 bg-dot-olive opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] mb-4 text-[#C49F47]">
              <Sword className="w-4 h-4 text-[#C49F47]" />
              <span>India's Military Chronicles</span>
            </span>
            
            <h1 className="text-4xl lg:text-6xl font-serif font-black text-white mb-4 uppercase tracking-wider">
              Battles &{" "}
              <span className="text-tricolor-gradient drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Campaigns
              </span>
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C49F47]/50 to-transparent mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
              Each campaign stands as a chapter in India&apos;s contemporary history of defending its sovereignty. Click on any campaign to view details on the interactive operational map.
            </p>
          </div>

          {/* Battles Grid using HoverEffect */}
          <HoverEffect items={BATTLES_DATA} />

          {/* Operational map promo banner */}
          <div
            className="mt-12 rounded-2xl border border-[#324322]/50 p-8 bg-[#0E140B]/85 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-grid-white opacity-[0.01] pointer-events-none" />
            <div className="space-y-2 relative z-10 text-center md:text-left">
              <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2 justify-center md:justify-start">
                <Compass className="w-5 h-5 text-[#C49F47]" />
                <span>Explore Battle Coordinates Visually</span>
              </h2>
              <p className="text-xs text-gray-400 max-w-xl">
                Launch our interactive operational console. Trace lines of control, mountain heights, and strategic parameters across historical frontiers.
              </p>
            </div>
            <a
              href="/timeline"
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#324322] border border-[#C49F47]/40 text-[#C49F47] hover:bg-[#C49F47]/10 hover:border-[#C49F47] transition-all relative z-10 whitespace-nowrap shadow-md"
            >
              Open Console Dashboard
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </Providers>
  );
}
