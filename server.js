const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let playlist = [];
let current = 0;

let state = {
  url: "",
  isPlaying: false
};

app.get("/state", (req, res) => {
  res.json(state);
});

app.post("/add", (req, res) => {
  playlist.push(req.body.url);
  res.sendStatus(200);
});

app.get("/playlist", (req, res) => {
  res.json(playlist);
});

app.post("/start", (req, res) => {
  if (playlist.length > 0) {
    current = 0;
    state.url = playlist[current];
    state.isPlaying = true;
  }
  res.sendStatus(200);
});

app.post("/play", (req, res) => {
  state.isPlaying = true;
  res.sendStatus(200);
});

app.post("/pause", (req, res) => {
  state.isPlaying = false;
  res.sendStatus(200);
});

app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    current = (current + 1) % playlist.length;
    state.url = playlist[current];
    state.isPlaying = true;
  }
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Server running"));
