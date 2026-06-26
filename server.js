const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// =======================
// 📦 DATA STORAGE
// =======================
let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// =======================
// 🔥 HOME CHECK
// =======================
app.get("/", (req, res) => {
    res.send("🔥 Server Running Successfully");
});

// =======================
// 📺 TV PAGE
// =======================
app.get("/tv.html", (req, res) => {
    res.sendFile(path.join(__dirname, "tv.html"));
});

// =======================
// 🖥 CONTROL PAGE
// =======================
app.get("/control.html", (req, res) => {
    res.sendFile(path.join(__dirname, "control.html"));
});

// =======================
// ➕ ADD VIDEO
// =======================
app.get("/add", (req, res) => {
    const url = req.query.url;

    if (url) {
        playlist.push(url);
    }

    res.json({
        success: true,
        playlist
    });
});

// =======================
// 🎮 CONTROL ACTIONS
// =======================
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

    res.json({
        playlist,
        currentIndex,
        isPlaying
    });
});

// =======================
// 📡 TV SYNC API
// =======================
app.get("/get", (req, res) => {
    res.json({
        url: playlist[currentIndex] || null,
        currentIndex,
        isPlaying
    });
});

// =======================
// 🚀 SERVER START (RENDER SAFE)
// =======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🔥 Server running on port", PORT);
});
