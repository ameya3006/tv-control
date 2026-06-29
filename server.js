const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let currentIndex = -1;
let playing = false;

// 🔥 TV tracking
let tvs = {};

// 📺 get current video
app.get("/video", (req, res) => {
  const tv = req.query.tv || "unknown";

  // 🔥 update last seen
  tvs[tv] = {
    lastSeen: Date.now()
  };

  res.json({
    url: playlist[currentIndex] || "",
    playing: playing
  });
});

// 👀 ACTIVE COUNT
app.get("/active-count", (req, res) => {
  const now = Date.now();

  let active = 0;

  for (let tv in tvs) {
    if (now - tvs[tv].lastSeen < 10000) {
      active++;
    }
  }

  res.json({ active });
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
