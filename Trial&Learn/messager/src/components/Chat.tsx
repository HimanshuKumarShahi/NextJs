"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import type { Socket } from "socket.io-client";
import {
  Send,
  Video,
  Users,
  CheckCheck,
  MessageSquare,
  Wifi,
  WifiOff,
} from "lucide-react";
import type { UserProfile } from "./ProfileSetup";

export interface MessageItem {
  _id?: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: string | Date;
}

export interface OnlineUser {
  socketId: string;
  userId: string;
  displayName: string;
  profilePicUrl?: string;
}

interface ChatProps {
  socket: Socket | null;
  currentUser: UserProfile | null;
  onlineUsers: OnlineUser[];
  onStartVideoCall: (targetSocketId: string, targetName: string) => void;
  onEditProfile?: () => void;
}

export const Chat: React.FC<ChatProps> = ({
  socket,
  currentUser,
  onlineUsers,
  onStartVideoCall,
  onEditProfile,
}) => {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const didFetch = useRef(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  // Track socket connection state
  useEffect(() => {
    if (!socket) return;
    setIsConnected(socket.connected);
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  // Fetch message history once on mount
  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    const fetchHistory = async () => {
      try {
        setIsLoadingHistory(true);
        const res = await fetch("/api/messages?limit=100");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data.messages)) {
            setMessages(data.messages);
          }
        }
      } catch (err) {
        console.error("Failed to fetch message history:", err);
      } finally {
        setIsLoadingHistory(false);
        setTimeout(() => scrollToBottom("auto"), 100);
      }
    };

    fetchHistory();
  }, [scrollToBottom]);

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;
    const handleReceiveMessage = (newMessage: MessageItem) => {
      setMessages((prev) => [...prev, newMessage]);
      setTimeout(() => scrollToBottom("smooth"), 50);
    };
    socket.on("receive-message", handleReceiveMessage);
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [socket, scrollToBottom]);

  const handleSendMessage = useCallback(
    (e?: React.FormEvent) => {
      e?.preventDefault();
      const trimmed = inputText.trim();
      if (!trimmed || !currentUser) return;

      const payload = {
        senderId: currentUser.userId,
        senderName: currentUser.displayName,
        text: trimmed,
      };

      if (socket?.connected) {
        socket.emit("send-message", payload);
      } else {
        // REST fallback
        fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
          .then((r) => r.json())
          .then((data) => {
            if (data.message) {
              setMessages((prev) => [...prev, data.message]);
              setTimeout(() => scrollToBottom("smooth"), 50);
            }
          })
          .catch(console.error);
      }

      setInputText("");
    },
    [inputText, currentUser, socket, scrollToBottom]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateStr: string | Date) => {
    try {
      return new Date(dateStr).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  const otherOnlineUsers = onlineUsers.filter((u) => u.userId !== currentUser?.userId);

  return (
    <div className="flex h-[750px] max-h-[85vh] w-full flex-col rounded-2xl border border-zinc-800 bg-zinc-950/90 shadow-2xl backdrop-blur-md overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 px-4 py-3.5 bg-zinc-900/60 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={
                currentUser?.profilePicUrl ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(currentUser?.displayName || "Me")}`
              }
              alt={currentUser?.displayName || "Me"}
              className="h-9 w-9 rounded-full border border-zinc-700 bg-zinc-800 object-cover"
            />
            <span
              className={`absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-zinc-950 ${
                isConnected ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="font-semibold text-white text-sm truncate max-w-[120px]">
                {currentUser?.displayName}
              </h2>
              <button
                onClick={onEditProfile}
                className="text-[10px] text-zinc-500 hover:text-emerald-400 underline underline-offset-2 transition-colors cursor-pointer flex-shrink-0"
              >
                Edit
              </button>
            </div>
            <div className="flex items-center gap-1 text-xs">
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                  <span className="text-emerald-400 font-medium">Live</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-amber-400 flex-shrink-0" />
                  <span className="text-amber-400">Reconnecting...</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Online Family Members */}
        <div className="flex items-center gap-1.5 flex-wrap justify-end max-w-[55%]">
          {otherOnlineUsers.length === 0 ? (
            <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[11px] text-zinc-500">
              <Users className="h-3 w-3 flex-shrink-0" />
              <span className="truncate">Waiting for family...</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 flex-wrap justify-end">
              {otherOnlineUsers.slice(0, 3).map((user) => (
                <button
                  key={user.socketId}
                  onClick={() => onStartVideoCall(user.socketId, user.displayName)}
                  className="group inline-flex items-center gap-1 rounded-full border border-zinc-700/80 bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white transition hover:border-emerald-500 hover:bg-emerald-500/10 cursor-pointer"
                  title={`Call ${user.displayName}`}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="truncate max-w-[60px]">{user.displayName}</span>
                  <Video className="h-3 w-3 text-emerald-400 flex-shrink-0" />
                </button>
              ))}
              {otherOnlineUsers.length > 3 && (
                <span className="text-[11px] text-zinc-500">+{otherOnlineUsers.length - 3}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
        {isLoadingHistory ? (
          <div className="flex h-full flex-col items-center justify-center text-zinc-500 space-y-2">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="text-xs">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center p-6 text-zinc-500 space-y-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-400">
              <MessageSquare className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-semibold text-zinc-300">No messages yet</h3>
              <p className="text-xs text-zinc-500 mt-1 max-w-xs">
                Say hello to your family! Messages here appear live for everyone.
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.senderId === currentUser?.userId;
            return (
              <div
                key={msg._id || `${msg.senderId}-${index}`}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                {!isMe && (
                  <span className="mb-0.5 text-[11px] font-semibold text-zinc-400 pl-1">
                    {msg.senderName}
                  </span>
                )}
                <div
                  className={`relative max-w-[78%] sm:max-w-[68%] rounded-2xl px-3.5 py-2 text-sm shadow-sm ${
                    isMe
                      ? "rounded-br-sm bg-gradient-to-br from-emerald-500 to-teal-500 text-zinc-950 font-medium"
                      : "rounded-bl-sm border border-zinc-800 bg-zinc-900 text-zinc-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words leading-relaxed">{msg.text}</p>
                  <div
                    className={`mt-0.5 flex items-center justify-end gap-1 text-[10px] ${
                      isMe ? "text-emerald-900/70" : "text-zinc-500"
                    }`}
                  >
                    <span>{formatTime(msg.createdAt)}</span>
                    {isMe && <CheckCheck className="h-3 w-3" />}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="border-t border-zinc-800/80 bg-zinc-900/50 p-3 flex-shrink-0"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a family message..."
            className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors min-w-0"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 shadow-md transition hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
