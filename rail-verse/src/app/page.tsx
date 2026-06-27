import SearchForm from "@/components/shared/SearchForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=2000')] bg-cover bg-center">
      
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      
      {/* Content */}
      <div className="z-10 w-full px-4 flex flex-col items-center gap-8">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight text-center">
          RailVerse <span className="text-blue-500">.</span>
        </h1>
        <p className="text-zinc-300 text-lg md:text-xl text-center max-w-2xl">
          Lightning-fast train discovery, real-time availability, and smart alternate routing—all in one place.
        </p>
        
        <div className="w-full mt-8">
          <SearchForm />
        </div>
      </div>
    </main>
  );
}