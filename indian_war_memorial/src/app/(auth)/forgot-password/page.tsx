'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Send,
  AlertCircle,
  CheckCircle2,
  ArrowLeft,
  Shield,
} from 'lucide-react';

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

  const handleRetry = () => {
    setFormState('idle');
    setErrorMessage('');
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden"
      style={{ backgroundColor: '#0B1006' }}
    >
      {/* Dot grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #C49F47 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Ambient glow — saffron tint top-right */}
      <div
        className="absolute top-0 right-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-[0.07] pointer-events-none"
        style={{ backgroundColor: '#FF9933', transform: 'translate(30%, -30%)' }}
      />
      {/* Ambient glow — olive tint bottom-left */}
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
                Recover Access
              </h1>
              <p className="text-sm text-center mb-5" style={{ color: '#7A9A5E' }}>
                Reset your memorial portal password
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
                  &ldquo;The strength of a nation lies in its warriors&rdquo;
                </p>
                <p className="text-xs text-center mt-0.5" style={{ color: '#5A753F' }}>
                  — Indian Military Ethos
                </p>
              </div>
            </motion.div>

            {/* Main Content — switches between form and success */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                /* ── Success State ── */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-4 px-2"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{
                      background: 'linear-gradient(135deg, #138808 0%, #5A753F 100%)',
                      boxShadow: '0 0 28px rgba(19,136,8,0.4)',
                    }}
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>

                  <h2
                    className="text-xl font-bold mb-3"
                    style={{ color: '#E8D5A3', fontFamily: 'Georgia, serif' }}
                  >
                    Dispatch Sent!
                  </h2>

                  <p className="text-sm leading-relaxed mb-2" style={{ color: '#7A9A5E' }}>
                    If an account exists for{' '}
                    <span className="font-semibold" style={{ color: '#C49F47' }}>
                      {email}
                    </span>
                    , a password reset link has been dispatched to that address.
                  </p>

                  <p className="text-xs leading-relaxed mb-8" style={{ color: '#4A6535' }}>
                    Please check your inbox and spam folder. The link expires in{' '}
                    <span style={{ color: '#C49F47' }}>15 minutes</span>.
                  </p>

                  {/* Decorative timeline */}
                  <div className="flex items-center justify-center gap-3 mb-8">
                    {[
                      { label: 'Email sent', done: true },
                      { label: 'Check inbox', done: false },
                      { label: 'Reset password', done: false },
                    ].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        {i > 0 && (
                          <div
                            className="w-6 h-px"
                            style={{ backgroundColor: 'rgba(90,117,63,0.35)' }}
                          />
                        )}
                        <div className="flex flex-col items-center gap-1">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                            style={{
                              backgroundColor: step.done
                                ? '#138808'
                                : 'rgba(62,81,43,0.5)',
                              color: step.done ? '#fff' : '#5A753F',
                              border: `1px solid ${step.done ? '#138808' : 'rgba(90,117,63,0.4)'}`,
                            }}
                          >
                            {step.done ? '✓' : i + 1}
                          </div>
                          <span
                            className="text-[9px] whitespace-nowrap"
                            style={{ color: step.done ? '#7A9A5E' : '#3E512B' }}
                          >
                            {step.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-lg font-semibold text-sm tracking-widest uppercase transition-all duration-200"
                      style={{
                        background: 'linear-gradient(135deg, #5A753F 0%, #3E512B 100%)',
                        color: '#E8D5A3',
                        boxShadow: '0 4px 20px rgba(90,117,63,0.38)',
                      }}
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>

                    <button
                      onClick={handleRetry}
                      className="text-xs hover:underline transition-colors duration-150"
                      style={{ color: '#5A753F' }}
                    >
                      Didn&apos;t receive it? Try a different email
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* ── Form State ── */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                >
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: '#7A9A5E' }}>
                    Enter the email address linked to your memorial account. We will send you a
                    secure reset link.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
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
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (formState === 'error') setFormState('idle');
                          }}
                          required
                          autoComplete="email"
                          placeholder="officer@memorial.in"
                          disabled={isLoading}
                          className="w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 disabled:opacity-50"
                          style={{
                            backgroundColor: 'rgba(11,16,6,0.75)',
                            border: `1px solid ${
                              formState === 'error'
                                ? 'rgba(239,68,68,0.5)'
                                : 'rgba(90,117,63,0.4)'
                            }`,
                            color: '#D4C5A0',
                            caretColor: '#C49F47',
                          }}
                          onFocus={(e) => {
                            if (formState !== 'error') {
                              e.currentTarget.style.borderColor = '#C49F47';
                              e.currentTarget.style.boxShadow =
                                '0 0 0 3px rgba(196,159,71,0.12)';
                            }
                          }}
                          onBlur={(e) => {
                            if (formState !== 'error') {
                              e.currentTarget.style.borderColor = 'rgba(90,117,63,0.4)';
                              e.currentTarget.style.boxShadow = 'none';
                            }
                          }}
                        />
                      </div>
                    </div>

                    {/* Error Message */}
                    <AnimatePresence>
                      {formState === 'error' && errorMessage && (
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
                            {errorMessage}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      whileHover={{ scale: isLoading ? 1 : 1.018 }}
                      whileTap={{ scale: isLoading ? 1 : 0.982 }}
                      className="w-full py-3.5 rounded-lg font-semibold text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed mt-1"
                      style={{
                        background: 'linear-gradient(135deg, #5A753F 0%, #3E512B 100%)',
                        color: '#E8D5A3',
                        boxShadow: isLoading
                          ? 'none'
                          : '0 4px 20px rgba(90,117,63,0.38), inset 0 1px 0 rgba(255,255,255,0.08)',
                      }}
                    >
                      {isLoading ? (
                        <>
                          <motion.span
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 0.85,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                            className="w-4 h-4 rounded-full border-2 inline-block"
                            style={{
                              borderColor: '#E8D5A3',
                              borderTopColor: 'transparent',
                            }}
                          />
                          Sending Dispatch&hellip;
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Reset Link
                        </>
                      )}
                    </motion.button>
                  </form>

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

                  <p className="text-center text-sm" style={{ color: '#5A6B4A' }}>
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 font-semibold hover:underline transition-colors duration-150"
                      style={{ color: '#C49F47' }}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Return to Sign In
                    </Link>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
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
