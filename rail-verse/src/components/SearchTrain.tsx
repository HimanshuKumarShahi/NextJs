"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Navigation2, ArrowRightLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchTrain() {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [trains, setTrains] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  const fetchTrainDetails = async () => {
    if (!source || !destination) {
      setError("Please enter both Source and Destination.");
      return;
    }
    setLoading(true);
    setError("");
    setTrains([]);
    try {
      const res = await fetch(`/api/trains?source=${source}&destination=${destination}`);
      const result = await res.json();
      if (result.success && result.data.length > 0) {
        setTrains(result.data);
      } else {
        setError(result.message || "No trains found for this route.");
      }
    } catch {
      setError("Failed to fetch train details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col sm:flex-row items-center gap-2 mb-8 w-full max-w-2xl">
        <Input 
          placeholder="From (e.g. NDLS)" 
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="uppercase"
        />
        <Button variant="outline" size="icon" onClick={handleSwap} className="shrink-0 rounded-full h-10 w-10 border-slate-300 dark:border-slate-700">
          <ArrowRightLeft size={16} className="text-slate-500" />
        </Button>
        <Input 
          placeholder="To (e.g. PNBE)" 
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="uppercase"
        />
        <Button onClick={fetchTrainDetails} disabled={loading} className="w-full sm:w-auto mt-2 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white">
          {loading ? "Searching..." : "Search"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="w-full space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {trains.map((data: any, idx: number) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="shadow-sm hover:shadow-md transition-shadow border-l-4 border-l-blue-500 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="text-lg sm:text-xl text-slate-800 dark:text-slate-100 flex items-center gap-2">
                      {data.trainName} <span className="text-sm font-normal text-slate-500">({data.trainNumber})</span>
                    </CardTitle>
                    <div className="flex gap-1 mt-2">
                      {data.days.map((day: string, i: number) => (
                        <span key={i} className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-medium ${
                          ['S', 'S'].includes(day) && i >= 5 ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        }`}>
                          {day}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-0">
                    {data.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-100 dark:border-slate-800 mt-2">
                  <div className="text-center w-1/3">
                    <p className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200">{data.source}</p>
                    <p className="text-sm font-medium mt-1 flex items-center justify-center gap-1 text-slate-500">
                      <Clock size={14} /> {data.departureTime}
                    </p>
                  </div>
                  
                  <div className="flex-1 flex flex-col items-center px-2">
                    <Navigation2 className="text-blue-400 rotate-90 mb-1" size={20} />
                    <div className="w-full h-px bg-slate-300 dark:bg-slate-700 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 bg-slate-50 dark:bg-slate-950 text-[10px] sm:text-xs text-slate-400 rounded-full border border-slate-200 dark:border-slate-700">
                        View Route
                      </div>
                    </div>
                  </div>

                  <div className="text-center w-1/3">
                    <p className="text-2xl sm:text-3xl font-bold text-slate-700 dark:text-slate-200">{data.destination}</p>
                    <p className="text-sm font-medium mt-1 flex items-center justify-center gap-1 text-slate-500">
                      <Clock size={14} /> {data.arrivalTime}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}