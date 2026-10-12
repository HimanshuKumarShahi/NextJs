'use client'
import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const onResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post("/api/users/forgotpassword", { email });
      setEmailSent(true);
      toast.success("Reset link sent to your email!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#090a09] text-[#f4f3ed] selection:bg-lime-300 selection:text-black p-4 font-sans">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#12140f', color: '#f4f3ed', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      
      <div className="relative max-w-md w-full bg-[#11130f] p-8 rounded-2xl border border-white/10 shadow-2xl">
   
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden"
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium tracking-tight mb-2">Reset Password</h1>
            <p className="text-sm text-white/45">
              {emailSent 
                ? "Check your inbox for the reset link." 
                : "Enter your email to receive a reset link."}
            </p>
          </div>

          {!emailSent ? (
            <form onSubmit={onResetRequest} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-lime-300 mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-[#0d0e0c] border border-white/10 text-white placeholder-white/30 focus:border-lime-300/50 focus:ring-1 focus:ring-lime-300/50 transition-all outline-none"
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full py-3 mt-4 rounded-lg text-sm font-semibold text-black bg-lime-300 hover:bg-lime-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? "Sending..." : "Send Reset Link ↗"}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-lime-300/10 border border-lime-300/20 rounded-lg text-center">
              <p className="text-lime-300 text-sm mb-4">
                We sent a secure link to <strong>{email}</strong>. Please click the link to choose a new password.
              </p>
              <button 
                onClick={() => setEmailSent(false)} 
                className="text-xs text-white/50 hover:text-white transition-colors"
              >
                Try a different email
              </button>
            </div>
          )}

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <Link href="/login" className="text-sm text-white/45 hover:text-lime-300 transition-colors">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}