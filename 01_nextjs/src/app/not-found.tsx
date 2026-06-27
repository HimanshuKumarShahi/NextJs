import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 font-sans relative overflow-hidden">
     
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50 -z-10"></div>

      <div className="text-center z-10 w-full max-w-lg">
       
        <h1 className="text-8xl md:text-[150px] font-black text-gray-400 tracking-tighter select-none mb-4 md:mb-0">
          404
        </h1>

        <div className="relative -mt-10 md:-mt-16 mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Lost in the Code?
          </h2>
          <p className="text-gray-500 text-lg">
            Looks like this route doesn't exist in our software architecture, or
            the tech gear you're looking for is out of stock.
          </p>
        </div>

       
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/home"
            className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition duration-200 shadow-sm flex items-center justify-center gap-2"
          >
            <span>&larr;</span> Back to Home
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>

     
      <div className="absolute bottom-8 text-center w-full text-gray-400 text-sm font-semibold tracking-wide">
        Nexus<span className="text-gray-900">Tech.</span>
      </div>
    </div>
  );
}
