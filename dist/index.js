"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({
    path: path_1.default.resolve(__dirname, `../${envFile}`)
});
const express_1 = __importDefault(require("express"));
const router_1 = __importStar(require("./router"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const app = express_1.default();
app
    .use(cors_1.default())
    .use(router_1.default);
const server = http_1.default.createServer(app);
server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
const io = socket_io_1.default(server);
exports.nsp = io.of('/codeworks');
exports.nsp.on('connection', router_1.socketRouter);
exports.default = server;
