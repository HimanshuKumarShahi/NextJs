"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Star, Shield, Heart } from "lucide-react";
import AuroraBackground from "@/components/ui/aurora-background";
import TextGenerateEffect from "@/components/ui/text-generate-effect";

const HONORS = [
  { label: "Param Vir Chakra", count: "21", icon: "🎖️" },
  { label: "Martyred Heroes", count: "24,000+", icon: "🪖" },
  { label: "Wars Documented", count: "6+", icon: "⚔️" },
  { label: "Victory Rate", count: "100%", icon: "🏆" },
];

export default function HeroSection() {
  return (
    <AuroraBackground className="min-h-screen relative flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Background Dot pattern overlay */}
      <div className="absolute inset-0 bg-dot-olive opacity-30 pointer-events-none" />

      {/* Futuristic Grid Line */}
      <div className="absolute inset-0 bg-grid-white opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        {/* Top Badge with Border Glow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0E140B]/90 border border-[#324322] rounded-full shadow-[0_0_20px_rgba(50,67,34,0.3)] mb-8"
        >
          <Shield className="w-3.5 h-3.5 text-[#C49F47]" />
          <span className="text-[10px] font-bold text-[#C49F47] uppercase tracking-[0.3em] font-mono">
            Jai Hind • Vande Mataram
          </span>
          <Shield className="w-3.5 h-3.5 text-[#C49F47]" />
        </motion.div>

        {/* Main Header with text glow */}
        <div className="space-y-4 max-w-4xl mx-auto mb-6">
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-black uppercase tracking-wider leading-none"
          >
            <span className="block text-white mb-2">Heroes of</span>
            <span className="block text-tricolor-gradient drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]">
              Mother India
            </span>
          </motion.h1>

          <TextGenerateEffect
            words="A living digital tribute to the valiant soldiers of the Indian Armed Forces. Explore the history, battles, and stories of unmatched bravery and supreme sacrifice."
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-400 font-medium leading-relaxed"
            delay={0.4}
          />
        </div>

        {/* Capt. Vikram Batra Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative max-w-lg mx-auto p-4 rounded-xl border border-[#324322]/50 bg-[#0E140B]/60 backdrop-blur-md mb-10 shadow-lg"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#FF9933]/10 border border-[#FF9933]/30 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#FF9933] font-mono">
            PVC Legend quote
          </div>
          <p className="text-xs sm:text-sm italic text-gray-300 leading-relaxed pt-2">
            &ldquo;If death strikes before I prove my blood, I swear I&apos;ll kill death.&rdquo;
          </p>
          <p className="text-[10px] text-[#C49F47] mt-1.5 font-bold uppercase tracking-wider font-mono">
            — Captain Vikram Batra, PVC (Posthumous)
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            href="/heroes"
            className="group relative flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF9933] via-[#C49F47] to-[#138808] text-white font-bold text-sm rounded-full shadow-[0_8px_30px_-5px_rgba(196,159,71,0.4)] hover:shadow-[0_8px_35px_rgba(196,159,71,0.6)] transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            <Heart className="w-4 h-4" />
            Meet Our Heroes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/timeline"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#0E140B]/80 border border-[#324322] text-white font-semibold text-sm rounded-full hover:border-[#C49F47]/40 hover:bg-[#324322]/20 transition-all duration-300 backdrop-blur-sm cursor-pointer shadow-md"
          >
            <Star className="w-4 h-4 text-[#C49F47]" />
            Interactive Timeline
          </Link>
        </motion.div>

        {/* Floating Honor Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full max-w-4xl mx-auto"
        >
          {HONORS.map((h, i) => (
            <div
              key={h.label}
              className="relative group p-6 rounded-2xl bg-[#0E140B]/80 border border-[#324322]/50 backdrop-blur-sm hover:border-[#C49F47]/30 hover:bg-[#324322]/25 transition-all duration-300 shadow-xl"
            >
              {/* Internal glowing line on card hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="text-3xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{h.icon}</div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-1 font-mono tracking-tight">{h.count}</div>
              <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{h.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative gradient overlay at bottom to transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#070B04] to-transparent pointer-events-none" />

      {/* Animated Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-gray-600 pointer-events-none"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#C49F47]">Scroll</span>
        <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#C49F47] to-transparent" />
      </motion.div>
    </AuroraBackground>
  );
}
