const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(path.join(__dirname, "public")));

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

// ➤ Add video
app.get("/add", (req, res) => {
    const url = req.query.url;
    if (url) {
        playlist.push(url);
    }
    res.send("Added");
});

// ➤ Get current video for TV
app.get("/get", (req, res) => {
    res.json({
        url: playlist[currentIndex] || "",
        isPlaying: isPlaying
    });
});

// ➤ Controls from laptop
app.get("/control", (req, res) => {
    const cmd = req.query.cmd;

    if (cmd === "start") {
        currentIndex = 0;
        isPlaying = true;
    }

    if (cmd === "play") isPlaying = true;
    if (cmd === "pause") isPlaying = false;

    if (cmd === "next") {
        currentIndex = (currentIndex + 1) % playlist.length;
        isPlaying = true;
    }

    res.send("OK");
});

// ➤ Playlist view
app.get("/playlist", (req, res) => {
    res.json(playlist);
});

app.listen(3000, () => console.log("Server running"));
