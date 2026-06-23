const express = require("express");
const app = express();

app.use(express.json());

// store commands
let tvCommands = {
    TV1: "OFF",
    TV2: "OFF"
};

// laptop sends command
app.get("/send", (req, res) => {
    let device = req.query.device;
    let cmd = req.query.cmd;

    tvCommands[device] = cmd;

    console.log("Updated:", tvCommands);

    res.send("Command stored");
});

// TV fetches command
app.get("/get-command", (req, res) => {
    let device = req.query.device;

    res.json({
        device: device,
        command: tvCommands[device]
    });
});

app.listen(3000, () => {
    console.log("Server running");
});