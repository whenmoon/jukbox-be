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
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const User_1 = __importDefault(require("../models/User"));
exports.saveGoogleToken = (accessToken, _, profile, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        let user = yield User_1.default.find(profile.emails[0].value);
        if (!user) {
            user = yield User_1.default.create({
                email: profile.emails[0].value,
                token: accessToken,
                name: profile.displayName,
                diamonds: 0
            });
            console.log(user);
        }
        else {
            user = yield User_1.default.updateToken(user.email, accessToken);
        }
        done(null, user);
    }
    catch (e) {
        console.log(e);
    }
});
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    callbackURL: process.env.GOOGLE_REDIRECT_URI,
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, exports.saveGoogleToken));
