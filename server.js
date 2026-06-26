const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let current = {
  url: "https://www.w3schools.com/html/mov_bbb.mp4",
  isPlaying: false
};

// 🎮 update state
app.post("/set", (req, res) => {
  const { url, action } = req.body;

  if (url) {
    current.url = url;
  }

  if (action === "play") {
    current.isPlaying = true;
  }

  if (action === "pause") {
    current.isPlaying = false;
  }

  console.log("STATE:", current);

  res.json({ success: true, current });
});

// 📺 TV fetch state
app.get("/get", (req, res) => {
  res.json(current);
});

// default routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "control.html"));
});

app.get("/tv.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "tv.html"));
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
