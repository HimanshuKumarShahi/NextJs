"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchTrain({ onSearch }: { onSearch: (num: string) => void }) {
  const [query, setQuery] = useState("");

  return (
    <div className="flex gap-2 max-w-md mx-auto mt-10">
      <Input 
        placeholder="Enter Train Number (e.g. 12309)" 
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button onClick={() => onSearch(query)}>Search</Button>
    </div>
  );
}