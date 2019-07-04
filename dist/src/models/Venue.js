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
class Venue {
    constructor(name, spotify_id, token, ticket_default_no, closing_times, refresh, id) {
        this.name = name;
        this.spotify_id = spotify_id;
        this.token = token;
        this.ticket_default_no = ticket_default_no;
        this.closing_times = closing_times;
        this.refresh = refresh;
        this.id = id;
    }
    static create(venue) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      INSERT INTO venues (name, token, ticket_default_no, spotify_id, refresh)
      VALUES ('${venue.name}', '${venue.token}', '${venue.ticket_default_no}', '${venue.spotify_id}','${venue.refresh}')
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static find(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM venues WHERE name = '${name}';
    `);
            return result.rows[0];
        });
    }
    ;
    static authorize(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM venues WHERE token = '${token}';
    `);
            return result.rows[0];
        });
    }
    ;
    static updateToken(spotify_id, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE venues
      SET token = '${token}'
      WHERE spotify_id = '${spotify_id}'
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static getVenueTokenMVP(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT token FROM venues WHERE name = '${name}';
    `);
            return result.rows[0];
        });
    }
    static getVenueToken(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM users
      INNER JOIN user_venues ON users.email = user_venues.user_id
      INNER JOIN venues ON user_venues.venue_id = venues.name
      WHERE users.email = '${email}';
    `);
            return result.rows[0];
        });
    }
}
exports.default = Venue;
