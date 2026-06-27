const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔥 CACHE OFF (Render fix)
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use(express.static(path.join(__dirname, "public")));

let playlist = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4",
  "https://media.w3.org/2010/05/bunny/trailer.mp4"
];

let currentIndex = 0;

let current = {
  url: playlist[0],
  isPlaying: false // ❗ autoplay OFF
};

let videoEnded = false;

// 📺 TV
app.get("/get", (req, res) => {
  res.json(current);
});

// ▶ NEXT
app.get("/next", (req, res) => {
  currentIndex = (currentIndex + 1) % playlist.length;

  current.url = playlist[currentIndex];
  current.isPlaying = true;
  videoEnded = false;

  console.log("NEXT:", current.url);

  res.json(current);
});

// 🎬 ENDED
app.post("/ended", (req, res) => {
  videoEnded = true;
  res.json({ success: true });
});

// 📱 STATUS
app.get("/status", (req, res) => {
  res.json({ ended: videoEnded });
});

// routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "control.html"));
});

app.get("/tv.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tv.html"));
});

app.listen(PORT, () => {
  console.log("Running on port " + PORT);
});
