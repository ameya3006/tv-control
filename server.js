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
  isPlaying: false
};

let videoEnded = false;

// 🔥 SET PLAYLIST / CONTROL
app.post("/set", (req, res) => {
  const { list, url, action } = req.body;

  if (list && Array.isArray(list)) {
    playlist = list;
    currentIndex = 0;
    current.url = playlist[0] || "";
    current.isPlaying = true;
    videoEnded = false;
  }

  if (url) current.url = url;

  if (action === "play") current.isPlaying = true;
  if (action === "pause") current.isPlaying = false;

  res.json({ success: true });
});

// 📺 TV GET
app.get("/get", (req, res) => {
  res.json(current);
});

// 🔥 NEXT
app.get("/next", (req, res) => {
  if (playlist.length === 0) {
    return res.json({ url: null });
  }

  currentIndex = (currentIndex + 1) % playlist.length;

  current.url = playlist[currentIndex];
  current.isPlaying = true;
  videoEnded = false;

  console.log("NEXT:", current.url);

  res.json(current);
});

// 🔥 VIDEO ENDED (TV → SERVER)
app.post("/ended", (req, res) => {
  videoEnded = true;
  console.log("VIDEO ENDED");
  res.json({ success: true });
});

// 🔥 STATUS (CONTROL)
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
