'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);

      console.log("Login Success", response.data);
      toast.success("Login Successful!"); 

      router.push("/profile");
    } catch (error: any) {
      console.log("Login Failed");
      toast.error(error.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} /> 

      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-black">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-sm border border-gray-200">
          
          <h1 className="text-2xl font-bold text-center mb-4">
            {loading ? "Processing..." : "Log in"}
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</label>
            <input 
              id="email"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="email"
              placeholder="Enter your email"
              value={user.email}
              onChange={(e) => setUser({...user, email: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-semibold text-gray-700">Password</label>
            <input 
              id="password"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
            />
          </div>
          
          <button 
            onClick={onLogin}
            disabled={buttonDisabled || loading}
            className="p-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          
          <Link href="/signup" className="text-sm text-center text-blue-600 hover:underline mt-2">
            Don't have an account? Sign up
          </Link>

        </div>
      </div>
    </>
  );
}