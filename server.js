require('dotenv').config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const twilio = require("twilio");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: { origin: "*" } // allow any frontend
});

// 🔹 Twilio credentials from environment variables
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUM;
const myPhone = process.env.MY_PHONE;

const client = twilio(accountSid, authToken);

// Serve frontend files
app.use(express.static(__dirname));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("sos-alert", (data) => {
    console.log("Live SOS:", data.mapLink);

    // Send SMS only first time
    if (data.first) {
      client.messages.create({
        body: `🚨 EMERGENCY SOS!\nTime: ${data.time}\nLocation: ${data.mapLink}`,
        from: twilioNumber,
        to: myPhone
      })
      .then(msg => console.log("SMS sent:", msg.sid))
      .catch(err => console.error("SMS error:", err));
    }

    // Emit to all connected clients
    io.emit("receive-sos", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));