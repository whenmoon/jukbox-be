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
class User {
    constructor(email, token, name, diamonds, id) {
        this.email = email;
        this.token = token;
        this.name = name;
        this.diamonds = diamonds;
        this.id = id;
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      INSERT INTO users (email, token, name, diamonds)
      VALUES ('${user.email}', '${user.token}', '${user.name}', '${user.diamonds}')
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static find(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM users WHERE email = '${email}';
    `);
            return result.rows[0];
        });
    }
    ;
    static authorize(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      SELECT * FROM users WHERE token = '${token}';
    `);
            return result.rows[0];
        });
    }
    ;
    static updateToken(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE users
      SET token = '${token}'
      WHERE email = '${email}'
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    ;
    static incrementDiamonds(userEmail, incrementBy) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE users
      SET diamonds = diamonds + ${incrementBy}
      WHERE email = '${userEmail}'
      RETURNING *;
    `);
            return result.rows[0];
        });
    }
    static decrementDiamonds(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.default.query(`
      UPDATE users
      SET diamonds = diamonds - 5
      WHERE email = '${userEmail}';
    `);
            return result.rows[0];
        });
    }
    ;
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
exports.default = User;
