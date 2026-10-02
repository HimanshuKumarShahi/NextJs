"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ShoeCard from "@/components/ui/ShoeCard";
import ProductFilter from "@/components/ui/ProductFilter";
import { MOCK_SHOES } from "@/lib/mock-data";
import { ShoeFilterState } from "@/types";
import { SlidersHorizontal, ArrowUpDown, X } from "lucide-react";

function ShoesCatalogContent() {
  const searchParams = useSearchParams();

  const initialBrand = searchParams.get("brand") || "All";
  const initialCategory = searchParams.get("category") || "All";
  const initialGender = searchParams.get("gender") || "All";
  const initialSearch = searchParams.get("search") || "";
  const initialSort = (searchParams.get("sort") as ShoeFilterState["sortBy"]) || "featured";

  const [filters, setFilters] = useState<ShoeFilterState>({
    search: initialSearch,
    brand: initialBrand,
    category: initialCategory,
    gender: initialGender,
    minPrice: 0,
    maxPrice: 450,
    size: null,
    sortBy: initialSort,
  });

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter and sort items
  const filteredShoes = useMemo(() => {
    return MOCK_SHOES.filter((shoe) => {
      // Search
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesName = shoe.name.toLowerCase().includes(query);
        const matchesBrand = shoe.brand.toLowerCase().includes(query);
        const matchesCategory = shoe.category.toLowerCase().includes(query);
        if (!matchesName && !matchesBrand && !matchesCategory) return false;
      }

      // Brand
      if (filters.brand !== "All" && shoe.brand.toLowerCase() !== filters.brand.toLowerCase()) {
        return false;
      }

      // Category
      if (filters.category !== "All" && shoe.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }

      // Gender
      if (filters.gender !== "All") {
        if (shoe.gender !== "unisex" && shoe.gender.toLowerCase() !== filters.gender.toLowerCase()) {
          return false;
        }
      }

      // Size
      if (filters.size !== null && !shoe.sizes.includes(filters.size)) {
        return false;
      }

      // Price
      if (shoe.price < filters.minPrice || shoe.price > filters.maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === "newest") {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      if (filters.sortBy === "price-asc") {
        return a.price - b.price;
      }
      if (filters.sortBy === "price-desc") {
        return b.price - a.price;
      }
      if (filters.sortBy === "rating") {
        return b.rating - a.rating;
      }
      // featured default
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [filters]);

  const activeFilterCount =
    (filters.brand !== "All" ? 1 : 0) +
    (filters.category !== "All" ? 1 : 0) +
    (filters.gender !== "All" ? 1 : 0) +
    (filters.size !== null ? 1 : 0) +
    (filters.search ? 1 : 0) +
    (filters.maxPrice < 450 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-zinc-900">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            AUTHENTIC CATALOG
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight mt-1">
            {filters.search
              ? `Results for "${filters.search}"`
              : filters.brand !== "All"
              ? `${filters.brand} Collection`
              : filters.gender !== "All"
              ? `${filters.gender}'s Footwear`
              : "All Sneakers & Grails"}
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Showing {filteredShoes.length} authenticated models
          </p>
        </div>

        {/* Sorting Dropdown & Mobile Filter Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold text-white flex items-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4 text-orange-400" />
            <span>Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          </button>

          <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-semibold">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-400 hidden sm:inline">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as ShoeFilterState["sortBy"],
                }))
              }
              className="bg-transparent text-white focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-zinc-900 text-white">
                Featured
              </option>
              <option value="newest" className="bg-zinc-900 text-white">
                New Releases
              </option>
              <option value="price-asc" className="bg-zinc-900 text-white">
                Price: Low to High
              </option>
              <option value="price-desc" className="bg-zinc-900 text-white">
                Price: High to Low
              </option>
              <option value="rating" className="bg-zinc-900 text-white">
                Highest Rated
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2 py-4">
          <span className="text-xs text-zinc-400">Active filters:</span>
          {filters.brand !== "All" && (
            <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded-full">
              Brand: {filters.brand}
              <button
                onClick={() => setFilters((p) => ({ ...p, brand: "All" }))}
                className="hover:text-red-400 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.category !== "All" && (
            <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded-full">
              Category: {filters.category}
              <button
                onClick={() => setFilters((p) => ({ ...p, category: "All" }))}
                className="hover:text-red-400 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.gender !== "All" && (
            <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded-full">
              Gender: {filters.gender}
              <button
                onClick={() => setFilters((p) => ({ ...p, gender: "All" }))}
                className="hover:text-red-400 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.size !== null && (
            <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded-full">
              Size: US {filters.size}
              <button
                onClick={() => setFilters((p) => ({ ...p, size: null }))}
                className="hover:text-red-400 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.search && (
            <span className="inline-flex items-center gap-1 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs px-3 py-1 rounded-full">
              &quot;{filters.search}&quot;
              <button
                onClick={() => setFilters((p) => ({ ...p, search: "" }))}
                className="hover:text-red-400 ml-1"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        {/* Desktop Filter Sidebar */}
        <aside className="hidden lg:block lg:col-span-1">
          <ProductFilter
            filters={filters}
            setFilters={setFilters}
            totalResults={filteredShoes.length}
          />
        </aside>

        {/* Mobile Filter Sheet */}
        {mobileFiltersOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden flex justify-end">
            <div className="w-full max-w-sm bg-zinc-950 h-full p-6 overflow-y-auto border-l border-zinc-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                <span className="font-bold text-white text-sm">Filters</span>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <ProductFilter
                filters={filters}
                setFilters={setFilters}
                totalResults={filteredShoes.length}
              />
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="w-full py-3 rounded-xl bg-orange-500 text-black font-bold text-xs uppercase"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredShoes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredShoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoe={shoe} />
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center space-y-4">
              <span className="text-4xl block">👟</span>
              <h3 className="text-lg font-bold text-white">No sneakers found</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                We couldn&apos;t find any sneakers matching your current filter criteria. Try resetting filters or adjusting your search term.
              </p>
              <button
                onClick={() =>
                  setFilters({
                    search: "",
                    brand: "All",
                    category: "All",
                    gender: "All",
                    minPrice: 0,
                    maxPrice: 450,
                    size: null,
                    sortBy: "featured",
                  })
                }
                className="px-6 py-2.5 rounded-xl bg-orange-500 text-black text-xs font-bold uppercase tracking-wider"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShoesPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-24 text-center text-zinc-400">
          Loading sneakers vault...
        </div>
      }
    >
      <ShoesCatalogContent />
    </Suspense>
  );
}
