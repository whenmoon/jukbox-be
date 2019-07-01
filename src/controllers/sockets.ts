import { VenueSong, UserVenue, User, Venue } from '../models';
import socketIO from 'socket.io';
import { nsp } from '../';
import { toCapitalCase } from '../services';

export const connectUserToVenue = async (userEmail: string, socket: socketIO.Socket) => {
  try {
    const venueName = toCapitalCase(socket.nsp.name);
    const userAtCurrentVenue = await UserVenue.find(userEmail, venueName);
    if (! userAtCurrentVenue) {
      const { ticket_default_no } = await Venue.find(venueName);
      await UserVenue.create(userEmail, venueName, ticket_default_no);
    }
    await emitToNamespace(userEmail, venueName, socket);
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
    await emitToNamespace(userEmail, venueName, socket);
  } catch (error) {
    socket.emit('error', error);
  }
};

export const updateSongDiamonds = async (songId: string, user: User, socket: socketIO.Socket) => {
  try {
    const userEmail = user.email;
    const venueName = toCapitalCase(socket.nsp.name);
    if (user.diamonds > 0) {
      await VenueSong.promote(songId);
      await User.decrementDiamonds(userEmail);
    }
    await emitToNamespace(userEmail, venueName, socket);
  } catch (error) {
    socket.emit('error', error);
  }
};

const emitToNamespace = async (userEmail: string, venueName: string, socket: socketIO.Socket) => {
  try {
    const playlist = await VenueSong.getAll(venueName);
    const sortedPlaylist = VenueSong.sortPlaylist(playlist);
    const { tickets } = await UserVenue.find(userEmail, venueName);
    const message = {
      data: {
        updatedPlaylist: sortedPlaylist,
        tickets: tickets
      }
    };
    nsp.emit('message', message);
  } catch (error) {
    socket.emit('error', error);
  }
};
