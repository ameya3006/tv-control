const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let current = {
  url: "",
  isPlaying: false
};

// 🔥 Playlist system
let playlist = [];
let index = 0;

// 🎮 Control API
app.post("/set", (req, res) => {
  const { url, action } = req.body;

  if (url) current.url = url;

  if (action === "play") current.isPlaying = true;
  if (action === "pause") current.isPlaying = false;

  res.send({ success: true });
});

// 🎵 Receive playlist
app.post("/playlist", (req, res) => {
  playlist = req.body.list || [];
  index = 0;
  console.log("Playlist:", playlist);
  res.send({ success: true });
});

// ⏭ Auto next video
app.get("/next", (req, res) => {
  if (playlist.length === 0) {
    return res.send({ success: false });
  }

  index++;
  if (index >= playlist.length) index = 0;

  current.url = playlist[index];
  current.isPlaying = true;

  console.log("Next video:", current.url);

  res.send({ success: true });
});

// 📺 TV fetch
app.get("/get", (req, res) => {
  res.json(current);
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "control.html"));
});

app.get("/tv.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tv.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
