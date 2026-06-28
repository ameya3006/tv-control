const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// ✅ static folder (MOST IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

let playlist = [];
let current = 0;

let state = {
  url: "",
  isPlaying: false
};

// APIs
app.get("/state", (req, res) => res.json(state));

app.post("/add", (req, res) => {
  playlist.push(req.body.url);
  res.sendStatus(200);
});

app.get("/playlist", (req, res) => res.json(playlist));

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

// default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/control.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
