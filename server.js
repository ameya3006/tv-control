const express = require("express");
const app = express();
const path = require("path");

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// 🔥 IMPORTANT: ROOT FIX
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "control.html"));
});

// 📺 TV PAGE
app.get("/tv.html", (req, res) => {
    res.sendFile(path.join(__dirname, "tv.html"));
});

// 🖥️ CONTROL PAGE
app.get("/control.html", (req, res) => {
    res.sendFile(path.join(__dirname, "control.html"));
});

// ➕ ADD
app.get("/add", (req, res) => {
    const url = req.query.url;
    if (url) playlist.push(url);
    res.json({ playlist });
});

// 🎮 CONTROL
app.get("/control", (req, res) => {
    const cmd = req.query.cmd;

    if (cmd === "play") isPlaying = true;
    if (cmd === "pause") isPlaying = false;

    if (cmd === "next" && currentIndex < playlist.length - 1) currentIndex++;
    if (cmd === "prev" && currentIndex > 0) currentIndex--;

    res.json({ playlist, currentIndex, isPlaying });
});

// 📡 GET DATA
app.get("/get", (req, res) => {
    res.json({
        url: playlist[currentIndex],
        currentIndex,
        isPlaying
    });
});

// 🚀 PORT FIX (RENDER MUST)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on", PORT);
});
