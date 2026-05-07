SOS Emergency Tracking System
Overview

The SOS Emergency Tracking System is a real-time web application designed to send emergency alerts along with live location tracking. It enables users to broadcast an SOS signal instantly, which is shared in real time with connected clients. The system also supports optional SMS notifications using Twilio for emergency contact alerts.

Features
Real-time location tracking using Socket.IO
Instant SOS alert broadcasting
Live GPS location sharing with Google Maps link
Optional SMS notifications via Twilio
Lightweight web-based interface
Simple and fast emergency communication system
Tech Stack
Node.js
Express.js
Socket.IO
Twilio API
HTML, CSS, JavaScript
dotenv for environment configuration
Project Structure
real time/
│── public/            Frontend files
│── server.js          Backend server
│── package.json       Dependencies and scripts
│── .env               Environment variables (not committed)
│── .gitignore         Ignored files configuration
Environment Variables

Create a .env file in the root directory and add the following:

TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_auth_token
TWILIO_NUM=your_twilio_phone_number
MY_PHONE=destination_phone_number
PORT=3000

Important: The .env file must never be pushed to GitHub.

Installation

Clone the repository and install dependencies:

npm install
Running the Application

Start the server:

node server.js

The application will run at:

http://localhost:3000
How It Works
A user triggers an SOS event from the frontend
The system captures the user’s current location
The location is sent to the backend via Socket.IO
The backend broadcasts the data to all connected clients
If configured, an SMS alert is sent using Twilio
Deployment

This project can be deployed on platforms such as:

Render
Railway
Any Node.js hosting service

Ensure environment variables are configured in the hosting platform.

Security Notes
Do not commit node_modules
Do not commit .env files
Ensure sensitive credentials are kept secure
Use .gitignore properly
Purpose

This project demonstrates real-time communication, emergency alert handling, and backend integration using Node.js and WebSockets.
