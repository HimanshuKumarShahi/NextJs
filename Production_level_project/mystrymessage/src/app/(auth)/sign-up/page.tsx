"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useDebounceValue } from "usehooks-ts";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

import { signUpSchema } from "@/schemas/signUpSchema";
import { APIResponse } from "@/types/ApiResponse";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [debouncedUsername] = useDebounceValue(username, 500);
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
      } else {
        setUsernameMessage("");
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APIResponse>("/api/sign-up", data);

      toast.success("Success", {
        description: response.data.message || "Account created successfully.",
      });

      router.replace(`/verify/${data.username}`);
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
    <div className="relative flex justify-center items-center min-h-screen bg-black overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative w-full max-w-md p-8 sm:p-10 space-y-8 bg-zinc-900/40 backdrop-blur-2xl rounded-3xl border border-zinc-800/80 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-br from-white via-orange-100 to-orange-500 bg-clip-text text-transparent pb-1">
            Join MystryMessage
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            Sign up to start receiving anonymous feedback
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel className="text-sm font-medium text-zinc-300 ml-1">
                  Username
                </FieldLabel>
                <Input
                  {...field}
                  autoComplete="on"
                  placeholder="Himanshu"
                  className="h-12 bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600"
                  onChange={(e) => {
                    field.onChange(e);
                    setUsername(e.target.value);
                  }}
                />

                <div className="min-h-[20px] ml-1">
                  {isCheckingUsername && (
                    <FieldDescription className="text-zinc-400 flex items-center gap-2 text-xs font-medium animate-pulse">
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
                      Checking availability...
                    </FieldDescription>
                  )}

                  {!isCheckingUsername && usernameMessage && (
                    <FieldDescription
                      className={`text-xs font-medium flex items-center gap-1.5 ${
                        usernameMessage.toLowerCase().includes("unique") ||
                        usernameMessage.toLowerCase().includes("available")
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </FieldDescription>
                  )}

                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-xs font-medium mt-1"
                    />
                  )}
                </div>
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel className="text-sm font-medium text-zinc-300 ml-1">
                  Email
                </FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="email@gmail.com"
                  className="h-12 bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs font-medium ml-1 mt-1"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel className="text-sm font-medium text-zinc-300 ml-1">
                  Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="h-12 bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 pr-11 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-orange-500 transition-colors focus:outline-none"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs font-medium ml-1 mt-1"
                  />
                )}
              </Field>
            )}
          />

          <div className="pt-2">
            <Button
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-semibold shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              type="submit"
              disabled={
                isSubmitting ||
                isCheckingUsername ||
                (usernameMessage.length > 0 &&
                  !usernameMessage.toLowerCase().includes("unique") &&
                  !usernameMessage.toLowerCase().includes("available"))
              }
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 font-medium">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                  Creating Account...
                </span>
              ) : (
                "Sign Up"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors hover:underline underline-offset-4"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
