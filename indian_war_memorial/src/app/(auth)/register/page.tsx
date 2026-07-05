'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, UserPlus, AlertCircle, CheckCircle2, Shield } from 'lucide-react';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!password) return { score: 0, label: '', color: '' };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { score, label: 'Weak', color: '#EF4444' };
  if (score === 2) return { score, label: 'Fair', color: '#F59E0B' };
  if (score === 3) return { score, label: 'Good', color: '#C49F47' };
  if (score === 4) return { score, label: 'Strong', color: '#455F2F' };
  return { score, label: 'Very Strong', color: '#138808' };
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = getPasswordStrength(form.password);

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (error) setError('');
  };

  const validate = (): string | null => {
    if (!form.name.trim()) return 'Full name is required.';
    if (form.name.trim().length < 2) return 'Name must be at least 2 characters.';
    if (!form.email.trim()) return 'Email address is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Please enter a valid email address.';
    if (!form.password) return 'Password is required.';
    if (form.password.length < 8) return 'Password must be at least 8 characters.';
    if (form.password !== form.confirmPassword) return 'Passwords do not match.';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message ?? 'Registration failed. Please try again.');
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
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
          
          {/* Tricolor Stripe */}
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
                  <UserPlus className="w-6 h-6 text-[#C49F47]" />
                </div>
                <div className="absolute inset-0 rounded-full bg-[#C49F47] blur-md opacity-25" />
              </div>

              <h1 className="text-xl font-bold tracking-wide text-white font-serif uppercase">
                Enlist Account
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Register as a member of the memorial archive
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="register-form"
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold tracking-widest uppercase block text-gray-400">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChange('name')}
                        required
                        placeholder="Marshal Sam Manekshaw"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold tracking-widest uppercase block text-gray-400">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        required
                        placeholder="officer@memorial.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold tracking-widest uppercase block text-gray-400">
                      Access Cipher (Password)
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength progress bar */}
                    {form.password && (
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between items-center text-[9px] font-bold font-mono">
                          <span className="text-gray-500">STRENGTH:</span>
                          <span style={{ color: strength.color }}>{strength.label}</span>
                        </div>
                        <div className="h-1 w-full bg-[#070B04] rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${(strength.score / 5) * 100}%`,
                              backgroundColor: strength.color,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold tracking-widest uppercase block text-gray-400">
                      Confirm Cipher
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl text-xs font-semibold bg-[#070B04] border border-[#324322]/60 text-white placeholder-gray-600 focus:outline-none focus:border-[#C49F47] focus:ring-1 focus:ring-[#C49F47] transition-all duration-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error Message */}
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

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#324322] hover:bg-[#40562b] text-white flex items-center justify-center gap-2 border border-[#C49F47]/20 hover:border-[#C49F47]/40 shadow-lg hover:shadow-[#324322]/20 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed pt-2"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin inline-block" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        <span>Enlist Account</span>
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
                    <h2 className="text-base font-bold text-white mb-1">Enlistment Successful</h2>
                    <p className="text-xs text-gray-400">
                      Your officer account has been registered. You may now log in to access the war memorial console.
                    </p>
                  </div>
                  <Link
                    href="/login"
                    className="inline-block px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#324322] border border-[#C49F47]/30 text-[#C49F47] hover:bg-[#324322]/80 transition-colors"
                  >
                    Go to Login
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-[1px] bg-[#324322]/40" />
              <span className="text-[9px] font-mono font-bold text-gray-500 uppercase tracking-widest">CONSOLE ACCESS</span>
              <div className="flex-1 h-[1px] bg-[#324322]/40" />
            </div>

            {/* Login Link */}
            <p className="text-center text-xs text-gray-400">
              Already enlisted?{' '}
              <Link
                href="/login"
                className="font-bold text-[#C49F47] hover:underline"
              >
                Sign In
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
