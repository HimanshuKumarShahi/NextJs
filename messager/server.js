const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/family_messenger";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ [Render Server] MongoDB connected successfully"))
  .catch((err) => console.error("❌ [Render Server] MongoDB connection error:", err));

// Message Schema for standalone server
const MessageSchema = new mongoose.Schema(
  {
    senderId: { type: String, required: true, index: true },
    senderName: { type: String, required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.models.Message || mongoose.model("Message", MessageSchema);

// Create HTTP server & Socket.io
const server = http.createServer((req, res) => {
  if (req.url === "/health" || req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "Family Messenger Socket Server" }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// In-memory mapping of active family members in the room
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log(`🔌 [Render Server] Client connected: ${socket.id}`);

  // 1. 'join-room': Puts everyone in default 'family-room'
  socket.on("join-room", (userData) => {
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

    const usersList = Array.from(activeUsers.values());
    io.to("family-room").emit("room-users", usersList);
  });

  // 2. 'send-message': Receives message, saves to MongoDB, broadcasts to all
  socket.on("send-message", async (data) => {
    try {
      console.log(`💬 Message from ${data.senderName}: "${data.text}"`);

      const savedMessage = await Message.create({
        senderId: data.senderId,
        senderName: data.senderName,
        text: data.text,
        createdAt: new Date(),
      });

      io.to("family-room").emit("receive-message", savedMessage);
    } catch (error) {
      console.error("❌ Error saving/broadcasting message:", error);
      socket.emit("error-message", { error: "Failed to deliver message" });
    }
  });

  // 3. 'webrtc-signal': Pass-through event for WebRTC offers, answers, and ICE candidates
  socket.on("webrtc-signal", (payload) => {
    const { to, signal, type, senderName, senderUserId } = payload;
    if (to) {
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

server.listen(PORT, () => {
  console.log(`🚀 [Render Server] Socket.io server running on port ${PORT}`);
});
