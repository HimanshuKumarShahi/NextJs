import React from "react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex flex-col w-full">
      <div className="lg:hidden text-3xl font-black text-indigo-600 tracking-tighter mb-8 text-center">
        Nexus<span className="text-gray-900">Tech</span>
      </div>

      <div className="text-center lg:text-left mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-500">
          Enter your credentials to access your account.
        </p>
      </div>

      <form className="space-y-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition bg-white"
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Need help?
            </a>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition bg-white"
            required
          />
        </div>

        <button
          type="button"
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition mt-6"
        >
          Sign In
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          <Link
            href="/home"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition flex items-center justify-center gap-1"
          >
            &larr; Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
