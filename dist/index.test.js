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
require("mocha");
const _1 = __importDefault(require("./"));
const test_utils_1 = require("./services/test-utils");
const chai_1 = __importDefault(require("chai"));
chai_1.default.should();
const test_utils_2 = require("./services/test-utils");
const models_1 = require("./models");
const PORT = 4000;
describe('Sockets', () => {
    let client1, client2, client3, countReceived;
    before(() => __awaiter(this, void 0, void 0, function* () {
        yield models_1.User.create(test_utils_2.mockUser);
        yield models_1.UserVenue.create(test_utils_1.mockUserVenue.userEmail, test_utils_1.mockUserVenue.venueName, test_utils_1.mockUserVenue.tickets);
    }));
    beforeEach(() => __awaiter(this, void 0, void 0, function* () {
        client1 = yield test_utils_1.createClient(PORT);
        client2 = yield test_utils_1.createClient(PORT);
        client3 = yield test_utils_1.createClient(PORT);
        countReceived = 0;
    }));
    afterEach(() => __awaiter(this, void 0, void 0, function* () {
        countReceived = 0;
        yield client1.disconnect();
        yield client2.disconnect();
        yield client3.disconnect();
    }));
    after(() => __awaiter(this, void 0, void 0, function* () {
        yield test_utils_2.deleteTableContents();
        yield _1.default.close();
    }));
    it('broadcasts the updatedPlaylist on addSong to mulitple clients', () => __awaiter(this, void 0, void 0, function* () {
        client1.on('message', (message) => {
            const { route, data } = message;
            route.should.eql('updatedPlaylist');
            data.updatedPlaylist[0].song.should.eql(test_utils_2.mockVenueSong.song);
            countReceived++;
        });
        client2.on('message', (message) => {
            const { route, data } = message;
            route.should.eql('updatedPlaylist');
            data.updatedPlaylist[0].song.should.eql(test_utils_2.mockVenueSong.song);
            countReceived++;
        });
        client3.on('message', (message) => {
            const { route, data } = message;
            route.should.eql('updatedPlaylist');
            data.updatedPlaylist[0].song.should.eql(test_utils_2.mockVenueSong.song);
            countReceived++;
        });
        client1.emit('message', {
            route: 'addSong',
            data: {
                song: test_utils_2.mockVenueSong.song,
                userEmail: test_utils_2.mockVenueSong.userEmail
            }
        });
        yield test_utils_1.forClientsToReceiveMessage(200);
        countReceived.should.equal(3);
    }));
    it('broadcasts the updatedPlaylist on updateSongDiamonds to mulitple clients', () => __awaiter(this, void 0, void 0, function* () {
        const diamonds = 5;
        client1.on('message', (message) => {
            const { route, data } = message;
            route.should.eql('updatedPlaylist');
            data.updatedPlaylist[0].diamonds.should.eql(diamonds);
            countReceived++;
        });
        client2.on('message', (message) => {
            const { route, data } = message;
            route.should.eql('updatedPlaylist');
            data.updatedPlaylist[0].diamonds.should.eql(diamonds);
            countReceived++;
        });
        client3.on('message', (message) => {
            const { route, data } = message;
            route.should.eql('updatedPlaylist');
            data.updatedPlaylist[0].diamonds.should.eql(diamonds);
            countReceived++;
        });
        client1.emit('message', {
            route: 'updateSongDiamonds',
            data: {
                song: test_utils_2.mockVenueSong.song,
                userEmail: test_utils_2.mockVenueSong.userEmail
            }
        });
        yield test_utils_1.forClientsToReceiveMessage(200);
        countReceived.should.equal(3);
    }));
});
