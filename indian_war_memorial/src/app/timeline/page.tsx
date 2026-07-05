"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HistoricalTimeline from "@/components/HistoricalTimeline";
import IndiaMap from "@/components/IndiaMap";
import Providers from "@/components/Providers";
import TracingBeam from "@/components/ui/tracing-beam";
import { Compass, Calendar } from "lucide-react";

export default function TimelinePage() {
  // Sync state between map and timeline scroll
  const [activeBattleId, setActiveBattleId] = useState("kashmir-1947");

  // Scroll timeline card into view when a map dot is clicked
  const handleBattleClick = (battleId: string) => {
    setActiveBattleId(battleId);
    const element = document.getElementById(`timeline-card-${battleId}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Update active map location when a timeline card enters view
  const handleEventInView = (eventId: string) => {
    setActiveBattleId(eventId);
  };

  return (
    <Providers>
      <Navbar />
      
      <main className="min-h-screen pt-28 pb-16 bg-[#070B04] relative overflow-hidden">
        {/* Background Grids & Dots */}
        <div className="absolute inset-0 bg-dot-olive opacity-30 pointer-events-none" />
        <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C49F47] uppercase tracking-[0.25em] mb-4">
              <Calendar className="w-3.5 h-3.5" />
              <span>Campaign Timeline</span>
            </span>
            <h1 className="text-4xl lg:text-6xl font-serif font-black text-white mb-4 uppercase tracking-wider">
              Timeline of{" "}
              <span className="text-tricolor-gradient drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                Valor
              </span>
            </h1>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C49F47]/50 to-transparent mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-400">
              An interactive operational console matching the geographic theaters of battle with the historic chronicle of the Indian Armed Forces.
            </p>
          </div>

          {/* Interactive Split-pane Dashboard */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            
            {/* Sticky Left Pane: Map Console */}
            <div className="w-full lg:w-[45%] lg:sticky lg:top-28 z-20">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#324322]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-[#C49F47] animate-pulse" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">Geographic Theater Console</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#C49F47] border border-[#C49F47]/30 px-2 py-0.5 rounded bg-[#C49F47]/5 uppercase tracking-widest font-bold">
                    Interactive
                  </span>
                </div>
                
                <IndiaMap 
                  activeBattleId={activeBattleId} 
                  onBattleClick={handleBattleClick} 
                />
                
                <div className="text-[10px] font-mono text-gray-500 leading-relaxed text-center">
                  💡 Scroll the timeline on the right to focus the map on the theater, or click markers on the map to navigate the timeline.
                </div>
              </div>
            </div>

            {/* Scrolling Right Pane: Historical Timeline */}
            <div className="w-full lg:w-[55%]">
              <TracingBeam>
                <div className="pl-4 sm:pl-6 md:pl-0">
                  <HistoricalTimeline 
                    activeBattleId={activeBattleId} 
                    onEventInView={handleEventInView} 
                    isDashboard={true} 
                  />
                </div>
              </TracingBeam>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </Providers>
  );
}
