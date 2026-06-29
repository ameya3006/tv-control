const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let videos = [];
let currentIndex = -1;
let playing = false;

// 🎥 GET CURRENT VIDEO
app.get("/video", (req, res) => {
  res.json({
    url: currentIndex >= 0 ? videos[currentIndex] : "",
    playing: playing
  });
});

// ➕ ADD VIDEO
app.post("/add", (req, res) => {
  const { url } = req.body;

  if (url) {
    videos.push(url);
    if (currentIndex === -1) currentIndex = 0;
  }

  res.sendStatus(200);
});

// ▶️ PLAY
app.post("/play", (req, res) => {
  playing = true;
  res.sendStatus(200);
});

// ⏸ PAUSE + RESET
app.post("/pause", (req, res) => {
  playing = false;
  currentIndex = -1;
  videos = [];
  res.sendStatus(200);
});

// ⏭ NEXT
app.post("/next", (req, res) => {
  if (videos.length > 0) {
    currentIndex = (currentIndex + 1) % videos.length;
    playing = true;
  }
  res.sendStatus(200);
});

// 🔥 IMPORTANT (RENDER FIX)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
