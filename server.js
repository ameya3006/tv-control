const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

// 🔥 GLOBAL STATE
let playlist = [];
let currentIndex = 0;
let playing = false;
let devices = {};

// 📺 TV FETCH
app.get("/video", (req, res) => {
  const id = req.query.tv || "unknown";
  const name = req.query.name || "TV";

  devices[id] = { id, name, lastSeen: Date.now() };

  const url = playlist[currentIndex] || "";

  res.json({
    url,
    playing
  });
});

// 📊 STATUS API
app.get("/status", (req, res) => {
  const activeDevices = Object.values(devices).filter(
    d => Date.now() - d.lastSeen < 5000
  );

  res.json({
    devices: activeDevices,
    playlist,
    currentIndex,
    playing
  });
});

// ➕ ADD VIDEO
app.post("/add", (req, res) => {
  const { url } = req.body;
  if (url) playlist.push(url);
  res.send("ok");
});

// ▶ START
app.post("/start", (req, res) => {
  currentIndex = 0;
  playing = true;
  res.send("ok");
});

// ▶ PLAY
app.post("/play", (req, res) => {
  playing = true;
  res.send("ok");
});

// ⏸ PAUSE
app.post("/pause", (req, res) => {
  playing = false;
  res.send("ok");
});

// ⏭ NEXT
app.post("/next", (req, res) => {
  if (playlist.length > 0) {
    currentIndex = (currentIndex + 1) % playlist.length;
  }
  res.send("ok");
});

// 🔥 CLEAR PLAYLIST (NEW)
app.post("/clear", (req, res) => {
  playlist = [];
  currentIndex = 0;
  playing = false;
  res.send("ok");
});

app.listen(3000, () => console.log("Server running"));
