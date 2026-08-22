import Button from "@/components/button";

export default function ProjectPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white p-6 sm:p-12">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl shadow-xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
            Repositories & Works
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Project Hub</h1>
          <p className="text-sm text-slate-400">Project page is working and fully integrated with your application routes.</p>
        </div>

        {/* Interactive Component Container */}
        <div className="bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl shadow-xl space-y-4">
          <h2 className="text-lg font-semibold text-white">Interactive Component Test</h2>
          <p className="text-xs text-slate-400">Below is your imported client-side button component:</p>
          
          <div className="pt-2">
            <Button />
          </div>
        </div>

      </div>
    </div>
  );
}