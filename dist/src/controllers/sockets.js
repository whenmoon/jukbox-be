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
const services_1 = require("../services");
const helpers_1 = require("./helpers");
exports.connectUserToVenue = (userEmail, socket) => __awaiter(this, void 0, void 0, function* () {
    try {
        const venueName = services_1.toCapitalCase(socket.nsp.name);
        const userAtCurrentVenue = yield models_1.UserVenue.find(userEmail, venueName);
        if (!userAtCurrentVenue) {
            const { ticket_default_no } = yield models_1.Venue.find(venueName);
            yield models_1.UserVenue.create(userEmail, venueName, ticket_default_no);
        }
        yield helpers_1.emitTickets(userEmail, venueName, socket);
        yield helpers_1.emitPlaylist(venueName);
    }
    catch (error) {
        socket.emit('error', error);
    }
});
exports.addSongToPlaylist = (songId, userEmail, socket) => __awaiter(this, void 0, void 0, function* () {
    try {
        const venueName = services_1.toCapitalCase(socket.nsp.name);
        const userAtCurrentVenue = yield models_1.UserVenue.find(userEmail, venueName);
        if (userAtCurrentVenue.tickets > 0) {
            yield models_1.VenueSong.create(songId, userEmail, venueName);
            yield models_1.UserVenue.decrementTickets(userEmail, venueName);
        }
        yield helpers_1.emitTickets(userEmail, venueName, socket);
        yield helpers_1.emitPlaylist(venueName);
    }
    catch (error) {
        socket.emit('error', error);
    }
});
exports.updateSongDiamonds = (songId, user, socket) => __awaiter(this, void 0, void 0, function* () {
    try {
        const userEmail = user.email;
        const venueName = services_1.toCapitalCase(socket.nsp.name);
        if (user.diamonds > 0) {
            yield models_1.VenueSong.promote(songId);
            yield models_1.User.decrementDiamonds(userEmail);
        }
        yield helpers_1.emitTickets(userEmail, venueName, socket);
        yield helpers_1.emitPlaylist(venueName);
    }
    catch (error) {
        socket.emit('error', error);
    }
});
