import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white flex">
      <div className="hidden lg:flex w-1/2 bg-indigo-900 justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-indigo-800 to-gray-900 opacity-90"></div>
        <div className="relative z-10 p-12 text-white max-w-lg">
          <div className="text-4xl font-black tracking-tighter mb-6">
            Nexus<span className="text-indigo-400">Tech</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Welcome back to your workspace.
          </h2>
          <p className="text-indigo-200 text-lg">
            Access your dashboard, manage your workflow, and track your premium
            gear orders all in one place.
          </p>
        </div>

        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border-4 border-indigo-500/20 blur-xl"></div>
        <div className="absolute top-1/4 -right-20 w-64 h-64 rounded-full border-4 border-indigo-400/20 blur-xl"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-24 bg-gray-50">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
