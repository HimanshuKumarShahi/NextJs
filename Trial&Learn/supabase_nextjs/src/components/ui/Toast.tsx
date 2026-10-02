"use client";

import React, { createContext, useContext, useState } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextType {
  toast: (options: { type?: ToastType; title: string; message?: string }) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toast = ({
    type = "info",
    title,
    message,
  }: {
    type?: ToastType;
    title: string;
    message?: string;
  }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const success = (title: string, message?: string) =>
    toast({ type: "success", title, message });

  const error = (title: string, message?: string) =>
    toast({ type: "error", title, message });

  return (
    <ToastContext.Provider value={{ toast, success, error }}>
      {children}
      {/* Toast floating container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom-5",
              t.type === "success" &&
                "bg-zinc-900/90 border-emerald-500/30 text-zinc-100",
              t.type === "error" &&
                "bg-zinc-900/90 border-red-500/30 text-zinc-100",
              t.type === "info" &&
                "bg-zinc-900/90 border-orange-500/30 text-zinc-100"
            )}
          >
            {t.type === "success" && (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            {t.type === "error" && (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            )}
            {t.type === "info" && (
              <Info className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm">
              <p className="font-semibold text-zinc-100">{t.title}</p>
              {t.message && (
                <p className="text-xs text-zinc-400 mt-0.5">{t.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-zinc-400 hover:text-zinc-100 transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
