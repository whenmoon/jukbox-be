"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const SpotifyStrategy = require('passport-spotify').Strategy;
const passport = require('passport');
const { getRefreshToken } = require('./spotifyAPI');
const { Venue } = require('../models');
passport.use(new SpotifyStrategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_REDIRECT_URI
}, (accessToken, refreshToken, expires_in, profile, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        let newVenue = yield Venue.find('Codeworks');
        if (!newVenue) {
            newVenue = yield Venue.create({
                name: 'Codeworks',
                spotify_id: profile.id,
                token: accessToken,
                ticket_default_no: 10,
                refresh: refreshToken,
            });
        }
        else {
            newVenue = yield Venue.updateToken(newVenue.spotify_id, accessToken);
        }
        done(null, newVenue);
    }
    catch (e) {
        console.log(e);
    }
})));
