const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// middleware
app.use(cors());
app.use(express.json());

// ✅ IMPORTANT: serve HTML files (FIX for Cannot GET /tv.html)
app.use(express.static(__dirname));

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

// Home route (optional)
app.get("/", (req, res) => {
  res.send("TV Control Server Running 🚀");
});

// Socket logic
io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  // join room
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`📺 Joined room: ${roomId} | ${socket.id}`);
  });

  // load video
  socket.on("load-video", (data) => {
    console.log(`🎬 Load video in ${data.roomId}`);
    io.to(data.roomId).emit("load-video", data.url);
  });

  // play
  socket.on("play", (roomId) => {
    console.log(`▶ Play in ${roomId}`);
    io.to(roomId).emit("play");
  });

  // pause
  socket.on("pause", (roomId) => {
    console.log(`⏸ Pause in ${roomId}`);
    io.to(roomId).emit("pause");
  });

  // next
  socket.on("next", (roomId) => {
    console.log(`⏭ Next in ${roomId}`);
    io.to(roomId).emit("next");
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// start server
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
});
