import { User, Venue, UserVenue, VenueSong } from '../models';
import client from 'socket.io-client';
import pool from '../config/db';

export const mockUser = new User('test@codeworks.me', 'blabla', 'Test Person', 5);
export const mockVenue = new Venue('Codeworks', 'blabla', '123456', 1);
export const mockNamespace = '/codeworks';
export const mockUserVenue = new UserVenue('test@codeworks.me', 'Codeworks', 1, 0);
export const mockVenueSong = new VenueSong('Hello world', 'test@codeworks.me', 'Codeworks', 5, 'Wed Jun 26 2019 16:23:09 GMT+0200 (Central European Summer Time)', false, false);
const mockVenueSong2 = new VenueSong('Lala', 'other@codeworks.me', 'Codeworks', 0, 'Wed Jun 26 2019 16:20:09 GMT+0200 (Central European Summer Time)', false, false);
const mockVenueSong3 = new VenueSong('Blabla', 'third@codeworks.me', 'Codeworks', 0, 'Wed Jun 26 2019 16:22:09 GMT+0200 (Central European Summer Time)', false, false);
export const mockPlaylist = [mockVenueSong3, mockVenueSong2, mockVenueSong];
export const sortedMockPlaylist = [mockVenueSong, mockVenueSong2, mockVenueSong3];

export const createClient = (PORT: number) => {
  return new Promise((resolve, reject) => {
    const socket: any = client.connect(`http://localhost:${PORT}/codeworks`);
    socket.on('connect', () => resolve(socket));
    socket.on('error', () => reject);
  })
};

export const forClientsToReceiveMessage = (time: number) => new Promise((resolve, reject) => setTimeout(() => {
  resolve();
}, time));

export const deleteTableContents = () => pool.query(`
  DELETE FROM venue_songs WHERE user_id LIKE '%codeworks%';
  DELETE FROM user_venues WHERE user_id LIKE '%codeworks%';
  DELETE FROM users WHERE email LIKE '%codeworks%';
  DELETE FROM venues WHERE name LIKE '%Codeworks%';
`);
