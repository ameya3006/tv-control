const express = require("express");
const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));

let currentVideo = "";

// ✅ IMPORTANT ROUTE
app.get("/video", (req, res) => {
  res.json({ url: currentVideo });
});

// play route
app.post("/play", (req, res) => {
  currentVideo = req.body.url;
  console.log("Now playing:", currentVideo);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
