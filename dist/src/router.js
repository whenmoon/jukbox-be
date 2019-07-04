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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const router = express_1.default.Router();
require("./services/spotify");
require("./services/google");
require("./services/token-strategy");
const user_1 = require("./controllers/user");
const admin_1 = require("./controllers/admin");
const body_parser_1 = __importDefault(require("body-parser"));
const authUtils_1 = require("./services/authUtils");
const socketControllers = __importStar(require("./controllers/sockets"));
const models_1 = require("./models");
const scopeSpotify = ['user-top-read', 'user-read-recently-played', 'user-read-currently-playing', 'user-library-read', 'user-library-modify', 'streaming', 'app-remote-control', 'user-read-email', 'user-read-private', 'user-read-birthdate', 'user-follow-modify', 'user-follow-read', 'user-modify-playback-state', 'playlist-modify-public', 'playlist-read-collaborative', 'playlist-read-private', 'playlist-modify-private', 'user-read-playback-state'];
const scopeGoogle = ['profile', 'email'];
router.get('/login/user/Codeworks', passport_1.default.authenticate('google', {
    scope: scopeGoogle
}));
router.get('/login/user/redirect', passport_1.default.authenticate('google', {
    session: false
}), user_1.redirectUser);
router.get('/me', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), user_1.getUserInfo);
router.get('/search', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), authUtils_1.provideTokenToUser, user_1.searchForSongs);
router.get('/login/admin', passport_1.default.authenticate('spotify', {
    scope: scopeSpotify
}));
router.get('/login/admin/redirect', passport_1.default.authenticate('spotify', {
    session: false
}), admin_1.redirectAdmin);
router.get('/playdevice/:deviceid', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), admin_1.setPlay);
router.get('/resumedevice/:deviceid', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), admin_1.setResume);
router.get('/pausedevice/:deviceid', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), admin_1.setPause);
router.get('/playdevice/:deviceid/volume/:volumepercent', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), admin_1.setVolume);
router.get('/next', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), admin_1.lockNextSong);
router.get('/transferplayback/:deviceid', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), admin_1.setTransferPlayback);
router.post('/charge', authUtils_1.extractToken, passport_1.default.authenticate('token', {
    session: false
}), user_1.chargeCustomer);
router.post('/webhook', body_parser_1.default.raw({ type: 'application/json' }), user_1.onPayment);
exports.socketRouter = (socket) => {
    socket.on('message', (message) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (message && message.route && message.data) {
                const { route, data } = message;
                const user = yield models_1.User.authorize(data.userAccessToken);
                if (user) {
                    switch (route) {
                        case 'connectUserToVenue':
                            socketControllers.connectUserToVenue(user.email, socket);
                            break;
                        case 'addSong':
                            socketControllers.addSongToPlaylist(data.songId, user.email, socket);
                            break;
                        case 'updateSongDiamonds':
                            socketControllers.updateSongDiamonds(data.songId, user, socket);
                    }
                }
                else
                    socket.emit('error', 'Invalid access token') && socket.disconnect();
            }
        }
        catch (error) {
            socket.emit('error', error);
        }
    }));
    socket.on('error', error => console.log(error));
};
exports.default = router;
