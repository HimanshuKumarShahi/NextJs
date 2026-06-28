"use client";
import { useState } from "react";
import SearchTrain from "@/components/SearchTrain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchTrainDetails = async (trainNo: string) => {
    setLoading(true);
    try {
      // Yeh humari wahi API hai jo MongoDB se data la rahi hai
      const res = await fetch(`/api/trains?query=${trainNo}`);
      const result = await res.json();
      if (result.success) {
        setData(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-10">
      <h1 className="text-center text-4xl font-bold">RailVerse</h1>
      <SearchTrain onSearch={fetchTrainDetails} />

      {loading && <p className="text-center mt-5">Loading...</p>}

      {data && (
        <Card className="mt-10 max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>{data.trainName} ({data.trainNumber})</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Source:</strong> {data.source}</p>
            <p><strong>Destination:</strong> {data.destination}</p>
            {/* Yahan baad mein Routes aur Live Status add karenge */}
          </CardContent>
        </Card>
      )}
    </main>
  );
}