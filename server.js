const express = require("express");
const path = require("path");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));

let screenData = "Waiting...";

// 📺 TV will call this
app.get("/data", (req, res) => {
    res.send(screenData);
});

// 📱 Control will send message here
app.get("/send", (req, res) => {
    screenData = req.query.msg || "No message";
    res.send("OK");
});

app.get("/", (req, res) => {
    res.send("TV Control Server Running ✅");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running"));