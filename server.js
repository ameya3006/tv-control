const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let videos = [
  "https://www.w3schools.com/html/mov_bbb.mp4",
  "https://media.w3.org/2010/05/sintel/trailer.mp4"
];

let currentIndex = 0;
let playing = false; // ✅ autoplay FIX

app.get("/video", (req, res) => {
  res.json({
    url: videos[currentIndex],
    playing: playing
  });
});

app.post("/play", (req, res) => {
  playing = true;
  res.send("play");
});

app.post("/pause", (req, res) => {
  playing = false;
  res.send("pause");
});

app.post("/next", (req, res) => {
  currentIndex = (currentIndex + 1) % videos.length;
  playing = true;
  res.send("next");
});

app.listen(3000, () => console.log("Server running"));
