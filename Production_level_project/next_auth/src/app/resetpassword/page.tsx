'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  const onResetPassword = async (e:any) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      
      
      await axios.post("/api/users/resetpassword", { 
        token, 
        newPassword: password 
      });
      
      setSuccess(true);
      toast.success("Password reset successfully!");
      
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#090a09] text-[#f4f3ed] selection:bg-lime-300 selection:text-black p-4 font-sans">
      <Toaster position="top-center" toastOptions={{
        style: { background: '#12140f', color: '#f4f3ed', border: '1px solid rgba(255,255,255,0.1)' }
      }} />
      
      <div className="relative max-w-md w-full bg-[#11130f] p-8 rounded-2xl border border-white/10 shadow-2xl">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] rounded-2xl overflow-hidden"
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-medium tracking-tight mb-2">New Password</h1>
            <p className="text-sm text-white/45">
              {success ? "Your password has been updated." : "Enter your new password below."}
            </p>
          </div>

          {!success ? (
            <form onSubmit={onResetPassword} className="space-y-5">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-lime-300 mb-2" htmlFor="password">
                  New Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-[#0d0e0c] border border-white/10 text-white placeholder-white/30 focus:border-lime-300/50 focus:ring-1 focus:ring-lime-300/50 transition-all outline-none"
                  id="password"
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-lime-300 mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="w-full px-4 py-3 rounded-lg bg-[#0d0e0c] border border-white/10 text-white placeholder-white/30 focus:border-lime-300/50 focus:ring-1 focus:ring-lime-300/50 transition-all outline-none"
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || !password || !confirmPassword || !token}
                className="w-full py-3 mt-4 rounded-lg text-sm font-semibold text-black bg-lime-300 hover:bg-lime-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? "Updating..." : "Update Password ↗"}
              </button>
            </form>
          ) : (
            <div className="p-4 bg-lime-300/10 border border-lime-300/20 rounded-lg text-center">
              <p className="text-lime-300 text-sm mb-4">
                You can now log in with your new credentials.
              </p>
              <Link 
                href="/login" 
                className="w-full inline-block py-3 rounded-lg text-sm font-semibold text-black bg-lime-300 hover:bg-lime-200 transition-all duration-200"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}