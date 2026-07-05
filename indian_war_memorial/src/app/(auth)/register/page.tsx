'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
  CheckCircle2,
  Shield,
} from 'lucide-react';

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
  if (score === 4) return { score, label: 'Strong', color: '#5A753F' };
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

  const inputStyle = {
    backgroundColor: 'rgba(11,16,6,0.75)',
    border: '1px solid rgba(90,117,63,0.4)',
    color: '#D4C5A0',
    caretColor: '#C49F47',
  } as React.CSSProperties;

  const focusHandlers = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = '#C49F47';
      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,159,71,0.12)';
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = 'rgba(90,117,63,0.4)';
      e.currentTarget.style.boxShadow = 'none';
    },
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: '#0B1006' }}
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C49F47 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Glows */}
      <div
        className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#5A753F', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[480px] h-[480px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#3E512B', transform: 'translate(-30%, 30%)' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        <div
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{
            backgroundColor: 'rgba(19,26,15,0.88)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(90,117,63,0.35)',
            boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,159,71,0.08)',
          }}
        >
          {/* Indian Tricolor Stripe */}
          <div className="flex h-[6px] w-full">
            <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
            <div className="flex-1" style={{ backgroundColor: '#FFFFFF' }} />
            <div className="flex-1" style={{ backgroundColor: '#138808' }} />
          </div>

          <div className="px-8 pt-8 pb-10">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-col items-center mb-7"
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, #3E512B 0%, #5A753F 100%)',
                  boxShadow: '0 0 28px rgba(90,117,63,0.45)',
                }}
              >
                <Shield className="w-8 h-8" style={{ color: '#C49F47' }} />
              </div>

              <h1
                className="text-2xl font-bold tracking-wide text-center mb-1"
                style={{ color: '#E8D5A3', fontFamily: 'Georgia, serif' }}
              >
                Join the Memorial
              </h1>
              <p className="text-sm text-center mb-5" style={{ color: '#7A9A5E' }}>
                Create your guardian account
              </p>

              {/* Military Quote */}
              <div
                className="w-full px-4 py-3 rounded-lg"
                style={{
                  backgroundColor: 'rgba(62,81,43,0.28)',
                  borderLeft: '3px solid #C49F47',
                }}
              >
                <p className="text-xs italic text-center" style={{ color: '#C49F47' }}>
                  &ldquo;Every soldier is a guardian of the nation&rdquo;
                </p>
                <p className="text-xs text-center mt-0.5" style={{ color: '#5A753F' }}>
                  — Indian Armed Forces Creed
                </p>
              </div>
            </motion.div>

            {/* Success State */}
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-6 px-4"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{
                      background: 'linear-gradient(135deg, #138808 0%, #5A753F 100%)',
                      boxShadow: '0 0 28px rgba(19,136,8,0.4)',
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                  <h2
                    className="text-xl font-bold mb-2"
                    style={{ color: '#E8D5A3', fontFamily: 'Georgia, serif' }}
                  >
                    Enrollment Successful!
                  </h2>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#7A9A5E' }}>
                    Your guardian account has been created. You may now sign in to access the
                    memorial portal.
                  </p>
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm tracking-widest uppercase transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #5A753F 0%, #3E512B 100%)',
                      color: '#E8D5A3',
                      boxShadow: '0 4px 20px rgba(90,117,63,0.38)',
                    }}
                  >
                    Proceed to Sign In
                  </Link>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  className="space-y-4"
                >
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-semibold tracking-widest uppercase block"
                      style={{ color: '#7A9A5E' }}
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: '#5A753F' }}
                      />
                      <input
                        type="text"
                        value={form.name}
                        onChange={handleChange('name')}
                        required
                        autoComplete="name"
                        placeholder="Maj. Rajiv Sharma"
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-semibold tracking-widest uppercase block"
                      style={{ color: '#7A9A5E' }}
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: '#5A753F' }}
                      />
                      <input
                        type="email"
                        value={form.email}
                        onChange={handleChange('email')}
                        required
                        autoComplete="email"
                        placeholder="officer@memorial.in"
                        className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-semibold tracking-widest uppercase block"
                      style={{ color: '#7A9A5E' }}
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: '#5A753F' }}
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange('password')}
                        required
                        autoComplete="new-password"
                        placeholder="Min. 8 characters"
                        className="w-full pl-10 pr-11 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                        style={inputStyle}
                        {...focusHandlers}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
                        style={{ color: '#5A753F' }}
                        tabIndex={-1}
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength */}
                    <AnimatePresence>
                      {form.password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-1.5 overflow-hidden"
                        >
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <motion.div
                                key={i}
                                className="flex-1 h-1 rounded-full transition-all duration-300"
                                style={{
                                  backgroundColor:
                                    i <= strength.score ? strength.color : 'rgba(62,81,43,0.3)',
                                }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ delay: i * 0.05 }}
                              />
                            ))}
                          </div>
                          <p className="text-xs" style={{ color: strength.color }}>
                            Strength: {strength.label}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label
                      className="text-xs font-semibold tracking-widest uppercase block"
                      style={{ color: '#7A9A5E' }}
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                        style={{ color: '#5A753F' }}
                      />
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        value={form.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        required
                        autoComplete="new-password"
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-11 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                        style={{
                          ...inputStyle,
                          borderColor:
                            form.confirmPassword && form.confirmPassword !== form.password
                              ? 'rgba(239,68,68,0.5)'
                              : 'rgba(90,117,63,0.4)',
                        }}
                        {...focusHandlers}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
                        style={{ color: '#5A753F' }}
                        tabIndex={-1}
                        aria-label="Toggle confirm password visibility"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <AnimatePresence>
                      {form.confirmPassword && form.confirmPassword !== form.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="text-xs"
                          style={{ color: '#EF4444' }}
                        >
                          Passwords do not match
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg overflow-hidden"
                        style={{
                          backgroundColor: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.3)',
                        }}
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: '#EF4444' }} />
                        <p className="text-xs leading-relaxed" style={{ color: '#FCA5A5' }}>
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.018 }}
                    whileTap={{ scale: loading ? 1 : 0.982 }}
                    className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                    style={{
                      background: 'linear-gradient(135deg, #5A753F 0%, #3E512B 100%)',
                      color: '#E8D5A3',
                      boxShadow: loading
                        ? 'none'
                        : '0 4px 20px rgba(90,117,63,0.38), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
                          className="w-4 h-4 rounded-full border-2 inline-block"
                          style={{ borderColor: '#E8D5A3', borderTopColor: 'transparent' }}
                        />
                        Enrolling&hellip;
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-4 h-4" />
                        Create Account
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>

            {!success && (
              <>
                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(90,117,63,0.22)' }} />
                  <span className="text-xs" style={{ color: '#3E512B' }}>OR</span>
                  <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(90,117,63,0.22)' }} />
                </div>

                <p className="text-center text-sm" style={{ color: '#5A6B4A' }}>
                  Already enlisted?{' '}
                  <Link
                    href="/login"
                    className="font-semibold hover:underline transition-colors duration-150"
                    style={{ color: '#C49F47' }}
                  >
                    Sign in here
                  </Link>
                </p>
              </>
            )}
          </div>

          {/* Footer strip */}
          <div
            className="px-8 py-3 text-center text-xs"
            style={{
              backgroundColor: 'rgba(11,16,6,0.55)',
              borderTop: '1px solid rgba(62,81,43,0.22)',
              color: '#3A4D2A',
            }}
          >
            🇮🇳 Jai Hind &mdash; Indian War Memorial Portal
          </div>
        </div>
      </motion.div>
    </main>
  );
}
