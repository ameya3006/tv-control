const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let playlist = [];
let currentIndex = 0;

let current = {
  url: "",
  isPlaying: false,
  ended: false // 🔥 NEW
};

// 🎮 SET STATE / PLAYLIST
app.post("/set", (req, res) => {
  const { url, action, list } = req.body;

  if (list && Array.isArray(list)) {
    playlist = list;
    currentIndex = 0;
    current.url = playlist[0] || "";
    current.isPlaying = true;
    current.ended = false;
  }

  if (url) {
    current.url = url;
  }

  if (action === "play") current.isPlaying = true;
  if (action === "pause") current.isPlaying = false;

  res.json({ success: true });
});

// 📺 TV fetch
app.get("/get", (req, res) => {
  res.json(current);
});

// 🔥 NEXT
app.get("/next", (req, res) => {
  if (playlist.length === 0) {
    return res.json({ url: null });
  }

  currentIndex++;

  if (currentIndex >= playlist.length) {
    currentIndex = 0;
  }

  current.url = playlist[currentIndex];
  current.isPlaying = true;
  current.ended = false; // 🔥 RESET

  res.json(current);
});

// 🔥 STATUS (control.html साठी)
app.get("/status", (req, res) => {
  res.json({
    ended: current.ended
  });
});

// 🔥 TV → server notify
app.get("/status-update", (req, res) => {
  current.ended = true;
  res.json({ ok: true });
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
