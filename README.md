# SOS Emergency Tracking System

A real-time SOS emergency web application that enables users to send alerts with live location tracking. The system uses WebSockets for instant updates and can send SMS notifications via Twilio.

## Features

* One-click SOS activation
* Real-time location tracking with continuous updates
* Live tracking dashboard using a map interface
* WebSocket-based real-time communication
* SMS alert integration using Twilio
* Stop SOS functionality
* Cooldown mechanism to prevent repeated alerts
## How It Works

1. The user clicks the SOS button.
2. The browser captures the user’s location using geolocation APIs.
3. The data is sent to the backend via WebSockets.
4. The backend:

   * Sends an SMS alert (if Twilio is configured)
   * Broadcasts the location to all connected clients
5. The tracker page displays the live location on a map.

## Tech Stack

* Frontend: HTML, CSS, JavaScript
* Backend: Node.js, Express.js
* Real-time Communication: Socket.IO
* Mapping: Leaflet.js with OpenStreetMap
* SMS Service: Twilio API

---

## Project Structure

```
├── server.js
├── index.html        # SOS interface
├── tracker.html      # Live tracking dashboard
├── .env              # Environment variables (excluded from repository)
└── README.md
```

---

## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```
npm install
```

### 3. Create a `.env` file

```
TWILIO_SID=your_sid
TWILIO_TOKEN=your_token
TWILIO_NUM=your_twilio_number
MY_PHONE=your_phone_number
```

### 4. Run the server

```
node server.js
```

### 5. Open in browser

* SOS page: http://localhost:3000/index.html
* Tracker page: http://localhost:3000/tracker.html
  
## Environment Variables

| Variable     | Description            |
| ------------ | ---------------------- |
| TWILIO_SID   | Twilio Account SID     |
| TWILIO_TOKEN | Twilio Auth Token      |
| TWILIO_NUM   | Twilio phone number    |
| MY_PHONE     | Recipient phone number |


## Demo Mode
If Twilio credentials are not configured, the application runs in demo mode:
* SMS is not sent
* Alerts are logged in the console
## Future Improvements
* Mobile application integration
* Integration with official emergency services
* Camera capture during SOS activation
* Push notifications
* User authentication
## Disclaimer
This project is a prototype for educational purposes. For real-world deployment, integration with authorized emergency services is required.

## Author

Keerthana
