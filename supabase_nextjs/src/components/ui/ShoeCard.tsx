"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star, Check } from "lucide-react";
import { Shoe } from "@/types";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";

interface ShoeCardProps {
  shoe: Shoe;
  priority?: boolean;
}

export default function ShoeCard({ shoe, priority = false }: ShoeCardProps) {
  const { addToCart } = useCart();
  const { success } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0]);
  const [isAdded, setIsAdded] = useState(false);

  const discount = shoe.originalPrice
    ? calculateDiscountPercentage(shoe.originalPrice, shoe.price)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = shoe.colors[0]?.name || "Default";
    addToCart(shoe, selectedSize, defaultColor, 1);
    setIsAdded(true);
    success("Added to Bag!", `${shoe.name} (US ${selectedSize}) has been added to your cart.`);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative bg-zinc-900/60 border border-zinc-800/80 hover:border-orange-500/40 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-orange-500/5 flex flex-col justify-between">
      {/* Top Media Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950/60 flex items-center justify-center p-6">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-lg">
              -{discount}% OFF
            </span>
          )}
          {shoe.isNew && (
            <span className="bg-orange-500 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-lg">
              NEW DROP
            </span>
          )}
          {shoe.isBestSeller && !shoe.isNew && (
            <span className="bg-amber-400 text-black text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-lg">
              BESTSELLER
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isWishlisted
              ? "bg-red-500/20 text-red-400 border border-red-500/30"
              : "bg-zinc-900/80 text-zinc-400 hover:text-white border border-zinc-800"
          }`}
          aria-label="Add to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-red-500" : ""}`} />
        </button>

        {/* Sneaker Image */}
        <Link href={`/shoes/${shoe.slug}`} className="relative w-full h-full flex items-center justify-center">
          <Image
            src={shoe.images[0]}
            alt={shoe.name}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
      </div>

      {/* Card Info Content */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Brand & Rating */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-orange-400 uppercase tracking-wider">
              {shoe.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>{shoe.rating.toFixed(1)}</span>
              <span className="text-zinc-500 font-normal">({shoe.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <Link href={`/shoes/${shoe.slug}`}>
            <h3 className="font-bold text-white text-base leading-snug group-hover:text-orange-400 transition-colors line-clamp-1">
              {shoe.name}
            </h3>
          </Link>

          {/* Category & Gender */}
          <p className="text-xs text-zinc-400 capitalize mt-1">
            {shoe.category} • {shoe.gender}&apos;s footwear
          </p>

          {/* Quick Size Pills */}
          <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] scrollbar-none">
            <span className="text-zinc-400 font-medium mr-1 text-[10px] uppercase">
              US:
            </span>
            {shoe.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedSize(size);
                }}
                className={`px-2 py-0.5 rounded-md border font-medium transition-colors ${
                  selectedSize === size
                    ? "bg-white text-black border-white"
                    : "bg-zinc-800/80 text-zinc-400 border-zinc-700/60 hover:text-white"
                }`}
              >
                {size}
              </button>
            ))}
            {shoe.sizes.length > 5 && (
              <span className="text-zinc-400 text-[10px]">
                +{shoe.sizes.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & Add to Cart Button */}
        <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-black text-white">
                {formatPrice(shoe.price)}
              </span>
              {shoe.originalPrice && (
                <span className="text-xs text-zinc-400 line-through">
                  {formatPrice(shoe.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-400 font-medium">In Stock</span>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={isAdded}
            className={`px-3.5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md ${
              isAdded
                ? "bg-emerald-600 text-white"
                : "bg-orange-500 hover:bg-orange-600 text-black shadow-orange-500/20 active:scale-95"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
