import express from 'express';
import router, { socketRouter } from './router';
import passport from 'passport';
import cors from 'cors';
import { PORT } from './config/credentials';
import socketIo from 'socket.io';
import http from 'http';

const app: express.Application = express();

app
  .use(cors())
  .use(router);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const io = socketIo(server);

const nsp = io.of('/codeworks');
nsp.on('connection', socketRouter);

export default server;
