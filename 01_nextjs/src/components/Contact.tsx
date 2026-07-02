"use client";

import React from "react";
import { motion } from "motion/react";
import Link from "next/link";

export default function ContactPage() {
  const socialLinks = [
    {
      name: "Email",
      href: "mailto:Himanshu@gmail.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      hoverColor:
        "hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/50",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/himanshu23.exe",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      hoverColor:
        "hover:bg-pink-500/10 hover:text-pink-500 hover:border-pink-500/50",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/himanshu-kumar-shahi",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
      hoverColor:
        "hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/50",
    },
    {
      name: "X (Twitter)",
      href: "https://x.com/KumarHimanshu",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
        </svg>
      ),
      hoverColor:
        "hover:bg-neutral-100/10 hover:text-white hover:border-neutral-100/50",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[250px] bg-neutral-800/40 blur-[120px] rounded-full -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-900/20 blur-[150px] rounded-full -z-10" />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-center md:items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 mb-6 tracking-tight">
            Let's Build <br /> Something Great.
          </h1>
          <p className="text-neutral-400 text-lg mb-10 max-w-md">
            Whether you have a project idea, need tech consultation, or just
            want to say hi, my inbox is always open.
          </p>

          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            {socialLinks.map((social, idx) => (
              <Link
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div
                  className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 text-neutral-400 transition-all duration-300 ${social.hoverColor} group`}
                >
                  <div className="mb-3 transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                    {social.icon}
                  </div>
                  <span className="text-sm font-semibold tracking-wider">
                    {social.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="w-full md:w-1/2 max-w-md"
        >
          <div className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            {/* Form Inner Glow */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-neutral-700/30 blur-[50px] rounded-full" />

            <form
              className="relative z-10 flex flex-col gap-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <h3 className="text-2xl font-semibold text-white mb-2">
                Send a Message
              </h3>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can I help you?"
                  className="bg-black/50 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-4 rounded-lg bg-white text-black font-bold text-sm tracking-wide hover:bg-neutral-200 hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
