import { User, Venue, UserVenue, PlaylistItem } from '../types';

export const mockUser: User = {
  email: 'testPerson@codeworks.me',
  token: 'blabla',
  name: 'Test Person',
  diamonds: 0
};

export const mockVenue: Venue = {
  name: 'Codeworks',
  token: 'blabla',
  ticket_default_no: 1
};

export const mockUserVenue: UserVenue = {
  userEmail: 'testPerson@codeworks.me',
  venueName: 'Codeworks',
  tickets: 0,
  diamonds: 0
};

export const mockPlaylistItem: PlaylistItem = {
  song: 'Hello world',
  userEmail: 'testPerson@codeworks.me',
  venueName: 'Codeworks'
};