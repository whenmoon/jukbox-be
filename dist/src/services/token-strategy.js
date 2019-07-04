"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const passport = require('passport');
const UniqueTokenStrategy = require('passport-unique-token').Strategy;
const { User } = require('../models');
const { Venue } = require('../models');
passport.use(new UniqueTokenStrategy((token, done) => __awaiter(this, void 0, void 0, function* () {
    token = (token.slice(-1) === '#') ? token.slice(0, -1) : token;
    const user = yield User.authorize(token);
    if (user)
        done(null, user);
    else {
        const venue = yield Venue.authorize(token);
        if (venue) {
            done(null, venue);
        }
        else {
            done({ message: ' not found' }, false);
        }
    }
})));
