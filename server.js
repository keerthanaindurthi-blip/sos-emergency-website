require("dotenv").config({ path: require("path").resolve(__dirname, ".env") });
const path = require("path");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const twilio = require("twilio");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const publicDir = path.join(__dirname, "public");

app.use(express.static(publicDir));
app.get("/", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});
app.get("/tracker", (req, res) => {
  res.sendFile(path.join(publicDir, "tracker.html"));
});

let lastLocation = null;

const smsClient =
  process.env.TWILIO_SID && process.env.TWILIO_TOKEN
    ? twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
    : null;

io.on("connection", (socket) => {
  console.log("user connected");

  if (lastLocation) {
    socket.emit("location", lastLocation);
  }

  socket.on("sos", async (data) => {
    if (!data || !data.name || !Number.isFinite(Number(data.lat)) || !Number.isFinite(Number(data.lon))) {
      return;
    }

    const location = {
      lat: Number(data.lat),
      lon: Number(data.lon),
      name: String(data.name).slice(0, 100),
    };

    console.log("SOS started for:", location.name);
    lastLocation = location;
    io.emit("location", location);

    if (smsClient) {
      try {
        await smsClient.messages.create({
          body: `SOS ALERT\nName: ${location.name}\nLocation: https://maps.google.com/?q=${location.lat},${location.lon}`,
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

  socket.on("location-update", (data) => {
    if (!data || !Number.isFinite(Number(data.lat)) || !Number.isFinite(Number(data.lon))) {
      return;
    }

    lastLocation = {
      lat: Number(data.lat),
      lon: Number(data.lon),
      name: String(data.name || "SOS user").slice(0, 100),
    };
    io.emit("location", lastLocation);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT || 3000}`);
});
