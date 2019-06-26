import pool from '../config/db';
import { User, Venue, UserVenue, PlaylistItem } from '../types';

export const postUser = (user: User) => pool.query(`
  INSERT INTO users (email, token, name, diamonds)
  VALUES ('${user.email}', '${user.token}', '${user.name}', ${user.diamonds})
  RETURNING *;
`);

export const findUser = (email: string) => pool.query(`
  SELECT * FROM users WHERE email = '${email}';
`);

export const updateUserToken = (email: string, token: string) => pool.query(`
  UPDATE users SET token = '${token}' WHERE email = '${email}'
  RETURNING *;
`);

export const authorizeUser = (token: string) => pool.query(`
  SELECT * FROM users WHERE token = '${token}';
`);

export const authorizeVenue = (token: string) => pool.query(`
  SELECT * FROM venues WHERE token = '${token}';
`);

export const postVenue = (venue: Venue) => pool.query(`
  INSERT INTO venues (name, spotify_id, token, ticket_default_no)
  VALUES ('${venue.name}', '${venue.spotify_id}', '${venue.token}', ${venue.ticket_default_no})
  RETURNING *;
`);

export const findVenue =  (id: string) => pool.query(`
  SELECT * FROM venues WHERE spotify_id = '${id}';
`);

export const updateVenueToken = (id: string, token: string) => pool.query(`
  UPDATE venues SET token = '${token}' WHERE spotify_id = '${id}'
  RETURNING *;
`);

export const postUserVenue = (userVenue: UserVenue) => pool.query(`
  INSERT INTO user_venues (user_id, venue_id, tickets, diamonds)
  VALUES ('${userVenue.userEmail}', '${userVenue.venueName}', ${userVenue.tickets}, ${userVenue.diamonds})
  RETURNING *;
`);

export const postSong = (playlistItem: PlaylistItem) => pool.query(`
  INSERT INTO playlist (venue_id, song, user_id, diamonds, submission_time)
  VALUES ('${playlistItem.venueName}', '${playlistItem.song}', '${playlistItem.userEmail}', 0, '${String(new Date(Date.now()))}')
  RETURNING *;
`);

export const getPlaylist = () => {
  return pool.query(`SELECT * FROM playlist`);
};

