'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      toast.success("Signup Successful! Please login.",response.data); 

      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Signup failed"); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
            {loading ? "Processing..." : "Sign up"}
          </h1>
          
          <div className="flex flex-col gap-1">
            <label htmlFor="username" className="text-sm font-semibold text-gray-700">Username</label>
            <input 
              id="username"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Enter your username"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
            />
          </div>

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
            onClick={onSignup}
            disabled={buttonDisabled || loading}
            className="p-2 mt-4 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
          
          <Link href="/login" className="text-sm text-center text-blue-600 hover:underline mt-2">
            Already have an account? Log in
          </Link>

        </div>
      </div>
    </>
  );
}