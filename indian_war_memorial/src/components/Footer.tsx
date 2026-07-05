import Link from "next/link";
import { Shield, Heart, Mail, Phone, Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#070B04] border-t border-[#324322]/40 mt-auto overflow-hidden">
      {/* Background dot pattern inside footer */}
      <div className="absolute inset-0 bg-dot-olive opacity-40 pointer-events-none" />
      
      {/* Tricolor top stripe */}
      <div className="h-0.5 w-full bg-gradient-to-r from-[#FF9933] via-[#F2F4F0] to-[#138808]" />

      {/* Decorative light glows */}
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[150px] bg-[#C49F47]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-[#138808]/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF9933] via-[#C49F47] to-[#138808] flex items-center justify-center shadow-lg">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#C49F47] blur-md opacity-30" />
              </div>
              <div>
                <span className="block text-base font-bold text-white tracking-wide">Indian War</span>
                <span className="block text-xs font-semibold text-[#C49F47] tracking-[0.2em] uppercase">Memorial</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A humble digital tribute to the brave souls of the Indian Armed Forces who laid down their lives to safeguard our sovereignty.
            </p>
            <div className="flex items-center gap-1.5 pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-orange-500/20 bg-orange-500/5 text-[10px] text-orange-500 uppercase tracking-widest font-bold">
                <Flame className="w-3 h-3 animate-pulse" />
                <span>Amar Jawan Jyoti</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-bold text-[#C49F47] uppercase tracking-[0.25em] mb-6">Quick Explore</h3>
            <ul className="space-y-3.5">
              {[
                { href: "/", label: "Home Base" },
                { href: "/heroes", label: "Martyred Heroes" },
                { href: "/battles", label: "Campaign Archives" },
                { href: "/timeline", label: "Interactive Timeline" },
                { href: "/about", label: "About Memorial" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-all duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#455F2F] group-hover:bg-[#C49F47] group-hover:scale-125 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Wars */}
          <div>
            <h3 className="text-xs font-bold text-[#C49F47] uppercase tracking-[0.25em] mb-6">Key Operations</h3>
            <ul className="space-y-3.5">
              {[
                { href: "/battles", label: "Indo-Pak War 1947" },
                { href: "/battles", label: "Sino-Indian War 1962" },
                { href: "/battles", label: "Indo-Pak War 1965" },
                { href: "/battles", label: "Liberation of Bangladesh 1971" },
                { href: "/battles", label: "Kargil Conflict 1999" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-all duration-200 flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-[#455F2F] group-hover:bg-[#C49F47] group-hover:scale-125 transition-all duration-200" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-xs font-bold text-[#C49F47] uppercase tracking-[0.25em] mb-6">Official Connect</h3>
            <ul className="space-y-3.5 mb-6">
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Mail className="w-4 h-4 text-[#455F2F] flex-shrink-0" />
                <span>tribute@indianwarmemorial.in</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-400">
                <Phone className="w-4 h-4 text-[#455F2F] flex-shrink-0" />
                <span>+91-11-23019749 (National)</span>
              </li>
            </ul>
            <div className="flex gap-2.5">
              {["Twitter", "Facebook", "Instagram"].map((platform) => (
                <button
                  key={platform}
                  aria-label={platform}
                  className="px-3 py-1.5 rounded-lg bg-[#0E140B] border border-[#324322]/40 text-xs text-gray-400 hover:text-[#C49F47] hover:border-[#C49F47]/40 hover:bg-[#324322]/20 transition-all duration-200"
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[#324322]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} Indian War Memorial. Made with</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            <span>for the Motherland.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/about" className="hover:text-gray-400 transition-colors">Terms of Use</Link>
            <span className="text-[#C49F47] font-semibold tracking-wider">JAI HIND 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
