"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/profile");
        setUser(res.data.data);
      } catch (error: any) {
        toast.error("Failed to fetch user details. Please login again.");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <main className="min-h-screen bg-[#090a09] text-[#f4f3ed] selection:bg-lime-300 selection:text-black font-sans">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#12140f",
            color: "#f4f3ed",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <nav className="relative z-20 mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/[0.09] px-6 py-5 sm:px-10 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-300 text-black">
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M5 17L12 4L19 17M8 12H16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-sm font-semibold tracking-[0.2em]">NEXORA</span>
        </div>

        <button
          onClick={logout}
          className="group flex items-center gap-3 rounded-full border border-white/20 px-4 py-2 text-xs transition hover:border-red-500 hover:bg-red-500/10 hover:text-red-400 sm:px-5"
        >
          Sign Out
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </button>
      </nav>

      <section className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 sm:py-20 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 items-start">
          <div>
            <p className="mb-5 text-[10px] uppercase tracking-[0.25em] text-lime-300">
              User Dashboard
            </p>
            <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-[1] tracking-[-0.05em] mb-6">
              Welcome back,
              <br />
              <span className="font-serif italic text-white/45">
                {loading ? "..." : user?.username || "Explorer"}
              </span>
            </h1>
            <p className="max-w-sm text-sm leading-7 text-white/45">
              Manage your preferences, view your connection status, and shape
              your perspective.
            </p>
          </div>

          <div className="relative">
            <div
              className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            <div className="grid gap-4 sm:grid-cols-2 rounded-xl border border-white/10 bg-[#0d0e0c] p-6 sm:p-8">
              <div className="col-span-1 sm:col-span-2 group border border-white/5 bg-[#11130f] p-6 rounded-lg transition hover:border-lime-300/30">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                  01 / Identity
                </p>
                {loading ? (
                  <div className="h-16 flex items-center">
                    <div className="h-4 w-32 bg-white/10 rounded animate-pulse"></div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-medium tracking-tight text-white mb-1">
                      {user?.username}
                    </h3>
                    <p className="text-sm text-white/45">{user?.email}</p>
                  </>
                )}
              </div>

              <div className="group border border-white/5 bg-[#11130f] p-6 rounded-lg transition hover:border-lime-300/30">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                  02 / Status
                </p>
                {loading ? (
                  <div className="h-6 w-20 bg-white/10 rounded animate-pulse mt-2"></div>
                ) : (
                  <div className="flex items-center gap-3 mt-1">
                    <span
                      className={`h-2 w-2 rounded-full ${user?.isVerified ? "bg-lime-300 shadow-[0_0_10px_rgba(190,242,100,0.5)]" : "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"}`}
                    ></span>
                    <span className="text-sm font-medium tracking-wide">
                      {user?.isVerified ? "Verified Account" : "Unverified"}
                    </span>
                  </div>
                )}
              </div>

              <div className="group border border-white/5 bg-[#11130f] p-6 rounded-lg transition hover:border-lime-300/30">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-white/35">
                  03 / Role
                </p>
                {loading ? (
                  <div className="h-6 w-24 bg-white/10 rounded animate-pulse mt-2"></div>
                ) : (
                  <div className="mt-1">
                    <span className="text-sm font-medium tracking-wide text-white/80">
                      {user?.isAdmin ? "Administrator" : "Standard User"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="absolute bottom-0 w-full border-t border-white/5">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
          <p className="text-xs text-white/35">© 2026 Nexora</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
            System Active
          </p>
        </div>
      </footer>
    </main>
  );
}
