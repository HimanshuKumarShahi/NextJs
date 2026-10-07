"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { APIResponse } from "@/types/ApiResponse";

import { verifySchema } from "@/schemas/verifySchema";
// If you don't have it exported yet, here is the fallback:
// const verifySchema = z.object({
//   code: z.string().length(6, "Verification code must be 6 digits"),
// });

export default function VerifyAccountPage() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<APIResponse>("/api/verify-code", {
        username: params.username,
        code: data.code,
      });

      toast.success("Success", {
        description: response.data.message || "Account verified successfully!",
      });

      router.replace("/sign-in");
    } catch (error) {
      console.error("Error verifying account:", error);
      const axiosError = error as AxiosError<APIResponse>;
      let errorMessage = axiosError.response?.data.message;

      toast.error("Verification Failed", {
        description: errorMessage || "An error occurred while verifying.",
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
            Verify Account
          </h1>
          <p className="text-sm font-medium text-zinc-400">
            Enter the verification code sent to your email
          </p>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-zinc-800/50 border border-zinc-700/50 text-orange-400 text-xs font-mono">
            {params.username}
          </div>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <Controller
            name="code"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className="space-y-1.5">
                <FieldLabel className="text-sm font-medium text-zinc-300 ml-1">
                  Verification Code
                </FieldLabel>
                <Input
                  {...field}
                  placeholder="######"
                  maxLength={6}
                  className="h-12 bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 text-center tracking-widest text-lg focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600 placeholder:tracking-normal placeholder:text-sm"
                />
                {fieldState.invalid && (
                  <FieldError
                    errors={[fieldState.error]}
                    className="text-red-500 text-xs font-medium ml-1 mt-1 text-center"
                  />
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
                  Verifying...
                </span>
              ) : (
                "Verify Account"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
