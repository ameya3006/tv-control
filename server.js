const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let currentVideo = "";
let isPlaying = false;

// ▶ PLAY
app.post("/play", (req, res) => {
  currentVideo = req.body.url;
  isPlaying = true;
  console.log("PLAY:", currentVideo);
  res.send("Playing");
});

// ⏸ PAUSE
app.post("/pause", (req, res) => {
  isPlaying = false;
  res.send("Paused");
});

// 📡 API
app.get("/video", (req, res) => {
  res.json({
    url: currentVideo,
    playing: isPlaying
  });
});

app.listen(3000, () => {
  console.log("Server running");
});
