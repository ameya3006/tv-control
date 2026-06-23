const { io } = require("socket.io-client");

// 🔥 इथे change करून multiple devices simulate कर
const DEVICE_ID = "TV1";

console.log("🚀 Client starting...");

const socket = io("http://localhost:3000", {
    transports: ["websocket"]
});

socket.on("connect", () => {
    console.log("✅ Connected as", DEVICE_ID);

    socket.emit("register", DEVICE_ID);
});

socket.on("execute-command", (data) => {
    if (data.device === DEVICE_ID) {
        console.log("📩 Received:", data.command);

        if (data.command === "ON") {
            console.log("🔥", DEVICE_ID, "TURNED ON");
        }

        if (data.command === "OFF") {
            console.log("❌", DEVICE_ID, "TURNED OFF");
        }
    }
});