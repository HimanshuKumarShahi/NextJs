"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  outcome: string;
  casualtiesIndia?: string;
  color: string;
  icon?: string;
}

export const WARS: TimelineEvent[] = [
  {
    id: "kashmir-1947",
    year: "1947",
    title: "Indo-Pakistani War of 1947",
    description:
      "Following Partition, Pakistani-backed tribesmen and troops invaded Jammu & Kashmir. Indian soldiers were airlifted to Srinagar at short notice and launched a decisive counter-offensive to protect Kashmir.",
    outcome: "Ceasefire brokered. UN Line of Control established. India secured 2/3rds of Kashmir including Srinagar Valley, Jammu, and Ladakh.",
    casualtiesIndia: "~1,500 soldiers martyred",
    color: "#FF9933",
    icon: "🪖",
  },
  {
    id: "rezang-la-1962",
    year: "1962",
    title: "Sino-Indian War (Rezang La)",
    description:
      "China launched a massive offensive across the border. At Rezang La in Ladakh, 120 soldiers of 13 Kumaon led by Major Shaitan Singh fought to the last man, last round, inflicting heavy casualties on thousands of Chinese troops.",
    outcome: "China declared ceasefire. India lost territory in Aksai Chin, but the bravery at Rezang La prevented further incursions.",
    casualtiesIndia: "~3,000 soldiers martyred",
    color: "#FF6B6B",
    icon: "⚔️",
  },
  {
    id: "loc-1965",
    year: "1965",
    title: "Indo-Pakistani War of 1965",
    description:
      "Pakistan launched Operation Gibraltar to infiltrate Kashmir. Indian forces retaliated, launching counter-attacks across the international border. The Battle of Asal Uttar and the Haji Pir capture demonstrated unmatched military strategy.",
    outcome: "UN ceasefire. Status quo ante bellum. Tashkent Agreement signed, restoring territories.",
    casualtiesIndia: "~3,000 soldiers martyred",
    color: "#C49F47",
    icon: "🛡️",
  },
  {
    id: "dhaka-1971",
    year: "1971",
    title: "Liberation War & Indo-Pak War",
    description:
      "Fought on two fronts, this war lasted just 13 days and culminated in the liberation of Bangladesh. The Battle of Longewala in the west and the rapid advance to Dhaka in the east forced the surrender of 93,000 Pakistani troops.",
    outcome: "Resounding Indian Victory. Bangladesh liberated. Shimla Agreement signed.",
    casualtiesIndia: "~3,844 soldiers martyred",
    color: "#138808",
    icon: "🏆",
  },
  {
    id: "siachen-1984",
    year: "1984",
    title: "Operation Meghdoot (Siachen)",
    description:
      "India launched a pre-emptive heliborne operation to secure the Siachen Glacier in Ladakh, beating Pakistan by a few days. Guarding Siachen at 20,000+ feet remains one of the military's most challenging vigils.",
    outcome: "India established complete control over the Siachen Glacier and all major passes.",
    casualtiesIndia: "Ongoing high-altitude vigil",
    color: "#5A753F",
    icon: "🏔️",
  },
  {
    id: "kargil-1999",
    year: "1999",
    title: "Kargil War (Operation Vijay)",
    description:
      "Pakistan clandestinely occupied high-altitude posts in Kargil. Under direct artillery fire, Indian troops scaled vertical cliffs up to 18,000 feet, recapturing Tiger Hill and Tololing. Captain Vikram Batra and Manoj Pandey became legends.",
    outcome: "Complete victory. India recaptured all occupied posts. Pakistan withdrew.",
    casualtiesIndia: "527 soldiers martyred",
    color: "#FF9933",
    icon: "🦁",
  },
];

interface HistoricalTimelineProps {
  activeBattleId?: string;
  onEventInView?: (eventId: string) => void;
  isDashboard?: boolean;
}

function TimelineCard({
  event,
  index,
  isActive,
  onInView,
  isDashboard = false,
}: {
  event: TimelineEvent;
  index: number;
  isActive: boolean;
  onInView?: (id: string) => void;
  isDashboard?: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <div 
      className={`relative flex items-center gap-6 lg:gap-0 ${
        isDashboard 
          ? "lg:flex-row-reverse" 
          : isLeft 
            ? "lg:flex-row" 
            : "lg:flex-row-reverse"
      }`}
    >
      {/* Card Content wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        onViewportEnter={() => onInView?.(event.id)}
        transition={{ duration: 0.6 }}
        className={`w-full ${isDashboard ? "lg:w-full" : "lg:w-[calc(50%-3.5rem)]"} group`}
      >
        <div 
          className={`relative rounded-2xl p-6 transition-all duration-500 border ${
            isActive
              ? "bg-[#0E140B] border-[#C49F47] shadow-[0_0_30px_rgba(196,159,71,0.12)]"
              : "bg-[#0E140B]/60 border-[#324322]/40 hover:border-[#C49F47]/30 hover:bg-[#0E140B]/85"
          }`}
          id={`timeline-card-${event.id}`}
        >
          {/* Top border color strip */}
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ background: event.color }}
          />

          {/* Year and Badge */}
          <div className="flex items-center justify-between mb-4">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold font-mono"
              style={{
                background: `${event.color}15`,
                color: event.color,
                border: `1px solid ${event.color}35`,
              }}
            >
              <span>{event.icon}</span>
              <span>{event.year}</span>
            </div>
            {isActive && (
              <span className="text-[9px] uppercase font-bold tracking-widest text-[#C49F47] animate-pulse">
                Active on Map
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-[#C49F47] transition-colors">
            {event.title}
          </h3>
          
          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-4">
            {event.description}
          </p>

          {/* Info footer details */}
          <div className="space-y-2 pt-4 border-t border-[#324322]/40 text-xs">
            <div className="flex items-start gap-2">
              <span className="font-bold text-[#C49F47] uppercase tracking-wide shrink-0">Resolution:</span>
              <span className="text-gray-300">{event.outcome}</span>
            </div>
            {event.casualtiesIndia && (
              <div className="flex items-start gap-2">
                <span className="font-bold text-orange-500 uppercase tracking-wide shrink-0">Sacrifice:</span>
                <span className="text-gray-300 font-medium">{event.casualtiesIndia}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Central node on desktop */}
      {!isDashboard && (
        <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
          <motion.div
            className="relative"
            animate={{ scale: isActive ? 1.15 : 1 }}
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center text-md shadow-lg border-2 transition-all ${
                isActive 
                  ? "bg-[#0E140B] border-[#C49F47] scale-110" 
                  : "bg-[#0E140B] border-[#324322]"
              }`}
              style={{
                boxShadow: isActive ? `0 0 20px ${event.color}50` : "none",
              }}
            >
              {event.icon}
            </div>
            {isActive && (
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-25"
                style={{ background: event.color }}
              />
            )}
          </motion.div>
        </div>
      )}

      {/* Spacing spacer */}
      {!isDashboard && <div className="hidden lg:block w-[calc(50%-3.5rem)]" />}
    </div>
  );
}

export default function HistoricalTimeline({
  activeBattleId = "",
  onEventInView,
  isDashboard = false,
}: HistoricalTimelineProps) {
  return (
    <section className={`relative overflow-hidden ${isDashboard ? "py-4" : "py-24 px-4 sm:px-6 lg:px-8"}`}>
      {!isDashboard && (
        <>
          {/* Ambient section backgrounds */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B04] via-[#0E140B] to-[#070B04]" />
          <div className="absolute inset-0 bg-dot-olive opacity-20 pointer-events-none" />
        </>
      )}

      <div className="relative max-w-6xl mx-auto z-10">
        
        {/* Section Header */}
        {!isDashboard && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <span className="inline-block text-xs font-bold text-[#C49F47] uppercase tracking-[0.25em] mb-4">
              Glorious History
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-black text-white mb-4 uppercase tracking-wider">
              India&apos;s
              <span className="text-tricolor-gradient">
                {" "}Wars & Conflicts
              </span>
            </h2>
            <div className="h-[2px] w-24 bg-gradient-to-r from-transparent via-[#C49F47]/50 to-transparent mx-auto mb-6" />
            <p className="max-w-2xl mx-auto text-sm text-gray-400 leading-relaxed">
              From the plains of Kashmir to the frozen peaks of Siachen and the heights of Kargil — a timeline of courage, sacrifice, and ultimate victory.
            </p>
          </motion.div>
        )}

        {/* Timeline Line & Grid container */}
        <div className="relative space-y-12 lg:space-y-16">
          
          {/* Central vertical line on full view */}
          {!isDashboard && (
            <div className="hidden lg:block absolute left-1/2 -translate-x-[1px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-transparent via-[#324322] to-transparent" />
          )}

          {WARS.map((war, i) => (
            <TimelineCard
              key={war.id}
              event={war}
              index={i}
              isActive={activeBattleId === war.id}
              onInView={onEventInView}
              isDashboard={isDashboard}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
