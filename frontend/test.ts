import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK
const serviceAccount: admin.ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Add databaseURL if using Firestore: databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`
});

module.exports = admin;




// Threat scanning service (threatservice)
const threatService = () => {
  setInterval(() => {
    console.log('Scanning for threats...');
  }, 10000); // Every 10 seconds
};

// Start the threat scanning service
threatService();

module.exports = threatService;


//server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

// Start threat scanning service
require('./src/services/threatService');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server);

// Socket event handlers
require('./src/sockets/base')(io);

// Routes (placeholder)
// app.use('/api', require('./src/routes/api'));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Sentinel Live server running on port ${PORT}`);
});