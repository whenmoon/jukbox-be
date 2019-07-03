import { VenueSong, UserVenue, User, Venue } from '../models';
import socketIO from 'socket.io';
import { toCapitalCase } from '../services';
import { emitPlaylist, emitTickets } from './helpers';

export const connectUserToVenue = async (userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (! userAtCurrentVenue) {
      const { ticket_default_no } = await Venue.find(venueName);
      await UserVenue.create(userEmail, venueName, ticket_default_no);
    }
    await emitTickets(userEmail, venueName, socket);
    await emitPlaylist(venueName);
  } catch (error) {
    socket.emit('error', error);
  }
};

export const addSongToPlaylist = async (songId: string, userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (userAtCurrentVenue.tickets > 0) {
      await VenueSong.create(songId, userEmail, venueName);
      await UserVenue.decrementTickets(userEmail, venueName);
    }
    await emitTickets(userEmail, venueName, socket);
    await emitPlaylist(venueName);
  } catch (error) {
    socket.emit('error', error);
  }
};

export const updateSongDiamonds = async (songId: number, user: User, socket: socketIO.Socket) => {
  try {
    const userEmail = user.email;
    const venueName = toCapitalCase(socket.nsp.name);
    if (user.diamonds > 0) {
      await VenueSong.promote(songId);
      await User.decrementDiamonds(userEmail);
    }
    await emitTickets(userEmail, venueName, socket);
    await emitPlaylist(venueName);
  } catch (error) {
    socket.emit('error', error);
  }
};

