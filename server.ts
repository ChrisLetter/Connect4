import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { IRoom } from './interfaces/interfaces';

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

const playerJoin = (socket: any, room: IRoom) => {
  socket.join(room, () => {
    socket.roomId = room.id;
    console.log(
      `Player ${socket.id} with username ${socket.username} joined  room ${room.id}`,
    );
  });
  room.sockets.push([socket.id, socket.username]);
  socket.emit('joinedRoom', room);
};

io.on('connection', (socket: any) => {
  console.log(`a user connected with this id: ${socket.id}`);
  io.emit('roomList', roomsList);

  socket.on('getRooms', () => {
    socket.emit('roomList', roomsList);
  });

  socket.on('setUsername', (data: string) => {
    socket.username = data;
  });

  socket.on('createRoom', (room: string) => {
    const newRoom = {
      id: room,
      name: room,
      sockets: [],
      game: {
        currentTurn: '1',
        winner: '0',
        moves: 0,
        column1: ['0', '0', '0', '0', '0', '0'],
        column2: ['0', '0', '0', '0', '0', '0'],
        column3: ['0', '0', '0', '0', '0', '0'],
        column4: ['0', '0', '0', '0', '0', '0'],
        column5: ['0', '0', '0', '0', '0', '0'],
        column6: ['0', '0', '0', '0', '0', '0'],
        column7: ['0', '0', '0', '0', '0', '0'],
      },
    };

    playerJoin(socket, newRoom);
    roomsList.push(room);
    io.emit('roomList', roomsList);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
