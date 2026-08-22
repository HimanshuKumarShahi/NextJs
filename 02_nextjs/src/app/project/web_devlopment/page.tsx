export default function WebDevelopment() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl shadow-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
            Sub-Route / Domain
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Web Development</h1>
          <p className="text-sm text-slate-400">web_development page inside project folder is fully active and operational.</p>
        </div>

        {/* Content Showcase Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#0f0f13] border border-slate-800/80 p-6 rounded-xl">
            <h2 className="text-base font-semibold text-white mb-2">MERN & Next.js Stack</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Building modern full-stack web applications featuring high performance, responsive layouts, and clean architecture.
            </p>
          </div>
          <div className="bg-[#0f0f13] border border-slate-800/80 p-6 rounded-xl">
            <h2 className="text-base font-semibold text-white mb-2">UI/UX & Tailwind</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crafting production-ready interfaces inspired by modern design systems like Vercel and Linear.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}