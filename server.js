const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

// static files serve (tv.html + control.html)
app.use(express.static(__dirname));

// 📦 DATA
let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// ➕ ADD VIDEO
app.get("/add", (req, res) => {
    const url = req.query.url;

    if (url) {
        playlist.push(url);
    }

    res.json({ playlist, currentIndex });
});

// 🎮 CONTROL
app.get("/control", (req, res) => {
    const cmd = req.query.cmd;

    if (cmd === "play") isPlaying = true;
    if (cmd === "pause") isPlaying = false;

    if (cmd === "next" && currentIndex < playlist.length - 1) {
        currentIndex++;
    }

    if (cmd === "prev" && currentIndex > 0) {
        currentIndex--;
    }

    res.json({ playlist, currentIndex, isPlaying });
});

// 📡 TV SYNC (IMPORTANT FIX)
app.get("/get", (req, res) => {
    res.json({
        url: playlist[currentIndex],
        currentIndex,
        isPlaying
    });
});

// 🚀 PORT (RENDER SAFE)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on", PORT);
});
