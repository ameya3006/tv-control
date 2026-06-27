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

// Health check
app.get("/", (req, res) => {
  res.send("TV Control Server Running 🚀");
});

io.on("connection", (socket) => {
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    console.log(`📺 Joined room: ${roomId} | ${socket.id}`);
  });

  socket.on("load-video", (data) => {
    console.log(`🎬 Load video in ${data.roomId}`);
    io.to(data.roomId).emit("load-video", data.url);
  });

  socket.on("play", (roomId) => {
    console.log(`▶ Play in ${roomId}`);
    io.to(roomId).emit("play");
  });

  socket.on("pause", (roomId) => {
    console.log(`⏸ Pause in ${roomId}`);
    io.to(roomId).emit("pause");
  });

  socket.on("next", (roomId) => {
    console.log(`⏭ Next in ${roomId}`);
    io.to(roomId).emit("next");
  });

  socket.on("disconnect", () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("🚀 Server running on port", PORT);
  console.log("📡 Socket.IO Ready");
});
