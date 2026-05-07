require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });
const path = require("path");
require("dotenv").config({ path: "./.env" });
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const twilio = require("twilio");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
console.log("SID:", process.env.TWILIO_SID);
console.log("TOKEN:", process.env.TWILIO_TOKEN ? "loaded" : "missing");
console.log("FROM:", process.env.TWILIO_NUM);
console.log("TO:", process.env.MY_PHONE);

app.use(express.static("public"));

let lastLocation = null;

// create Twilio client ONCE
const smsClient =
  process.env.TWILIO_SID && process.env.TWILIO_TOKEN
    ? twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
    : null;

io.on("connection", (socket) => {
  console.log("user connected");

  if (lastLocation) {
    socket.emit("location", lastLocation);
  }

  // SOS EVENT
  socket.on("sos", async (data) => {
    console.log("SOS started:", data);

    lastLocation = data;
    io.emit("location", data);

    // SMS SEND (ONLY HERE)
    if (smsClient) {
      try {
        await smsClient.messages.create({
          body: `🚨 SOS ALERT\nName: ${data.name}\nLocation: https://maps.google.com/?q=${data.lat},${data.lon}`,
          from: process.env.TWILIO_NUM,
          to: process.env.MY_PHONE,
        });

        console.log("SMS sent successfully");
      } catch (err) {
        console.log("SMS failed:", err.message);
      }
    } else {
      console.log("Twilio not configured (demo mode)");
    }
  });

  // live tracking
  socket.on("location-update", (data) => {
    lastLocation = data;
    io.emit("location", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("running on http://localhost:3000");
});