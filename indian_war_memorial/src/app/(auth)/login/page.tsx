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
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: '#0B1006' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-10 h-10 rounded-full border-2"
          style={{ borderColor: '#C49F47', borderTopColor: 'transparent' }}
        />
      </div>
    );
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: '#0B1006' }}
    >
      {/* Background dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C49F47 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow top-left */}
      <div
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#3E512B', transform: 'translate(-30%, -30%)' }}
      />
      {/* Ambient glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#5A753F', transform: 'translate(30%, 30%)' }}
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
            boxShadow:
              '0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(196,159,71,0.08)',
          }}
        >
          {/* Indian Tricolor Stripe */}
          <div className="flex h-[6px] w-full">
            <div className="flex-1" style={{ backgroundColor: '#FF9933' }} />
            <div className="flex-1" style={{ backgroundColor: '#FFFFFF' }} />
            <div className="flex-1" style={{ backgroundColor: '#138808' }} />
          </div>

          <div className="px-8 pt-8 pb-10">
            {/* Logo + Header */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex flex-col items-center mb-8"
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
                Indian War Memorial
              </h1>
              <p className="text-sm text-center mb-5" style={{ color: '#7A9A5E' }}>
                Honoring the brave souls of our nation
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
                  &ldquo;Those who dare, win&rdquo;
                </p>
                <p className="text-xs text-center mt-0.5" style={{ color: '#5A753F' }}>
                  — Special Air Service Motto
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="space-y-5"
            >
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="officer@memorial.in"
                    className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'rgba(11,16,6,0.75)',
                      border: '1px solid rgba(90,117,63,0.4)',
                      color: '#D4C5A0',
                      caretColor: '#C49F47',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#C49F47';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,159,71,0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(90,117,63,0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-3 rounded-lg text-sm outline-none transition-all duration-200"
                    style={{
                      backgroundColor: 'rgba(11,16,6,0.75)',
                      border: '1px solid rgba(90,117,63,0.4)',
                      color: '#D4C5A0',
                      caretColor: '#C49F47',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#C49F47';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(196,159,71,0.12)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(90,117,63,0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors duration-150"
                    style={{ color: '#5A753F' }}
                    tabIndex={-1}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
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
                    <AlertCircle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: '#EF4444' }}
                    />
                    <p className="text-xs leading-relaxed" style={{ color: '#FCA5A5' }}>
                      {error}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Forgot password */}
              <div className="flex justify-end -mt-1">
                <Link
                  href="/forgot-password"
                  className="text-xs hover:underline transition-colors duration-150"
                  style={{ color: '#C49F47' }}
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.018 }}
                whileTap={{ scale: loading ? 1 : 0.982 }}
                className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
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
                      style={{
                        borderColor: '#E8D5A3',
                        borderTopColor: 'transparent',
                      }}
                    />
                    Authenticating&hellip;
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Sign In
                  </>
                )}
              </motion.button>
            </motion.form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'rgba(90,117,63,0.22)' }}
              />
              <span className="text-xs" style={{ color: '#3E512B' }}>
                OR
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: 'rgba(90,117,63,0.22)' }}
              />
            </div>

            {/* Register link */}
            <p className="text-center text-sm" style={{ color: '#5A6B4A' }}>
              New recruit?{' '}
              <Link
                href="/register"
                className="font-semibold hover:underline transition-colors duration-150"
                style={{ color: '#C49F47' }}
              >
                Create an account
              </Link>
            </p>
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
