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
const spotifyAPI_1 = require("../services/spotifyAPI");
const models_1 = require("../models");
const helpers_1 = require("./helpers");
exports.redirectAdmin = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.redirect(`http://localhost:3000/authorized-admin?access_token=${req.user.token}`);
    }
    catch (e) {
        res.status(500).end();
    }
});
exports.setPlay = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const venueName = req.user.name;
        const songToPlay = yield models_1.VenueSong.selectSongToPlay(venueName);
        if (songToPlay)
            yield spotifyAPI_1.setPlayerToPlay(req.user.token, [`spotify:track:${JSON.parse(songToPlay.song).song_id}`]);
        else
            yield spotifyAPI_1.setPlayerToPlay(req.user.token, ["spotify:track:5c882VwvW0mlp82KaSk99W"]);
        yield helpers_1.emitPlaylist(venueName);
        res.status(204).send();
    }
    catch (e) {
        res.status(e.statusCode).send(e);
    }
});
exports.setResume = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield spotifyAPI_1.setPlayerToResume(req.user.token);
        res.status(204).send();
    }
    catch (e) {
        res.status(e.statusCode).send(e);
    }
});
exports.setPause = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield spotifyAPI_1.setPlayerToPause(req.user.token);
        res.status(204).send();
    }
    catch (e) {
        res.status(e.statusCode).send(e);
    }
});
exports.setVolume = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield spotifyAPI_1.setPlayerVolume(req.user.token, req.params.volumepercent);
        res.status(204).send();
    }
    catch (e) {
        res.status(e.statusCode).send(e);
    }
});
exports.lockNextSong = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield models_1.VenueSong.removeCurrentlyPlayingSong(req.user.name);
        yield models_1.VenueSong.lockInAndPlayNextSong(req.user.name);
        res.status(204).send();
    }
    catch (e) {
        res.status(500).send();
    }
});
exports.setTransferPlayback = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        yield spotifyAPI_1.transferPlayerPlayback(req.user.token, req.params.deviceid);
        res.status(204).send();
    }
    catch (e) {
        res.status(e.statusCode).send(e);
    }
    ;
});
