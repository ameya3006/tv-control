const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

let current = { url: "", action: "" };
let devices = [];

// control
app.post("/control", (req, res) => {
  current = req.body;
  res.sendStatus(200);
});

// current video
app.get("/current", (req, res) => {
  res.json(current);
});

// 🔥 FIXED DEVICE TRACKING
app.post("/ping", (req, res) => {
  const name = req.body.name || "Unknown";

  let d = devices.find(x => x.name === name);

  if (d) {
    d.lastSeen = Date.now();
  } else {
    devices.push({
      name,
      lastSeen: Date.now()
    });
  }

  res.sendStatus(200);
});

// 🔥 ONLY ACTIVE DEVICES RETURN
app.get("/devices", (req, res) => {
  const now = Date.now();

  // 🔥 5 sec inactive remove
  devices = devices.filter(d => now - d.lastSeen < 5000);

  res.json(devices);
});

// 🔥 RENDER FIX
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on " + PORT));
