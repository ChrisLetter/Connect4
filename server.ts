import * as express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'http';

const session = require('express-session');

require('dotenv').config();

const PORT = process.env.PORT || 6000;
const app = express();
const httpServer = createServer(app);


// const sessionMiddleware = session({
//   secret: 'keyboard cat',
//   cookie: { maxAge: 60000 },
//   resave: true,
//   saveUninitialized: true,
// });

// app.use(sessionMiddleware);

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
