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
class UserVenue {
    constructor(userEmail, venueName, tickets, diamonds, id) {
        this.userEmail = userEmail;
        this.venueName = venueName;
        this.tickets = tickets;
        this.diamonds = diamonds;
        this.id = id;
    }
    static create(userEmail, venueName, ticket_default_no) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      INSERT INTO user_venues (user_id, venue_id, tickets, diamonds)
      VALUES ('${userEmail}', '${venueName}', ${ticket_default_no}, 0)
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static find(userEmail, venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM user_venues
      WHERE user_id = '${userEmail}' AND venue_id = '${venueName}';
    `);
            return result.rows[0];
        });
    }
    ;
    static decrementTickets(userEmail, venueName) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE user_venues
      SET tickets = tickets - 1
      WHERE user_id = '${userEmail}' AND venue_id = '${venueName}';
    `);
            return result.rows[0];
        });
    }
    ;
}
exports.default = UserVenue;
