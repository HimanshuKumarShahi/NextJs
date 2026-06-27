"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ArrowRightLeft, Calendar as CalendarIcon, MapPin, Search, TrainFront } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export default function SearchForm() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState<Date>();

  // Swap stations feature
  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl mt-8">
      {/* Inner Solid Card */}
      <div className="bg-white rounded-[1.5rem] p-3 md:p-4 shadow-inner flex flex-col md:flex-row items-stretch gap-3 relative">
        
        {/* Source Field */}
        <div className="flex-1 flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 hover:border-blue-300 transition-all group">
          <div className="p-3 bg-blue-100/50 rounded-full group-hover:bg-blue-100 transition-colors">
            <TrainFront className="text-blue-600 w-6 h-6" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">From Station</span>
            <input
              type="text"
              placeholder="e.g. NDLS, NEW DELHI"
              value={source}
              onChange={(e) => setSource(e.target.value.toUpperCase())}
              className="bg-transparent text-zinc-900 text-lg md:text-xl font-extrabold outline-none placeholder:text-zinc-300 placeholder:font-semibold uppercase"
            />
          </div>
        </div>

        {/* Floating Swap Button (Absolute on Desktop) */}
        <Button
          variant="outline"
          size="icon"
          onClick={handleSwap}
          className="md:absolute md:left-[33%] md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 z-10 w-12 h-12 rounded-full border-4 border-white bg-zinc-50 hover:bg-blue-50 shadow-md text-blue-600 hover:rotate-180 transition-all duration-500 self-center my-[-10px] md:my-0"
        >
          <ArrowRightLeft className="w-5 h-5" />
        </Button>

        {/* Destination Field */}
        <div className="flex-1 flex items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 hover:border-blue-300 transition-all group">
          <div className="p-3 bg-indigo-100/50 rounded-full group-hover:bg-indigo-100 transition-colors">
            <MapPin className="text-indigo-600 w-6 h-6" />
          </div>
          <div className="flex flex-col w-full">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">To Station</span>
            <input
              type="text"
              placeholder="e.g. MMCT, MUMBAI"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className="bg-transparent text-zinc-900 text-lg md:text-xl font-extrabold outline-none placeholder:text-zinc-300 placeholder:font-semibold uppercase"
            />
          </div>
        </div>

        {/* Real Date Picker */}
        <div className="w-full md:w-[260px]">
          <Popover>
            {/* Fix 1: Removed asChild and replaced inner Button with a styled div */}
            <PopoverTrigger>
              <div
                className={cn(
                  "w-full h-full min-h-[88px] flex justify-start items-center gap-4 bg-zinc-50 p-4 rounded-2xl border border-zinc-100 hover:border-blue-300 transition-all hover:bg-zinc-50 cursor-pointer group",
                  !date && "text-muted-foreground"
                )}
              >
                <div className="p-3 bg-blue-100/50 rounded-full group-hover:bg-blue-100 transition-colors">
                  <CalendarIcon className="text-blue-600 w-6 h-6" />
                </div>
                <div className="flex flex-col items-start w-full">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1">Journey Date</span>
                  <span className={cn("text-lg font-extrabold", date ? "text-zinc-900" : "text-zinc-300")}>
                    {date ? format(date, "dd MMM yyyy") : "Select Date"}
                  </span>
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl border-none shadow-2xl" align="center">
              {/* Fix 2: Removed initialFocus property */}
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-2xl bg-white text-zinc-900 p-4"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Giant Search Button */}
        <Button className="w-full md:w-[200px] h-full min-h-[88px] rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-xl hover:shadow-blue-600/40 transition-all group overflow-hidden relative">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
          <span className="relative flex items-center justify-center text-xl font-bold tracking-wide">
            <Search className="w-6 h-6 mr-3" />
            SEARCH
          </span>
        </Button>

      </div>
    </div>
  );
}