const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let current = -1;
let isPlaying = false;

app.post("/add", (req, res) => {
  const url = req.body.url;
  if (url && url.trim() !== "") {
    playlist.push(url);
  }
  res.json({ playlist });
});

app.post("/start", (req, res) => {
  if (playlist.length > 0) {
    current = 0;
    isPlaying = true;
  }
  res.sendStatus(200);
});

app.post("/play", (req, res) => {
  isPlaying = true;
  res.sendStatus(200);
});

app.post("/pause", (req, res) => {
  isPlaying = false;
  res.sendStatus(200);
});

app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    current = (current + 1) % playlist.length;
  }
  res.sendStatus(200);
});

app.get("/current", (req, res) => {
  if (current === -1) {
    return res.json({ url: "", isPlaying: false });
  }

  res.json({
    url: playlist[current],
    isPlaying
  });
});

app.get("/playlist", (req, res) => {
  res.json(playlist);
});

app.listen(3000, () => console.log("Server running"));
