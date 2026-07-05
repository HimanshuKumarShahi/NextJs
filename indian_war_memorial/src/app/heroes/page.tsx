import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Our Heroes",
  description: "Profiles of brave Indian soldiers who sacrificed their lives for the nation.",
};

// Placeholder heroes until admin adds them via dashboard
const PLACEHOLDER_HEROES = [
  {
    id: "vikram-batra",
    name: "Captain Vikram Batra",
    rank: "Captain",
    regiment: "13 JAK Rifles",
    war: "Kargil War 1999",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Yeh Dil Maange More!",
    martyred: "July 7, 1999",
    age: 24,
    emoji: "🦁",
  },
  {
    id: "shaitan-singh",
    name: "Major Shaitan Singh",
    rank: "Major",
    regiment: "13 Kumaon Regiment",
    war: "Sino-Indian War 1962",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Fight to the last man, last round.",
    martyred: "November 18, 1962",
    age: 34,
    emoji: "⚔️",
  },
  {
    id: "arun-khetarpal",
    name: "Second Lieutenant Arun Khetarpal",
    rank: "Second Lieutenant",
    regiment: "17 Horse (Poona Horse)",
    war: "Indo-Pakistani War 1971",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "My tank is still okay. I will not abandon my tank.",
    martyred: "December 16, 1971",
    age: 21,
    emoji: "🛡️",
  },
  {
    id: "albert-ekka",
    name: "Lance Naik Albert Ekka",
    rank: "Lance Naik",
    regiment: "14 Guards",
    war: "Indo-Pakistani War 1971",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Duty unto death.",
    martyred: "December 3, 1971",
    age: 28,
    emoji: "🪖",
  },
  {
    id: "manoj-pandey",
    name: "Lieutenant Manoj Kumar Pandey",
    rank: "Lieutenant",
    regiment: "1/11 Gorkha Rifles",
    war: "Kargil War 1999",
    medals: ["Param Vir Chakra (Posthumous)"],
    quote: "Na Chhodnu" (I will not leave them).",
    martyred: "July 3, 1999",
    age: 24,
    emoji: "🏔️",
  },
  {
    id: "yogendra-singh-yadav",
    name: "Grenadier Yogendra Singh Yadav",
    rank: "Grenadier",
    regiment: "18 Grenadiers",
    war: "Kargil War 1999",
    medals: ["Param Vir Chakra"],
    quote: "One man can make a difference.",
    martyred: "Survived — Living Hero",
    age: 19,
    emoji: "🌟",
  },
];

export default function HeroesPage() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ background: "#0B1006" }}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-[0.3em] mb-4" style={{ color: "#C49F47" }}>
              Amar Jawan
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-4">
              Our{" "}
              <span
                style={{
                  background: "linear-gradient(to right, #FF9933, #C49F47, #138808)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Heroes
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-base" style={{ color: "#9CA3AF" }}>
              They chose duty over life. These are the profiles of some of India&apos;s bravest warriors who made the supreme sacrifice.
            </p>
          </div>

          {/* Stats bar */}
          <div
            className="flex flex-wrap justify-center gap-8 mb-16 p-6 rounded-2xl border"
            style={{ background: "#131A0F", borderColor: "rgba(62,81,43,0.4)" }}
          >
            {[
              { label: "Param Vir Chakras Awarded", value: "21" },
              { label: "Mahavir Chakras", value: "215+" },
              { label: "Vir Chakras", value: "1,300+" },
              { label: "Wars Fought & Won", value: "6+" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.value}</div>
                <div className="text-xs" style={{ color: "#6B7280" }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Hero grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PLACEHOLDER_HEROES.map((hero) => (
              <div
                key={hero.id}
                className="group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:-translate-y-1"
                style={{
                  background: "#131A0F",
                  borderColor: "rgba(62,81,43,0.4)",
                }}
              >
                {/* Top accent */}
                <div
                  className="h-0.5 w-full"
                  style={{ background: "linear-gradient(to right, #FF9933, #C49F47, #138808)" }}
                />

                {/* Image placeholder */}
                <div
                  className="h-48 flex items-center justify-center text-6xl"
                  style={{ background: "linear-gradient(135deg, #131A0F, #1E2E15)" }}
                >
                  {hero.emoji}
                </div>

                <div className="p-6">
                  {/* War badge */}
                  <span
                    className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3"
                    style={{ background: "rgba(196,159,71,0.15)", color: "#C49F47" }}
                  >
                    {hero.war}
                  </span>

                  <h2 className="text-lg font-bold text-white mb-0.5">{hero.name}</h2>
                  <p className="text-sm mb-1" style={{ color: "#9CA3AF" }}>
                    {hero.rank} · {hero.regiment}
                  </p>
                  <p className="text-xs mb-4" style={{ color: "#6B7280" }}>
                    {hero.martyred} · Age {hero.age}
                  </p>

                  {/* Quote */}
                  <blockquote
                    className="text-xs italic border-l-2 pl-3 mb-4"
                    style={{ color: "#9CA3AF", borderColor: "#C49F47" }}
                  >
                    &ldquo;{hero.quote}&rdquo;
                  </blockquote>

                  {/* Medals */}
                  <div className="flex flex-wrap gap-2">
                    {hero.medals.map((medal) => (
                      <span
                        key={medal}
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ background: "rgba(255,153,51,0.1)", color: "#FF9933" }}
                      >
                        🎖️ {medal}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ boxShadow: "inset 0 0 0 1px rgba(196,159,71,0.3), 0 0 30px rgba(196,159,71,0.05)" }}
                />
              </div>
            ))}
          </div>

          {/* Admin note */}
          <div
            className="mt-12 text-center p-6 rounded-2xl border"
            style={{ background: "rgba(62,81,43,0.1)", borderColor: "rgba(62,81,43,0.3)" }}
          >
            <p className="text-sm" style={{ color: "#6B7280" }}>
              More profiles are added by the admin regularly.{" "}
              <span style={{ color: "#C49F47" }}>Jai Hind!</span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </Providers>
  );
}
