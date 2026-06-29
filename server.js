const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

let current = {
  url: "",
  playing: false
};

app.get("/video", (req, res) => {
  res.json(current);
});

app.post("/set", (req, res) => {
  current.url = req.body.url;
  current.playing = false;
  res.sendStatus(200);
});

app.post("/start", (req, res) => {
  current.playing = true;
  res.sendStatus(200);
});

app.post("/resume", (req, res) => {
  current.playing = true;
  res.sendStatus(200);
});

app.post("/pause", (req, res) => {
  current.playing = false;
  res.sendStatus(200);
});

app.post("/next", (req, res) => {
  current.url = "";
  current.playing = false;
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on " + PORT));
