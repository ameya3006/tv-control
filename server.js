const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// GET current video + state
app.get("/video", (req, res) => {
  res.json({
    url: playlist[currentIndex] || "",
    playing: isPlaying
  });
});

// ADD video
app.post("/add", (req, res) => {
  playlist.push(req.body.url);
  res.send("Added");
});

// PLAY (start from first)
app.post("/start", (req, res) => {
  currentIndex = 0;
  isPlaying = true;
  res.send("Started");
});

// NEXT
app.post("/next", (req, res) => {
  if (currentIndex < playlist.length - 1) {
    currentIndex++;
    isPlaying = true;
  }
  res.send("Next");
});

// PAUSE
app.post("/pause", (req, res) => {
  isPlaying = false;
  res.send("Paused");
});

// RESUME
app.post("/resume", (req, res) => {
  isPlaying = true;
  res.send("Resumed");
});

app.listen(3000, () => console.log("Server running"));
