"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller, Form } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";

// shadcn hooks and components
import { toast } from "sonner";
import { signUpSchema } from "@/schemas/signUpSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";
import { APIResponse } from "@/types/ApiResponse";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 300);
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${debouncedUsername}`,
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<APIResponse>;
          setUsernameMessage(
            axiosError.response?.data.message || "Error checking username",
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APIResponse>("/api/sign-up", data);

      toast.success("Success", {
        description: response.data.message || "Please check your email...",
      });

      router.replace(`/verify/${username}`);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in sign-up:", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;
      toast.error("Sign Up Failed", {
        description: errorMessage || "There was a problem signing up.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
     <div className="relative min-h-screen overflow-hidden bg-slate-950">
    {/* Background */}
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>

    <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="mb-7 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              className="h-7 w-7 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M7 4h10a3 3 0 013 3v6a3 3 0 01-3 3h-3l-4 4v-4H7a3 3 0 01-3-3V7a3 3 0 013-3z"
              />
            </svg>
          </div>

          <span className="text-sm font-semibold tracking-wide text-indigo-400">
            MYSTRYMESSAGE
          </span>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">

          {/* Heading */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Create your account
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              Join MystryMessage and start receiving
              <br className="hidden sm:block" />
              anonymous feedback from others.
            </p>
          </div>

         
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* Username */}
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-slate-200">
                      Username
                    </FieldLabel>

                    <div className="relative">
                      <span className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-slate-500">
                        @
                      </span>

                      <Input
                        {...field}
                        autoComplete="off"
                        placeholder="johndoe123"
                        aria-invalid={fieldState.invalid}
                        className="
                          h-12 rounded-xl
                          border-slate-800
                          bg-slate-950/70
                          pl-9
                          text-slate-100
                          placeholder:text-slate-600
                          transition-all duration-200
                          hover:border-slate-700
                          focus:border-indigo-500
                          focus-visible:ring-2
                          focus-visible:ring-indigo-500/20
                        "
                        onChange={(e) => {
                          field.onChange(e);
                          setUsername(e.target.value);
                        }}
                      />
                    </div>

                    {/* Username checking */}
                    {isCheckingUsername && (
                      <FieldDescription className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                        Checking username availability...
                      </FieldDescription>
                    )}

                    {/* Username response */}
                    {!isCheckingUsername && usernameMessage && (
                      <FieldDescription
                        className={`mt-2 flex items-center gap-1.5 text-xs ${
                          usernameMessage
                            .toLowerCase()
                            .includes("unique") ||
                          usernameMessage
                            .toLowerCase()
                            .includes("available")
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        <span>
                          {usernameMessage
                            .toLowerCase()
                            .includes("unique") ||
                          usernameMessage
                            .toLowerCase()
                            .includes("available")
                            ? "✓"
                            : "×"}
                        </span>

                        {usernameMessage}
                      </FieldDescription>
                    )}

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="mt-2 text-xs text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-slate-200">
                      Email address
                    </FieldLabel>

                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>

                      <Input
                        {...field}
                        type="email"
                        placeholder="johndoe@example.com"
                        className="
                          h-12 rounded-xl
                          border-slate-800
                          bg-slate-950/70
                          pl-11
                          text-slate-100
                          placeholder:text-slate-600
                          transition-all duration-200
                          hover:border-slate-700
                          focus:border-indigo-500
                          focus-visible:ring-2
                          focus-visible:ring-indigo-500/20
                        "
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="mt-2 text-xs text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className="mb-2 text-sm font-medium text-slate-200">
                      Password
                    </FieldLabel>

                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10V7a4.5 4.5 0 00-9 0v3m-1 0h11a2 2 0 012 2v7a2 2 0 01-2 2h-11a2 2 0 01-2-2v-7a2 2 0 012-2z"
                        />
                      </svg>

                      <Input
                        {...field}
                        type="password"
                        placeholder="••••••••"
                        className="
                          h-12 rounded-xl
                          border-slate-800
                          bg-slate-950/70
                          pl-11
                          text-slate-100
                          placeholder:text-slate-600
                          transition-all duration-200
                          hover:border-slate-700
                          focus:border-indigo-500
                          focus-visible:ring-2
                          focus-visible:ring-indigo-500/20
                        "
                      />
                    </div>

                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="mt-2 text-xs text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              {/* Terms */}
              <p className="pt-1 text-xs leading-5 text-slate-500">
                By creating an account, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-slate-300 transition-colors hover:text-indigo-400"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-slate-300 transition-colors hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
                .
              </p>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting || isCheckingUsername}
                className="
                  group
                  relative
                  h-12
                  w-full
                  overflow-hidden
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-600
                  to-purple-600
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-indigo-600/20
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:from-indigo-500
                  hover:to-purple-500
                  hover:shadow-indigo-600/30
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />

                <span className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 12h14M13 6l6 6-6 6"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-800" />

            <span className="text-[10px] font-medium tracking-widest text-slate-600">
              OR
            </span>

            <div className="h-px flex-1 bg-slate-800" />
          </div>

          {/* Login */}
          <div className="text-center">
            <p className="text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-semibold text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-600">
          Anonymous. Simple. Private.
        </p>
      </div>
    </div>
  </div>
  );
}
