"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import {
  Copy,
  RefreshCcw,
  ShieldCheck,
  MessageSquare,
  Settings2,
  Link2,
  Quote,
} from "lucide-react";

import MessageCard from "@/components/message_card/MessageCard";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { APIResponse } from "@/types/ApiResponse";

import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";

export interface Message {
  _id: string;
  content: string;
  createdAt: string | Date;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  const { data: session, status } = useSession();

  const form = useForm<z.infer<typeof AcceptMessageSchema>>({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });

  const { control, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<APIResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages as boolean);
    } catch (error) {
      console.error("Error fetching message settings:", error);
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(async (refresh: boolean = false) => {
    setIsLoading(true);
    try {
      const response = await axios.get<APIResponse>("/api/get-messages");

      setMessages((response.data.messages as unknown as Message[]) || []);
      if (refresh) {
        toast.success("Inbox Synced", { description: "You are up to date." });
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      if (refresh) {
        toast.error("Error", { description: "Failed to fetch new messages." });
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!session || !session.user) return;
    fetchMessages();
    fetchAcceptMessage();
  }, [session, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async (checked: boolean) => {
    setValue("acceptMessages", checked);
    try {
      await axios.post<APIResponse>("/api/accept-messages", {
        acceptMessages: checked,
      });
      toast.success("Settings Updated", {
        description: `Your profile is now ${checked ? "open" : "closed"} to new messages.`,
      });
    } catch (error) {
      setValue("acceptMessages", !checked);
      toast.error("Error", { description: "Failed to update settings." });
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    setMessages(messages.filter((msg) => msg._id !== messageId));
    try {
      await axios.delete<APIResponse>(`/api/delete-message/${messageId}`);
      toast.success("Message Destroyed", {
        description: "The secret is gone forever.",
      });
    } catch (error) {
      toast.error("Error", { description: "Failed to delete message." });
    }
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-t-2 border-l-2 border-orange-500 animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full border-b-2 border-r-2 border-amber-500 animate-spin-reverse"></div>
        </div>
      </div>
    );
  }

  if (!session || !session.user) return null;

  const username = session.user.username;
  const baseUrl =
    typeof window !== "undefined"
      ? `${window.location.protocol}//${window.location.host}`
      : "";
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Link Copied!", {
      description: "Paste it on your Instagram, Twitter, or anywhere.",
    });
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden px-4 py-8 md:py-16 lg:px-24">

      <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
    
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-orange-400 text-sm font-medium">
              <ShieldCheck className="h-4 w-4" /> Secure Inbox
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Command{" "}
              <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                Center
              </span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Welcome back,{" "}
              <span className="font-mono text-zinc-200">@{username}</span>
            </p>
          </div>
        </div>

      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2 p-1 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-3xl">
            <div className="h-full w-full bg-zinc-950/90 backdrop-blur-2xl rounded-[23px] p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="flex items-center gap-3 text-zinc-100">
                <Link2 className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-bold">Your Secret Link</h2>
              </div>
              <p className="text-zinc-400 text-sm">
                Share this link on your social media bios to start receiving
                anonymous messages.
              </p>
              <div className="flex items-center gap-3">
                <Input
                  readOnly
                  value={profileUrl}
                  className="h-14 font-mono text-sm bg-black border-zinc-800 text-zinc-300 rounded-xl px-4 focus-visible:ring-1 focus-visible:ring-orange-500 focus-visible:border-orange-500"
                />
                <Button
                  onClick={copyToClipboard}
                  className="h-14 px-8 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white rounded-xl font-bold shadow-[0_0_20px_-5px_rgba(234,88,12,0.4)] hover:shadow-[0_0_25px_-5px_rgba(234,88,12,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                >
                  <Copy className="h-5 w-5 mr-2" />
                  Copy
                </Button>
              </div>
            </div>
          </div>

     
          <div className="p-1 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-3xl">
            <div className="h-full w-full bg-zinc-950/90 backdrop-blur-2xl rounded-[23px] p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="flex items-center gap-3 text-zinc-100">
                <Settings2 className="h-6 w-6 text-orange-500" />
                <h2 className="text-xl font-bold">Inbox Status</h2>
              </div>
              <p className="text-zinc-400 text-sm">
                Toggle whether anyone can send you new messages through your
                link.
              </p>

              <div className="flex items-center justify-between p-4 rounded-xl border border-zinc-800 bg-black/50">
                <span
                  className={`font-semibold ${acceptMessages ? "text-emerald-400" : "text-zinc-500"}`}
                >
                  {acceptMessages ? "Accepting Messages" : "Inbox Closed"}
                </span>
                <Controller
                  control={control}
                  name="acceptMessages"
                  render={({ field }) => (
                    <Switch
                      checked={field.value ?? false}
                      onCheckedChange={handleSwitchChange}
                      disabled={isSwitchLoading}
                      className="data-[state=checked]:bg-orange-500 data-[state=unchecked]:bg-zinc-700"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-8 border-t border-zinc-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <MessageSquare className="h-7 w-7 text-white" />
              <h2 className="text-3xl font-bold text-white">Your Inbox</h2>
              <span className="ml-2 px-3 py-1 bg-orange-500/10 text-orange-500 rounded-full text-sm font-bold border border-orange-500/20">
                {messages.length}
              </span>
            </div>
            <Button
              onClick={() => fetchMessages(true)}
              variant="outline"
              className="h-12 px-6 border-zinc-700 hover:bg-zinc-800 text-zinc-300 rounded-xl font-semibold transition-all group"
            >
              <RefreshCcw
                className={`h-4 w-4 mr-2 text-orange-500 ${isLoading ? "animate-spin" : "group-hover:rotate-180 transition-transform duration-500"}`}
              />
              Refresh
            </Button>
          </div>

          {messages.length === 0 ? (
            <div className="w-full p-16 flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-950/30 space-y-4">
              <div className="h-20 w-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
                <MessageSquare className="h-8 w-8 text-zinc-600" />
              </div>
              <h3 className="text-xl font-bold text-zinc-300">
                It's quiet here...
              </h3>
              <p className="text-zinc-500 text-center max-w-sm">
                Share your unique link with your audience or friends to start
                receiving anonymous feedback.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {messages.map((message) => (
                <MessageCard
                  key={message._id}
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
