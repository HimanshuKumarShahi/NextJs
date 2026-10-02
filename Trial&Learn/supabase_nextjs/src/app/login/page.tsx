"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, signInDemoUser, isConfigured } = useAuth();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMessage(error.message);
        toastError("Login Failed", error.message);
      } else {
        success("Welcome Back!", "Successfully signed in to your account.");
        router.push("/profile");
      }
    } catch {
      setErrorMessage("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    signInDemoUser();
    success("Signed in as Demo User", "Welcome, Alex Rivera!");
    router.push("/profile");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-black font-black text-2xl flex items-center justify-center mx-auto shadow-xl shadow-orange-500/20">
            ⚡
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tight">
            Sign In to SNEAKERS
          </h1>
          <p className="text-xs text-zinc-400">
            Access your order tracking, grail wishlist, and exclusive drop access
          </p>
        </div>

        {/* Demo Quick-Fill Box */}
        <div className="bg-zinc-900/60 border border-orange-500/30 rounded-2xl p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-orange-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Instant 1-Click Access
            </span>
            <span className="text-[10px] text-zinc-400">
              {isConfigured ? "Supabase Connected" : "Local Demo Mode"}
            </span>
          </div>
          <p className="text-zinc-400 text-[11px]">
            Want to test without typing? Click below to instantly log in with pre-filled test credentials.
          </p>
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-2.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/40 text-orange-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Log In as Demo Collector (Alex Rivera)</span>
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {errorMessage && (
            <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-xl text-red-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <label className="text-zinc-300 font-semibold block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-zinc-300 font-semibold">Password</label>
                <Link
                  href="/reset-password"
                  className="text-orange-400 hover:underline text-[11px]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-10 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/25 transition-all mt-6 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In with Email</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-zinc-800 text-xs text-zinc-400">
            <span>Don&apos;t have an account yet? </span>
            <Link
              href="/register"
              className="text-orange-400 font-bold hover:underline"
            >
              Register now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
