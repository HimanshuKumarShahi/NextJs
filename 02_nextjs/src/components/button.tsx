"use client";

import { useState } from "react";

export default function Button() {
  const [isLoading, setIsLoading] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setIsLoading(true);
    setClickCount((prev) => prev + 1);

    setTimeout(() => {
      setIsLoading(false);
      alert(`Button Clicked 😎 (Total clicks: ${clickCount + 1})`);
    }, 300);
  };

  return (
    <>
    <div className="min-h-screen bg-[#0a0a0c] text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-indigo-500 selection:text-white">
      <div className="max-w-md w-full bg-[#0f0f13] border border-slate-800/80 p-8 rounded-2xl shadow-2xl text-center space-y-6">
        
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-3">
            Interactive Component
          </span>
          <h1 className="text-xl font-bold text-white tracking-tight">Client-Side State Button</h1>
          <p className="text-xs text-slate-400 mt-1">Test out micro-interactions and React state handling.</p>
        </div>

        <div className="py-4 flex justify-center">
          <button
            onClick={handleClick}
            disabled={isLoading}
            className="relative group overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-300 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  
                  </svg>
                  Processing...
                </>
              ) : (
                <>Click Me ! 🚀</>
              )}
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>

        <div className="text-xs text-slate-500 border-t border-slate-800/80 pt-4">
          Interaction Count: <span className="text-indigo-400 font-mono font-semibold">{clickCount}</span>
        </div>

      </div>
    </div>
  </>);
}