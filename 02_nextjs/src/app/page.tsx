import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-20 px-6 lg:pt-36 lg:pb-32 text-center">
        {/* Subtle Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 text-xs font-medium mb-8">
            <span>✨ Next-Gen Engineering Portfolio & Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Engineering the <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">Future of Code</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo doloribus aliquam debitis necessitatibus fuga dolorem unde neque expedita iusto dignissimos.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/project" className="w-full sm:w-auto bg-white text-slate-950 font-semibold px-6 py-3 rounded-lg hover:bg-slate-200 transition-all shadow-lg shadow-white/5">
              Explore Projects
            </Link>
            <Link href="/classroom" className="w-full sm:w-auto bg-slate-900 border border-slate-800 text-slate-300 font-semibold px-6 py-3 rounded-lg hover:bg-slate-800 hover:text-white transition-all">
              Access Classroom
            </Link>
          </div>
        </div>
      </section>

      {/* 3. METRICS / STATS GRID */}
      <section className="border-y border-slate-900 bg-slate-950/50 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="p-4">
            <div className="text-3xl font-extrabold text-white tracking-tight mb-1">100%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Production Ready</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-extrabold text-indigo-400 tracking-tight mb-1">MERN & AI</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Core Stack</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-extrabold text-emerald-400 tracking-tight mb-1">24/7</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">System Uptime</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-extrabold text-sky-400 tracking-tight mb-1">v3.2</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-medium">Architecture</div>
          </div>
        </div>
      </section>

      {/* 4. FEATURE CARDS GRID (Linear / Vercel style) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Core Disciplines & Domains</h2>
          <p className="text-sm text-slate-400">Built with modern developer practices, clean architecture, and modular scalability.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group relative bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl hover:border-slate-700 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Web Development</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Full-stack architectures featuring React, Next.js App Router, Node.js, and robust database models.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl hover:border-slate-700 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
              🐍
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Python Ecosystem</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Advanced scripting, backend APIs built via Django/FastAPI, and automated pipelines.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl hover:border-slate-700 transition-all duration-300">
            <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-lg mb-6 group-hover:scale-110 transition-transform">
              🤖
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Agents & LLMs</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Integrating generative toolsets, local containerized models, and intelligent automated agents.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-slate-900 bg-[#070709] py-12 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>© {new Date().getFullYear()} Developer Platform. Built with Next.js App Router & Tailwind CSS.</div>
          <div className="flex gap-6">
            <Link href="/about" className="hover:text-slate-300 transition-colors">About</Link>
            <Link href="/project" className="hover:text-slate-300 transition-colors">Projects</Link>
            <Link href="/classroom" className="hover:text-slate-300 transition-colors">Classroom</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}