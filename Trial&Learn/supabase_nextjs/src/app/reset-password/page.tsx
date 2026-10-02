"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/Toast";

export default function ResetPasswordPage() {
  const { resetPassword, isConfigured } = useAuth();
  const { success, error: toastError } = useToast();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const { error } = await resetPassword(email);
      if (error) {
        setErrorMessage(error.message);
        toastError("Reset Failed", error.message);
      } else {
        setIsSent(true);
        success("Reset Link Sent", "Check your email for recovery instructions.");
      }
    } catch {
      setErrorMessage("Failed to send reset link. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            Reset Password
          </h1>
          <p className="text-xs text-zinc-400">
            Enter your email and we&apos;ll send you a link to reset your vault credentials
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
          {errorMessage && (
            <div className="p-3 bg-red-950/50 border border-red-800/50 rounded-xl text-red-400 text-xs flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSent ? (
            <div className="text-center space-y-4 py-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">Reset Link Dispatched</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                If an account exists for <strong className="text-white">{email}</strong>, you will receive an email shortly with a secure password reset link.
              </p>
              <div className="pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-orange-400 font-bold hover:underline"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Sign In</span>
                </Link>
              </div>
            </div>
          ) : (
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 shadow-xl shadow-orange-500/25 transition-all mt-6 disabled:opacity-50"
              >
                {isLoading ? (
                  <span>Sending Link...</span>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
