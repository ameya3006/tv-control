const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let current = 0;
let isPlaying = false;
let ended = false;

// ➕ Add video
app.post("/add", (req, res) => {
  playlist.push(req.body.url);
  res.sendStatus(200);
});

// ▶ Start playlist
app.post("/start", (req, res) => {
  current = 0;
  isPlaying = true;
  ended = false;
  res.sendStatus(200);
});

// ▶ Play
app.post("/play", (req, res) => {
  isPlaying = true;
  res.sendStatus(200);
});

// ⏸ Pause
app.post("/pause", (req, res) => {
  isPlaying = false;
  res.sendStatus(200);
});

// ⏭ Next
app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    current = (current + 1) % playlist.length;
    ended = false;
  }
  res.sendStatus(200);
});

// 📺 Current video
app.get("/current", (req, res) => {
  res.json({
    url: playlist[current] || "",
    isPlaying
  });
});

// 📜 Playlist
app.get("/playlist", (req, res) => {
  res.json(playlist);
});

// 🔥 Ended
app.post("/ended", (req, res) => {
  ended = true;
  isPlaying = false;
  res.sendStatus(200);
});

// 📊 Status
app.get("/status", (req, res) => {
  res.json({ ended, isPlaying });
});

app.listen(3000, () => console.log("Server running"));
