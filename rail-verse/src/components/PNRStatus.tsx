"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PNRStatus() {
  const [pnr, setPnr] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPNRDetails = async () => {
    if (!pnr) return;
    setLoading(true);
    setError("");
    setData(null);
    try {
      const res = await fetch(`/api/pnr?pnr=${pnr}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Failed to fetch PNR status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <div className="flex gap-2 mb-6">
        <Input 
          placeholder="Enter 10-digit PNR Number" 
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          maxLength={10}
        />
        <Button onClick={fetchPNRDetails} disabled={loading}>
          {loading ? "Checking..." : "Check Status"}
        </Button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {data && (
        <Card className="shadow-lg border-t-4 border-t-blue-500">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">{data.trainName} ({data.trainNumber})</CardTitle>
                <p className="text-sm text-slate-500 mt-1">{data.source} ➔ {data.destination} | {data.dateOfJourney}</p>
              </div>
              <Badge variant={data.chartStatus === "Chart Prepared" ? "default" : "secondary"}>
                {data.chartStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <h3 className="font-semibold mb-4 text-lg">Passenger Details</h3>
            <div className="space-y-4">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {data.passengers.map((p: any) => (
                <div key={p.passengerId} className="flex justify-between items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <div>
                    <p className="font-medium">Passenger {p.passengerId}</p>
                    <p className="text-sm text-slate-500">{p.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      <span className="text-xs text-slate-500">Booking: {p.bookingStatus}</span>
                      <span>➔</span>
                      <Badge variant={p.currentStatus === "CNF" ? "default" : "destructive"}>{p.currentStatus}</Badge>
                    </div>
                    {p.currentStatus === "CNF" && (
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                        Coach: {p.coach} | Berth: {p.berth}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
