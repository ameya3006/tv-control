const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let playlist = [];
let currentIndex = 0;
let playing = false;
let devices = {};

// 📺 TV sync API
app.get("/video", (req, res) => {
  const id = req.query.tv || "unknown";

  devices[id] = Date.now();

  res.json({
    url: playlist[currentIndex] || "",
    playing
  });
});

// 📊 status
app.get("/status", (req, res) => {
  const now = Date.now();

  const activeDevices = Object.keys(devices)
    .filter(id => now - devices[id] < 15000)
    .map(id => ({
      id,
      lastSeen: devices[id]
    }));

  res.json({
    devices: activeDevices,
    playlist,
    currentIndex,
    playing
  });
});

// ➕ add video
app.post("/add", (req, res) => {
  const { url } = req.body;
  if (url) playlist.push(url);
  res.sendStatus(200);
});

// ▶ controls
app.post("/start", (req, res) => { playing = true; res.sendStatus(200); });
app.post("/play", (req, res) => { playing = true; res.sendStatus(200); });
app.post("/pause", (req, res) => { playing = false; res.sendStatus(200); });

app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    currentIndex = (currentIndex + 1) % playlist.length;
  }
  res.sendStatus(200);
});

// 🔥 Render safe port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
