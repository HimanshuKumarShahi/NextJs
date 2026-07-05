'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Send, AlertCircle, CheckCircle2, ArrowLeft, Shield } from 'lucide-react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const isLoading = formState === 'loading';
  const isSuccess = formState === 'success';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setErrorMessage('Please enter your email address.');
      setFormState('error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      setFormState('error');
      return;
    }

    setFormState('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMessage(data.message ?? 'Failed to send reset email. Please try again.');
        setFormState('error');
      } else {
        setFormState('success');
      }
    } catch {
      setErrorMessage('Network error. Please check your connection and try again.');
      setFormState('error');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#070B04]">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-olive opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full blur-[100px] opacity-10 bg-[#455F2F] pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full blur-[100px] opacity-10 bg-[#C49F47] pointer-events-none -translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-2xl overflow-hidden bg-[#0E140B]/90 border border-[#324322]/80 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          
          {/* Tricolor stripe */}
          <div className="flex h-1 w-full">
            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-[#FFFFFF]" />
            <div className="flex-1 bg-[#138808]" />
          </div>

          <div className="px-8 pt-10 pb-8">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-6 text-center">
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-full bg-[#324322]/80 border border-[#C49F47]/30 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-[#C49F47]" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#C49F47] blur-md opacity-25" />
              </div>

              <h1 className="text-xl font-bold tracking-wide text-white font-serif uppercase">
                Recover Cipher
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Reset your memorial portal password
              </p>
            </div>

            {/* Main Content */}
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="forgot-form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-xs text-gray-400 leading-relaxed text-center">
                    Enter the email address registered with your account. We will dispatch a secure link to reset your access key.
                  </p>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold tracking-widest uppercase block text-gray-400">
                      Registered Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="officer@memorial.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400"
                      >
                        <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                        <p className="text-[11px] leading-relaxed font-semibold">{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#324322] hover:bg-[#40562b] text-white flex items-center justify-center gap-2 border border-[#C49F47]/20 hover:border-[#C49F47]/40 shadow-lg hover:shadow-[#324322]/20 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                        <span>Sending Dispatch...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Dispatch Recovery Link</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-container"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-4"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white mb-1">Dispatch Sent</h2>
                    <p className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                      A recovery cipher reset link has been dispatched to <span className="text-[#C49F47] font-semibold">{email}</span>. Please verify your inbox and spam folders.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setFormState('idle')}
                      className="text-xs text-gray-400 hover:text-white underline font-semibold transition-colors"
                    >
                      Resend Recovery Email
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-[#324322]/40" />
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">CONSOLE BACK</span>
              <div className="flex-1 h-[1px] bg-[#324322]/40" />
            </div>

            {/* Back to Login link */}
            <div className="text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#C49F47] hover:underline font-bold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </Link>
            </div>
          </div>

          {/* Footer bar */}
          <div className="px-8 py-3 bg-[#070B04]/70 border-t border-[#324322]/30 text-center text-[10px] text-gray-500 font-mono">
            🇮🇳 Indian War Memorial Console Portal
          </div>
        </div>
      </motion.div>
    </main>
  );
}
