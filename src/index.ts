import path from 'path';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({
 path: path.resolve(__dirname, `../${envFile}`)
});

import express from 'express';
import router, {socketRouter} from './router';
import cors from 'cors';
import socketIo from 'socket.io';
import http from 'http';
require('dotenv').config()
const app: express.Application = express();
app
  .use(cors())
  .use(router);

const server = http.createServer(app);

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

const io = socketIo(server);
export const nsp = io.of('/codeworks');
nsp.on('connection', socketRouter);

export default server;
