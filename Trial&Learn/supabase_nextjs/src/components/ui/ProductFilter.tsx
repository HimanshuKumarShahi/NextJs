"use client";

import React from "react";
import { Filter, RotateCcw } from "lucide-react";
import { ShoeFilterState } from "@/types";

interface ProductFilterProps {
  filters: ShoeFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ShoeFilterState>>;
  totalResults: number;
}

const BRANDS = ["All", "Nike", "Jordan", "Adidas", "New Balance", "Puma"];
const CATEGORIES = ["All", "Basketball", "Running", "Lifestyle", "Skateboarding"];
const GENDERS = ["All", "Men", "Women", "Unisex"];
const SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

export default function ProductFilter({
  filters,
  setFilters,
  totalResults,
}: ProductFilterProps) {
  const resetFilters = () => {
    setFilters({
      search: "",
      brand: "All",
      category: "All",
      gender: "All",
      minPrice: 0,
      maxPrice: 450,
      size: null,
      sortBy: "featured",
    });
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-orange-400" />
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">
            Filters
          </h3>
          <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">
            {totalResults} items
          </span>
        </div>
        <button
          onClick={resetFilters}
          className="text-xs text-zinc-400 hover:text-orange-400 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          Reset
        </button>
      </div>

      {/* Brand Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
          Brand
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setFilters((prev) => ({ ...prev, brand }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.brand === brand
                  ? "bg-orange-500 text-black shadow-md shadow-orange-500/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
          Category
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                filters.category === cat
                  ? "bg-white text-black"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gender */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
          Gender
        </label>
        <div className="grid grid-cols-4 gap-1.5">
          {GENDERS.map((g) => (
            <button
              key={g}
              onClick={() => setFilters((prev) => ({ ...prev, gender: g }))}
              className={`py-1.5 rounded-xl text-xs font-semibold transition-all text-center ${
                filters.gender === g
                  ? "bg-zinc-200 text-black"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Size (US) */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
            Shoe Size (US)
          </label>
          {filters.size && (
            <button
              onClick={() => setFilters((prev) => ({ ...prev, size: null }))}
              className="text-[11px] text-orange-400 hover:underline"
            >
              Clear
            </button>
          )}
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  size: prev.size === size ? null : size,
                }))
              }
              className={`py-2 rounded-xl text-xs font-bold transition-all ${
                filters.size === size
                  ? "bg-orange-500 text-black shadow-md shadow-orange-500/20"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <label className="font-bold text-zinc-300 uppercase tracking-wider">
            Price Range
          </label>
          <span className="text-orange-400 font-bold">
            ${filters.minPrice} - ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="50"
          max="450"
          step="10"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-orange-500 bg-zinc-800 h-2 rounded-lg cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-zinc-400">
          <span>$50</span>
          <span>$250</span>
          <span>$450</span>
        </div>
      </div>
    </div>
  );
}
