import { User, Venue, UserVenue, VenueSong } from '../models';
import client from 'socket.io-client';
import pool from '../config/db';

export const mockUser = new User('test@codeworks.me', 'blabla', 'Test Person', 0);
export const mockVenue = new Venue('Codeworks', 'blabla', '123456', 1);
export const mockUserVenue = new UserVenue('test@codeworks.me', 'Codeworks', 0, 0);
export const mockVenueSong = new VenueSong('Hello world', 'test@codeworks.me', 'Codeworks', 0, 'now', false, false);

export const createClient = (PORT: number) => {
  return new Promise((resolve, reject) => {
    const socket: any = client.connect(`http://localhost:${PORT}/codeworks`);
    socket.on('connect', () => resolve(socket));
    socket.on('error', () => reject);
  })
};

export const deleteTableContents = () => pool.query(`
  DELETE FROM venue_songs WHERE user_id LIKE '%codeworks%';
  DELETE FROM user_venues WHERE user_id LIKE '%codeworks%';
  DELETE FROM users WHERE email LIKE '%codeworks%';
  DELETE FROM venues WHERE name LIKE '%Codeworks%';
`);
