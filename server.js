const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let currentVideo = "";
let isPlaying = false; // ✅ default false ठेव

// 🎬 PLAY (ONLY when button clicked)
app.post("/play", (req, res) => {
  if (req.body.url) {
    currentVideo = req.body.url;
  }
  isPlaying = true; // ✅ इथेच true होईल
  res.send("Playing");
});

// ⏸ PAUSE
app.post("/pause", (req, res) => {
  isPlaying = false;
  res.send("Paused");
});

// ▶ RESUME
app.post("/resume", (req, res) => {
  isPlaying = true;
  res.send("Resumed");
});

// 📡 TV API
app.get("/video", (req, res) => {
  res.json({
    url: currentVideo,
    playing: isPlaying
  });
});

// ❗ RESET when server starts (IMPORTANT)
app.get("/reset", (req, res) => {
  isPlaying = false;
  currentVideo = "";
  res.send("Reset done");
});

app.listen(3000, () => console.log("Server running"));
