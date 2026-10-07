"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { signInSchema } from "@/schemas/signInSchema"; 

export default function SignInPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    
    try {
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      if (result?.error) {
        toast.error("Login Failed", {
          description: "Incorrect username or password. Please try again.",
        });
      } else if (result?.url) {
        toast.success("Welcome Back!", {
          description: "You have successfully signed in.",
        });
        router.replace("/dashboard");
      }
    } catch (error) {
      toast.error("Error", {
        description: "Something went wrong connecting to the server.",
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
            Welcome Back To Mystry Message.
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            Sign in to continue your secret conversations
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          <Controller
            name="identifier"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel className="text-sm font-medium text-zinc-300 ml-1">Email or Username</FieldLabel>
                <Input
                  {...field}
                  autoComplete="username"
                  placeholder="email or username"
                  className="h-12 bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-red-500 text-xs font-medium ml-1 mt-1" />
                )}
              </Field>
            )}
          />

          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel className="text-sm font-medium text-zinc-300 ml-1">Password</FieldLabel>
                <Input
                  {...field}
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="h-12 bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-red-500 text-xs font-medium ml-1 mt-1" />
                )}
              </Field>
            )}
          />

          <div className="pt-2">
            <Button
              className="w-full h-12 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-semibold shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2 font-medium">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/80 border-t-transparent" />
                  Signing In...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-zinc-400">
            Not a member?{" "}
            <Link
              href="/sign-up"
              className="text-orange-500 hover:text-orange-400 font-semibold transition-colors hover:underline underline-offset-4"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}