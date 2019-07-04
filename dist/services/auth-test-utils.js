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
const models_1 = require("../models");
const db_1 = __importDefault(require("./db"));
exports.existingUser = new models_1.User('test@codeworks.me', 'token123', 'Test Person', 5);
exports.newUser = new models_1.User('notUser@Ironhack.me', 'token456', 'Another Test', 3);
exports.newToken = 'newtoken123';
exports.createTables = () => __awaiter(this, void 0, void 0, function* () {
    return yield db_1.default.query(`
    DROP TABLE IF EXISTS users, user_venues, venues, venue_songs;

    CREATE TABLE users (
      email VARCHAR NOT NULL,
      token VARCHAR NOT NULL,
      name VARCHAR NOT NULL,
      diamonds INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (email)
    );

    CREATE TABLE venues (
      name VARCHAR NOT NULL,
      spotify_id VARCHAR NOT NULL,
      token VARCHAR NOT NULL,
      ticket_default_no INTEGER NOT NULL DEFAULT 1,
      closing_times VARCHAR,
      PRIMARY KEY (name)
    );

    CREATE TABLE user_venues (
      id SERIAL,
      user_id VARCHAR REFERENCES users(email),
      venue_id VARCHAR REFERENCES venues(name),
      tickets INTEGER NOT NULL DEFAULT 0,
      diamonds INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE venue_songs (
      id SERIAL,
      venue_id VARCHAR REFERENCES venues(name),
      song VARCHAR,
      user_id VARCHAR REFERENCES users(email),
      diamonds INTEGER NOT NULL DEFAULT 0,
      submission_time VARCHAR NOT NULL DEFAULT '${String(new Date(Date.now()))}',
      currentlyPlaying BOOLEAN NOT NULL DEFAULT FALSE,
      lockedIn BOOLEAN NOT NULL DEFAULT FALSE
    );
  `);
});
