"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import SearchTrain from "@/components/SearchTrain";
import LiveStatus from "@/components/LiveStatus";
import PNRStatus from "@/components/PNRStatus";
import { Train, Map, Ticket } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"search" | "live" | "pnr">("search");

  return (
    
    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-start overflow-hidden bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      
      {/* Navbar equivalent */}
      <nav className="flex w-full items-center justify-between border-b border-neutral-200 px-8 py-4 dark:border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="size-8 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            <Train size={16} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">RailVerse</h1>
        </div>
        <button className="transform rounded-lg bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
          Login
        </button>
      </nav>

      {/* Decorative Lines from Hero Section Demo 1 */}
      <div className="absolute inset-y-0 left-8 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 pointer-events-none hidden md:block">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-8 h-full w-px bg-neutral-200/80 dark:bg-neutral-800/80 pointer-events-none hidden md:block">
        <div className="absolute top-20 h-40 w-px bg-gradient-to-b from-transparent via-purple-500 to-transparent" />
      </div>

      <div className="w-full px-4 py-10 md:py-16 flex flex-col items-center">
        {/* Animated Headline */}
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-4xl font-extrabold tracking-tight text-slate-800 md:text-5xl lg:text-7xl dark:text-slate-100">
          {"The next generation railway companion"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        {/* Animated Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-6 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
        >
          Track live running status, check PNR confirmation chances, and find trains with a lightning-fast modern interface built on Aceternity UI.
        </motion.p>

        {/* Tabs styled like Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <button 
            onClick={() => setActiveTab("search")}
            className={`flex items-center gap-2 transform rounded-lg px-6 py-2.5 font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              activeTab === "search" 
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/25" 
              : "border border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
            }`}
          >
            <Train size={18} /> Find Train
          </button>
          <button 
            onClick={() => setActiveTab("live")}
            className={`flex items-center gap-2 transform rounded-lg px-6 py-2.5 font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              activeTab === "live" 
              ? "bg-green-600 text-white hover:bg-green-700 shadow-md shadow-green-500/25" 
              : "border border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
            }`}
          >
            <Map size={18} /> Live Status
          </button>
          <button 
            onClick={() => setActiveTab("pnr")}
            className={`flex items-center gap-2 transform rounded-lg px-6 py-2.5 font-medium transition-all duration-300 hover:-translate-y-0.5 ${
              activeTab === "pnr" 
              ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md shadow-purple-500/25" 
              : "border border-gray-300 bg-white text-black hover:bg-gray-100 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
            }`}
          >
            <Ticket size={18} /> PNR Status
          </button>
        </motion.div>

        {/* Tab Content Display Area (Where the image was in the demo) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-16 w-full max-w-4xl rounded-3xl border border-neutral-200 bg-neutral-50/50 p-4 shadow-xl backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/50"
        >
          <div className="w-full min-h-[400px] overflow-hidden rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-slate-950">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              {activeTab === "search" && <SearchTrain />}
              {activeTab === "live" && <LiveStatus />}
              {activeTab === "pnr" && <PNRStatus />}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}