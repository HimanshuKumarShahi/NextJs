"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Shield, Heart } from "lucide-react";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2 + 1,
  duration: Math.random() * 4 + 3,
  delay: Math.random() * 4,
}));

const HONORS = [
  { label: "Param Vir Chakra", count: "21", icon: "🎖️" },
  { label: "Martyred Heroes", count: "24,000+", icon: "🪖" },
  { label: "Wars Fought", count: "6+", icon: "⚔️" },
  { label: "Victory Rate", count: "100%", icon: "🏆" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Deep background */}
      <div className="absolute inset-0 bg-[#060A04]" />

      {/* Radial glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#3E512B]/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-[#FF9933]/5 blur-[100px]" />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-[#138808]/5 blur-[100px]" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[#C49F47]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Tricolor top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#FF9933]" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-[#138808]" />
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center gap-2 px-5 py-2 bg-[#131A0F]/80 border border-[#3E512B]/60 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-[#C49F47]" />
            <span className="text-xs font-bold text-[#C49F47] uppercase tracking-[0.25em]">
              Jai Hind • Vande Mataram
            </span>
            <Shield className="w-4 h-4 text-[#C49F47]" />
          </div>
        </motion.div>

        {/* Main headline */}
        <div className="text-center space-y-6 mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight"
          >
            <span className="block text-white">Heroes of</span>
            <span className="block bg-gradient-to-r from-[#FF9933] via-[#C49F47] to-[#138808] bg-clip-text text-transparent">
              Mother India
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="max-w-2xl mx-auto text-base sm:text-lg text-gray-400 leading-relaxed"
          >
            A living tribute to the brave soldiers who gave their today so that we could have our tomorrow.
            Their sacrifice shall never be forgotten.
          </motion.p>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-center mb-12"
        >
          <blockquote className="text-sm sm:text-base italic text-gray-500">
            &ldquo;If death strikes before I prove my blood, I swear I&apos;ll kill death.&rdquo;
          </blockquote>
          <p className="text-xs text-[#C49F47] mt-1 font-medium">— Captain Vikram Batra, PVC</p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20"
        >
          <Link
            href="/heroes"
            className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#FF9933] via-[#C49F47] to-[#138808] text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(196,159,71,0.4)] transition-all duration-300 hover:scale-105"
          >
            <Heart className="w-4 h-4" />
            Meet Our Heroes
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/timeline"
            className="flex items-center gap-2 px-8 py-3.5 bg-[#131A0F]/80 border border-[#3E512B]/60 text-white font-semibold rounded-xl hover:border-[#C49F47]/40 hover:bg-[#3E512B]/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Star className="w-4 h-4 text-[#C49F47]" />
            Explore Timeline
          </Link>
        </motion.div>

        {/* Honor stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {HONORS.map((h) => (
            <div
              key={h.label}
              className="relative group text-center p-6 bg-[#131A0F]/60 border border-[#3E512B]/40 rounded-2xl backdrop-blur-sm hover:border-[#C49F47]/30 hover:bg-[#3E512B]/20 transition-all duration-400"
            >
              <div className="text-3xl mb-2">{h.icon}</div>
              <div className="text-2xl sm:text-3xl font-black text-white mb-1">{h.count}</div>
              <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">{h.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B1006] to-transparent" />

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#3E512B] to-transparent" />
      </motion.div>
    </section>
  );
}
