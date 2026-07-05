"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  outcome: string;
  casualtiesIndia?: string;
  color: string;
  icon?: string;
}

const wars: TimelineEvent[] = [
  {
    year: "1947",
    title: "Indo-Pakistani War",
    description:
      "The first major conflict after Partition. Pakistani tribesman and troops invaded Jammu & Kashmir. Indian forces, airlifted to Srinagar, launched a heroic counter-offensive to protect the nation.",
    outcome: "Ceasefire. UN Resolution. India retains two-thirds of Kashmir.",
    casualtiesIndia: "~1,500 soldiers",
    color: "#FF9933",
    icon: "🪖",
  },
  {
    year: "1962",
    title: "Sino-Indian War",
    description:
      "China launched a massive offensive across the McMahon Line. Despite being outnumbered and outgunned, Indian soldiers like Major Shaitan Singh and Charlie Company at Rezang La fought to the last man.",
    outcome: "China declared ceasefire. India lost territory in Aksai Chin.",
    casualtiesIndia: "~3,000 soldiers",
    color: "#FF6B6B",
    icon: "⚔️",
  },
  {
    year: "1965",
    title: "Indo-Pakistani War",
    description:
      "Operation Gibraltar — Pakistan's attempt to infiltrate Kashmir — was repulsed. The Battle of Chawinda saw one of the largest tank battles since WWII. India's Armed Forces fought with exemplary bravery.",
    outcome: "Tashkent Agreement. Status quo ante bellum.",
    casualtiesIndia: "~3,000 soldiers",
    color: "#C49F47",
    icon: "🛡️",
  },
  {
    year: "1971",
    title: "Liberation War & Indo-Pakistani War",
    description:
      "India's finest military hour. A two-front war that lasted just 13 days. Over 93,000 Pakistani troops surrendered — the largest surrender since WWII. Bangladesh was liberated. A resounding victory.",
    outcome: "Bangladesh liberated. Shimla Agreement signed.",
    casualtiesIndia: "~3,800 soldiers",
    color: "#138808",
    icon: "🏆",
  },
  {
    year: "1984",
    title: "Operation Blue Star & Operation Meghdoot",
    description:
      "Operation Meghdoot secured the Siachen Glacier — the world's highest battlefield. Indian soldiers continue to guard it under extreme conditions to this day.",
    outcome: "India controls the Siachen Glacier.",
    casualtiesIndia: "Ongoing operations",
    color: "#5A753F",
    icon: "🏔️",
  },
  {
    year: "1999",
    title: "Kargil War",
    description:
      "Pakistan's clandestine infiltration into Kargil was met with ferocious resistance. Operation Vijay saw Indian soldiers capture peaks at 18,000 ft. Captain Vikram Batra's immortal words 'Yeh Dil Maange More' echoed across India.",
    outcome: "India recaptured all infiltrated posts. Complete victory.",
    casualtiesIndia: "527 soldiers",
    color: "#FF9933",
    icon: "🦁",
  },
];

function TimelineCard({ event, index }: { event: TimelineEvent; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`relative flex items-center gap-6 lg:gap-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
        className="w-full lg:w-[calc(50%-3rem)] group"
      >
        <div className="relative bg-[#131A0F]/80 backdrop-blur-sm border border-[#3E512B]/40 rounded-2xl p-6 hover:border-[#C49F47]/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(196,159,71,0.1)]">
          {/* Color accent top */}
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
            style={{ background: event.color }}
          />

          {/* Year badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ background: `${event.color}20`, color: event.color, border: `1px solid ${event.color}40` }}
          >
            <span>{event.icon}</span>
            <span>{event.year}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-3 group-hover:text-[#F2F4F0] transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">{event.description}</p>

          <div className="space-y-2 pt-4 border-t border-[#3E512B]/30">
            <div className="flex items-start gap-2">
              <span className="text-xs font-semibold text-[#C49F47] uppercase tracking-wide shrink-0">Outcome:</span>
              <span className="text-xs text-gray-300">{event.outcome}</span>
            </div>
            {event.casualtiesIndia && (
              <div className="flex items-start gap-2">
                <span className="text-xs font-semibold text-[#FF9933] uppercase tracking-wide shrink-0">Martyred:</span>
                <span className="text-xs text-gray-300">{event.casualtiesIndia}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Center dot */}
      <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="relative"
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-lg border-2"
            style={{
              background: `${event.color}20`,
              borderColor: event.color,
              boxShadow: `0 0 20px ${event.color}40`,
            }}
          >
            {event.icon}
          </div>
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: event.color }}
          />
        </motion.div>
      </div>

      {/* Spacer for opposite side */}
      <div className="hidden lg:block w-[calc(50%-3rem)]" />
    </div>
  );
}

export default function HistoricalTimeline() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1006] via-[#0D1509] to-[#0B1006]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-bold text-[#C49F47] uppercase tracking-[0.3em] mb-4">
            Glorious History
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            India&apos;s
            <span className="bg-gradient-to-r from-[#FF9933] via-[#C49F47] to-[#138808] bg-clip-text text-transparent">
              {" "}Wars & Conflicts
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-400 text-base">
            From the plains of Kashmir to the heights of Kargil — a chronicle of courage, sacrifice, and victory.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative space-y-12 lg:space-y-16">
          {/* Center vertical line */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#3E512B] to-transparent" />

          {wars.map((war, i) => (
            <TimelineCard key={war.year + war.title} event={war} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
