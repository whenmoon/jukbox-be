"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const socket_io_client_1 = __importDefault(require("socket.io-client"));
const db_1 = __importDefault(require("./db"));
exports.mockRequest = {
    headers: {
        token: '',
        authorization: 'Bearer blabla'
    },
    user: {
        email: 'test@codeworks.me'
    },
    token: {
        token: ''
    }
};
exports.mockNext = () => { };
exports.mockDone = () => { };
exports.mockProfile = {
    emails: [{ value: 'test@codeworks.me' }]
};
exports.mockUser = new models_1.User('test@codeworks.me', 'blabla', 'Test Person', 5);
exports.mockToken = '123456';
exports.mockNamespace = '/codeworks';
exports.mockUserVenue = new models_1.UserVenue('test@codeworks.me', 'Codeworks', 1, 0);
exports.mockVenueSong = new models_1.VenueSong('Hello world', 'test@codeworks.me', 'Codeworks', 5, 'Wed Jun 26 2019 16:23:09 GMT+0200 (Central European Summer Time)', false, false);
const mockVenueSong2 = new models_1.VenueSong('Lala', 'other@codeworks.me', 'Codeworks', 0, 'Wed Jun 26 2019 16:20:09 GMT+0200 (Central European Summer Time)', false, false);
const mockVenueSong3 = new models_1.VenueSong('Blabla', 'third@codeworks.me', 'Codeworks', 0, 'Wed Jun 26 2019 16:22:09 GMT+0200 (Central European Summer Time)', false, false);
const mockVenueSong4 = new models_1.VenueSong('Lalala', 'fourth@codeworks.me', 'Codeworks', 0, 'Wed Jun 26 2019 16:10:09 GMT+0200 (Central European Summer Time)', false, true);
const mockVenueSong5 = new models_1.VenueSong('Blablabla', 'fifth@codeworks.me', 'Codeworks', 5, 'Wed Jun 26 2019 16:11:09 GMT+0200 (Central European Summer Time)', true, false);
exports.mockPlaylist = [mockVenueSong3, mockVenueSong2, exports.mockVenueSong, mockVenueSong4, mockVenueSong5];
exports.sortedMockPlaylist = [mockVenueSong5, mockVenueSong4, exports.mockVenueSong, mockVenueSong2, mockVenueSong3];
exports.createClient = (PORT) => {
    return new Promise((resolve, reject) => {
        const socket = socket_io_client_1.default.connect(`http://localhost:${PORT}/codeworks`);
        socket.on('connect', () => resolve(socket));
        socket.on('error', () => reject);
    });
};
exports.forClientsToReceiveMessage = (time) => new Promise((resolve, reject) => setTimeout(() => {
    resolve();
}, time));
exports.deleteTableContents = () => __awaiter(this, void 0, void 0, function* () {
    return yield db_1.default.query(`
  DELETE FROM venue_songs WHERE user_id LIKE '%codeworks%';
  DELETE FROM user_venues WHERE user_id LIKE '%codeworks%';
  DELETE FROM users WHERE email LIKE '%codeworks%';
  DELETE FROM venues WHERE name LIKE '%Codeworks%';
`);
});
