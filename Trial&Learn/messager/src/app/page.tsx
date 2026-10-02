"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Heart, Settings } from "lucide-react";
import ProfileSetup, { UserProfile } from "@/components/ProfileSetup";
import Chat, { OnlineUser } from "@/components/Chat";
import VideoCall from "@/components/VideoCall";
import { useWebRTC } from "@/hooks/useWebRTC";

export default function Home() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  // Track if the user socket join has been emitted
  const hasJoined = useRef(false);

  const rtc = useWebRTC(socket, currentUser?.displayName || "Family Member");

  // Stable callback — won't change between renders
  const handleProfileReady = useCallback((profile: UserProfile) => {
    setCurrentUser(profile);
  }, []);

  // Initialize Socket.io once
  useEffect(() => {
    let socketInstance: Socket;

    const initSocket = async () => {
      const customSocketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

      if (customSocketUrl) {
        socketInstance = io(customSocketUrl, {
          transports: ["websocket", "polling"],
          reconnectionAttempts: 5,
          reconnectionDelay: 2000,
        });
      } else {
        // Ping the Pages API route to initialize Socket.io server
        try { await fetch("/api/socket"); } catch (_) { /* ignore */ }
        socketInstance = io({
          path: "/api/socket",
          transports: ["websocket", "polling"],
          reconnectionAttempts: 5,
          reconnectionDelay: 2000,
        });
      }

      socketInstance.on("room-users", (users: OnlineUser[]) => {
        setOnlineUsers(users);
      });

      setSocket(socketInstance);
    };

    initSocket();

    return () => {
      socketInstance?.disconnect();
    };
  }, []); // runs once

  // Join 'family-room' when both socket + user are ready
  useEffect(() => {
    if (!socket || !currentUser) return;

    const doJoin = () => {
      if (!hasJoined.current || true) {
        socket.emit("join-room", {
          userId: currentUser.userId,
          displayName: currentUser.displayName,
          profilePicUrl: currentUser.profilePicUrl,
        });
        hasJoined.current = true;
      }
    };

    if (socket.connected) {
      doJoin();
    } else {
      socket.once("connect", doJoin);
      return () => { socket.off("connect", doJoin); };
    }
  }, [socket, currentUser]);

  const handleStartVideoCall = useCallback(
    (targetSocketId: string, targetName: string) => {
      rtc.startCall(targetSocketId, targetName);
    },
    [rtc]
  );

  const isCallActive = rtc.callStatus !== "idle";

  return (
    <main className="min-h-screen bg-[#090a0f] text-zinc-100 flex flex-col selection:bg-emerald-500/30">
      {/* Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/8 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[250px] bg-teal-500/8 blur-[120px] rounded-full" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl sticky top-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-zinc-950 shadow-lg shadow-emerald-500/20">
              <Heart className="h-4 w-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white">Family Messenger</span>
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 hidden sm:block">Instant Chat & HD Video Calling</p>
            </div>
          </div>

          {currentUser && (
            <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 py-1.5 pl-2 pr-3 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentUser.profilePicUrl}
                alt={currentUser.displayName}
                className="h-6 w-6 rounded-full bg-zinc-800 border border-emerald-500/40"
              />
              <span className="text-xs font-semibold text-white max-w-[100px] truncate">
                {currentUser.displayName}
              </span>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-zinc-500 hover:text-white transition-colors cursor-pointer ml-0.5"
                title="Edit Profile"
              >
                <Settings className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-7xl px-4 py-5 sm:px-6">
        {/* Profile Setup Modal */}
        <ProfileSetup
          onProfileReady={handleProfileReady}
          isOpen={isEditProfileOpen ? true : undefined}
          onClose={() => setIsEditProfileOpen(false)}
        />

        {/* Incoming Call Overlay (always mounted to receive calls at any time) */}
        {rtc.callStatus === "incoming" && (
          <VideoCall rtc={rtc} currentUserName={currentUser?.displayName} />
        )}

        {currentUser && (
          <div className={`grid grid-cols-1 gap-5 items-start ${isCallActive && rtc.callStatus !== "incoming" ? "lg:grid-cols-2" : ""}`}>
            {/* Video Call Panel */}
            {isCallActive && rtc.callStatus !== "incoming" && (
              <div className="order-1 lg:order-none">
                <div className="mb-2 text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Video Call
                </div>
                <VideoCall rtc={rtc} currentUserName={currentUser.displayName} />
              </div>
            )}

            {/* Chat Panel */}
            <div className={isCallActive && rtc.callStatus !== "incoming" ? "order-2 lg:order-none" : "max-w-3xl mx-auto w-full"}>
              <Chat
                socket={socket}
                currentUser={currentUser}
                onlineUsers={onlineUsers}
                onStartVideoCall={handleStartVideoCall}
                onEditProfile={() => setIsEditProfileOpen(true)}
              />
            </div>
          </div>
        )}

        {/* Loading state before profile is ready */}
        {!currentUser && (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-zinc-500 space-y-3">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
            <p className="text-sm">Setting up your family room...</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-3 text-center text-[11px] text-zinc-600">
        Family Messenger · Built with Next.js, MongoDB, Socket.io &amp; WebRTC
      </footer>
    </main>
  );
}