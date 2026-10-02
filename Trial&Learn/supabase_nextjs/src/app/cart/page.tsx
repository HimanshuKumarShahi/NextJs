"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Tag,
  Truck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export default function CartPage() {
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    subtotal,
    discountAmount,
    shippingFee,
    tax,
    total,
    totalItems,
  } = useCart();

  const { success, error: toastError } = useToast();
  const [promoInput, setPromoInput] = useState("");

  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;

    const res = applyCoupon(promoInput);
    if (res.success) {
      success("Promo Code Applied!", res.message);
      setPromoInput("");
    } else {
      toastError("Invalid Code", "Try using code 'SNEAKER15' for 15% off.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-4xl mx-auto">
            👟
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
            Your Bag is Empty
          </h1>
          <p className="text-xs text-zinc-400">
            Looks like you haven&apos;t added any sneakers to your collection yet. Check out the latest heat drops.
          </p>
          <Link
            href="/shoes"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            <span>Explore Kicks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            Shopping Bag
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
            Your Sneaker Bag ({totalItems})
          </h1>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
        >
          Clear All Items
        </button>
      </div>

      {/* Free Shipping Progress Meter */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-bold text-zinc-200">
            <Truck className="w-4 h-4 text-orange-400" />
            {remainingForFreeShipping === 0
              ? "🎉 You've unlocked FREE Express Shipping!"
              : `Add ${formatPrice(remainingForFreeShipping)} more to qualify for Free Shipping`}
          </span>
          <span className="font-bold text-orange-400">
            {Math.round(freeShippingProgress)}%
          </span>
        </div>
        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (Left) */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-900/40 border border-zinc-800/80 rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-5 group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-square w-24 sm:w-28 rounded-2xl overflow-hidden bg-zinc-950/80 shrink-0 border border-zinc-800">
                <Image
                  src={item.shoe.images[0]}
                  alt={item.shoe.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 space-y-1 text-center sm:text-left w-full sm:w-auto">
                <span className="text-[11px] font-black text-orange-400 uppercase tracking-wider">
                  {item.shoe.brand}
                </span>
                <Link href={`/shoes/${item.shoe.slug}`}>
                  <h3 className="text-base font-bold text-white hover:text-orange-400 transition-colors">
                    {item.shoe.name}
                  </h3>
                </Link>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-zinc-400">
                  <span className="bg-zinc-800 px-2 py-0.5 rounded-md text-zinc-300">
                    US {item.size}
                  </span>
                  <span>•</span>
                  <span>{item.color}</span>
                </div>
              </div>

              {/* Quantity Adjuster & Total Price */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-800">
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-xl px-2 py-1 text-xs font-bold">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 text-zinc-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-zinc-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                <div className="text-right min-w-[80px]">
                  <p className="text-base font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                  {item.quantity > 1 && (
                    <p className="text-[10px] text-zinc-500">
                      {formatPrice(item.price)} each
                    </p>
                  )}
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-zinc-500 hover:text-red-400 transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="pt-2">
            <Link
              href="/shoes"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Continue browsing more drops</span>
            </Link>
          </div>
        </div>

        {/* Order Summary & Coupon (Right) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon box */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-5 space-y-3">
            <label className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-orange-400" />
              <span>Have a Promo Code?</span>
            </label>

            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-emerald-950/40 border border-emerald-800/50 rounded-xl p-3 text-xs">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <div>
                    <span className="font-bold text-emerald-300">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[11px] text-emerald-400/80 block">
                      {appliedCoupon.description}
                    </span>
                  </div>
                </div>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-red-400 hover:underline font-semibold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. SNEAKER15"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2 text-xs text-white uppercase placeholder-zinc-600 focus:outline-none focus:border-orange-500 flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase transition-colors"
                >
                  Apply
                </button>
              </form>
            )}
            <p className="text-[11px] text-zinc-500">
              * Try test code <strong className="text-zinc-400">SNEAKER15</strong> for 15% off.
            </p>
          </div>

          {/* Price Breakdown */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-black text-white uppercase tracking-wider">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-xs text-zinc-300 border-b border-zinc-800 pb-4">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-white">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Estimated Sales Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-sm font-bold text-white uppercase">
                Estimated Total
              </span>
              <span className="text-2xl font-black text-white">
                {formatPrice(total)}
              </span>
            </div>

            {/* Checkout CTA */}
            <Link
              href="/checkout"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/25 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>100% Encrypted & Authenticated Transaction</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
