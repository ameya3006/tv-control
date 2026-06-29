const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let currentIndex = -1;
let playing = false;

// 📺 get current video
app.get("/video", (req, res) => {
  res.json({
    url: playlist[currentIndex] || "",
    playing: playing
  });
});

// ➕ add video
app.post("/add", (req, res) => {
  playlist.push(req.body.url);
  res.sendStatus(200);
});

// ▶ start first
app.post("/start", (req, res) => {
  if (playlist.length > 0) {
    currentIndex = 0;
    playing = true;
  }
  res.sendStatus(200);
});

// ⏸ pause
app.post("/pause", (req, res) => {
  playing = false;
  res.sendStatus(200);
});

// ▶ resume
app.post("/resume", (req, res) => {
  playing = true;
  res.sendStatus(200);
});

// ⏭ next
app.post("/next", (req, res) => {
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    playing = true;
  }
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
