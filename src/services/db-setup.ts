import path from 'path';
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
require('dotenv').config({
 path: path.resolve(__dirname, `../../${envFile}`)
});
import pool, { port } from './db';

function createTables () {
  pool.query(`
    
    DROP TABLE IF EXISTS user_venues;
    
    DROP TABLE IF EXISTS venue_songs;  
    
    DROP TABLE IF EXISTS users;
    
    DROP TABLE IF EXISTS venues;

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
};

async function setupDB () {
  await createTables();
  console.log(`Database successfully set up on port ${port} 🚀`);
};

try {
  setupDB();
} catch (error) {
  console.log(error);
}
