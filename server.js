const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let current = {
  url: "",
  action: "pause"
};

// 🔥 DEVICE STORE
let devices = {};

// 📺 TV CALL
app.get("/current", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  devices[ip] = {
    lastSeen: Date.now()
  };

  res.json(current);
});

// 🎮 CONTROL
app.post("/control", (req, res) => {
  const { url, action } = req.body;

  if (url) current.url = url;
  if (action) current.action = action;

  res.sendStatus(200);
});

// 📱 DEVICE LIST
app.get("/devices", (req, res) => {
  const now = Date.now();

  let list = Object.entries(devices).map(([ip, d]) => {
    let diff = Math.floor((now - d.lastSeen) / 1000);

    return {
      name: ip,
      status: diff < 10 ? "ONLINE" : "OFFLINE",
      lastSeen: diff + "s ago"
    };
  });

  res.json(list);
});

// 🧹 CLEAN OLD
setInterval(() => {
  const now = Date.now();
  for (let ip in devices) {
    if (now - devices[ip].lastSeen > 30000) {
      delete devices[ip];
    }
  }
}, 5000);

app.listen(3000, () => console.log("Server running on 3000"));
