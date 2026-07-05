'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BattleLocation {
  id: string;
  left: string; // Percentage position from left
  top: string;  // Percentage position from top
  label: string;
  year: number;
  war: string;
  color: string;
  description: string;
}

interface IndiaMapProps {
  activeBattleId?: string;
  onBattleClick?: (battleId: string) => void;
  className?: string;
}

// ─── Battle Coordinates mapped exactly on the Map of India ───────────────────

export const BATTLE_LOCATIONS: BattleLocation[] = [
  {
    id: 'kashmir-1947',
    left: '26%',
    top: '11.5%',
    label: 'Kashmir',
    year: 1947,
    war: 'Indo-Pak War 1947',
    color: '#FF9933',
    description: 'First Indo-Pak war. Indian forces secured Srinagar airfield and drove out invaders.',
  },
  {
    id: 'rezang-la-1962',
    left: '34.5%',
    top: '15%',
    label: 'Rezang La',
    year: 1962,
    war: 'Sino-Indian War',
    color: '#FF6B6B',
    description: '114 soldiers of 13 Kumaon fought to the last man to hold Ladakh.',
  },
  {
    id: 'loc-1965',
    left: '23%',
    top: '14.5%',
    label: 'Haji Pir Pass',
    year: 1965,
    war: 'Indo-Pak War 1965',
    color: '#C49F47',
    description: 'Indian Army captured Haji Pir Pass and defended LOC from infiltration.',
  },
  {
    id: 'longewala-1971',
    left: '17.5%',
    top: '32.5%',
    label: 'Longewala',
    year: 1971,
    war: 'Battle of Longewala',
    color: '#138808',
    description: '120 Indian soldiers held off a Pakistani column of 45 tanks.',
  },
  {
    id: 'dhaka-1971',
    left: '74.5%',
    top: '41.5%',
    label: 'Dhaka',
    year: 1971,
    war: 'Liberation of Bangladesh',
    color: '#138808',
    description: '93,000 Pakistani soldiers surrendered to joint Indian-Mukti Bahini forces.',
  },
  {
    id: 'siachen-1984',
    left: '31.5%',
    top: '9.5%',
    label: 'Siachen Glacier',
    year: 1984,
    war: 'Operation Meghdoot',
    color: '#5A753F',
    description: 'Daring pre-emptive heliborne operation securing the highest glacier on earth.',
  },
  {
    id: 'kargil-1999',
    left: '29.5%',
    top: '12.5%',
    label: 'Kargil',
    year: 1999,
    war: 'Operation Vijay',
    color: '#FF9933',
    description: 'Evicted intruders from high-altitude peaks at 18,000 feet under heavy fire.',
  },
];

// Map focus transforms (X, Y shifts and zoom levels matching locations)
const MAP_TRANSFORMS: Record<string, { x: number; y: number; scale: number }> = {
  'kashmir-1947': { x: 100, y: 155, scale: 2.2 },
  'rezang-la-1962': { x: 65, y: 135, scale: 2.2 },
  'loc-1965': { x: 110, y: 135, scale: 2.2 },
  'longewala-1971': { x: 140, y: 35, scale: 2.2 },
  'dhaka-1971': { x: -165, y: -25, scale: 2.3 },
  'siachen-1984': { x: 80, y: 165, scale: 2.4 },
  'kargil-1999': { x: 85, y: 145, scale: 2.2 },
};

const WAR_LEGEND = [
  { id: 'op-vijay',  color: '#FF9933', label: 'Operation Vijay' },
  { id: 'war-1971', color: '#138808', label: 'Indo-Pak War (1971)' },
  { id: 'war-1965', color: '#C49F47', label: 'Indo-Pak War (1965)' },
  { id: 'war-1962', color: '#FF6B6B', label: 'Sino-Indian War' },
  { id: 'op-meghdoot', color: '#5A753F', label: 'Siachen Glacier' },
];

export default function IndiaMap({ activeBattleId, onBattleClick, className = '' }: IndiaMapProps) {
  const [hoveredBattle, setHoveredBattle] = useState<BattleLocation | null>(null);

  // Get active transformation based on scroll or click selection
  const transform = activeBattleId ? MAP_TRANSFORMS[activeBattleId] : { x: 0, y: 0, scale: 1 };

  return (
    <div className={`relative flex flex-col items-center gap-5 w-full max-w-2xl mx-auto ${className}`}>
      
      {/* Tooltip Card overlay */}
      <AnimatePresence>
        {(hoveredBattle || activeBattleId) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 z-40 max-w-[290px] rounded-xl border border-[#324322] px-4.5 py-3 shadow-[0_15px_40px_rgba(0,0,0,0.8)] backdrop-blur-md text-center bg-[#0E140B]/95"
            style={{
              boxShadow: `0 0 25px ${(hoveredBattle || BATTLE_LOCATIONS.find(b => b.id === activeBattleId))?.color}15, 0 10px 40px rgba(0,0,0,0.8)`,
            }}
          >
            {(() => {
              const b = hoveredBattle || BATTLE_LOCATIONS.find((loc) => loc.id === activeBattleId);
              if (!b) return null;
              return (
                <>
                  <div className="text-[9px] font-bold uppercase tracking-[0.18em] mb-0.5" style={{ color: b.color }}>
                    {b.war}
                  </div>
                  <div className="font-mono text-sm font-semibold text-white mb-1.5">
                    {b.label} &mdash; {b.year}
                  </div>
                  <div className="text-[11px] leading-relaxed text-gray-400">
                    {b.description}
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Console Frame */}
      <div className="relative w-full rounded-2xl border border-[#324322]/50 p-3 sm:p-4 overflow-hidden bg-[#070B04] shadow-2xl">
        {/* Radar scope background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(69,95,47,0.06)_0%,_transparent_65%)] pointer-events-none" />

        {/* Map Clipping container */}
        <div className="relative w-full aspect-[4/5] bg-[#0E140B]/50 rounded-xl overflow-hidden border border-[#324322]/40">
          
          {/* Animated Zooming Map Container */}
          <motion.div
            className="w-full h-full relative"
            animate={{
              scale: transform.scale,
              x: transform.x,
              y: transform.y,
            }}
            transition={{
              type: "spring",
              stiffness: 110,
              damping: 24,
            }}
          >
            {/* The Map Image */}
            <img 
              src="/india_map.png" 
              alt="Official Map of India" 
              className="w-full h-full object-contain select-none opacity-85"
            />

            {/* Interactive Battle Markers */}
            {BATTLE_LOCATIONS.map((battle) => {
              const isActive = activeBattleId === battle.id;
              const isHovered = hoveredBattle?.id === battle.id;
              
              return (
                <div
                  key={battle.id}
                  className="absolute group -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
                  style={{ left: battle.left, top: battle.top }}
                  onMouseEnter={() => setHoveredBattle(battle)}
                  onMouseLeave={() => setHoveredBattle(null)}
                  onClick={() => onBattleClick?.(battle.id)}
                >
                  {/* Pulsing rings around active/hovered battle */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none flex items-center justify-center">
                    <span 
                      className={`absolute w-full h-full rounded-full animate-ping ${isActive || isHovered ? "opacity-60" : "opacity-0"}`} 
                      style={{ backgroundColor: battle.color, animationDuration: '1.8s' }} 
                    />
                    <span 
                      className={`absolute w-3/4 h-3/4 rounded-full animate-ping ${isActive || isHovered ? "opacity-40" : "opacity-0"}`} 
                      style={{ backgroundColor: battle.color, animationDuration: '2.5s' }} 
                    />
                  </div>

                  {/* Core Dot Indicator */}
                  <div 
                    className={`relative rounded-full border border-white/60 shadow-lg flex items-center justify-center transition-all duration-300 ${
                      isActive || isHovered ? "scale-135 w-4 h-4" : "w-3 h-3 hover:scale-125"
                    }`}
                    style={{ backgroundColor: battle.color }}
                  >
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>

                  {/* Clean text label (visible when map zooms in or hovered) */}
                  <div 
                    className={`absolute left-1/2 -translate-x-1/2 top-4 px-1.5 py-0.5 bg-[#070B04]/90 border rounded text-[7px] font-bold font-mono tracking-wider whitespace-nowrap shadow-md pointer-events-none transition-all duration-300 ${
                      isActive || isHovered ? "opacity-100 scale-100 border-[#C49F47]" : "opacity-50 scale-90 border-[#324322]/60"
                    }`}
                  >
                    <span style={{ color: battle.color }}>{battle.label}</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* Legends Panel */}
      <div className="w-full rounded-xl border border-[#324322]/40 px-4.5 py-3.5 bg-[#0E140B]/80 shadow-md">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[9px] font-mono text-gray-400 justify-center">
          {WAR_LEGEND.map((war) => (
            <div key={war.id} className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full border border-white/10 shrink-0" style={{ backgroundColor: war.color }} />
              <span className="truncate">{war.label}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 text-[#C49F47] font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-transparent border border-dashed border-[#C49F47] animate-spin" />
            <span>Interactive Console</span>
          </div>
        </div>
      </div>
    </div>
  );
}
