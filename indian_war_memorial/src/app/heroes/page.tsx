"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Shield, Medal, Calendar, Award, Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PLACEHOLDER_HEROES = [
  {
    id: "vikram-batra",
    name: "Captain Vikram Batra",
    rank: "Captain",
    regiment: "13 JAK Rifles",
    war: "Kargil War 1999",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Yeh Dil Maange More!",
    martyred: "July 7, 1999",
    age: 24,
    emoji: "🦁",
    color: "#FF9933",
  },
  {
    id: "shaitan-singh",
    name: "Major Shaitan Singh",
    rank: "Major",
    regiment: "13 Kumaon Regiment",
    war: "Sino-Indian War 1962",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Fight to the last man, last round.",
    martyred: "November 18, 1962",
    age: 34,
    emoji: "⚔️",
    color: "#FF6B6B",
  },
  {
    id: "arun-khetarpal",
    name: "Second Lieutenant Arun Khetarpal",
    rank: "Second Lieutenant",
    regiment: "17 Horse (Poona Horse)",
    war: "Indo-Pakistani War 1971",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "My tank is still okay. I will not abandon my tank.",
    martyred: "December 16, 1971",
    age: 21,
    emoji: "🛡️",
    color: "#138808",
  },
  {
    id: "albert-ekka",
    name: "Lance Naik Albert Ekka",
    rank: "Lance Naik",
    regiment: "14 Guards",
    war: "Indo-Pakistani War 1971",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Duty unto death.",
    martyred: "December 3, 1971",
    age: 28,
    emoji: "🪖",
    color: "#138808",
  },
  {
    id: "manoj-pandey",
    name: "Lieutenant Manoj Kumar Pandey",
    rank: "Lieutenant",
    regiment: "1/11 Gorkha Rifles",
    war: "Kargil War 1999",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Na Chhodnu (I will not leave them).",
    martyred: "July 3, 1999",
    age: 24,
    emoji: "🏔️",
    color: "#FF9933",
  },
  {
    id: "yogendra-singh-yadav",
    name: "Grenadier Yogendra Singh Yadav",
    rank: "Grenadier",
    regiment: "18 Grenadiers",
    war: "Kargil War 1999",
    medals: ["Param Vir Chakra"],
    quote: "One man can make a difference.",
    martyred: "Survived — Living Legend",
    age: 19,
    emoji: "🌟",
    color: "#FF9933",
  },
];

const WARS_FILTER = ["All", "Kargil War 1999", "Sino-Indian War 1962", "Indo-Pakistani War 1971"];

export default function HeroesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredHeroes = PLACEHOLDER_HEROES.filter((hero) => {
    const matchesSearch = hero.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          hero.regiment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          hero.rank.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || hero.war === activeFilter;
    return matchesSearch && matchesFilter;
  });

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
              <Sparkles className="w-3.5 h-3.5" />
              <span>Amar Jawan Chronicles</span>
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-black text-white mb-4 uppercase tracking-wider">
              Our Brave{" "}
              <span className="text-tricolor-gradient drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Heroes
              </span>
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C49F47]/50 to-transparent mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
              They chose the honor of the motherland over life itself. Here are the profiles of the military legends awarded the highest gallantry medals for extreme courage in battle.
            </p>
          </div>

          {/* Stats Bar */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 p-6.5 rounded-2xl border border-[#324322]/50 bg-[#0E140B]/85 backdrop-blur-sm shadow-xl"
          >
            {[
              { label: "Param Vir Chakras", value: "21", icon: <Medal className="w-4.5 h-4.5 text-orange-500" /> },
              { label: "Maha Vir Chakras", value: "215+", icon: <Award className="w-4.5 h-4.5 text-slate-300" /> },
              { label: "Vir Chakras", value: "1,320+", icon: <Award className="w-4.5 h-4.5 text-emerald-500" /> },
              { label: "Documented Wars", value: "6+", icon: <Shield className="w-4.5 h-4.5 text-[#C49F47]" /> },
            ].map((s, idx) => (
              <div key={idx} className="text-center space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-0.5">
                  {s.icon}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{s.label}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono">{s.value}</div>
              </div>
            ))}
          </div>

          {/* Search and Filters console */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 border-b border-[#324322]/40 pb-6">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#455F2F]" />
              <input
                type="text"
                placeholder="Search by name, regiment, rank..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs font-semibold bg-[#0E140B] border border-[#324322] text-[#D4C5A0] placeholder-gray-500 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-300"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              {WARS_FILTER.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeFilter === filter
                      ? "bg-[#324322] border border-[#C49F47]/60 text-white shadow-md shadow-[#324322]/30"
                      : "bg-[#0E140B] border border-[#324322]/40 text-gray-400 hover:text-white hover:border-[#324322]"
                  }`}
                >
                  {filter.split(" 19")[0]} {/* simplify for capsule */}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredHeroes.map((hero) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={hero.id}
                  className="group relative rounded-2xl border border-[#324322]/60 overflow-hidden bg-[#0E140B] hover:border-[#C49F47]/40 hover:shadow-[0_12px_30px_rgba(196,159,71,0.1)] transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top color accent strip */}
                    <div className="h-1 w-full" style={{ backgroundColor: hero.color }} />

                    {/* Emoji Header Box */}
                    <div className="h-44 relative bg-gradient-to-b from-[#0E140B] to-[#070B04] border-b border-[#324322]/20 flex items-center justify-center text-6xl group-hover:scale-[1.02] transition-transform duration-300">
                      <span className="relative z-10">{hero.emoji}</span>
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(69,95,47,0.1)_0%,_transparent_60%)] pointer-events-none" />
                    </div>

                    <div className="p-6 space-y-4">
                      {/* War Badge */}
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-500 border border-orange-500/15">
                        <Calendar className="w-3 h-3" />
                        <span>{hero.war}</span>
                      </span>

                      {/* Info header */}
                      <div>
                        <h2 className="text-lg font-bold text-white group-hover:text-[#C49F47] transition-colors">{hero.name}</h2>
                        <p className="text-xs text-gray-400 mt-1">
                          {hero.rank} • <span className="font-semibold text-gray-300">{hero.regiment}</span>
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5 font-medium uppercase font-mono">
                          Martyred: {hero.martyred} {hero.age > 0 && `• Age ${hero.age}`}
                        </p>
                      </div>

                      {/* Quote */}
                      <blockquote className="text-xs italic border-l-2 border-[#C49F47] pl-3 text-gray-400 py-0.5 leading-relaxed">
                        &ldquo;{hero.quote}&rdquo;
                      </blockquote>
                    </div>
                  </div>

                  {/* Medals footer */}
                  <div className="p-6 pt-0 mt-2 border-t border-[#324322]/25 pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {hero.medals.map((medal) => (
                        <span
                          key={medal}
                          className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C49F47]/10 text-[#C49F47] border border-[#C49F47]/20 font-bold uppercase tracking-wide font-mono"
                        >
                          🎖️ {medal}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty Results state */}
          {filteredHeroes.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 border border-dashed border-[#324322]/60 rounded-2xl bg-[#0E140B]/30"
            >
              <Shield className="w-10 h-10 text-[#455F2F] mx-auto mb-3" />
              <h3 className="text-base font-bold text-white mb-1">No heroes match query</h3>
              <p className="text-xs text-gray-500">Check spelling or select a different filter category.</p>
            </motion.div>
          )}

          {/* Recruits section info */}
          <div
            className="mt-12 text-center p-6.5 rounded-2xl border border-[#324322]/50 bg-[#0E140B]/60"
          >
            <p className="text-xs text-gray-500">
              Profiles are researched and added regularly by portal administrators. Jai Hind!
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </Providers>
  );
}
