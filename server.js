const express = require("express");
const app = express();

app.use(express.static(__dirname));

let playlist = [];
let currentIndex = 0;
let isPlaying = false;

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

    res.json({ currentIndex, isPlaying });
});

app.get("/get", (req, res) => {
    res.json({
        url: playlist[currentIndex],
        isPlaying
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running"));
