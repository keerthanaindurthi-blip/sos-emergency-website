# SOS Emergency Tracking System

A real-time emergency alert and location tracking web application that lets a user send an SOS signal, share live GPS coordinates, and optionally send an SMS alert through Twilio.

## Features

- Start and stop an SOS session.
- Capture the user's current GPS location with the browser Geolocation API.
- Continue sending live location updates while SOS is active.
- Broadcast location updates to connected tracker clients with Socket.IO.
- Generate a Google Maps location link.
- Optionally send an SMS alert with Twilio.
- View the latest location on a Leaflet/OpenStreetMap tracker page.
- Validate incoming location data on the server.

## Tech Stack

- HTML, CSS, JavaScript
- Node.js
- Express.js
- Socket.IO
- Twilio
- Leaflet
- OpenStreetMap
- dotenv

## Project Structure

```text
sos-emergency-website/
├── public/
│   ├── index.html
│   └── tracker.html
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── .gitignore
└── README.md
```

## Environment Variables

Create a local `.env` file in the project root. Do not commit it to GitHub.

```env
TWILIO_SID=your_twilio_sid
TWILIO_TOKEN=your_twilio_auth_token
TWILIO_NUM=your_twilio_phone_number
MY_PHONE=receiver_phone_number
PORT=3000
```

If Twilio variables are not configured, the application runs in demo mode without sending an SMS.

## Installation

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

The live tracker is available at:

```text
http://localhost:3000/tracker
```

## How It Works

1. The user enters a name and starts SOS.
2. The browser requests permission to access the current location.
3. The initial coordinates are sent to the Node.js server through Socket.IO.
4. The server broadcasts the location to connected tracker clients.
5. If Twilio is configured, an SMS containing the name and Google Maps link is sent to the configured receiver.
6. Browser location watching continues while SOS is active and sends updated coordinates.
7. The tracker page updates the Leaflet map whenever a new location arrives.

## Browser and Deployment Notes

- Location access requires browser permission.
- Production deployments should use HTTPS because browser geolocation generally requires a secure context.
- Keep Twilio credentials only in environment variables.
- This project is intended as a learning and portfolio project, not as a replacement for official emergency services.

## Deployment

The Node.js application can be deployed to a service such as Render or another Node.js hosting platform. Configure the required environment variables in the hosting provider's settings rather than committing a `.env` file.

## Author

**Keerthana Indurthi**  
Computer Science and Engineering Student
