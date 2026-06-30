const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let playlist = [];
let currentIndex = 0;
let playing = false;
let devices = {};

// 📺 TV API
app.get("/video", (req, res) => {
  const id = req.query.tv || "unknown";
  const name = req.query.name || "TV";

  devices[id] = { id, name, lastSeen: Date.now() };

  res.json({
    url: playlist[currentIndex] || "",
    playing
  });
});

// 📊 status
app.get("/status", (req, res) => {
  const activeDevices = Object.values(devices).filter(
    d => Date.now() - d.lastSeen < 15000
  );

  res.json({
    devices: activeDevices,
    playlist,
    currentIndex,
    playing
  });
});

// ➕ add
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
  if (playlist.length) {
    currentIndex = (currentIndex + 1) % playlist.length;
  }
  res.sendStatus(200);
});

// 🔥 Render FIX
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on", PORT));
