"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export default function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
      }
    };
    
    // Initial size
    handleResize();

    // Create resize observer
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Spring animations for a smoother scroll behavior
  const ySpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const y = useTransform(ySpring, [0, 1], [0, svgHeight]);

  return (
    <div ref={ref} className={cn("relative w-full max-w-7xl mx-auto flex gap-6 md:gap-10", className)}>
      {/* Scroll indicator beam */}
      <div className="relative w-8 shrink-0 hidden md:block">
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#324322] via-[#324322]/20 to-transparent" />
        
        {/* Glow indicator line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#FF9933] via-[#C49F47] to-[#138808]"
          style={{
            height: y,
            boxShadow: "0 0 10px rgba(196, 159, 71, 0.4)",
          }}
        />

        {/* Floating pulse marker */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#C49F47] border-2 border-white flex items-center justify-center shadow-lg"
          style={{
            top: y,
            boxShadow: "0 0 15px #C49F47",
          }}
        >
          <div className="w-1.5 h-1.5 bg-[#070B04] rounded-full" />
        </motion.div>
      </div>

      {/* Content wrapper */}
      <div ref={contentRef} className="flex-1 w-full min-w-0">
        {children}
      </div>
    </div>
  );
}
