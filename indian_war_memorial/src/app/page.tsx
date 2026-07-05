"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import HeroSection from "@/components/HeroSection";
import HistoricalTimeline from "@/components/HistoricalTimeline";
import IndiaMap from "@/components/IndiaMap";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { motion } from "framer-motion";
import { Flame, Compass, ChevronRight } from "lucide-react";
import Link from "next/link";

const AWARDS = [
  {
    title: "PARAM VIR CHAKRA",
    description: "India's highest military decoration, awarded for displaying the most conspicuous bravery or some daring or pre-eminent act of valour or self-sacrifice, in the presence of the enemy.",
    icon: "🎖️",
    year: " wartime supreme",
    color: "#FF9933",
    duration: "21 Awardees to Date",
    theater: "Ultimate Valor",
  },
  {
    title: "MAHA VIR CHAKRA",
    description: "Awarded for acts of conspicuous gallantry in the presence of the enemy, whether on land, at sea or in the air. It stands second in precedence.",
    icon: "🎖️",
    year: " wartime second",
    color: "#FFFFFF",
    duration: "215+ Awardees to Date",
    theater: "Gallantry in Battle",
  },
  {
    title: "VIR CHAKRA",
    description: "Presented for acts of gallantry in the presence of the enemy, standing third in precedence in wartime gallantry decorations.",
    icon: "🎖️",
    year: " wartime third",
    color: "#138808",
    duration: "1,320+ Awardees to Date",
    theater: "Courage in Combat",
  },
];

export default function Home() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1 overflow-x-hidden bg-[#070B04]">
        
        {/* Main Hero Showcase */}
        <HeroSection />

        {/* The Soldier's Oath Section */}
        <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#070B04] to-[#0E140B] overflow-hidden border-t border-[#324322]/20">
          <div className="absolute inset-0 bg-dot-olive opacity-20 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#455F2F]/5 blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/5 text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-6 font-mono">
              <Flame className="w-3.5 h-3.5 animate-pulse" />
              <span>The Creed</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white mb-8 tracking-wider uppercase">
              THE WARRIOR&apos;S OATH
            </h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative p-8 sm:p-12 rounded-3xl border border-[#324322]/60 bg-[#0E140B]/85 backdrop-blur-md shadow-2xl overflow-hidden"
            >
              {/* Internal decorative glows */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF9933]/5 rounded-full blur-xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#138808]/5 rounded-full blur-xl" />

              <div className="absolute top-4 left-6 text-7xl font-serif text-[#C49F47]/10 pointer-events-none select-none">&ldquo;</div>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-serif leading-relaxed italic relative z-10 px-4 sm:px-8">
                I will not retire, I will not surrender, I will not fail. I will fight to my last breath, with my last round, to defend the honor of my motherland. To my country, I pledge my loyalty, my courage, and my life.
              </p>
              <div className="absolute bottom-[-16px] right-8 text-7xl font-serif text-[#C49F47]/10 pointer-events-none select-none">&rdquo;</div>
              
              <div className="mt-8 pt-8 border-t border-[#324322]/40 flex flex-col items-center">
                <div className="h-[2px] w-24 bg-gradient-to-r from-[#FF9933] via-[#F2F4F0] to-[#138808] mb-4" />
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#C49F47] font-bold font-mono">The Creed of the Indian Armed Forces</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Interactive India Map Preview Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#0E140B] border-t border-[#324322]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white opacity-[0.015] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] mb-4 text-[#C49F47]">
                <Compass className="w-4 h-4 text-[#C49F47]" />
                <span>Battlegrounds of India</span>
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-black text-white mb-4 uppercase tracking-wider">
                Where Heroes{" "}
                <span className="text-tricolor-gradient drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                  Fought
                </span>
              </h2>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C49F47]/50 to-transparent mx-auto mb-6" />
              <p className="max-w-2xl mx-auto text-sm text-gray-400 leading-relaxed">
                Click on the glowing battle locations on our interactive map to learn more about the historic milestones and campaigns of the Indian Armed Forces.
              </p>
            </div>
            
            <div className="relative group">
              <IndiaMap />
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0E140B] via-[#0E140B]/80 to-transparent flex items-end justify-center pb-6">
                <Link
                  href="/timeline"
                  className="flex items-center gap-1 px-6 py-2.5 rounded-full bg-[#324322]/90 border border-[#C49F47]/40 text-xs font-bold uppercase tracking-wider text-[#C49F47] hover:bg-[#C49F47]/10 hover:border-[#C49F47] transition-all duration-300"
                >
                  <span>Launch Timeline Dashboard</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Unified Timeline Preview */}
        <section className="border-t border-[#324322]/20">
          <HistoricalTimeline />
        </section>

        {/* Gallantry Awards Section */}
        <section className="py-28 px-4 sm:px-6 lg:px-8 bg-[#070B04] border-t border-[#324322]/20 relative overflow-hidden">
          <div className="absolute inset-0 bg-dot-olive opacity-20 pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] mb-4 text-[#C49F47]">
                Supreme Recognition
              </span>
              <h2 className="text-4xl lg:text-5xl font-serif font-black text-white mb-4 uppercase tracking-wider">
                Gallantry Decorations
              </h2>
              <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C49F47]/50 to-transparent mx-auto mb-6" />
              <p className="max-w-xl mx-auto text-sm text-gray-400">
                Honoring the highest wartime military awards bestowed upon the bravest of the brave hearts of our nation.
              </p>
            </div>

            {/* Premium Card Hover Effect Grid */}
            <HoverEffect items={AWARDS} />
          </div>
        </section>
      </main>
      <Footer />
    </Providers>
  );
}
