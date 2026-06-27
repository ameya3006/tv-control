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

// Store rooms (TV groups)
const rooms = {};

// When client connects
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // JOIN ROOM (TV or Controller)
  socket.on("join-room", (roomId) => {
    socket.join(roomId);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    rooms[roomId].push(socket.id);

    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  // PLAY VIDEO
  socket.on("play", (roomId) => {
    io.to(roomId).emit("play");
  });

  // PAUSE VIDEO
  socket.on("pause", (roomId) => {
    io.to(roomId).emit("pause");
  });

  // NEXT VIDEO
  socket.on("next", (roomId) => {
    io.to(roomId).emit("next");
  });

  // LOAD VIDEO
  socket.on("load-video", (data) => {
    // data = { roomId, url }
    io.to(data.roomId).emit("load-video", data.url);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Test route
app.get("/", (req, res) => {
  res.send("Socket.IO Server Running 🚀");
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
