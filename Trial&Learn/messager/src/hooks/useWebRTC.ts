"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Socket } from "socket.io-client";

const ICE_SERVERS: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
};

export type CallStatus = "idle" | "calling" | "incoming" | "connected" | "ended";

export interface CallerInfo {
  socketId: string;
  name: string;
  userId?: string;
}

export interface UseWebRTCReturn {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  callStatus: CallStatus;
  callerInfo: CallerInfo | null;
  activePeer: CallerInfo | null;
  isMuted: boolean;
  isVideoOff: boolean;
  callError: string | null;
  startCall: (targetSocketId: string, targetName?: string) => Promise<void>;
  answerCall: () => Promise<void>;
  declineCall: () => void;
  endCall: () => void;
  toggleMic: () => boolean;
  toggleCamera: () => boolean;
}

export function useWebRTC(
  socket: Socket | null,
  currentUserName: string = "Family Member"
): UseWebRTCReturn {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [callStatus, setCallStatus] = useState<CallStatus>("idle");
  const [callerInfo, setCallerInfo] = useState<CallerInfo | null>(null);
  const [activePeer, setActivePeer] = useState<CallerInfo | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callError, setCallError] = useState<string | null>(null);

  // All mutable refs — never in useEffect dependency arrays
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const incomingOfferRef = useRef<RTCSessionDescriptionInit | null>(null);
  const candidateQueue = useRef<RTCIceCandidateInit[]>([]);
  const activePeerRef = useRef<CallerInfo | null>(null);
  const callerInfoRef = useRef<CallerInfo | null>(null);
  const currentUserNameRef = useRef(currentUserName);
  const socketRef = useRef(socket);

  // Keep refs in sync without causing re-renders
  useEffect(() => { activePeerRef.current = activePeer; }, [activePeer]);
  useEffect(() => { callerInfoRef.current = callerInfo; }, [callerInfo]);
  useEffect(() => { currentUserNameRef.current = currentUserName; }, [currentUserName]);
  useEffect(() => { socketRef.current = socket; }, [socket]);

  // ─── helpers (stable refs, never re-created) ─────────────────────────────
  const cleanupCall = useCallback(() => {
    if (pcRef.current) {
      pcRef.current.onicecandidate = null;
      pcRef.current.ontrack = null;
      pcRef.current.oniceconnectionstatechange = null;
      pcRef.current.close();
      pcRef.current = null;
    }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
      setLocalStream(null);
    }
    setRemoteStream(null);
    setCallStatus("idle");
    setCallerInfo(null);
    setActivePeer(null);
    incomingOfferRef.current = null;
    candidateQueue.current = [];
  }, []); // no deps — all state setters & refs are stable

  const processCandidateQueue = useCallback(async (pc: RTCPeerConnection) => {
    while (candidateQueue.current.length > 0) {
      const cand = candidateQueue.current.shift();
      if (cand) {
        try { await pc.addIceCandidate(new RTCIceCandidate(cand)); }
        catch (e) { console.error("Error adding queued ICE candidate:", e); }
      }
    }
  }, []); // no deps

  const initMedia = useCallback(async (): Promise<MediaStream | null> => {
    if (localStreamRef.current) return localStreamRef.current;
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error("Camera/Microphone not supported or requires HTTPS.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: true,
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      return stream;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Could not access camera/microphone";
      setCallError(msg);
      return null;
    }
  }, []); // no deps

  const createPeerConnection = useCallback(
    (targetSocketId: string, stream: MediaStream): RTCPeerConnection => {
      pcRef.current?.close();
      const pc = new RTCPeerConnection(ICE_SERVERS);
      pcRef.current = pc;

      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      pc.onicecandidate = (event) => {
        if (event.candidate && socketRef.current) {
          socketRef.current.emit("webrtc-signal", {
            to: targetSocketId,
            signal: event.candidate,
            type: "candidate",
          });
        }
      };

      const newRemoteStream = new MediaStream();
      pc.ontrack = (event) => {
        event.streams[0]?.getTracks().forEach((t) => newRemoteStream.addTrack(t));
        setRemoteStream(newRemoteStream);
      };

      pc.oniceconnectionstatechange = () => {
        if (["disconnected", "failed", "closed"].includes(pc.iceConnectionState)) {
          setCallStatus("ended");
          setTimeout(cleanupCall, 1500);
        }
      };

      return pc;
    },
    [cleanupCall] // cleanupCall is stable
  );

  // ─── Public API ──────────────────────────────────────────────────────────

  const startCall = useCallback(
    async (targetSocketId: string, targetName?: string) => {
      const sock = socketRef.current;
      if (!sock) { setCallError("Socket not connected"); return; }

      setCallError(null);
      setCallStatus("calling");
      const peer = { socketId: targetSocketId, name: targetName || "Family Member" };
      setActivePeer(peer);

      const stream = await initMedia();
      if (!stream) { setCallStatus("idle"); return; }

      const pc = createPeerConnection(targetSocketId, stream);
      try {
        const offer = await pc.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: true });
        await pc.setLocalDescription(offer);
        sock.emit("webrtc-signal", {
          to: targetSocketId, signal: offer, type: "offer",
          senderName: currentUserNameRef.current,
        });
      } catch (err) {
        console.error("Error creating offer:", err);
        setCallError("Failed to initiate call");
        cleanupCall();
      }
    },
    [initMedia, createPeerConnection, cleanupCall]
  );

  const answerCall = useCallback(async () => {
    const sock = socketRef.current;
    const caller = callerInfoRef.current;
    if (!sock || !caller || !incomingOfferRef.current) {
      setCallError("No incoming call to answer");
      return;
    }

    setCallError(null);
    setActivePeer(caller);

    const stream = await initMedia();
    if (!stream) { setCallStatus("idle"); return; }

    const pc = createPeerConnection(caller.socketId, stream);
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(incomingOfferRef.current));
      await processCandidateQueue(pc);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      sock.emit("webrtc-signal", {
        to: caller.socketId, signal: answer, type: "answer",
        senderName: currentUserNameRef.current,
      });
      setCallStatus("connected");
    } catch (err) {
      console.error("Error answering call:", err);
      setCallError("Failed to establish video connection");
      cleanupCall();
    }
  }, [initMedia, createPeerConnection, processCandidateQueue, cleanupCall]);

  const declineCall = useCallback(() => {
    const sock = socketRef.current;
    const caller = callerInfoRef.current;
    if (sock && caller) {
      sock.emit("webrtc-signal", {
        to: caller.socketId, signal: null, type: "call-declined",
        senderName: currentUserNameRef.current,
      });
    }
    setCallStatus("idle");
    setCallerInfo(null);
    incomingOfferRef.current = null;
    candidateQueue.current = [];
  }, []);

  const endCall = useCallback(() => {
    const peer = activePeerRef.current || callerInfoRef.current;
    const sock = socketRef.current;
    if (sock && peer?.socketId) {
      sock.emit("webrtc-signal", {
        to: peer.socketId, signal: null, type: "call-ended",
        senderName: currentUserNameRef.current,
      });
    }
    cleanupCall();
  }, [cleanupCall]);

  const toggleMic = useCallback((): boolean => {
    const audioTrack = localStreamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
      return audioTrack.enabled;
    }
    return false;
  }, []);

  const toggleCamera = useCallback((): boolean => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
      return videoTrack.enabled;
    }
    return false;
  }, []);

  // ─── Socket signal listener ───────────────────────────────────────────────
  useEffect(() => {
    if (!socket) return;

    const handleSignal = async (payload: {
      from: string;
      signal: RTCSessionDescriptionInit | RTCIceCandidateInit | null;
      type: string;
      senderName?: string;
      senderUserId?: string;
    }) => {
      const { from, signal, type, senderName, senderUserId } = payload;

      if (type === "offer" && signal) {
        incomingOfferRef.current = signal as RTCSessionDescriptionInit;
        setCallerInfo({ socketId: from, name: senderName || "Family Member", userId: senderUserId });
        setCallStatus("incoming");
      } else if (type === "answer" && signal && pcRef.current) {
        try {
          await pcRef.current.setRemoteDescription(new RTCSessionDescription(signal as RTCSessionDescriptionInit));
          await processCandidateQueue(pcRef.current);
          setCallStatus("connected");
        } catch (e) { console.error("Error setting remote answer:", e); }
      } else if (type === "candidate" && signal) {
        if (pcRef.current?.remoteDescription) {
          try { await pcRef.current.addIceCandidate(new RTCIceCandidate(signal as RTCIceCandidateInit)); }
          catch (e) { console.error("Error adding ICE candidate:", e); }
        } else {
          candidateQueue.current.push(signal as RTCIceCandidateInit);
        }
      } else if (type === "call-declined") {
        setCallError(`${senderName || "Family member"} declined the call.`);
        setCallStatus("ended");
        setTimeout(cleanupCall, 2000);
      } else if (type === "call-ended") {
        setCallStatus("ended");
        setTimeout(cleanupCall, 1500);
      }
    };

    socket.on("webrtc-signal", handleSignal);
    return () => { socket.off("webrtc-signal", handleSignal); };
  }, [socket, processCandidateQueue, cleanupCall]);

  return {
    localStream, remoteStream, callStatus, callerInfo, activePeer,
    isMuted, isVideoOff, callError,
    startCall, answerCall, declineCall, endCall, toggleMic, toggleCamera,
  };
}

export default useWebRTC;
