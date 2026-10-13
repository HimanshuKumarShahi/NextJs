"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState<SignupData>({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setButtonDisabled(
      !user.username.trim() || !user.email.trim() || !user.password.trim(),
    );
  }, [user]);

  const onSignup = async (e: any) => {
    e.preventDefault();

    if (buttonDisabled || loading) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("/api/users/signup", {
        username: user.username.trim(),
        email: user.email.trim(),
        password: user.password,
      });

      toast.success(response.data?.message || "User registered successfully!", {
        style: {
          background: "#141414",
          color: "#BEF264",
          border: "1px solid #3f6212",
        },
      });

      router.push("/login");
    } catch (error: any) {
      let errorMessage = "Signup failed. Please try again.";

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.error ||
          error.response?.data?.message ||
          (!error.response
            ? "Unable to connect to the server. Please try again."
            : errorMessage);
      }

      toast.error(errorMessage, {
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
        gutter={12}
        toastOptions={{
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
          href="/login"
          className="text-sm text-neutral-400 transition hover:text-lime-300"
        >
          Already have an account?{" "}
          <span className="font-semibold text-lime-300">Log in</span>
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-100px)] max-w-7xl items-center gap-14 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10120f] p-10 lg:flex">
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Your next chapter starts here
            </span>

            <h1 className="mt-10 max-w-lg text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
              Build your
              <br />
              next big thing
              <span className="text-lime-300">.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-400">
              Create your account and step into a more focused, connected, and
              creative digital experience.
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
                  id="nexoraGradient"
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
                  d={`M ${20 + i * 12} 200 L ${160 + i * 12} 20 L ${400} ${20 + i * 12}`}
                  stroke="url(#nexoraGradient)"
                  strokeOpacity={0.15 + i * 0.045}
                />
              ))}

              <circle
                cx="250"
                cy="110"
                r="76"
                stroke="#BEF264"
                strokeOpacity="0.65"
              />
              <circle
                cx="250"
                cy="110"
                r="56"
                stroke="#BEF264"
                strokeOpacity="0.35"
              />
              <circle cx="250" cy="110" r="35" fill="#BEF264" />
              <path d="M238 91V129L270 110L238 91Z" fill="#090a09" />
            </svg>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span>Think forward</span>
              <span>Make it happen</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-lime-300">
              Get started for free
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Create account<span className="text-lime-300">.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Enter your details below to create your NEXORA account.
            </p>
          </div>

          <form onSubmit={onSignup} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                required
                disabled={loading}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-600 focus:border-lime-300/70 focus:ring-2 focus:ring-lime-300/10 disabled:opacity-50"
              />
            </div>

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
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-neutral-300"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a strong password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  required
                  minLength={6}
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

              <p className="mt-2 text-xs text-neutral-500">
                Use at least 6 characters.
              </p>
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

            <p className="text-center text-xs leading-5 text-neutral-500">
              By creating an account, you agree to our terms and privacy policy.
            </p>
          </form>

          <div className="mt-8 text-center text-sm text-neutral-400">
            Already registered?{" "}
            <Link
              href="/login"
              className="font-semibold text-lime-300 transition hover:text-lime-200"
            >
              Sign in
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
