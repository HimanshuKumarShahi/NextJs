"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingBag,
  Bell,
  User as UserIcon,
  Search,
  Menu,
  X,
  Sparkles,
  LogOut,
  Flame,
  ChevronDown,
  Check,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNotifications } from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const { unreadCount, notifications, markAllAsRead } = useNotifications();
  const { user, profile, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifDropdownOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shoes?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Ticker / Announcement Bar */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 text-black text-xs font-semibold py-1.5 px-4 text-center tracking-wide uppercase flex items-center justify-center gap-2">
        <Flame className="w-3.5 h-3.5 fill-black animate-pulse" />
        <span>HYPE DROPS & AUTHENTIC KICKS • USE CODE &apos;SNEAKER15&apos; FOR 15% OFF • FREE SHIPPING OVER $150</span>
        <Flame className="w-3.5 h-3.5 fill-black animate-pulse" />
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl"
            : "bg-zinc-950 border-b border-zinc-900"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-black font-black text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter text-white uppercase group-hover:text-orange-400 transition-colors">
                SNEAKERS<span className="text-orange-500">.</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 -mt-1 uppercase">
                AUTHENTIC VAULT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <Link
              href="/"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/shoes"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              All Shoes
            </Link>
            <Link
              href="/shoes?gender=men"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Men
            </Link>
            <Link
              href="/shoes?gender=women"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Women
            </Link>
            <Link
              href="/shoes?category=basketball"
              className="text-zinc-300 hover:text-white transition-colors"
            >
              Basketball
            </Link>
            <Link
              href="/shoes?sort=newest"
              className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-semibold transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Hot Drops
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50 animate-pulse">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white text-sm">Notifications</span>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full font-medium">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-xs text-zinc-400 hover:text-orange-400 transition-colors flex items-center gap-1"
                      >
                        <Check className="w-3 h-3" /> Mark all read
                      </button>
                    )}
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-zinc-800/50">
                    {notifications.slice(0, 4).map((n) => (
                      <Link
                        key={n.id}
                        href={n.link || "/notifications"}
                        onClick={() => setNotifDropdownOpen(false)}
                        className={`block p-3.5 hover:bg-zinc-800/50 transition-colors ${
                          !n.read ? "bg-zinc-800/20" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg">
                            {n.type === "order" ? "📦" : n.type === "drop" ? "🔥" : "🏷️"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-zinc-200 truncate">
                              {n.title}
                            </p>
                            <p className="text-[11px] text-zinc-400 line-clamp-2 mt-0.5">
                              {n.message}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="p-3 bg-zinc-950/80 border-t border-zinc-800 text-center">
                    <Link
                      href="/notifications"
                      onClick={() => setNotifDropdownOpen(false)}
                      className="text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      View All Notifications →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <Link
              href="/cart"
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors relative"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-black text-[10px] font-black rounded-full flex items-center justify-center shadow-lg shadow-orange-500/50">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>

            {/* User Account / Auth Dropdown */}
            <div className="relative" ref={userRef}>
              {user ? (
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-zinc-800 bg-zinc-900/80 hover:border-zinc-700 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-black text-xs font-bold flex items-center justify-center">
                    {profile?.fullName ? profile.fullName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-xs font-medium text-zinc-200 hidden sm:inline max-w-[90px] truncate">
                    {profile?.fullName?.split(" ")[0] || "Account"}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-zinc-400 pr-1" />
                </button>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 text-black text-xs font-bold transition-all shadow-md shadow-orange-500/20"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </Link>
              )}

              {/* User Dropdown Menu */}
              {userDropdownOpen && user && (
                <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in-50 zoom-in-95">
                  <div className="px-4 py-2.5 border-b border-zinc-800">
                    <p className="text-xs font-semibold text-zinc-100 truncate">
                      {profile?.fullName || "Sneaker Fan"}
                    </p>
                    <p className="text-[11px] text-zinc-400 truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-zinc-400" />
                    My Account & Orders
                  </Link>
                  <Link
                    href="/notifications"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-xs text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
                  >
                    <Bell className="w-4 h-4 text-zinc-400" />
                    Notifications
                  </Link>
                  <div className="border-t border-zinc-800 my-1"></div>
                  <button
                    onClick={() => {
                      signOut();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-xs text-red-400 hover:bg-zinc-800 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-900 bg-zinc-950 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-3">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-200 hover:text-orange-400"
            >
              Home
            </Link>
            <Link
              href="/shoes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-200 hover:text-orange-400"
            >
              All Shoes
            </Link>
            <Link
              href="/shoes?gender=men"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-200 hover:text-orange-400"
            >
              Men&apos;s Collection
            </Link>
            <Link
              href="/shoes?gender=women"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-zinc-200 hover:text-orange-400"
            >
              Women&apos;s Collection
            </Link>
            <Link
              href="/shoes?sort=newest"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-orange-400"
            >
              🔥 Hot Drops
            </Link>
            <Link
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-zinc-200"
            >
              <span>Shopping Cart</span>
              <span className="bg-zinc-800 text-xs px-2 py-0.5 rounded-full">
                {totalItems} items
              </span>
            </Link>
            <Link
              href="/notifications"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 text-sm font-medium text-zinc-200"
            >
              <span>Notifications</span>
              {unreadCount > 0 && (
                <span className="bg-orange-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </Link>
            {user ? (
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-medium text-zinc-200"
              >
                My Account
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center py-2.5 rounded-xl bg-orange-500 text-black font-bold text-sm"
              >
                Sign In / Register
              </Link>
            )}
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
          <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <span className="text-xs uppercase tracking-widest text-orange-400 font-bold">
                Search Sneakers Vault
              </span>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSearchSubmit} className="mt-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-5 h-5 text-zinc-400" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search Jordan, Nike Dunk, Samba, Ultraboost..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 text-sm"
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className="text-zinc-400 py-1">Trending:</span>
                {["Air Jordan 1", "Dunk Low", "Samba", "Ultraboost", "Travis Scott"].map(
                  (tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setSearchQuery(tag);
                        router.push(`/shoes?search=${encodeURIComponent(tag)}`);
                        setSearchOpen(false);
                      }}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
