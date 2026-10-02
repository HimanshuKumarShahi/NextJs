"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { CartItem, Shoe } from "@/types";
import { PROMO_CODES } from "@/lib/mock-data";

interface AppliedCoupon {
  code: string;
  discountPercent: number;
  description: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (shoe: Shoe, size: number, color: string, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  tax: number;
  total: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("sneakers_cart");
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      const storedCoupon = localStorage.getItem("sneakers_coupon");
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.error("Failed to load cart from storage", e);
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem("sneakers_cart", JSON.stringify(items));
        if (appliedCoupon) {
          localStorage.setItem("sneakers_coupon", JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem("sneakers_coupon");
        }
      } catch (e) {
        console.error("Failed to save cart to storage", e);
      }
    }
  }, [items, appliedCoupon, mounted]);

  const addToCart = (
    shoe: Shoe,
    size: number,
    color: string,
    quantity = 1
  ) => {
    const itemId = `${shoe.id}-${size}-${color}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          shoeId: shoe.id,
          shoe,
          size,
          color,
          quantity,
          price: shoe.price,
        },
      ];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const normalized = code.trim().toUpperCase();
    const promo = PROMO_CODES[normalized];

    if (!promo) {
      return { success: false, message: "Invalid promo code" };
    }

    setAppliedCoupon({
      code: normalized,
      discountPercent: promo.discountPercent,
      description: promo.description,
    });
    return { success: true, message: `Coupon applied: ${promo.description}` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const discountAmount = appliedCoupon
    ? (subtotal * appliedCoupon.discountPercent) / 100
    : 0;

  // Free shipping on orders over $150 or if FREESHIP promo
  const shippingFee =
    subtotal === 0 || subtotal >= 150 || appliedCoupon?.code === "FREESHIP"
      ? 0
      : 15;

  const tax = subtotal > 0 ? (subtotal - discountAmount) * 0.08 : 0; // 8% sales tax

  const total = Math.max(0, subtotal - discountAmount + shippingFee + tax);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
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
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
