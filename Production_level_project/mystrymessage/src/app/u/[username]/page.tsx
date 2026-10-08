"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { MessageSchema } from "@/schemas/messageSchema";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { APIResponse } from "@/types/ApiResponse";


const messageSchema = z.object({
  content: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(300, "Message must be no longer than 300 characters."),
});

export default function PublicProfilePage() {
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestedMessages, setSuggestedMessages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof MessageSchema>>({
    resolver: zodResolver(MessageSchema), 
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof MessageSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<APIResponse>("/api/send-message", {
        username: params.username,
        content: data.content,
      });

      toast.success("Message Sent!", {
        description:
          response.data.message || "Your anonymous message was delivered.",
      });
      form.reset();
    } catch (error) {
      const axiosError = error as AxiosError<APIResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message || "Failed to send message.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchSuggestedMessages = async () => {
    setIsSuggesting(true);
    try {
      const response = await axios.post("/api/suggest-messages", {
        username: params.username,
      });

      const messagesString = response.data.message;

      const messagesArray = messagesString
        .split("||")
        .map((m: string) => m.trim())
        .filter((m: string) => m.length > 0);

      setSuggestedMessages(messagesArray);
      toast.success("AI Suggestions Loaded", { description: "Powered by AI" });
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      const axiosError = error as AxiosError<APIResponse>;

      if (axiosError.response?.status === 403) {
        toast.error("Inbox Closed", {
          description:
            axiosError.response?.data.message ||
            "This user is not accepting messages.",
        });
      } else {
        toast.error("Error", {
          description:
            axiosError.response?.data.message || "Failed to send message.",
        });
      }
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleSuggestionClick = (message: string) => {
    form.setValue("content", message);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden px-4 py-12 md:py-24">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-100">
            Public Profile Link
          </h1>
          <p className="text-lg text-zinc-400">
            Send an anonymous message to{" "}
            <span className="text-orange-500 font-mono font-bold">
              @{params.username}
            </span>
          </p>
        </div>

        <div className="p-6 md:p-8 bg-zinc-900/40 backdrop-blur-xl rounded-3xl border border-zinc-800/80 shadow-2xl">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="space-y-2">
                  <FieldLabel className="text-zinc-300 font-semibold ml-1">
                    Your Secret Message
                  </FieldLabel>
                  <Textarea
                    {...field}
                    placeholder="Write your anonymous thoughts here..."
                    className="min-h-[120px] resize-none bg-zinc-950/80 border-zinc-800 text-zinc-100 rounded-xl px-4 py-3 focus-visible:ring-2 focus-visible:ring-orange-500/50 focus-visible:border-orange-500 transition-all duration-300 placeholder:text-zinc-600"
                  />
                  {fieldState.invalid && (
                    <FieldError
                      errors={[fieldState.error]}
                      className="text-red-500 text-sm mt-1 ml-1"
                    />
                  )}
                </Field>
              )}
            />

            <Button
              className="h-12 px-8 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-semibold shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50"
              type="submit"
              disabled={isSubmitting || !form.watch("content")}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" /> Send It Anonymously
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="space-y-6">
          <Button
            onClick={fetchSuggestedMessages}
            disabled={isSuggesting}
            className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100 border border-zinc-700 rounded-xl font-semibold transition-colors w-full md:w-auto"
          >
            {isSuggesting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-orange-500" />{" "}
                Generating...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-orange-500" /> Suggest
                Messages
              </span>
            )}
          </Button>

          <div className="p-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
            <h3 className="text-zinc-300 font-semibold mb-4">
              Click any message to use it:
            </h3>
            <div className="space-y-3 flex flex-col items-start">
              {suggestedMessages.length > 0 ? (
                suggestedMessages.map((msg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSuggestionClick(msg)}
                    className="text-left w-full p-4 rounded-xl border border-zinc-800 bg-zinc-950/50 text-zinc-400 hover:text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/5 transition-all duration-200"
                  >
                    {msg}
                  </button>
                ))
              ) : (
                <p className="text-zinc-600 italic">
                  No suggestions loaded yet. Click the button above.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="pt-12 text-center space-y-4 border-t border-zinc-800/80">
          <h3 className="text-xl font-bold text-zinc-200">
            Want your own message board?
          </h3>
          <p className="text-zinc-400">
            Sign up today and start receiving anonymous feedback.
          </p>
          <Link href="/sign-up" className="inline-block">
            <Button className="mt-2 bg-zinc-100 hover:bg-white text-black font-bold rounded-xl px-8 h-12 shadow-lg">
              Create Your Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
