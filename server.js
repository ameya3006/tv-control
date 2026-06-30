const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let devices = [];
let state = { action: "pause", url: "" };

// 🎮 CONTROL
app.post("/control", (req, res) => {
  const { action, url } = req.body;

  if (action === "play" && url) {
    state = { action: "play", url };
  }

  if (action === "pause") state.action = "pause";
  if (action === "restart") state.action = "restart";

  res.sendStatus(200);
});

// 📡 STATE
app.get("/state", (req, res) => {
  res.json(state);
});

// 🟢 PING (NO ID → refresh = new device)
app.post("/ping", (req, res) => {
  devices.push({
    id: Math.random(),
    name: "Device",
    lastSeen: Date.now(),
    status: "ONLINE"
  });

  res.sendStatus(200);
});

// 📊 DEVICES
app.get("/devices", (req, res) => {
  const now = Date.now();

  // 🔥 remove old devices (3 sec)
  devices = devices.filter(d => now - d.lastSeen < 3000);

  res.json(devices);
});

app.listen(3000, () => console.log("Server running"));
