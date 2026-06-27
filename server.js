const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let playlist = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://media.w3.org/2010/05/bunny/trailer.mp4"
];

let currentIndex = 0;

let current = {
  url: playlist[0],
  isPlaying: true
};

let videoEnded = false;

// 📺 TV GET
app.get("/get", (req, res) => {
  res.json(current);
});

// ▶ NEXT
app.get("/next", (req, res) => {
  currentIndex = (currentIndex + 1) % playlist.length;

  current.url = playlist[currentIndex];
  current.isPlaying = true;
  videoEnded = false;

  res.json(current);
});

// 🎬 VIDEO ENDED (TV → SERVER)
app.post("/ended", (req, res) => {
  videoEnded = true;
  console.log("VIDEO ENDED");
  res.json({ success: true });
});

// 📱 STATUS (PHONE)
app.get("/status", (req, res) => {
  res.json({
    ended: videoEnded,
    current: current
  });
});

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "control.html"));
});

app.get("/tv.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tv.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
