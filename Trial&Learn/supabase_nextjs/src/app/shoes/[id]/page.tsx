"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingBag,
  Zap,
  Check,
  ArrowLeft,
  Ruler,
  X,
  Share2,
} from "lucide-react";
import { MOCK_SHOES } from "@/lib/mock-data";
import { formatPrice, calculateDiscountPercentage } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/ui/Toast";
import ShoeCard from "@/components/ui/ShoeCard";

export default function ShoeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { addToCart } = useCart();
  const { success } = useToast();

  // Find shoe by id or slug
  const shoe =
    MOCK_SHOES.find(
      (s) => s.slug === resolvedParams.id || s.id === resolvedParams.id
    ) || MOCK_SHOES[0];

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<number>(shoe.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(
    shoe.colors[0]?.name || "Original"
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const discount = shoe.originalPrice
    ? calculateDiscountPercentage(shoe.originalPrice, shoe.price)
    : 0;

  const handleAddToCart = () => {
    addToCart(shoe, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    success(
      "Added to Bag!",
      `${quantity}x ${shoe.name} (US ${selectedSize}) added to cart.`
    );
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(shoe, selectedSize, selectedColor, quantity);
    router.push("/checkout");
  };

  const relatedShoes = MOCK_SHOES.filter(
    (s) => s.id !== shoe.id && s.brand === shoe.brand
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-16">
      {/* Back link */}
      <div>
        <Link
          href="/shoes"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all sneakers</span>
        </Link>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Gallery Col (Left) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl flex items-center justify-center p-8 group">
            {discount > 0 && (
              <span className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-lg">
                -{discount}% OFF
              </span>
            )}
            <Image
              src={shoe.images[selectedImage] || shoe.images[0]}
              alt={shoe.name}
              fill
              priority
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Thumbnails */}
          {shoe.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {shoe.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImage === idx
                      ? "border-orange-500 scale-95 shadow-md shadow-orange-500/20"
                      : "border-zinc-800 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Specs & Craftsmanship details */}
          <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 p-6 space-y-4 mt-8">
            <h3 className="font-bold text-white text-sm uppercase tracking-wider">
              Technical Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 block mb-1">Cushioning</span>
                <span className="text-zinc-200 font-semibold">{shoe.details.cushioning}</span>
              </div>
              <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 block mb-1">Upper Construction</span>
                <span className="text-zinc-200 font-semibold">{shoe.details.upper}</span>
              </div>
              <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 block mb-1">Outsole</span>
                <span className="text-zinc-200 font-semibold">{shoe.details.sole}</span>
              </div>
              <div className="bg-zinc-900/80 p-3.5 rounded-xl border border-zinc-800/80">
                <span className="text-zinc-500 block mb-1">Style Code (SKU)</span>
                <span className="text-zinc-200 font-semibold font-mono">{shoe.details.sku}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Purchase Actions (Right) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs">
              <span className="font-black text-orange-400 uppercase tracking-widest">
                {shoe.brand}
              </span>
              <div className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{shoe.rating}</span>
                <span className="text-zinc-500">({shoe.reviewCount} reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-2">
              {shoe.name}
            </h1>

            <p className="text-xs text-zinc-400 mt-1 capitalize">
              {shoe.category} • {shoe.gender}&apos;s Edition • Released {shoe.details.releaseYear}
            </p>

            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-black text-white">
                {formatPrice(shoe.price)}
              </span>
              {shoe.originalPrice && (
                <span className="text-sm text-zinc-500 line-through">
                  {formatPrice(shoe.originalPrice)}
                </span>
              )}
              {discount > 0 && (
                <span className="text-xs text-emerald-400 font-bold">
                  Save {formatPrice(shoe.originalPrice! - shoe.price)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs leading-relaxed text-zinc-300">
            {shoe.description}
          </p>

          {/* Colorways */}
          {shoe.colors.length > 0 && (
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white uppercase tracking-wider">
                  Colorway: <span className="text-orange-400">{selectedColor}</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                {shoe.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      selectedColor === c.name
                        ? "border-orange-500 bg-orange-500/10 text-white"
                        : "border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-zinc-700"
                      style={{ backgroundColor: c.hex }}
                    />
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white uppercase tracking-wider">
                Select Size (US Men)
              </span>
              <button
                onClick={() => setSizeGuideOpen(true)}
                className="text-orange-400 hover:underline flex items-center gap-1 text-[11px]"
              >
                <Ruler className="w-3 h-3" /> Size Guide
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
              {shoe.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 rounded-xl text-xs font-black transition-all ${
                    selectedSize === size
                      ? "bg-white text-black shadow-lg shadow-white/10 scale-95"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-600"
                  }`}
                >
                  US {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Stepper & Buttons */}
          <div className="pt-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-bold">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-zinc-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-3 text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-zinc-400 hover:text-white"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
                  isAdded
                    ? "bg-emerald-600 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-black shadow-orange-500/20 active:scale-95"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added To Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add To Bag • {formatPrice(shoe.price * quantity)}</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <Zap className="w-4 h-4 text-orange-400" />
              <span>Instant Checkout</span>
            </button>
          </div>

          {/* Guarantees Box */}
          <div className="border-t border-zinc-800 pt-6 space-y-3 text-xs text-zinc-400">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Every shoe is verified 100% authentic by sneaker specialists</span>
            </div>
            <div className="flex items-center gap-3">
              <Truck className="w-4 h-4 text-orange-400 shrink-0" />
              <span>Dispatched within 24 hours with trackable express courier</span>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="w-4 h-4 text-amber-400 shrink-0" />
              <span>30-Day returns & size exchange policy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section className="pt-12 border-t border-zinc-900 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white uppercase tracking-tight">
              Verified Buyer Reviews ({shoe.reviewCount})
            </h2>
            <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
              <div className="flex items-center text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span>4.9 out of 5 stars based on verified collectors</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(shoe.reviews || [
            {
              id: "rev-def-1",
              userName: "Jordan B.",
              rating: 5,
              date: "2024-03-01",
              title: "Exceptional build quality and comfort",
              comment: "These exceeded expectations. Cushioning is unreal and materials are definitely genuine. Shipping was fast too!",
              verified: true,
            },
            {
              id: "rev-def-2",
              userName: "Samantha T.",
              rating: 5,
              date: "2024-02-14",
              title: "Fire colorway! Fits true to size",
              comment: "Look even cleaner in person. Already got so many compliments at school. Will buy again from SNEAKERS.",
              verified: true,
            },
          ]).map((r) => (
            <div
              key={r.id}
              className="bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-5 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-white">
                  <span>{r.userName}</span>
                  {r.verified && (
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Check className="w-2.5 h-2.5" /> Verified Buyer
                    </span>
                  )}
                </div>
                <span className="text-[11px] text-zinc-500">{r.date}</span>
              </div>
              <div className="flex items-center text-amber-400">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-zinc-200">{r.title}</p>
              <p className="text-xs text-zinc-400 leading-relaxed">{r.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedShoes.length > 0 && (
        <section className="pt-12 border-t border-zinc-900 space-y-6">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedShoes.map((item) => (
              <ShoeCard key={item.id} shoe={item} />
            ))}
          </div>
        </section>
      )}

      {/* Size Guide Modal */}
      {sizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
              <h3 className="text-sm font-black text-white uppercase">
                Sneakers Sizing Chart
              </h3>
              <button
                onClick={() => setSizeGuideOpen(false)}
                className="p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-zinc-300 overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-orange-400 font-bold">
                    <th className="py-2">US Men</th>
                    <th className="py-2">US Women</th>
                    <th className="py-2">UK</th>
                    <th className="py-2">EU</th>
                    <th className="py-2">CM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {[
                    [7.0, 8.5, 6.0, 40.0, 25.0],
                    [7.5, 9.0, 6.5, 40.5, 25.5],
                    [8.0, 9.5, 7.0, 41.0, 26.0],
                    [8.5, 10.0, 7.5, 42.0, 26.5],
                    [9.0, 10.5, 8.0, 42.5, 27.0],
                    [9.5, 11.0, 8.5, 43.0, 27.5],
                    [10.0, 11.5, 9.0, 44.0, 28.0],
                    [10.5, 12.0, 9.5, 44.5, 28.5],
                    [11.0, 12.5, 10.0, 45.0, 29.0],
                    [12.0, 13.5, 11.0, 46.0, 30.0],
                  ].map(([usM, usW, uk, eu, cm], idx) => (
                    <tr key={idx} className="hover:bg-zinc-800/30">
                      <td className="py-2 font-bold text-white">{usM}</td>
                      <td className="py-2">{usW}</td>
                      <td className="py-2">{uk}</td>
                      <td className="py-2">{eu}</td>
                      <td className="py-2">{cm} cm</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-zinc-500">
              * Most Nike & Jordan models fit true to size. For wider feet, consider sizing up by 0.5.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
