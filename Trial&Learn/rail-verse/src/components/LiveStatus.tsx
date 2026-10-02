"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, TrainFront } from "lucide-react";
import { motion } from "framer-motion";

export default function LiveStatus() {
  const [trainNumber, setTrainNumber] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchLiveStatus = async () => {
    if (!trainNumber) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(`/api/live?trainNumber=${trainNumber}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Failed to fetch Live Status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex gap-2 mb-6">
        <Input 
          placeholder="Enter Train Number (e.g. 12309)" 
          value={trainNumber}
          onChange={(e) => setTrainNumber(e.target.value)}
        />
        <Button onClick={fetchLiveStatus} disabled={loading}>
          {loading ? "Searching..." : "Track Train"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {data && (
        <Card className="shadow-lg overflow-hidden border-t-4 border-t-green-500">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b pb-8">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <TrainFront className="text-green-600" /> 
                  Train {data.trainNumber}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-400">
                  <MapPin size={16} /> Current Station: <span className="font-semibold text-slate-900 dark:text-slate-100">{data.currentStation}</span>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <Badge variant={data.status === "On Time" ? "default" : "destructive"} className="text-sm px-3 py-1 mb-2">
                  {data.status}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Clock size={12} /> Delay: {data.delay}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 space-y-8">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.stations.map((station: any, index: number) => {
                const isCurrent = station.status === "Arrived";
                
                return (
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    key={index} 
                    className="relative pl-6"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 border-white dark:border-slate-950 ${
                      station.passed ? "bg-green-500" : isCurrent ? "bg-blue-500 animate-pulse" : "bg-slate-300 dark:bg-slate-600"
                    }`}></div>

                    <div className={`flex justify-between items-start ${
                      isCurrent ? "bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg -mt-3 -ml-2" : ""
                    }`}>
                      <div>
                        <h4 className={`font-semibold ${isCurrent ? "text-blue-600 dark:text-blue-400" : station.passed ? "text-slate-800 dark:text-slate-200" : "text-slate-500"}`}>
                          {station.name}
                        </h4>
                        <p className="text-sm text-slate-500 mt-1">Status: <span className="font-medium">{station.status}</span></p>
                      </div>
                      <div className="text-right text-sm">
                        <p className="text-slate-500">Arr: <span className="font-medium text-slate-700 dark:text-slate-300">{station.arrival}</span></p>
                        <p className="text-slate-500">Dep: <span className="font-medium text-slate-700 dark:text-slate-300">{station.departure}</span></p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
