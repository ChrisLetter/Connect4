import { Server } from 'socket.io';
import { createServer } from 'http';

require('dotenv').config();

const PORT = process.env.PORT || 6000;

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.id);
});

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
