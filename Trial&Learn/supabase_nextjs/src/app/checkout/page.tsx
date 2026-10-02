"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Banknote,
  Sparkles,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { formatPrice } from "@/lib/utils";
import { ShippingAddress, Order } from "@/types";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, discountAmount, shippingFee, tax, total, clearCart, appliedCoupon } =
    useCart();
  const { user, profile } = useAuth();
  const { addNotification } = useNotifications();

  // Form State
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: profile?.fullName || "Alex Rivera",
    email: user?.email || "alex.sneakerhead@example.com",
    phone: profile?.phone || "+1 (555) 019-2834",
    street: profile?.address?.street || "742 Evergreen Terrace, Apt 4B",
    city: profile?.address?.city || "Los Angeles",
    state: profile?.address?.state || "CA",
    zipCode: profile?.address?.zipCode || "90001",
    country: "States",
  });

  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi" | "paypal" | "cod">(
    "card"
  );

  // Card form state
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8892");
  const [cardExpiry, setCardExpiry] = useState("09/28");
  const [cardCvc, setCardCvc] = useState("892");
  const [cardName, setCardName] = useState(profile?.fullName || "ALEX RIVERA");

  // UPI state
  const [upiId, setUpiId] = useState("sneakerhead@okaxis");

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);

    setTimeout(() => {
      const orderId = `SNK-${Math.floor(100000 + Math.random() * 900000)}`;
      const newOrder: Order = {
        id: orderId,
        createdAt: new Date().toISOString(),
        status: "processing",
        items: [...items],
        shippingAddress: address,
        paymentMethod,
        subtotal,
        discount: discountAmount,
        discountCode: appliedCoupon?.code,
        shippingFee,
        tax,
        total,
        trackingNumber: `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        estimatedDelivery: "3-5 Business Days",
      };

      // Save order to localStorage
      try {
        const existing = JSON.parse(
          localStorage.getItem("sneakers_orders") || "[]"
        );
        localStorage.setItem(
          "sneakers_orders",
          JSON.stringify([newOrder, ...existing])
        );
      } catch (err) {
        console.error("Failed to save order", err);
      }

      // Trigger notification
      addNotification({
        title: `Order #${orderId} Confirmed! 🎉`,
        message: `We've received your order for ${items.length} pair(s). Physical authenticity verification underway!`,
        type: "order",
        link: "/profile",
      });

      // Confetti burst
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#f97316", "#fbbf24", "#ffffff"],
        });
      } catch {
        // ignore if not supported
      }

      clearCart();
      setIsProcessing(false);
      setCompletedOrder(newOrder);
    }, 1500);
  };

  // If order was just placed successfully, show full confirmation view
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-center space-y-8 animate-in fade-in-50 zoom-in-95">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-2xl shadow-emerald-500/20">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black text-orange-400 uppercase tracking-widest">
            PAYMENT CONFIRMED • ORDER PLACED
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            THANK YOU FOR YOUR PURCHASE!
          </h1>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Order <strong className="text-white font-mono">#{completedOrder.id}</strong> has been secured in the vault. A confirmation receipt and tracking link were sent to your email.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-6 text-left space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-zinc-800 pb-4 text-xs">
            <div>
              <span className="text-zinc-500 block">Tracking ID</span>
              <span className="font-mono text-white font-bold">
                {completedOrder.trackingNumber}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block">Est. Delivery</span>
              <span className="text-emerald-400 font-bold">
                {completedOrder.estimatedDelivery}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 block">Total Charged</span>
              <span className="text-white font-black text-sm">
                {formatPrice(completedOrder.total)}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
              Delivery Address:
            </h3>
            <p className="text-xs text-zinc-400">
              {completedOrder.shippingAddress.fullName} • {completedOrder.shippingAddress.street},{" "}
              {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.state}{" "}
              {completedOrder.shippingAddress.zipCode}
            </p>
          </div>

          <div className="border-t border-zinc-800 pt-4">
            <h3 className="text-xs font-bold text-zinc-300 uppercase tracking-wider mb-3">
              Items Ordered:
            </h3>
            <div className="space-y-2">
              {completedOrder.items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs">
                  <span className="text-zinc-200">
                    {item.quantity}x {item.shoe.name} (US {item.size})
                  </span>
                  <span className="font-semibold text-white">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/profile"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            Track in My Account
          </Link>
          <Link
            href="/shoes"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If cart is empty and user visits checkout directly
  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h1 className="text-2xl font-black text-white uppercase">Your Bag is Empty</h1>
        <p className="text-xs text-zinc-400">Add sneakers to your bag to proceed with checkout.</p>
        <Link
          href="/shoes"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-black text-xs font-bold uppercase"
        >
          <span>Browse Sneakers</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-zinc-900">
        <div>
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">
            SECURE CHECKOUT
          </span>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight mt-1">
            Payment & Shipping
          </h1>
        </div>
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </Link>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Details & Payment */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Shipping Address */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-zinc-800">
              <Truck className="w-5 h-5 text-orange-400" />
              <h2 className="text-sm font-black text-white uppercase tracking-wider">
                1. Shipping Address
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-zinc-300 font-semibold">Full Name</label>
                <input
                  type="text"
                  required
                  value={address.fullName}
                  onChange={(e) =>
                    setAddress({ ...address, fullName: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-semibold">Email</label>
                <input
                  type="email"
                  required
                  value={address.email}
                  onChange={(e) =>
                    setAddress({ ...address, email: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-semibold">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={address.phone}
                  onChange={(e) =>
                    setAddress({ ...address, phone: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-zinc-300 font-semibold">Street Address</label>
                <input
                  type="text"
                  required
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-zinc-300 font-semibold">City</label>
                <input
                  type="text"
                  required
                  value={address.city}
                  onChange={(e) =>
                    setAddress({ ...address, city: e.target.value })
                  }
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold">State</label>
                  <input
                    type="text"
                    required
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-zinc-300 font-semibold">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={address.zipCode}
                    onChange={(e) =>
                      setAddress({ ...address, zipCode: e.target.value })
                    }
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 space-y-6">
            <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Lock className="w-5 h-5 text-orange-400" />
                <h2 className="text-sm font-black text-white uppercase tracking-wider">
                  2. Payment Method
                </h2>
              </div>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Secured
              </span>
            </div>

            {/* Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod("card")}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "card"
                    ? "border-orange-500 bg-orange-500/10 text-white shadow-lg"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <CreditCard className="w-5 h-5 text-orange-400" />
                <span>Credit/Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("upi")}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "upi"
                    ? "border-orange-500 bg-orange-500/10 text-white shadow-lg"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <QrCode className="w-5 h-5 text-amber-400" />
                <span>UPI / QR</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paypal")}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "paypal"
                    ? "border-orange-500 bg-orange-500/10 text-white shadow-lg"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <Sparkles className="w-5 h-5 text-blue-400" />
                <span>PayPal</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("cod")}
                className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === "cod"
                    ? "border-orange-500 bg-orange-500/10 text-white shadow-lg"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:text-white"
                }`}
              >
                <Banknote className="w-5 h-5 text-emerald-400" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Credit Card Input & Realistic Visual Card */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                {/* Visual Card Preview */}
                <div className="relative aspect-[1.8/1] max-w-sm mx-auto rounded-2xl p-5 bg-gradient-to-tr from-zinc-900 via-neutral-800 to-zinc-900 border border-zinc-700 shadow-2xl flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black tracking-widest text-orange-400">
                      SNEAKERS BLACK
                    </span>
                    <span className="text-lg font-bold italic text-white">VISA</span>
                  </div>
                  <div>
                    <span className="text-xs text-zinc-500 block">CARD NUMBER</span>
                    <p className="font-mono text-base sm:text-lg text-white tracking-widest">
                      {cardNumber}
                    </p>
                  </div>
                  <div className="flex justify-between items-end text-xs">
                    <div>
                      <span className="text-[9px] text-zinc-500 block">HOLDER</span>
                      <span className="font-bold text-zinc-200 uppercase">{cardName}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block">EXPIRES</span>
                      <span className="font-mono text-zinc-200">{cardExpiry}</span>
                    </div>
                  </div>
                </div>

                {/* Card Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-zinc-300 font-semibold">Card Number</label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-zinc-300 font-semibold">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white uppercase focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">Expiry</label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-zinc-300 font-semibold">CVC</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="•••"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-white font-mono focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* UPI Option */}
            {paymentMethod === "upi" && (
              <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-3 text-xs">
                <label className="font-semibold text-zinc-200 block">Enter UPI ID</label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="username@bank"
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-xl p-3 text-white focus:outline-none focus:border-orange-500"
                />
                <p className="text-[11px] text-zinc-500">
                  You will receive an instant payment request on Google Pay, PhonePe, or Paytm app.
                </p>
              </div>
            )}

            {/* PayPal */}
            {paymentMethod === "paypal" && (
              <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 text-center space-y-2 text-xs">
                <p className="text-zinc-300">
                  You will be redirected to PayPal to complete your purchase securely.
                </p>
                <span className="text-[11px] text-zinc-500">
                  PayPal Buyer Protection is active for this order.
                </span>
              </div>
            )}

            {/* COD */}
            {paymentMethod === "cod" && (
              <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Banknote className="w-4 h-4" />
                  <span>Cash on Delivery Available</span>
                </div>
                <p className="text-zinc-400 text-[11px]">
                  Please keep exact cash ready upon physical arrival of your authenticated sneakers.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-black text-white uppercase tracking-wider">
              Order Review
            </h2>

            {/* Items mini list */}
            <div className="max-h-48 overflow-y-auto divide-y divide-zinc-800/60 pr-1 space-y-2">
              {items.map((it) => (
                <div key={it.id} className="pt-2 flex items-center gap-3 text-xs">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                    <Image
                      src={it.shoe.images[0]}
                      alt={it.shoe.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{it.shoe.name}</p>
                    <p className="text-[11px] text-zinc-400">
                      US {it.size} • Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="font-semibold text-white">
                    {formatPrice(it.price * it.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-zinc-300 border-t border-zinc-800 pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-emerald-400 font-bold">FREE</span>
                  ) : (
                    formatPrice(shippingFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-baseline border-t border-zinc-800 pt-3">
              <span className="text-sm font-bold text-white uppercase">Total</span>
              <span className="text-2xl font-black text-white">
                {formatPrice(total)}
              </span>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/25 transition-all active:scale-95 disabled:opacity-50"
            >
              {isProcessing ? (
                <span>Securing Kicks & Processing...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Authorize & Pay {formatPrice(total)}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
