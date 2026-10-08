import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquareDashed, ShieldCheck, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] overflow-hidden px-4">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto mt-[-5vh]">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-orange-400 text-sm font-medium mb-4">
          <Sparkles className="h-4 w-4" />
          The ultimate anonymous feedback tool
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Dive into the world of <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
            Anonymous Feedback
          </span>
        </h1>

        <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          MystryMessage is where your identity remains a secret. Share your
          unique link and let your friends, audience, or coworkers tell you what
          they really think.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/sign-up">
            <Button className="h-14 px-8 text-lg bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-bold shadow-[0_0_30px_-5px_rgba(234,88,12,0.5)] transform hover:-translate-y-1 transition-all duration-300">
              Claim Your Link
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="h-14 px-8 text-lg border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600 text-zinc-300 rounded-xl font-bold transition-all duration-300"
            >
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-24">
        <div className="p-6 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/80 text-left">
          <ShieldCheck className="h-8 w-8 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold text-zinc-200 mb-2">
            100% Anonymous
          </h3>
          <p className="text-zinc-400 text-sm">
            We never track IP addresses or reveal the sender's identity. Your
            secrets are safe.
          </p>
        </div>
        <div className="p-6 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/80 text-left">
          <MessageSquareDashed className="h-8 w-8 text-orange-500 mb-4" />
          <h3 className="text-xl font-bold text-zinc-200 mb-2">
            AI Suggestions
          </h3>
          <p className="text-zinc-400 text-sm">
            Writer's block? Our AI integration suggests the perfect icebreakers
            for your guests.
          </p>
        </div>
        <div className="p-6 bg-zinc-900/40 backdrop-blur-md rounded-2xl border border-zinc-800/80 text-left">
          <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold text-xl mb-4">
            UI
          </div>
          <h3 className="text-xl font-bold text-zinc-200 mb-2">
            Premium Design
          </h3>
          <p className="text-zinc-400 text-sm">
            Built with Shadcn and Tailwind CSS for a seamless, beautiful dark
            mode experience.
          </p>
        </div>
      </div>
    </div>
  );
}
