import Link from "next/link";
import { Shield, Heart, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#060A04] border-t border-[#3E512B]/30 mt-auto">
      {/* Tricolor top stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] via-[#C49F47] to-[#138808] flex items-center justify-center shadow-lg">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-base font-bold text-white">Indian War</span>
                <span className="block text-xs font-semibold text-[#C49F47] tracking-widest uppercase">Memorial</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A humble tribute to the brave soldiers of India who sacrificed their lives to protect our nation. Their courage lives forever.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
              <span>for Bharat</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-[#C49F47] uppercase tracking-widest mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/heroes", label: "Our Heroes" },
                { href: "/battles", label: "Battles & Campaigns" },
                { href: "/timeline", label: "Historical Timeline" },
                { href: "/about", label: "About Us" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#5A753F] group-hover:bg-[#C49F47] transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wars */}
          <div>
            <h3 className="text-sm font-bold text-[#C49F47] uppercase tracking-widest mb-5">Historic Wars</h3>
            <ul className="space-y-3">
              {[
                { href: "/battles/1947", label: "Indo-Pak War 1947" },
                { href: "/battles/1962", label: "Sino-Indian War 1962" },
                { href: "/battles/1965", label: "Indo-Pak War 1965" },
                { href: "/battles/1971", label: "Liberation War 1971" },
                { href: "/battles/kargil", label: "Kargil War 1999" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#5A753F] group-hover:bg-[#C49F47] transition-colors duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-sm font-bold text-[#C49F47] uppercase tracking-widest mb-5">Contact</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#5A753F] flex-shrink-0" />
                contact@indianwarmemorial.in
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#5A753F] flex-shrink-0" />
                +91-XXXX-XXXXXX
              </li>
            </ul>
            <div className="flex gap-3">
              <button aria-label="Facebook" className="w-9 h-9 rounded-lg bg-[#131A0F] border border-[#3E512B]/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#C49F47]/50 hover:bg-[#3E512B]/30 transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
              </button>
              <button aria-label="Twitter" className="w-9 h-9 rounded-lg bg-[#131A0F] border border-[#3E512B]/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#C49F47]/50 hover:bg-[#3E512B]/30 transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </button>
              <button aria-label="Instagram" className="w-9 h-9 rounded-lg bg-[#131A0F] border border-[#3E512B]/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#C49F47]/50 hover:bg-[#3E512B]/30 transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </button>
              <button aria-label="YouTube" className="w-9 h-9 rounded-lg bg-[#131A0F] border border-[#3E512B]/40 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#C49F47]/50 hover:bg-[#3E512B]/30 transition-all duration-200">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-[#3E512B]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Indian War Memorial. Free forever for all Indians.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
