require('dotenv').config();

const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const twilio = require("twilio");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: { origin: "*" } // restrict in production
});

// 🔹 ENV VARIABLES
const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const twilioNumber = process.env.TWILIO_NUM;
const myPhone = process.env.MY_PHONE;

// 🔹 Check ENV properly
const isTwilioConfigured =
  accountSid && authToken && twilioNumber && myPhone;

if (!isTwilioConfigured) {
  console.log("⚠️ Twilio not configured. Running in demo mode.");
}

// 🔹 Create client ONLY if valid
const client = isTwilioConfigured
  ? twilio(accountSid, authToken)
  : null;

// 🔹 SETTINGS
const DEMO_MODE = !isTwilioConfigured; // auto switch
let lastSentTime = 0;
const COOLDOWN = 60000;

// Serve frontend
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("✅ User connected");

  socket.on("sos-alert", async (data) => {
    // 🔹 Validate data
    if (!data || !data.lat || !data.lon || !data.mapLink) {
      socket.emit("sos-status", {
        success: false,
        message: "❌ Invalid data received"
      });
      return;
    }

    const now = Date.now();
    const time = new Date().toLocaleString();

    // 🔹 Cooldown protection
    if (now - lastSentTime < COOLDOWN) {
      socket.emit("sos-status", {
        success: false,
        message: "⏳ Please wait before sending another SOS"
      });
      return;
    }

    lastSentTime = now;

    try {
      // 🔹 Send SMS if configured
      if (!DEMO_MODE && client) {
        await client.messages.create({
          body: `🚨 EMERGENCY SOS!\nTime: ${time}\nLocation: ${data.mapLink}`,
          from: twilioNumber,
          to: myPhone
        });

        console.log("📩 SMS sent successfully");
      } else {
        console.log("🧪 Demo mode: SMS not sent");
      }

      // 🔹 Notify sender
      socket.emit("sos-status", {
        success: true,
        message: "✅ SOS sent successfully!"
      });

      // 🔹 Broadcast live location
      io.emit("receive-sos", {
        lat: data.lat,
        lon: data.lon,
        time
      });

    } catch (err) {
      console.error("❌ Error sending SMS:", err.message);

      socket.emit("sos-status", {
        success: false,
        message: "❌ Failed to send SOS"
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});