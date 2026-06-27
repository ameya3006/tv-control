const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Simple health check route
app.get("/", (req, res) => {
  res.send("Socket.IO Server Running 🚀");
});

// Track rooms (optional use)
const rooms = {};

io.on("connection", (socket) => {
  console.log("✅ Client connected:", socket.id);

  // JOIN ROOM
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push(socket.id);

    console.log(`📺 ${socket.id} joined room: ${roomId}`);
  });

  // LOAD VIDEO
  socket.on("load-video", (data) => {
    console.log("🎬 Load video:", data);
    io.to(data.roomId).emit("load-video", data.url);
  });

  // PLAY
  socket.on("play", (roomId) => {
    console.log("▶ Play in room:", roomId);
    io.to(roomId).emit("play");
  });

  // PAUSE
  socket.on("pause", (roomId) => {
    console.log("⏸ Pause in room:", roomId);
    io.to(roomId).emit("pause");
  });

  // NEXT
  socket.on("next", (roomId) => {
    console.log("⏭ Next in room:", roomId);
    io.to(roomId).emit("next");
  });

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
  console.log("📡 Socket.IO Ready");
});
