const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let videos = [];
let currentIndex = -1;
let playing = false;

// 🎥 get video
app.get("/video", (req, res) => {
  res.json({
    url: currentIndex >= 0 ? videos[currentIndex] : "",
    playing: playing
  });
});

// ➕ add video
app.post("/add", (req, res) => {
  const { url } = req.body;
  if (url) {
    videos.push(url);
    if (currentIndex === -1) currentIndex = 0;
  }
  res.sendStatus(200);
});

// ▶️ play
app.post("/play", (req, res) => {
  playing = true;
  res.sendStatus(200);
});

// ⏸ pause + reset
app.post("/pause", (req, res) => {
  playing = false;
  currentIndex = -1; // 🔥 RESET
  videos = [];
  res.sendStatus(200);
});

// ⏭ next
app.post("/next", (req, res) => {
  if (videos.length > 0) {
    currentIndex = (currentIndex + 1) % videos.length;
    playing = true;
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
