"use client";

import React, { useRef, useEffect } from "react";
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  PhoneCall,
  PhoneIncoming,
  User,
  AlertCircle,
} from "lucide-react";
import type { UseWebRTCReturn } from "@/hooks/useWebRTC";

interface VideoCallProps {
  rtc: UseWebRTCReturn;
  currentUserName?: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({ rtc, currentUserName = "You" }) => {
  const {
    localStream,
    remoteStream,
    callStatus,
    callerInfo,
    activePeer,
    isMuted,
    isVideoOff,
    callError,
    answerCall,
    declineCall,
    endCall,
    toggleMic,
    toggleCamera,
  } = rtc;

  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream ?? null;
    }
  }, [localStream]);

  useEffect(() => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream ?? null;
    }
  }, [remoteStream]);

  // Incoming call modal
  if (callStatus === "incoming" && callerInfo) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
        <div className="w-full max-w-sm rounded-3xl border border-zinc-800 bg-zinc-950/95 p-6 text-center shadow-2xl">
          <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-emerald-500/20" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-teal-400 text-black shadow-lg">
              <PhoneIncoming className="h-9 w-9" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Incoming Video Call</h3>
          <p className="mt-1 text-sm font-medium text-emerald-400">{callerInfo.name} is calling...</p>
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={declineCall}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-500 transition hover:scale-105 active:scale-95 cursor-pointer"
              title="Decline"
            >
              <PhoneOff className="h-6 w-6" />
            </button>
            <button
              onClick={answerCall}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 hover:bg-emerald-400 transition hover:scale-105 active:scale-95 cursor-pointer"
              title="Answer"
            >
              <PhoneCall className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (callStatus === "idle" && !callError) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl">
      {callError && (
        <div className="absolute top-3 left-3 right-3 z-40 flex items-center gap-2 rounded-xl bg-red-950/80 border border-red-800 p-2.5 text-xs text-red-200 backdrop-blur-sm">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{callError}</span>
        </div>
      )}

      {/* Remote Video */}
      <div className="relative aspect-video w-full max-h-[520px] min-h-[320px] bg-zinc-900 flex items-center justify-center overflow-hidden">
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            remoteStream && callStatus === "connected" ? "opacity-100" : "opacity-0"
          }`}
        />

        {(!remoteStream || callStatus !== "connected") && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 text-center p-6">
            <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-zinc-400">
              <User className="h-10 w-10" />
              {callStatus === "calling" && (
                <div className="absolute inset-0 animate-ping rounded-full border border-emerald-500/30" />
              )}
            </div>
            <h4 className="text-base font-semibold text-white">{activePeer?.name || "Connecting..."}</h4>
            <p className="mt-1 text-xs text-zinc-400">
              {callStatus === "calling" ? "Ringing..." : callStatus === "connected" ? "Connecting video..." : "Call ended"}
            </p>
          </div>
        )}

        {/* Remote name badge */}
        {callStatus === "connected" && activePeer && (
          <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 rounded-lg bg-black/60 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-md border border-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {activePeer.name}
          </div>
        )}

        {/* Local PiP Video */}
        <div className="absolute bottom-16 right-3 z-30 h-28 w-40 sm:h-32 sm:w-48 overflow-hidden rounded-xl border-2 border-zinc-700/80 bg-zinc-900 shadow-2xl">
          <video
            ref={localVideoRef}
            autoPlay
            playsInline
            muted
            className={`h-full w-full object-cover [transform:scaleX(-1)] ${isVideoOff ? "hidden" : "block"}`}
          />
          {isVideoOff && (
            <div className="flex h-full w-full flex-col items-center justify-center bg-zinc-900 text-zinc-500 gap-1">
              <VideoOff className="h-5 w-5 text-zinc-400" />
              <span className="text-[10px]">Camera Off</span>
            </div>
          )}
          <div className="absolute bottom-1 left-1.5 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] text-white">
            <span>{currentUserName}</span>
            {isMuted && <MicOff className="h-2.5 w-2.5 text-red-400" />}
          </div>
        </div>

        {/* Controls */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 rounded-full border border-zinc-700/60 bg-zinc-900/90 px-4 py-2 shadow-xl backdrop-blur-md">
          <button
            onClick={toggleMic}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all cursor-pointer ${
              isMuted
                ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
            }`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <MicOff className="h-4.5 w-4.5" /> : <Mic className="h-4.5 w-4.5" />}
          </button>
          <button
            onClick={toggleCamera}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all cursor-pointer ${
              isVideoOff
                ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                : "bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700"
            }`}
            title={isVideoOff ? "Turn On Camera" : "Turn Off Camera"}
          >
            {isVideoOff ? <VideoOff className="h-4.5 w-4.5" /> : <VideoIcon className="h-4.5 w-4.5" />}
          </button>
          <button
            onClick={endCall}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30 hover:bg-red-500 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            title="End Call"
          >
            <PhoneOff className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
