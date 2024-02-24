import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import mongoDB from './config/mongoDB.js';
import { receiveMessage } from './controller/chatController.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5050;

const __dirname = path.resolve();

mongoDB();
app.use(cors());
app.use(express.static('server/public'));
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`Socket clint connect successfully ID ${socket.id}`);

  socket.on('join_room', (room) => {
    socket.join(room);
  });

  socket.on('send_message', async (room, chat) => {
    const room_data = await receiveMessage(room, chat);
    io.in(room).emit('receive_message', room_data);
  });
});

if (process.env.NODE_ENV == 'PRODUCTION') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
  );
}

server.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`.bgCyan);
});
