"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function VerifyEmail() {
    // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      toast.success("Email verified successfully!", response.data);
    } catch (error: any) {
      setError(true);
      toast.error(error.response?.data?.error || "Verification failed");
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");

    //  const { query } = router;
    // const urlToken = query.token;
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50 text-black">
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-lg shadow-md w-full max-w-sm border border-gray-200">
          <h1 className="text-2xl font-bold text-center mb-2">Verify Email</h1>

          {!verified && !error && (
            <p className="text-gray-600 text-center font-medium">
              {token ? "Verifying your email..." : "Looking for token..."}
            </p>
          )}

          {verified && (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="p-3 w-full bg-green-100 text-green-700 border border-green-300 rounded-lg text-center font-semibold">
                Email Verified Successfully!
              </div>
              <Link
                href="/login"
                className="w-full text-center p-2 mt-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
              >
                Go to Login
              </Link>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="p-3 w-full bg-red-100 text-red-700 border border-red-300 rounded-lg text-center font-semibold">
                Invalid or Expired Token
              </div>
              <Link
                href="/signup"
                className="text-sm text-center text-blue-600 hover:underline"
              >
                Sign up again to get a new token
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
