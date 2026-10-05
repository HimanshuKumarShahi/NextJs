"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

import { signUpSchema } from "@/schemas/signUpSchema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function SignUpPage() {
  const router = useRouter();
  const [username, setUsername] = React.useState("");
  const [usernameMessage, setUsernameMessage] = React.useState("");
  const [isCheckingUsername, setIsCheckingUsername] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const [debouncedUsername] = useDebounceValue(username, 300);

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });


  React.useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername.length >= 2) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await fetch(
            `/api/check-username-unique?username=${debouncedUsername}`,
          );
          const data = await response.json();
          setUsernameMessage(data.message);
        } catch (error) {
          setUsernameMessage("Error checking username");
        } finally {
          setIsCheckingUsername(false);
        }
      } else {
        setUsernameMessage("");
      }
    };

    checkUsernameUnique();
  }, [debouncedUsername]);

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Sign Up Failed", {
          description: result.message || "Something went wrong.",
        });
        return;
      }

      toast.success("Success!", {
        description: "Please check your email for the verification code.",
      });

      router.replace(`/verify/${data.username}`);
    } catch (error) {
      console.error("Error signing up:", error);
      toast.error("Network Error", {
        description: "Could not reach the server. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] bg-slate-950 px-4">
      <Card className="w-full sm:max-w-md border-slate-800 bg-slate-900 shadow-[0_0_40px_-15px_rgba(79,70,229,0.15)]">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-100">
            Join MystryMessage
          </CardTitle>
          <CardDescription className="text-slate-400">
            Sign up to start receiving anonymous feedback.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup className="space-y-5">
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field
                    data-invalid={
                      fieldState.invalid ||
                      usernameMessage === "Username is already taken."
                    }
                  >
                    <FieldLabel htmlFor="username" className="text-slate-200">
                      Username
                    </FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      autoComplete="off"
                      placeholder="johndoe"
                      className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-indigo-500 h-11"
                      onChange={(e) => {
                        field.onChange(e);
                        setUsername(e.target.value); 
                      }}
                    />

                    {isCheckingUsername && (
                      <FieldDescription className="text-slate-400 flex items-center gap-2">
                        <div className="h-3 w-3 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
                        Checking availability...
                      </FieldDescription>
                    )}
                    {!isCheckingUsername && usernameMessage && (
                      <FieldDescription
                        className={
                          usernameMessage === "Username is unique."
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
                        className="text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email" className="text-slate-200">
                      Email
                    </FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="johndoe@example.com"
                      className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-indigo-500 h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-400"
                      />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password" className="text-slate-200">
                      Password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      className="bg-slate-950 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-indigo-500 h-11"
                    />
                    {fieldState.invalid && (
                      <FieldError
                        errors={[fieldState.error]}
                        className="text-red-400"
                      />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col gap-5 border-t border-slate-800/60 pt-6">
          <Button
            type="submit"
            form="sign-up-form"
            disabled={
              isSubmitting ||
              isCheckingUsername ||
              usernameMessage === "Username is already taken."
            }
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium h-11"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Registering...
              </span>
            ) : (
              "Sign Up"
            )}
          </Button>

          <div className="text-sm text-center text-slate-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
