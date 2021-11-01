import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

require('dotenv').config();

const PORT = process.env.PORT || 6000;
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const roomsList: string[] = ['test', 'test2'];

io.on('connection', (socket) => {
  console.log(`a user connected with this id: ${socket.id}`);
  io.emit('roomList', roomsList);

  socket.on('getRooms', () => {
    socket.emit('roomList', roomsList);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
