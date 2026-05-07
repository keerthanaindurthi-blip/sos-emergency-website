** SOS Emergency Tracking System**

A real-time emergency alert and location tracking system that helps users send instant SOS signals with live location sharing and optional SMS alerts using Twilio.

**What this project does**

This system allows a user to:

Send an SOS alert instantly
Share live GPS location in real-time
Broadcast emergency updates to connected users
Optionally send SMS alerts to a registered phone number (Twilio)
View live location updates on a simple web interface

It is designed for fast emergency response and real-time coordination.

** Tech Stack**
Backend: Node.js, Express.js
Real-time communication: Socket.IO
SMS Service: Twilio
Frontend: HTML, CSS, JavaScript
Environment config: dotenv
** Features**
 Real-time location tracking
Instant SOS broadcast system
Google Maps integration for location link
SMS alert system using Twilio (optional)
Lightweight and easy-to-run web app
**Project Structure**
real time/
│── public/          # Frontend files (HTML, UI)
│── server.js        # Backend server
│── package.json     # Dependencies
│── .env             # Secrets (not pushed to GitHub)
│── .gitignore       # Ignored files
**Environment Variables**

Create a .env example file in the root folder:

TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_token
TWILIO_NUM=your_twilio_number
MY_PHONE=receiver_phone_number
PORT=3000

🛠️ Installation & Run
# install dependencies
npm install

# start server
node server.js

App runs at:

http://localhost:3000
**** How it works****
User clicks SOS button
Browser captures live latitude & longitude
Data is sent to backend via Socket.IO
Server broadcasts location to all connected clients
Optional SMS alert is sent via Twilio
☁️ Deployment

**Can be deployed on:**
Render

Any Node.js hosting platform
Purpose

This project is built for learning real-time systems, emergency response logic, and backend communication using Socket.IO.
