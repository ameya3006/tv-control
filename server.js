const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

let playlist = [];
let currentIndex = -1;
let playing = false;

// 👉 ADD video
app.post("/set", (req, res) => {
  const url = req.body.url;

  if (!url) return res.send("no url");

  playlist.push(url);

  if (currentIndex === -1) currentIndex = 0;

  console.log("Playlist:", playlist);

  res.send("ok");
});

// 👉 START
app.post("/start", (req, res) => {
  playing = true;
  res.send("ok");
});

// 👉 PLAY
app.post("/resume", (req, res) => {
  playing = true;
  res.send("ok");
});

// 👉 PAUSE
app.post("/pause", (req, res) => {
  playing = false;
  res.send("ok");
});

// 👉 NEXT
app.post("/next", (req, res) => {
  if (playlist.length === 0) return res.send("no videos");

  currentIndex = (currentIndex + 1) % playlist.length;

  console.log("Next:", playlist[currentIndex]);

  res.send("ok");
});

// 👉 VIDEO DATA
app.get("/video", (req, res) => {
  res.json({
    url: playlist[currentIndex] || "",
    playing
  });
});

app.listen(3000, () => console.log("Server running"));
