"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
// import { useRouter } from "next/router";

type VerificationStatus = "verifying" | "verified" | "error" | "missing";

export default function VerifyEmail() {
  // const router = useRouter()
  const [status, setStatus] = useState<VerificationStatus>("verifying");

  useEffect(() => {
    let active = true;

    const verifyUserEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      //Next JS implementation
      // const {query} = router
      // const token = query.token

      if (!token) {
        if (active) setStatus("missing");
        return;
      }

      try {
        const response = await axios.post("/api/users/verifyemail", { token });

        if (!active) return;

        setStatus("verified");

        toast.success(
          response.data?.message || "Email verified successfully!",
          {
            style: {
              background: "#141414",
              color: "#BEF264",
              border: "1px solid #3f6212",
            },
          },
        );
      } catch (error: unknown) {
        if (!active) return;

        setStatus("error");

        const message = axios.isAxiosError(error)
          ? error.response?.data?.error ||
            error.response?.data?.message ||
            "Email verification failed. Your token may be invalid or expired."
          : "Something went wrong. Please try again.";

        toast.error(message, {
          style: {
            background: "#141414",
            color: "#fca5a5",
            border: "1px solid #7f1d1d",
          },
        });
      }
    };

    verifyUserEmail();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#090a09] text-white">
      <Toaster
        position="top-center"
        reverseOrder={false}
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
          Back to <span className="font-semibold text-lime-300">Login</span>
        </Link>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-100px)] max-w-7xl items-center gap-12 px-6 py-10 sm:px-10 lg:grid-cols-2 lg:gap-20">
        <div className="relative hidden min-h-[540px] flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-[#10120f] p-10 lg:flex">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-lime-300/10 blur-3xl" />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-lime-300/20 bg-lime-300/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-lime-300">
              <span className="h-2 w-2 rounded-full bg-lime-300" />
              Account security
            </span>

            <h1 className="mt-10 max-w-lg text-5xl font-semibold leading-[1.12] tracking-tight xl:text-6xl">
              One last step
              <br />
              to get
              <span className="text-lime-300"> started.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-400">
              Verify your email address to complete your registration and unlock
              your NEXORA account.
            </p>
          </div>

          <div className="relative z-10 mt-10">
            <svg
              viewBox="0 0 420 230"
              fill="none"
              className="w-full"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="verifyGradient"
                  x1="80"
                  y1="30"
                  x2="340"
                  y2="210"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#BEF264" />
                  <stop offset="1" stopColor="#365314" />
                </linearGradient>
              </defs>

              {Array.from({ length: 7 }).map((_, i) => (
                <path
                  key={i}
                  d={`M ${20 + i * 18} 210 L ${150 + i * 10} 20 L 400 ${50 + i * 17}`}
                  stroke="url(#verifyGradient)"
                  strokeOpacity={0.2 + i * 0.06}
                />
              ))}

              <circle
                cx="210"
                cy="112"
                r="86"
                stroke="#BEF264"
                strokeOpacity="0.2"
                strokeDasharray="4 8"
              />
              <circle
                cx="210"
                cy="112"
                r="66"
                stroke="#BEF264"
                strokeOpacity="0.6"
              />
              <circle
                cx="210"
                cy="112"
                r="48"
                fill="#BEF264"
                fillOpacity="0.1"
                stroke="#BEF264"
                strokeOpacity="0.35"
              />
              <path
                d="M185 112L202 129L237 94"
                stroke="#BEF264"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span>Stay secure</span>
              <span>Move forward</span>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-lime-300">
              NEXORA account
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Verify email<span className="text-lime-300">.</span>
            </h2>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              We are checking your verification link. This should only take a
              moment.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            {status === "verifying" && (
              <div
                className="flex flex-col items-center py-8 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lime-300/20 bg-lime-300/5">
                  <div className="h-9 w-9 animate-spin rounded-full border-2 border-lime-300/20 border-t-lime-300" />
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  Verifying your email
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  Please wait while we confirm your email address.
                </p>
              </div>
            )}

            {status === "verified" && (
              <div
                className="flex flex-col items-center py-6 text-center"
                role="status"
                aria-live="polite"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-lime-300/30 bg-lime-300/10">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-10 w-10 text-lime-300"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12.5L9.5 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  Email verified<span className="text-lime-300">!</span>
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  Your email address has been verified successfully. Your
                  account is ready for you to sign in.
                </p>

                <Link
                  href="/login"
                  className="mt-8 flex w-full items-center justify-center rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-200"
                >
                  Continue to Login
                  <span className="ml-2" aria-hidden="true">
                    →
                  </span>
                </Link>
              </div>
            )}

            {status === "error" && (
              <div
                className="flex flex-col items-center py-6 text-center"
                role="alert"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-red-400/20 bg-red-400/5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-10 w-10 text-red-400"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 8V13M12 17H12.01M10.3 3.9L2.8 17A2 2 0 004.5 20H19.5A2 2 0 0021.2 17L13.7 3.9A2 2 0 0010.3 3.9Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  Verification failed<span className="text-red-400">.</span>
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  Your verification link may be invalid or expired. Please sign
                  in if your account is already verified, or register again to
                  request a new link.
                </p>

                <Link
                  href="/signup"
                  className="mt-8 flex w-full items-center justify-center rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-200"
                >
                  Back to Sign Up
                </Link>

                <Link
                  href="/login"
                  className="mt-5 text-sm text-neutral-400 transition hover:text-lime-300"
                >
                  Already verified? Sign in
                </Link>
              </div>
            )}

            {status === "missing" && (
              <div
                className="flex flex-col items-center py-6 text-center"
                role="alert"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5 text-3xl text-neutral-400">
                  ?
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  Link not found<span className="text-lime-300">.</span>
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  No verification token was found in this URL. Open the
                  verification link sent to your email.
                </p>

                <Link
                  href="/signup"
                  className="mt-8 flex w-full items-center justify-center rounded-xl bg-lime-300 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-200"
                >
                  Go to Sign Up
                </Link>
              </div>
            )}
          </div>

          <p className="mt-6 text-center text-xs leading-5 text-neutral-500">
            Need help? Return to the{" "}
            <Link
              href="/login"
              className="text-lime-300 transition hover:text-lime-200"
            >
              login page
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
