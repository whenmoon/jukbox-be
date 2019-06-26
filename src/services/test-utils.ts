// import { User, Venue, UserVenue, PlaylistItem } from '../types';
// import client from 'socket.io-client';

// export const mockUser: User = {
//   email: 'test@codeworks.me',
//   token: 'blabla',
//   name: 'Test Person',
//   diamonds: 0
// };

// export const mockVenue: Venue = {
//   name: 'Codeworks',
//   token: 'blabla',
//   spotify_id: '123456',
//   ticket_default_no: 1
// };

// export const mockUserVenue: UserVenue = {
//   userEmail: 'test@codeworks.me',
//   venueName: 'Codeworks',
//   tickets: 0,
//   diamonds: 0
// };

// export const mockPlaylistItem: PlaylistItem = {
//   song: 'Hello world',
//   userEmail: 'test@codeworks.me',
//   venueName: 'Codeworks',
//   currentlyPlaying: false,
//   lockedIn: true,
//   diamonds: 0
// };


// export const createClient = (PORT: number) => {
//   return new Promise((resolve, reject) => {
//     const socket: any = client.connect(`http://localhost:${PORT}/codeworks`);
//     socket.on('connect', () => resolve(socket));
//     socket.on('error', () => reject);
//   })
// };
