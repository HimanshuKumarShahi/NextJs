'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface BattleLocation {
  id: string;
  x: number;
  y: number;
  label: string;
  year: number;
  war: string;
  color: string;
  description: string;
}

interface IndiaMapProps {
  onBattleClick?: (battleId: string) => void;
  className?: string;
}

// ─── Battle Data ──────────────────────────────────────────────────────────────

const BATTLE_LOCATIONS: BattleLocation[] = [
  {
    id: 'kargil-1999',
    x: 320,
    y: 110,
    label: 'Kargil',
    year: 1999,
    war: 'Operation Vijay',
    color: '#FF9933',
    description: 'Indian Army recaptured Himalayan peaks from Pakistani intruders.',
  },
  {
    id: 'loc-1965',
    x: 278,
    y: 148,
    label: 'LOC',
    year: 1965,
    war: 'Indo-Pak War 1965',
    color: '#C49F47',
    description: 'Fierce battles along the Line of Control in Kashmir.',
  },
  {
    id: 'rezang-la-1962',
    x: 362,
    y: 122,
    label: 'Rezang La',
    year: 1962,
    war: 'Sino-Indian War',
    color: '#FF6B6B',
    description: '114 Charlie Company soldiers held off a Chinese brigade to the last man.',
  },
  {
    id: 'longewala-1971',
    x: 228,
    y: 272,
    label: 'Longewala',
    year: 1971,
    war: 'Indo-Pak War 1971',
    color: '#C49F47',
    description: 'A company of 120 Indian soldiers repelled a Pakistani armoured column.',
  },
  {
    id: 'dhaka-1971',
    x: 582,
    y: 282,
    label: 'Dhaka',
    year: 1971,
    war: 'Liberation of Bangladesh',
    color: '#138808',
    description: "Pakistan's Eastern Command surrendered — 93,000 PoWs taken.",
  },
];

// ─── War Legend Data ──────────────────────────────────────────────────────────

const WAR_LEGEND = [
  { id: 'op-vijay',  color: '#FF9933', label: 'Operation Vijay (1999)' },
  { id: 'war-1971', color: '#138808', label: 'Indo-Pak War (1971)'    },
  { id: 'war-1965', color: '#C49F47', label: 'Indo-Pak War (1965)'    },
  { id: 'war-1962', color: '#FF6B6B', label: 'Sino-Indian War (1962)' },
];

// ─── India SVG path ───────────────────────────────────────────────────────────

const INDIA_PATH =
  'M 380,30 L 440,35 L 480,60 L 510,45 L 540,55 L 560,80 L 580,70 L 600,90 ' +
  'L 610,120 L 630,110 L 650,130 L 660,155 L 650,180 L 670,200 L 660,230 ' +
  'L 680,250 L 670,280 L 650,290 L 660,320 L 640,340 L 620,330 L 600,350 ' +
  'L 590,380 L 570,400 L 560,430 L 540,450 L 520,480 L 510,510 L 490,530 ' +
  'L 480,560 L 460,580 L 450,610 L 440,640 L 430,660 L 420,680 L 410,700 ' +
  'L 400,720 L 395,740 L 390,720 L 380,700 L 370,680 L 360,660 L 350,640 ' +
  'L 340,610 L 330,580 L 315,560 L 300,540 L 285,510 L 270,490 L 260,460 ' +
  'L 250,430 L 240,400 L 230,370 L 220,340 L 210,310 L 205,280 L 200,250 ' +
  'L 210,220 L 200,200 L 210,170 L 220,150 L 240,130 L 260,120 L 280,100 ' +
  'L 300,85 L 320,70 L 345,50 L 370,35 Z';

// ─── Pulse Ring ───────────────────────────────────────────────────────────────

function PulseRing({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <motion.circle
      r={8}
      fill="none"
      stroke={color}
      strokeWidth={1.5}
      initial={{ scale: 1, opacity: 0.9 }}
      animate={{ scale: 2.8, opacity: 0 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay }}
      style={{ transformOrigin: '0px 0px' }}
    />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function IndiaMap({ onBattleClick, className = '' }: IndiaMapProps) {
  const [hoveredBattle, setHoveredBattle] = useState<BattleLocation | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const handleHoverStart = (battle: BattleLocation) => {
    setHoveredBattle(battle);
    setTooltipVisible(true);
  };

  const handleHoverEnd = () => {
    setTooltipVisible(false);
    setTimeout(() => setHoveredBattle(null), 200);
  };

  return (
    <div className={`relative flex flex-col items-center gap-6 ${className}`}>

      {/* ── Floating Tooltip ── */}
      <AnimatePresence>
        {tooltipVisible && hoveredBattle && (
          <motion.div
            key={hoveredBattle.id}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute top-2 z-50 max-w-[220px] rounded-lg border border-white/10 px-4 py-3 shadow-2xl backdrop-blur-md"
            style={{
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#0a120aee',
              boxShadow: `0 0 24px ${hoveredBattle.color}33, 0 8px 32px #00000088`,
            }}
          >
            <div
              className="mb-1 text-[11px] font-bold uppercase tracking-widest"
              style={{ color: hoveredBattle.color }}
            >
              {hoveredBattle.war}
            </div>
            <div className="mb-1 font-mono text-sm font-semibold text-white/90">
              {hoveredBattle.label} &mdash; {hoveredBattle.year}
            </div>
            <div className="text-[11px] leading-relaxed text-white/55">
              {hoveredBattle.description}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Map Container ── */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {/* Ambient glow behind map */}
        <div
          className="pointer-events-none absolute inset-0 z-0 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse at 50% 50%, #2d4a1e 0%, #0a120a 70%, transparent 100%)',
          }}
        />

        <svg
          viewBox="0 0 800 900"
          width="100%"
          height="auto"
          xmlns="http://www.w3.org/2000/svg"
          className="relative z-10 drop-shadow-2xl"
          aria-label="Political map of India showing key battle locations"
          role="img"
        >
          <defs>
            {/* Gradient fills */}
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#1F3A14" />
              <stop offset="45%"  stopColor="#243D17" />
              <stop offset="100%" stopColor="#162A0E" />
            </linearGradient>

            {/* Grid / texture pattern */}
            <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#3E512B" strokeWidth="0.3" opacity="0.35" />
            </pattern>

            {/* Aksai Chin diagonal hatch */}
            <pattern id="aksaiHatch" x="0" y="0" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="6" stroke="#FF6B6B" strokeWidth="0.8" opacity="0.5" />
            </pattern>

            {/* Drop shadow */}
            <filter id="mapShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="12" floodColor="#0a120a" floodOpacity="0.7" />
            </filter>

            {/* Border glow */}
            <filter id="borderGlow" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Dot glow */}
            <filter id="dotGlow" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Clip path for map */}
            <clipPath id="mainMapClip">
              <path d={INDIA_PATH} />
            </clipPath>
          </defs>

          {/* ═══ BACKGROUND / OCEAN ═══ */}
          <rect width="800" height="900" fill="#050D05" rx="4" />
          <rect width="800" height="900" fill="url(#gridPattern)" opacity="0.15" />

          {/* Ocean labels */}
          <text x="155" y="520" fontSize="11" fontFamily="'Courier New', monospace" fill="#3E6B5E" opacity="0.55" letterSpacing="2">ARABIAN SEA</text>
          <text x="568" y="480" fontSize="11" fontFamily="'Courier New', monospace" fill="#3E6B5E" opacity="0.55" letterSpacing="2">BAY OF</text>
          <text x="568" y="495" fontSize="11" fontFamily="'Courier New', monospace" fill="#3E6B5E" opacity="0.55" letterSpacing="2">BENGAL</text>
          <text x="320" y="800" textAnchor="middle" fontSize="11" fontFamily="'Courier New', monospace" fill="#3E6B5E" opacity="0.50" letterSpacing="2">INDIAN OCEAN</text>

          {/* ═══ INDIA — shadow copy ═══ */}
          <path d={INDIA_PATH} fill="#0a120a" opacity="0.5" transform="translate(6,8)" />

          {/* ═══ INDIA — main fill ═══ */}
          <motion.path
            d={INDIA_PATH}
            fill="url(#mapGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {/* Grid texture clipped to map */}
          <rect width="800" height="900" fill="url(#gridPattern)" clipPath="url(#mainMapClip)" opacity="0.6" />

          {/* Himalayan north — lighter tint */}
          <path
            d="M 370,35 L 440,35 L 480,60 L 510,45 L 540,55 L 560,80 L 600,90 L 610,120 L 650,130 L 660,155 L 640,160 L 600,140 L 560,155 L 520,140 L 480,155 L 440,140 L 400,145 L 360,135 L 320,145 L 290,130 L 260,120 L 280,100 L 300,85 L 320,70 L 345,50 Z"
            fill="#2A4018" opacity="0.5" clipPath="url(#mainMapClip)"
          />

          {/* Deccan plateau — subtle tint */}
          <path
            d="M 280,380 L 320,370 L 380,375 L 440,370 L 500,380 L 520,420 L 510,460 L 490,490 L 460,510 L 430,520 L 395,515 L 360,510 L 320,490 L 295,460 L 275,430 L 260,400 Z"
            fill="#1E3610" opacity="0.35" clipPath="url(#mainMapClip)"
          />

          {/* ═══ GLOWING BORDER — animated draw ═══ */}
          <motion.path
            d={INDIA_PATH}
            fill="none"
            stroke="#5A7A3A"
            strokeWidth="1.5"
            filter="url(#borderGlow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: 'easeInOut' }}
          />
          {/* Crisp top border */}
          <path d={INDIA_PATH} fill="none" stroke="#6B8F45" strokeWidth="0.8" opacity="0.9" />
          {/* Inner offset ring */}
          <motion.path
            d={INDIA_PATH}
            fill="none"
            stroke="#3E512B"
            strokeWidth="0.8"
            opacity="0.4"
            transform="translate(8,8) scale(0.98)"
            style={{ transformOrigin: '395px 395px' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          />

          {/* ═══ LOC BOUNDARY (dashed, animated) ═══ */}
          <motion.path
            d="M 295,75 L 310,90 L 300,110 L 290,130 L 270,150 L 260,175 L 250,200"
            fill="none"
            stroke="#FF9933"
            strokeWidth="1.2"
            strokeDasharray="5,4"
            opacity="0.55"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1.5, duration: 1.5, ease: 'easeInOut' }}
          />
          <text x="231" y="142" fontSize="7" fontFamily="'Courier New', monospace" fill="#FF9933" opacity="0.65" letterSpacing="0.5">LOC</text>

          {/* ═══ LAC BOUNDARY (dashed, animated) ═══ */}
          <motion.path
            d="M 480,60 L 510,45 L 540,55 L 560,80 L 580,70 L 600,90 L 610,120 L 630,110 L 650,130 L 660,155"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="1.2"
            strokeDasharray="4,3"
            opacity="0.45"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2, duration: 1.5, ease: 'easeInOut' }}
          />
          <text x="545" y="68" fontSize="7" fontFamily="'Courier New', monospace" fill="#FF6B6B" opacity="0.65" letterSpacing="0.5">LAC</text>

          {/* ═══ AKSAI CHIN ═══ */}
          <path
            d="M 480,60 L 510,45 L 540,55 L 560,80 L 545,88 L 520,75 L 495,72 L 480,78 Z"
            fill="url(#aksaiHatch)"
            opacity="0.5"
          />
          <path
            d="M 480,60 L 510,45 L 540,55 L 560,80 L 545,88 L 520,75 L 495,72 L 480,78 Z"
            fill="none"
            stroke="#FF6B6B"
            strokeWidth="0.6"
            strokeDasharray="3,2"
            opacity="0.4"
          />
          <text x="512" y="70" textAnchor="middle" fontSize="5.5" fontFamily="'Courier New', monospace" fill="#FF6B6B" opacity="0.55">AKSAI CHIN</text>

          {/* ═══ INTERNAL STATE HINTS ═══ */}
          {/* J&K / Ladakh line */}
          <path d="M 380,70 L 420,80 L 460,78 L 480,90 L 500,100" fill="none" stroke="#3E512B" strokeWidth="0.7" strokeDasharray="4,3" opacity="0.5" />
          {/* Northern belt */}
          <path d="M 208,215 L 280,200 L 360,195 L 440,200 L 520,215 L 580,225" fill="none" stroke="#3E512B" strokeWidth="0.5" strokeDasharray="3,4" opacity="0.3" />
          {/* Deccan boundary */}
          <path d="M 225,340 L 300,330 L 400,328 L 490,335 L 565,345" fill="none" stroke="#3E512B" strokeWidth="0.5" strokeDasharray="3,4" opacity="0.3" />
          {/* North-East hint */}
          <path d="M 590,200 L 610,220 L 640,230 L 660,255 L 650,280 L 620,290" fill="none" stroke="#3E512B" strokeWidth="0.5" strokeDasharray="3,4" opacity="0.4" />

          {/* ═══ ANDAMAN & NICOBAR ISLANDS ═══ */}
          <g opacity="0.9">
            <ellipse cx="690" cy="530" rx="6"   ry="14" fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <ellipse cx="692" cy="558" rx="5"   ry="10" fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <ellipse cx="688" cy="580" rx="5"   ry="9"  fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <ellipse cx="685" cy="598" rx="3"   ry="5"  fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <ellipse cx="683" cy="620" rx="3"   ry="4"  fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <ellipse cx="680" cy="645" rx="4"   ry="7"  fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
          </g>
          <text x="708" y="570" fontSize="6" fontFamily="'Courier New', monospace" fill="#6B8F45" opacity="0.7" letterSpacing="0.3">A &amp; N</text>
          <text x="705" y="579" fontSize="6" fontFamily="'Courier New', monospace" fill="#6B8F45" opacity="0.7" letterSpacing="0.3">ISLANDS</text>
          <rect x="672" y="516" width="54" height="148" fill="none" stroke="#3E512B" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.4" rx="2" />

          {/* ═══ LAKSHADWEEP ISLANDS ═══ */}
          <g opacity="0.85">
            <circle cx="115" cy="490" r="4"   fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <circle cx="108" cy="505" r="3"   fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <circle cx="120" cy="515" r="3.5" fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <circle cx="110" cy="528" r="2.5" fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
            <circle cx="125" cy="536" r="2"   fill="#243D17" stroke="#5A7A3A" strokeWidth="0.8" />
          </g>
          <text x="82" y="495" fontSize="5.8" fontFamily="'Courier New', monospace" fill="#6B8F45" opacity="0.65">LAKSHA-</text>
          <text x="82" y="504" fontSize="5.8" fontFamily="'Courier New', monospace" fill="#6B8F45" opacity="0.65">DWEEP</text>
          <rect x="98" y="480" width="40" height="68" fill="none" stroke="#3E512B" strokeWidth="0.6" strokeDasharray="3,3" opacity="0.35" rx="2" />

          {/* ═══ RIVERS (decorative) ═══ */}
          <path d="M 370,145 Q 410,170 440,180 Q 500,200 540,230 Q 560,250 570,280" fill="none" stroke="#2A5A8A" strokeWidth="0.8" opacity="0.3" />
          <path d="M 340,75 Q 310,100 290,130 Q 270,160 265,200"                   fill="none" stroke="#2A5A8A" strokeWidth="0.7" opacity="0.25" />
          <path d="M 620,150 Q 640,180 630,200 Q 615,220 590,240"                  fill="none" stroke="#2A5A8A" strokeWidth="0.7" opacity="0.25" />

          {/* ═══ MAJOR CITIES ═══ */}
          {([
            { cx: 395, cy: 195, label: 'NEW DELHI', tx: 402, ty: 192 },
            { cx: 335, cy: 465, label: 'MUMBAI',    tx: 342, ty: 462 },
            { cx: 530, cy: 430, label: 'KOLKATA',   tx: 537, ty: 427 },
            { cx: 420, cy: 545, label: 'CHENNAI',   tx: 428, ty: 542 },
            { cx: 395, cy: 490, label: 'HYDRBD',    tx: 402, ty: 487 },
            { cx: 360, cy: 415, label: 'PUNE',      tx: 367, ty: 412 },
          ] as { cx: number; cy: number; label: string; tx: number; ty: number }[]).map((c) => (
            <g key={c.label} opacity="0.45">
              <circle cx={c.cx} cy={c.cy} r={2} fill="#8FB05A" />
              <text x={c.tx} y={c.ty} fontSize="5.5" fontFamily="'Courier New', monospace" fill="#8FB05A" letterSpacing="0.3">{c.label}</text>
            </g>
          ))}

          {/* Capital star */}
          <text x="389" y="200" fontSize="7" fill="#FF9933" opacity="0.7" textAnchor="middle">★</text>

          {/* ═══ BATTLE LOCATION DOTS ═══ */}
          <g filter="url(#dotGlow)">
            {BATTLE_LOCATIONS.map((battle) => (
              <motion.g
                key={battle.id}
                transform={`translate(${battle.x},${battle.y})`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200, delay: 1 }}
                onHoverStart={() => handleHoverStart(battle)}
                onHoverEnd={handleHoverEnd}
                onClick={() => onBattleClick?.(battle.id)}
                style={{ cursor: onBattleClick ? 'pointer' : 'default' }}
                role="button"
                aria-label={`${battle.label} ${battle.year}`}
              >
                {/* Pulse rings */}
                <PulseRing color={battle.color} delay={0}   />
                <PulseRing color={battle.color} delay={0.7} />
                <PulseRing color={battle.color} delay={1.4} />

                {/* Outer ring */}
                <circle r={7} fill="none" stroke={battle.color} strokeWidth={1.5} opacity={0.7} />
                {/* Inner dot */}
                <circle r={4} fill={battle.color} />

                {/* Labels */}
                <text y={19} textAnchor="middle" fontSize="7"   fontFamily="'Courier New', monospace" fill={battle.color} opacity={0.85} letterSpacing="0.3">{battle.label}</text>
                <text y={27} textAnchor="middle" fontSize="6.2" fontFamily="'Courier New', monospace" fill={battle.color} opacity={0.65}>{battle.year}</text>
              </motion.g>
            ))}
          </g>

          {/* ═══ MAP TITLE ═══ */}
          <text x="400" y="868" textAnchor="middle" fontSize="10" fontFamily="'Courier New', monospace" fill="#4A6B2A" letterSpacing="3" opacity="0.7">
            POLITICAL MAP OF INDIA — BATTLES &amp; CONFLICTS
          </text>

          {/* Compass rose */}
          <g transform="translate(730,80)" opacity="0.4">
            <circle r={16} fill="none" stroke="#3E512B" strokeWidth="0.8" />
            <path d="M 0,-14 L 3,-4 L 0,-7 L -3,-4 Z" fill="#8FB05A" />
            <path d="M 0,14  L 3,4  L 0,7  L -3,4  Z" fill="#3E512B" />
            <path d="M 14,0  L 4,3  L 7,0  L 4,-3  Z" fill="#3E512B" />
            <path d="M -14,0 L -4,3 L -7,0 L -4,-3 Z" fill="#3E512B" />
            <text y={-18} textAnchor="middle" fontSize="7" fontFamily="'Courier New', monospace" fill="#8FB05A">N</text>
            <text y={26}  textAnchor="middle" fontSize="6" fontFamily="'Courier New', monospace" fill="#4A6B2A">S</text>
            <text x={20}  y={4} textAnchor="middle" fontSize="6" fontFamily="'Courier New', monospace" fill="#4A6B2A">E</text>
            <text x={-20} y={4} textAnchor="middle" fontSize="6" fontFamily="'Courier New', monospace" fill="#4A6B2A">W</text>
          </g>

          {/* Scale bar */}
          <g transform="translate(60,850)" opacity="0.45">
            <line x1="0"  y1="0" x2="80" y2="0" stroke="#4A6B2A" strokeWidth="1" />
            <line x1="0"  y1="-4" x2="0"  y2="4" stroke="#4A6B2A" strokeWidth="1" />
            <line x1="80" y1="-4" x2="80" y2="4" stroke="#4A6B2A" strokeWidth="1" />
            <line x1="40" y1="-3" x2="40" y2="3" stroke="#4A6B2A" strokeWidth="0.8" />
            <text y={-8}                 fontSize="6" fontFamily="'Courier New', monospace" fill="#4A6B2A">0</text>
            <text x={36} y={-8}          fontSize="6" fontFamily="'Courier New', monospace" fill="#4A6B2A">500</text>
            <text x={68} y={-8}          fontSize="6" fontFamily="'Courier New', monospace" fill="#4A6B2A">1000 km</text>
          </g>
        </svg>
      </motion.div>

      {/* ═══════════════════════════════════════
          LEGEND PANEL
      ═══════════════════════════════════════ */}
      <motion.div
        className="w-full max-w-2xl rounded-xl border border-white/[0.07] px-5 py-4 backdrop-blur-sm"
        style={{
          background: '#0D1A0Acc',
          boxShadow: '0 0 40px #0a120a99, inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #4A6B2A, transparent)' }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#6B8F45]/80">
            Battle Legend
          </span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(to right, transparent, #4A6B2A, transparent)' }} />
        </div>

        {/* Battle entries */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {BATTLE_LOCATIONS.map((battle, i) => (
            <motion.button
              key={battle.id}
              onClick={() => onBattleClick?.(battle.id)}
              className="group flex items-start gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors duration-200 hover:border-white/[0.08] hover:bg-white/[0.03]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              {/* Pulsing color dot */}
              <div className="relative mt-0.5 flex-shrink-0">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: battle.color, boxShadow: `0 0 8px ${battle.color}88` }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: battle.color }}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div
                  className="font-mono text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: battle.color }}
                >
                  {battle.label} &mdash; {battle.year}
                </div>
                <div className="mt-0.5 font-mono text-[9.5px] text-white/40 group-hover:text-white/55">
                  {battle.war}
                </div>
                <div className="mt-1 text-[9px] leading-relaxed text-white/30 group-hover:text-white/40">
                  {battle.description}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* War categories bar */}
        <div className="mt-3 border-t border-white/[0.06] pt-3">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {WAR_LEGEND.map((war) => (
              <div key={war.id} className="flex items-center gap-1.5">
                <div
                  className="h-1.5 w-4 rounded-full"
                  style={{ backgroundColor: war.color, boxShadow: `0 0 6px ${war.color}66` }}
                />
                <span className="font-mono text-[9px] tracking-wide text-white/40">
                  {war.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-3 border-t border-white/[0.05] pt-2.5 text-center font-mono text-[8.5px] uppercase tracking-widest text-white/20">
          Includes J&amp;K &middot; Ladakh &middot; Aksai Chin &middot; NE States &middot; A&amp;N Islands &middot; Lakshadweep
        </div>
      </motion.div>
    </div>
  );
}
