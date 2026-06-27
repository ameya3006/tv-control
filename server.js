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

// 🎮 update state
app.post("/set", (req, res) => {
  const { url, action, list } = req.body;

  // 👉 playlist set
  if (list && Array.isArray(list)) {
    playlist = list;
    currentIndex = 0;
    current.url = playlist[0] || "";
  }

  // 👉 single video set
  if (url) {
    current.url = url;
  }

  if (action === "play") {
    current.isPlaying = true;
  }

  if (action === "pause") {
    current.isPlaying = false;
  }

  console.log("STATE:", current, "PLAYLIST:", playlist);

  res.json({ success: true });
});

// 📺 TV fetch state
app.get("/get", (req, res) => {
  res.json(current);
});

// 🔥 NEXT VIDEO
app.get("/next", (req, res) => {
  if (playlist.length === 0) {
    return res.json({ url: null });
  }

  currentIndex++;

  if (currentIndex >= playlist.length) {
    currentIndex = 0; // loop
  }

  current.url = playlist[currentIndex];

  res.json({ url: current.url });
});

// default routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "control.html"));
});

app.get("/tv.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tv.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
