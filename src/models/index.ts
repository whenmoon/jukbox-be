import pool from '../config/db';
import { User, Venue, UserVenue, PlaylistItem } from '../types';

export const postUser = (user: User) => pool.query(`
  INSERT INTO users (email, name, diamonds)
  VALUES ('${user.email}', '${user.name}', ${user.diamonds})
  RETURNING *;
`);

export const postVenue = (venue: Venue) => pool.query(`
  INSERT INTO venues (name, ticket_default_no)
  VALUES ('${venue.name}', ${venue.ticket_default_no})
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
