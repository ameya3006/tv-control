const express = require("express");
const app = express();

// store last command
let content = "No message";

// ✅ Home route (Not Found fix)
app.get("/", (req, res) => {
  res.send("TV Control Server Running ✅");
});

// ✅ Send command from laptop
app.get("/send", (req, res) => {
  content = req.query.msg || "No message";
  res.send("Command stored: " + content);
});

// ✅ TV will fetch latest command
app.get("/get", (req, res) => {
  res.send(content);
});

// ✅ IMPORTANT for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});