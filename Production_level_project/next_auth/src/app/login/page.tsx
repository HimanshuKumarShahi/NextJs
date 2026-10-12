"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState<LoginData>({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setButtonDisabled(!user.email.trim() || !user.password);
  }, [user]);

  const onLogin = async (e: any) => {
    e.preventDefault();

    if (buttonDisabled || loading) return;

    setLoading(true);

    try {
      const response = await axios.post("/api/users/login", {
        email: user.email.trim(),
        password: user.password,
      });

      toast.success(response.data?.message || "Login successful!", {
        duration: 2500,
        style: {
          background: "#141414",
          color: "#BEF264",
          border: "1px solid #3f6212",
        },
      });

      setTimeout(() => {
        router.push("/profile");
      }, 1500);
    } catch (error: unknown) {
      let errorMessage = "Invalid email or password.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          (!error.response
            ? "Unable to connect to the server. Please try again."
            : errorMessage);
      }

      toast.error(errorMessage, {
        duration: 4000,
        style: {
          background: "#141414",
          color: "#fca5a5",
          border: "1px solid #7f1d1d",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#090a09] text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#141414",
            color: "#ffffff",
            border: "1px solid #292929",
            padding: "14px 18px",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-lime-300 text-lg font-black text-black">
            N
          </div>
          <span className="text-xl font-bold tracking-[0.18em]">NEXORA</span>
        </Link>

        <Link
          href="/signup"
          className="text-sm text-neutral-400 transition hover:text-lime-300"
        >
          New here?{" "}
          <span className="font-semibold text-lime-300">Create account</span>
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-100px)] max-w-7xl items-center gap-14 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10120f] p-10 lg:flex">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Welcome back
            </span>

            <h1 className="mt-10 max-w-lg text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
              Your next
              <br />
              big idea
              <br />
              starts <span className="text-lime-300">here.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-400">
              Sign in to pick up where you left off. Your workspace and your
              next possibilities are waiting for you.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <svg
              viewBox="0 0 420 220"
              fill="none"
              className="w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="loginGradient"
                  x1="0"
                  y1="0"
                  x2="420"
                  y2="220"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BEF264" />
                  <stop offset="1" stopColor="#365314" />
                </linearGradient>
              </defs>

              {Array.from({ length: 9 }).map((_, i) => (
                <path
                  key={i}
                  d={`M ${15 + i * 15} 210 L ${145 + i * 13} 20 L 410 ${30 + i * 17}`}
                  stroke="url(#loginGradient)"
                  strokeOpacity={0.15 + i * 0.05}
                />
              ))}

              <circle
                cx="250"
                cy="110"
                r="78"
                stroke="#BEF264"
                strokeOpacity="0.2"
                strokeDasharray="5 8"
              />
              <circle
                cx="250"
                cy="110"
                r="57"
                stroke="#BEF264"
                strokeOpacity="0.65"
              />
              <circle
                cx="250"
                cy="110"
                r="37"
                fill="#BEF264"
                fillOpacity="0.12"
                stroke="#BEF264"
                strokeOpacity="0.5"
              />
              <path d="M238 91V129L270 110L238 91Z" fill="#BEF264" />
            </svg>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span>Think forward</span>
              <span>Keep building</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-lime-300">
              Access your account
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back<span className="text-lime-300">.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Enter your credentials to sign in to your NEXORA account.
            </p>
          </div>

          <form onSubmit={onLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-600 focus:border-lime-300/70 focus:ring-2 focus:ring-lime-300/10 disabled:opacity-50"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-300"
                >
                  Password
                </label>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-neutral-600 focus:border-lime-300/70 focus:ring-2 focus:ring-lime-300/10 disabled:opacity-50"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-neutral-400 transition hover:text-lime-300"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Signing in...
                </>
              ) : (
                <>
                  Log in to your account
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-neutral-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-lime-300 transition hover:text-lime-200"
            >
              Create an account
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
