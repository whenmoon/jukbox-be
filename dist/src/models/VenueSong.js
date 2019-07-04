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
const db_1 = __importDefault(require("../services/db"));
class VenueSong {
    constructor(song, userEmail, venueName, diamonds, submission_time, currentlyPlaying, lockedIn, id) {
        this.song = song;
        this.userEmail = userEmail;
        this.venueName = venueName;
        this.diamonds = diamonds;
        this.submission_time = submission_time;
        this.currentlyPlaying = currentlyPlaying;
        this.lockedIn = lockedIn;
        this.id = id;
    }
    static create(song, userEmail, venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      INSERT INTO venue_songs (song, user_id, venue_id, diamonds, submission_time)
      VALUES ('${song}', '${userEmail}', '${venueName}', 0, '${String(new Date(Date.now()))}')
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static promote(songId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE venue_songs
      SET diamonds = 5
      WHERE id = '${songId}'
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static getAll(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM venue_songs WHERE venue_id = '${venueName}';
    `);
            return result.rows;
        });
    }
    ;
    static lockSong(song, venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE venue_songs 
      SET lockedIn = true
      WHERE song = '${song}'
      AND venue_id = '${venueName}'
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    static deleteLastPlayedSong(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      DELETE FROM venue_songs 
      WHERE currentlyPlaying = true
      AND venue_id = '${venueName}'; 
    `);
            return result.rows[0];
        });
    }
    static checkLastPlayedSong(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM venue_songs 
      WHERE currentlyPlaying = true
      AND venue_id = '${venueName}'; 
    `);
            return result.rows[0];
        });
    }
    static clearSongs(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      DELETE FROM venue_songs 
      WHERE venue_id = '${venueName}';   
    `);
            return result.rows;
        });
    }
    static getSongToPlay(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE venue_songs 
      SET currentlyPlaying = true
      WHERE lockedIn = true
      AND venue_id = '${venueName}'
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    static checkForLockedInSong(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM venue_songs 
      WHERE lockedIn = true
      AND venue_id = '${venueName}';
    `);
            return result.rows[0];
        });
    }
    static lockInAndPlayNextSong(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            let nextSongPlaylist = yield VenueSong.getAll(venueName);
            if (nextSongPlaylist)
                nextSongPlaylist = VenueSong.sortPlaylist(nextSongPlaylist);
            if (nextSongPlaylist[0])
                yield VenueSong.lockSong(nextSongPlaylist[0].song, venueName);
        });
    }
    static removeCurrentlyPlayingSong(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const LastSong = yield VenueSong.checkLastPlayedSong(venueName);
            if (LastSong)
                yield VenueSong.deleteLastPlayedSong(venueName);
        });
    }
    static selectSongToPlay(venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const lockedInSong = yield VenueSong.checkForLockedInSong(venueName);
            if (!lockedInSong)
                yield VenueSong.lockInAndPlayNextSong(venueName);
            const songToPlay = yield VenueSong.getSongToPlay(venueName);
            return songToPlay;
        });
    }
    static sortPlaylist(playlist) {
        playlist.sort((a, b) => {
            const aDate = new Date(a.submission_time);
            const bDate = new Date(b.submission_time);
            return aDate.getTime() - bDate.getTime();
        });
        playlist.sort((a, b) => {
            return b.diamonds - a.diamonds;
        });
        playlist.sort((a, b) => {
            return (a.lockedIn === b.lockedIn) ? 0 : a.lockedIn ? -1 : 1;
        });
        playlist.sort((a, b) => {
            return (a.currentlyPlaying === b.currentlyPlaying) ? 0 : a.currentlyPlaying ? -1 : 1;
        });
        return playlist;
    }
    ;
}
exports.default = VenueSong;
