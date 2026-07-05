import React from "react";
import { cn } from "@/lib/utils";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[20rem] grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  badge,
  badgeColor = "soldier-accent",
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}) {
  return (
    <div
      className={cn(
        "row-span-1 rounded-2xl group/bento hover:shadow-[0_10px_35px_-10px_rgba(196,159,71,0.15)] p-6 bg-[#0E140B] border border-[#324322]/50 justify-between flex flex-col space-y-4 transition-all duration-300 hover:border-[#C49F47]/40",
        className
      )}
    >
      {header && (
        <div className="flex-1 w-full rounded-xl overflow-hidden min-h-[100px] flex items-center justify-center">
          {header}
        </div>
      )}
      <div className="group-hover/bento:translate-x-1 transition-transform duration-200">
        <div className="flex items-center justify-between mb-2">
          {icon && <div className="text-[#C49F47]">{icon}</div>}
          {badge && (
            <span
              className={cn(
                "text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border",
                badgeColor === "saffron" && "bg-orange-500/10 text-orange-500 border-orange-500/20",
                badgeColor === "green" && "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
                badgeColor === "soldier-accent" && "bg-amber-500/10 text-[#C49F47] border-[#C49F47]/20"
              )}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="font-bold text-white mb-2 text-lg font-serif tracking-wide group-hover/bento:text-[#C49F47] transition-colors">
          {title}
        </div>
        <div className="font-normal text-gray-400 text-sm leading-relaxed">
          {description}
        </div>
      </div>
    </div>
  );
}
