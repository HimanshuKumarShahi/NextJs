"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronDown, LogIn, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/heroes", label: "Our Heroes" },
  {
    label: "Battles",
    href: "/battles",
    dropdown: [
      { href: "/battles", label: "All Campaigns" },
      { href: "/battles/1947", label: "Indo-Pak War 1947" },
      { href: "/battles/1962", label: "Sino-Indian War 1962" },
      { href: "/battles/1965", label: "Indo-Pak War 1965" },
      { href: "/battles/1971", label: "Liberation War 1971" },
      { href: "/battles/kargil", label: "Kargil War 1999" },
    ],
  },
  { href: "/timeline", label: "Timeline" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B1006]/95 backdrop-blur-xl border-b border-[#3E512B]/40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] via-[#C49F47] to-[#138808] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF9933] via-[#C49F47] to-[#138808] blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300" />
            </div>
            <div>
              <span className="block text-base font-bold text-white tracking-wide leading-tight">
                Indian War
              </span>
              <span className="block text-xs font-semibold text-[#C49F47] tracking-[0.2em] uppercase">
                Memorial
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5">
                    {link.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="absolute top-full left-0 mt-2 w-52 bg-[#131A0F]/95 backdrop-blur-xl border border-[#3E512B]/50 rounded-xl shadow-xl overflow-hidden"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-[#3E512B]/40 transition-all duration-150"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C49F47] mr-3 flex-shrink-0" />
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
                    pathname === link.href
                      ? "text-white"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNavItem"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF9933] via-[#C49F47] to-[#138808] rounded-full"
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Right Side */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <>
                {(session.user as any)?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#C49F47] border border-[#C49F47]/40 rounded-lg hover:bg-[#C49F47]/10 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#3E512B] to-[#5A753F] hover:from-[#5A753F] hover:to-[#6B8A4E] rounded-lg transition-all duration-200 shadow-lg hover:shadow-[#5A753F]/30"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-gray-300 hover:text-white transition-colors duration-200"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B1006]/98 backdrop-blur-xl border-t border-[#3E512B]/40"
          >
            <div className="px-4 pt-4 pb-6 space-y-1">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label}>
                    <div className="px-3 py-2 text-xs font-bold text-[#C49F47] uppercase tracking-widest">
                      {link.label}
                    </div>
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block px-6 py-2 text-sm text-gray-400 hover:text-white hover:bg-[#3E512B]/20 rounded-lg transition-all duration-150"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                      pathname === link.href
                        ? "text-white bg-[#3E512B]/40"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-4 border-t border-[#3E512B]/30 space-y-2">
                {session ? (
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="w-full text-left px-3 py-2.5 text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="block px-3 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#3E512B] to-[#5A753F] rounded-lg text-center"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
