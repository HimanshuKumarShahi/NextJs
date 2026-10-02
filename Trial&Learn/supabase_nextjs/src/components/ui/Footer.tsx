"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Headphones,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 text-zinc-400 text-sm mt-auto">
      {/* Guarantees / Trust Badges Row */}
      <div className="border-b border-zinc-900/80 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                100% Authentic
              </p>
              <p className="text-[11px] text-zinc-400">Verified by our sneaker experts</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                Fast Shipping
              </p>
              <p className="text-[11px] text-zinc-400">Free delivery on orders over $150</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                30-Day Returns
              </p>
              <p className="text-[11px] text-zinc-400">Hassle-free exchanges & returns</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white uppercase tracking-wider">
                24/7 Support
              </p>
              <p className="text-[11px] text-zinc-400">Sneaker concierge team ready</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-black font-black text-lg">
                ⚡
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase">
                SNEAKERS<span className="text-orange-500">.</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-zinc-400 max-w-sm">
              The premier destination for authentic sneakers, grail retro releases, and cutting-edge streetwear footwear. Sourced directly, verified by specialists, delivered to your doorstep.
            </p>
            <div className="pt-2">
              <p className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Join the Sneaker Drop List
              </p>
              {subscribed ? (
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium bg-emerald-950/40 border border-emerald-800/40 p-2.5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You&apos;re on the list! Check your inbox for $20 off code.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 flex-1"
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Shop Collections
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/shoes" className="hover:text-orange-400 transition-colors">
                  All Sneakers
                </Link>
              </li>
              <li>
                <Link href="/shoes?brand=Jordan" className="hover:text-orange-400 transition-colors">
                  Air Jordan Retro
                </Link>
              </li>
              <li>
                <Link href="/shoes?brand=Nike" className="hover:text-orange-400 transition-colors">
                  Nike Dunks & Air Max
                </Link>
              </li>
              <li>
                <Link href="/shoes?brand=Adidas" className="hover:text-orange-400 transition-colors">
                  Adidas Samba & BOOST
                </Link>
              </li>
              <li>
                <Link href="/shoes?brand=New+Balance" className="hover:text-orange-400 transition-colors">
                  New Balance 990 / 550
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Account & Orders */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Account & Help
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/profile" className="hover:text-orange-400 transition-colors">
                  My Profile & Orders
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-orange-400 transition-colors">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/notifications" className="hover:text-orange-400 transition-colors">
                  Drop Alerts & Notifications
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-orange-400 transition-colors">
                  Sign In / Register
                </Link>
              </li>
              <li>
                <Link href="/reset-password" className="hover:text-orange-400 transition-colors">
                  Reset Password
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: About & Policies */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">
              Information
            </p>
            <ul className="space-y-2 text-xs">
              <li>
                <span className="text-zinc-500">Authenticity Guarantee</span>
              </li>
              <li>
                <span className="text-zinc-500">Shipping & Delivery</span>
              </li>
              <li>
                <span className="text-zinc-500">Sneaker Sizing Guide</span>
              </li>
              <li>
                <span className="text-zinc-500">Terms of Service</span>
              </li>
              <li>
                <span className="text-zinc-500">Privacy Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-zinc-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} SNEAKERS Inc. All rights reserved. Powered by Next.js & Supabase.</p>
          <div className="flex items-center gap-4 text-[11px] text-zinc-400">
            <span>Secure Checkout</span>
            <span>•</span>
            <span>SSL 256-bit Encrypted</span>
            <span>•</span>
            <span>Supabase Auth</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
