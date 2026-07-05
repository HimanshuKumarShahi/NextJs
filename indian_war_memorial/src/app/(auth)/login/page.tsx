'use client';

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, LogIn, AlertCircle, Eye, EyeOff, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: email.trim().toLowerCase(),
        password,
      });

      if (result?.error) {
        const errorMap: Record<string, string> = {
          CredentialsSignin: 'Invalid email or password. Please try again.',
          Default: 'Authentication failed. Please try again.',
        };
        setError(errorMap[result.error] ?? result.error);
      } else if (result?.ok) {
        router.replace('/');
      }
    } catch {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B04]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-2 border-[#C49F47] border-t-transparent"
        />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden bg-[#070B04]">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-dot-olive opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full blur-[100px] opacity-10 bg-[#455F2F] pointer-events-none -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full blur-[100px] opacity-10 bg-[#C49F47] pointer-events-none translate-x-1/3 translate-y-1/3" />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="rounded-2xl overflow-hidden bg-[#0E140B]/90 border border-[#324322]/80 shadow-[0_25px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          
          {/* Saffron, White, Green Tricolor Line */}
          <div className="flex h-1 w-full">
            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-[#FFFFFF]" />
            <div className="flex-1 bg-[#138808]" />
          </div>

          <div className="px-8 pt-10 pb-8">
            
            {/* Header */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="relative mb-4">
                <div className="w-14 h-14 rounded-full bg-[#324322]/80 border border-[#C49F47]/30 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-[#C49F47]" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#C49F47] blur-md opacity-25" />
              </div>

              <h1 className="text-xl font-bold tracking-wide text-white font-serif uppercase">
                War Memorial Console
              </h1>
              <p className="text-xs text-[#C49F47] mt-1 uppercase tracking-widest font-mono font-bold">
                Duty • Honor • Country
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold tracking-widest uppercase block text-gray-400">
                  Officer Credential (Email)
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="officer@memorial.in"
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-bold tracking-widest uppercase block text-gray-400">
                    Access Cipher (Password)
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-[10px] hover:underline text-[#C49F47] font-semibold"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Error messages */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="flex items-start gap-2.5 px-3.5 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400"
                  >
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <p className="text-[11px] leading-relaxed font-semibold">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#324322] hover:bg-[#40562b] text-white flex items-center justify-center gap-2 border border-[#C49F47]/20 hover:border-[#C49F47]/40 shadow-lg hover:shadow-[#324322]/20 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Authorize Access</span>
                  </>
                )}
              </button>
            </form>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-[#324322]/40" />
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">CONSOLE REGISTER</span>
              <div className="flex-1 h-[1px] bg-[#324322]/40" />
            </div>

            {/* Register Link */}
            <p className="text-center text-xs text-gray-400">
              New recruit?{' '}
              <Link
                href="/register"
                className="font-bold text-[#C49F47] hover:underline"
              >
                Enlist/Register
              </Link>
            </p>
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
