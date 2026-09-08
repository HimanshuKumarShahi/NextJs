"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Flame,
  Sparkles,
  ShieldCheck,
  Zap,
  TrendingUp,
  Star,
  CheckCircle2,
} from "lucide-react";
import ShoeCard from "@/components/ui/ShoeCard";
import { MOCK_SHOES } from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const heroShoe = MOCK_SHOES[0]; // Air Jordan 1 Retro High OG
  const trendingShoes = MOCK_SHOES.filter((s) => s.isFeatured).slice(0, 4);
  const newArrivals = MOCK_SHOES.filter((s) => s.isNew).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 pb-20 overflow-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Background glow orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-orange-500/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Col */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 fill-orange-400" />
              <span>THE 2024 DROP CALENDAR IS LIVE</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white uppercase leading-[1.05]">
              STEP INTO <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500">
                THE GRAIL VAULT
              </span>
            </h1>

            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore authentic Air Jordans, classic Nike Dunks, iconic Sambas, and championship running silhouettes. Guaranteed 100% genuine with swift global shipping.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shoes"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                <span>Shop All Kicks</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/shoes?sort=newest"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all hover:border-zinc-500"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>Hot Releases</span>
              </Link>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-zinc-800/80 max-w-md mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">50K+</p>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider">Pairs Sold</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider">Authentic</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-white">4.9★</p>
                <p className="text-[11px] text-zinc-400 uppercase tracking-wider">App Rating</p>
              </div>
            </div>
          </div>

          {/* Right Hero Showcase Card */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative rounded-3xl bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 p-6 border border-zinc-800 shadow-2xl shadow-orange-500/10 group">
              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-amber-500 text-black font-black text-xs px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
                <Zap className="w-3.5 h-3.5 fill-black" />
                <span>TRENDING #1</span>
              </div>

              {/* Big shoe display */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-950/80 flex items-center justify-center p-6">
                <Image
                  src={heroShoe.images[0]}
                  alt={heroShoe.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>

              {/* Shoe Info Bar */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-400 uppercase tracking-widest">
                    {heroShoe.brand}
                  </span>
                  <div className="flex items-center gap-1 text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{heroShoe.rating} (342 reviews)</span>
                  </div>
                </div>

                <Link href={`/shoes/${heroShoe.slug}`}>
                  <h2 className="text-xl font-black text-white hover:text-orange-400 transition-colors line-clamp-1">
                    {heroShoe.name}
                  </h2>
                </Link>

                <p className="text-xs text-zinc-400 line-clamp-2">
                  {heroShoe.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <span className="text-xs text-zinc-400 block">Retail Price</span>
                    <span className="text-2xl font-black text-white">
                      {formatPrice(heroShoe.price)}
                    </span>
                  </div>

                  <Link
                    href={`/shoes/${heroShoe.slug}`}
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>View Grail</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR BRANDS BAR */}
      <section className="border-y border-zinc-900 bg-zinc-900/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-bold text-zinc-400 uppercase tracking-widest mb-6">
            Explore Verified Brands
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { name: "Jordan", count: "18 Models", query: "Jordan" },
              { name: "Nike", count: "42 Models", query: "Nike" },
              { name: "Adidas", count: "29 Models", query: "Adidas" },
              { name: "New Balance", count: "16 Models", query: "New+Balance" },
              { name: "Puma", count: "12 Models", query: "Puma" },
              { name: "All Kicks", count: "100+ Pairs", query: "All" },
            ].map((b) => (
              <Link
                key={b.name}
                href={b.query === "All" ? "/shoes" : `/shoes?brand=${b.query}`}
                className="bg-zinc-900/60 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-orange-500/40 p-4 rounded-2xl text-center group transition-all"
              >
                <p className="font-extrabold text-sm text-white group-hover:text-orange-400 transition-colors uppercase">
                  {b.name}
                </p>
                <p className="text-[11px] text-zinc-400 mt-0.5">{b.count}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRENDING DROPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
              <TrendingUp className="w-4 h-4" />
              <span>HYPE RADAR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Trending Drops & Grails
            </h2>
          </div>
          <Link
            href="/shoes"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 uppercase tracking-wider transition-colors"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingShoes.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      </section>

      {/* 4. PROMO / BANNER HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 sm:p-12 text-black flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-orange-600/20">
          <div className="space-y-4 max-w-xl text-center md:text-left">
            <span className="bg-black text-orange-400 text-xs font-black uppercase px-3 py-1 rounded-full inline-block">
              LIMITED TIME OFFER
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black leading-tight">
              GET 15% OFF YOUR FIRST GRAIL DROP
            </h2>
            <p className="text-sm font-medium text-black/80">
              Apply code <span className="font-black underline">SNEAKER15</span> during checkout. Includes free insured express shipping on all eligible footwear.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/shoes"
              className="px-8 py-4 rounded-2xl bg-black hover:bg-zinc-900 text-white font-extrabold text-xs uppercase tracking-wider transition-all shadow-xl text-center"
            >
              Shop With Discount
            </Link>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-orange-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>JUST LANDED</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              Fresh Releases & Colorways
            </h2>
          </div>
          <Link
            href="/shoes?sort=newest"
            className="text-xs font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 uppercase tracking-wider transition-colors"
          >
            <span>View All Releases</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((shoe) => (
            <ShoeCard key={shoe.id} shoe={shoe} />
          ))}
        </div>
      </section>

      {/* 6. AUTHENTICITY & TRUST STATEMENT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-8 sm:p-12">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              ZERO TOLERANCE FOR REPLICAS
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Every single pair undergoes strict multi-point physical verification: UV light inspection, stitching count, box label verification, and insole typography scrutiny before being boxed and dispatched to you.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4 text-xs font-semibold text-zinc-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> UV Light Tested
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> RFID Serial Logged
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Money-Back Guarantee
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
