const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let current = -1; // 🔥 important
let isPlaying = false;

// ✅ ADD VIDEO (NO REPLACE)
app.post("/add", (req, res) => {
  const url = req.body.url;

  if (url && url.trim() !== "") {
    playlist.push(url); // 🔥 always push
  }

  res.json({ playlist });
});

// ✅ START PLAYING
app.post("/start", (req, res) => {
  if (playlist.length > 0) {
    current = 0;
    isPlaying = true;
  }
  res.sendStatus(200);
});

// ✅ PLAY
app.post("/play", (req, res) => {
  isPlaying = true;
  res.sendStatus(200);
});

// ✅ PAUSE
app.post("/pause", (req, res) => {
  isPlaying = false;
  res.sendStatus(200);
});

// ✅ NEXT VIDEO
app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    current = (current + 1) % playlist.length;
  }
  res.sendStatus(200);
});

// ✅ CURRENT VIDEO
app.get("/current", (req, res) => {
  if (current === -1) {
    return res.json({ url: "", isPlaying: false });
  }

  res.json({
    url: playlist[current],
    isPlaying
  });
});

// ✅ GET PLAYLIST
app.get("/playlist", (req, res) => {
  res.json(playlist);
});

app.listen(3000, () => console.log("Server running on 3000"));
