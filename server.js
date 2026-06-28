const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let currentIndex = 0;

let state = {
  url: "",
  isPlaying: false
};

// ➕ Add video
app.post("/add", (req, res) => {
  const { url } = req.body;
  if (url) {
    playlist.push(url);
  }
  res.sendStatus(200);
});

// 📂 Get playlist
app.get("/playlist", (req, res) => {
  res.json(playlist);
});

// ▶ START (first video)
app.post("/start", (req, res) => {
  if (playlist.length > 0) {
    currentIndex = 0;
    state.url = playlist[currentIndex];
    state.isPlaying = true;
  }
  res.sendStatus(200);
});

// ▶ PLAY
app.post("/play", (req, res) => {
  state.isPlaying = true;
  res.sendStatus(200);
});

// ⏸ PAUSE
app.post("/pause", (req, res) => {
  state.isPlaying = false;
  res.sendStatus(200);
});

// ⏭ NEXT
app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    currentIndex = (currentIndex + 1) % playlist.length;
    state.url = playlist[currentIndex];
    state.isPlaying = true;
  }
  res.sendStatus(200);
});

// 📡 STATE (TV fetch karega)
app.get("/state", (req, res) => {
  res.json(state);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
