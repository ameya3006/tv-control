const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let current = { url: "" };
let devices = {}; // key = deviceId, value = lastSeen

// 🎬 set video
app.post("/control", (req, res) => {
  current = req.body;
  res.sendStatus(200);
});

// 🎬 get video
app.get("/current", (req, res) => {
  res.json(current);
});

// 📡 ping device
app.post("/ping", (req, res) => {
  const id = req.body.name;

  if (!id) return res.sendStatus(400);

  devices[id] = Date.now();

  res.sendStatus(200);
});

// 📱 get active devices
app.get("/devices", (req, res) => {
  const now = Date.now();

  const active = Object.keys(devices)
    .filter(id => now - devices[id] < 15000)
    .map(id => ({
      name: id,
      lastSeen: devices[id]
    }));

  res.json(active);
});

// 🔥 Render fix
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
