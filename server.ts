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

let roomsList: IRoom[] = [];
const roomsListName: string[] = [];

const playerJoin = (socket: any, room: IRoom) => {
  socket.join(room, () => {
    socket.roomId = room.id;
  });
  socket.emit('joinedRoom', room);
};

const joinGame = (socket: any, roomName: string) => {
  const [room] = roomsList.filter(
    (roomFromList: IRoom) => roomFromList.id === roomName,
  );
  room.playerTwoName = socket.username;
  room.playerTwoSocketId = socket.id;
  socket.join(room, () => {
    socket.roomId = room.id;
  });
  const updatedRooms = roomsList.map((oldRoom) => {
    if (oldRoom.id === roomName) {
      return room;
    }
    return oldRoom;
  });
  roomsList = updatedRooms;
  socket.emit('joinedRoom', room);
};

io.on('connection', (socket: any) => {
  console.log(`a user connected with this id: ${socket.id}`);
  io.emit('roomList', roomsListName);

  socket.on('getRooms', () => {
    socket.emit('roomList', roomsListName);
  });

  socket.on('setUsername', (data: string) => {
    socket.username = data;
  });

  socket.on('createRoom', (room: string) => {
    const newRoom = {
      id: room,
      playerOneName: socket.username,
      playerOneSocketId: socket.id,
      playerTwoName: '',
      playerTwoSocketId: '',
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
    roomsList.push(newRoom);
    roomsListName.push(newRoom.id);
    io.emit('roomList', roomsListName);
  });

  socket.on('joinRoom', (room: string) => {
    joinGame(socket, room);
    io.emit('roomList', roomsListName);
  });
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
