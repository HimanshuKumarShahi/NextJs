import type { NextApiRequest, NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket as NetSocket } from "net";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Schema";

export interface SocketServer extends HTTPServer {
  io?: ServerIO;
}

export interface SocketWithIO extends NetSocket {
  server: SocketServer;
}

export interface NextApiResponseServerIO extends NextApiResponse {
  socket: SocketWithIO;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

// In-memory mapping of active family members in the room: socketId -> userInfo
const activeUsers = new Map<
  string,
  { socketId: string; userId: string; displayName: string; profilePicUrl?: string }
>();

export default function SocketHandler(
  _req: NextApiRequest,
  res: NextApiResponseServerIO
) {
  if (!res.socket.server.io) {
    console.log("⚡ Initializing Socket.io server on Next.js...");

    const io = new ServerIO(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    io.on("connection", (socket) => {
      console.log(`🔌 Client connected: ${socket.id}`);

      // 1. 'join-room': Puts everyone in default 'family-room'
      socket.on(
        "join-room",
        (userData?: { userId: string; displayName: string; profilePicUrl?: string }) => {
          socket.join("family-room");

          if (userData && userData.userId) {
            activeUsers.set(socket.id, {
              socketId: socket.id,
              userId: userData.userId,
              displayName: userData.displayName || "Family Member",
              profilePicUrl: userData.profilePicUrl || "",
            });
          }

          console.log(`👨‍👩‍👧‍👦 Socket ${socket.id} joined 'family-room' (${userData?.displayName || "Unknown"})`);

          // Send back the current active online users in family-room
          const usersList = Array.from(activeUsers.values());
          io.to("family-room").emit("room-users", usersList);
        }
      );

      // 2. 'send-message': Receives message, saves to MongoDB, broadcasts to all
      socket.on("send-message", async (data: { senderId: string; senderName: string; text: string }) => {
        try {
          console.log(`💬 Message from ${data.senderName}: "${data.text}"`);

          // Ensure database connection
          await connectDB();

          // Save to MongoDB
          const savedMessage = await Message.create({
            senderId: data.senderId,
            senderName: data.senderName,
            text: data.text,
            createdAt: new Date(),
          });

          // Broadcast to all connected clients in the room
          io.to("family-room").emit("receive-message", savedMessage);
        } catch (error) {
          console.error("❌ Error saving/broadcasting message in socket:", error);
          socket.emit("error-message", { error: "Failed to deliver message" });
        }
      });

      // 3. 'webrtc-signal': Pass-through event for WebRTC offers, answers, and ICE candidates
      socket.on("webrtc-signal", (payload: {
        to: string; // Target socket ID
        signal: unknown; // RTCSessionDescriptionInit | RTCIceCandidateInit
        type: string; // 'offer' | 'answer' | 'candidate' | 'call-user' | 'call-ended' | 'call-declined'
        senderName?: string;
        senderUserId?: string;
      }) => {
        const { to, signal, type, senderName, senderUserId } = payload;
        
        if (to) {
          // Forward the WebRTC signal to the specific target socket
          io.to(to).emit("webrtc-signal", {
            from: socket.id,
            signal,
            type,
            senderName: senderName || activeUsers.get(socket.id)?.displayName || "Family Member",
            senderUserId: senderUserId || activeUsers.get(socket.id)?.userId || "",
          });
        }
      });

      // Handle disconnect
      socket.on("disconnect", () => {
        console.log(`❌ Client disconnected: ${socket.id}`);
        activeUsers.delete(socket.id);
        const usersList = Array.from(activeUsers.values());
        io.to("family-room").emit("room-users", usersList);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
