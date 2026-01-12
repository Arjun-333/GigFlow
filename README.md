# GigFlow - Mini Freelance Marketplace

GigFlow is a clear, minimal freelance marketplace platform built with the MERN stack (MongoDB, Express, React, Node.js). It allows users to post gigs, bid on projects, and manage hiring with atomic exactness.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT (HttpOnly Cookies)

## Features

- **User Auth**: Register/Login/Logout with secure cookies.
- **Gigs**: Create, list, search, and view gigs.
- **Bidding**: Freelancers can bid on open gigs.
- **Hiring**: Clients can hire a freelancer, which automatically closes the gig and rejects other bids (Race-condition safe).

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed and running locally on port 27017

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   node server.js
   ```
   Server runs on `http://localhost:5000`.

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Environment Variables

See `.env` in `server/` for configuration. Default:

- `MONGO_URI=mongodb://127.0.0.1:27017/gigflow`
- `PORT=5000`

## Project Philosophy

GigFlow aims to strip away the complexity of modern freelancing platforms. No hidden fees, no complex algorithms—just a direct connection between talent and opportunity. We believe in atomic exactness for hiring, ensuring that once a bid is accepted, the deal is sealed instantly.

## Future Roadmap

- [ ] Real-time Chat Messaging
- [ ] Payment Gateway Integration (Stripe/PayPal)
- [ ] User Reviews and Rating System
- [ ] File Attachments for Gigs and Bids
