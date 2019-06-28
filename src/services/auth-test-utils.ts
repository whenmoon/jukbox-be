import { User, Venue, UserVenue, VenueSong } from '../models';
import pool from './db';

export const existingUser = new User('test@codeworks.me', 'token123', 'Test Person', 5);
export const newUser = new User('notUser@Ironhack.me', 'token456', 'Another Test', 3);
export const existingVenue = new Venue('Codeworks', '12345', 'token123', 2, '23:00');
export const newVenue = new Venue('Ironhack', '54321', 'token321', 2, '24:00');
export const newToken = 'newtoken123';

export const createTables = async () => {
  return await pool.query(`
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
}
