import React from "react";
import Link from "next/link";

export default function SimpleHomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tight">NexusTech.</div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-black transition">
              Features
            </Link>
            <Link href="#products" className="hover:text-black transition">
              Products
            </Link>
          </nav>
          <Link
            href="/login"
            className="text-sm font-semibold bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Log in
          </Link>
        </div>
      </header>

      <main className="flex-grow flex flex-col">{children}</main>

      <footer className="border-t border-gray-100 mt-auto">
        <div className="max-w-6xl mx-auto px-6 py-8 text-center text-sm text-gray-500">
          <p>&copy; 2026 NexusTech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
