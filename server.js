const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ IMPORTANT: static files serve
app.use(express.static(__dirname));

let playlist = [];
let current = 0;

let state = {
  url: "",
  isPlaying: false
};

// ✅ control page (main page)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "control.html"));
});

// ✅ optional direct route (fix for your error)
app.get("/control.html", (req, res) => {
  res.sendFile(path.join(__dirname, "control.html"));
});

// tv state
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

// ⚠️ Render uses PORT env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on", PORT));
