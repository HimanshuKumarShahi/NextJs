"use client";

import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";

export default function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user;

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-xl bg-black/80 border-b border-zinc-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <Link
          href="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent hover:to-orange-400 transition-all"
        >
          MystryMessage
        </Link>

        {session ? (
          <div className="flex items-center gap-4 md:gap-6">
            <span className="text-zinc-300 font-medium text-sm md:text-base">
              Welcome,{" "}
              <span className="text-yellow-500 font-mono font-bold">
                @{user?.username || user?.email}
              </span>
            </span>
            <Button
              onClick={() => signOut({ callbackUrl: "/" })}
              variant="outline"
              className="h-10 border-red-900/50 hover:bg-red-900/20 text-red-500 hover:text-red-400 rounded-xl transition-colors"
            >
              Log Out
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="h-10 px-6 bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-semibold shadow-[0_0_15px_-5px_rgba(234,88,12,0.4)] transition-all">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
