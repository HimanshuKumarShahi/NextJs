"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
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
    <div className="flex justify-center items-center min-h-screen bg-slate-900">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-950 rounded-lg border border-slate-800 shadow-xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6 text-slate-100">
            Join MystryMessage
          </h1>
          <p className="mb-4 text-slate-400">
            Sign up to start receiving anonymous feedback
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="username"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-slate-200">Username</FieldLabel>
                <Input
                  {...field}
                  autoComplete="off"
                  placeholder="johndoe123"
                  aria-invalid={fieldState.invalid}
                  className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-indigo-500"
                  onChange={(e) => {
                    field.onChange(e);
                    setUsername(e.target.value);
                  }}
                />

                {isCheckingUsername && (
                  <FieldDescription className="text-slate-400 flex items-center gap-2">
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                    Checking...
                  </FieldDescription>
                )}

                {!isCheckingUsername && usernameMessage && (
                  <FieldDescription
                    className={
                      usernameMessage.toLowerCase().includes("unique") ||
                      usernameMessage.toLowerCase().includes("available")
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {usernameMessage}
                  </FieldDescription>
                )}

                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-sm"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-slate-200">Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="johndoe@example.com"
                  className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-indigo-500"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-sm"
                  />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-2">
                <FieldLabel className="text-slate-200">Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  placeholder="••••••••"
                  className="bg-slate-900 border-slate-800 text-slate-100 focus-visible:ring-indigo-500"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-400 text-sm"
                  />
                )}
              </Field>
            )}
          />

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white disabled:bg-indigo-800 disabled:text-slate-300"
            type="submit"
            disabled={isSubmitting || isCheckingUsername}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Signing Up...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="text-center mt-4">
          <p className="text-slate-400">
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
