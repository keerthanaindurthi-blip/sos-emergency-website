require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send("🚀 Server + Socket.IO running!");
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('message', (data) => {
    console.log('Message received:', data);

    // Broadcast to all users
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// OPTIONAL: Twilio setup (only if you use it)
let client;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
  const twilio = require('twilio');
  client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

// Example API to send SMS
app.post('/send-sms', async (req, res) => {
  try {
    if (!client) {
      return res.status(500).json({ error: "Twilio not configured" });
    }

    const { to, message } = req.body;

    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: to
    });

    res.json({ success: true, sid: response.sid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "SMS failed" });
  }
});

// PORT (Render requirement)
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});