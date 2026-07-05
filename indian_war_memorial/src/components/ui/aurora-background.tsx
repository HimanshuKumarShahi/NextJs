"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export default function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col min-h-screen items-center justify-center bg-[#070B04] text-white transition-colors duration-300",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={cn(
            `
            [--saffron-gradient:radial-gradient(at_0%_0%,rgba(255,153,51,0.08)_0,transparent_50%)]
            [--green-gradient:radial-gradient(at_100%_100%,rgba(19,136,8,0.08)_0,transparent_50%)]
            [--aurora:repeating-linear-gradient(100deg,rgba(50,67,34,0.15)_10%,rgba(196,159,71,0.12)_15%,rgba(69,95,47,0.1)_20%,rgba(14,20,11,0.2)_25%,rgba(50,67,34,0.1)_30%)]
            [background-image:var(--saffron-gradient),var(--green-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,_50%_50%]
            filter blur-[40px]
            after:content-[""] after:absolute after:inset-0
            after:[background-image:var(--saffron-gradient),var(--green-gradient),var(--aurora)]
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed]
            pointer-events-none
            absolute -inset-[10px] opacity-70`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_50%_50%,black_30%,transparent_100%)]`
          )}
        />
      </div>
      <div className="relative z-10 w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
