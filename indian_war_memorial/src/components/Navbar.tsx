"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, ChevronDown, LogIn, LayoutDashboard, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/heroes", label: "Our Heroes" },
  {
    label: "Battles",
    href: "/battles",
    dropdown: [
      { href: "/battles", label: "All Campaigns" },
      { href: "/battles?id=1947", label: "Indo-Pak War 1947" },
      { href: "/battles?id=1962", label: "Sino-Indian War 1962" },
      { href: "/battles?id=1965", label: "Indo-Pak War 1965" },
      { href: "/battles?id=1971", label: "Liberation War 1971" },
      { href: "/battles?id=kargil", label: "Kargil War 1999" },
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
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-full border transition-all duration-300 ${
          scrolled
            ? "bg-[#0E140B]/85 backdrop-blur-xl border-[#324322]/80 shadow-[0_12px_40px_rgba(0,0,0,0.6)] py-2 px-6"
            : "bg-[#0E140B]/40 backdrop-blur-md border-[#324322]/30 py-3.5 px-8"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF9933] via-[#C49F47] to-[#138808] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                <Shield className="w-4.5 h-4.5 text-white" />
              </div>
              <div className="absolute inset-0 rounded-full bg-[#C49F47] blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
            </div>
            <div>
              <span className="block text-sm font-bold text-white tracking-wide leading-tight group-hover:text-[#C49F47] transition-colors">
                Indian War
              </span>
              <span className="block text-[9px] font-bold text-[#C49F47] tracking-[0.25em] uppercase">
                Memorial
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-all duration-200 rounded-full hover:bg-white/5 cursor-pointer">
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-2 w-52 bg-[#0E140B] border border-[#324322] rounded-2xl shadow-2xl overflow-hidden py-2"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center px-4 py-2.5 text-xs font-semibold text-gray-300 hover:text-white hover:bg-[#324322]/40 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C49F47] mr-3" />
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
                  className={`relative px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 rounded-full ${
                    pathname === link.href
                      ? "text-white bg-[#324322]/60"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 border border-[#C49F47]/40 rounded-full pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            )}
          </div>

          {/* Right Side Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {session ? (
              <>
                {(session.user as any)?.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 px-4.5 py-2 text-xs font-bold uppercase tracking-wider text-[#C49F47] border border-[#C49F47]/40 rounded-full bg-[#C49F47]/5 hover:bg-[#C49F47]/10 transition-all duration-200"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2.5 pl-2">
                  <div className="w-8 h-8 rounded-full bg-[#324322] border border-[#C49F47]/20 flex items-center justify-center text-xs font-semibold text-[#C49F47]">
                    {session.user?.name?.charAt(0).toUpperCase() || <User className="w-3.5 h-3.5" />}
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-300 hover:text-white transition-colors"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  Login
                </Link>
                <Link
                  href="/register"
                  className="relative px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#455F2F] hover:bg-[#537239] rounded-full transition-all duration-200 shadow-md hover:shadow-[#455F2F]/20 overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/20 via-transparent to-[#138808]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden mt-2 max-w-7xl mx-auto rounded-3xl border border-[#324322] bg-[#0E140B]/98 backdrop-blur-2xl shadow-2xl p-6 overflow-hidden"
          >
            <div className="space-y-4">
              {navLinks.map((link) =>
                link.dropdown ? (
                  <div key={link.label} className="space-y-2">
                    <div className="text-[10px] font-bold text-[#C49F47] uppercase tracking-[0.2em] pl-3">
                      {link.label}
                    </div>
                    <div className="grid grid-cols-2 gap-2 pl-3">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all ${
                      pathname === link.href
                        ? "text-white bg-[#324322]/80 border border-[#C49F47]/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div className="pt-4 border-t border-[#324322]/40 flex flex-col gap-2.5">
                {session ? (
                  <>
                    {(session.user as any)?.role === "ADMIN" && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#C49F47] border border-[#C49F47]/30 rounded-xl bg-[#C49F47]/5"
                      >
                        <LayoutDashboard className="w-3.5 h-3.5" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="py-2.5 text-xs font-semibold text-gray-400 hover:text-white text-center rounded-xl bg-white/5"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold uppercase tracking-wider text-gray-300 border border-[#324322]/60 rounded-xl hover:bg-white/5 text-center"
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#455F2F] rounded-xl text-center shadow-md"
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
