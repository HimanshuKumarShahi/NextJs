'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-black">
        <div className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-sm border border-gray-200">
          
          <h1 className="text-2xl font-bold text-center mb-2">Profile</h1>
          <hr className="mb-2" />

          {loading ? (
            <p className="text-center text-gray-600 font-medium py-4">Loading user data...</p>
          ) : user ? (
            <div className="flex flex-col gap-3">
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>
              
              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>

              <div className="p-3 bg-gray-50 border border-gray-100 rounded-lg flex justify-between items-center">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Account Status</p>
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${user.isVerified ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {user.isVerified ? 'Verified' : 'Unverified'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-red-500 font-medium mb-4">No user data found.</p>
              <Link href="/login" className="text-blue-600 hover:underline">
                Go back to Login
              </Link>
            </div>
          )}

          <button 
            onClick={logout}
            className="p-2 mt-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium w-full"
          >
            Logout
          </button>
          
        </div>
      </div>
    </>
  );
}