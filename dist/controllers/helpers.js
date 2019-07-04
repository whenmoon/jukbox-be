"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const __1 = require("../");
class Song {
    constructor(song_id, artist, title, album, album_cover, duration) {
        this.song_id = song_id;
        this.artist = artist;
        this.title = title;
        this.album = album;
        this.album_cover = album_cover;
        this.duration = duration;
    }
}
exports.default = Song;
exports.parseArray = (songList) => songList.map((song) => song = new Song(song.id, song.artists[0].name, song.name, song.album.name, [song.album.images[1].url, song.album.images[2].url], song.duration_ms));
exports.emitPlaylist = (venueName) => __awaiter(this, void 0, void 0, function* () {
    const playlist = yield models_1.VenueSong.getAll(venueName);
    const sortedPlaylist = models_1.VenueSong.sortPlaylist(playlist);
    const message = {
        data: {
            updatedPlaylist: sortedPlaylist
        }
    };
    __1.nsp.emit('message', message);
});
exports.emitTickets = (userEmail, venueName, socket) => __awaiter(this, void 0, void 0, function* () {
    const { tickets } = yield models_1.UserVenue.find(userEmail, venueName);
    const message = {
        data: {
            tickets: tickets
        }
    };
    socket.emit('message', message);
});
