import Link from "next/link";


export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-6 font-sans relative overflow-hidden">
      
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-neutral-800 rounded-full blur-[120px] opacity-30 -z-10"></div>

      <div className="text-center z-10 w-full max-w-lg">
        
        
        <h1 className="text-8xl md:text-[150px] font-black bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-800 tracking-tighter select-none mb-4 md:mb-0">
          404
        </h1>

        <div className="relative -mt-10 md:-mt-16 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            Lost in the Code?
          </h2>
          <p className="text-neutral-400 text-lg">
            Looks like this route doesn't exist in our software architecture, or
            the tech gear you're looking for is out of stock.
          </p>
        </div>

    
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          

          <Link
            href="/"
            className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-lg font-bold hover:bg-neutral-200 transition duration-200 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </Link>

   
          <Link
            href="/"
            className="w-full sm:w-auto bg-transparent border border-neutral-700 text-neutral-300 px-8 py-3 rounded-lg font-medium hover:bg-neutral-800 hover:text-white transition duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

      
      <div className="absolute bottom-8 text-center w-full text-neutral-500 text-sm font-semibold tracking-wide">
        Art <span className="text-white">Music.</span>
      </div>
    </div>
  );
}