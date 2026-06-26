const express = require("express");
const app = express();
const path = require("path");

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// ➕ API
app.get("/add", (req, res) => {
    const url = req.query.url;
    if (url) playlist.push(url);
    res.json({ playlist });
});

app.get("/control", (req, res) => {
    const cmd = req.query.cmd;

    if (cmd === "play") isPlaying = true;
    if (cmd === "pause") isPlaying = false;

    if (cmd === "next" && currentIndex < playlist.length - 1) currentIndex++;
    if (cmd === "prev" && currentIndex > 0) currentIndex--;

    res.json({ playlist, currentIndex, isPlaying });
});

app.get("/get", (req, res) => {
    res.json({
        url: playlist[currentIndex],
        currentIndex,
        isPlaying
    });
});

// 🔥 IMPORTANT FIX (THIS IS THE GAME CHANGER)
app.get("/", (req, res) => {
    res.send("Server Running");
});

app.get("/tv.html", (req, res) => {
    res.sendFile(path.join(__dirname, "tv.html"));
});

app.get("/control.html", (req, res) => {
    res.sendFile(path.join(__dirname, "control.html"));
});

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Running on", PORT);
});
