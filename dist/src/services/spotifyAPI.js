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
const spotifyAPIUtils_1 = require("./spotifyAPIUtils");
const models_1 = require("../models");
const request = require('request-promise');
const btoa = require('btoa');
exports.renewAccessToken = (venue) => __awaiter(this, void 0, void 0, function* () {
    const newAccessToken = yield exports.getRefreshToken(venue.refresh);
    const newVenue = yield models_1.Venue.updateToken(venue.spotify_id, newAccessToken);
    return newVenue;
});
exports.getRefreshToken = (refreshToken) => {
    const options = {
        url: `https://accounts.spotify.com/api/token`,
        form: {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        },
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.SPOTIFY_client_id + ':' + process.env.SPOTIFY_client_secret)
        },
        json: true
    };
    return request.post(options);
};
exports.transferPlayerPlayback = (token, deviceId) => {
    const options = {
        uri: 'https://api.spotify.com/v1/me/player',
        headers: spotifyAPIUtils_1.createBearerHeaderOptions(token),
        body: {
            'device_ids': [deviceId],
            'play': false,
        },
        json: true
    };
    return request.put(options);
};
exports.setPlayerToPlay = (token, playlist) => {
    const options = {
        url: "https://api.spotify.com/v1/me/player/play",
        headers: spotifyAPIUtils_1.createBearerHeaderOptions(token),
        json: {
            "uris": playlist
        }
    };
    return request.put(options);
};
exports.setPlayerToResume = (token) => {
    const options = {
        url: "https://api.spotify.com/v1/me/player/play",
        headers: spotifyAPIUtils_1.createBearerHeaderOptions(token),
    };
    return request.put(options);
};
exports.setPlayerToPause = (token) => {
    const options = {
        url: "https://api.spotify.com/v1/me/player/pause",
        headers: spotifyAPIUtils_1.createBearerHeaderOptions(token),
    };
    return request.put(options);
};
exports.searchSpotify = (token, songName) => {
    const options = {
        url: `https://api.spotify.com/v1/search?q=${songName}&type=track`,
        headers: spotifyAPIUtils_1.createBearerHeaderOptions(token),
        json: true
    };
    return request.get(options);
};
exports.setPlayerVolume = (token, volume) => {
    const options = {
        url: `https://api.spotify.com/v1/me/player/volume?volume_percent${volume}`,
        headers: spotifyAPIUtils_1.createBearerHeaderOptions(token)
    };
    return request.put(options);
};
