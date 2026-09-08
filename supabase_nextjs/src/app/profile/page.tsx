"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  User as UserIcon,
  Package,
  MapPin,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Database,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";

export default function ProfilePage() {
  const { user, profile, signOut, isConfigured, signInDemoUser } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("sneakers_orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        // Initial sample order for display
        const sampleOrder: Order = {
          id: "SNK-829145",
          createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
          status: "shipped",
          items: [
            {
              id: "item-sample-1",
              shoeId: "shoe-1",
              shoe: {
                id: "shoe-1",
                name: "Air Jordan 1 Retro High OG",
                slug: "air-jordan-1-retro-high-og",
                brand: "Jordan",
                category: "basketball",
                gender: "men",
                price: 180,
                images: [
                  "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
                ],
                description: "",
                details: {
                  cushioning: "Air",
                  upper: "Leather",
                  sole: "Rubber",
                  sku: "DZ5485-612",
                  releaseYear: 2023,
                },
                colors: [],
                sizes: [10],
                inStock: true,
                rating: 4.9,
                reviewCount: 342,
              },
              size: 10,
              color: "Chicago Red / White",
              quantity: 1,
              price: 180,
            },
          ],
          shippingAddress: {
            fullName: profile?.fullName || "Alex Rivera",
            email: user?.email || "alex.sneakerhead@example.com",
            phone: "+1 (555) 019-2834",
            street: "742 Evergreen Terrace, Apt 4B",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            country: "United States",
          },
          paymentMethod: "card",
          subtotal: 180,
          discount: 0,
          shippingFee: 0,
          tax: 14.4,
          total: 194.4,
          trackingNumber: "FEDEX-9482710492",
          estimatedDelivery: "Tomorrow by 7 PM",
        };
        setOrders([sampleOrder]);
      }
    } catch {
      setOrders([]);
    }
  }, [profile, user]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-3xl mx-auto">
          👟
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-black text-white uppercase">
            Sign In to View Your Account
          </h1>
          <p className="text-xs text-zinc-400">
            Track previous sneaker orders, manage delivery addresses, and view your verified collection.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/login"
            className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
          >
            Sign In with Email
          </Link>
          <button
            onClick={signInDemoUser}
            className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-all"
          >
            Instant Demo Account (1-Click)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-orange-500 flex items-center justify-center text-black font-black text-2xl shadow-xl shadow-orange-500/20">
            {profile?.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt="Avatar"
                fill
                className="object-cover"
              />
            ) : (
              <span>{profile?.fullName?.charAt(0).toUpperCase() || "S"}</span>
            )}
          </div>
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">
                {profile?.fullName || "Sneakerhead Collector"}
              </h1>
              <span className="text-[10px] bg-orange-500/20 text-orange-400 font-bold px-2 py-0.5 rounded-full border border-orange-500/30">
                VIP COLLECTOR
              </span>
            </div>
            <p className="text-xs text-zinc-400 font-mono">{user.email}</p>
            <p className="text-[11px] text-zinc-500">
              Member since {formatDate(profile?.createdAt || new Date())}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={signOut}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Supabase Status Banner */}
      <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <Database className="w-5 h-5 text-orange-400 shrink-0" />
          <div>
            <p className="font-bold text-white">
              Supabase Backend:{" "}
              {isConfigured ? (
                <span className="text-emerald-400">Connected & Live</span>
              ) : (
                <span className="text-amber-400">Demo Mode Active (Ready for your URL)</span>
              )}
            </p>
            <p className="text-[11px] text-zinc-400">
              {isConfigured
                ? "Your user authentication and sessions are securely stored in Supabase PostgreSQL."
                : "Add your NEXT_PUBLIC_SUPABASE_URL in .env to connect your database schema anytime."}
            </p>
          </div>
        </div>
        {!isConfigured && (
          <span className="text-[10px] bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700">
            schema.sql ready
          </span>
        )}
      </div>

      {/* Orders Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-orange-400" />
            <h2 className="text-lg font-black text-white uppercase tracking-tight">
              Order History ({orders.length})
            </h2>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-6"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-zinc-800 text-xs">
                  <div>
                    <span className="text-zinc-500 block">Order Number</span>
                    <span className="font-mono text-white font-bold text-sm">
                      #{order.id}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Date Placed</span>
                    <span className="text-zinc-300 font-semibold">
                      {formatDate(order.createdAt)}
                    </span>
                  </div>
                  <div>
                    <span className="text-zinc-500 block">Total Amount</span>
                    <span className="text-white font-black text-sm">
                      {formatPrice(order.total)}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        order.status === "delivered"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : order.status === "shipped"
                          ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                          : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Timeline */}
                <div className="bg-zinc-950/80 p-4 rounded-2xl border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-zinc-300 flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-orange-400" />
                      Tracking: <span className="font-mono text-white">{order.trackingNumber || "TRK-EXP8291"}</span>
                    </span>
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      {order.estimatedDelivery || "In Transit"}
                    </span>
                  </div>

                  {/* 4-Step Progress */}
                  <div className="grid grid-cols-4 gap-2 pt-2 text-[10px] text-center font-bold">
                    <div className="space-y-1">
                      <div className="h-1.5 rounded-full bg-orange-500" />
                      <span className="text-orange-400">Order Placed</span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-1.5 rounded-full bg-orange-500" />
                      <span className="text-orange-400">Authenticated</span>
                    </div>
                    <div className="space-y-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          order.status === "shipped" || order.status === "delivered"
                            ? "bg-orange-500"
                            : "bg-zinc-800"
                        }`}
                      />
                      <span
                        className={
                          order.status === "shipped" || order.status === "delivered"
                            ? "text-orange-400"
                            : "text-zinc-600"
                        }
                      >
                        Shipped
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          order.status === "delivered" ? "bg-emerald-500" : "bg-zinc-800"
                        }`}
                      />
                      <span
                        className={
                          order.status === "delivered"
                            ? "text-emerald-400"
                            : "text-zinc-600"
                        }
                      >
                        Delivered
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-xs py-2 border-b border-zinc-800/40 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-950 shrink-0 border border-zinc-800">
                          <Image
                            src={item.shoe.images[0]}
                            alt={item.shoe.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold text-white">{item.shoe.name}</p>
                          <p className="text-[11px] text-zinc-400">
                            Size: US {item.size} • Color: {item.color} • Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center space-y-3">
            <Package className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-sm font-bold text-white">No orders placed yet</h3>
            <p className="text-xs text-zinc-500">
              When you purchase sneakers, you can track live dispatch and verification status here.
            </p>
          </div>
        )}
      </div>

      {/* Saved Addresses & Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <MapPin className="w-4 h-4 text-orange-400" />
            <span>Default Shipping Address</span>
          </div>
          <div className="text-xs text-zinc-400 space-y-1">
            <p className="text-white font-semibold">{profile?.fullName || "Alex Rivera"}</p>
            <p>742 Evergreen Terrace, Apt 4B</p>
            <p>Los Angeles, CA 90001, United States</p>
            <p>Phone: +1 (555) 019-2834</p>
          </div>
        </div>

        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Authenticity Guarantee Protection</span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            All purchases made under your account are protected by our Sneaker Authentication Guarantee. If any item fails verification, you receive an immediate 100% refund.
          </p>
        </div>
      </div>
    </div>
  );
}
