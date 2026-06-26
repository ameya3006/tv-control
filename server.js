const express = require("express");
const app = express();

app.use(express.static(__dirname));
app.use(express.json());

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// ➕ Add song
app.get("/add", (req, res) => {
    let url = req.query.url;
    if (url) {
        playlist.push(url);
    }
    res.json({ playlist });
});

// ▶️ Controls
app.get("/control", (req, res) => {
    let cmd = req.query.cmd;

    if (cmd === "play") isPlaying = true;
    if (cmd === "pause") isPlaying = false;

    if (cmd === "next") {
        if (currentIndex < playlist.length - 1) currentIndex++;
    }

    if (cmd === "prev") {
        if (currentIndex > 0) currentIndex--;
    }

    res.json({ playlist, currentIndex, isPlaying });
});

// 📡 TV sync endpoint
app.get("/get", (req, res) => {
    res.json({
        playlist,
        currentIndex,
        isPlaying
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
