"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket_io_1 = require("socket.io");
const http_1 = require("http");
require('dotenv').config();
const PORT = process.env.PORT || 6000;
const app = express();
const httpServer = (0, http_1.createServer)(app);
app.get('/test', (req, res) => { res.send("hello"); });
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
    },
});
let roomsList = [];
let roomsListName = [];
let availableRooms = [];
const playerJoin = (socket, room) => {
    socket.join(room.id);
    socket.roomId = room.id;
    socket.emit('joinedRoom', room);
};
const joinGame = (socket, roomName) => {
    const [room] = roomsList.filter((roomFromList) => roomFromList.id === roomName);
    if (socket.username) {
        room.playerTwoName = socket.username;
    }
    room.playerTwoSocketId = socket.id;
    availableRooms = availableRooms.filter((nameAvailableRoom) => nameAvailableRoom !== room.id);
    io.emit('availableRooms', availableRooms);
    socket.join(room.id);
    socket.roomId = room.id;
    const updatedRooms = roomsList.map((oldRoom) => {
        if (oldRoom.id === roomName) {
            return room;
        }
        return oldRoom;
    });
    roomsList = updatedRooms;
    socket.emit('joinedRoom', room);
};
const getRoom = (roomName) => {
    const [room] = roomsList.filter((roomFromList) => roomFromList.id === roomName);
    return room;
};
io.on('connection', (socket) => {
    io.emit('roomList', roomsListName);
    socket.on('getRooms', () => {
        socket.emit('roomList', roomsListName);
    });
    socket.on('getAvailableRooms', () => {
        socket.emit('availableRooms', availableRooms);
    });
    socket.on('setUsername', (data) => {
        socket.username = data;
    });
    socket.on('createRoom', (room) => {
        const newRoom = {
            id: room,
            playerOneName: socket.username ? socket.username : '',
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
        availableRooms.push(newRoom.id);
        io.emit('roomList', roomsListName);
        io.emit('availableRooms', availableRooms);
    });
    socket.on('joinRoom', (room) => {
        joinGame(socket, room);
        io.emit('roomList', roomsListName);
    });
    socket.on('ready', () => {
        if (socket.roomId) {
            const room = getRoom(socket.roomId);
            if (room && room.playerTwoSocketId) {
                io.in(socket.roomId).emit('playGame', room);
            }
        }
    });
    socket.on('turn-played', (newRoom) => {
        if (socket.roomId) {
            io.in(socket.roomId).emit('new-turn-info', newRoom);
        }
    });
    socket.on('we-have-a-winner', (winnerName) => {
        if (socket.roomId) {
            const room = getRoom(socket.roomId);
            room.game.winner = '0';
            room.game.moves = 0;
            const emptyColumn = ['0', '0', '0', '0', '0', '0'];
            room.game.column1 = emptyColumn;
            room.game.column2 = emptyColumn;
            room.game.column3 = emptyColumn;
            room.game.column4 = emptyColumn;
            room.game.column5 = emptyColumn;
            room.game.column6 = emptyColumn;
            room.game.column7 = emptyColumn;
            io.in(socket.roomId).emit('winner-name', winnerName, room);
        }
    });
    socket.on('draw', (room) => {
        room.game.winner = '0';
        room.game.moves = 0;
        const emptyColumn = ['0', '0', '0', '0', '0', '0'];
        room.game.column1 = emptyColumn;
        room.game.column2 = emptyColumn;
        room.game.column3 = emptyColumn;
        room.game.column4 = emptyColumn;
        room.game.column5 = emptyColumn;
        room.game.column6 = emptyColumn;
        room.game.column7 = emptyColumn;
        io.in(room.id).emit('draw-no-more-spaces', room);
    });
    socket.on('leaveRoom', (room) => {
        if (room.id) {
            socket.broadcast.in(room.id).emit('abandonRoom', room);
            roomsList = roomsList.filter((prevRoom) => prevRoom.id !== room.id);
            roomsListName = roomsListName.filter((roomName) => roomName !== room.id);
        }
        io.emit('roomList', roomsList);
    });
    socket.on('disconnect', () => {
        let roomLeft = '';
        const otherRooms = [];
        roomsList.forEach((room) => {
            if (room.id === socket.roomId) {
                roomLeft = room;
            }
            else {
                otherRooms.push(room);
            }
        });
        if (roomLeft !== '') {
            roomsList = otherRooms;
            roomsListName = roomsListName.filter((roomName) => roomName !== roomLeft.id);
            availableRooms = availableRooms.filter((roomName) => roomName !== roomLeft.id);
            let targetUser = '';
            if (roomLeft.playerOneSocketId === socket.id) {
                targetUser = roomLeft.playerTwoSocketId;
            }
            else {
                targetUser = roomLeft.playerOneSocketId;
            }
            socket.broadcast.to(targetUser).emit('abandonRoom', roomLeft);
            roomLeft = '';
        }
        io.emit('availableRooms', availableRooms);
        io.emit('roomList', roomsList);
    });
});
httpServer.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});
