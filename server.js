const express = require("express");
const app = express();

app.use(express.json());

let videoUrl = "";
let isPlaying = false;

// GET video + state
app.get("/video", (req, res) => {
  res.json({
    url: videoUrl,
    playing: isPlaying
  });
});

// SET video
app.post("/play", (req, res) => {
  videoUrl = req.body.url;
  isPlaying = true;
  res.send("Video set & playing");
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
