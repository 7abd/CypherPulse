import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const envPath = fs.existsSync(path.resolve(process.cwd(), '.env.local'))
  ? path.resolve(process.cwd(), '.env.local')
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';

import './config/firebase';

import './services/threatService';

const app = express();
const server = http.createServer(app);
const io: SocketIOServer = new SocketIOServer(server, {
  cors: {
    origin: ["http://localhost:3000", "http://10.154.118.76:3002"],
    methods: ["GET", "POST"]
  }
});

import { startThreatSimulation } from './services/threatService';

startThreatSimulation(io);
import baseSocketHandler from './sockets/base';
baseSocketHandler(io);

import firestoreTestRoutes from './routes/firestoreTest';
app.use('/api', firestoreTestRoutes);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});