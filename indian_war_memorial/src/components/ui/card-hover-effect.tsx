"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export function HoverEffect({
  items,
  className,
}: {
  items: {
    id?: string;
    title: string;
    description: string;
    link?: string;
    icon?: string;
    year?: string;
    duration?: string;
    theater?: string;
    color?: string;
    medals?: string[];
    quote?: string;
    martyred?: string;
    age?: number;
    regiment?: string;
    rank?: string;
  }[];
  className?: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-6", className)}>
      {items.map((item, idx) => {
        const itemColor = item.color || "#C49F47";
        return (
          <Link
            href={item.link || "#"}
            key={item.title + idx}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full block rounded-3xl"
                  style={{
                    backgroundColor: "rgba(50, 67, 34, 0.25)",
                    border: `1px solid ${itemColor}30`,
                    boxShadow: `0 0 25px ${itemColor}15`,
                  }}
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.1 },
                  }}
                />
              )}
            </AnimatePresence>
            <div
              className="rounded-2xl h-full w-full p-6 overflow-hidden bg-[#0E140B] border border-[#324322]/60 group-hover:border-[#C49F47]/40 relative z-20 transition-all duration-300 shadow-xl"
              style={{
                boxShadow: hoveredIndex === idx ? `0 10px 30px -10px ${itemColor}15` : "none",
              }}
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: itemColor }} />
              
              <div className="relative z-20">
                {/* Year / Icon badge if exists */}
                {(item.year || item.icon) && (
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 font-mono"
                    style={{
                      backgroundColor: `${itemColor}15`,
                      color: itemColor,
                      border: `1px solid ${itemColor}30`,
                    }}
                  >
                    {item.icon && <span>{item.icon}</span>}
                    {item.year && <span>{item.year}</span>}
                  </div>
                )}

                {/* Card Title */}
                <h3 className="text-white font-bold text-lg tracking-wide mt-2 group-hover:text-gold-gradient transition-all duration-300">
                  {item.title}
                </h3>
                
                {/* Rank & Regiment for Heroes */}
                {(item.rank || item.regiment) && (
                  <p className="text-xs font-semibold text-gray-400 mt-1 mb-2">
                    {item.rank} {item.regiment && `• ${item.regiment}`}
                  </p>
                )}

                {/* Card Description */}
                <p className="text-gray-400 tracking-wide leading-relaxed text-sm mt-3">
                  {item.description}
                </p>

                {/* Quote section for Heroes */}
                {item.quote && (
                  <blockquote className="mt-4 pl-3 border-l-2 border-[#C49F47] text-xs italic text-gray-300">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>
                )}

                {/* Medals */}
                {item.medals && item.medals.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {item.medals.map((medal) => (
                      <span
                        key={medal}
                        className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      >
                        🎖️ {medal}
                      </span>
                    ))}
                  </div>
                )}

                {/* Duration & Location for Battles */}
                {(item.duration || item.theater) && (
                  <div className="mt-4 pt-4 border-t border-[#324322]/40 space-y-1.5">
                    {item.duration && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>📅</span>
                        <span>{item.duration}</span>
                      </div>
                    )}
                    {item.theater && (
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>📍</span>
                        <span>{item.theater}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
