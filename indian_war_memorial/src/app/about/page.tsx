import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { Shield, Target, Heart, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "About the Indian War Memorial project — a free tribute to the heroes of India.",
};

export default function AboutPage() {
  return (
    <Providers>
      <Navbar />
      <main className="flex-1 pt-24 pb-16 px-4 sm:px-6 lg:px-8" style={{ background: "#0B1006" }}>
        <div className="max-w-4xl mx-auto space-y-16">
          {/* Hero */}
          <div className="text-center">
            <div
              className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 text-3xl"
              style={{ background: "linear-gradient(135deg, #FF9933, #C49F47, #138808)" }}
            >
              🇮🇳
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-white mb-4">About This Project</h1>
            <p className="text-base leading-relaxed" style={{ color: "#9CA3AF" }}>
              The Indian War Memorial is a free, non-commercial digital tribute to the brave soldiers of India. It exists to educate, honor, and inspire future generations.
            </p>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Shield,
                title: "Our Mission",
                desc: "To document the stories of every Indian soldier who made the supreme sacrifice, and ensure their names are never forgotten.",
              },
              {
                icon: Heart,
                title: "Free for All",
                desc: "This project is 100% free and will always remain free for every Indian citizen, student, and researcher.",
              },
              {
                icon: Target,
                title: "Accuracy First",
                desc: "We use verified historical records, government sources, and official accounts to ensure factual accuracy.",
              },
              {
                icon: Globe,
                title: "Reach",
                desc: "Available to anyone around the world who wants to learn about India's military history and the courage of her soldiers.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-6 rounded-2xl border"
                style={{ background: "#131A0F", borderColor: "rgba(62,81,43,0.4)" }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(90,117,63,0.2)" }}
                >
                  <Icon className="w-5 h-5" style={{ color: "#C49F47" }} />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Tech stack */}
          <div
            className="p-8 rounded-2xl border"
            style={{ background: "#131A0F", borderColor: "rgba(62,81,43,0.4)" }}
          >
            <h2 className="text-xl font-bold text-white mb-6 text-center">Built With</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {["Next.js", "MongoDB", "Tailwind CSS", "Framer Motion", "NextAuth.js", "Cloudinary", "Vercel"].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ background: "rgba(62,81,43,0.3)", color: "#C49F47", border: "1px solid rgba(62,81,43,0.5)" }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="text-center" style={{ color: "#6B7280", fontSize: "0.875rem" }}>
            <p>Jai Hind 🇮🇳 · Vande Mataram · Jai Jawan, Jai Kisan</p>
          </div>
        </div>
      </main>
      <Footer />
    </Providers>
  );
}
