import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "@/components/ui/Spotlight";

function HeroScetion() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0">
      <div className="p-4 relative z-10 w-full text-center">
        
        <h1>Master the Art of Music</h1>
        <p>
          Divide into our comprehensive music courses and Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Tempore, est architecto. Nemo ipsum
          eaque velit at temporibus reprehenderit quos ex?Lorem ipsum dolor sit
          amet.
        </p>
        <div className="mt-4">
          <Link href={"/courses"}>Explore Courses</Link>
        </div>
      </div>
    </div>
  );
}

export default HeroScetion;
