const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let currentVideo = "";
let isPlaying = false; // ✅ ALWAYS FALSE START

// 🎬 Play
app.post("/play", (req, res) => {
  currentVideo = req.body.url || currentVideo;
  isPlaying = true;
  res.send("Playing");
});

// ⏸ Pause
app.post("/pause", (req, res) => {
  isPlaying = false;
  res.send("Paused");
});

// ▶ Resume
app.post("/resume", (req, res) => {
  isPlaying = true;
  res.send("Resumed");
});

// 📡 API
app.get("/video", (req, res) => {
  res.json({
    url: currentVideo,
    playing: isPlaying
  });
});

app.listen(3000, () => {
  console.log("Server started");

  // 🔥 FORCE RESET EVERY START
  currentVideo = "";
  isPlaying = false;
});
